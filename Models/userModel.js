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
        defaultValue: "John",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Doe",
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
    User.hasMany(models.Group, { foreignKey: "groupId"});
    Group.belongsTo(models.User);
    User.hasMany(models.Role, { foreignKey: "roleId"});
    Role.belongsTo(models.User);
  }



  return User;
};

// User.hasMany(Group, { foreignKey: "groupId" });
// Group.belongsTo(User, { foreignKey: "userId" });
// User.hasMany(Role, { foreignKey: "roleId" });
// Role.belongsTo(User, { foreignKey: "userId" });


// module.exports = (sequelize, DataTypes) => {
//     const UserTask = sequelize.define('UserTask', {
//           userId: DataTypes.INTEGER,
//           taskId: DataTypes.INTEGER
//     }, {});
  
//     UserTask.associate = function(models) {
//       UserTask.hasMany(models.Task, {
//           foreignKey : 'id',
//           sourceKey: 'taskId'
//       });
//       UserTask.hasMany(models.User, {
//           foreignKey : 'id',
//           sourceKey: 'userId'
//       })
//     };
//     return UserTask;
//   };