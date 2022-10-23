const Role = require("./roleModel").Role;

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
      "Role",
      {
        roleId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
              allowNull: false,
            foreignKey: true,
          },
        basic: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,

        },
        admin: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,

        },
        superAdmin: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
      },
      {
        timestamps: true,
      }
    );

    Role.associate = function(models) {
      // associations can be defined here
      Role.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author'
      });
    };


    return Role;
  };
  