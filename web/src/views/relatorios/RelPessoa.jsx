import React, { useState, useEffect } from "react";
import '../../style/Cad.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

function RelPessoa() {
  const [itens, setItem] = useState([]);

  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);

  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");

    useEffect(() => {
        loadComboBoxCidade();
        loadComboBoxBairro();
    }, []);

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
    const filters = {
        nome: nome,
        cidade: cidade,
        bairro: bairro
    }
    try {
        const response = await fetch(`http://localhost:3001/api/pessoas?cidade=${filters.cidade}&bairro=${filters.bairro}&nome=${filters.nome}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        const dataWithCidade = await Promise.all(data.map(async (item) => {
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
        <span>Relatório de Pessoas</span>
      </div>
      <div className="window">
        <form>
            <div className="input">
                <label htmlFor="nome">Parte do Nome</label>
                <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="input">
                <label htmlFor="cidade">Cidade</label>
                <select id="cidade" name="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)}>
                    <option value="">Selecione</option>
                    {cidades.map((item) => (
                        <option key={item.id} value={item.id}>{item.nome}</option>
                    ))}
                </select>
            </div>
            <div className="input">
                <label htmlFor="bairro">Bairro</label>
                <select id="bairro" name="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)}>
                    <option value="">Selecione</option>
                    {bairros.map((item) => (
                        <option key={item.id} value={item.id}>{item.nome}</option>
                    ))}
                </select>
            </div>
            <div className="input">
                <button className="btn green" type="button" onClick={loadLista}>
                    <FontAwesomeIcon icon={faFilter} />
                    Listar
                </button>
            </div>
        </form>
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
  );
}

export default RelPessoa;