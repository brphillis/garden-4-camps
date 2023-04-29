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
        height: "calc(100vh - 64px)",
        overflowY: "scroll",
      }}
    >
      {children}
    </Box>
  );
};

export default PageContent;
