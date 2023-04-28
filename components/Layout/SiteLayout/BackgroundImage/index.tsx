import React from "react";
import image from "../../../../src/images/backgroundImage.jpg";
import { Box } from "@mui/material";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const BackgroundImage = ({ children }: Props) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        maxWidth: "100vw",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default BackgroundImage;
