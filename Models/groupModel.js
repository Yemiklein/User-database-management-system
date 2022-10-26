const Role = require("./roleModel").User;

module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define(
      "Group",
      {
        groupId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.STRING,
            allowNull: false,
          foreignKey: true,
        },
        groupName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,

        },
        groupDescription: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        timestamps: true,
      }
    );
    Group.associate = function(models) {
      Group.hasMany(models.Role, {foreignKey: 'groupId', as: 'member', onDelete: 'CASCADE'});;
    Role.belongsTo(models.Group, {foreignKey: 'groupId', as: 'group'});
    };
    return Group;
  };
  