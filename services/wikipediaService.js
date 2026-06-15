async function buscarLocais(locais) {
    const resultados = [];

    for (const local of locais) {
        const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(local)}`;
        const resposta = await fetch(url);

        if (!resposta.ok) continue;

        const dados = await resposta.json();

        if (!dados.thumbnail?.source) continue;

        resultados.push({
            name: dados.title,
            description: dados.extract ? dados.extract.split(".")[0] + "." : "Sem descrição disponível.",
            image: dados.thumbnail?.source,
            link: dados.content_urls?.desktop?.page || "#"
        });
    }

    return resultados;
}