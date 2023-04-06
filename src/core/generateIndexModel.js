var pluralize = require("pluralize");
const generateIndexModel = (table, columns) => {
  const html = `db.${toSnakeCase(
    pluralize.singular(table.tableName)
  )} = require("./${camelCase(
    pluralize.singular(table.tableName)
  )}Model")(sequelize, DataTypes);`;
  return html;
};

function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

const toSnakeCase = (str = "") => {
  const strArr = str.split(" ");
  const snakeArr = strArr.reduce((acc, val) => {
    return acc.concat(val.toLowerCase());
  }, []);
  return snakeArr.join("_");
};

export default generateIndexModel;
