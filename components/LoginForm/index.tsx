import { TextField, Button, Typography } from "@mui/material";
import * as React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Validation from "../../utility/LoginValidation";

type Props = {
  setUser: Function;
  setIsRegistering: Function;
};

const LoginForm = ({ setUser, setIsRegistering }: Props) => {
  const form = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(Validation),
  });

  const onSubmit = (inputData: User) => {
    setUser(inputData.email, inputData.password);
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
        label="Email Address"
        variant="outlined"
        {...register("email")}
      />
      <Typography
        color="warning.main"
        fontWeight="bold"
        padding="6px 12px"
        fontSize="12px"
      >
        {errors.email?.message}
      </Typography>

      <TextField
        style={{ width: "98%", margin: "6px" }}
        type="password"
        label="Password"
        variant="outlined"
        {...register("password")}
      />

      <Typography
        color="warning.main"
        fontWeight="bold"
        padding="6px 12px"
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
          onClick={() => setIsRegistering(true)}
        >
          REGISTER
        </Button>
        <Button variant="contained" color="primary" type="submit">
          LOGIN
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
