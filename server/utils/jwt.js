import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET;

/**
 * @class Jwt
 * @description class for token generation and verification
 * @exports Jwt
 */
export default class Jwt {
  /**
   * @method generateToken
   * @description Method to generate new token
   * @param {object} payload - The data used to generate the token
   * @param {string} secret - The secret key used to generate the token
   * @returns {string} the generated token
   */
  static async generateToken(payload, secret = secretKey) {
    const token = await jwt.sign(payload, secret, { expiresIn: '1d' });
    return token;
  }
}
