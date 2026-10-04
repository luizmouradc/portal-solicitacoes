import api from "../servicos/api";
import Cabecalho from "../componentes/Cabecalho";
import "./DetalhesSolicitacao.css"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DetalhesSolicitacao() {
    const [solicitacao, setSolicitacao] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [novoStatus, setNovoStatus] = useState("");

    const navigate = useNavigate();

    // pega ID que ta na url
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

            setSolicitacao(resposta.data.solicitacao);
            setNovoStatus(resposta.data.solicitacao.status);
        } catch (erro) {
            setErro(erro.response?.data?.mensagem || "Não foi possivel carregar a solicitação");
        } finally {
            setCarregando(false);
        }
    }

    async function alterarStatus() {
        try {
            const token = localStorage.getItem("token");

            const resposta = await api.patch(
                `/solicitacoes/${id}/status`,
                {
                    status: novoStatus
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSolicitacao(resposta.data.solicitacao);
        } catch (erro) {
            setErro(
                erro.response?.data?.mensagem || "Não foi possivel alterar o status"
            )
        }
    }

    async function excluirSolicitacao() {
        const confirmar = window.confirm(
            "Deseja realmente excluir esta solicitação?"
        );

        if (!confirmar) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await api.delete(
                `/solicitacoes/${id}`,
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
                "Não foi possível excluir a solicitação."
            );
        }
    }

    return (
        <div className="pagina-detalhes">
            <Cabecalho />

            <main className="conteudo-detalhes">
                <div className="titulo-detalhes">
                    <h2>Detalhes da solicitação</h2>

                    <button onClick={() => navigate("/solicitacoes")}>Voltar</button>
                </div>

                {carregando && (<p>Carregando...</p>)}

                {erro && (
                    <p className="mensagem-erro">
                        {erro}
                    </p>
                )}

                {!carregando && !erro && solicitacao && (
                    <>
                        <div className="dados-solicitacao">

                            <div>
                                <strong>Código</strong>
                                <p>{solicitacao.id}</p>
                            </div>

                            <div>
                                <strong>Título</strong>
                                <p>{solicitacao.titulo}</p>
                            </div>

                            <div>
                                <strong>Descrição</strong>
                                <p>{solicitacao.descricao}</p>
                            </div>

                            <div>
                                <strong>Categoria</strong>
                                <p>{solicitacao.categoria}</p>
                            </div>

                            <div>
                                <strong>Solicitante</strong>
                                <p>{solicitacao.solicitante}</p>
                            </div>

                            <div>
                                <strong>Status</strong>
                                <p>{solicitacao.status}</p>
                            </div>

                            <div>
                                <strong>Data de criação</strong>
                                <p>{solicitacao.data_criacao}</p>
                            </div>

                            <div>
                                <strong>Última atualização</strong>
                                <p>{solicitacao.data_atualizacao}</p>
                            </div>

                        </div>

                        <div className="acoes-solicitacao">

                            {solicitacao.status === "Aberto" && (
                                <button
                                    className="botao-editar"
                                    onClick={() =>
                                        navigate(`/solicitacoes/${id}/editar`)
                                    }
                                >
                                    Editar solicitação
                                </button>
                            )}

                            <div className="alterar-status">
                                <select
                                    value={novoStatus}
                                    onChange={(evento) =>
                                        setNovoStatus(evento.target.value)
                                    }
                                >
                                    <option value="Aberto">
                                        Aberto
                                    </option>

                                    <option value="Em Atendimento">
                                        Em Atendimento
                                    </option>

                                    <option value="Concluído">
                                        Concluído
                                    </option>
                                </select>

                                <button onClick={alterarStatus}>
                                    Alterar status
                                </button>
                            </div>

                            {solicitacao.status === "Aberto" && (
                                <button
                                    className="botao-excluir"
                                    onClick={excluirSolicitacao}
                                >
                                    Excluir solicitação
                                </button>
                            )}

                        </div>
                    </>
                )}
            </main>
        </div>
    )
}

export default DetalhesSolicitacao;
