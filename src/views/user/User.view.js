import { View } from "backbone.marionette";
import template from "./User.template.hbs";

const ServerView = View.extend({
  tagName: "li",
  template,
});

export default ServerView;
