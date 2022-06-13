const {options2} = require('./knexConfig');

module.exports = class Mensajeria{
    constructor(){
        let date1 = new Date();
        let date = date1.toISOString().split('T')[0];
        this.mensajes = [{
            email: 'ejemplo1@hotmail.com',
            date: `${date}`,
            msssj: 'Texto de ejemplo 1'
        },
        {
            email: 'ejemplo2@gmail.com',
            date: `${date}`,
            msssj: 'Texto de ejemplo 2'
        }];
        this.knex = require('knex')(options2);
        

    }
    async obtenerTodos (){
        try {
            return await this.knex('mensajes')
            .select({
            email: 'email',
            date: 'date',
            msssj: 'msssj'
      })
      .then((mensajes) => {
        console.log('obtenerTodos funciona')
        return mensajes;
      })
        } catch (error) {
            console.log(`fallo la operacion insertarMensajes: ${error.message}`)
        }
    }
    async insertarMensajesIndividuales(data){
        try {
            await this.knex.insert(data).into('mensajes')
            .then(()=> console.log('ok'));
        } catch (error) {
            console.log(`fallo la operacion insertarMensajes: ${error.message}`)
        }     
    }
    async insertarMensajes(){
        try {
            await this.knex.insert(this.mensajes).into('mensajes')
            .then(()=> console.log('ok'));
        } catch (error) {
            console.log(`fallo la operacion insertarMensajes: ${error.message}`)
        }     
    }

    async crearTabla() {
        try {
            const exists = await this.knex.schema.hasTable('mensajes')
            if (!exists) {
                await this.knex.schema.createTable('mensajes', tabla => {
                        tabla.string('email'),
                        tabla.string('date'),
                        tabla.string('msssj')
                })
                console.log('tabla "mensajes" creada!')
            } else {
                console.log('la tabla "mensajes" ya existe. no se realizaron cambios.')
            }
        } catch (error) {
            console.log(`fallo la operacion: ${error.message}`)
        }
    }
}


