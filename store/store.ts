export const useHotelsStore = defineStore('hotelsStore', () => {
    const hotels = ref([]);
    const promotedHotels = ref([]);
    const searchBarValues = ref({});
    const filterValues = ref({
        breakfast: false,
        parking: false,
        stars: 0,
        minReviewsScore: 0
    });

    function sortByReviewsAsc() {
        hotels.value = hotels.value.sort((a: never, b: never) => { return sortAsc(a, b, "reviewsScore") });
        promotedHotels.value = promotedHotels.value.sort((a: never, b: never) => { return sortAsc(a, b, "reviewsScore") });
    }

    function sortByReviewsDesc() {
        hotels.value = hotels.value.sort((a: never, b: never) => { return sortDesc(a, b, "reviewsScore") });
        promotedHotels.value = promotedHotels.value.sort((a: never, b: never) => { return sortDesc(a, b, "reviewsScore") });
    }

    function sortByPriceAsc() {
        sortByRoomProps(hotels.value, sortAsc, "price");
        sortByRoomProps(promotedHotels.value, sortAsc, "price");
    }

    function sortByPriceDesc() {
        sortByRoomProps(hotels.value, sortDesc, "price");
        sortByRoomProps(promotedHotels.value, sortDesc, "price");
    }

    function setSearchBarValues(value: any) {
        searchBarValues.value = value;
    }

    function setFilterValues(value: any) {
        filterValues.value = value;
    }

    async function searchHotels() {
        const query = { ...searchBarValues.value, ...filterValues.value };

        await useFetch("/api/hotels", {
            query: {
                "form": query
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
        searchBarValues,
        searchHotels,
        setSearchBarValues,
        setFilterValues,
        sortByReviewsAsc,
        sortByReviewsDesc,
        sortByPriceAsc,
        sortByPriceDesc
    }
});

function sortAsc (a: never, b: never, sortBy: string) {
    const value1 = a[sortBy];
    const value2 = b[sortBy];
    if (value1 < value2) {
        return -1;
    }
    if (value1 > value2) {
        return 1;
    }
    return 0;
}

function sortDesc (a: never, b: never, sortBy: string) {
    const value1 = a[sortBy];
    const value2 = b[sortBy];
    if (value2 < value1) {
        return -1;
    }
    if (value2 > value1) {
        return 1;
    }
    return 0;
}

function sortByRoomProps(hotelsArray: Array<any>, sortFunction: Function, sortBy: string) {
    for(let i = 0; i < hotelsArray.length; i++) {
        hotelsArray[i].rooms = hotelsArray[i].rooms.sort((a: never, b: never) => { return sortFunction(a, b, sortBy) });
    }
}