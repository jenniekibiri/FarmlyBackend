export default class UserController {

    static async getUsers(req,res){
        res.status(200).send({message:'users'})
    }
    static async getUser(req,res){
        res.status(200).send({message:'user'})
    }
}