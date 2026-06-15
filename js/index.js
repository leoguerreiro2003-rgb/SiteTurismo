let btnNext = document.querySelector(".next");
let btnBack = document.querySelector(".back");
let container = document.querySelector(".container");
let list = document.querySelector(".container .list");
let thumb = document.querySelector(".container .thumb");
let dotsContainer = document.querySelector(".dots");


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

function baralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

async function iniciarCarrosselDinamico() {
    try {
        const todosLocais = await buscarDados();

        if (todosLocais.length == 0) {
            console.warn("Nenhum local encontrado.");
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

function moveItemsOnClick(direction) {
    const items = list.querySelectorAll(".list-item");
    const thumbItems = thumb.querySelectorAll(".thumb-item");

    container.classList.add(direction);

    setTimeout(() => {
        if (direction === "next") {
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