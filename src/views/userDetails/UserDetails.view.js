import { View } from "backbone.marionette";
import template from "./UserDetails.template.hbs";

const UserDetails = View.extend({
  template,
  className: "user",
  ui: {
    select: "#user_type",
    input: "#user_name",
    form: "form",
  },
  events: {
    "change form": "onChange",
    "submit form": "onSubmit",
  },
  onRender() {
    const type = this.model.getType();
    this.ui.select.find(`option[value="${type}"]`).attr("selected", true);
  },

  onChange(event) {
    this.model.set(event.target.name, event.target.value.trim()).save();
  },

  onSubmit(event) {
    event.preventDefault();
  },
});

export default UserDetails;
