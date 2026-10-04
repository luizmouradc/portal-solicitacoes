import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../servicos/api";
import "./Login.css"

function Login(){
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    async function entrar(evento){
        evento.preventDefault();

        setErro("");

        try{
            const resposta = await api.post("/autenticacao/login", {
                usuario, senha
            });

            localStorage.setItem("token", resposta.data.token);

            localStorage.setItem(
                "usuario",
                JSON.stringify(resposta.data.usuario)
            )

            navigate("/dashboard");
        }catch (erro){
            setErro(
                erro.response?.data?.mensagem || "Erro ao realizar login"
            )
        }
    }

    return(
        <div className="pagina-login">
            <div className="caixa-login">
                <h1>Portal de Solitações</h1>

                <form onSubmit={entrar}>
                    <label htmlFor="">Usuário</label>
                    <input 
                        type="text" 
                        value={usuario}
                        onChange={(evento) => setUsuario(evento.target.value)}
                        placeholder="Digite seu usuário"    
                    />

                    <label>Senha</label>
                    <input 
                        type="password" 
                        value={senha}
                        onChange={(evento) => setSenha(evento.target.value)}
                        placeholder="Digite sua senha"    
                    />

                    {erro && (
                        <p className="mensagem-erro">
                            {erro}
                        </p>
                    )}

                    <button type="submit">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;
