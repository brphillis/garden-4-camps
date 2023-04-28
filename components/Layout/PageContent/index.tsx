import { Box } from "@mui/material";
import React from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

function PageContent({ children }: Props) {
  return (
    <Box style={{ maxHeight: "100vh", overflowY: "scroll" }}>{children}</Box>
  );
}

export default PageContent;
