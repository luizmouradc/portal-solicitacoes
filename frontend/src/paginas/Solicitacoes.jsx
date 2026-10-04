import { useEffect, useState } from "react";
import api from "../servicos/api";
import Cabecalho from "../componentes/Cabecalho";
import "./Solicitacoes.css";

function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    buscarSolicitacoes();
  }, []);

  async function buscarSolicitacoes() {
    try {
      const token = localStorage.getItem("token");

      const resposta = await api.get("/solicitacoes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSolicitacoes(resposta.data.solicitacoes);

    } catch (erro) {
      setErro("Não foi possível carregar as solicitações.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-solicitacoes">
      <Cabecalho />

      <main className="conteudo-solicitacoes">
        <h2>Solicitações</h2>

        {carregando && <p>Carregando...</p>}

        {erro && (
          <p className="mensagem-erro">
            {erro}
          </p>
        )}

        {!carregando && !erro && (
          <table className="tabela-solicitacoes">
            <thead>
              <tr>
                <th>Código</th>
                <th>Título</th>
                <th>Categoria</th>
                <th>Solicitante</th>
                <th>Data de abertura</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {solicitacoes.map((solicitacao) => (
                <tr key={solicitacao.id}>
                  <td>{solicitacao.id}</td>
                  <td>{solicitacao.titulo}</td>
                  <td>{solicitacao.categoria}</td>
                  <td>{solicitacao.solicitante}</td>
                  <td>{solicitacao.data_criacao}</td>
                  <td>{solicitacao.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!carregando &&
          !erro &&
          solicitacoes.length === 0 && (
            <p>Nenhuma solicitação encontrada.</p>
          )}
      </main>
    </div>
  );
}

export default Solicitacoes;