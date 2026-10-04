import { useEffect, useState } from "react";
import api from "../servicos/api";
import Cabecalho from "../componentes/Cabecalho";
import "./Solicitacoes.css";
import { useNavigate } from "react-router-dom";

function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [status, setStatus] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    buscarSolicitacoes();
  }, []);

  async function buscarSolicitacoes() {
    try {
      const token = localStorage.getItem("token");

      const resposta = await api.get("/solicitacoes", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          busca,
          categoria,
          status,
          dataInicio,
          dataFim
        }
      });

      setSolicitacoes(resposta.data.solicitacoes);

    } catch (erro) {
      setErro("Não foi possível carregar as solicitações.");
    } finally {
      setCarregando(false);
    }
  }

  function aplicarFiltros(evento) {
    evento.preventDefault();

    setCarregando(true);
    setErro("");

    buscarSolicitacoes();
  }

  async function limparFiltros() {
    setBusca("");
    setCategoria("");
    setStatus("");
    setDataInicio("");
    setDataFim("");

    setCarregando(true);
    setErro("");

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

        <div className="titulo-solicitacoes">
          <h2>Solicitações</h2>

          <button onClick={() => navigate("/solicitacoes/nova")}>
            Nova Solicitação
          </button>
        </div>

        <form className="filtros" onSubmit={aplicarFiltros}>

          <input
            type="text"
            placeholder="Buscar pelo título"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
          />

          <select
            value={categoria}
            onChange={(evento) => setCategoria(evento.target.value)}
          >
            <option value="">Todas as categorias</option>
            <option value="TI">TI</option>
            <option value="RH">RH</option>
            <option value="Compras">Compras</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Infraestrutura">Infraestrutura</option>
          </select>

          <select
            value={status}
            onChange={(evento) => setStatus(evento.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="Aberto">Aberto</option>
            <option value="Em Atendimento">Em Atendimento</option>
            <option value="Concluído">Concluído</option>
          </select>

          <div className="filtro-data">
            <label>De</label>

            <input
              type="date"
              value={dataInicio}
              onChange={(evento) => setDataInicio(evento.target.value)}
            />
          </div>

          <div className="filtro-data">
            <label>Até</label>

            <input
              type="date"
              value={dataFim}
              onChange={(evento) => setDataFim(evento.target.value)}
            />
          </div>

          <button className="buscar" type="submit">
            Buscar
          </button>

          <button
            className="limpar"
            type="button"
            onClick={limparFiltros}
          >
            Limpar
          </button>

        </form>

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