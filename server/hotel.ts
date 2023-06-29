import {model, Schema} from "mongoose";

export const hotel = new Schema({
    id: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
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

export const Hotel = model('Hotel', hotel);
