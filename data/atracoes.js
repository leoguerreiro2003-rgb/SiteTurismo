async function buscarDados() {
    const locais = [
        "Castelo de Beja",
        "Museu Rainha Dona Leonor",
        "Sé de Beja",
        "Alcáçova de Beja",
        "Vila Romana de Pisões",
        "Núcleo Museológico da Água"
    ];
       return await buscarLocais(locais);
}