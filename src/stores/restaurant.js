import { defineStore } from "pinia";
import { useGeolocationStore } from "./geolocationStore";

export const useRestaurantStore = defineStore("restaurant", ()=>{
    const locationStore = useGeolocationStore()

    async function getRestaurants(){
        const lat = locationStore.lattidue
        const long = locationStore.longitude
        
    }
})