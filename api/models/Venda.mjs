import query from '../Data.mjs';

export default class Venda {
    constructor(id, data, pessoa_fk, vrtotal) {
        this.id = id;
        this.data = data;
        this.pessoa_fk = pessoa_fk;
        this.vrtotal = vrtotal;
    }

    create() {
        return new Promise((resolve, reject) => {
          query(`INSERT INTO vendas VALUES (null, "${this.data}", ${this.pessoa_fk}, ${this.vrtotal})`, function(result) {
            if (result && result.insertId) { // Verifique se o ID da inserção é válido
              resolve(result.insertId);
            } else {
              reject();
            }
          });
        });
    }      

    delete() {
        return new Promise((resolve, reject) => {
            query(`DELETE FROM vendas WHERE id = ${this.id}`, function(result) {
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
            query('SELECT * FROM vendas', function(result) {
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
            query(`UPDATE vendas SET data = "${this.data}", pessoa_fk = ${this.pessoa_fk} WHERE id = ${this.id}`, function(result) {
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            }); 
        });
    }
}

/* 
CREATE TABLE vendas (
    id INT NOT NULL AUTO_INCREMENT,
    data DATE NOT NULL,
    pessoa_fk INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (pessoa_fk) REFERENCES pessoas(id)
);
*/