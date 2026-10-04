import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../servicos/api";
import Cabecalho from "../componentes/Cabecalho";
import "./NovaSolicitacao.css";

function NovaSolicitacao() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const navigate = useNavigate();

  async function criarSolicitacao(evento) {
    evento.preventDefault();

    setErro("");
    setSalvando(true);

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/solicitacoes",
        {
          titulo,
          descricao,
          categoria
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      navigate("/solicitacoes");

    } catch (erro) {
      setErro(
        erro.response?.data?.mensagem ||
        "Não foi possível criar a solicitação."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="pagina-nova-solicitacao">
      <Cabecalho />

      <main className="conteudo-nova-solicitacao">
        <h2>Nova solicitação</h2>

        <form
          className="formulario-solicitacao"
          onSubmit={criarSolicitacao}
        >
          <label>Título</label>

          <input
            type="text"
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
            placeholder="Digite o título da solicitação"
            required
          />

          <label>Descrição</label>

          <textarea
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            placeholder="Descreva a solicitação"
            rows="5"
            required
          />

          <label>Categoria</label>

          <select
            value={categoria}
            onChange={(evento) => setCategoria(evento.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="TI">TI</option>
            <option value="RH">RH</option>
            <option value="Compras">Compras</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Infraestrutura">Infraestrutura</option>
          </select>

          {erro && (
            <p className="mensagem-erro">
              {erro}
            </p>
          )}

          <div className="acoes-formulario">
            <button
              type="button"
              onClick={() => navigate("/solicitacoes")}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={salvando}
            >
              {salvando ? "Salvando..." : "Criar solicitação"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default NovaSolicitacao;