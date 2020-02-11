import validate from '../utils/validator';

/**
 * @class AccountValidator
 * @description validates User details for account creation
 * @exports AccountValidator
 */
export default class AccountValidator {
  /**
   * @method createAccountValidator
   * @description Method to validates signup details
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async registerValidator(req, res, next) {
    const user = req.body;

    const userProperties = {
      email: 'required|email|max:50',
      password: 'required|string|min:6|max:20',
      firstName: 'required|alpha|min:2|max:50',
      lastName: 'required|alpha|min:2|max:50'
    };
    await validate(res, next, user, userProperties);
  }

  /**
   * @method loginValidator
   * @description Method to validates user login details
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async loginValidator(req, res, next) {
    const user = req.body;

    const userProperties = {
      email: 'required|email|max:50',
      password: 'required|string|min:6|max:20'
    };
    await validate(res, next, user, userProperties);
  }
}
