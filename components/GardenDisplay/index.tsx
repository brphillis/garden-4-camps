import React, { useContext, useEffect, useState } from "react";
import type { Garden, GardenComment } from "../..";
import { useStore } from "../../src/store";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "../../utility/DomHelpers";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  TextField,
} from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Carousel from "../../components/Carousel";
import { MdEmail, MdPhone } from "react-icons/md";
import { UserContext } from "../../context/UserContext";
import { generateId } from "../../utility/StringHelpers";

type Props = {
  id: string;
};

const Garden = ({ id }: Props) => {
  const location = useLocation();
  const { gardens } = useStore();
  const avatarMale = require("../../src/images/avatar-male.jpg");
  const avatarFemale = require("../../src/images/avatar-female.jpg");
  const { user } = useContext(UserContext);
  const addComment = useStore((state) => state.addComment);
  const [comment, setComment] = useState<string>("");
  const [latestComments, setLatestComments] = useState<GardenComment[]>();
  const [garden, setGarden] = useState<Garden>();
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
      setLatestComments(foundGarden.comments);
    }
  };

  useEffect(() => {
    findThenSetGarden(id);
    scrollToTop();
  }, [location]);

  const handleAddComment = () => {
    const newComment = { text: comment, user: user!.name };
    addComment(id, newComment);
    setLatestComments([newComment, ...latestComments!]);
  };

  if (garden) {
    const gardenMap = {
      latitude: garden.latitude,
      longitude: garden.longitude,
    };
    return (
      <Card
        sx={{
          position: "relative",
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
      >
        <Typography variant="h5" sx={{ padding: "24px", fontWeight: "bold" }}>
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
                    height: "350px",
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
        <Divider sx={{ width: "100%", margin: "12px 0px" }} />
        <Typography textAlign="center">Latest Comments</Typography>
        <Divider sx={{ width: "100%", margin: "12px 0px 24px 0px" }} />
        {latestComments &&
          latestComments.map(({ user, text }) => {
            return (
              <Box
                key={generateId()}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "300px",
                  marginBottom: "12px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Avatar sx={{ bgcolor: "blue" }}>{user.charAt(0)}</Avatar>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    p="12px"
                    fontWeight="bold"
                  >
                    {user}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.primary"
                  p="12px"
                  fontWeight="bold"
                >
                  " {text} "
                </Typography>
                <Divider sx={{ width: "100%", margin: "12px 0px" }} />
              </Box>
            );
          })}

        <Box sx={{ display: "block", margin: "24px auto" }}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              maxWidth: "98vw",
            }}
          >
            <Typography textAlign="center">Add a Comment</Typography>
            <TextField
              onChange={(e) => {
                setComment(e.target.value);
              }}
              sx={{ maxWidth: "95%", width: "500px", margin: "6px" }}
              id="outlined-multiline-static"
              label="Comment"
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              size="small"
              sx={{ width: "max-content", minWidth: "0px" }}
              onClick={handleAddComment}
            >
              Add Comment
            </Button>
          </Container>
        </Box>
      </Card>
    );
  } else {
    return <CircularProgress />;
  }
};

export default Garden;
