import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme";
import SiteLayout from "../../components/Layout/SiteLayout";
import { useStore } from "../store";

import { Box } from "@mui/material";
import Swal from "sweetalert2";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import PageContent from "../../components/Layout/PageContent";
import GardenCard from "../../components/GardenCard";

export default function Root() {
  const [user, setUser] = useState<User | null>(null);
  const [localUser, setLocalUser] = useState<string | null>(
    localStorage.gardenUser
  );
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const { gardens, users } = useStore();

  const registerThenSetUser = (email: string) => {
    const foundUser = users.find((users) => users.email === email);
    if (foundUser) {
      setUser(foundUser);
    }
  };

  const loginThenSetUser = (email: string, password: string) => {
    const foundUser = users.find((users) => {
      return users.email === email && users.password === password;
    });

    if (foundUser) {
      setUser(foundUser);
      //we will just use localStorage for this local project
      localStorage.setItem("gardenUser", foundUser.email);
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Login Credentials.",
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
    if (localStorage.gardenUser) {
      const foundUser = users.find((users) => {
        return users.email === localStorage.gardenUser;
      });
      if (foundUser) {
        setUser(foundUser);
      } else {
        setLocalUser(null);
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SiteLayout setUser={setUser}>
        <>
          {!user && !localUser && !isRegistering && (
            <LoginForm
              setUser={loginThenSetUser}
              setIsRegistering={setIsRegistering}
            />
          )}

          {!user && !localUser && isRegistering && (
            <RegisterForm
              setUser={registerThenSetUser}
              setIsRegistering={setIsRegistering}
            />
          )}

          {user && (
            <PageContent>
              <Box
                sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
              >
                <Box>
                  {gardens.map((gardens: Garden) => {
                    return (
                      <React.Fragment key={gardens._id}>
                        <GardenCard {...gardens} />
                      </React.Fragment>
                    );
                  })}
                </Box>
                <Outlet />
              </Box>
            </PageContent>
          )}
        </>
      </SiteLayout>
    </ThemeProvider>
  );
}
