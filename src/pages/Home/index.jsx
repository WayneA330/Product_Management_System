import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../../styles/Home/index.css";

const Home = () => {
  let navigate = useNavigate();

  return (
    <Box className="container">
      {/* Title */}
      <Box className="title">
        <Typography variant="h4">Product Management System</Typography>
        <Typography variant="h5" className="sub_title">
          One Place To Manage All Your Products
        </Typography>
      </Box>
      {/* Dashboard Button */}
      <Box className="dashboard_btn_container">
        <Button
          variant="contained"
          endIcon={<ArrowForwardIosIcon />}
          onClick={() => navigate("/dashboard")}
        >
          Go To Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
