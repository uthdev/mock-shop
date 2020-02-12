import models from '../models';
import { successResponse, errorResponse } from '../utils';

const { Carts, Products } = models;

const association = [
  {
    model: Products,
    through: 'CartProducts',
    attributes: ['name', 'description', 'category', 'price', 'imageUrl', 'inStock']
  }
];


/**
 * @class CartController
 * @description Controllers for handling cart operations
 * @exports CartController
 */
export default class CartController {
  /**
   * @method addToCart
   * @description Method to add a product to Cart
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object}  response object
   */
  static async addToCart(req, res) {
    const { user: { userId }, body: { productId } } = req;
    try {
      const product = await Products.findByPk(productId);
      if (!product) {
        return errorResponse(res, 404, 'Product not found');
      }
      if (!product.inStock) {
        return errorResponse(res, 403, 'Product Out of Stock');
      }
      const cart = await Carts.create({ productId, userId });
      return successResponse(res, 201, cart);
      // const response = product.toJSON();
      // return successResponse(res, 201, { message: 'Product added to Cart', ...response });
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }

  /**
   * @method getCart
   * @description Method to get Cart
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object}  response object
   */
  static async getCart(req, res) {
    const { userId } = req.user;
    try {
      const cart = await Carts.findAll({
        where: { userId },
        include: association
      });
      return successResponse(res, 200, cart);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }
}
