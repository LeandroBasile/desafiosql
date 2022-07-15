const dbconnection = require('./database')




const createProductTable = async () => {
    try {
        
        await database.schema.dropTableIfExists('products')
        
        await dbconnection.schema.createTable('products', prodTable => {
            prodTable.increments('id').primary()
            prodTable.string('title', 50).notNullable()
            prodTable.string('thumbnail', 500).notNullable()
            prodTable.integer('price').notNullable()
        })
        console.log('Tabla creada')

        dbconnection.destroy()
        

    } catch(err) {
        console.log('error code: ',err)
        dbconnection.destroy()
    }
}





module.exports = createProductTable