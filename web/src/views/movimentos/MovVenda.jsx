import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import '../../style/Cad.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faXmark, faBox, faCartShopping } from '@fortawesome/free-solid-svg-icons'

function MovVenda() {
  const [listar, setListar] = useState(true);
  const [incluir, setIncluir] = useState(false);
  const [itens, setItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [pessoas, setPessoas] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [produtoSelec, setProdutoSelec] = useState(null);
  const [precoUnit, setPrecoUnit] = useState(null);
  const [subtotal, setSubtotal] = useState(null);
  const [unidades, setUnidades] = useState(1);

  const [produtosAdd, setProdutoAdd] = useState([]);

  function unidadesChange(event) {
    setUnidades(event.target.value);
    produtoChange();
  }

  function confirmModalProduto(produto) { // REMOVER PRODUTO DA VENDA
    const newProdutos = produtosAdd.filter((item) => item.id !== produto.id);
    setProdutoAdd(newProdutos);
    setShowModal(false);
  }

  function addProduto() {
    const produto = produtoSelec;

    const unidades = document.getElementById('unidades').value;
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
    const unidades = document.getElementById('unidades').value;
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

  function editItem(item) {
    setEditMode(true);
    setEditingItem(item);
    showIncluir();
    
    document.getElementById('cod').value = item.id;
    document.getElementById('nome').value = item.nome;
    document.getElementById('cidade').value = item.cidade_fk;
    document.getElementById('bairro').value = item.bairro_fk;
    document.getElementById('cep').value = item.cep;
    document.getElementById('endereco').value = item.endereco;
    document.getElementById('numero').value = item.numero;
    document.getElementById('complemento').value = item.complemento;
    document.getElementById('telefone').value = item.telefone;
    document.getElementById('email').value = item.email;
  };

  function cancel() {
    const form = document.getElementById('form');
    form.reset();
    setEditMode(false);
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
      const data = new Date();
      document.getElementById('date').value = data.toISOString().split('T')[0];
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
      const response = await fetch("http://localhost:3001/api/pessoas");
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

  function submit() { // CRIAR ITEM OU EDITAR ITEM
    if (editMode) {
      const edited = {
        id: document.getElementById('cod').value,
        nome: document.getElementById('nome').value,
        cidade_fk: document.getElementById('cidade').value,
        bairro_fk: document.getElementById('bairro').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value
      };
  
      fetch(`http://localhost:3001/api/pessoas/${editingItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(edited),
      })
    } else {
      const newVenda = {
        data: document.getElementById('date').value,
        pessoa_fk: document.getElementById('pessoa').value,
        produtos: produtosAdd
      };
  
      fetch("http://localhost:3001/api/pessoas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVenda),
      })
    }
    cancel();
  }
  
  function confirmModal(item) { // EXCLUIR ITEM
    fetch(`http://localhost:3001/api/pessoas/${item.id}`, {
      method: "DELETE",
    })
    .then((data) => {
      loadLista();
    })
    setShowModal(false);
  };

  return (
    <div className="viewload">
      <div className="title">
        <span>Cadastro de Pessoas</span>
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
                  <th>Nome da Pessoa</th>
                  <th>Cidade</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.cidade_name}</td>
                  <td>{item.telefone}</td>
                  <td>
                    <button className="btn-action edit" onClick={() => editItem(item)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                      Editar
                    </button>
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
                <input type="date" id="date" name="date" disabled/>
              </div>
              <div className="input">
                <label htmlFor="pessoa">Pessoa</label>
                <select name="pessoa" id="pessoa">
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
                <input type="number" name="unidades" id="unidades" value={unidades} onChange={unidadesChange}/>
              </div>
              <div className="input">
                <label htmlFor="vrunitario">Valor Unitário</label>
                <input type="number" name="vrunitario" id="vrunitario" value={precoUnit || ""} disabled/>
              </div>
              <div className="input">
                <label htmlFor="subtotal">Sub. Total</label>
                <input type="number" name="subtotal" id="subtotal" value={subtotal || ""} disabled/>
              </div>
              <div className={`input ${produtoSelec ? "" : "none"}`}>
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
                  <th>Código</th>
                  <th>Produto</th>
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
                  <td>{produto.vrunitario}</td>
                  <td>{produto.subtotal}</td>
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