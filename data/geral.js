async function buscarDados() {
    const locais = [
        "Beja",
        "Baixo Alentejo",
        "Distrito de Beja",
        "Rio Guadiana",
        "Montado",
        "Barragem do Alqueva"

    ];
    return await buscarLocais(locais);
}