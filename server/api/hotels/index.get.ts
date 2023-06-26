import {Hotel} from "../../hotel";

export default defineEventHandler(async (event) => {
    const form: Object = JSON.parse(event.node.req.headers.form);
    try {
        return Hotel.find({
            "location.city": {"$eq": `${form.city}`},
            "$and": [{"rooms.available": {"$eq": true}}, {"rooms.maxGuests": {"$lte": `${form.guests}`}}]
        });
    } catch (e) {
        console.log(e);
    }
});

