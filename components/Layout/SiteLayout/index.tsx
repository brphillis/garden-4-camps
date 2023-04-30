import React from "react";
import NavBar from "./NavBar";
import BackgroundImage from "./BackgroundImage";

const SiteLayout = ({ children }: JSXChildren) => {
  return (
    <>
      <BackgroundImage>
        <NavBar />
        <>{children}</>
      </BackgroundImage>
    </>
  );
};

export default SiteLayout;
