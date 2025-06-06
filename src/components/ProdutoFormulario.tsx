// Importa o hook useState para gerenciar estado local no componente
import { useState } from 'react'
// Importa os hooks de mutação e controle de cache do React Query
import { useMutation, useQueryClient } from '@tanstack/react-query'
// Importa a instância do Axios configurada para fazer requisições à API
import { api } from '../service/api'
// Importa o tipo Produto, que representa a estrutura dos dados de produto
import type { Produto } from '../model/Produto'

// Define a interface que especifica que o componente receberá uma função onClose como prop
interface ProdutoFormularioProps {
    onClose: () => void
}

// Componente funcional que recebe onClose como prop
export function ProdutoFormulario({ onClose }: ProdutoFormularioProps) {
    // Hook do React Query que permite invalidar queries e atualizar o cache
    const queryClient = useQueryClient()

    // Define o estado local para armazenar os dados do formulário (exceto o campo 'id')
    const [formData, setFormData] = useState<Omit<Produto, 'id'>>({
        nome: '',          // Nome do produto
        descricao: '',     // Descrição do produto
        preco: 0,          // Preço do produto
        imagem: '',        // URL da imagem do produto
        categoria: '',     // Categoria do produto
        disponibilidade: true,  // Disponibilidade (true = disponível)
    })

    const mutation = useMutation({  //utilizado para atualizar a lista de elementos após criação de novo elemento
        // Função de envio chamada quando o formulário for submetido
        mutationFn: async (novoProduto: Omit<Produto, 'id'>) => {
            const response = await api.post('/produtos', novoProduto) // Envia os dados para o backend
            return response.data // Retorna os dados recebidos de volta da API
        },
        // Quando a requisição for bem-sucedida
        onSuccess: () => {
            // Invalida a query com a chave 'produtos' para atualizar a lista na tela
            queryClient.invalidateQueries({ queryKey: ['produtos'] })
            // Exibe uma mensagem de sucesso
            alert('Produto cadastrado com sucesso!')
            // Fecha o modal chamando a função recebida como prop
            onClose()
        },
        // Se ocorrer erro durante a requisição
        onError: () => {
            // Exibe mensagem de erro
            alert('Erro ao cadastrar produto.')
        },
    })

    // Função chamada sempre que algum campo do formulário for alterado
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target // Extrai o nome do campo e seu valor
        // Atualiza o estado local com os novos dados preenchidos
        setFormData((prev) => ({
            ...prev,       // Mantém os campos anteriores
            [name]: value, // Atualiza apenas o campo alterado
        }))
    }

    // Função chamada ao submeter o formulário
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()           // Evita o recarregamento da página
        mutation.mutate(formData)   // Envia os dados usando a mutação definida
    }


    return (
        <form className="formProduto" onSubmit={handleSubmit} style={{ margin: '20px' }}>
            <h2>Cadastrar Novo Produto</h2>

            <label>Nome</label>
            <input name="nome" placeholder="Nome" value={formData.nome}
                   onChange={handleChange} required/>

            <label>Descrição</label>
            <input name="descricao" placeholder="Descrição" value={formData.descricao}
                   onChange={handleChange} required/>

            <label>Link Imagem</label>
            <input name="imagem" placeholder="URL da Imagem" value={formData.imagem}
                   onChange={handleChange} required/>

            <label>Categoria</label>
            <input name="categoria" placeholder="Categoria" value={formData.categoria}
                   onChange={handleChange} required/>

            <label>Preço</label>
            <input name="preco" type="number" placeholder="Preço" value={formData.preco}
                   onChange={handleChange} required/>

            <br />

            <button type="submit">Cadastrar</button>
        </form>
    )



}
