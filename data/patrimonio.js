async function buscarDados() {
    const locais = [
        "Cante alentejano",
        "Gastronomia alentejana",
        "Artesanato alentejano",
        "Feira de Castro Verde",
        "Montado",
        "Cortiça"
    ];
    return await buscarLocais(locais);
}
