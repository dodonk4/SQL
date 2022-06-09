
const prods = productos;


async function main(){
    const response = await fetch('inicio.handlebars');
    const texto = await response.text();
    const template = Handlebars.compile(texto);
    const html = template({ titulo: `${prods[1].title}`, titulo2: 'Precio', productos});
    document.getElementById('elemento-uno').innerHTML = html;
}
main();