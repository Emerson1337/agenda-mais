import { UploadIcon } from "@radix-ui/react-icons";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { cn } from "../../lib/utils";

interface ImageUploadingButtonProps {
  value: ImageListType;
  onChange: (imageList: ImageListType, addUpdateIndex?: number[]) => void;
  croppedImage?: string | null;
  [key: string]: any;
}

const ImageUploadingHoverButton: React.FC<ImageUploadingButtonProps> = ({
  value,
  onChange,
  croppedImage,
  ...props
}) => {
  return (
    <ImageUploading value={value} onChange={onChange}>
      {({ onImageUpload, onImageUpdate }) => (
        <div
          className={cn(
            "flex cursor-pointer items-center transition-opacity duration-100 justify-center mt-4 w-[150px] h-[150px] bg-secondary rounded-full absolute",
            {
              "opacity-0 hover:opacity-60": croppedImage,
            }
          )}
        >
          <button
            className="text-secondary-foreground w-full h-full flex items-center justify-center"
            onClick={
              value.length === 0 ? onImageUpload : () => onImageUpdate(0)
            }
            {...props}
          >
            <UploadIcon className="w-8 h-8" />
          </button>
        </div>
      )}
    </ImageUploading>
  );
};

export default ImageUploadingHoverButton;
