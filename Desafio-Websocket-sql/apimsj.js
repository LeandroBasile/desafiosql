const createMsjTable = require('./src/create_msj_table')


class MsjClass {
  constructor(config, table) {
    this.config = config
    this.table = table;
  }

  // Guardar mensaje

  async save(message) {
    
    try {
      await this.config(`${this.table}`).insert(message);
      console.log(message)
    } catch (error) {
      if (error.code == "ER_NO_SUCH_TABLE") {
        createMsjTable();
      } else {
        console.log(
          `Error: ${error}`
        );
      }
    }
  }

  //Obtener mensajes

  async getAll() {
    
    try{
      const allMesages = await this.config.from(this.table).select("*");
      
      console.log(allMesages)
    return allMesages;

  } catch (error) {
     if(error.code == "SQLITE_ERROR"){
      createMsjTable()
    }else{
      console.log(
        `Error aca: ${error.code}`
      );
    }
  }
  }
}

module.exports = MsjClass;