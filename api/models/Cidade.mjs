import query from '../data.mjs';

export default class Cidade {
    constructor(id, nome, uf) {
        this.id = id;
        this.nome = nome;
        this.uf = uf;
    }

    create(ifSuccess) {
        query(`INSERT INTO cidades VALUES (null, "${this.nome}", "${this.uf}")`, function(result) {
            if (result) {
                ifSuccess(result);
            }
        });
    }

    delete(ifSuccess) {
        query(`DELETE FROM cidades WHERE id = ${this.id}`, function(result) {
            if (result) {
                ifSuccess(result);
            }
        });
    }

    static async getAllCities() {
        return new Promise((resolve, reject) => {
            query('SELECT * FROM cidades', function(result) {
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            });
        });
    }
}