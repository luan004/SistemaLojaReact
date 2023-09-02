import Cidade from './models/Cidade.mjs';

let cidade = new Cidade(1, 'Sãadfadso Paulo', 'SP');

cidade.create(
    function(result) {
        console.log('Work: ' + result);
    }
);

/* cidade.delete(
    function(result) {
        console.log('Deu certo: ' + result);
    }
); */