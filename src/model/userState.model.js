import { Model } from "backbone";

const UserState = Model.extend({
  defaults: {
    active: undefined,
  },
});

export default UserState;
