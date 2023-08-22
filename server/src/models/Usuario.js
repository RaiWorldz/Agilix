const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
          isEmail: {
            msg: "Email invalido",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dni:{
        type: DataTypes.STRING, 
        allowNull: true,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      rol: {
        type: DataTypes.ENUM('administrador', 'cajero'),
        allowNull: true,
      }
    },
    { timestamps: false, freezeTableName: true }
  );
};
