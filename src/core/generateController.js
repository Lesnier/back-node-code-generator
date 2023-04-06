var pluralize = require("pluralize");
const generateController = (table, columns) => {
  let columnSearch = "";
  let existActiveColumn = false;
  for (let i = 0; i < columns.length; i++) {
    console.log("columnSearch ", columns[i].search);
    if (columns[i].search) {
      let codeSearch =
        `whereConditions.${columns[i].nameColumn}` +
        "= {" +
        "\n" +
        '[Op.like]: "%" + req.body.search + "%",' +
        "\n" +
        "};" +
        "\n";

      console.log("que pinga");
      columnSearch += codeSearch;
    }
    if (columns[i].nameColumn === "active") {
      existActiveColumn = true;
    }
  }

  const html =
    'const db = require("../models");' +
    "\n" +
    'const { Op } = require("sequelize");' +
    "\n" +
    'const dbConfig = require("../config/dbConfig");' +
    "\n" +
    `const Controller = db.${pluralize.singular(table.tableSnakeCaseName)};` +
    "\n" +
    "const User = db.users;" +
    "\n" +
    `const nameController = "${pluralize.singular(table.tableName)}" ` +
    ";" +
    "\n" +
    'const endName = "s";' +
    "\n" +
    "\n" +
    "//1. Create" +
    "\n" +
    "const create = async (req, res) => {" +
    "\n" +
    "try {" +
    "\n" +
    "const create = await Controller.create(req.body);" +
    "\n" +
    "if (create) {" +
    "\n" +
    "res.status(200).send({" +
    "\n" +
    "success: true," +
    "\n" +
    "message: `${nameController} inserted correctly`," +
    "\n" +
    "create," +
    "\n" +
    "});" +
    "\n" +
    "} else {" +
    "\n" +
    "res.status(400).send({" +
    "\n" +
    "success: false," +
    "\n" +
    "message: `Problem to inserted a ${nameController.toLowerCase()}`," +
    "\n" +
    "});" +
    "\n" +
    "}" +
    "\n" +
    "} catch (error) {" +
    "\n" +
    "res.status(400).send({ success: false, message: error, error });" +
    "\n" +
    "console.log(error);" +
    "\n" +
    "}" +
    "\n" +
    "};" +
    "\n" +
    "\n" +
    "//2. select all" +
    "\n" +
    "const selectAll = async (req, res) => {" +
    "\n" +
    "const { limit, offset } = req.body;" +
    "\n" +
    "try {" +
    "\n" +
    "const newList = await Controller.findAndCountAll({" +
    "\n" +
    "limit," +
    "\n" +
    "offset: limit * offset," +
    "\n" +
    "where: getWhereConditions(req)," +
    "\n" +
    "});" +
    "\n" +
    "if (newList) {" +
    "\n" +
    "res.status(200).send({" +
    "\n" +
    "success: true," +
    "\n" +
    "message: `${nameController}${endName} find correctly`," +
    "\n" +
    "newList: newList.rows," +
    "\n" +
    "count: newList.count," +
    "\n" +
    "});" +
    "\n" +
    "} else {" +
    "\n" +
    "res.status(400).send({" +
    "\n" +
    "success: false," +
    "\n" +
    "message: `Problem to find ${nameController.toLowerCase()}${endName}`," +
    "\n" +
    "});" +
    "\n" +
    "}" +
    "\n" +
    "} catch (error) {" +
    "\n" +
    "res.status(400).send({ success: false, message: error, error });" +
    "\n" +
    "console.log(error);" +
    "\n" +
    "}" +
    "\n" +
    "};" +
    "\n" +
    "\n" +
    "function getWhereConditions(req) {" +
    "\n" +
    "let whereConditions = {};" +
    "\n" +
    (existActiveColumn
      ? "if (req.body.active ) {" +
        " whereConditions.active = req.body.active === 1 ? 1 : 0;" +
        " }"
      : "") +
    "\n" +
    "if (req.body.search) {" +
    "\n" +
    (columnSearch !== "" ? columnSearch : "") +
    "}" +
    "\n" +
    "return whereConditions;" +
    "\n" +
    "}" +
    "\n" +
    "\n" +
    "//3. Update Active for one or many item" +
    "\n" +
    "const updateActiveAll = async (req, res) => {" +
    "\n" +
    "try {" +
    "\n" +
    "let ids = req.body.selectedRow;" +
    "\n" +
    "let active = req.body.active;" +
    "\n" +
    "const updatedRows = await Controller.update(" +
    "\n" +
    "{ active }," +
    "\n" +
    "{ where: { id: ids } }" +
    "\n" +
    ");" +
    "\n" +
    "if (updatedRows) {" +
    "\n" +
    "res.status(200).send({" +
    "\n" +
    "success: true," +
    "\n" +
    "message: `${nameController}${endName} updated correctly`," +
    "\n" +
    "updatedRows: updatedRows," +
    "\n" +
    "});" +
    "\n" +
    "} else {" +
    "\n" +
    "res.status(404).send({" +
    "\n" +
    "success: false," +
    "\n" +
    "message: `Problem to update ${nameController.toLowerCase()}${endName}`," +
    "\n" +
    "error: null," +
    "\n" +
    "});" +
    "\n" +
    "}" +
    "\n" +
    "} catch (error) {" +
    "\n" +
    'res.status(400).send({ success: false, message: "Error", error });' +
    "\n" +
    "console.log(error);" +
    "\n" +
    "}" +
    "\n" +
    "};" +
    "\n" +
    "\n" +
    "//4. get single" +
    "\n" +
    "const getOne = async (req, res) => {" +
    "\n" +
    "let id = req.params.id;" +
    "\n" +
    "try {" +
    "\n" +
    "const item = await Controller.findOne({" +
    "\n" +
    "where: { id }," +
    "\n" +
    "});" +
    "\n" +
    "if (item) {" +
    "\n" +
    "res.status(200).send({" +
    "\n" +
    "success: true," +
    "\n" +
    "message: `${nameController} find correctly`," +
    "\n" +
    "item," +
    "\n" +
    "});" +
    "\n" +
    "} else {" +
    "\n" +
    "res.status(200).send({" +
    "\n" +
    "success: false," +
    "\n" +
    "message: `Problem to find ${nameController} find correctly`," +
    "\n" +
    "item," +
    "\n" +
    "});" +
    "\n" +
    "}" +
    "\n" +
    "} catch (error) {" +
    "\n" +
    'res.status(404).send({ success: false, message: "Error", error });' +
    "}" +
    "\n" +
    "};" +
    "\n" +
    "\n" +
    "//5. Update" +
    "\n" +
    "const update = async (req, res) => {" +
    "\n" +
    "try {" +
    "\n" +
    "let { id } = req.body;" +
    "\n" +
    "const update = await Controller.update(req.body, {" +
    "\n" +
    "where: { id }," +
    "\n" +
    "});" +
    "\n" +
    "if (update) {" +
    "\n" +
    "res.status(200).send({" +
    "\n" +
    "success: true," +
    "\n" +
    "message: `${nameController} updated correctly`," +
    "\n" +
    "});" +
    "\n" +
    "} else {" +
    "\n" +
    "res.status(200).send({" +
    "\n" +
    "success: false," +
    "\n" +
    "message: `Problem to update ${nameController.toLowerCase()}`," +
    "\n" +
    "});" +
    "\n" +
    "}" +
    "\n" +
    "} catch (error) {" +
    "\n" +
    'res.status(400).send({ success: false, message: "Error", error });' +
    "\n" +
    "console.log(error);" +
    "\n" +
    "}" +
    "\n" +
    "};" +
    "\n" +
    "\n" +
    "//delete all" +
    "\n" +
    "const deleteAll = async (req, res) => {" +
    "\n" +
    "try {" +
    "\n" +
    "let ids = req.body.selectedRow;" +
    "\n" +
    "let user = await Controller.destroy({ where: { id: ids } });" +
    "\n" +
    "if (user) {" +
    "\n" +
    "res.status(200).send({" +
    "\n" +
    "success: true," +
    "\n" +
    "message: `${nameController} deleted correctly`," +
    "\n" +
    "});" +
    "\n" +
    "} else {" +
    "\n" +
    "res.status(404).send({" +
    "\n" +
    "success: false," +
    "\n" +
    "message: `Dont find ${nameController.toLowerCase()}`," +
    "\n" +
    "error: null," +
    "\n" +
    "});" +
    "\n" +
    "}" +
    "\n" +
    "} catch (error) {" +
    "\n" +
    'res.status(400).send({ success: false, message: "Error", error });' +
    "\n" +
    "console.log(error);" +
    "\n" +
    "}" +
    "\n" +
    "};" +
    "\n" +
    "module.exports = {" +
    "\n" +
    "create," +
    "\n" +
    "selectAll," +
    "\n" +
    "updateActiveAll," +
    "\n" +
    "getOne," +
    "\n" +
    "update," +
    "\n" +
    "deleteAll," +
    "\n" +
    "};";

  return html;
};

export default generateController;
