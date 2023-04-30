import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";

type Props = {
  children: JSX.Element | JSX.Element[];
  map?: {
    latitude: number;
    longitude: number;
  };
};

function Carousel({ children, map }: Props) {
  const { latitude, longitude } = map || { latitude: "", longitude: "" };
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "max-content",
        width: "600px",
        maxWidth: "98vw",
        paddingBottom: "24px",
      }}
    >
      <Slider {...settings}>
        {map && (
          <div
            style={{
              height: "max-content",
              width: "max-content",
            }}
          >
            <iframe
              key={latitude.toString() + longitude.toString()}
              style={{ height: "450px", width: "100%" }}
              src={`//maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`}
            />
          </div>
        )}
        {children}
      </Slider>
    </Box>
  );
}

export default Carousel;
