import UserMemberModel from "./../model/usermember";

export class userMemberService {
  static async getUserMember() {
    const userMember = await UserMemberModel.find({});
    return userMember;
  }

  static async findUserMemberById(id: string) {
    const userMember = await UserMemberModel.findById(id);
    return userMember;
  }

  static async findUserMemberByUserId(id: string) {
    const userMember = await UserMemberModel.findOne({ userId: id });
    return userMember;
  }

  static async findApp(id: string) {
    const userMember = await UserMemberModel.findOne({ userId: id });
    return userMember?.wishList;
  }

  static async findAppOnlyAppId(id: string) {
    const userMember = await UserMemberModel.findOne({ userId: id });
    if (userMember) {
      const appIds = userMember.wishList.map((item: any) => item.appId);
      return appIds;
    }
  }

  static async findAppId(id: string, appId: string) {
    const userMember = await UserMemberModel.findOne({ userId: id });
    if (userMember) {
      const appIds = userMember.wishList
        .filter((item: any) => item.appId === Number(appId))
        .map((item: any) => item.appId);
      return appIds;
    }
  }

  static async createUserMember(newUserMember: any) {
    const userMember = await UserMemberModel.create(newUserMember);
    return userMember;
  }

  static async updateUserMember(id: string, newData: any) {
    const userMember = await UserMemberModel.findOneAndUpdate(
      { userId: id },
      newData
    );
    return userMember;
  }

  static async deleteUserMember(id: string) {
    const userMember = await UserMemberModel.findOneAndDelete({ userId: id });
    return userMember;
  }

  static async deleteUserMemberApp(userId: string, appId: string) {
    const userMember = await UserMemberModel.findOneAndUpdate(
      { userId },
      { $pull: { wishList: { appId: appId } } },
      { new: true } // Return the modified document rather than the original
    );
    return userMember;
  }
}

//Test Pull
