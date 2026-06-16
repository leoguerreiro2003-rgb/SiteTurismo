async function buscarDados() {
    try {
        const locais = [
            "Castelo de Beja",
            "Museu Rainha Dona Leonor",
            "Sé de Beja",
            "Alcáçova de Beja",
            "Vila Romana de Pisões",
            "Núcleo Museológico da Água"
        ];
        return await buscarLocais(locais);
    } catch (erro) {
        console.log("Wikipedia indisponível, a usar backup local...");
        const response = await fetch("data/backupdata/backupatracoes.json");
        return await response.json();
    }
}