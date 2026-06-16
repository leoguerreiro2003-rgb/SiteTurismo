async function buscarDados() {
    try {
        const locais = [
            "Pulo do Lobo",
            "Parque Natural do Vale do Guadiana",
            "Barragem do Alqueva",
            "Vila Nova de Milfontes",
            "Rio Guadiana",
            "Montado"
        ];
        return await buscarLocais(locais);
    } catch (erro) {

        console.log("Wikipedia indisponível, a usar backup local...");
        const response = await fetch("data/backupdata/backupnatureza");
        return await response.json();
    }
}