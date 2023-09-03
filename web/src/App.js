import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* Fixed Components */
import MenuBar from './components/MenuBar';
import StatusBar from './components/StatusBar';

/* Views */
import CadPessoa from './views/cadastros/CadPessoa';
import CadCidade from './views/cadastros/CadCidade';
import CadBairro from './views/cadastros/CadBairro';
import CadProduto from './views/cadastros/CadProduto';
import MovVenda from './views/movimentos/MovVenda';
import RelPessoa from './views/relatorios/RelPessoa';
import RelVenda from './views/relatorios/RelVenda';
import Sobre from './views/Sobre';

function App() {
  return (
    <Router>
      <MenuBar />

      <Routes>
          <Route path="/" element={<Sobre />} />
          <Route path="/cadastros/pessoas" element={<CadPessoa />} />
          <Route path="/cadastros/cidades" element={<CadCidade />} />
          <Route path="/cadastros/bairros" element={<CadBairro />} />
          <Route path="/cadastros/produtos" element={<CadProduto />} />
          <Route path="/movimentos/vendas" element={<MovVenda />} />
          <Route path="/relatorios/pessoas" element={<RelPessoa />} />
          <Route path="/relatorios/vendas" element={<RelVenda />} />
          <Route path="*" element={<Sobre />} />
      </Routes>

      <StatusBar />
    </Router>
  );
}

export default App;
