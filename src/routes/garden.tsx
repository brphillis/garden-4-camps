import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useStore } from "../store";
import { useLocation } from "react-router-dom";
import { Avatar, Box, CircularProgress, Container } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Carousel from "../../components/Carousel";
import { MdEmail, MdPhone } from "react-icons/md";
import avatarMale from "../images/avatar-male.jpg";
import avatarFemale from "../images/avatar-female.jpg";

export async function loader({ params }) {
  const data = params;
  return data.id;
}

const Garden = () => {
  const location = useLocation();
  const id = useLoaderData() as string;
  const [garden, setGarden] = useState<Garden>();
  const { gardens } = useStore();

  const findThenSetGarden = (id: string) => {
    const foundGarden = gardens.find((gardens) => gardens._id === id);
    if (foundGarden) {
      setGarden(foundGarden);
    }
  };

  useEffect(() => {
    findThenSetGarden(id);
  }, [location]);

  useEffect(() => {
    console.log(garden);
  }, []);

  if (garden) {
    const gardenMap = {
      latitude: garden.latitude,
      longitude: garden.longitude,
    };
    return (
      <Card
        sx={{
          width: "1250px",
          maxWidth: "98vw",
          maxHeight: "calc(100vh - 85px)",
          margin: "12px 6px",
          padding: "24px,",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          overflowY: "scroll",
        }}
        className="hideScroll"
      >
        <Typography variant="h4" sx={{ padding: "24px", fontWeight: "bold" }}>
          {garden.address}
        </Typography>

        <Carousel map={gardenMap}>
          {garden.pictures.map((e, i) => {
            return (
              <div
                key={e + i}
                style={{
                  height: "max-content",
                  width: "max-content",
                }}
              >
                <img
                  src={e}
                  style={{
                    height: "450px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            );
          })}
        </Carousel>

        <CardContent>
          <Typography variant="body2" color="text.secondary" p="12px">
            {garden.about}
          </Typography>
        </CardContent>
        <Typography
          variant="body2"
          color="text.primary"
          p="12px"
          fontWeight="bold"
          textAlign="center"
        >
          Are You Intered in Staying Here? Contact The Owner Today!
        </Typography>
        <Container
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "max-content",
            padding: "24px",
          }}
        >
          <Avatar
            sx={{ height: "72px", width: "72px" }}
            alt={garden.owner.name}
            src={garden.owner.gender === "male" ? avatarMale : avatarFemale}
          />
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              flexWrap: "wrap",
              maxWidth: "max-content",
            }}
          >
            <Typography>
              {garden.owner.name + ", " + garden.owner.age}
            </Typography>
            <Container
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "24px",
                flexWrap: "wrap",
                width: "max-content",
              }}
            >
              <a href={"tel:" + garden.owner.phone} className="cursor:pointer">
                <MdPhone size={24} />
              </a>

              <a
                href={"mailto:" + garden.owner.email}
                className="cursor:pointer"
              >
                <MdEmail size={24} />
              </a>
            </Container>
          </Container>
        </Container>
      </Card>
    );
  } else {
    return <CircularProgress />;
  }
};

export default Garden;
