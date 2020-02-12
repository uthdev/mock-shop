export default (sequelize, DataTypes) => {
  const CartProduct = sequelize.define('CartProducts', {
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {});
  CartProduct.associate = function (models) {
    // associations can be defined here
    CartProduct.belongsTo(models.Carts, { foreignKey: 'cartId' });
    CartProduct.belongsTo(models.Products, { foreignKey: 'productId' });
  };
  return CartProduct;
};
