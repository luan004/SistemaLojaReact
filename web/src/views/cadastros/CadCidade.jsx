import React, { useState, useEffect } from "react";

import '../../style/Cad.css';

function CadCidade() {
  const [listar, setListar] = useState(true);
  const [incluir, setIncluir] = useState(false);
  const [cidades, setCidades] = useState([]);

  function showListar() {
    setListar(true);
    setIncluir(false);
  }

  function showIncluir() {
    setListar(false);
    setIncluir(true);
  }

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/cidades");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setCidades(data); // Define os dados da API no estado "cidades"
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    if (listar) {
      fetchData(); // Chama a função de busca quando a página é carregada ou "Listar" é clicado
    }
  }, [listar]); // A função será executada quando o valor de "listar" mudar


  function cancel() {
    const form = document.getElementById('form');
    form.reset();
  }

  function submit() {
    // Coletar os dados do formulário
    const newCidade = {
      nome: document.getElementById('nome').value,
      uf: document.getElementById('uf').value,
    };
  
    // Enviar os dados para a API
    fetch("http://localhost:3001/api/cidades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCidade),
    })
      .then((data) => {
        cancel();
      })
  }
  


  return (
    <div className="viewload">
      <div className="title">
        <span>Cadastro de Cidade</span>
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
                  <th>Nome da Cidade</th>
                  <th>UF</th>
                  <th>Ações</th>
                </tr>
            </thead>
            <tbody>
              {cidades.map((cidade) => (
                <tr key={cidade.id}>
                  <td>{cidade.id}</td>
                  <td>{cidade.nome}</td>
                  <td>{cidade.uf}</td>
                  <td>
                    <button className="btn-action edit">Editar</button>
                    <button className="btn-action remove">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`incluir ${incluir ? "active" : ""}`}>
          <form className="form" id="form">
            <div className="input-row">
              <div className="input" style={{width:"200px"}}>
                <label htmlFor="cod">Código</label>
                <input type="number" id="cod" name="cod" disabled/>
              </div>
              <div className="input">
                <label htmlFor="nome">Nome da Cidade</label>
                <input type="text" id="nome" name="nome" />
              </div>
              <div className="input" style={{width:"200px"}}>
                <label htmlFor="uf">UF</label>
                <input type="text" id="uf" name="uf" />
              </div>
            </div>
            <div className="input-row bottom">
              <button type="button" onClick={submit} className="btn green">Salvar</button>
              <button type="button" onClick={cancel} className="btn red">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadCidade;