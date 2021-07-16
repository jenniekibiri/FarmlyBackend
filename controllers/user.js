import { User } from '../models/user.js';
export default class UserController {

    static async getUsers(req,res){
        User.find((err, user) => {
            if (err) {
              return res.status(400).json({ error: err });
            }
            res.json(user );
          }).select("name email created updated");
    }
    static async getUser(req,res){
        res.status(200).send({message:'user'})
    }
}