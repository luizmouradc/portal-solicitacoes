import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";

import Login from "./paginas/Login";
import Dashboard from "./paginas/Dashboard";

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
          element={<Dashboard/>}
        />        

      </Routes>
    </BrowserRouter>
  )
}

export default App;
