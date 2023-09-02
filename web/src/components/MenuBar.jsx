import React from "react";
import { Link } from "react-router-dom";

import "../css/MenuBar.css";

const MenuBar = () => {
    return (
        <nav className="menu-bar">
            <ul className="menu">
                <li className="menu-item">
                    Cadastros
                    <ul className="sub-menu">
                        <li><Link to="/cadastro/bairros">Bairros</Link></li>
                        <li><Link to="/cadastro/cidades">Cidades</Link></li>
                        <li><Link to="/cadastro/pessoas">Pessoas</Link></li>
                        <li><Link to="/cadastro/produtos">Produtos</Link></li>
                    </ul>
                </li>
                <li className="menu-item">
                    Movimentos
                    <ul className="sub-menu">
                        <li><Link to="/movimento/vendas">Vendas</Link></li>
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