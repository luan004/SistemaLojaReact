import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import '../../style/Cad.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons'

function CadBairro() {
  const [listar, setListar] = useState(true);
  const [incluir, setIncluir] = useState(false);
  const [itens, setItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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
    document.getElementById('uf').value = item.uf;
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

  const loadLista = async () => { // LISTAR ITEMS
    try {
      const response = await fetch("http://localhost:3001/api/cidades");
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  function submit() { // CRIAR ITEM OU EDITAR ITEM
    if (editMode) {
      const edited = {
        id: document.getElementById('cod').value,
        nome: document.getElementById('nome').value,
        uf: document.getElementById('uf').value,
      };
  
      fetch(`http://localhost:3001/api/cidades/${editingItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(edited),
      })
    } else {
      const newItem = {
        nome: document.getElementById('nome').value,
        uf: document.getElementById('uf').value,
      };
  
      fetch("http://localhost:3001/api/cidades", {
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
    fetch(`http://localhost:3001/api/cidades/${item.id}`, {
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
        <span>Cadastro de Bairro</span>
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
                  <th>Ações</th>
                </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
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
              <div className="input" style={{width:"200px"}}>
                <label htmlFor="cod">Código</label>
                <input type="number" id="cod" name="cod" disabled/>
              </div>
              <div className="input">
                <label htmlFor="nome">Nome do Bairro</label>
                <input type="text" id="nome" name="nome" />
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

export default CadBairro;