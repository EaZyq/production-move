const defineRoutesByRole = [
  ["/", "/product_line", "/accounts"],
  ["/", "/product_line", "/warehouses", "/product_line_packages", "/shipping"],
  [
    "/",
    "/product_line",
    "/warehouses",
    "/product_line_products",
    "/products_sold",
    "/shipping",
  ],
  ["/", "/warehouses", "/product_guarantee", "/shipping"],
];

export default defineRoutesByRole;
