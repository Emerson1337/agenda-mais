import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cropImage } from "@/lib/cropUtils";

interface ImageCropperProps {
  open: boolean;
  image: string;
  onComplete: (croppedImage: string | void) => void;
  containerStyle?: React.CSSProperties;
  onClose?: () => void;
  [key: string]: unknown;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  open,
  image,
  onComplete,
  containerStyle,
  onClose,
  ...props
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recortar imagem</DialogTitle>
        </DialogHeader>
        <div style={containerStyle}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={(_, croppedAreaPixels) =>
              setCroppedAreaPixels(croppedAreaPixels)
            }
            onZoomChange={setZoom}
            {...props}
          />
        </div>
        <Button
          variant="default"
          onClick={async () => {
            if (croppedAreaPixels) {
              onComplete(
                await cropImage(image, croppedAreaPixels, console.log),
              );
            } else {
              console.error("Cropped area is not defined");
            }
          }}
        >
          Finalizar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
