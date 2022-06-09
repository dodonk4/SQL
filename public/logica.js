const socket = io();

const butto = document.getElementById('btn');
const divo = document.getElementById('ulo');
butto.addEventListener('click', event =>{
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const Product = {"title": title, "price": price, "id": `${Date.now()}`, "thumbnail": thumbnail}
    socket.emit('prod', {title, price, thumbnail});
    
})

socket.on('prod', function(data){
    const newProduct = document.createElement('li');
    newProduct.innerHTML = `${data.title} $${data.price} <img src=${data.thumbnail} width="70" height="70">`;
    divo.append(newProduct);
})