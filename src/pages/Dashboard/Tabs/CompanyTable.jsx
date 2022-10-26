import React, { useState } from "react";
import { Button, Box, IconButton, Popover } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Done, Close, MoreVert, Block, Edit } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "notistack";
import { getData, postData } from "../../../api/methods";
import api from "../../../api/api";

const CompanyTable = ({ setOpenAddCompanyModal, setEdit, setEditRowData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowID, setRowID] = useState();
  const [isActive, setIsActive] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    { field: "name", headerName: "Name", width: 150, flex: 1 },
    { field: "address", headerName: "Address", width: 150, flex: 1 },
    { field: "phone_no", headerName: "Phone Number", width: 150, flex: 1 },
    {
      field: "is_active",
      headerName: "Active",
      width: 150,
      flex: 1,
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
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(e) => {
              handleClick(e);
              setRowID(params.id);
              setIsActive(params.row.is_active);
              setEditRowData(params.row);
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
    </Box>
  );
};

export default CompanyTable;
