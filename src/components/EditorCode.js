import React, { useEffect, useState } from "react";
var pluralize = require("pluralize");

function EditorCode({ name, text, table }) {
  const [textArea, setTextArea] = useState([]);
  useEffect(() => {
    setTextArea(text);
  }, [text]);

  function download(filename, text) {
    const filenameFormatted =
      camelCase(pluralize.singular(table.tableName)) + filename;
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
    <div className="mb-5">
      <h3>{name}</h3>
      <textarea
        className="form-control"
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
        rows={10}
      ></textarea>
      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={() => download(name, textArea)}
      >
        <i className="bi bi-arrow-down-circle"></i>&nbsp; Descargar {name}
      </button>
    </div>
  );
}

export default EditorCode;
