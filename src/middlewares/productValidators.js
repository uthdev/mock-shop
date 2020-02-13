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
    const product = req.body;

    const productSchema = {
      name: 'required|string|min:2|max:50',
      description: 'required|string|min:2',
      category: 'required|string|min:2|max:50',
      price: 'required|numeric|min:0',
      imageUrl: 'required|string',
      inStock: 'required|boolean'
    };
    await validate(res, next, product, productSchema);
  }

  /**
   * @method productIdValidator
   * @description Method to validates product Id request params
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async productIdValidator(req, res, next) {
    const { params: { productId: paramsId } } = req;
    
    const productId = paramsId ? req.params : req.body;

    const productIdSchema = {
      productId: 'required|integer|min:1|max:10000'
    };
    await validate(res, next, productId, productIdSchema);
  }

  /**
   * @method cartIdValidator
   * @description Method to validates cart Id request params
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async cartIdValidator(req, res, next) {
    const cartId = req.params;
    const cartIdSchema = {
      cartId: 'required|integer|min:1|max:10000'
    };
    await validate(res, next, cartId, cartIdSchema);
  }
}
