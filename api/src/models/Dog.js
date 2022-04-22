const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type : DataTypes.UUID,  // Genera un id random con numeros y letras.
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,      // allowNull false, significa que no debe de estar vacio, requiere un valor
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },


    height:{
      type: DataTypes.JSON,      // almacena datos tipo JSON.
      allowNull: false,
      
    },

    weight:{
      type: DataTypes.JSON,
      allowNull: false,
      
    },

    year: {
      type: DataTypes.STRING,
      allowNull : true
    },

    /* image: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn-prd.content.metamorphosis.com/wp-content/uploads/sites/6/2021/03/baltimore-dog-parks-1.jpg",
      validate:{
        isUrl: true
      }
    }, */

    createDb:{
      type: DataTypes.BOOLEAN,    // Hace el llamado a la base de datos, y omite a la api
      defaultValue: true,  
    },
    },
    {
      timestamps : false
    }
    
    );
};
