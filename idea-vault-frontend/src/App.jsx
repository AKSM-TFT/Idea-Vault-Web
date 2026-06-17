import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { IdeaDetail } from './pages/IdeaDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ideas/:id" element={<IdeaDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
