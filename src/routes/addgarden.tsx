import React, { useContext, useId, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Validation from "../../utility/GardenValidation";
import { UserContext } from "../../context/UserContext";
import { generateId } from "../../utility/StringHelpers";
import { v4 as uuidv4 } from "uuid";

import { MdAdd, MdCancel } from "react-icons/md";

export async function loader({ params }) {
  if (params) {
    const data = params;
    return data.id;
  }
}

const AddGarden = () => {
  //   const location = useLocation();
  //   const id = useLoaderData() as string;
  const addGarden = useStore((state) => state.addGarden);
  const { user } = useContext(UserContext);
  //   const [garden, setGarden] = useState<Garden>();
  //   const { gardens } = useStore();
  const [imageTwo, setImageTwo] = useState<boolean>(false);
  const [imageThree, setImageThree] = useState<boolean>(false);
  const [hasMap, setHasMap] = useState<boolean>(false);
  const navigate = useNavigate();

  //   const findThenSetGarden = (id: string) => {
  //     const foundGarden = gardens.find((gardens) => gardens._id === id);
  //     if (foundGarden) {
  //       setGarden(foundGarden);
  //     }
  //   };

  const form = useRef<HTMLFormElement>(null);
  const {
    register: registerValidation,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Garden>({
    resolver: yupResolver(Validation),
  });

  const onSubmit = ({
    address,
    about,
    pictures,
    longitude,
    latitude,
  }: Garden) => {
    const garden: Garden = {
      _id: generateId(),
      guid: uuidv4(),
      address,
      about,
      pictures,
      longitude,
      latitude,
      tags: ["test", "test"],
      status: "active",
      owner: user!,
    };

    addGarden(garden);
    navigate("/");
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      style={{
        borderRadius: "6px",
        backgroundColor: "white",
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        width: "400px",
        maxWidth: "98vw",
        justifyContent: "center",
        alignItems: "center",
        margin: "calc(100vh/10) auto",
        padding: "24px",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        padding="6px 12px"
        textAlign="center"
      >
        Add a Garden
      </Typography>
      <TextField
        sx={{ width: "100%", margin: "6px" }}
        type="text"
        label="Address"
        variant="outlined"
        {...registerValidation("address")}
      />
      <Typography
        color="warning.main"
        fontWeight="bold"
        padding="6px 12px"
        fontSize="12px"
      >
        {errors.address?.message}
      </Typography>

      <TextField
        sx={{ width: "100%", margin: "6px" }}
        id="outlined-multiline-static"
        label="About"
        multiline
        rows={4}
        {...registerValidation("about")}
      />
      <Typography
        color="warning.main"
        fontWeight="bold"
        padding="6px 12px"
        fontSize="12px"
      >
        {errors.about?.message}
      </Typography>

      <TextField
        sx={{ width: "100%", margin: "6px" }}
        type="text"
        label="Image URL"
        variant="outlined"
        size="small"
        {...registerValidation("pictures.0")}
      />

      {!imageTwo && !imageThree && (
        <Container>
          <Button
            variant="contained"
            size="small"
            sx={{ width: "max-content", minWidth: "0px" }}
          >
            <MdAdd
              onClick={() => {
                setImageTwo(true);
              }}
            />
          </Button>
        </Container>
      )}

      {imageTwo && (
        <Box sx={{ position: "relative", width: "100%" }}>
          <TextField
            sx={{ position: "relative", width: "100%" }}
            type="text"
            label="Image URL"
            variant="outlined"
            size="small"
            {...registerValidation("pictures.1")}
          />

          <MdCancel
            onClick={() => setImageTwo(false)}
            style={{
              position: "absolute",
              top: "0",
              right: "-10px",
              cursor: "pointer",
              color: "blue",
              backgroundColor: "white",
            }}
          />
        </Box>
      )}

      {imageTwo && !imageThree && (
        <Container>
          <Button
            variant="contained"
            size="small"
            sx={{ width: "max-content", minWidth: "0px", marginTop: "6px" }}
          >
            <MdAdd
              onClick={() => {
                setImageThree(true);
              }}
            />
          </Button>
        </Container>
      )}

      {imageThree && (
        <Box sx={{ position: "relative", width: "100%", marginTop: "6px" }}>
          <TextField
            sx={{ position: "relative", width: "100%" }}
            type="text"
            label="Image URL"
            variant="outlined"
            size="small"
            {...registerValidation("pictures.2")}
          />

          <MdCancel
            onClick={() => setImageThree(false)}
            style={{
              position: "absolute",
              top: "0",
              right: "-10px",
              cursor: "pointer",
              color: "blue",
              backgroundColor: "white",
            }}
          />
        </Box>
      )}

      <Typography
        color="warning.main"
        fontWeight="bold"
        padding="6px 12px"
        fontSize="12px"
      >
        {errors.pictures?.message}
      </Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              onClick={() => {
                setHasMap(!hasMap);
              }}
            />
          }
          label="Display a Map?"
        />
      </FormGroup>

      {hasMap && (
        <>
          <TextField
            sx={{ width: "100%", margin: "6px" }}
            type="number"
            label="Longitude"
            variant="outlined"
            size="small"
            {...registerValidation("longitude")}
          />

          <TextField
            sx={{ width: "100%", margin: "6px" }}
            type="number"
            label="Latitude"
            variant="outlined"
            size="small"
            {...registerValidation("latitude")}
          />
        </>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "6px",
          margin: "12px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          //   onClick={() => setIsRegistering(true)}
        >
          BACK
        </Button>
        <Button variant="contained" color="primary" type="submit">
          SUBMIT
        </Button>
      </div>
    </form>
  );
  //   } else {
  //     return <CircularProgress />;
  //   }
};

export default AddGarden;
