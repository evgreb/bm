import { LocalStorage } from "backbone.localstorage";
import { Collection } from "backbone";
import User from "../model/user.model";

const UserCollection = Collection.extend({
  model: User,
  localStorage: new LocalStorage("servers"),

  initialize() {
    this.fetch().then(() => {
      if (this.length === 0) {
        this.reset([
          { customer_id: "user1", server_name: "server7", server_type: "vds" },
          {
            customer_id: "user5",
            server_name: "server2",
            server_type: "dedicated",
          },
          {
            customer_id: "user3",
            server_name: "server4",
            server_type: "hosting",
          },
        ]);
        this.models.forEach((model) => model.save());
      }
    });
  },

  findById(id) {
    return this.find((model) => model.getCustomerId() === id);
  },
});

export default UserCollection;
