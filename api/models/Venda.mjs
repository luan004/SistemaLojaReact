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

    static async getByFilters(date1, date2, pessoa, produto) {
        let sql = 'SELECT v.* FROM vendas v';
        let where = [];
    
        if (date1 && date2) {
            where.push(`v.data BETWEEN "${date1}" AND "${date2}"`);
        }
        if (pessoa) {
            where.push(`v.pessoa_fk = ${pessoa}`);
        }
        if (produto) {
            sql += ' INNER JOIN itensvenda ON v.id = itensvenda.venda_fk';
            where.push(`itensvenda.produto_fk = ${produto}`);
        }
        if (where.length > 0) {
            sql += ' WHERE ' + where.join(' AND ');
        }
        
        return new Promise((resolve, reject) => {
            query(sql, function(result) {
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