module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define(
      "Group",
      {
        groupId: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.STRING,
            allowNull: false,
          primaryKey: true,
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
    return Group;
  };
  