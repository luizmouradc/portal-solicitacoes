import { NavLink, useNavigate } from "react-router-dom";
import "./Cabecalho.css"

function Cabecalho(){
    const navigate = useNavigate();

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    function sair() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        navigate("/login");
    }

    return (
        <header className="cabecalho">
            <div>
                <h1>Poral de Solicitações</h1>
                <p>Bem-vindo, {usuario?.nome}</p>
            </div>

            <nav className="menu">
                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/solicitacoes">
                    Solicitações
                </NavLink>
            </nav>
        
            <button onClick={sair}>
                Sair
            </button>
        </header>
    )
}

export default Cabecalho;
