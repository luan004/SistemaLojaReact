module.exports = class Venda {
    constructor(id, data, pessoa_fk) {
        this.id = id;
        this.data = data;
        this.pessoa_fk = pessoa_fk;
    }
}