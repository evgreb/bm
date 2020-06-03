import { Model } from "backbone";

const User = Model.extend({
  defaults: {
    customer_id: "",
    server_name: "",
    server_type: "",
  },

  getCustomerId() {
    return this.get("customer_id");
  },
  getType() {
    return this.get("server_type");
  },
});

export default User;
