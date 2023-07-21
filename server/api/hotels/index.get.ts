import {Hotel} from "../../hotel";
import * as querystring from "querystring";

export default defineEventHandler(async (event) => {
    const params = JSON.parse(
        //@ts-ignore
        querystring.decode(
            //@ts-ignore
            event.node.req.url?.split("?")[1]
        ).form
    );

    try {
        let hotels = await Hotel.find({
            "location.city": `${params.city}`,
            "rooms": {$elemMatch: {"available": true, "maxGuests": {$gte: `${params.guests}`}}},
            "stars": {$gte: params.stars},
            "reviewsScore": {$gte: params.minReviewsScore}
        });

        for (let i = 0; i < hotels.length; i++) {
            hotels[i]["rooms"] = hotels[i]["rooms"].filter(room => room.available == true);
        }

        if(params.parking) {
            hotels = hotels.filter(hotel => hotel.metadata?.parking === true);
        }

        if(params.breakfast) {
            for (let i = 0; i < hotels.length; i++) {
                hotels[i]["rooms"] = hotels[i]["rooms"].filter(room => room.breakfast == true);
            }
        }

        return hotels;
    } catch (e) {
        console.log(e);
    }z
});

