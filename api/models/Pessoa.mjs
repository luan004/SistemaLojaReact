import query from '../Data.mjs';

export default class Pessoa {
    constructor(id, nome, cidade_fk, bairro_fk, cep, endereco, numero, complemento, telefone, email) {
        this.id = id;
        this.nome = nome;
        this.cidade_fk = cidade_fk;
        this.bairro_fk = bairro_fk;
        this.cep = cep;
        this.endereco = endereco;
        this.numero = numero;
        this.complemento = complemento;
        this.telefone = telefone;
        this.email = email;
    }

    create() {
        return new Promise((resolve, reject) => {
            query(`INSERT INTO pessoas VALUES (null, "${this.nome}", "${this.cidade_fk}", "${this.bairro_fk}", "${this.cep}", "${this.endereco}", "${this.numero}", "${this.complemento}", "${this.telefone}", "${this.email}")`, function(result) {
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
            query(`DELETE FROM pessoas WHERE id = ${this.id}`, function(result) {
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
            query('SELECT * FROM pessoas', function(result) {
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
            query(`UPDATE pessoas SET nome = "${this.nome}", cidade_fk = "${this.cidade_fk}", bairro_fk = "${this.bairro_fk}", cep = "${this.cep}", endereco = "${this.endereco}", numero = "${this.numero}", complemento = "${this.complemento}", telefone = "${this.telefone}", email = "${this.email}" WHERE id = ${this.id}`, function(result) {
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            }); 
        });
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            query(`SELECT * FROM pessoas WHERE id = ${id}`, function(result) {
                if (result) {
                    resolve(result[0]);
                } else {
                    reject();
                }
            });
        });
    }

    static async getByFilters(cidade, bairro, nome) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM pessoas WHERE 1';
    
            if (cidade) {
                sql += ` AND cidade_fk = ${cidade}`;
            }
    
            if (bairro) {
                sql += ` AND bairro_fk = ${bairro}`;
            }
    
            if (nome) {
                sql += ` AND nome LIKE '%${nome}%'`;
            }
            
            query(sql, function (result) {
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
CREATE TABLE pessoas (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cidade_fk INT NOT NULL,
    bairro_fk INT NOT NULL,
    cep VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    numero VARCHAR(255) NOT NULL,
    complemento VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (cidade_fk) REFERENCES cidades(id),
    FOREIGN KEY (bairro_fk) REFERENCES bairros(id)
);
*/