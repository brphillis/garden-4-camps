import React from "react";
import NavBar from "./NavBar";
import BackgroundImage from "./BackgroundImage";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const SiteLayout = ({ children }: Props) => {
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
