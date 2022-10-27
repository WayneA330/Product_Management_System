import React, { useState } from "react";
import { Box, Button, IconButton, Popover } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../../../api/api";
import {
  Done,
  Close,
  MoreVert,
  Block,
  Edit,
  Delete,
} from "@mui/icons-material";
import { getData, postData } from "../../../api/methods";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import DeleteProductModal from "../Modals/DeleteProductModal";

const ProductTable = ({ setOpenAddProductModal, setEdit, setEditRowData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowID, setRowID] = useState();
  const [isActive, setIsActive] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setDeleteProduct("");
  };

  // Fetch the product data
  const { data } = useQuery(
    ["productData"],
    () => getData({ url: api.GET_PRODUCT_DATA }),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (err) => {
        // console.log(err);
      },
    }
  );

  // Deactivate Mutation
  const deactivateProduct = useMutation(
    (id) => {
      return postData({ url: api.DEACTIVATE_PRODUCT(id), body: {} });
    },
    {
      onSuccess: (data) => {
        handleClose();
        queryClient.invalidateQueries("productData");
        enqueueSnackbar("Successfully deactivated product", {
          variant: "success",
        });
      },
      onError: (error) => {
        handleClose();
        enqueueSnackbar("Error occured when deactivating product", {
          variant: "error",
        });
      },
    }
  );

  // Activate Mutation
  const activateProduct = useMutation(
    (id) => {
      return postData({ url: api.ACTIVATE_PRODUCT(id), body: {} });
    },
    {
      onSuccess: (data) => {
        handleClose();
        queryClient.invalidateQueries("productData");
        enqueueSnackbar("Successfully activated product", {
          variant: "success",
        });
      },
      onError: (error) => {
        handleClose();
        enqueueSnackbar("Error occured when activating product", {
          variant: "error",
        });
      },
    }
  );

  // Table Columns
  const columns = [
    { field: "name", headerName: "Name", flex: 1.3 },
    {
      field: "price",
      headerName: "Price (Rs)",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {params.row.stock >= 30 ? (
            <div style={{ color: "#27d89d" }}>{params.row.stock}</div>
          ) : (
            <div style={{ color: "#ff0a00" }}>{params.row.stock}</div>
          )}
        </>
      ),
    },
    {
      field: "bar_code",
      headerName: "Barcode",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "company_name",
      headerName: "Manufacturer",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "is_active",
      headerName: "Active",
      width: 80,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {params.row.is_active === true ? (
            <Done sx={{ color: "#27d89d" }} />
          ) : (
            <Close sx={{ color: "#ff0a00" }} />
          )}
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(e) => {
              handleClick(e);
              setRowID(params.id);
              setIsActive(params.row.is_active);
              setEditRowData(params.row);
              setDeleteProduct(params.row.name);
            }}
          >
            <MoreVert />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => {
              handleClose();
              setRowID(params.id);
              setEdit(false);
              setEditRowData(null);
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            elevation={1}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant="text"
                startIcon={<Block />}
                sx={{ color: "#000" }}
                onClick={() => {
                  isActive
                    ? deactivateProduct.mutate(rowID)
                    : activateProduct.mutate(rowID);
                }}
              >
                {isActive ? "Deactivate" : "Activate"}
              </Button>
              <Button
                variant="text"
                startIcon={<Edit />}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "#000",
                }}
                onClick={() => {
                  setEdit(true);
                  setOpenAddProductModal(true);
                  handleClose();
                }}
              >
                Edit
              </Button>
              <Button
                variant="text"
                startIcon={<Delete />}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "#000",
                }}
                onClick={() => {
                  setOpenDeleteModal(true);
                  handleClose();
                }}
              >
                Delete
              </Button>
            </Box>
          </Popover>
        </>
      ),
    },
  ];

  return (
    <Box margin={3}>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button
          variant="contained"
          onClick={() => setOpenAddProductModal(true)}
        >
          Add Product
        </Button>
      </Box>
      <Box sx={{ height: 475, width: "100%" }}>
        {data && (
          <DataGrid
            columns={columns}
            rows={data}
            getRowId={(row) => row?.products_id}
            pageSize={7}
            rowsPerPageOptions={[7]}
            disableSelectionOnClick
          />
        )}
      </Box>

      <DeleteProductModal
        open={openDeleteModal}
        handleClose={closeDeleteModal}
        deleteProduct={deleteProduct}
        productID={rowID}
        setRowID={setRowID}
        setEdit={setEdit}
        setEditRowData={setEditRowData}
      />
    </Box>
  );
};

export default ProductTable;
