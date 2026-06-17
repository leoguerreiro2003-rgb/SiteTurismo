// Obtém as atrações via api; se falhar, carrega o json de backup.
async function buscarDados() {
    const locais = [
        "Castelo de Beja",
        "Museu Rainha Dona Leonor",
        "Sé de Beja",
        "Feira de Castro"
    ];

    try {
        const resultados = await buscarLocais(locais);
        if (resultados.length > 0) return resultados;
    } catch (erro) {
        console.log("Wikipedia indisponível, a usar backup local...");
    }

    const response = await fetch("data/backupdata/backuatracoes.json");
    return await response.json();
}
