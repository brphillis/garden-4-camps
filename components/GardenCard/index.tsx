import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { maxLength } from "../../utility/StringHelpers";

const GardenCard = ({ status, address, owner, pictures, about }: User) => {
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
        size="small"
        variant="contained"
        sx={{ margin: "6px 12px", float: "right" }}
      >
        See More
      </Button>
    </Card>
  );
};

export default GardenCard;
