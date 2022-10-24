
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
        allowNull: false,
        validate: {
          notNull: {
            msg: "first name is required",
          },
          notEmpty: {
            msg: "Please provide a first name",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "last name is required",
          },
          notEmpty: {
            msg: "Please provide a last name",
          },
        },
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username is required",
          },
          notEmpty: {
            msg: "Please provide a username",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "email is required",
          },
          isEmail: {
            msg: "Please provide a a valid Email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is required",
          },
          notEmpty: {
            msg: "Please provide a password",
          },
        },
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        autoIncrement: true,

   
      },
        
      },

    {
      timestamps: true,
    }
  );

  User.associate = function (models) {
    User.belongsTo(models.Group, {
      foreignKey: "groupId",
      as: "groups",
      onDelete: "CASCADE",
    });

    User.belongsTo(models.Group, {foreignKey: "userId", as: "groups", onDelete: "CASCADE" });
    User.belongsToMany(models.Group, {through: 'Role', foreignKey: 'userId', as: 'user'})

  };
  return User;
};
