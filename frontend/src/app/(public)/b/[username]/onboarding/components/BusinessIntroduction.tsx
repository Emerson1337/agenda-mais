"use client";

import Image from "next/image";
import { useBusinessContext } from "@/app/(public)/b/[username]/utils/context/BusinessDataContext";
import { notFound } from "next/navigation";
import { useGetPublicAssets } from "@/shared/utils/urlUtils";

const BusinessIntroduction = (): JSX.Element => {
  const { business } = useBusinessContext();
  if (!business) notFound();
  const photoUrl = useGetPublicAssets(business.profilePhoto);
  return (
    <>
      <div className="flex justify-center items-center">
        <Image
          src={photoUrl}
          className="rounded-full mb-8 z-10"
          alt="logo"
          width={155}
          height={155}
        />
        <div className="rounded-full w-40 h-40 absolute bg-primary-foreground mb-8 z-0" />
      </div>
      <div>Bem vindo!</div>
      <div className="font-light text-sm text-muted-foreground opacity-80 mt-8 px-16 max-w-xl text-center">
        {business.welcomeMessage}
      </div>
    </>
  );
};

export default BusinessIntroduction;
