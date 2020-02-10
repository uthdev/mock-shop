export default (sequelize, DataTypes) => {
  const Cart = sequelize.define('Carts', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      unique: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {});
  Cart.associate = function (models) {
    // associations can be defined here
    Cart.belongsTo(models.Users, { as: 'theUser', foreignKey: 'userId' });
  };
  return Cart;
};
