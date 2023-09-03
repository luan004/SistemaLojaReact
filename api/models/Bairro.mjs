import query from '../Data.mjs';

export default class Bairro {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }

    create() {
        return new Promise((resolve, reject) => {
            query(`INSERT INTO bairros VALUES (null, "${this.nome}")`, function(result) {
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
            query(`DELETE FROM bairros WHERE id = ${this.id}`, function(result) {
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
            query('SELECT * FROM bairros', function(result) {
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
            query(`UPDATE bairros SET nome = "${this.nome}" WHERE id = ${this.id}`, function(result) {
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            }); 
        });
    }
}