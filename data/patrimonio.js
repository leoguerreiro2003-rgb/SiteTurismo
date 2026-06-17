// Obtém o património via api; se falhar, carrega o json de backup.
async function buscarDados() {
    const locais = [
        "Cante alentejano",
        "Cortiça",
        "Capote Alentejano"
    ];

    try {
        const resultados = await buscarLocais(locais);
        if (resultados.length > 0) return resultados;
    } catch (erro) {
        console.log("Wikipedia indisponível, a usar backup local...");
    }

    const response = await fetch("data/backupdata/backuppatrimonio.json");
    return await response.json();
}
