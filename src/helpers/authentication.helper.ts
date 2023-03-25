import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);


// This function is used to create a hash password with salt
const createHashPasswordWithSalt = async  (password: string): Promise<string> => {

    // Generate a random salt
    const salt = randomBytes(8).toString('hex');

    // Hash the password with the salt
    const buf = (await scrypt(password, salt, 64)) as Buffer;

    // Store the hashed password and salt in the database
    return `${buf.toString('hex')}.${salt}`;

}

// compare the password with the hashed password
const comparePassword = async (storedPassword: string, suppliedPassword: string): Promise<boolean> => {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scrypt(suppliedPassword, salt, 64)) as Buffer;
    if (buf.toString('hex') === hashedPassword) {
        return true
    }
    return false
}


export { createHashPasswordWithSalt, comparePassword}
