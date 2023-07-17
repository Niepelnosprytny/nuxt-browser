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
        const hotels = await Hotel.aggregate([
            {
                $match: {
                    "location.city": `${form.city}`
                }
            },
            // "rooms": { "$elemMatch": { "available": true, "maxGuests": { "$gte": `${ form.guests }`} } },
            // "stars": { "$gte": form.stars },
            // "reviewsScore": { "$gte": form.minReviewsScore },
            // { $cond: { if: form.parking === true, then: { "metadata.parking": true } } }
        ]);
        // for (let i = 0; i < hotels.length; i++) {
        //     hotels[i]["rooms"] = hotels[i]["rooms"].filter(room => room.available == true);
        // }
        return hotels;
    } catch (e) {
        console.log(e);
    }
});

