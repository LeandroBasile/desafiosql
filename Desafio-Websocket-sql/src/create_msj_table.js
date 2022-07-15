const dbsqlite = require('./databasesqlite')

const createMsjTable = async () => {
    try {
        
        // await database.schema.dropTableIfExists('msj')
        
        await dbsqlite.schema.createTable("msj", msjTable => {
            msjTable.string('email', 500).notNullable()
            msjTable.string('mensaje', 500).notNullable()
            msjTable.string('fecha',100).notNullable()
            msjTable.string('hora',50).notNullable()

        })
        console.log('Tabla creada')

        dbsqlite.destroy()
        

    } catch(err) {
        console.log('error code: ',err)
        dbsqlite.destroy()
    }
}





module.exports = createMsjTable