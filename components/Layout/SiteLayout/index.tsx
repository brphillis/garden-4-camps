import React from "react";
import NavBar from "./NavBar";
import BackgroundImage from "./BackgroundImage";

type Props = {
  children: JSX.Element | JSX.Element[];
};

function SiteLayout({ children }: Props) {
  return (
    <>
      <BackgroundImage>
        <NavBar />
        <>{children}</>
      </BackgroundImage>
    </>
  );
}

export default SiteLayout;
