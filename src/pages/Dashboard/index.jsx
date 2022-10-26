import React, { useEffect, useState } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { Store, Category } from "@mui/icons-material";
import AddCompanyModal from "./Modals/AddCompanyModal";
import AddProductModal from "./Modals/AddProductModal";
import CompanyTable from "./Tabs/CompanyTable";
import ProductTable from "./Tabs/ProductTable";

const Dashboard = () => {
  const [addClick, setAddClick] = useState("");
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openAddCompanyModal, setOpenAddCompanyModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [editCompany, setEditCompany] = useState(false);
  const [editRowCompanyData, setEditRowCompanyData] = useState(null);

  const handleCloseProduct = () => setOpenAddProductModal(false);
  const handleCloseCompany = () => setOpenAddCompanyModal(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (addClick === "Add Company") {
      setOpenAddProductModal(false);
      setOpenAddCompanyModal(true);
      setAddClick("");
    }

    if (addClick === "Add Product") {
      setOpenAddCompanyModal(false);
      setOpenAddProductModal(true);
      setAddClick("");
    }
  }, [addClick]);

  const actions = [
    { icon: <Store />, name: "Add Company" },
    { icon: <Category />, name: "Add Product" },
  ];

  const tabsContent = [
    <CompanyTable
      setOpenAddCompanyModal={setOpenAddCompanyModal}
      setEdit={setEditCompany}
      setEditRowData={setEditRowCompanyData}
    />,
    <ProductTable setOpenAddProductModal={setOpenAddProductModal} />,
  ];

  return (
    <>
      {/* Tabs */}
      <Box sx={{ marginTop: "15px" }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Companies" />
          <Tab label="Products" />
        </Tabs>
        {tabsContent[activeTab]}
      </Box>

      {/* SpeedDial */}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => setAddClick(action.name)}
          />
        ))}
      </SpeedDial>

      <AddCompanyModal
        open={openAddCompanyModal}
        handleClose={handleCloseCompany}
        edit={editCompany}
        setEdit={setEditCompany}
        editRowData={editRowCompanyData}
        setEditRowData={setEditRowCompanyData}
      />
      <AddProductModal
        open={openAddProductModal}
        handleClose={handleCloseProduct}
      />
    </>
  );
};

export default Dashboard;
