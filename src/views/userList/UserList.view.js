import { CollectionView } from "backbone.marionette";
import template from "./UserList.template.hbs";
import ServerView from "../user/User.view";

const ServerList = CollectionView.extend({
  template,
  childViewContainer: "#user-container",
  childView: ServerView,
  collectionEvents: {
    change: "onUpdate",
  },
  onUpdate() {
    this.render();
  },
});

export default ServerList;
