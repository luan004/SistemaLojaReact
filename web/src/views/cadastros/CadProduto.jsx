import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import '../../style/Cad.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons'

function CadProduto() {
  const [listar, setListar] = useState(true);
  const [incluir, setIncluir] = useState(false);
  const [itens, setItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [cod, setCod] = useState('');
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');

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
    
    setCod(item.id);
    setNome(item.nome);
    setValor(item.valor);
  };

  function cancel() {
    setCod('');
    setNome('');
    setValor('');
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
      const response = await fetch("http://localhost:3001/api/produtos");
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
        id: cod,
        nome: nome,
        valor: valor
      };
  
      fetch(`http://localhost:3001/api/produtos/${editingItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(edited),
      })
    } else {
      const newItem = {
        nome: nome,
        valor: valor
      };
  
      fetch("http://localhost:3001/api/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
    }
    cancel();
    listar ? loadLista() : showListar();
  }
  
  function confirmModal(item) { // EXCLUIR ITEM
    fetch(`http://localhost:3001/api/produtos/${item.id}`, {
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
        <span>Cadastro de Produto</span>
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
                  <th>Nome do Produto</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>R${item.valor.replace('.', ',')}</td>
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
                <input type="number" id="cod" name="cod" value={cod || ''} onChange={e => setCod(e.target.value)} disabled/>
              </div>
              <div className="input">
                <label htmlFor="nome">Nome do Produto</label>
                <input type="text" id="nome" name="nome" value={nome || ''} onChange={e => setNome(e.target.value)} />
              </div>
              <div className="input" style={{width:"200px"}}>
                <label htmlFor="valor">Valor (R$)</label>
                <input type="number" step={0.25} id="valor" name="valor" style={{textTransform:"uppercase"}} value={valor || ''} onChange={e => setValor(e.target.value)} />
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

export default CadProduto;