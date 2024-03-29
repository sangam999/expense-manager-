import User from '../interfaces/IUser';
import userModel from '../model/userModel';
import bcrypt from "bcrypt"
import { userResponse } from '../response/userResponse';
class createUserService{
    public static transformUserResponse(user: User): userResponse {
        return new userResponse(user.username, user.email);
    }
     async createUser(userdata: User){
        const {username, email , password} = userdata;
        const  existingUser = await userModel.findOne({ $or:[{username},{email}]});
        if (existingUser) {
            throw new Error('user already exist');
        }
        let hashedPassword ;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch (error) {
            console.error(error)
            throw new Error('Failed to hash password')
        }
        const newUser = new userModel({ username, email , password: hashedPassword });
        await newUser.save();
        return newUser;
    }
}
export default createUserService;
//const createuser = async (req: Request, res: Response) => {

    //try {

        //const {username , email} = req.body;

       // if(!username || !email){
       //     console.log("all fields are required")
         //   res.json({
          //      message : "pls enter username and email"
          //  })
         //   return 
      //  }
        // Create a new user
     //   const newUser = new userModel({
        //  username: username,
         // email: email,
      //  });
        // Save the user
      //  const savedUser = await newUser.save();
       // res.json(savedUser)


    //} catch (error: unknown) {
        //console.error(error);
       // res.status(500).json({ message: 'Internal server error' });
     // }
  
  //};
  
//export default createuser; 