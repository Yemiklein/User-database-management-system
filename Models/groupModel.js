const User = require("./userModel").User;

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
        peer: {
          type: DataTypes.STRING,
            allowNull: true,
          unique: true,
         
        },
        mavericks: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,

        },
        squad: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
      },
      {
        timestamps: true,
      }
    );
    Group.associate = function(models) {
      Group.hasMany(models.User, {
        foreignKey: 'groupId',
        as: 'member',
        onDelete: 'CASCADE',
      });
    };
    return Group;
  };
  