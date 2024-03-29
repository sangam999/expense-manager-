import config from "../config/config";
import User from "../interfaces/IUser";
import UserModel from "../model/userModel";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";


export class authService{
    static login = async (email: string,  password: string):Promise<{user: User; token: string}> =>
    {
        try {
            let user = await UserModel.findOne({  email  });
            if(!user || !await bcrypt.compare(password, user.password))
            {
                throw new Error("user not registered")
            }
            const token = this.generateToken(user);
            user = user.toObject();
            Reflect.deleteProperty(user, 'password');
            return {user, token};

        } catch (error) {
            console.log(`Error in Auth Service ${error}`);
            throw error;
            
        }
    }
    private static generateToken = (user: User) :string=> {
        const {JWT_KEY} = config ;
        if (!JWT_KEY) {
            throw new Error("JWT secret key not found in config");
          }
        const payload = {
            email: user.email,
            id: user._id,
          };
          let Token = jwt.sign(payload, JWT_KEY!, {
            expiresIn: "1h",
          });
          return Token;

    }

} 