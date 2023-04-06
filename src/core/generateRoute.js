var pluralize = require("pluralize");
const generateRoute = (table, columns) => {
  const html =
    `const Controller = require('../controllers/` +
    `${camelCase(pluralize.singular(table.tableName))}Controller.js');` +
    "\n" +
    "\n" +
    'const router = require("express").Router();' +
    "\n" +
    "\n" +
    'router.post("/create", Controller.create);' +
    "\n" +
    'router.post("/selectAll", Controller.selectAll);' +
    "\n" +
    'router.get("/getOne/:id", Controller.getOne);' +
    "\n" +
    'router.put("/updateActiveAll", Controller.updateActiveAll);' +
    "\n" +
    'router.put("/update", Controller.update);' +
    "\n" +
    'router.post("/deleteAll", Controller.deleteAll);' +
    "\n" +
    "\n" +
    "module.exports = router;";
  return html;
};

function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export default generateRoute;
