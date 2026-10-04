import { useEffect, useState } from "react";
import api from "../servicos/api";
import "./Dashboard.css";
import Cabecalho from "../componentes/Cabecalho";

function Dashboard() {

  const [indicadores, setIndicadores] = useState({
    total: 0,
    abertas: 0,
    emAtendimento: 0,
    concluidas: 0
  })

  const [carregando, setCarregando] = useState(true);
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
      setCarregando(false)
    }
  }

  return (
    <div className="pagina-dashboard">
      <Cabecalho />

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