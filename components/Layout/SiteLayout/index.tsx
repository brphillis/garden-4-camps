import React from "react";
import NavBar from "./NavBar";
import BackgroundImage from "./BackgroundImage";

type Props = {
  children: JSX.Element | JSX.Element[];
  setUser: Function;
};

const SiteLayout = ({ children, setUser }: Props) => {
  return (
    <>
      <BackgroundImage>
        <NavBar setUser={setUser} />
        <>{children}</>
      </BackgroundImage>
    </>
  );
};

export default SiteLayout;
