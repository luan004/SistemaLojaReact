import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBox, faRoad, faTreeCity, faCartShopping, faAddressBook, faCartArrowDown } from '@fortawesome/free-solid-svg-icons'

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
                                <FontAwesomeIcon icon={faTreeCity} />
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
                        <li>
                            <Link to="/movimentos/vendas">
                                <FontAwesomeIcon icon={faCartShopping} />
                                <span>Vendas</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="menu-item">
                    Relatórios
                    <ul className="sub-menu">
                        <li>
                            <Link to="/relatorios/pessoas">
                                <FontAwesomeIcon icon={faAddressBook} />
                                <span>Lista de Pessoas</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/relatorios/vendas">
                                <FontAwesomeIcon icon={faCartArrowDown} />
                                <span>Lista de Vendas</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="menu-item">
                    <Link to={"/"}>
                        <span>Sobre</span>
                    </Link>
                </li>
                <li className="menu-item-right">
                    Admin
                </li>
            </ul>
        </nav>
    );
};

export default MenuBar;