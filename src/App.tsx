import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { PokedexPage } from './pages/PokedexPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PokedexPage optimized={false} />} />
        <Route path="/optimized" element={<PokedexPage optimized={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
