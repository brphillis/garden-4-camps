import React from "react";
import { Lottie } from "../../components/Lottie";
import campingAnimation from "../../src/images/camping-animation.json";
import { Box, Typography } from "@mui/material";

type Props = {};

function HomeSplash({}: Props) {
  return (
    <Box
      sx={{
        height: "450px",
        width: "450px",
        display: "block",
        margin: {
          sm: "48px 100px 64px 100px",
          md: "48px 100px 64px 100px",
          xl: "92px 100px auto 100px",
        },
        padding: "48px",
      }}
    >
      <Lottie animationData={campingAnimation} loop={true} autoplay={true} />
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="bold"
        color="white"
        bgcolor="#0320fcBF"
        borderRadius="12px"
        padding="6px 12px"
        sx={{ userSelect: "none" }}
      >
        Garden 4 Camps
      </Typography>
    </Box>
  );
}

export default HomeSplash;
