async function buscarDados() {
    const locais = [
        "Pulo do Lobo",
        "Parque Natural do Vale do Guadiana",
        "Barragem do Alqueva",
        "Vila Nova de Milfontes",
        "Rio Guadiana",
        "Montado",
    ];
    return await buscarLocais(locais);
}