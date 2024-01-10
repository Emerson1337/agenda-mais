import React from "react";
import logo from "@assets/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {
  buttons: Array<{ title: string; path: string }>;
};

export const Navbar: React.FC<Props> = ({ buttons }) => {
  const router = useRouter();
  const currentPath = router.asPath;

  const markMenuButton = (path: string, currentPath: string): string => {
    return currentPath.replaceAll("/", "") == path ? "selected" : "";
  };

  const redirect = (path: string) => {
    router.push(path);
  };

  return (
    <div className="navbar">
      <div className="logo-space default-size">
        <Image layout="fixed" src={logo} alt="logo picture" />
      </div>
      <div className="menus">
        <div className="buttons">
          {buttons.map((button, key) => {
            return (
              <span
                className={`${markMenuButton(button.path, currentPath)}`}
                key={key}
                onClick={() => redirect(button.path)}
              >
                {button.title}
              </span>
            );
          })}
        </div>
      </div>
      <div id="right-part default-size"></div>
    </div>
  );
};
