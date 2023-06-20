import {hotelSchema} from "../../hotelSchema";
import {model} from 'mongoose';

export const Hotel = model<any>('Hotel', hotelSchema);
export default defineEventHandler(async () => {
    try {
        return Hotel.find();
    } catch (e) {
        console.log(e);
    }
});

