import {Navigate} from "react-router-dom";

function RotaProtegida({children}){
    const token = localStorage.getItem("token");

    // se nao existir token, colta para login
    if(!token){
        return <Navigate to="/login" replace/>;
    }

    // se existir token, mostra a pagina normalmente
    return children;
}

export default RotaProtegida;
