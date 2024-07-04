import { defineStore } from "pinia";
import { ref } from "vue";
import {useCapitalStore} from './getCapital'



export const useCountryStore = defineStore("country", () => {

    const capitalStore = useCapitalStore()
    const {fetchCapital,countryCapital} = capitalStore
    // Reactive variables
    const countries = ref([])
    const selectedCountry = ref('')
    

    // Method to fetch cities
    async function fetchCountries() {
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/')
            const data = await response.json()
            const countriesArray = data.data.map(obj => obj.country);
            countries.value = countriesArray
        } catch (error) {
            console.error('Error fetching cities:', error)
        }
    }

    // Function to handle city change
    function onCountryChange() {
        console.log(selectedCountry.value)
        fetchCapital(selectedCountry.value);
    }

    return {countries, onCountryChange, selectedCountry, fetchCountries }


})