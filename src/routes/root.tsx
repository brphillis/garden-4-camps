import "sweetalert2/src/sweetalert2.scss";

import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../store";
import { UserContext } from "../../context/UserContext";
import { Outlet } from "react-router-dom";
import SiteLayout from "../../components/Layout/SiteLayout";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import PageContent from "../../components/Layout/PageContent";
import GardenCard from "../../components/GardenCard";
import { Box, Typography } from "@mui/material";
import { generateId } from "../../utility/StringHelpers";
import { Lottie } from "../../components/Lottie";
import campingAnimation from "../images/camping-animation.json";

export default function Root() {
  const location = useLocation();
  const isHome: boolean = location.pathname === "/";
  const { user, isRegistering } = useContext(UserContext);
  const { gardens } = useStore();

  return (
    <SiteLayout>
      <>
        {/* {!user && !isRegistering && <LoginForm />}

        {!user && isRegistering && <RegisterForm />} */}

        {!user && (
          <PageContent>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                width: "100vw",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap-reverse",
                gap: "48px",
              }}
            >
              <Box
                className="hideScroll"
                sx={{
                  overflowY: "scroll",
                  maxHeight: "calc(100vh - 85px)",
                  margin: "12px 0px",
                  display: { lg: "flex", xl: "block" },
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
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

              {isHome && (
                <Box
                  sx={{
                    height: "450px",
                    width: "450px",
                    display: "block",
                    margin: {
                      sm: "48px auto 64px auto",
                      md: "48px auto 64px auto",
                      xl: "92px auto auto auto",
                    },
                    padding: "48px",
                  }}
                >
                  <Lottie
                    animationData={campingAnimation}
                    loop={true}
                    autoplay={true}
                  />
                  <Typography
                    variant="h3"
                    textAlign="center"
                    fontWeight="bold"
                    color="white"
                    bgcolor="#0320fcBF"
                    borderRadius="12px"
                    padding="6px 12px"
                    sx={{ userSelect: "none" }}
                  >
                    Garden 4 Camps
                  </Typography>
                </Box>
              )}

              {!isHome && <Outlet />}
            </Box>
          </PageContent>
        )}
      </>
    </SiteLayout>
  );
}
