import React, { useState, useEffect } from "react";
import '../../style/Cad.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons'

function RelPessoa() {
  const [itens, setItem] = useState([]);

  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);

  loadComboBoxCidade();
  loadComboBoxBairro();

  async function loadComboBoxCidade () {
    try {
      const response = await fetch("http://localhost:3001/api/cidades");
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }
      const data = await response.json();
      setCidades(data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  async function loadComboBoxBairro() {
    try {
      const response = await fetch("http://localhost:3001/api/bairros");
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }
      const data = await response.json();
      setBairros(data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  async function loadLista() { // LISTAR ITEMS
    try {
      const response = await fetch("http://localhost:3001/api/pessoas");
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }
      const data = await response.json();
      const dataWithCidade = await Promise.all(data.map(async (item) => {
        console.log(item);
        const response = await fetch(`http://localhost:3001/api/cidades/${item.cidade_fk}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        return {
          ...item,
          cidade_name: data.nome
        }
      }));
      setItem(dataWithCidade);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  return (
    <div className="viewload">
      <div className="title">
        <span>Cadastro de Pessoas</span>
      </div>
      <div className="window">
        <div className={"listas"} >
          <table className="table">
            <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome da Pessoa</th>
                  <th>Cidade</th>
                  <th>Telefone</th>
                </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.cidade_name}</td>
                  <td>{item.telefone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RelPessoa;