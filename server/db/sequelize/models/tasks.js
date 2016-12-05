export default (sequelize, DataTypes) =>
  sequelize.define('Task', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    text: DataTypes.STRING,
    count: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    updating: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false
  });
