import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import NovoUsuario from "./pages/NovoUsuario";
import EditarUsuario from "./pages/EditarUsuario";
import Filmes from "./pages/Filmes";
import NovoFilme from "./pages/NovoFilme";
import EditarFilme from "./pages/EditarFilme";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/usuarios' element={<Usuarios />} />
          <Route path='/usuarios/novo' element={<NovoUsuario />} />
          <Route path='/usuarios/editar/:id' element={<EditarUsuario />} />
          <Route path='/filmes' element={<Filmes />} />
          <Route path='/filmes/novo' element={<NovoFilme />} />
          <Route path='/filmes/editar/:id' element={<EditarFilme />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster position='bottom-right' />
    </>
  );
}

export default App;
