const Role = require("./roleModel").Role;

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
      "Role",
      {
       id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          autoIncrement: true,
        },
        groupId: {
            type: DataTypes.STRING,
              allowNull: false,
            foreignKey: true,
          },
        roleName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        roleDescription: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
    },
        isSuperAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          unique: true,
        },
      },
      {
        timestamps: true,
      }
    );

    Role.associate = function(models) {
     
      Role.hasMany(models.User, { foreignKey: 'userId', as: 'user'});
    };
    return Role;
  };
  