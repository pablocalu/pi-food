const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


/* El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterisco deben ser obligatorias):

[ ] Receta con las siguientes propiedades:
ID: *
Nombre *
Resumen del plato *
Nivel de "comida saludable" (health score)
Paso a paso
[ ] Tipo de dieta con las siguientes propiedades:
ID
Nombre */
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false
    },
    healthScore:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull : true
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://cutt.ly/TVPjXfg'
    },
  },
  {
    timestamps: false
  });
};
