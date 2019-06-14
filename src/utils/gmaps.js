import {API_KEY} from "./key"

export const createMapScript = function (cb) {
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`
    script.onload = cb
    script.onerror = (err) => console.log(err)
    document.querySelector('head').appendChild(script)
}
export let map,
    navGeo,
    lat = 55.745326222517036,
    lng = 37.617511704752815
export function initGoogleMap(el) {
    if (navigator.geolocation) {
        navGeo = navigator.geolocation
        navGeo.getCurrentPosition(positionSuccess, positionError)
    } else {
        alert("Geolocation API not supported in your browser")
    }
    window.initMap = function () {
        map = new google.maps.Map(el, {
            center: {lat, lng},
            zoom: 10,
            disableDefaultUI: true
        })
    }
}

function positionSuccess(pos) {
    const crd = pos.coords
    lat = crd.latitude
    lng = crd.longitude
}

function positionError(err) {
    console.log(`position Error: ${err.message}`)
}