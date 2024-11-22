const BASE_URL = "https://673e6b290118dbfe860b3d6f.mockapi.io/produtos/produtos";

async function listarProdutos() 
{
    try
    {
        const conexao = await fetch(BASE_URL);

        if (!conexao.ok)
        {
            throw new Error('Erro ao buscar produtos');
        }

        const produtos = await conexao.json();

        return produtos;
    }
    catch (erro)
    {
        console.log(erro);
    }
}

async function novoProduto(nome, preco, imagem)
{
    try
    {
        const conexao = await fetch(BASE_URL, {
            method: "POST",
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "nome": nome,
                    "preco": preco,
                    "imagem": imagem
                }
            )
        });

        if (!conexao.ok)
        {
            throw new Error('Erro ao adicionar produto');
        }

        const produto = await conexao.json();

        return produto;
    }
    catch (erro)
    {
        alert(erro);
    }
}

async function deletarProduto(nome)
{
    try
    {
        const produtos = await listarProdutos();
        const produto = produtos.find(produto => produto.nome == nome);

        if (!produto)
        {
            throw new Error('Produto não encontrado');
        }

        const conexao = await fetch(`${BASE_URL}/${produto.id}`, {
            method: "DELETE"
        });

        if (!conexao.ok)
        {
            throw new Error('Erro ao deletar produto');
        }
    }
    catch (erro)
    {
        alert(erro);
    }
}

export const conexaoApi = 
{
    listarProdutos,
    novoProduto,
    deletarProduto
}