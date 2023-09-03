import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCity, faBox, faRoad } from '@fortawesome/free-solid-svg-icons'

import "../style/MenuBar.css";

const MenuBar = () => {
    return (
        <nav className="menu-bar">
            <ul className="menu">
                <li className="menu-item">
                    Cadastros
                    <ul className="sub-menu">
                        <li>
                            <Link to="/cadastros/bairros">
                                <FontAwesomeIcon icon={faRoad} />
                                <span>Bairros</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cadastros/cidades">
                                <FontAwesomeIcon icon={faCity} />
                                <span>Cidades</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cadastros/pessoas">
                                <FontAwesomeIcon icon={faUser} />
                                <span>Pessoas</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cadastros/produtos">
                                <FontAwesomeIcon icon={faBox} />
                                <span>Produtos</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="menu-item">
                    Movimentos
                    <ul className="sub-menu">
                        <li><Link to="/movimentos/vendas">Vendas</Link></li>
                    </ul>
                </li>
                <li className="menu-item">
                    Relatórios
                    <ul className="sub-menu">
                        <li><Link to="/relatorios/pessoas">Lista de Pessoas</Link></li>
                        <li><Link to="/relatorios/vendas">Lista de Vendas</Link></li>
                    </ul>
                </li>
                <li className="menu-item">
                    Sobre
                </li>
                <li className="menu-item-right">
                    Admin
                </li>
            </ul>
        </nav>
    );
};

export default MenuBar;