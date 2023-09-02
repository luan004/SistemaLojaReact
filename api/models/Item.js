module.exports = class Item {
    constructor(id, venda_fk, produto_fk, qtde, valor) {
        this.id = id;
        this.venda_fk = venda_fk;
        this.produto_fk = produto_fk;
        this.qtde = qtde;
        this.valor = valor;
    }
}