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
      validate : {
        is : /^[a-z]+$i/,    // Expresion regular, acepta nombre y apellido
        notNull: { msg : "Must not be null"}, // No puede estar vacia esta columna en cada instancia
        notEmpty: true                        // No permite strings vacios.
      }
    },


    height:{
      type: DataTypes.JSON,      // almacena datos tipo JSON.
      allowNull: false,
      validate: {
        notNull: {msg : "Must not be null"}
      }
    },

    weight:{
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notNull: {msg : "Must not be null"}
      }
    },

    year: {
      type: DataTypes.STRING,
      validate: {
        is: /^([a-zA-Z0-9 ]+)$/,
      },
    },

    image: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn-prd.content.metamorphosis.com/wp-content/uploads/sites/6/2021/03/baltimore-dog-parks-1.jpg",
      validate:{
        isUrl: true
      }
    },

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
