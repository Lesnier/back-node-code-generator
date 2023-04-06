import React from "react";
import EditorCode from "../components/EditorCode";
import TableDeclaration from "../components/TableDeclaration";
var pluralize = require("pluralize");

function Body({
  tables,
  handleModifyTable,
  handleDeleteTable,
  generateCode,
  listCode,
}) {
  const handleDownloadAll = (listCode) => {
    download("Router", listCode.route);
    download("Model", listCode.model);
    download("Controller", listCode.controller);
  };

  function download(filename, text) {
    const filenameFormatted =
      camelCase(pluralize.singular(listCode.table.tableName)) + filename;
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:js/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filenameFormatted + ".js");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function camelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }
  return (
    <>
      <div className="container">
        <div className="row">
          {tables.map((item) => (
            <div className="col-md-12 p-3" key={item.id}>
              <TableDeclaration
                table={item}
                handleModifyTable={handleModifyTable}
                handleDeleteTable={handleDeleteTable}
                generateCode={generateCode}
              ></TableDeclaration>
            </div>
          ))}
        </div>
        <br></br>
        <hr></hr>
        <br></br>
        <div className="row">
          <div className="col-md-12 " style={{ textAlign: "right" }}>
            <button
              type="button"
              className="btn btn-lg btn-primary "
              onClick={() => handleDownloadAll(listCode)}
            >
              <i className="bi bi-arrow-down-circle"></i>&nbsp; Descargar Todos
            </button>
          </div>
          <div className="col-md-12">
            <EditorCode
              name="Router"
              text={listCode.route}
              table={listCode.table}
            ></EditorCode>
            <EditorCode
              name="Model"
              text={listCode.model}
              table={listCode.table}
            ></EditorCode>
            <EditorCode
              name="Controller"
              text={listCode.controller}
              table={listCode.table}
            ></EditorCode>
            <EditorCode
              name="Index Model"
              text={listCode.indexModelCode}
              table={listCode.table}
            ></EditorCode>
            <EditorCode
              name="Index Root"
              text={listCode.indexRootCode}
              table={listCode.table}
            ></EditorCode>
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
