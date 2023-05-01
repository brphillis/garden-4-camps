import "sweetalert2/src/sweetalert2.scss";
import type { Garden, Filter } from "../..";

import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../store";
import { UserContext } from "../../context/UserContext";
import { Outlet } from "react-router-dom";
import SiteLayout from "../../components/Layout/SiteLayout";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import PageContent from "../../components/Layout/PageContent";
import GardenCard from "../../components/GardenCard";
import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import { generateId } from "../../utility/StringHelpers";
import { Lottie } from "../../components/Lottie";
import campingAnimation from "../images/camping-animation.json";

export default function Root() {
  const location = useLocation();
  const isHome: boolean = location.pathname === "/";
  const { user, isRegistering } = useContext(UserContext);
  const { gardens } = useStore();
  const [currentGardens, setCurrengardens] = useState<Garden[]>(gardens);
  const [currentFilter, setCurrentFilter] = useState<Filter>("Address");

  const filterGardens = (searchString: string) => {
    let result: Garden[] = [];

    if (currentFilter === "Address") {
      result = gardens.filter((garden) =>
        garden.address.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    if (currentFilter === "Tag") {
      result = gardens.filter((garden) =>
        garden.tags.some((tag) =>
          tag.toLowerCase().includes(searchString.toLowerCase())
        )
      );
    }

    if (result.length > 0) {
      setCurrengardens(result);
    }
  };

  useEffect(() => {
    setCurrengardens(currentGardens);
  }, [gardens, filterGardens]);

  return (
    <SiteLayout>
      <>
        {!user && !isRegistering && <LoginForm />}

        {!user && isRegistering && <RegisterForm />}

        {user && (
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
                <Box
                  sx={{
                    padding: "8px",
                    background: "white",
                    borderRadius: "12px",
                    margin: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  <TextField
                    style={{
                      background: "white",
                      borderRadius: "12px",
                      width: "60%",
                    }}
                    onChange={(e) => {
                      filterGardens(e.target.value);
                    }}
                    type="text"
                    label="Search"
                    variant="outlined"
                  />
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Filter By"
                    sx={{ width: "30%" }}
                    onChange={(e) => setCurrentFilter(e.target.value as Filter)}
                  >
                    <MenuItem value="Address">Address</MenuItem>
                    <MenuItem value="Tag">Tag</MenuItem>
                  </Select>
                </Box>
                {currentGardens.map((gardens: Garden) => {
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
                      sm: "48px 100px 64px 100px",
                      md: "48px 100px 64px 100px",
                      xl: "92px 100px auto 100px",
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
