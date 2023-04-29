import { TextField, Button, Box } from "@mui/material";
import * as React from "react";
export default function GardenForm() {
  return (
    <Box>
      <form
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          maxWidth: "600px",
          justifyContent: "center",
          alignItems: "center",
          margin: "12px",
          padding: "12px",
        }}
      >
        <TextField
          style={{ width: "98%", margin: "6px" }}
          type="text"
          label="Address"
          variant="outlined"
        />

        <TextField
          style={{ width: "98%", margin: "6px" }}
          type="text"
          label="Owner"
          variant="outlined"
        />

        <TextField
          style={{ width: "98%", margin: "6px" }}
          type="text"
          label="Diversity catagory"
          variant="outlined"
        />

        <TextField
          style={{ width: "98%", margin: "6px" }}
          type="text"
          label="Attribute"
          variant="outlined"
        />

        <TextField
          style={{ width: "98%", margin: "6px" }}
          type="text"
          label="goal stage"
          variant="outlined"
        />

        <TextField
          style={{ width: "98%", margin: "6px" }}
          type="number"
          label="job id"
          variant="outlined"
        />

        <TextField
          style={{ width: "98%", margin: "6px" }}
          type="text"
          label="job region"
          variant="outlined"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "6px",
            margin: "12px",
          }}
        >
          <Button variant="contained" color="primary">
            Back
          </Button>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
}
