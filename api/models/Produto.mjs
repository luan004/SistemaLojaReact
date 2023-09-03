import query from '../Data.mjs';

export default class Produto {
    constructor(id, nome, valor) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
    }

    create() {
        return new Promise((resolve, reject) => {
            query(`INSERT INTO produtos VALUES (null, "${this.nome}", ${this.valor})`, function(result) {
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
            query(`DELETE FROM produtos WHERE id = ${this.id}`, function(result) {
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
            query('SELECT * FROM produtos', function(result) {
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
            query(`UPDATE produtos SET nome = "${this.nome}", valor = ${this.valor} WHERE id = ${this.id}`, function(result) {
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            }); 
        });
    }
}