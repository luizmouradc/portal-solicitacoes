import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";

import Login from "./paginas/Login";
import Dashboard from "./paginas/Dashboard";
import RotaProtegida from "./componentes/RotaProtegida";

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

      </Routes>
    </BrowserRouter>
  )
}

export default App;
