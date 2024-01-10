import React from "react";
import logo from "@assets/footer-logo.svg";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="label-footer">Made with</div>
      <div className="logo-footer">
        <Image layout="fixed" src={logo} alt="logo footer picture" />
      </div>
    </div>
  );
};
