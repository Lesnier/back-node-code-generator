var pluralize = require("pluralize");
const generateModel = (table, columns) => {
  let modelName = pluralize.singular(table.tableName.replace(" ", "_"));
  let modelAlias = table.tableSnakeCaseName;
  const modelHead =
    "module.exports = (sequelize, DataTypes) => {" +
    "\n" +
    `const ${modelName} = sequelize.define(` +
    "\n" +
    `'${pluralize.singular(modelAlias)}',` +
    "\n" +
    "{" +
    "\n";

  const modelFields = columns.map((item) => {
    const columnCode =
      `${item.nameColumn}: {` +
      "\n" +
      `type: DataTypes.${item.type}` +
      (item.length === "" ? "," : `(${item.length}), `) +
      "\n" +
      (item.allowNull === "" ? "" : `allowNull:${item.allowNull}, \n `) +
      (item.unique === "" ? "" : `unique: ${item.unique}, \n`) +
      (item.default === ""
        ? ""
        : item.type !== "STRING"
        ? `defaultValue:${item.default}, \n`
        : `defaultValue: '${item.default}', \n`) +
      `}` +
      "\n";
    return columnCode;
  });

  const modelEnd =
    "}," +
    "\n" +
    "{" +
    "\n" +
    `tableName: '${modelAlias}',` +
    "\n" +
    "timestamps: true," +
    "\n" +
    "}" +
    ");" +
    `return ${modelName};` +
    "}";

  const html = modelHead + modelFields + modelEnd;

  return html;
};

export default generateModel;
