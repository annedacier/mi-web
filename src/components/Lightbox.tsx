import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  photo: { src: string; alt: string };
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalPhotos: number;
}

const Lightbox = ({
  photo,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalPhotos,
}: LightboxProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          onNext();
          break;
        case "ArrowLeft":
          onPrev();
          break;
      }
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 lightbox-overlay flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        {/* Navigation buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 md:left-8 p-3 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Previous photo"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 md:right-8 p-3 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Next photo"
        >
          <ChevronRight size={32} />
        </button>

        {/* Image container */}
        <motion.div
          key={photo.src}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-[90vw] max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-w-full max-h-[85vh] object-contain"
          />
        </motion.div>

        {/* Counter */}
        {/*
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-caption text-muted-foreground">
          {currentIndex + 1} / {totalPhotos}
        </div>
        */}
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
