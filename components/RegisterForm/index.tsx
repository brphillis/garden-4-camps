import { TextField, Button, Box, Typography } from "@mui/material";
import * as React from "react";
import { useRef } from "react";
import { useStore } from "../../src/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Validation from "../../utility/RegisterValidation";

type Props = {
  setUser: Function;
  setIsRegistering: Function;
};

const RegisterForm = ({ setUser, setIsRegistering }: Props) => {
  const form = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(Validation),
  });

  const addUser = useStore((state) => state.addUser);

  const onSubmit = (inputData: User) => {
    const newUser: User = { ...inputData };
    addUser(newUser);
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      style={{
        backgroundColor: "white",
        display: "block",
        flexDirection: "column",
        maxWidth: "380px",
        justifyContent: "center",
        alignItems: "center",
        margin: "calc(100vh/10) auto",
        padding: "12px",
      }}
    >
      <TextField
        style={{ width: "98%", margin: "6px" }}
        type="text"
        label="Username"
        variant="outlined"
        {...register("name")}
      />
      <Typography
        color="warning.main"
        fontWeight="bold"
        padding="2px 12px"
        fontSize="12px"
      >
        {errors.name?.message}
      </Typography>

      <TextField
        style={{ width: "98%", margin: "6px" }}
        type="text"
        label="Email"
        variant="outlined"
        {...register("email")}
      />

      <Typography
        color="warning.main"
        fontWeight="bold"
        padding="2px 12px"
        fontSize="12px"
      >
        {errors.email?.message}
      </Typography>

      <TextField
        style={{ width: "98%", margin: "6px" }}
        type="text"
        label="Password"
        variant="outlined"
        {...register("password")}
      />

      <Typography
        color="warning.main"
        fontWeight="bold"
        padding="2px 12px"
        fontSize="12px"
      >
        {errors.password?.message}
      </Typography>

      <TextField
        style={{ width: "98%", margin: "6px" }}
        type="number"
        label="Age"
        variant="outlined"
        {...register("age")}
      />

      <Typography
        color="warning.main"
        fontWeight="bold"
        padding="2px 12px"
        fontSize="12px"
      >
        {errors.age?.message}
      </Typography>

      <TextField
        style={{ width: "98%", margin: "6px" }}
        type="text"
        label="Gender"
        variant="outlined"
        {...register("gender")}
      />

      <Typography
        color="warning.main"
        fontWeight="bold"
        padding="2px 12px"
        fontSize="12px"
      >
        {errors.gender?.message}
      </Typography>

      <TextField
        style={{ width: "98%", margin: "6px" }}
        type="text"
        label="Phone"
        variant="outlined"
        {...register("phone")}
      />

      <Typography
        color="warning.main"
        fontWeight="bold"
        padding="2px 12px"
        fontSize="12px"
      >
        {errors.phone?.message}
      </Typography>

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
          onClick={() => setIsRegistering(false)}
        >
          Back
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
