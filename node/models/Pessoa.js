module.exports = class Pessoa {
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
}