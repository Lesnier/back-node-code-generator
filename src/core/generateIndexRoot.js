var pluralize = require("pluralize");

const generateIndexRoot = (table, columns) => {
  const html =
    `const ${toSnakeCase(
      pluralize.singular(table.tableName)
    )} = require("./routes/` +
    `${camelCase(pluralize.singular(table.tableName))}Router");` +
    "\n" +
    `app.use("/api/${toSnakeCase(
      pluralize.singular(table.tableName)
    )}", checkAuth, ${toSnakeCase(pluralize.singular(table.tableName))});`;

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

export default generateIndexRoot;
