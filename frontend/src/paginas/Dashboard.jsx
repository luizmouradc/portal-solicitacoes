import { useNavigate } from "react-router-dom";

function Dashboard() {
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
    <div>
      <h1>Dashboard</h1>

      <p>
        Bem-vindo, {usuario?.nome}.
      </p>

      <button onClick={sair}>
        Sair
      </button>
    </div>
  );
}

export default Dashboard;