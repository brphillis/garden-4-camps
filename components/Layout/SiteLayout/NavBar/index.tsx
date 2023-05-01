import React, { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { MdAdd, MdHome, MdLogout } from "react-icons/md";

const SearchAppBar = () => {
  const { logout, user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleLogout}
          >
            <MdLogout />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <MdHome />
          </IconButton>

          {user && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => navigate("/addgarden")}
            >
              <MdAdd />
              <Typography sx={{ ml: 1 }}>Add A Garden</Typography>
            </IconButton>
          )}

          <Typography
            variant="h6"
            noWrap
            component="div"
            position="absolute"
            right="48px"
            sx={{
              float: "right",
              display: { xs: "none", sm: "block" },
              userSelect: "none",
            }}
          >
            Garden 4 Camps
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchAppBar;
