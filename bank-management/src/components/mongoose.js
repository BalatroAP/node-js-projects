import mongoose from "mongoose";
import config from "../../../private.json" with { type: "json" };

export default class MyComponent extends React.Component {
  componentDidMount() {
    mongoose.connect(config.uri, {
      dbName: "bank-system",
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      console.log("Connected to MongoDB!");
    });
  }
}
