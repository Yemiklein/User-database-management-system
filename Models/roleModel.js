const Group = require("./groupModel").Group;

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
    },
        isSuperAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        timestamps: true,
      }
    );

    Role.associate = function(models) {
      Role.belongsTo(models.Group, {foreignKey: 'groupId', as: 'group', onDelete: 'CASCADE'});
 Group.hasMany(models.Role, {foreignKey: 'groupId', as: 'member', onDelete: 'CASCADE'});
    };
    return Role;
  };
  