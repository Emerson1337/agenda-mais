"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { ImageListType } from "react-images-uploading";
import ImageUploadingButton from "@/components/upload/ImageUploadingButton";
import ImageCropper from "@/components/upload/ImageCropper";
import Image from "next/image";
import ImageUploadingHoverButton from "@/components/upload/ImageUploadingHoverButton";
import { ThemeCustomizer } from "@/components/ui/theme-customizer";
import { Button } from "@/components/ui/button";

export default function ProfileDetails() {
  const [profileImage, setProfileImage] = useState<ImageListType>([]);
  const [croppedProfileImage, setCroppedProfileImage] = useState<string | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Foto do Perfil</CardTitle>
        <CardDescription>
          Carregue e ajuste a imagem do perfil abaixo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="relative min-h-[200px] flex items-center justify-center">
            {croppedProfileImage && (
              <Image
                width={150}
                height={150}
                src={croppedProfileImage}
                alt="Cropped Profile"
                className="mt-4 rounded-full"
              />
            )}
            <ImageUploadingHoverButton
              croppedImage={croppedProfileImage}
              value={profileImage}
              onChange={(newImage) => {
                setDialogOpen(true);
                setProfileImage(newImage);
              }}
            />
          </div>
          <ImageUploadingButton
            className="block sm:hidden"
            value={profileImage}
            onChange={(newImage) => {
              setDialogOpen(true);
              setProfileImage(newImage);
            }}
          />
          <ImageCropper
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            image={
              profileImage.length > 0 && profileImage[0].dataURL
                ? profileImage[0].dataURL
                : ""
            }
            onComplete={(croppedImage: string | void) => {
              if (typeof croppedImage === "string") {
                setCroppedProfileImage(croppedImage);
              } else {
                console.error("Cropping error: No image returned");
              }
              setDialogOpen(false);
            }}
            containerStyle={{
              position: "relative",
              width: "100%",
              height: 300,
              background: "#333",
            }}
          />
        </div>
        <ThemeCustomizer />
        <Button variant="default" className="mt-10 w-full">
          Salvar alterações
        </Button>
      </CardContent>
    </Card>
  );
}
