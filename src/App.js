import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./layouts/Header";
import Body from "./layouts/Body";
import generateCodeList from "./core/generator";

function App() {
  const [tables, setTables] = useState([
    { tableName: "Default", tableSnakeCaseName: "default", id: "df45j" },
  ]);
  const [listCode, setListCode] = useState({
    table: {},
    route: "",
    model: "",
    controller: "",
  });
  const handleAddTable = () => {
    const newItem = {
      tableName: "Default",
      tableSnakeCaseName: "default",
      id: generateKey(),
    };
    setTables([...tables, newItem]);
  };
  const handleDeleteTable = (item) => {
    const newList = tables.filter((element) => {
      console.log(element.id, item.id, element.id != item.id);
      return element.id != item.id;
    });
    console.log("afeter delete ", newList);
    setTables(newList);
  };
  const handleModifyTable = (item, value) => {
    const newList = tables.map((element) => {
      console.log(element.id, item.id, element.id === item.id);
      if (element.id === item.id) {
        element.tableName = value;
        element.tableSnakeCaseName = toSnakeCase(value);
        console.log(element.tableName);
      }
      return element;
    });
    console.log(newList);
    setTables(newList);
  };
  const generateKey = () => {
    return (Math.random() + 1).toString(36).substring(7);
  };

  const generateCode = (table, columns) => {
    const codes = generateCodeList(table, columns);
    //console.log(codes[0]);

    setListCode({
      table: table,
      route: codes.route,
      model: codes.model,
      controller: codes.controller,
      indexRootCode: codes.indexRootCode,
      indexModelCode: codes.indexModelCode,
    });

    console.log(listCode);
  };

  const toSnakeCase = (str = "") => {
    const strArr = str.split(" ");
    const snakeArr = strArr.reduce((acc, val) => {
      return acc.concat(val.toLowerCase());
    }, []);
    return snakeArr.join("_");
  };

  return (
    <>
      <Header handleAddTable={handleAddTable}></Header>
      <Body
        tables={tables}
        handleModifyTable={handleModifyTable}
        handleDeleteTable={handleDeleteTable}
        generateCode={generateCode}
        listCode={listCode}
      ></Body>
    </>
  );
}

export default App;
