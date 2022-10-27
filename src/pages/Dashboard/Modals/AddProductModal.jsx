import React from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Close } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getData, postData } from "../../../api/methods";
import api from "../../../api/api";
import { useSnackbar } from "notistack";

const AddProductModal = ({
  open,
  handleClose,
  edit,
  editRowData,
  setEdit,
  setEditRowData,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const resetState = () => {
    setEdit(false);
    setEditRowData(null);
  };

  // Fetch Companies Name
  const { data } = useQuery(
    ["companyName"],
    () => getData({ url: api.GET_COMPANY_NAME }),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (err) => {
        // console.log(err);
      },
    }
  );

  // Add Product Mutation
  const addProduct = useMutation(
    (data) => {
      return postData({ url: api.ADD_PRODUCT, body: data });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("productData");
        resetState();
        handleClose();
        enqueueSnackbar("Successfully added product", {
          variant: "success",
        });
      },
      onError: (error) => {
        enqueueSnackbar("Error occured when adding product", {
          variant: "error",
        });
      },
    }
  );

  // Edit Product Mutation
  const editProduct = useMutation(
    (data) => {
      return postData({
        url: api.EDIT_PRODUCT(editRowData?.products_id),
        body: data,
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("productData");
        handleClose();
        resetState();
        enqueueSnackbar("Successfully edited product", {
          variant: "success",
        });
      },
      onError: (error) => {
        enqueueSnackbar("Error occured when editing product", {
          variant: "error",
        });
      },
    }
  );

  const validationSchema = yup.object({
    name: yup.string().required("Product name is required"),
    price: yup
      .number()
      .typeError("Please enter numbers only")
      .required("Price is required"),
    stock: yup
      .number()
      .typeError("Please enter numbers only")
      .required("Stock is required"),
    bar_code: yup
      .number()
      .typeError("Please enter numbers only")
      .required("Barcode is required")
      .test(
        "len",
        "Must contain 12 numbers",
        (val) => val?.toString()?.length === 12 // .length does not work on numbers
      ),
    company_id: yup.string().required("Manufacturer is required"),
  });

  const onFinish = (values, actions) => {
    edit ? editProduct.mutate(values) : addProduct.mutate(values);
    actions.setSubmitting(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
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
            {edit ? "Edit Product" : "Add Product"}
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
        {/* Add Product Fields */}
        <Formik
          initialValues={{
            name: editRowData?.name ?? "",
            price: editRowData?.price ?? "",
            stock: editRowData?.stock ?? "",
            bar_code: editRowData?.bar_code ?? "",
            company_id: editRowData?.company_id ?? "",
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
                {/* Product Name */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Product Name"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                {/* Product Price */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    variant="outlined"
                    label="Product Price"
                    name="price"
                    onChange={handleChange}
                    value={values.price}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rs</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* Product Stock */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    variant="outlined"
                    label="Product Stock"
                    name="stock"
                    onChange={handleChange}
                    value={values.stock}
                    error={touched.stock && Boolean(errors.stock)}
                    helperText={touched.stock && errors.stock}
                  />
                </Grid>
                {/* Product Barcode */}
                <Grid item xs={12} md={6}>
                  <TextField
                    id="barcode"
                    fullWidth
                    type="number"
                    label="Product Barcode"
                    name="bar_code"
                    onChange={handleChange}
                    value={values.bar_code}
                    error={touched.bar_code && Boolean(errors.bar_code)}
                    helperText={touched.bar_code && errors.bar_code}
                  />
                </Grid>
                {/* Manufacturer */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Manufacturer
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.company_id}
                      name="company_id"
                      label="Manufacturer"
                      onChange={handleChange}
                      error={Boolean(touched.company_id && errors.company_id)}
                    >
                      {data &&
                        data?.map((item, index) => (
                          <MenuItem value={item.company_id} key={index}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                    {touched.company_id && errors.company_id ? (
                      <FormHelperText
                        sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                      >
                        {touched.company_id && errors.company_id}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
              </Grid>
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

export default AddProductModal;
