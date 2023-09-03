import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import '../../style/Cad.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons'

function CadPessoa() {
  const [listar, setListar] = useState(true);
  const [incluir, setIncluir] = useState(false);
  const [itens, setItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);

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
      loadComboBoxCidade();
      loadComboBoxBairro();
    }
  }, [incluir]);

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
      const newItem = {
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
  
      fetch("http://localhost:3001/api/pessoas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
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
              <div className="input" style={{width:"100px"}}>
                <label htmlFor="cod">Código</label>
                <input type="number" id="cod" name="cod" disabled />
              </div>
              <div className="input">
                <label htmlFor="nome">Nome da Pessoa</label>
                <input type="text" id="nome" name="nome" />
              </div>
            </div>
            <div className="input-row">
              <div className="input">
                <label htmlFor="cidade">Cidade</label>
                <select name="cidade" id="cidade">
                  {cidades && cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                  ))}
                </select>
              </div>
              <div className="input">
                <label htmlFor="bairro">Bairro</label>
                <select name="bairro" id="bairro">
                  {bairros && bairros.map((bairro) => (
                    <option key={bairro.id} value={bairro.id}>{bairro.nome}</option>
                  ))}
                </select>
              </div>
              <div className="input" style={{width:"200px"}}>
                <label htmlFor="cep">CEP</label>
                <input type="text" id="cep" name="cep" maxLength={9} minLength={9} />
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
                <input type="tel" id="telefone" name="telefone" maxLength={11} />
              </div>
              <div className="input">
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" name="email" />
              </div>
            </div>
            <div className="input-row bottom">
              <button type="button" onClick={submit} className="btn green">
                <FontAwesomeIcon icon={faFloppyDisk} />
                Salvar
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

export default CadPessoa;