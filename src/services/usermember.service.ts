import  UserMemberModel  from './../model/usermember';

export class userMemberService{
    static async getUserMember() {
        const userMember = await UserMemberModel.find({});
        return userMember;
    }

    static async findUserMemberById(id: string){
        const userMember = await UserMemberModel.findById(id);
        return userMember;
    }

    static async findUserMemberByUserId(id:string){
        const userMember = await UserMemberModel.findOne({ userId: id });
        return userMember;
    }

    static async createUserMember(newUserMember:any){
        const userMember = await UserMemberModel.create(newUserMember);
        return userMember;
    }

    static async updateUserMember(id:string,newData:any){
        const userMember = await UserMemberModel.findOneAndUpdate({userId:id},newData);
        return userMember;
    }

    static async deleteUserMember(id:string){
        const userMember = await UserMemberModel.findOneAndDelete({userId:id})
        return userMember;
    }
}