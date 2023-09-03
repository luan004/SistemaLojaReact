import React, { useState } from "react";

import '../../style/Cad.css';

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

  function cancel() {
    const form = document.getElementById('form');
    form.reset();
  }

  function submit() {
    
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
          <form className="form" id="form">
            <div className="input-row">
              <div className="input" style={{width:"100px"}}>
                <label htmlFor="cod">Código</label>
                <input type="number" id="cod" name="cod" />
              </div>
              <div className="input">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="nome" />
              </div>
            </div>
            <div className="input-row">
              <div className="input">
                <label htmlFor="cidade">Cidade</label>
                <select name="cidade">
                  <option value="pvai">Cidade</option>
                </select>
              </div>
              <div className="input">
                <label htmlFor="bairro">Bairro</label>
                <select name="bairro">
                  <option value="pvai">Bairro</option>
                </select>
              </div>
              <div className="input" style={{width:"200px"}}>
                <label htmlFor="cep">CEP</label>
                <input type="text" id="nome" name="cep" />
              </div>
            </div>
            <div className="input-row"> 
              <div className="input">
                <label htmlFor="endereco">Endereço</label>
                <input type="text" id="endereco" name="endereco" />
              </div>
              <div className="input" style={{width:"200px"}}>
                <label htmlFor="numero">Número</label>
                <input type="number" id="numero" name="numero" />
              </div>
              <div className="input">
                <label htmlFor="complemento">Complemento</label>
                <input type="text" id="complemento" name="complemento" />
              </div>
            </div>
            <div className="input-row">
              <div className="input">
                <label htmlFor="telefone">Telefone</label>
                <input type="text" id="telefone" name="telefone" />
              </div>
              <div className="input">
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" name="email" />
              </div>
            </div>
            <div className="input-row bottom">
              <button id="cadPessoaSubmit" type="button" onClick={submit} className="btn green">Salvar</button>
              <button id="cadPessoaCancel" type="button" onClick={cancel} className="btn red">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadPessoa;