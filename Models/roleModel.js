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
        isAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
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
     
      Role.belongsToMany(models.User, { foreignKey: 'userId', as: 'user'});
    };
    return Role;
  };
  