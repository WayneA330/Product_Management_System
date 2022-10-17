import React, { useState } from "react";
import { Button, Box, IconButton, Popover } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Done, Close, MoreVert, Block } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";

const CompanyTable = ({ setOpenAddCompanyModal }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowID, setRowID] = useState();

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              setRowID(params);
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
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant="text"
                startIcon={<Block />}
                sx={{ color: "#000" }}
              >
                Deactivate
              </Button>
              <Button
                variant="text"
                startIcon={<Edit />}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "#000",
                }}
              >
                Edit {params.row.id}
              </Button>
            </Box>
          </Popover>
        </>
      ),
    },
  ];

  const rows = [
    { id: 1, name: "Snow", address: "Jon", phone_no: 35, is_active: true },
    {
      id: 3,
      name: "Lannister",
      address: "Cersei",
      phone_no: 42,
      is_active: true,
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
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default CompanyTable;
