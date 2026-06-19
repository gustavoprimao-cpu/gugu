// Espera o DOM carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. Dados de Exemplo (Simulando uma API)
    // ==========================================
    const projetos = [
        { id: 1, titulo: "Projeto Alpha", categoria: "minimalismo", desc: "Minimalismo levado ao extremo.", img: "alpha.jpg" },
        { id: 2, titulo: "Projeto Beta", categoria: "cyberpunk", desc: "Cores vibrantes e caos organizado.", img: "beta.jpg" },
        { id: 3, titulo: "Projeto Gamma", categoria: "arte", desc: "A fusão entre tecnologia e arte.", img: "gamma.jpg" },
        { id: 4, titulo: "Projeto Delta", categoria: "minimalismo", desc: "Design limpo focado em tipografia.", img: "delta.jpg" },
        { id: 5, titulo: "Projeto Epsilon", categoria: "cyberpunk", desc: "Interfaces imersivas e neon.", img: "epsilon.jpg" }
    ];

    // ==========================================
    // 2. Seleção de Elementos do DOM
    // ==========================================
    const inputBusca = document.querySelector("#search-input");
    const botoesFiltro = document.querySelectorAll(".filter-btn");
    const containerProjetos = document.querySelector(".horizontal-scroll-wrapper");

    // Estado da aplicação (o que está ativo no momento)
    let filtroAtual = "todos";
    let termoBusca = "";

    // ==========================================
    // 3. Função de Renderização
    // ==========================================
    function renderizarProjetos(listaProjetos) {
        // Limpa o container antes de renderizar
        containerProjetos.innerHTML = "";

        if (listaProjetos.length === 0) {
            containerProjetos.innerHTML = `<p class="no-results">Nenhum projeto encontrado para essa busca.</p>`;
            return;
        }

        // Cria o HTML para cada projeto filtrado
        listaProjetos.forEach(projeto => {
            const card = document.createElement("article");
            card.classList.add("project-card");
            card.setAttribute("data-categoria", projeto.categoria);

            card.innerHTML = `
                <h3>${projeto.titulo}</h3>
                <span class="badge">${projeto.categoria}</span>
                <p>${projeto.desc}</p>
            `;
            
            containerProjetos.appendChild(card);
        });
    }

    // ==========================================
    // 4. Lógica de Filtragem Combinada
    // ==========================================
    function filtrarProjetos() {
        const projetosFiltrados = projetos.filter(projeto => {
            // Verifica se bate com a categoria selecionada
            const bateCategoria = filtroAtual === "todos" || projeto.categoria === filtroAtual;
            
            // Verifica se o título ou descrição contém o termo buscado
            const bateBusca = projeto.titulo.toLowerCase().includes(termoBusca) || 
                              projeto.desc.toLowerCase().includes(termoBusca);

            return bateCategoria && bateBusca;
        });

        renderizarProjetos(projetosFiltrados);
    }

    // ==========================================
    // 5. Ouvintes de Eventos (Event Listeners)
    // ==========================================

    // Evento de Digitação na Barra de Busca (com uma pequena otimização)
    inputBusca.addEventListener("input", (e) => {
        termoBusca = e.target.value.toLowerCase().trim();
        filtrarProjetos();
    });

    // Evento de Clique nos Botões de Filtro
    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", (e) => {
            // Remove classe ativa do botão anterior e adiciona no atual
            document.querySelector(".filter-btn.active")?.classList.remove("active");
            e.target.classList.add("active");

            // Atualiza o estado do filtro e executa a função
            filtroAtual = e.target.getAttribute("data-filter");
            filtrarProjetos();
        });
    });

    // ==========================================
    // 6. Inicialização
    // ==========================================
    // Renderiza todos os projetos ao carregar a página pela primeira vez
    renderizarProjetos(projetos);
});
