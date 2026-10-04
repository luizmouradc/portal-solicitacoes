import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../servicos/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const [indicadores, setIndicadores] = useState({
    total: 0,
    abertas: 0,
    emAtendimento: 0,
    concluidas: 0
  })

  const [carregando, setCarregado] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    buscarIndicadores();
  }, []);

  async function buscarIndicadores(){
    try{
      const token = localStorage.getItem("token");

      const resposta = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setIndicadores(resposta.data);
    } catch (erro){
      setErro("Não foi possível carregar o dashboard")
    } finally{
      setCarregado(false)
    }
  }

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/login");
  }

  return (
    <div className="pagina-dashboard">
      <header className="cabecalho">
        <div>
          <h1>Poral de Solicitações</h1>
          <p>Bem-vindo, {usuario?.nome}</p>
        </div>

        <button onClick={sair}>
          Sair
        </button>
      </header>

      <main className="conteudo-dashboard">
        <h2>Dashboard</h2>

        {carregando && (
          <p>Carregando ...</p>
        )}

        {erro && (
          <p className="mensagem-erro">{erro}</p>
        )}

        {!carregando && !erro && (
          <div className="cards-dashboard">
            <div className="card-dashboard">
              <span>Total</span>
              <strong>{indicadores.total}</strong>
            </div>

            <div className="card-dashboard">
              <span>Abertas</span>
              <strong>{indicadores.abertas}</strong>
            </div>

             <div className="card-dashboard">
              <span>Em atendimento</span>
              <strong>{indicadores.emAtendimento}</strong>
            </div>

            <div className="card-dashboard">
              <span>Concluídas</span>
              <strong>{indicadores.concluidas}</strong>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;