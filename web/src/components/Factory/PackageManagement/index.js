import {
  Box,
  Button,
  DialogContentText,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPackageByCurrentFactory,
  getAllPackageByUnit,
  movePackage,
  recallPackage,
} from "../../../redux/actions/packageAction";
import SendIcon from "@mui/icons-material/Send";
import { getAllWarehouseByUnit } from "../../../redux/actions/warehouseAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { typeErrorCodeList } from "../../../utils/constants";
import ReportIcon from "@mui/icons-material/Report";

const columns = [
  { field: "package_id", headerName: "Package_ID", width: 160 },
  {
    field: "quantity_in_stock",
    headerName: "Quantity in Stock",
    width: 150,
  },
  {
    field: "unit_manage",
    headerName: "Where",
    width: 150,
  },
  {
    field: "recall",
    headerName: "Recall",
    width: 150,
    renderCell: (params) => params.value,
  },
];
const initialReportState = {
  packageId: "",
  errorDescription: "",
  typeErrorCode: "",
};
const FactoryPackageManagement = () => {
  const { auth, packageReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [errorReportData, setErrorReportData] = useState(initialReportState);
  const [openDialog, setOpenDialog] = useState(false);

  const { errorDescription, typeErrorCode } = errorReportData;

  useEffect(() => {
    dispatch(getAllPackageByCurrentFactory({ auth }));
  }, [dispatch]);

  const choosePackage = (packageId) => {
    setErrorReportData({
      ...errorReportData,
      packageId,
    });
  };

  const handleClickOpenDialog = (pk) => {
    console.log(pk.package_id);
    choosePackage(pk.package_id);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onChangeErrorReportDataInput = (e) => {
    setErrorReportData({
      ...errorReportData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecall = () => {
    dispatch(recallPackage({ data: errorReportData, auth }));
    handleCloseDialog();
  };

  const rows = packageReducer.packages.map((pk) => ({
    ...pk,
    unit_manage: pk.user_package.name,
    recall: !pk.error_id ? (
      <Button
        color="primary"
        endIcon={<ReportIcon />}
        onClick={() => handleClickOpenDialog(pk)}
      >
        Recall
      </Button>
    ) : (
      <Tooltip title={`エラーの説明： ${pk.error_package.description}`}>
        <ReportIcon color="error" />
      </Tooltip>
    ),
  }));
  return (
    <>
      <Box p={3} sx={{ height: "calc(100vh - 72px)", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.package_id}
          pageSize={12}
          rowsPerPageOptions={[12]}
        />
      </Box>
      {/* dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{`Recall: ${errorReportData.packageId}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="typeErrorCode"
            select
            label="Type Error Code"
            fullWidth
            variant="standard"
            name="typeErrorCode"
            value={typeErrorCode}
            onChange={onChangeErrorReportDataInput}
          >
            {typeErrorCodeList.map((typeErrCode) => (
              <MenuItem key={typeErrCode} value={typeErrCode}>
                {typeErrCode}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            id="errorDescription"
            label="エラーの説明"
            fullWidth
            variant="standard"
            name="errorDescription"
            value={errorDescription}
            onChange={onChangeErrorReportDataInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>キャンセル</Button>
          <Button onClick={handleRecall}>保存</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FactoryPackageManagement;