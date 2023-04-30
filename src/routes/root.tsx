import "sweetalert2/src/sweetalert2.scss";

import React, { useContext } from "react";
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

  console.log(location);
  return (
    <SiteLayout>
      <>
        {/* {!user && !isRegistering && <LoginForm />}

        {!user && isRegistering && <RegisterForm />} */}

        {!user && (
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

              {isHome && (
                <Box
                  sx={{
                    height: "450px",
                    width: "450px",
                    display: "block",
                    margin: "5% auto",
                  }}
                >
                  <Lottie
                    animationData={campingAnimation}
                    loop={true}
                    autoplay={true}
                    className="block mx-auto h-[120px] w-[120px] mb-2"
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
