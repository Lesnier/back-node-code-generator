import generateController from "./generateController";
import generateRoute from "./generateRoute";
import generateModel from "./generateModel";
import generateIndexRoot from "./generateIndexRoot";
import generateIndexModel from "./generateIndexModel";

const generateCodeList = (table, columns) => {
  const controllerCode = generateController(table, columns);
  const routeCode = generateRoute(table, columns);
  const modelCode = generateModel(table, columns);
  const indexRootCode = generateIndexRoot(table, columns);
  const indexModelCode = generateIndexModel(table, columns);
  let codeList = {
    route: routeCode,
    model: modelCode,
    controller: controllerCode,
    indexRootCode: indexRootCode,
    indexModelCode: indexModelCode,
  };
  return codeList;
};

export default generateCodeList;
