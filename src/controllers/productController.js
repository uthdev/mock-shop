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
      return errorResponse(res, 500, 'Internal Server Error. Please try again');
    }
  }

  /**
    * @method getProducts
    * @description Method to get all product
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {objectt} response object
    */
  static async getProducts(req, res) {
    try {
      const products = await Products.findAll();
      return successResponse(res, 200, products);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error. Please try again');
    }
  }

  /**
    * @method getSingleProduct
    * @description Method to get a single product
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {objectt} response object
    */
  static async getSingleProduct(req, res) {
    const { productId } = req.params;
    try {
      const product = await Products.findByPk(productId);
      if (!product) {
        return errorResponse(res, 404, 'Product not found');
      }
      return successResponse(res, 200, product);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error. Please try again');
    }
  }

  /**
    * @method updateProduct
    * @description Method to update product
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {objectt} response object
    */
  static async updateProduct(req, res) {
    const { productId } = req.params;
    try {
      const productExists = await Products.findByPk(productId);
      if (!productExists) {
        return errorResponse(res, 404, 'Product not found');
      }
      await Products.update(req.body,
        { where: { id: productId } });
      return successResponse(res, 200, { message: 'Product updated', ...req.body });
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error. Please try again');
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
      const productExists = await Products.findOne({
        where: { id: productId }
      });
      if (!productExists) {
        return errorResponse(res, 404, 'Product not found');
      }
      await Products.destroy({ where: { id: productId } });
      const product = productExists.toJSON();
      const response = { message: 'Product deleted', ...product };
      return successResponse(res, 200, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error. Please try again');
    }
  }
}
