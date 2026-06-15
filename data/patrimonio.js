async function buscarDados() {
    const locais = [
        "Cante alentejano",
        "Gastronomia alentejana",
        "Cortiça",
        "Gastronimia Alentejana",
        "",
        "Barragem do Alqueva"
    ];
    return await buscarLocais(locais);
}
