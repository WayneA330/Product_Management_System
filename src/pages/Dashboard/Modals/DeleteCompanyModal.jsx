import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";
import { Close } from "@mui/icons-material";
import { postData } from "../../../api/methods";
import api from "../../../api/api";

const DeleteCompanyModal = ({
  open,
  handleClose,
  deleteCompany,
  companyID,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const deleteCompanyFn = useMutation(
    (data) => {
      return postData({ url: api.DELETE_COMPANY(companyID), body: {} });
    },
    {
      onSuccess: (data) => {
        handleClose();
        queryClient.invalidateQueries("companyData");
        queryClient.invalidateQueries("productData");
        queryClient.invalidateQueries("companyName");
        enqueueSnackbar("Successfully deleted company", {
          variant: "success",
        });
      },
      onError: (error) => {
        handleClose();
        enqueueSnackbar("Error occured when activating company", {
          variant: "error",
        });
      },
    }
  );

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
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
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h6">
            Are you sure you want to delete {deleteCompany}?
          </Typography>
          <Close
            fontSize="medium"
            onClick={() => {
              handleClose();
            }}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        {/* Content */}
        <Box>
          <Typography>
            Deleting {deleteCompany} will also delete all products associated
            with this company.
          </Typography>
        </Box>
        {/* Buttons */}
        <Box
          sx={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="text"
            onClick={() => {
              handleClose();
            }}
            sx={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteCompanyFn.mutate()}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteCompanyModal;
