import models from '../models';
import { successResponse, errorResponse } from '../utils';

const { Products } = models;

/**
 * @class ProductController
 * @description Controllers for handling Product requests
 * @exports ProductController
 */
export default class ProductController {
  /**
   * @method createProduct
   * @description Method to add a new product
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object}  response object
   */
  static async createProduct(req, res) {
    try {
      const result = await Products.create(req.body);
      return successResponse(res, 201, result);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }

  
  /**
    * @method deleteProduct
    * @description Method to delete product
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {objectt} response object
    */
  static async deleteProduct(req, res) {
    const { productId } = req.params;
    try {
      const productExist = await Products.findOne({
        where: { id: productId }
      });
      if (!productExist) {
        return errorResponse(res, 404, 'Product not found');
      }
      await Products.destroy({ where: { id: productId } });
      const product = productExist.toJSON();
      const response = { message: 'Product deleted', ...product };
      return successResponse(res, 200, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }
}
