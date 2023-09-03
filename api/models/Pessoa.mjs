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

    create(ifSuccess) {
        query(`INSERT INTO pessoas VALUES (null, "${this.nome}", "${this.cidade_fk}", "${this.bairro_fk}", "${this.cep}", "${this.endereco}", "${this.numero}", "${this.complemento}", "${this.telefone}", "${this.email}")`, function(result) {
            if (result) {
                ifSuccess(result);
            }
        });
    }

    delete(ifSuccess) {
        query(`DELETE FROM pessoas WHERE id = ${this.id}`, function(result) {
            if (result) {
                ifSuccess(result);
            }
        });
    }

    static async getAllPeople() {
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
}

/* 
SQL
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