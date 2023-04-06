import React, { useState } from "react";

function Header({ handleAddTable }) {
  return (
    <>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <a
            href="/"
            className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
          >
            💪🤓😎
          </a>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-2 link-secondary">
                Generar Código
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                ¿Como Funciona?
              </a>
            </li>
          </ul>
          <div className="col-md-3 text-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddTable}
            >
              <i className="bi bi-file-earmark-plus"></i>&nbsp; Nueva Tabla
            </button>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
