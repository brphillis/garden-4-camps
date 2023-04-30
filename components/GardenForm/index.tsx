import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../src/store";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import Validation from "../../utility/GardenValidation";
import { generateId } from "../../utility/StringHelpers";
import { MdAdd, MdCancel } from "react-icons/md";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

type Params = {
  id?: string;
};

export default function GardenForm({ id }: Params) {
  const location = useLocation();
  const addGarden = useStore((state) => state.addGarden);
  const updateGarden = useStore((state) => state.updateGarden);
  const { user } = useContext(UserContext);
  const [loadedGarden, setLoadedGarden] = useState<LoadedGarden | null>(null);
  const { gardens } = useStore();
  const [imageTwo, setImageTwo] = useState<boolean>(false);
  const [imageThree, setImageThree] = useState<boolean>(false);
  const [hasMap, setHasMap] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useRef<HTMLFormElement>(null);
  const {
    register: registerValidation,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Garden>({
    resolver: yupResolver(Validation),
  });

  const handleFormPrefill = (id: string) => {
    const foundGarden = gardens.find((gardens) => gardens._id === id);
    if (foundGarden) {
      Object.entries(foundGarden).forEach(([name, value]: any) =>
        setValue(name, value)
      );
      setLoadedGarden({
        owner: foundGarden.owner,
        _id: foundGarden._id,
        guid: foundGarden.guid,
      });
    }
  };

  useEffect(() => {
    reset();
    if (id) {
      handleFormPrefill(id);
    }
  }, [location]);

  const onSubmit = ({
    address,
    about,
    pictures,
    longitude,
    latitude,
  }: Garden) => {
    loadedGarden;

    const newGarden: Garden = {
      _id: loadedGarden?._id || generateId(),
      guid: loadedGarden?.guid || uuidv4(),
      address,
      about,
      pictures,
      longitude,
      latitude,
      tags: ["test", "test"],
      status: "active",
      owner: loadedGarden?.owner || user!,
    };

    const userOwnsGarden = user?.email === newGarden.owner.email;

    if (id && !userOwnsGarden) {
      alert("You dont own this Garden");
    }
    if (id && userOwnsGarden) {
      updateGarden(newGarden);
      navigate(`/gardens/${newGarden._id}`);
    } else {
      addGarden(newGarden);
      navigate(`/gardens/${newGarden._id}`);
    }
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
        padding="6px 12px 12px 12px"
        textAlign="center"
      >
        {`${loadedGarden ? "Edit " : "Add "} a Garden`}
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
            onClick={() => {
              setImageTwo(true);
            }}
          >
            <MdAdd />
          </Button>
        </Container>
      )}

      {imageTwo && (
        <Box mt={1} sx={{ position: "relative", width: "100%" }}>
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
            onClick={() => {
              setImageThree(true);
            }}
          >
            <MdAdd />
          </Button>
        </Container>
      )}

      {imageThree && (
        <Box mt={2} sx={{ position: "relative", width: "100%" }}>
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
          onClick={() => navigate("/")}
        >
          BACK
        </Button>
        <Button variant="contained" color="primary" type="submit">
          SUBMIT
        </Button>
      </div>
    </form>
  );
}
