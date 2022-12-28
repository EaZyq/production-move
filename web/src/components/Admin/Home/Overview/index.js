import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import Overview from "../../../Shared/Home/Overview";

const HomeAdminOverview = ({ statisticProduct }) => {
  const calculateNumOfProducts = () => {
    return statisticProduct?.reduce(
      (total, item) => total + item.numOfProduct,
      0
    );
  };
  const calculateNumOfSoldProducts = () => {
    return statisticProduct?.reduce(
      (total, item) => total + item.numOfSoldProduct,
      0
    );
  };
  const calculateNumOfErrorProducts = () => {
    return statisticProduct?.reduce(
      (total, item) => total + item.numOfErrorProduct,
      0
    );
  };

  const overviewData = [
    {
      text: "San pham toan quoc",
      value: calculateNumOfProducts(),
      color: "primary.light",
    },
    {
      text: "San pham ban duoc toan quoc",
      value: calculateNumOfSoldProducts(),
      color: "success.light",
    },
    {
      text: "San pham loi toan quoc",
      value: calculateNumOfErrorProducts(),
      color: "error.light",
    },
  ];
  return <Overview overviewData={overviewData} />;
};

export default HomeAdminOverview;
