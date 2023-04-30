import "sweetalert2/src/sweetalert2.scss";

import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useStore } from "../store";
import { UserContext } from "../../context/UserContext";
import SiteLayout from "../../components/Layout/SiteLayout";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import PageContent from "../../components/Layout/PageContent";
import GardenCard from "../../components/GardenCard";
import { Box, Container } from "@mui/material";
import { generateId } from "../../utility/StringHelpers";

export default function Root() {
  const { user, isRegistering } = useContext(UserContext);
  const { gardens } = useStore();

  return (
    <SiteLayout>
      <>
        {!user && !isRegistering && <LoginForm />}

        {!user && isRegistering && <RegisterForm />}

        {user && (
          <PageContent>
            <Box
              sx={{
                display: "flex",
                width: "100vw",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Box
                className="hideScroll"
                sx={{
                  overflowY: "scroll",
                  maxHeight: "calc(100vh - 85px)",
                  margin: "12px 0px",
                }}
              >
                {gardens.map((gardens: Garden) => {
                  return (
                    <React.Fragment key={generateId()}>
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
  );
}
