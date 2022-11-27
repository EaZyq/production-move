import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, DialogContentText, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOwnProductByPl,
  reportErrorProduct,
} from "../../redux/actions/productAction";
import ReportIcon from "@mui/icons-material/Report";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { getUserByRole } from "../../redux/actions/userAction";
import { getAllWarehouseByUnit } from "../../redux/actions/warehouseAction";

const columns = [
  { field: "prod_id", headerName: "Product_ID", width: 160 },
  { field: "package_id", headerName: "Package_ID", width: 160 },
  {
    field: "error_report",
    headerName: "エラー報告",
    width: 130,
    renderCell: (params) => {
      return (
        <Button
          color="primary"
          startIcon={<ReportIcon />}
          onClick={params.value.onClick}
        >
          報告
        </Button>
      );
    },
  },
  {
    field: "move_to_center",
    headerName: "保証センターへの発送",
    width: 180,
    renderCell: (params) => {
      return (
        <Button
          color="primary"
          endIcon={<LocalShippingIcon />}
          onClick={params.value.onClick}
          disabled
        >
          発送
        </Button>
      );
    },
  },
];

const initialReportState = {
  prodId: "",
  errorDescription: "",
};
const initialShippingState = {
  prodId: "",
  unitId: "",
  warehouseId: "",
  statusCode: "STT-05",
};
const ProductsSold = () => {
  const { auth, product, user, warehouse } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOwnProductByPl({ data: { productLineId: 11 }, auth })); // change to api: get own products sold
    dispatch(getUserByRole({ data: { role: 4 }, auth }));
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const [isReport, setIsReport] = useState(true);
  const handleClickOpenDialog = (prodId, isReport) => {
    chooseProduct(prodId);
    setIsReport(isReport);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const chooseProduct = (prodId) => {
    setErrorReportData({
      ...errorReportData,
      prodId,
    });
  };

  const [errorReportData, setErrorReportData] = useState(initialReportState);
  const [shippingData, setShippingData] = useState(initialShippingState);
  const { unitId, warehouseId } = shippingData;

  const { errorDescription } = errorReportData;

  const onChangeErrorReportDataInput = (e) => {
    setErrorReportData({
      ...errorReportData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeShippingDataInput = (e) => {
    if (e.target.name === "unitId") {
      dispatch(
        getAllWarehouseByUnit({ data: { unitId: e.target.value }, auth })
      );
    }
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleErrorReport = () => {
    dispatch(reportErrorProduct({ data: errorReportData, auth }));
    handleCloseDialog();
  };

  const handleMoveToCenter = () => {
    console.log("SHIPPING");
    handleCloseDialog();
  };

  const rows = product.products.map((prod) => ({
    ...prod,
    error_report: {
      onClick: () => handleClickOpenDialog(prod.prod_id, true),
    },
    move_to_center: {
      onClick: () => handleClickOpenDialog(prod.prod_id, false),
    },
  }));
  return (
    <>
      <Box p={3} sx={{ height: "calc(100vh - 72px)", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.prod_id}
          pageSize={12}
          rowsPerPageOptions={[12]}
        />
      </Box>
      {/* dialog */}
      {isReport ? (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>エラー報告</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="errorDescription"
              label="エラー説明"
              fullWidth
              variant="standard"
              name="errorDescription"
              value={errorDescription}
              onChange={onChangeErrorReportDataInput}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>キャンセル</Button>
            <Button onClick={handleErrorReport}>報告</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>保証センターへの発送</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="unitId"
              select
              label="保証センター"
              fullWidth
              variant="standard"
              name="unitId"
              value={unitId}
              onChange={onChangeShippingDataInput}
            >
              {user.users.map((center) => (
                <MenuItem key={center.id} value={center.id}>
                  {center.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              disabled={unitId ? false : true}
              margin="dense"
              id="warehouseId"
              select
              label="倉庫"
              fullWidth
              variant="standard"
              name="warehouseId"
              value={warehouseId}
              onChange={onChangeShippingDataInput}
            >
              {warehouse.warehouses.map((wh) => (
                <MenuItem key={wh.id} value={wh.id}>
                  {wh.address}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>キャンセル</Button>
            <Button onClick={handleMoveToCenter}>発送</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ProductsSold;