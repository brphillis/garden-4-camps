import { Box } from "@mui/material";
import React from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const PageContent = ({ children }: Props) => {
  return (
    <Box
      style={{
        maxHeight: "100dvh",
        maxWidth: "100vw",
        height: "calc(100vh - 64px)",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      {children}
    </Box>
  );
};

export default PageContent;
