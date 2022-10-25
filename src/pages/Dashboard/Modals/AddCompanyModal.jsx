import React, { useState } from "react";
import { Modal, Box, TextField, Typography, Grid, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Close } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { postData } from "../../../api/methods";
import api from "../../../api/api";
import { useMutation, useQueryClient } from "react-query";

const AddCompanyModal = ({
  open,
  handleClose,
  edit,
  editRowData,
  setEdit,
  setEditRowData,
}) => {
  const [error, setError] = useState(false);

  const queryClient = useQueryClient();

  const resetState = () => {
    setEdit(false);
    setEditRowData(null);
    setError(false);
  };

  const validationSchema = yup.object({
    name: yup.string().required("Company name is required"),
    address: yup.string().required("Address is required"),
    phone_no: yup
      .number()
      .typeError("Please enter numbers only")
      .required("Phone Number is required"),
  });

  // Add Company Mutation
  const addCompany = useMutation(
    (data) => {
      return postData({ url: api.ADD_COMPANY, body: data });
    },
    {
      onSuccess: (data) => {
        handleClose();
        resetState();
        queryClient.invalidateQueries("companyData");
      },
      onError: (error) => {
        setError(true);
      },
    }
  );

  // Edit Company Mutation
  const editCompany = useMutation(
    (data) => {
      return postData({
        url: api.EDIT_COMPANY(editRowData?.company_id),
        body: data,
      });
    },
    {
      onSuccess: (data) => {
        handleClose();
        resetState();
        queryClient.invalidateQueries("companyData");
      },
      onError: (error) => {
        setError(true);
      },
    }
  );

  const onFinish = (values, actions) => {
    edit ? editCompany.mutate(values) : addCompany.mutate(values);
    actions.setSubmitting(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        resetState();
      }}
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
            marginBottom: "10px",
          }}
        >
          <Typography variant="h5">
            {edit ? "Edit Company" : "Add Company"}
          </Typography>
          <Close
            fontSize="large"
            onClick={() => {
              handleClose();
              resetState();
            }}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        {/* Error Field */}
        {error && (
          <Box
            sx={{
              width: "325px",
              bgcolor: "#ff0a00",
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              marginBottom: "20px",
              borderRadius: "5px",
              p: 1,
            }}
          >
            <Typography color="white">
              An error occurred. Please try again later.
            </Typography>
          </Box>
        )}
        {/* Add Company Fields */}
        <Formik
          initialValues={{
            name: editRowData?.name ?? "",
            address: editRowData?.address ?? "",
            phone_no: editRowData?.phone_no ?? "",
          }}
          validationSchema={validationSchema}
          onSubmit={onFinish}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Company Name */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Company Name"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                {/* Company Phone Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Company Phone Number"
                    name="phone_no"
                    onChange={handleChange}
                    value={values.phone_no}
                    error={touched.phone_no && Boolean(errors.phone_no)}
                    helperText={touched.phone_no && errors.phone_no}
                  />
                </Grid>
                {/* Company Address */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Company Address"
                    name="address"
                    onChange={handleChange}
                    value={values.address}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>
              </Grid>
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
                    resetState();
                  }}
                  sx={{ marginRight: "10px" }}
                >
                  Cancel
                </Button>
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  type="submit"
                >
                  {isSubmitting ? "Saving" : "Save"}
                </LoadingButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddCompanyModal;
