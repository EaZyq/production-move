const dbConfig = require("../configs/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected database.");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, DataTypes);
db.ProductLine = require("./productLine.model")(sequelize, DataTypes);
db.Product = require("./product.model")(sequelize, DataTypes);
db.Error = require("./error.model")(sequelize, DataTypes);
db.Package = require("./package.model")(sequelize, DataTypes);
db.Warehouse = require("./warehouse.model")(sequelize, DataTypes);
db.Customer = require("./customer.model")(sequelize, DataTypes);
db.SoldStatus = require("./soldStatus.model")(sequelize, DataTypes);
db.UnSoldStatus = require("./unsoldStatus.model")(sequelize, DataTypes);
db.ProductLineWh = require("./productLineWh.model")(sequelize, DataTypes);

// relation function create
const createOneToManyRelation = function (manyModel, oneModel, foreignKey, as) {
  oneModel.hasMany(manyModel, {
    foreignKey: foreignKey,
    as: as,
  });

  manyModel.belongsTo(oneModel, {
    foreignKey: foreignKey,
    as: as,
  });
};

const createOneToOneRelation = function (model1, model2, foreignKey, as) {
  model1.hasOne(model2, {
    foreignKey: foreignKey,
    as: as,
  });

  model2.belongsTo(model1, {
    foreignKey: foreignKey,
    as: as,
  });
};

const createManyToManyRelation = function (model1, model2, modelRelation) {
  model1.belongsToMany(model2, { through: modelRelation });

  model2.belongsToMany(model1, { through: modelRelation });
};

// user relation
createOneToManyRelation(db.ProductLine, db.User, "user_id", "user_productLine");
createOneToManyRelation(db.Package, db.User, "unit_manage_id", "user_package");
createOneToManyRelation(
  db.Warehouse,
  db.User,
  "unit_manage_id",
  "user_warehouse"
);
createOneToManyRelation(db.Customer, db.User, "store_id", "user_customer");
createOneToManyRelation(
  db.SoldStatus,
  db.User,
  "unit_manage_id",
  "user_soldStatus"
);
createOneToManyRelation(
  db.UnSoldStatus,
  db.User,
  "unit_manage_id",
  "user_unsoldStatus"
);
createOneToManyRelation(
  db.SoldStatus,
  db.Customer,
  "customer_id",
  "customer_soldStatus"
);
// product line relation
createOneToManyRelation(
  db.Product,
  db.ProductLine,
  "product_line_id",
  "productLine_product"
);

createOneToManyRelation(
  db.SoldStatus,
  db.Warehouse,
  "warehouse_id",
  "warehouse_soldStatus"
);
createOneToManyRelation(
  db.UnSoldStatus,
  db.Warehouse,
  "warehouse_id",
  "warehouse_unsoldStatus"
);

createOneToManyRelation(
  db.Product,
  db.UnSoldStatus,
  "unsold_status_id",
  "unsoldStatus_product"
);
createOneToManyRelation(
  db.Product,
  db.SoldStatus,
  "sold_status_id",
  "soldStatus_product"
);
createOneToManyRelation(db.Product, db.Package, "package_id", "packproduct");
createOneToManyRelation(
  db.Package,
  db.ProductLine,
  "product_line_id",
  "productLine_package"
);

createManyToManyRelation(db.ProductLine, db.Warehouse, db.ProductLineWh);

db.sequelize.sync({ alter: true }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
