import {Hotel} from "../../hotel";

export default defineEventHandler(async (event) => {
    //@ts-ignore
    const id = event.node.req.url.split("/")[3];

    try {
        return await Hotel.find({
            id: id
        });
    } catch (e) {
        console.log(e);
    }z
});

