import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BarChartIcon from "@mui/icons-material/BarChart";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DevicesIcon from "@mui/icons-material/Devices";

const navbarMenuItems = [
  [
    {
      icon: <BarChartIcon />,
      text: "商品統計",
      pageLink: "/",
    },
    {
      icon: <DevicesIcon />,
      text: "商品ライン",
      pageLink: "/product_line",
    },
    {
      icon: <ManageAccountsIcon />,
      text: "アカウント管理",
      pageLink: "/accounts",
    },
  ],
  [
    {
      icon: <BarChartIcon />,
      text: "商品統計",
      pageLink: "/",
    },
    {
      icon: <DevicesIcon />,
      text: "商品ライン",
      pageLink: "/product_line",
    },
    {
      icon: <WarehouseIcon />,
      text: "倉庫",
      pageLink: "/warehouses",
    },
  ],
  [
    {
      icon: <BarChartIcon />,
      text: "商品統計",
      pageLink: "/",
    },
    {
      icon: <DevicesIcon />,
      text: "商品ライン",
      pageLink: "/product_line",
    },
    {
      icon: <WarehouseIcon />,
      text: "倉庫",
      pageLink: "/warehouses",
    },
  ],
  [
    {
      icon: <BarChartIcon />,
      text: "商品統計",
      pageLink: "/",
    },
    {
      icon: <PrecisionManufacturingIcon />,
      text: "商品保証",
      pageLink: "/product_guarantee",
    },
    {
      icon: <WarehouseIcon />,
      text: "倉庫",
      pageLink: "/warehouses",
    },
  ],
];

export default navbarMenuItems;