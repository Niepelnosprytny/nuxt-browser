import {Schema} from "mongoose";

export const hotelSchema = new Schema({
    id: String,
    name: String,
    location: {
        city: String,
        postCode: String,
        address: String,
    },
    stars: Number,
    rooms: [{
        price: Number,
        maxGuests: Number,
        beds: Number,
        familyRoom: Boolean,
        area: Number,
        breakfast: Boolean,
        available: Boolean
    }],
    metadata: {
        distanceFromCenter: Number,
        wifi: Boolean,
        parking: Boolean,
        pets: Boolean,
        roomService: Boolean
    },
    reviewsScore: Number,
    promoted: Boolean
});
