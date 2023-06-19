import {Nitro} from 'nitropack';
import * as mongoose from "mongoose";

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();

  try {
    await mongoose.connect(config.mongodbUri);
    console.log("Co za gówno");
  } catch (e) {
    console.error(e);
  }
};
