import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { useQuran } from '../context/QuranContext';
import { 
  X, 
  QrCode, 
  Scan, 
  Smartphone, 
  Copy, 
  Check, 
  Download, 
  Camera, 
  Upload, 
  ExternalLink,
  Wifi,
  Info
} from 'lucide-react';

export const QRCodeModal: React.FC = () => {
  const { isQRCodeOpen, setIsQRCodeOpen } = useQuran();
  
  const [activeTab, setActiveTab] = useState<'generate' | 'scan'>('generate');
  
  // Local network URL
  const defaultUrl =
    typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
      ? window.location.origin
      : 'http://192.168.8.140:3000';
  const [targetUrl, setTargetUrl] = useState(defaultUrl);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Scanner state
  const [cameraActive, setCameraActive] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Generate QR Code on URL change
  useEffect(() => {
    if (targetUrl) {
      QRCode.toDataURL(targetUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#064e3b',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch(console.warn);
    }
  }, [targetUrl]);

  // Handle camera scanning
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (isQRCodeOpen && activeTab === 'scan' && cameraActive) {
      navigator.mediaDevices
        ?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.setAttribute('playsinline', 'true');
            videoRef.current.play();
            requestAnimationFrame(scanVideoFrame);
          }
        })
        .catch((err) => {
          console.warn('Camera error:', err);
          setCameraError('Camera access denied or unavailable. You can upload a QR image below.');
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isQRCodeOpen, activeTab, cameraActive]);

  const scanVideoFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });
        if (code && code.data) {
          setScannedResult(code.data);
          setCameraActive(false);
          return;
        }
      }
    }
    animationFrameId.current = requestAnimationFrame(scanVideoFrame);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imgData.data, imgData.width, imgData.height);
          if (code && code.data) {
            setScannedResult(code.data);
            setCameraError(null);
          } else {
            setCameraError('No QR code detected in this image. Try another photo.');
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'quran-app-expo-qr.png';
    link.click();
  };

  if (!isQRCodeOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg bg-white dark:bg-[#0d1620] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Mobile & Expo Go QR Hub
              </h3>
              <p className="text-xs text-slate-400">
                Deploy, scan, and test on your mobile device
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setCameraActive(false);
              setIsQRCodeOpen(false);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex p-2 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              setActiveTab('generate');
              setCameraActive(false);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'generate'
                ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Expo Go / Mobile QR</span>
          </button>

          <button
            onClick={() => setActiveTab('scan')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'scan'
                ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Scan className="w-4 h-4" />
            <span>QR Code Scanner</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* TAB 1: GENERATE / EXPO GO PAIRING */}
          {activeTab === 'generate' && (
            <div className="flex flex-col items-center text-center space-y-4">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
                <Wifi className="w-3.5 h-3.5" />
                <span>LAN Address: {targetUrl.replace(/^https?:\/\//, '').split(':')[0] || '192.168.8.140'}</span>
              </div>

              {/* QR Image Box with Islamic Frame */}
              <div className="p-4 bg-white rounded-2xl border-2 border-emerald-500/30 shadow-lg relative group">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Expo Go QR Code" className="w-56 h-56 mx-auto rounded-lg" />
                ) : (
                  <div className="w-56 h-56 flex items-center justify-center text-xs text-slate-400">
                    Generating QR code...
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full max-w-sm">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied URL!' : 'Copy URL'}</span>
                </button>

                <button
                  onClick={handleDownloadQR}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save QR Image</span>
                </button>
              </div>

              {/* URL Customizer */}
              <div className="w-full text-left">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Target URL (Expo or Web Server)
                </label>
                <input
                  type="text"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="e.g. http://192.168.191.140:3000 or exp://..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* How to use Guide */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-left text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                  <Info className="w-3.5 h-3.5 text-emerald-600" />
                  <span>How to open on Phone / Expo Go:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
                  <li>Make sure your phone is connected to the same Wi-Fi network.</li>
                  <li>Open the <strong>Expo Go</strong> app (or your phone Camera app).</li>
                  <li>Scan the QR code above to immediately load the Quran App on your device!</li>
                </ol>
              </div>

            </div>
          )}

          {/* TAB 2: SCANNER */}
          {activeTab === 'scan' && (
            <div className="flex flex-col items-center space-y-4">
              
              {/* Camera Preview or Trigger */}
              <div className="w-full h-64 bg-slate-950 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border border-slate-800">
                {cameraActive ? (
                  <>
                    <video ref={videoRef} className="w-full h-full object-cover" />
                    <canvas ref={canvasRef} className="hidden" />
                    {/* Viewfinder Target Border */}
                    <div className="absolute inset-8 border-2 border-emerald-400/80 rounded-2xl pointer-events-none animate-pulse">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-400" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-400" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-400" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-400" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-center p-6 text-slate-400">
                    <Camera className="w-10 h-10 text-emerald-400 mb-2" />
                    <p className="text-xs mb-3">Live camera scanner is idle</p>
                    <button
                      onClick={() => {
                        setCameraError(null);
                        setCameraActive(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold shadow flex items-center gap-1.5"
                    >
                      <Scan className="w-3.5 h-3.5" />
                      <span>Start Camera Scanner</span>
                    </button>
                  </div>
                )}
              </div>

              {cameraActive && (
                <button
                  onClick={() => setCameraActive(false)}
                  className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Stop Camera
                </button>
              )}

              {/* Upload QR Image as alternative */}
              <div className="w-full">
                <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 cursor-pointer text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-colors">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>Or Upload QR Code Image from Device</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              {cameraError && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-700 dark:text-amber-300 text-center w-full">
                  {cameraError}
                </div>
              )}

              {/* Scanned Result */}
              {scannedResult && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-2xl w-full">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                      Scanned Content:
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(scannedResult)}
                      className="text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <p className="font-mono text-xs break-all text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 mb-3">
                    {scannedResult}
                  </p>
                  {(scannedResult.startsWith('http') || scannedResult.startsWith('exp://')) && (
                    <a
                      href={scannedResult}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Link ({scannedResult.startsWith('exp://') ? 'Expo Go' : 'Browser'})</span>
                    </a>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#0a1118] border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={() => {
              setCameraActive(false);
              setIsQRCodeOpen(false);
            }}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
