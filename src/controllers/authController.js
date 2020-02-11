import models from '../models';
import {
  hashPassword, generateToken, comparePassword,
  successResponse, errorResponse,
} from '../utils/index';

/**
 * @class AuthController
 * @description Controllers for Users
 * @exports AuthController
 */
export default class AuthController {
  /**
   * @method signUp
   * @description Method for user registration
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async signUp(req, res) {
    try {
      const { email } = req.body;
      const userExits = await models.Users.findOne({ where: { email } });
      if (userExits) {
        return errorResponse(res, 409, 'This email address is already registered');
      }
      req.body.password = await hashPassword(req.body.password);
      const user = await models.Users.create(req.body);
      const response = user.toJSON();
      delete response.password;
      const { id: userId, isAdmin } = user;
      const token = await generateToken({ userId, email, isAdmin });
      response.token = token;
      return successResponse(res, 201, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }

  /**
   * @method login
   * @description Method for user sign in
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await models.Users.findOne({ where: { email } });
      if (!user) {
        return errorResponse(res, 401, 'Invalid email or password');
      }
      const { id: userId, isAdmin } = user;
      const isPasswordValid = await comparePassword(user.password, password);
      if (!isPasswordValid) {
        return errorResponse(res, 401, 'Invalid email or password');
      }
      const response = user.toJSON();
      response.password = undefined;
      const token = await generateToken({ userId, email, isAdmin });
      response.token = token;
      return successResponse(res, 200, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }
}
