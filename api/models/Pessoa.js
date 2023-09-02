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
}