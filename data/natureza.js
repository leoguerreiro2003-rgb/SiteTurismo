// Obtém os locais de natureza via api; se falhar, carrega o json de backup.
async function buscarDados() {
    const locais = [
        "Pulo do Lobo",
        "Parque Natural do Vale do Guadiana",
        "Barragem do Alqueva",
        "Vila Nova de Milfontes",
        "Rio Guadiana",
        "Minas de Aljustrel"
    ];

    try {
        const resultados = await buscarLocais(locais);
        if (resultados.length > 0) return resultados;
    } catch (erro) {
        console.log("Wikipedia indisponível, a usar backup local...");
    }

    const response = await fetch("data/backupdata/backupnatureza.json");
    return await response.json();
}
