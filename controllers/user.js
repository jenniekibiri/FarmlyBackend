export default class UserController {

    static async getUsers(req,res){
        res.status(200).send('users')
    }
}