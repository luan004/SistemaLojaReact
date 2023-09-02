import React, { useState } from "react";

import '../../style/CadPessoa.css';

function CadPessoa() {
  const [listar, setListar] = useState(true);
  const [incluir, setIncluir] = useState(false);

  function showListar() {
    setListar(true);
    setIncluir(false);
  }

  function showIncluir() {
    setListar(false);
    setIncluir(true);
  }

  return (
    <div className="viewload">
      <div className="title">
        <span>Cadastro de Pessoa</span>
      </div>
      <div className="window">
        <div className="tab-menu">
          <button className={`tab ${listar ? "active" : ""}`} onClick={showListar}>Listar</button>
          <button className={`tab ${incluir ? "active" : ""}`} onClick={showIncluir}>Incluir</button>
        </div>
        <div className={`listar ${listar ? "active" : ""}`} >
          <table className="table">
            <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Cidade</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <td>1</td>
                  <td>João</td>
                  <td>Curitiba</td>
                  <td>(41) 99999-9999</td>
                  <td>
                    <button className="btn-action edit">Editar</button>
                    <button className="btn-action remove">Excluir</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>João</td>
                  <td>Curitiba</td>
                  <td>(41) 99999-9999</td>
                  <td>
                    <button className="btn-action edit">Editar</button>
                    <button className="btn-action remove">Excluir</button>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
        <div className={`incluir ${incluir ? "active" : ""}`}>
          <form className="form">
            <div className="input-group">
              <label htmlFor="nome">Nome</label>
              <input type="text" id="nome" name="nome" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadPessoa;