let btnNext = document.querySelector(".next");
let btnBack = document.querySelector(".back");
let container = document.querySelector(".container");
let list = document.querySelector(".container .list");
let thumb = document.querySelector(".container .thumb");
let dotsContainer = document.querySelector(".dots");


// Popup de boas-vindas: mostra na primeira visita e guarda o estado em localStorage.
const btnFechar = document.getElementById("btnFechar");
if (btnFechar) {

    if (!localStorage.getItem("popupVisto")) {
        document.getElementById("popup").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    } else {
        document.getElementById("popup").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }

    btnFechar.addEventListener("click", () => {
        document.getElementById("popup").style.display = "none";
        document.getElementById("overlay").style.display = "none";
        localStorage.setItem("popupVisto", "true");
    });
}



// Baralha o conteúdo recebido 
function baralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Obtém os dados (API ou JSON via buscarDados), baralha a lista e cria os slides do carrossel.
async function iniciarCarrosselDinamico() {
    try {
        const todosLocais = (await buscarDados()).filter(local => local.image);

        if (todosLocais.length == 0) {
            console.log("Nenhum local encontrado na API nem no backup local.");
            return;
        }

        list.innerHTML = "";
        thumb.innerHTML = "";
        dotsContainer.innerHTML = "";

        const locaisSelecionados = baralhar(todosLocais).slice(0, 6);

        locaisSelecionados.forEach((local, i) => {
            const titulo = local.name;
            const descricao = local.description;
            const imagemURL = local.image;
            const link = local.link;

            // Slide principal
            const listItem = document.createElement("div");
            listItem.className = "list-item";
            listItem.innerHTML = `
                <figure>
                    <img src="${imagemURL}" alt="${titulo}">
                    <figcaption class="content">
                        <h2 class="title">${titulo}</h2>
                        <p class="description">${descricao}</p>
                        <div>
                            <button class="btn-saber-mais" onclick="window.open('${link}', '_blank')">Saber Mais</button>
                        </div>
                    </figcaption>
                </figure>
            `;
            list.appendChild(listItem);

            // Miniatura
            const thumbItem = document.createElement("div");
            thumbItem.className = "thumb-item";
            thumbItem.innerHTML = `
                <figure>
                    <img src="${imagemURL}" alt="">
                    <figcaption class="content">
                        <h3>${titulo.split(" ").slice(0, 2).join(" ")}</h3>
                    </figcaption>
                </figure>
            `;
            thumb.appendChild(thumbItem);

        });

        atualizarFundos();
        configurarCliques();

    } catch (erro) {
        console.error("Erro ao carregar locais:", erro);
    }
}

// Define a imagem de fundo de cada slide após o carregamento da imagem.
function atualizarFundos() {
    document.querySelectorAll(".list-item").forEach(item => {
        const img = item.querySelector("img");
        if (img) {
            img.onload = () => item.style.setProperty("--bg", `url('${img.src}')`);
            img.onerror = () => console.warn("Imagem não carregou:", img.src);
        }
    });
}

function configurarCliques() {
    btnNext.onclick = () => moveItemsOnClick("next");
    btnBack.onclick = () => moveItemsOnClick("back");
}

// Navega o carrossel para a frente ou para trás com animação css.
function moveItemsOnClick(direction) {
    const items = list.querySelectorAll(".list-item");
    const thumbItems = thumb.querySelectorAll(".thumb-item");

    container.classList.add(direction);

    setTimeout(() => {
        if (direction == "next") {
            list.appendChild(items[0]);
            thumb.appendChild(thumbItems[0]);
        } else {
            list.insertBefore(items[items.length - 1], items[0]);
            thumb.insertBefore(thumbItems[thumbItems.length - 1], thumbItems[0]);
        }
        container.classList.remove(direction);
    }, 500);
}

iniciarCarrosselDinamico();