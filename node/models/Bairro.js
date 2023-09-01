module.exports = class Bairro {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
}

module.exports = create = function(bairro, callback) {
    query(`INSERT INTO bairros VALUES (null, "${bairro.nome}")`, function(result) {
        callback(result);
    });
}