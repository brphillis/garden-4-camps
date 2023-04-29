import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { maxLength } from "../../utility/StringHelpers";
import { MdDelete, MdEdit } from "react-icons/md";
import { useStore } from "../../src/store";
import { Link } from "react-router-dom";

const GardenCard = ({
  status,
  address,
  owner,
  pictures,
  about,
  _id,
}: Garden) => {
  const removeGarden = useStore((state) => state.removeGarden);

  return (
    <Card sx={{ maxWidth: 460, margin: "12px 24px" }}>
      <CardMedia sx={{ position: "relative", height: 180 }} image={pictures[0]}>
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
