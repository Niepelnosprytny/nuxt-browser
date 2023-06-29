import {Hotel} from "../../hotel";
import * as querystring from "querystring";

export default defineEventHandler(async (event) => {
    const form = JSON.parse(
        //@ts-ignore
        querystring.decode(
            //@ts-ignore
            event.node.req.url?.split("?")[1]
        ).form
    );

    try {
        const hotels = await Hotel.find({
            "location.city": `${form.city}`,
            "rooms": {"$elemMatch": {"available": true, "maxGuests": {"$gte": `${form.guests}`}}}
        });
        for (let i = 0; i < hotels.length; i++) {
            hotels[i]["rooms"] = hotels[i]["rooms"].filter(room => room.available == true);
        }
        return hotels;
    } catch (e) {
        console.log(e);
    }
});

