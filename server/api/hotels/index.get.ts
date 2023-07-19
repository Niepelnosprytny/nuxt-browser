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
        let hotels = await Hotel.find({
            "location.city": `${form.city}`,
            "rooms": {$elemMatch: {"available": true, "maxGuests": {$gte: `${form.guests}`}}},
            "stars": {$gte: form.stars},
            "reviewsScore": {$gte: form.minReviewsScore}
        });

        for (let i = 0; i < hotels.length; i++) {
            hotels[i]["rooms"] = hotels[i]["rooms"].filter(room => room.available == true);
        }

        if(form.parking) {
            hotels = hotels.filter(hotel => hotel.metadata?.parking === true);
        }

        if(form.breakfast) {
            for (let i = 0; i < hotels.length; i++) {
                hotels[i]["rooms"] = hotels[i]["rooms"].filter(room => room.breakfast == true);
            }
        }

        return hotels;
    } catch (e) {
        console.log(e);
    }z
});

