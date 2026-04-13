import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { PokedexPage } from './pages/PokedexPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/Showcase">
        <Header />
        <Routes>
          <Route path="/" element={<PokedexPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
