import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import api from "../../../api/api";
import { Done, Close, MoreVert, Block, Edit } from "@mui/icons-material";
import { getData } from "../../../api/methods";
import { DataGrid } from "@mui/x-data-grid";

const ProductTable = ({ setOpenAddProductModal }) => {
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
          <IconButton>
            <MoreVert />
          </IconButton>
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
    </Box>
  );
};

export default ProductTable;
