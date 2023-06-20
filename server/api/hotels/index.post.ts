import {Hotel} from "./index.get";

export default defineEventHandler(async () => {
    try {
        return Hotel.find();
    } catch (e) {
        console.log(e);
    }
});
