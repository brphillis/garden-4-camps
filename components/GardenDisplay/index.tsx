import React, { useEffect, useState } from "react";
import { useStore } from "../../src/store";
import { useLocation } from "react-router-dom";
import { Avatar, CircularProgress, Container } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Carousel from "../../components/Carousel";
import { MdEmail, MdPhone } from "react-icons/md";
import avatarMale from "../../src/images/avatar-male.jpg";
import avatarFemale from "../../src/images/avatar-female.jpg";

type Props = {
  id: string;
};

const Garden = ({ id }: Props) => {
  const location = useLocation();
  const [garden, setGarden] = useState<Garden>();
  const { gardens } = useStore();
  const {
    address,
    about,
    owner: { name, age, phone, email } = {
      name: "",
      age: 0,
      phone: "",
      email: "",
    },
  } = garden ?? {};

  const findThenSetGarden = (id: string) => {
    const foundGarden = gardens.find((gardens) => gardens._id === id);
    if (foundGarden) {
      setGarden(foundGarden);
    }
  };

  useEffect(() => {
    findThenSetGarden(id);
  }, [location]);

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
          {address}
        </Typography>

        <Carousel map={gardenMap}>
          {garden.pictures.map((imgSrc, index) => {
            return (
              <Container
                key={imgSrc + index}
                sx={{
                  height: "max-content",
                  width: "max-content",
                }}
              >
                <img
                  src={imgSrc}
                  style={{
                    height: "450px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Container>
            );
          })}
        </Carousel>

        <CardContent>
          <Typography variant="body2" color="text.secondary" p="12px">
            {about}
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
            <Typography>{name + ", " + age}</Typography>
            <Container
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "24px",
                flexWrap: "wrap",
                width: "max-content",
              }}
            >
              <a href={"tel:" + phone} className="cursor:pointer">
                <MdPhone size={24} />
              </a>

              <a href={"mailto:" + email} className="cursor:pointer">
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
