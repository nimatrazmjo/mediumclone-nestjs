import { sign, verify } from 'jsonwebtoken';
import { IPayload } from '../types/payload.interface';

/**
 * @class JwtHelper
 * @description Helper class for JWT
 * @exports JwtHelper
 * @version 1.0.0
 *
 */
export default class JwtHelper {
    /**
     * @method verifyToken
     * @description Verifies a token
     * @param {string} token
     * @returns {Promise<any>}
     * @memberof JwtHelper
     * @version 1.0.0
     * @static
     * @async
     * @public
     * @example
     * const decoded = await JwtHelper.verifyToken(token);
     * console.log(decoded);
     **/
    public static verifyToken(token: string): IPayload {
        try {
        const decoded = verify(token, process.env.JWT_SECRET || 'abc123');
        return decoded;
        } catch (error) {
        throw new Error(error);
        }
    }

    /**
     * @method generateToken
     * @description Generates a token
     * @param {IPayload} payload
     * @returns {Promise<string>}
     * @memberof JwtHelper
     * @version 1.0.0
     * @static
     * @async
     * @public
     * @example
     * const token = await JwtHelper.generateToken(payload);
     * console.log(token);
     **/
    public static async generateToken(payload: IPayload): Promise<string> {
        try {
        const token = await sign(payload, process.env.JWT_SECRET || 'abc123', { expiresIn: '1h' });
        return token;
        } catch (error) {
        throw new Error(error);
        }
    }
}