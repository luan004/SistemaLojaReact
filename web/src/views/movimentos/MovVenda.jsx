import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import '../../style/Cad.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faXmark, faBox, faCartShopping } from '@fortawesome/free-solid-svg-icons'

function MovVenda() {
  const [listar, setListar] = useState(true);
  const [incluir, setIncluir] = useState(false);
  const [itens, setItem] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [pessoas, setPessoas] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [pessoaSelec, setPessoaSelec] = useState(false);
  const [produtoSelec, setProdutoSelec] = useState(null);
  const [precoUnit, setPrecoUnit] = useState(null);
  const [subtotal, setSubtotal] = useState(null);
  const [unidades, setUnidades] = useState(1);

  const [produtosAdd, setProdutoAdd] = useState([]);

  function confirmModalProduto(produto) { // REMOVER PRODUTO DA VENDA
    const newProdutos = produtosAdd.filter((item) => item.id !== produto.id);
    setProdutoAdd(newProdutos);
    setShowModal(false);
  }

  function addProduto() {
    const produto = produtoSelec;

    const subtotal = precoUnit * unidades;
    const item = {
      id: produto.id,
      nome: produto.nome,
      unidades: unidades,
      vrunitario: precoUnit,
      subtotal: subtotal
    }

    if (produtosAdd.filter((produto) => produto.id === item.id).length === 0) {
      setProdutoAdd([...produtosAdd, item]);
    }
  }

  function pessoaChange() {
    try {
      const pessoaid = document.getElementById('pessoa').value;
      const pessoa = pessoas.find((pessoa) => pessoa.id === parseInt(pessoaid));
      setPessoaSelec(pessoa);
    } catch {
      setPessoaSelec(null);
    }
  }

  function produtoChange() {
    try {
      const produtoid = document.getElementById('produto').value;
      const produto = produtos.find((produto) => produto.id === parseInt(produtoid));
      setPrecoUnit(produto.valor);

      setProdutoSelec(produto);
      calcPrecoTotal(produto);
    } catch {
      setPrecoUnit(null);
      setProdutoSelec(null);
      setSubtotal(null);  
    }
  }

  function calcPrecoTotal(produto) {
    const preco = produto.valor;
    const subtotal = (preco * unidades).toFixed(2);
    setSubtotal(subtotal);
  }

  function showListar() {
    setListar(true);
    setIncluir(false);
  }

  function showIncluir() {
    setListar(false);
    setIncluir(true);
  }

  function openModal() {
    setShowModal(true);
  };


  function cancel() {
    const form = document.getElementById('form');
    form.reset();
  }

  function closeModal() {
    setShowModal(false);
  };

  useEffect(() => { // Executar loadLista quando o componente for montado
    if (listar) {
      loadLista();
    }
  }, [listar]);

  useEffect(() => { // Executar loadComboBoxCidade quando o componente for montado
    if (incluir) {
      loadComboBoxPessoas();
      loadComboBoxProdutos();
    }
  }, [incluir]);

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
    try {
      const response = await fetch("http://localhost:3001/api/vendas");
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

  function submit() { // CRIAR ITEM
    const newVenda = {
      data: document.getElementById('date').value,
      pessoa_fk: document.getElementById('pessoa').value,
      vrtotal: produtosAdd.reduce((total, produto) => total + parseFloat(produto.subtotal), 0).toFixed(2)
    };

    fetch("http://localhost:3001/api/vendas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVenda),
    })
    .then((response) => response.json()) // Parse a resposta como JSON
    .then((data) => {
      produtosAdd.forEach((produto) => {
        const newProductVenda = {
          venda_fk: data.vendaId,
          produto_fk: produto.id,
          unidades: produto.unidades,
          vrunitario: produto.vrunitario,
          subtotal: produto.subtotal
        };

        fetch("http://localhost:3001/api/itensvenda", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProductVenda),
        });
      });
    });
    cancel();
    setProdutoAdd([]);
    setProdutoSelec(null);
    setPrecoUnit(null);
    setUnidades(1);
    setSubtotal(null);
  }
  
  function confirmModal(item) {
    fetch(`http://localhost:3001/api/vendas/${item.id}`, {
      method: "DELETE",
    })
    .then((data) => {
      loadLista();
    })
    setShowModal(false);
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
        <span>Vendas</span>
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
                  <th>Data</th>
                  <th>Pessoa</th>
                  <th>Total</th>
                  <th>Ações</th>
                </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{convertData(item.data)}</td>
                  <td>{item.pessoa_name}</td>
                  <td>R${item.vrtotal.replace('.',',')}</td>
                  <td>
                    <button className="btn-action remove" onClick={openModal}>
                      <FontAwesomeIcon icon={faTrash} />
                      Excluir
                    </button>
                    { showModal && (
                      <Modal 
                        message="Deseja realmente excluir o registro?"
                        confirmText="Sim"
                        cancelText="Não"
                        onConfirm={() => confirmModal(item)}
                        onClose={closeModal}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`incluir ${incluir ? "active" : ""}`}>
          <form className="form" id="form">
          <div className="input-row">
              <div className="input" style={{width:"300px"}}>
                <label htmlFor="cod">Código</label>
                <input type="number" id="cod" name="cod" disabled />
              </div>
              <div className="input" style={{width:"300px"}}>
                <label htmlFor="date">Data</label>
                <input type="date" id="date" name="date" value={new Date().toISOString().split('T')[0]} disabled />
              </div>
              <div className="input">
                <label htmlFor="pessoa">Pessoa</label>
                <select name="pessoa" id="pessoa" onChange={pessoaChange}>
                  <option value=""></option>
                  {pessoas && pessoas.map((pessoa) => (
                    <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-row">
              <div className="input">
                <label htmlFor="produto">Produto</label>
                <select name="produto" id="produto" onChange={produtoChange}>
                  <option value=""></option>
                  {produtos && produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>{produto.nome}</option>
                  ))}
                </select>
              </div>
              <div className="input">
                <label htmlFor="unidades">Unidades</label>
                <input type="number" name="unidades" id="unidades" value={unidades || ""} onChange={(e) => setUnidades(e.target.value)} min="1" />
              </div>
              <div className="input">
                <label htmlFor="vrunitario">Valor Unitário</label>
                <input type="number" name="vrunitario" id="vrunitario" value={precoUnit || ""} disabled/>
              </div>
              <div className="input">
                <label htmlFor="subtotal">Sub. Total</label>
                <input type="number" name="subtotal" id="subtotal" value={subtotal || ""} disabled/>
              </div>
              <div className={`input ${produtoSelec&&pessoaSelec ? "" : "none"}`}>
                <label htmlFor="addproduto">Adicionar Produto</label>
                <button className="btn green" type="button" id="addproduto" name="addproduto" onClick={addProduto}>
                  <FontAwesomeIcon icon={faBox} />
                  Adicionar
                </button>
              </div>
            </div>
            <table className="table">
            <thead>
                <tr>
                  <th>Código do Produto</th>
                  <th style={{width:"40%"}}>Produto</th>
                  <th>Unidades</th>
                  <th>Vr. Unitário</th>
                  <th>Sub. Total</th>
                  <th>Ações</th>
                </tr>
            </thead>
            <tbody id="produtosAddTable">
              {produtosAdd.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.unidades}</td>
                  <td>R${produto.vrunitario.replace('.',',')}</td>
                  <td>R${produto.subtotal}</td>
                  <td>
                    <button className="btn-action remove" type="button" onClick={openModal}>
                      <FontAwesomeIcon icon={faTrash} />
                      Excluir
                    </button>
                    { showModal && (
                      <Modal  
                        message="Deseja realmente excluir o registro?"
                        confirmText="Sim"
                        cancelText="Não"
                        onConfirm={() => confirmModalProduto(produto)}
                        onClose={closeModal}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            <div className="input-row bottom">
              <div className="input">
                <label htmlFor="total">Total</label>
                <input type="number" name="total" id="total" value={produtosAdd.reduce((total, produto) => total + parseFloat(produto.subtotal), 0).toFixed(2)} disabled/>
              </div>
            </div>
            <div className="input-row">
              <button type="button" onClick={submit} className="btn green">
              <FontAwesomeIcon icon={faCartShopping} />
                Efetuar Venda
              </button>
              <button type="button" onClick={cancel} className="btn red">
                <FontAwesomeIcon icon={faXmark} />
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MovVenda;