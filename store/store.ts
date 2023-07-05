export const useHotelsStore = defineStore('hotelsStore', () => {
    const hotels = ref([]);
    const promotedHotels = ref([]);

    function sortByReviewsAsc() {
        hotels.value = hotels.value.sort((a, b) => {
            const value1 = a.reviewsScore;
            const value2 = b.reviewsScore;
            if (value1 < value2) {
                return -1;
            }

            if (value1 > value2) {
                return 1;
            }
            return 0;
        });

        promotedHotels.value = promotedHotels.value.sort((a, b) => {
            const value1 = a.reviewsScore;
            const value2 = b.reviewsScore;
            if (value1 < value2) {
                return -1;
            }
            if (value1 > value2) {
                return 1;
            }
            return 0;
        });

        console.log("Co za gówno");
    }

    async function searchHotels(form: any) {
        await useFetch("/api/hotels", {
            query: {
                "form": form
            }
        }).then(
            (res) => {
                let data: any = res.data.value;
                promotedHotels.value = data.filter(hotel => hotel.promoted === true);
                hotels.value = data.filter(hotel => hotel.promoted === false);
                sortByReviewsAsc();
            }
        );
    }

    return {
        hotels,
        promotedHotels,
        searchHotels,
        sortByReviewsAsc
    }
});