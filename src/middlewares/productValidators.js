import validate from '../utils/validator';

/**
 * @class ProductValidator
 * @description validates Product details
 * @exports ProductValidator
 */
export default class ProductValidator {
  /**
   * @method addProductValidator
   * @description Method to validates new product details
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async addProductValidator(req, res, next) {
    const booking = req.body;

    const productProperties = {
      name: 'required|string|min:2|max:50',
      description: 'required|string|min:2',
      category: 'required|string|min:2|max:50',
      price: 'required|numeric|min:0',
      imageUrl: 'required|string',
      inStock: 'required|boolean'
    };
    await validate(res, next, booking, productProperties);
  }
}
