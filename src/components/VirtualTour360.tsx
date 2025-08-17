import { useEffect, useRef, useState } from 'react';
import { Maximize, Minimize, RotateCw, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Define the pannellum viewer interface
interface PannellumViewer {
  loadScene: (sceneId: string) => void;
  startAutoRotate: (speed?: number) => void;
  stopAutoRotate: () => void;
  isAutoRotating: () => boolean;
  destroy: () => void;
}

declare global {
  interface Window {
    pannellum: {
      viewer: (container: string | Element, config: any) => PannellumViewer;
    };
  }
}

interface VirtualTour360Props {
  imageUrl?: string;
  autoLoad?: boolean;
  autoRotate?: number;
  pitch?: number;
  yaw?: number;
  hfov?: number;
  className?: string;
}

export function VirtualTour360({
  imageUrl = '/images/sample-360.jpg', // Placeholder 360° image
  autoLoad = true,
  autoRotate = 0,
  pitch = 0,
  yaw = 0,
  hfov = 100,
  className = ''
}: VirtualTour360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<PannellumViewer | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load pannellum script dynamically
    const loadPannellum = async () => {
      if (window.pannellum) {
        initViewer();
        return;
      }

      try {
        // Load CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
        document.head.appendChild(cssLink);

        // Load JS
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
        script.onload = () => {
          // Wait a bit for pannellum to fully initialize
          setTimeout(initViewer, 100);
        };
        script.onerror = () => {
          setError('Failed to load 360° viewer');
          setIsLoading(false);
        };
        document.head.appendChild(script);
      } catch (err) {
        setError('Failed to initialize 360° viewer');
        setIsLoading(false);
      }
    };

    const initViewer = () => {
      if (!containerRef.current || !window.pannellum) return;

      try {
        const viewerInstance = window.pannellum.viewer(containerRef.current, {
          type: 'equirectangular',
          panorama: imageUrl,
          autoLoad: autoLoad,
          autoRotate: autoRotate,
          pitch: pitch,
          yaw: yaw,
          hfov: hfov,
          showZoomCtrl: true,
          showFullscreenCtrl: false, // We'll handle fullscreen ourselves
          showControls: true,
          keyboardZoom: true,
          mouseZoom: true,
          backgroundColor: [0, 0, 0],
          onLoad: () => {
            setIsLoading(false);
            if (autoRotate > 0) {
              setIsAutoRotating(true);
            }
          },
          onError: () => {
            setError('Failed to load 360° image');
            setIsLoading(false);
          }
        });

        setViewer(viewerInstance);
      } catch (err) {
        setError('Error initializing viewer');
        setIsLoading(false);
      }
    };

    loadPannellum();

    return () => {
      if (viewer) {
        try {
          viewer.destroy();
        } catch (err) {
          console.warn('Error destroying viewer:', err);
        }
      }
    };
  }, [imageUrl, autoLoad, autoRotate, pitch, yaw, hfov]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen not supported');
    }
  };

  const toggleAutoRotate = () => {
    if (!viewer) return;

    try {
      if (isAutoRotating) {
        viewer.stopAutoRotate();
        setIsAutoRotating(false);
      } else {
        viewer.startAutoRotate(2); // 2 degrees per second
        setIsAutoRotating(true);
      }
    } catch (err) {
      console.warn('Auto-rotate control failed');
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`relative w-full h-[70vh] rounded-2xl bg-school-secondary flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-school-accent/20 rounded-full flex items-center justify-center">
            <RotateCw className="w-8 h-8 text-school-accent" />
          </div>
          <p className="text-school-text-muted mb-2">360° Virtual Tour</p>
          <p className="text-sm text-school-text-muted/70">{error}</p>
          <p className="text-xs text-school-text-muted/50 mt-2">
            Silakan coba refresh halaman atau hubungi admin
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative w-full h-[70vh] rounded-2xl overflow-hidden bg-school-primary shadow-2xl ${className}`}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-school-secondary/90 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-school-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-school-text">Memuat Virtual Tour 360°...</p>
          </div>
        </div>
      )}

      {/* Viewer container */}
      <div 
        ref={containerRef} 
        className="w-full h-full"
        style={{ backgroundColor: '#000' }}
      />

      {/* Custom controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={toggleAutoRotate}
          className="bg-black/50 backdrop-blur-sm hover:bg-black/70 border-school-accent/20"
        >
          {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        <Button
          size="sm"
          variant="secondary"
          onClick={toggleFullscreen}
          className="bg-black/50 backdrop-blur-sm hover:bg-black/70 border-school-accent/20"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </Button>
      </div>

      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2 text-school-text"
        >
          <p className="text-sm font-medium">Virtual Tour 360°</p>
          <p className="text-xs text-school-text-muted">
            Gunakan mouse atau touch untuk melihat sekeliling
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default VirtualTour360;