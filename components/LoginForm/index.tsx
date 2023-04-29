import { TextField, Button, Box } from "@mui/material";
import * as React from "react";

type Props = {
  setUser: Function;
  setIsRegistering: Function;
};

const LoginForm = ({ setUser, setIsRegistering }: Props) => {
  return (
    <form
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
      />

      <TextField
        style={{ width: "98%", margin: "6px" }}
        type="text"
        label="Password"
        variant="outlined"
      />

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
          Register
        </Button>
        <Button variant="contained" color="primary">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
