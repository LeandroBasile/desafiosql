const createProductTable = require("./src/create_prod_table");

class ProductClass {
  constructor(config, table) {
    this.config = config
    this.table = table;
    
  }
  // Guardar producto

  async save(product) {
    // console.log(product)
    try {
      await this.config(this.table).insert(product);

      console.log("Producto agregado");

      
    } catch (error) {
      if (error.code == "ER_NO_SUCH_TABLE") {
        createProductTable();
      } else {
        console.log(
          `Error: ${error}`
        );
      }
    }
  }
  
  //Obtener productos

  async getAll() {

    try{
    const productsFromDB = await this.config.from(this.table).select("*");
    
    return productsFromDB;
  } catch (error) {
    if (error.code == "ER_NO_SUCH_TABLE") {
      createProductTable();
    } else {
      console.log(
        `Error: ${error}`
      );
    }
  }
  }

  // Eliminar producto

  async delete(id) {
    try {
      await this.config.from(`${this.table}`).where("id", "=", id).del();
    } catch (e) {
      console.log(e);
    }
  }
}



module.exports = ProductClass;
