import { useState, React } from "react";

function TableDeclaration({
  table,
  handleModifyTable,
  handleDeleteTable,
  generateCode,
}) {
  const [nombreTabla, setNombreTabla] = useState("Nombre Tabla");
  const [columnList, setColumnList] = useState([
    {
      nameColumn: "",
      type: "STRING",
      default: "",
      allowNull: "",
      unique: "",
      length: "",
      search: false,
      id: "1a2sd",
    },
  ]);
  const handleAddColumn = () => {
    const newItem = {
      nameColumn: "",
      type: "STRING",
      default: "",
      allowNull: "",
      unique: "",
      length: "",
      search: false,
      id: generateKey(),
    };
    setColumnList([...columnList, newItem]);
  };
  const handleDeleteColumn = (item) => {
    const newList = columnList.filter((element) => {
      console.log(element.id, item.id, element.id != item.id);
      return element.id != item.id;
    });
    console.log("afeter delete ", newList);
    setColumnList(newList);
  };
  const handleModifyColumn = (item, input, value) => {
    const newList = columnList.map((element) => {
      console.log(element.id, item.id, element.id === item.id);

      if (element.id === item.id) {
        if (input === "name") {
          element.nameColumn = value;
          console.log(element.nameColumn);
        }
        if (input === "type") {
          element.type = value;
          console.log("typo ", element.type);
        }
        if (input === "default") {
          element.default = value;
          console.log(element.default);
        }
        if (input === "allowNull") {
          element.allowNull = value;
          console.log(element.allowNull);
        }
        if (input === "unique") {
          element.unique = value;
          console.log(element.unique);
        }
        if (input === "length") {
          element.length = value;
          console.log(element.length);
        }
        if (input === "search") {
          element.search = value;
          console.log("search " + element.search);
        }
      }
      return element;
    });
    console.log(newList);
    setColumnList(newList);
  };

  const generateKey = () => {
    return (Math.random() + 1).toString(36).substring(7);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header" style={{ height: "54px" }}>
          <div className="card-title d-flex justify-content-between">
            <h3>
              <strong>{table.tableName}</strong>
            </h3>
            <button
              className="btn  btn-default"
              type="button"
              onClick={() => {
                handleDeleteTable(table);
              }}
            >
              <i className="bi bi-x-circle"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row ">
            <div className="col-12 mb-3 ">
              <input
                type="text"
                name="table-name"
                className="form-control"
                placeholder="Nombre Tabla"
                value={table.tableName}
                onChange={(e) => handleModifyTable(table, e.target.value)}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-1 mb-3">
              <strong>Search</strong>
            </div>
            <div className="col-2 mb-3">
              <strong>Name Column</strong>
            </div>
            <div className="col-2 mb-3">
              <strong>Type</strong>
            </div>
            <div className="col-1 mb-3">
              <strong>Length</strong>
            </div>
            <div className="col-2 mb-3">
              <strong>Default Value</strong>
            </div>
            <div className="col-2 mb-3">
              <strong>Allow Null</strong>
            </div>
            <div className="col-2 mb-3">
              <strong>Is Unique</strong>
            </div>
          </div>
          {columnList.map((item) => (
            <div key={item.id}>
              <div className="row ">
                <div className="col-1 mb-3">
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      name="column-search"
                      className="form-check-input "
                      role="switch"
                      placeholder="Search"
                      checked={item.search}
                      onChange={(e) => {
                        handleModifyColumn(item, "search", e.target.checked);
                      }}
                      style={{ width: "60px", height: "30px" }}
                    />
                  </div>
                </div>
                <div className="col-2 mb-3">
                  <input
                    type="text"
                    name="column-name"
                    className="form-control"
                    placeholder="Nombre"
                    value={item.nameColumn}
                    onChange={(e) => {
                      handleModifyColumn(item, "name", e.target.value);
                    }}
                  />
                </div>
                <div className="col-2 mb-3">
                  <select
                    type="text"
                    name="column-type"
                    className="form-control"
                    placeholder="Tipo de Dato"
                    value={item.type}
                    onChange={(e) =>
                      handleModifyColumn(item, "type", e.target.value)
                    }
                  >
                    <option value="STRING">STRING</option>
                    <option value="TEXT('tiny')">TEXT('tiny')</option>
                    <option value="TEXT('medium')">TEXT('medium')</option>
                    <option value="TEXT('long')">TEXT('long')</option>
                    <option value="CHAR">CHAR</option>
                    <option value="INTEGER">INTEGER</option>
                    <option value="TINYINT">TINYINT</option>
                    <option value="FLOAT">FLOAT</option>
                    <option value="DECIMAL">DECIMAL</option>
                    <option value="BOOLEAN">BOOLEAN</option>
                    <option value="DATE">DATE</option>
                    <option value="DATE(6)">DATE(6)</option>
                    <option value="DATEONLY">DATEONLY</option>
                    <option value="TIME">TIME</option>
                    <option value="TIME(6)">TIME(6)</option>
                  </select>
                </div>
                <div className="col-1 mb-3">
                  <input
                    type="text"
                    name="column-length"
                    className="form-control"
                    placeholder="Length"
                    value={item.length}
                    onChange={(e) =>
                      handleModifyColumn(item, "length", e.target.value)
                    }
                  />
                </div>
                <div className="col-2 mb-3">
                  <input
                    type="text"
                    name="column-default-value"
                    className="form-control"
                    placeholder="Default Value"
                    value={item.default}
                    onChange={(e) =>
                      handleModifyColumn(item, "default", e.target.value)
                    }
                  />
                </div>
                <div className="col-2 mb-3">
                  <select
                    type="text"
                    name="column-allowNull"
                    className="form-control"
                    placeholder="Allow Null"
                    value={item.allowNull}
                    onChange={(e) =>
                      handleModifyColumn(item, "allowNull", e.target.value)
                    }
                  >
                    <option value="">Default</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>

                <div className="col-1 mb-3">
                  <select
                    type="text"
                    name="column-unique"
                    className="form-control"
                    placeholder="Unique"
                    value={item.unique}
                    onChange={(e) =>
                      handleModifyColumn(item, "unique", e.target.value)
                    }
                  >
                    <option value="">Default</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>

                <div className="col-1 mb-3">
                  <button
                    className="btn btn-danger "
                    onClick={() => handleDeleteColumn(item)}
                  >
                    <i className="bi bi-dash-circle"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button className="btn btn-success " onClick={handleAddColumn}>
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>

        <div className="card-footer">
          <button
            className="btn btn-dark "
            style={{ width: "100%" }}
            onClick={() => generateCode(table, columnList)}
          >
            <i className="bi bi-code-slash"></i>&nbsp;Generar Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableDeclaration;
