export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Products', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsToMany(models.Carts, { through: 'CartProducts', foreignKey: 'productId' });
  };
  return Product;
};
