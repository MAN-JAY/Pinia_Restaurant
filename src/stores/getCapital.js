import { defineStore } from "pinia";
import { ref } from "vue";


export const useCapitalStore = defineStore("capital", () => {


    // Reactive variables
    const countryCapital = ref(null)
    const loading = ref(false)
    const apiUrl = 'https://countriesnow.space/api/v0.1/countries/capital';

    // Making the POST request
    async function fetchCapital (selectedCity) {
        loading.value = true
        countryCapital.value = null

        // Data to be sent in the POST request
        const postData = {
            "country": selectedCity
        };


        // Options for the fetch request
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        };

        try {
            const response = await fetch(apiUrl,options)
            const data = await response.json()
            countryCapital.value = data.data.capital
            loading.value = false
           
        } catch (error) {
            console.error('Error fetching capital:', error)
        }
    }
     return { fetchCapital, countryCapital,loading }

})