import React, { useEffect, useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import AddCompanyModal from "./AddCompanyModal";
import AddProductModal from "./AddProductModal";
import { Store, Category } from "@mui/icons-material";

const Dashboard = () => {
  const [addClick, setAddClick] = useState("");
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openAddCompanyModal, setOpenAddCompanyModal] = useState(false);

  const handleCloseProduct = () => setOpenAddProductModal(false);
  const handleCloseCompany = () => setOpenAddCompanyModal(false);

  useEffect(() => {
    if (addClick === "Add Company") {
      setOpenAddProductModal(false);
      setOpenAddCompanyModal(true);
    }

    if (addClick === "Add Product") {
      setOpenAddCompanyModal(false);
      setOpenAddProductModal(true);
    }
  }, [addClick]);

  const actions = [
    { icon: <Store />, name: "Add Company" },
    { icon: <Category />, name: "Add Product" },
  ];

  return (
    <>
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
      />
      <AddProductModal
        open={openAddProductModal}
        handleClose={handleCloseProduct}
      />
    </>
  );
};

export default Dashboard;
