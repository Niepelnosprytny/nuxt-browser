import {defineStore} from 'pinia'

export const useHotelsStore = defineStore('hotelsStore', () => {
    const hotels = ref([]);
    const promotedHotels = ref([]);

    async function searchHotels(form: any) {
        await useFetch("/api/hotels", {
            query: {
                "form": form
            }
        }).then(
            (res) => {
                let data = res.data.value;
                this.promotedHotels = data.filter(hotel => hotel.promoted === true);
                this.hotels = data.filter(hotel => hotel.promoted === false);
            }
        );
    }

    return {
        searchHotels,
        hotels,
        promotedHotels
    }
})