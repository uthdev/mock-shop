import { Jwt, errorResponse } from '../utils';

/**
 * @class Authenticate
 * @description authenticate tokens and roles
 * @exports Authenticate
 */
export default class Authenticate {
  /**
   * @method verifyToken
   * @description Method to verify user Bearer token
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {String} response object if authentication fails or next() function when it passes
   */
  static async verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) {
      return errorResponse(res, 401, 'Authorization token required');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return errorResponse(res, 401, 'Authorization token required');
    }
    try {
      const decoded = await Jwt.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return errorResponse(res, 403, `Authorization failed! ${error.message}`);
    }
  }

  /**
   * @method verifyAdmin
   * @description verify if user role is admin
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {String} response object if authentication fails or next() function when it passes
   */
  static async verifyAdmin(req, res, next) {
    const { isAdmin } = req.user;
    if (isAdmin !== true) {
      return errorResponse(res, 403, 'Unauthorized! Accessible to admin only');
    }
    next();
  }
}
