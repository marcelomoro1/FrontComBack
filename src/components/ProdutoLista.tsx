import {useQuery} from "@tanstack/react-query";
import {api} from '../service/api.ts'
import type {Produto} from "../model/Produto";
import "../components/ProdutoLista.css"

export function ProdutoLista() {
    // Hook da biblioteca React Query que busca dados assíncronos e faz o cache automaticamente.
    // Aqui, estamos buscando uma lista de produtos (Produto[]) do backend.
    const { data, isLoading, isError } = useQuery<Produto[]>({
        // Define a chave da query, que é usada para identificar e armazenar os dados no cache.
        queryKey: ['produtos'],
        // Função que será executada para buscar os dados.
        queryFn: async () => {
            // Faz uma requisição GET para a rota '/produtos' do backend.
            const response = await api.get('/produtos')
            // Retorna os dados da resposta, que são do tipo Produto[].
            return response.data
        }
    })

    if (isLoading) {
    return <p>Loading...</p>
    }
    if (isError) {
        return <p>Erro ao carregar os produtos</p>
    }
    return (
        <div>
            <h1 className={"titulo1"}>Produtos</h1>

            {data?.map((produto) => (
                <div key={produto.id}>
                    <h2>{produto.nome}</h2>
                    <img src={produto.imagem} alt={produto.nome} style={{width: '300px'}}/>
                    <p>{produto.descricao}</p>
                    <p>Categoria: {produto.categoria}</p>
                    <p>Preço: R${produto.preco}</p>
                    <p>Disponível: {produto.disponibilidade ? 'Sim' : 'Não'}</p>
                </div>

            ))}


        </div>
    )
}