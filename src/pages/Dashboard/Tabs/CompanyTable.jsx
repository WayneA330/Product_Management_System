import React, { useState } from "react";
import { Button, Box, IconButton, Popover } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Done,
  Close,
  MoreVert,
  Block,
  Edit,
  Delete,
} from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "notistack";
import { getData, postData } from "../../../api/methods";
import api from "../../../api/api";
import DeleteCompanyModal from "../Modals/DeleteCompanyModal";

const CompanyTable = ({ setOpenAddCompanyModal, setEdit, setEditRowData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowID, setRowID] = useState();
  const [isActive, setIsActive] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteCompany, setDeleteCompany] = useState("");

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
    setDeleteCompany("");
  };

  // Fetch the company data
  const { data } = useQuery(
    ["companyData"],
    () => getData({ url: api.GET_COMPANY_DATA }),
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
  const deactivateCompany = useMutation(
    (id) => {
      return postData({ url: api.DEACTIVATE_COMPANY(id), body: {} });
    },
    {
      onSuccess: (data) => {
        handleClose();
        queryClient.invalidateQueries("companyData");
        queryClient.invalidateQueries("productData");
        queryClient.invalidateQueries("companyName");
        enqueueSnackbar("Successfully deactivated company", {
          variant: "success",
        });
      },
      onError: (error) => {
        handleClose();
        enqueueSnackbar("Error occured when deactivating company", {
          variant: "error",
        });
      },
    }
  );

  // Activate Mutation
  const activateCompany = useMutation(
    (id) => {
      return postData({ url: api.ACTIVATE_COMPANY(id), body: {} });
    },
    {
      onSuccess: (data) => {
        handleClose();
        queryClient.invalidateQueries("companyData");
        queryClient.invalidateQueries("productData");
        queryClient.invalidateQueries("companyName");
        enqueueSnackbar("Successfully activated company", {
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

  // Table Columns
  const columns = [
    { field: "name", headerName: "Name", flex: 0.8 },
    { field: "address", headerName: "Address", flex: 1.3 },
    {
      field: "phone_no",
      headerName: "Phone Number",
      flex: 0.5,
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
              setDeleteCompany(params.row.name);
            }}
          >
            <MoreVert />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => {
              handleClose();
              setRowID();
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
                    ? deactivateCompany.mutate(rowID)
                    : activateCompany.mutate(rowID);
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
                  setOpenAddCompanyModal(true);
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
          onClick={() => setOpenAddCompanyModal(true)}
        >
          Add Company
        </Button>
      </Box>
      <Box sx={{ height: 475, width: "100%" }}>
        {data && (
          <DataGrid
            columns={columns}
            rows={data}
            getRowId={(row) => row?.company_id}
            pageSize={7}
            rowsPerPageOptions={[7]}
            disableSelectionOnClick
          />
        )}
      </Box>

      <DeleteCompanyModal
        open={openDeleteModal}
        handleClose={closeDeleteModal}
        deleteCompany={deleteCompany}
        companyID={rowID}
        setRowID={setRowID}
        setEdit={setEdit}
        setEditRowData={setEditRowData}
      />
    </Box>
  );
};

export default CompanyTable;
