import { channel } from "backbone.radio";
import UserState from "../model/userState.model";

const state = new UserState();

const userChannel = channel("user");
userChannel.reply("userState", function () {
  return state;
});

const userState = userChannel.request("userState");
export default userState;
