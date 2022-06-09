module.exports = class Mensajeria{
    constructor(){
        this.mensajes = [];
    }
    obtenerTodos = ()=>{
        return [...this.mensajes];
    }
}


