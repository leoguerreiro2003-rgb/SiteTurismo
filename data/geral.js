// Obtém os locais da página inicial via api; se falhar, carrega o json de backup.
async function buscarDados() {
    const locais = [
        "Beja",
        "Baixo Alentejo",
        "Distrito de Beja",
        "Rio Guadiana",
        "Montado",
    ];

    try {
        const resultados = await buscarLocais(locais);
        if (resultados.length > 0) return resultados;
    } catch (erro) {
        console.log("Wikipedia indisponível, a usar backup local...");
    }

    const response = await fetch("data/backupdata/backupgeral.json");
    return await response.json();
}
