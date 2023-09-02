import query from '../Data.mjs';

export default class Bairro {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }

    create(ifSuccess) {
        query(`INSERT INTO bairros VALUES (null, "${this.nome}")`, function(result) {
            if (result) {
                ifSuccess(result);
            }
        });
    }

    delete(ifSuccess) {
        query(`DELETE FROM bairros WHERE id = ${this.id}`, function(result) {
            if (result) {
                ifSuccess(result);
            }
        });
    }
}