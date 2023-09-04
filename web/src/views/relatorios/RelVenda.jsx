import React, { useState, useEffect } from "react";
import '../../style/Cad.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

function RelVenda() {
  const [itens, setItem] = useState([]);

  const [pessoas, setPessoas] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [pessoa, setPessoa] = useState("");
  const [produto, setProduto] = useState("");

    useEffect(() => {
      loadComboBoxPessoas();
      loadComboBoxProdutos();
    }, []);

    async function loadComboBoxPessoas () {
      try {
        const response = await fetch("http://localhost:3001/api/pessoas");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setPessoas(data);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };
  
    async function loadComboBoxProdutos() {
      try {
        const response = await fetch("http://localhost:3001/api/produtos");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    }

  async function loadLista() { // LISTAR ITEMS
    const filters = {
        date1: date1,
        date2: date2,
        pessoa: pessoa,
        produto: produto
    }
    try {
        const response = await fetch(`http://localhost:3001/api/vendas?date1=${filters.date1}&date2=${filters.date2}&pessoa=${filters.pessoa}&produto=${filters.produto}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        const dataWithPessoa = await Promise.all(data.map(async (item) => {
          const response = await fetch(`http://localhost:3001/api/pessoas/${item.pessoa_fk}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar dados da API");
          }
          const data = await response.json();
          return {
            ...item,
            pessoa_name: data.nome
          }
        }));
        setItem(dataWithPessoa);
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
    }
  };

  
  function convertData(data) {
    const dateObject = new Date(data);
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1;
    const year = dateObject.getUTCFullYear();
  
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    const commonDateFormat = `${formattedDay}/${formattedMonth}/${year}`;
    return commonDateFormat;
  }

  return (
    <div className="viewload">
      <div className="title">
        <span>Relatório de Vendas</span>
      </div>
      <div className="window">
        <form>
            <div className="input-row">
              <div className="input">
                  <label htmlFor="date1">De</label>
                  <input type="date" id="date1" name="date1" value={date1} onChange={(e) => setDate1(e.target.value)} />
              </div>
              <div className="input">
                  <label htmlFor="date2">Até</label>
                  <input type="date" id="date2" name="date2" value={date2} onChange={(e) => setDate2(e.target.value)} />
              </div>
            </div>
            <div className="input">
                <label htmlFor="pessoa">Pessoa</label>
                <select id="pessoa" name="pessoa" value={pessoa} onChange={(e) => setPessoa(e.target.value)}>
                    <option value="">Selecione</option>
                    {pessoas.map((item) => (
                        <option key={item.id} value={item.id}>{item.nome}</option>
                    ))}
                </select>
            </div>
            <div className="input">
                <label htmlFor="produto">Produto</label>
                <select id="produto" name="produto" value={produto} onChange={(e) => setProduto(e.target.value)}>
                    <option value="">Selecione</option>
                    {produtos.map((item) => (
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
                  <th>Pessoa</th>
                  <th>Total</th>
                  <th>Data</th>
                </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.pessoa_name}</td>
                  <td>R${item.vrtotal.replace('.',',')}</td>
                  <td>{convertData(item.data)}</td>
                </tr>
              ))}
            </tbody>
        </table>
        <div className="input-row bottom">
          <div className="input">
            <label htmlFor="total">Total</label>
            <input type="text" id="total" name="total" value={itens.reduce((acc, item) => acc + parseFloat(item.vrtotal), 0).toFixed(2).replace('.',',')} disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelVenda;