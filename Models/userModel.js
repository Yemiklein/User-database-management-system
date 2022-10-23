const Group = require("./groupModel").Group;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
     
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true, 
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  User.associate = function(models) {
    User.hasMany(models.Role, {
      foreignKey: 'userId',
      as: 'roles',
      onDelete: 'CASCADE',
    });

    User.belongsTo(models.Group, {
      foreignKey: 'userId',
      as: 'groups',
      onDelete: 'CASCADE',
    });
  };
  return User;
};

