import React, { useContext } from "react";
import type { Garden } from "../..";
import { UserContext } from "../../context/UserContext";
import { useStore } from "../../src/store";
import { useNavigate, Link } from "react-router-dom";
import { maxLength } from "../../utility/StringHelpers";
import { MdDelete, MdEdit } from "react-icons/md";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { scrollToTop } from "../../utility/DomHelpers";
import { Box } from "@mui/material";

const GardenCard = ({ address, pictures, about, _id, tags, owner }: Garden) => {
  const Navigate = useNavigate();
  const removeGarden = useStore((state) => state.removeGarden);

  //Logic is disabled for demonstration purposes - enable to prevent users from editing gardens they dont own
  // const { user } = useContext(UserContext);
  // const userOwnsGarden = user?.email === owner.email;

  return (
    <Card sx={{ maxWidth: 460, margin: "0px 6px", marginBottom: "12px" }}>
      <CardMedia sx={{ position: "relative", height: 180 }} image={pictures[0]}>
        {tags && (
          <Box
            position="absolute"
            display="flex"
            flexDirection="row"
            gap="6px"
            top="6px"
            marginLeft="6px"
          >
            {tags.map((tag) => {
              return (
                <Typography color="white" style={{ opacity: "0.5" }}>
                  {tag + " "}
                </Typography>
              );
            })}
          </Box>
        )}

        <Typography
          sx={{
            position: "absolute",
            bottom: "0px",
            background: "#ffffffBF",
            width: "100%",
            marginBottom: "0px",
            padding: "6px 12px",
          }}
          gutterBottom
          variant="body1"
          component="div"
        >
          {address}
        </Typography>
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {maxLength(about, 205)}
        </Typography>
      </CardContent>
      {/* Logic is disabled for demonstration purposes - enable to prevent users
      from editing gardens they dont own */}
      {/* {userOwnsGarden && ( */}
      <>
        <Button
          size="large"
          variant="contained"
          sx={{
            margin: "6px 6px 12px 12px",
            float: "left",
            borderRadius: "100%",
            height: "32px",
            width: "32px",
            padding: "0px",
            minWidth: "0px",
          }}
          onClick={() => {
            Navigate(`/editGarden/${_id}`);
            scrollToTop();
          }}
        >
          <MdEdit />
        </Button>

        <Button
          size="large"
          variant="contained"
          sx={{
            margin: "6px",
            float: "left",
            borderRadius: "100%",
            height: "32px",
            width: "32px",
            padding: "0px",
            minWidth: "0px",
          }}
          onClick={() => {
            removeGarden(_id);
          }}
        >
          <MdDelete />
        </Button>
      </>
      {/* )} */}

      <Link to={`gardens/${_id}`}>
        <Button
          size="small"
          variant="contained"
          sx={{ margin: "6px 12px", float: "right" }}
        >
          See More
        </Button>
      </Link>
    </Card>
  );
};

export default GardenCard;
