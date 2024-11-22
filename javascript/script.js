import { conexaoApi} from "./conexaoApi.js";

const listaProdutos = document.querySelector("[data-produtos]");
const formulario = document.querySelector("[data-formulario]");


function criarCard(nome, preco, imagem) {
    const card = document.createElement("li");
    card.className = "produto--item";

    card.innerHTML = `
      <img src="${imagem}" alt="Video game antigo">
      <div class="informacoes__produto">
        <p class="nome__produto" data-nome>${nome}</p>
        <div class="informacoes__produto--info">
          <span class="valor__produto">R$${preco}</span>
          <button data-deletar class="botao__deletar">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    return card;
  }
  
async function adicionarEventoDeletar(card, nome) 
{
    const botaoDeletar = card.querySelector("[data-deletar]");

    botaoDeletar.addEventListener("click", async () => {
      try {
        await conexaoApi.deletarProduto(nome);
        card.remove(); // Remove o card da interface
        alert("Produto deletado com sucesso!");
      } catch (erro) {
        alert("Erro ao deletar o produto: " + erro);
      }

    });
}
  

async function renderizarProdutos() {
  try {
    const produtos = await conexaoApi.listarProdutos();

    produtos.forEach(elemento => {
      const card = criarCard(elemento.nome, elemento.preco, elemento.imagem);
      adicionarEventoDeletar(card, elemento.nome);
      listaProdutos.appendChild(card);
    });
  } catch (erro) {
    listaProdutos.innerHTML = `<h1>Erro ao buscar produtos: ${erro}</h1>`;
  }
}


async function adicionarProduto(evento) {
    evento.preventDefault();
  
    const nome = evento.target.querySelector("[data-nome]").value;
    const preco = evento.target.querySelector("[data-preco]").value;
    const imagem = evento.target.querySelector("[data-imagem]").value;
  
    try {

      await conexaoApi.novoProduto(nome, preco, imagem);
  
      const card = criarCard(nome, preco, imagem);

      adicionarEventoDeletar(card, nome);

      listaProdutos.appendChild(card);

    } 
    catch (erro) 
    {
      alert(erro);
    }
  
    formulario.reset();
  }
  


renderizarProdutos();
formulario.addEventListener("submit", evento => adicionarProduto(evento));
