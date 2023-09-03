import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* Fixed Components */
import MenuBar from './components/MenuBar';
import StatusBar from './components/StatusBar';

/* Views */
import CadPessoa from './views/cadastros/CadPessoa';
import CadCidade from './views/cadastros/CadCidade';
import CadBairro from './views/cadastros/CadBairro';
import CadProduto from './views/cadastros/CadProduto';

function App() {
  return (
    <Router>
      <MenuBar />

      <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/cadastro/pessoas" element={<CadPessoa />} />
          <Route path="/cadastro/cidades" element={<CadCidade />} />
          <Route path="/cadastro/bairros" element={<CadBairro />} />
          <Route path="/cadastro/produtos" element={<CadProduto />} />
          <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>

      <StatusBar />
    </Router>
  );
}

export default App;
