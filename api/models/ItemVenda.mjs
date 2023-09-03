import query from '../Data.mjs';

export default class ItemVenda {
    constructor(id, venda_fk, produto_fk, unidades, subtotal) {
        this.id = id;
        this.venda_fk = venda_fk;
        this.produto_fk = produto_fk;
        this.unidades = unidades;
        this.subtotal = subtotal;
    }

    create() {
        return new Promise((resolve, reject) => {
            query(`INSERT INTO itensvenda VALUES (null, ${this.venda_fk}, ${this.produto_fk}, ${this.unidades}, ${this.subtotal})`, function(result) {
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            });
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            query(`DELETE FROM itensvenda WHERE id = ${this.id}`, function(result) {
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            });
        });
    }

    static async get() {
        return new Promise((resolve, reject) => {
            query('SELECT * FROM itensvenda', function(result) {
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            });
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            query(`UPDATE itensvenda SET venda_fk = ${this.venda_fk}, produto_fk = ${this.produto_fk}, unidades = ${this.unidades}, vrtotal = ${this.vrtotal} WHERE id = ${this.id}`, function(result) {
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            }); 
        });
    }

    static async getItensVenda(id) {
        return new Promise((resolve, reject) => {
            query(`SELECT * FROM itensvenda WHERE venda_fk = ${id}`, function(result) {
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            });
        });
    }
}