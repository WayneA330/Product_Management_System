import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

const AddProductModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "fit-content",
          bgcolor: "background.paper",
          borderRadius: "5px",
          boxShadow: 5,
          p: 2,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Add Product</Typography>
          <Close
            fontSize="large"
            onClick={handleClose}
            sx={{ cursor: "pointer" }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
