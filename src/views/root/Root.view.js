import { View } from "backbone.marionette";
import template from "./Root.template.hbs";
import UserList from "../userList/UserList.view";
import ServerDetails from "../userDetails/UserDetails.view";

import userState from "../../channel/user.channel";
import { history } from "backbone";

const RootView = View.extend({
  template,
  className: "container",
  regions: {
    serverList: "#user-list",
    serverDetails: "#user-details",
  },

  initialize() {
    this.listenTo(userState, "change:active", this.renderDetails, this);
  },

  onRender() {
    this.renderList();
    this.renderDetails();
  },

  renderList() {
    this.showChildView(
      "serverList",
      new UserList({
        collection: this.collection,
      })
    );
  },

  renderDetails() {
    const id = userState.get("active");
    const model = this.collection.findById(id);

    if (model !== undefined) {
      this.showChildView(
        "serverDetails",
        new ServerDetails({
          model,
        })
      );
    } else {
      history.navigate("", { trigger: true });
    }
  },
});

export default RootView;
