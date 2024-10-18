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
import { useGetManager } from "../hooks/useGetManager";
import {
  useManagerMutation,
  useManagerProfileMutation,
} from "../hooks/useManagerMutation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { notFound } from "next/navigation";

export default function ProfileDetails() {
  const [profileImage, setProfileImage] = useState<ImageListType>([]);
  const [newPalette, setNewPalette] = useState<string>();
  const [croppedProfileImage, setCroppedProfileImage] = useState<string | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isFetching, data, error } = useGetManager();
  const {
    mutateAsync: updateManagerMutateAsync,
    isPending: updateManagerIsPending,
  } = useManagerMutation();
  const {
    mutateAsync: updateProfilePictureMutateAsync,
    isPending: updateProfilePictureIsPending,
  } = useManagerProfileMutation();

  const onSubmit = async () => {
    try {
      const formData = new FormData();

      if (data && newPalette) {
        const updatedData = {
          ...data,
          palette: newPalette,
        };
        await updateManagerMutateAsync(updatedData);
      }

      if (croppedProfileImage) {
        const response = await fetch(croppedProfileImage);
        const blob = await response.blob();
        formData.append("picture", blob, "profile-image.jpeg");
      }

      if (croppedProfileImage) {
        await updateProfilePictureMutateAsync(formData);
      }

      toast.success("Dados atualizados com sucesso!");

      setTimeout(() => {
        location.reload();
      }, 3000);
    } catch (error: AxiosError | any) {
      toast.error(
        error?.response?.data?.message || "Erro ao salvar alterações"
      );
    }
  };

  if (isFetching)
    return (
      <div>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  if (error) return notFound();

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
          <div className="relative min-h-[200px] flex justify-center">
            {(croppedProfileImage || data?.profilePhoto) && (
              <Image
                width={150}
                height={150}
                src={
                  croppedProfileImage ??
                  `http://localhost:3000/${data?.profilePhoto}`
                }
                alt="Cropped Profile"
                className="rounded-full overflow-hidden object-cover mt-4 h-[150px] w-[150px]"
              />
            )}
            <ImageUploadingHoverButton
              croppedImage={
                croppedProfileImage ??
                `http://localhost:3000/${data?.profilePhoto}`
              }
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
        <ThemeCustomizer onChange={setNewPalette} />
        <Button
          variant="default"
          className="mt-10 w-full"
          onClick={onSubmit}
          disabled={updateManagerIsPending || updateProfilePictureIsPending}
        >
          {updateManagerIsPending || updateProfilePictureIsPending ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Salvar alterações"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
