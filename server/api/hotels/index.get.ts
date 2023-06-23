import {Hotel} from "../../hotel";

export default defineEventHandler(async () => {
    try {
        return Hotel.find();
    } catch (e) {
        console.log(e);
    }
});

