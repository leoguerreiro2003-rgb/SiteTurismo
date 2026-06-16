async function buscarDados() {
    try {
        const locais = [
            "Cante alentejano",
            "Cortiça",
            "Capote Alentejano"
        ];
        return await buscarLocais(locais);

    } catch (erro) {
        console.log("Wikipedia indisponível, a usar backup local...");
        const response = await fetch("data/backupdata/backuppatrimonio");
        return await response.json();
    }
}
