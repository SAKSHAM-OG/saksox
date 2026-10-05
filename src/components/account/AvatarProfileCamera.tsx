import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  RotateCcw,
  Check,
  X,
  Upload,
  Sparkles,
  SwitchCamera,
  Trash2,
  AlertCircle,
  Eye,
  Sliders
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface AvatarProfileCameraProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDetails?: boolean;
  className?: string;
}

type PhotoFilter = 'normal' | 'noir' | 'cashmere' | 'arctic';

interface FilterOption {
  id: PhotoFilter;
  label: string;
  cssFilter: string;
  description: string;
}

const PHOTO_FILTERS: FilterOption[] = [
  {
    id: 'normal',
    label: 'Natural',
    cssFilter: 'none',
    description: 'Original crisp studio balance'
  },
  {
    id: 'noir',
    label: 'Editorial Noir',
    cssFilter: 'grayscale(100%) contrast(120%) brightness(95%)',
    description: 'High-contrast monochrome haute luxury'
  },
  {
    id: 'cashmere',
    label: 'Warm Cashmere',
    cssFilter: 'sepia(35%) contrast(105%) brightness(105%) saturate(110%)',
    description: 'Golden champagne warmth'
  },
  {
    id: 'arctic',
    label: 'Arctic Frost',
    cssFilter: 'hue-rotate(185deg) saturate(80%) brightness(108%) contrast(105%)',
    description: 'Cool glacial winter tone'
  }
];

export const AvatarProfileCamera: React.FC<AvatarProfileCameraProps> = ({
  size = 'lg',
  showDetails = true,
  className = ''
}) => {
  const { user, updateAvatar } = useShop();

  // Modal & Camera States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

  // Capture & Editing States
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<PhotoFilter>('normal');
  const [isShutterFlashing, setIsShutterFlashing] = useState(false);

  // DOM Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Determine size classes
  const sizeMap = {
    sm: {
      container: 'h-10 w-10 text-base',
      badge: 'h-4 w-4 p-0.5 -bottom-0.5 -right-0.5',
      icon: 'h-2.5 w-2.5'
    },
    md: {
      container: 'h-14 w-14 text-xl',
      badge: 'h-5 w-5 p-1 -bottom-1 -right-1',
      icon: 'h-3 w-3'
    },
    lg: {
      container: 'h-20 w-20 text-3xl',
      badge: 'h-7 w-7 p-1.5 -bottom-1 -right-1',
      icon: 'h-4 w-4'
    },
    xl: {
      container: 'h-28 w-28 text-4xl',
      badge: 'h-9 w-9 p-2 -bottom-1.5 -right-1.5',
      icon: 'h-5 w-5'
    }
  };

  const currentSize = sizeMap[size];

  // Stop camera stream safely
  const stopCameraStream = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // ignore
        }
      });
      setCameraStream(null);
    }
  }, [cameraStream]);

  // Check for device camera availability and multiple cameras
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const videoInputs = devices.filter((d) => d.kind === 'videoinput');
          setHasMultipleCameras(videoInputs.length > 1);
        })
        .catch(() => {
          // ignore
        });
    }
  }, []);

  // Initialize or re-initialize camera stream
  const startCamera = useCallback(
    async (mode: 'user' | 'environment' = 'user') => {
      setIsCameraLoading(true);
      setCameraError(null);
      stopCameraStream();

      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Your browser or device does not support direct camera capture.');
        }

        const constraints: MediaStreamConstraints = {
          audio: false,
          video: {
            facingMode: mode,
            width: { ideal: 1080 },
            height: { ideal: 1080 },
            aspectRatio: { ideal: 1 }
          }
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setCameraStream(stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch(() => {
              // autoplay restriction fallback
            });
          };
        }
      } catch (err: any) {
        console.warn('Camera access error:', err);
        let msg = 'Unable to access your device camera.';
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          msg = 'Camera permission was denied. Please allow camera access in browser settings.';
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          msg = 'No camera device found on your current hardware. You can upload an image file instead.';
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          msg = 'Camera is currently in use by another application or tab.';
        }
        setCameraError(msg);
      } finally {
        setIsCameraLoading(false);
      }
    },
    [stopCameraStream]
  );

  // When modal opens, launch camera
  useEffect(() => {
    if (isModalOpen) {
      setCapturedPhotoUrl(null);
      setActiveFilter('normal');
      startCamera(facingMode);
    } else {
      stopCameraStream();
    }

    return () => {
      stopCameraStream();
    };
  }, [isModalOpen, startCamera, stopCameraStream, facingMode]);

  // Flip front/back camera
  const toggleCameraFacingMode = () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
  };

  // Capture still photo snapshot from <video> feed
  const capturePhoto = () => {
    if (!videoRef.current) return;

    // Trigger visual shutter flash
    setIsShutterFlashing(true);
    setTimeout(() => setIsShutterFlashing(false), 200);

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');

    const videoWidth = video.videoWidth || 640;
    const videoHeight = video.videoHeight || 640;

    // Square crop calculation (center square)
    const minDim = Math.min(videoWidth, videoHeight);
    const startX = (videoWidth - minDim) / 2;
    const startY = (videoHeight - minDim) / 2;

    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Mirror image horizontally if using user front-facing camera for natural selfie orientation
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      ctx.drawImage(video, startX, startY, minDim, minDim, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setCapturedPhotoUrl(dataUrl);

      // Stop camera stream while reviewing
      stopCameraStream();
    }
  };

  // Retake photo
  const handleRetake = () => {
    setCapturedPhotoUrl(null);
    startCamera(facingMode);
  };

  // Apply selected filter onto canvas and save final avatar to user profile
  const handleSaveAvatar = () => {
    if (!capturedPhotoUrl) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Apply chosen CSS filter to context
        const selectedFilterDef = PHOTO_FILTERS.find((f) => f.id === activeFilter);
        if (selectedFilterDef && selectedFilterDef.cssFilter !== 'none') {
          ctx.filter = selectedFilterDef.cssFilter;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const finalDataUrl = canvas.toDataURL('image/jpeg', 0.9);

        // Update profile in store
        updateAvatar(finalDataUrl);
        setIsModalOpen(false);
      }
    };
    img.src = capturedPhotoUrl;
  };

  // Fallback: Upload from file input
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCapturedPhotoUrl(result);
        stopCameraStream();
        setCameraError(null);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemovePhoto = () => {
    updateAvatar(null);
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Avatar Container with Camera Button Badge */}
      <div className="relative group flex-shrink-0">
        <div
          onClick={() => setIsModalOpen(true)}
          className={`${currentSize.container} rounded-full overflow-hidden bg-[#181a24] border-2 border-[#c9a96e]/40 group-hover:border-[#dfbe7d] transition-all duration-300 shadow-md flex items-center justify-center cursor-pointer relative`}
          title="Click to capture or update profile photo"
        >
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name || 'Member Avatar'}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-serif font-bold text-[#dfbe7d] select-none">
              {user?.name?.charAt(0) || 'S'}
            </span>
          )}

          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="h-5 w-5 text-white drop-shadow" />
          </div>
        </div>

        {/* Floating Camera Button Badge */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={`absolute ${currentSize.badge} bg-[#dfbe7d] hover:bg-[#ebd29c] text-[#0a0b0d] rounded-full border-2 border-[#0a0b0d] shadow-lg flex items-center justify-center transition-transform group-hover:scale-110 cursor-pointer`}
          title="Open Camera"
          aria-label="Open Camera"
        >
          <Camera className={currentSize.icon} />
        </button>
      </div>

      {/* Optional Details & Action Buttons */}
      {showDetails && (
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Profile Avatar
            </span>
            {user?.avatarUrl && (
              <span className="text-[10px] font-mono text-[#22c55e] bg-[#22c55e]/10 px-1.5 py-0.2 border border-[#22c55e]/20">
                Personalized
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#88909e] truncate mt-0.5">
            Personalize your atelier VIP badge using your device camera.
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1 bg-[#1a1e28] hover:bg-[#252c3c] text-white border border-[#2e374a] text-[11px] font-mono font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Camera className="h-3 w-3 text-[#dfbe7d]" />
              <span>Capture Photo</span>
            </button>

            {user?.avatarUrl && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="px-2.5 py-1 text-[#88909e] hover:text-[#e11d48] text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1"
                title="Remove photo and revert to initial"
              >
                <Trash2 className="h-3 w-3" />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CAMERA CAPTURE MODAL                                                      */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-lg bg-[#111319] border border-[#272e3d] shadow-2xl flex flex-col text-[#f5f3ef] my-auto overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#212632] bg-[#0c0d12]">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-[#dfbe7d]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  SAKSOX Studio • Device Camera
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#88909e] hover:text-white transition-colors"
                aria-label="Close camera modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body: Camera Viewfinder or Photo Review */}
            <div className="p-4 sm:p-6 space-y-4">
              {/* Shutter Flash Animation Effect */}
              {isShutterFlashing && (
                <div className="absolute inset-0 bg-white z-30 pointer-events-none opacity-80 transition-opacity duration-200" />
              )}

              {/* VIEW 1: LIVE CAMERA STREAM */}
              {!capturedPhotoUrl ? (
                <div className="space-y-4">
                  {/* Camera Viewfinder Box */}
                  <div className="relative aspect-square w-full max-w-sm mx-auto bg-black rounded-lg overflow-hidden border border-[#2b3342] shadow-inner flex items-center justify-center">
                    {/* Live Video Feed */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`h-full w-full object-cover ${
                        facingMode === 'user' ? 'scale-x-[-1]' : ''
                      }`}
                    />

                    {/* Viewfinder Circular Frame Overlay (Editorial guide) */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-dashed border-[#dfbe7d]/70 shadow-[0_0_0_9999px_rgba(10,11,13,0.55)] flex items-center justify-center relative">
                        {/* Center crosshair */}
                        <div className="h-2 w-2 rounded-full bg-[#dfbe7d]/50" />
                        <div className="absolute top-2 text-[9px] font-mono text-[#dfbe7d] uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded">
                          Frame Face
                        </div>
                      </div>
                    </div>

                    {/* Loading State */}
                    {isCameraLoading && (
                      <div className="absolute inset-0 bg-[#0a0b0d]/90 flex flex-col items-center justify-center gap-2 z-20">
                        <div className="h-8 w-8 rounded-full border-2 border-[#dfbe7d] border-t-transparent animate-spin" />
                        <span className="text-xs font-mono text-[#dfbe7d]">
                          Initializing device camera...
                        </span>
                      </div>
                    )}

                    {/* Camera Error / No Device State */}
                    {cameraError && (
                      <div className="absolute inset-0 bg-[#0c0d12]/95 p-6 flex flex-col items-center justify-center text-center z-20 space-y-3">
                        <AlertCircle className="h-10 w-10 text-[#f43f5e]" />
                        <h4 className="text-sm font-bold text-white font-serif">
                          Camera Access Unavailable
                        </h4>
                        <p className="text-xs text-[#88909e] max-w-xs">{cameraError}</p>

                        <div className="pt-2 flex flex-col gap-2 w-full max-w-xs">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-[#dfbe7d] text-[#0a0b0d] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                          >
                            <Upload className="h-4 w-4" />
                            <span>Upload Photo File</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => startCamera(facingMode)}
                            className="px-4 py-1.5 bg-[#181a24] text-white border border-[#2b3342] text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                            <span>Retry Camera</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Flip Camera Button (if multiple cameras available) */}
                    {hasMultipleCameras && !cameraError && (
                      <button
                        type="button"
                        onClick={toggleCameraFacingMode}
                        className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full border border-white/20 transition-all z-10"
                        title="Switch Camera (Front / Back)"
                      >
                        <SwitchCamera className="h-4 w-4 text-[#dfbe7d]" />
                      </button>
                    )}
                  </div>

                  {/* Camera Controls Bar */}
                  {!cameraError && (
                    <div className="flex items-center justify-between pt-2">
                      {/* Upload File Alternative */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2.5 bg-[#171922] hover:bg-[#222634] border border-[#252b39] text-[#88909e] hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                        title="Upload existing image"
                      >
                        <Upload className="h-3.5 w-3.5 text-[#dfbe7d]" />
                        <span className="hidden sm:inline">Upload File</span>
                      </button>

                      {/* Main Shutter Snap Button */}
                      <button
                        type="button"
                        onClick={capturePhoto}
                        disabled={isCameraLoading}
                        className="group relative flex items-center justify-center focus:outline-none"
                        title="Take Photo"
                      >
                        <div className="h-16 w-16 rounded-full border-4 border-[#dfbe7d] flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95 shadow-lg shadow-[#dfbe7d]/20">
                          <div className="h-12 w-12 rounded-full bg-[#dfbe7d] group-hover:bg-[#ebd29c] transition-colors" />
                        </div>
                      </button>

                      {/* Flip Camera Trigger */}
                      {hasMultipleCameras ? (
                        <button
                          type="button"
                          onClick={toggleCameraFacingMode}
                          className="p-2.5 bg-[#171922] hover:bg-[#222634] border border-[#252b39] text-[#88909e] hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                          title="Switch Front/Rear Camera"
                        >
                          <SwitchCamera className="h-3.5 w-3.5 text-[#dfbe7d]" />
                          <span className="hidden sm:inline">Flip</span>
                        </button>
                      ) : (
                        <div className="w-16" />
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* VIEW 2: PHOTO REVIEW & LUXURY FILTERS */
                <div className="space-y-4">
                  {/* Photo Preview Container */}
                  <div className="relative aspect-square w-full max-w-sm mx-auto bg-black rounded-lg overflow-hidden border border-[#2b3342] shadow-xl flex items-center justify-center">
                    <img
                      src={capturedPhotoUrl}
                      alt="Captured Preview"
                      style={{
                        filter: PHOTO_FILTERS.find((f) => f.id === activeFilter)?.cssFilter || 'none'
                      }}
                      className="h-full w-full object-cover transition-all duration-300"
                    />

                    {/* Circular Cutout Frame Overlay */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-[#dfbe7d] shadow-[0_0_0_9999px_rgba(10,11,13,0.65)]" />
                    </div>

                    <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-[#dfbe7d] flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span>{PHOTO_FILTERS.find((f) => f.id === activeFilter)?.label}</span>
                    </div>
                  </div>

                  {/* Luxury Studio Aesthetic Filter Selector */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#88909e] font-mono uppercase">
                      <span className="flex items-center gap-1">
                        <Sliders className="h-3 w-3 text-[#dfbe7d]" />
                        <span>Select Tone / Filter</span>
                      </span>
                      <span className="text-[#dfbe7d]">
                        {PHOTO_FILTERS.find((f) => f.id === activeFilter)?.description}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {PHOTO_FILTERS.map((filt) => (
                        <button
                          key={filt.id}
                          type="button"
                          onClick={() => setActiveFilter(filt.id)}
                          className={`p-2 text-center border text-xs transition-all ${
                            activeFilter === filt.id
                              ? 'bg-[#1b1f2b] border-[#dfbe7d] text-white shadow-md'
                              : 'bg-[#13151d] border-[#222734] text-[#88909e] hover:border-[#353d4f] hover:text-white'
                          }`}
                        >
                          <span className="block font-semibold text-[11px] truncate">
                            {filt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: Retake vs Save */}
                  <div className="flex items-center justify-between pt-2 gap-3 border-t border-[#212632]">
                    <button
                      type="button"
                      onClick={handleRetake}
                      className="px-4 py-2.5 bg-[#171922] hover:bg-[#232734] border border-[#272d3b] text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="h-3.5 w-3.5 text-[#88909e]" />
                      <span>Retake</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveAvatar}
                      className="flex-1 px-5 py-2.5 bg-[#dfbe7d] hover:bg-[#ebd29c] text-[#0a0b0d] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#dfbe7d]/20"
                    >
                      <Check className="h-4 w-4 stroke-[3]" />
                      <span>Apply Profile Photo</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Hidden File Input for Image Upload Fallback */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* Hidden Offscreen Canvas for Snapshots */}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Modal Footer Note */}
            <div className="p-3 bg-[#0a0b0e] border-t border-[#1d222d] text-center text-[10px] text-[#6d7483] font-mono">
              Direct device camera capture. Photos are stored securely in your private browser profile.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
