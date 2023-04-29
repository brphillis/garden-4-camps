import React, { useState } from "react";
import { useStore } from "./store";
import GardenCard from "../components/GardenCard";
import PageContent from "../components/Layout/PageContent";
import { Box } from "@mui/material";
import Form from "../components/GardenForm";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
export type AppProps = {};
export type AppComponent = React.FunctionComponent<AppProps>;

export const App: AppComponent = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const { gardens } = useStore();

  if (!user && !isRegistering) {
    return <LoginForm setUser={setUser} setIsRegistering={setIsRegistering} />;
  } else if (isRegistering && !user) {
    return (
      <RegisterForm setUser={setUser} setIsRegistering={setIsRegistering} />
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
