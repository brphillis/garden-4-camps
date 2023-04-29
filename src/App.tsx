import "sweetalert2/src/sweetalert2.scss";

import React, { useEffect, useState } from "react";
import { useStore } from "./store";
import GardenCard from "../components/GardenCard";
import PageContent from "../components/Layout/PageContent";
import Form from "../components/GardenForm";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
export type AppProps = {};
export type AppComponent = React.FunctionComponent<AppProps>;

export const App: AppComponent = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const { gardens, users } = useStore();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const registerThenSetUser = (email: string) => {
    const foundUser = users.find((users) => users.email === email);
    if (foundUser) {
      delete foundUser.password;
      setUser(foundUser);
    }
  };

  const loginThenSetUser = (email: string, password: string) => {
    const foundUser = users.find((users) => {
      return users.email === email && users.password === password;
    });
    if (foundUser) {
      delete foundUser.password;
      setUser(foundUser);
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Login Credentials.",
        showConfirmButton: true,
      });
    }
  };

  if (!user && !isRegistering) {
    return (
      <LoginForm
        setUser={loginThenSetUser}
        setIsRegistering={setIsRegistering}
      />
    );
  } else if (isRegistering) {
    return (
      <RegisterForm
        setUser={registerThenSetUser}
        setIsRegistering={setIsRegistering}
      />
    );
  } else
    return (
      <>
        <PageContent>
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <Box>
              {gardens.map((gardens: Garden) => {
                return (
                  <React.Fragment key={gardens._id}>
                    <GardenCard {...gardens} />
                  </React.Fragment>
                );
              })}
            </Box>
            <Form />
          </Box>
        </PageContent>
      </>
    );
};
