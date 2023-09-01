require('./Data.js');

const Cidade = require('./models/Cidade.js');

let cidade = new Cidade(1, 'São Paulo', 'SP');
cidade.id = 2;
console.log(cidade.id);

query(`INSERT INTO cidades VALUES (null, "Teste", "PR")`, function(result) {
    console.log(result);
});