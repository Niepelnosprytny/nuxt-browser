import {Hotel} from "../../hotel";

export default defineEventHandler(async () => {
    try {
        return Hotel.distinct("location.city");
    } catch (e) {
        console.log(e);
    }
});
