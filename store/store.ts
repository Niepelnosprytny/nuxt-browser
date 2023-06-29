import { defineStore } from 'pinia'

export const useHotelsStore = defineStore('hotelsStore', () => {
    const hotels = ref([]);

    async function searchHotels(form: any) {
        hotels.value = await useFetch("/api/hotels", {
            query: {
                "form": form
            }
        }).data;
    }

    return { searchHotels, hotels }
})