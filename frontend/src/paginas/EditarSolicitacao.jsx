import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../servicos/api";
import Cabecalho from "../componentes/Cabecalho";

import "./EditarSolicitacao.css";

function EditarSolicitacao() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    buscarSolicitacao();
  }, [id]);

  async function buscarSolicitacao() {
    try {
      const token = localStorage.getItem("token");

      const resposta = await api.get(
        `/solicitacoes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const solicitacao = resposta.data.solicitacao;

      if (solicitacao.status !== "Aberto") {
        setErro("Apenas solicitações abertas podem ser editadas.");
        return;
      }

      setTitulo(solicitacao.titulo);
      setDescricao(solicitacao.descricao);
      setCategoria(solicitacao.categoria);

    } catch (erro) {
      setErro(
        erro.response?.data?.mensagem ||
        "Não foi possível carregar a solicitação."
      );
    } finally {
      setCarregando(false);
    }
  }

  async function salvarAlteracoes(evento) {
    evento.preventDefault();

    setErro("");
    setSalvando(true);

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/solicitacoes/${id}`,
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

      navigate(`/solicitacoes/${id}`);

    } catch (erro) {
      setErro(
        erro.response?.data?.mensagem ||
        "Não foi possível editar a solicitação."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="pagina-editar-solicitacao">
      <Cabecalho />

      <main className="conteudo-editar-solicitacao">
        <h2>Editar solicitação</h2>

        {carregando && (
          <p>Carregando...</p>
        )}

        {erro && (
          <p className="mensagem-erro">
            {erro}
          </p>
        )}

        {!carregando && !erro && (
          <form
            className="formulario-edicao"
            onSubmit={salvarAlteracoes}
          >
            <label>Título</label>

            <input
              type="text"
              value={titulo}
              onChange={(evento) =>
                setTitulo(evento.target.value)
              }
              required
            />

            <label>Descrição</label>

            <textarea
              value={descricao}
              onChange={(evento) =>
                setDescricao(evento.target.value)
              }
              rows="5"
              required
            />

            <label>Categoria</label>

            <select
              value={categoria}
              onChange={(evento) =>
                setCategoria(evento.target.value)
              }
              required
            >
              <option value="TI">TI</option>
              <option value="RH">RH</option>
              <option value="Compras">Compras</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Infraestrutura">
                Infraestrutura
              </option>
            </select>

            <div className="acoes-edicao">
              <button
                type="button"
                onClick={() =>
                  navigate(`/solicitacoes/${id}`)
                }
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={salvando}
              >
                {salvando
                  ? "Salvando..."
                  : "Salvar alterações"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

export default EditarSolicitacao;