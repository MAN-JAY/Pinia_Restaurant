import { watch } from 'vue'
import { defineStore } from 'pinia'
import {useGeolocation} from '@vueuse/core'

export const useGeolocationStore = defineStore('geolocation', () => {
  const {coords} = useGeolocation()

  watch(()=>coords.value, (newValue)=> {
      if(newValue){
        geoLocation(coords.value.lattitude,coords.value.longitude)
      }
  })

  async function geoLocation(lattitude,longitude){
      const apiKey = 'YOUR_API_KEY'; // Replace with your Google API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

      fetch(url)
          .then(response => response.json())
          .then(data => {
              if (data.status === 'OK' && data.results[0]) {
                  const address = data.results[0].formatted_address;
                  document.getElementById('location').innerText = `Location: ${address}`;
              } else {
                  document.getElementById('location').innerText = 'Location not found';
              }
          })
          .catch(error => {
              console.error('Error fetching location:', error);
              document.getElementById('location').innerText = 'Error fetching location';
          });
  }

  // // Example coordinates (latitude and longitude)
  // const latitude = 37.7749; // Example latitude
  // const longitude = -122.4194; // Example longitude

  // geoLocation(latitude, longitude);


  return { geoLocation,coords }
})
