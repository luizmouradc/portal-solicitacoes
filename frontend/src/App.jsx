import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";

import Login from "./paginas/Login";
import Dashboard from "./paginas/Dashboard";
import RotaProtegida from "./componentes/RotaProtegida";
import Solicitacoes from "./paginas/Solicitacoes";
import NovaSolicitacao from "./paginas/NovaSolicitacao";

function App(){
  return(
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login"/>}
        />

        <Route
          path="/login"
          element={<Login/>}
        />
        
        <Route
          path="/dashboard"
          element={
            <RotaProtegida>
              <Dashboard/>
            </RotaProtegida>
          }
        />   

        <Route
          path="/solicitacoes"
          element={
            <RotaProtegida>
              <Solicitacoes/>
            </RotaProtegida>
          }
        />     

        <Route
          path="/solicitacoes/nova"
          element={
            <RotaProtegida>
              <NovaSolicitacao/>
            </RotaProtegida>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
