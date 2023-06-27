import {Hotel} from "../../hotel";

export default defineEventHandler(async (event) => {
    const form = JSON.parse(event.node.req.headers.form);
    try {
        return Hotel.find({
            "location.city": {"$eq": `${form.city}`},
            "rooms": {"$elemMatch": {"available": true, "maxGuests": {"$gte": `${form.guests}`}}}
        });
    } catch (e) {
        console.log(e);
    }
});

