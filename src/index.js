import { Application } from "backbone.marionette";
import { history } from "backbone";
import RootView from "./views/root/Root.view";
import UserCollection from "./collection/user.collection";
import Router from "./router";

const App = Application.extend({
  region: "#app",

  onStart() {
    const collection = new UserCollection();
    new Router();
    this.showView(new RootView({ collection }));
    history.start();
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.start();
});
