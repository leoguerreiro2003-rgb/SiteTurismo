async function buscarDados() {
    try {
        const locais = [
            "Beja",
            "Baixo Alentejo",
            "Distrito de Beja",
            "Rio Guadiana",
            "Montado",
        ];
        return await buscarLocais(locais);
    } catch (erro) {
        console.log("Wikipedia indisponível, a usar backup local...");
        const response = await fetch("data/backupdata/backupgeral");
        return await response.json();
    }
}