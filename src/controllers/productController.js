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
}
