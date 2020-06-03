import AppRouter from "marionette.approuter";
import userState from "./channel/user.channel";

const Router = AppRouter.extend({
  appRoutes: {
    "": "showServer",
    "*id": "showServer",
  },

  controller: {
    showServer(id) {
      userState.set("active", id);
    },
  },
});

export default Router;
