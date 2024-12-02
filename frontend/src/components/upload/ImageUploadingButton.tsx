import { Button } from "../ui/button";
import ImageUploading, { ImageListType } from "react-images-uploading";

interface ImageUploadingButtonProps {
  value: ImageListType;
  onChange: (imageList: ImageListType, addUpdateIndex?: number[]) => void;
  [key: string]: unknown;
}

const ImageUploadingButton: React.FC<ImageUploadingButtonProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <ImageUploading value={value} onChange={onChange}>
      {({ onImageUpload, onImageUpdate }) => (
        <Button
          variant="default"
          onClick={value.length === 0 ? onImageUpload : () => onImageUpdate(0)}
          {...props}
        >
          Upload
        </Button>
      )}
    </ImageUploading>
  );
};

export default ImageUploadingButton;
