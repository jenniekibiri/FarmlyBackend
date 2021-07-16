import { User } from '../models/user.js';
export default class UserController {
//create user
static async createUser (req, res,next) {
  console.log(req.body)
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(403).json({
      error: "email is already taken Login!",
    });
  }

  bcrypt.hash(req.body.password, 10).then((hash) => {
    req.body.password = hash;
    const user = new User(req.body);
    user
      .save()
      .then(() => {
        res.json({
          message: "User added successfully!",
          user,
        });
      })
      .catch((error) => {
        res.json({
          error,
        });
      });
  });
  next()
}

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