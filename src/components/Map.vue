<template>
    <div class="map__container">
        <div class="map__wrapper">
            <div class="map__modal-buttons">
                <button @click="modalOpen=true" class="map__button map__button--unobtrusive" v-if="!modalOpen">Map
                    types
                </button>
                <div v-if="modalOpen" class="map__modal">
                    <button v-for="button in modalButtons" @click="changeMapType(button)" :key="button"
                            class="map__button" :class="mapType === button && 'map__button--active'">{{button}}
                    </button>
                </div>
            </div>
            <button @click="getMyCurrentLocation" class="map__button map__location-button">My Location</button>
            <div ref='googleMap' class="map">
            </div>
            <p class="map__distance">Distance: <span class="map__calc">{{calcDistance}}</span> km</p>
        </div>
    </div>

</template>

<script>
    import {
        createMapScript,
        initGoogleMap,
        map,
        navGeo
    } from "../utils/gmaps"
    import {newName} from '../sayHelloToParents'

    export default {
        name: 'Map',
        data() {
            return {
                markers: [],
                paths: [],
                modalOpen: false,
                modalButtons: ['ROADMAP', 'SATELLITE', 'HYBRID', 'TERRAIN'],
                mapType: 'ROADMAP'

            }
        },
        props: {points: Array},
        mounted() {
            try {
                const {googleMap} = this.$refs
                initGoogleMap(googleMap)
                createMapScript(this.addMarkerByClicking)
                newName.$on('new-name', this.nameChanged)
            } catch (err) {
                console.error(err)
            }
        },
        watch: {
            'points': function (newVal, oldVal) {
                const newPoints = newVal.length - oldVal.length
                switch (newPoints) {
                    case 1 : {
                        this.setMarker(newVal[newVal.length - 1])
                        this.drawPath()
                        return
                    }
                    case -1 :
                        this.removeMarker(newVal)
                        this.drawPath()
                        return
                    case 0 :
                        this.pointsChanged(newVal)
                        this.drawPath()
                        return
                    default:
                        return
                }
            }
        },
        methods: {
            getMyCurrentLocation() {
                if (!navGeo) return
                navGeo.getCurrentPosition((pos) => {
                    const location = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }
                    map.setCenter(location)
                    this.registerMarker('My location', location)
                })

            },
            changeMapType(value) {
                map.setMapTypeId(google.maps.MapTypeId[value])
                this.mapType = value
                this.modalOpen = false
            },
            addMarkerByClicking() {
                google.maps.event.addListener(map, 'click', ev => {
                    this.registerMarker(null, ev.latLng)
                })
            },
            registerMarker(name, location) {
                this.$emit('addPointByClicked', name, location)
            },
            drawPath() {
                this.clearPath()
                const path = this.markers.map(m => {
                    return {
                        lat: m.getPosition().lat(),
                        lng: m.getPosition().lng()
                    }
                })
                const awesomePath = new google.maps.Polyline({
                    path,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                })
                this.paths.push(awesomePath)
                awesomePath.setMap(map)
            },
            clearPath() {
                if (this.paths.length) {
                    this.paths.forEach(p => p.setMap(null))
                    this.paths = []
                }
            },
            setMarker({id, name, location}) {
                const marker = new google.maps.Marker({
                    position: location || {lat: map.getCenter().lat(), lng: map.getCenter().lng()},
                    title: name,
                    draggable: true,
                    map: map
                })
                const info = new google.maps.InfoWindow({
                    content: marker.title
                })
                marker.id = id
                marker.info = info
                this.markers.push(marker)
                google.maps.event.addListener(marker, 'click', () => {
                    marker.info.open(map, marker)
                })
                google.maps.event.addListener(marker, 'dragend', () => {
                    this.drawPath()
                })
            },
            nameChanged({index, name}) {
                const marker = this.markers[index]
                marker.setTitle(name)
                marker.info.setContent(name)
            },
            pointsChanged(newArr) {
                const newMarkers = []
                newArr.forEach(n => {
                    this.markers.forEach(m => {
                        if (m.id === n.id) {
                            newMarkers.push(m)
                        }
                    })
                })
                this.markers = newMarkers
            },
            removeMarker(newArr) {
                if (!newArr) {
                    this.markers[0].setMap(null)
                    this.markers = []
                    return
                }
                this.markers.filter((o, idx) => {
                    if (!newArr.find(o2 => o.id === o2.id)) {
                        const marker = this.markers[idx]
                        marker.setMap(null)
                        this.markers = [...this.markers.slice(0, idx),
                            ...this.markers.slice(idx + 1)
                        ]
                    }
                })
            }
        },
        computed: {
            calcDistance() {
                let totalPath = 0
                this.markers.map(m => {
                    return new google.maps.LatLng(m.getPosition().lat(), m.getPosition().lng())
                })
                .forEach((rout, idx, arr) => {
                    if (idx + 1 < arr.length) {
                        totalPath += google.maps.geometry.spherical.computeDistanceBetween(rout, arr[idx + 1])
                    }
                })
                return (totalPath / 1000).toFixed(2)
            }
        }
    }
</script>

<style>
    .map__container {
        width: 60%;
        height: 90vh;
    }

    .map__wrapper {
        position: relative;
        height: 100%;
    }

    .map {
        width: 100%;
        height: 90%;
    }

    .map__calc {
        color: tomato;
    }

    .map__button--active {
        color: tomato;
    }

    .map__button {
        font-size: 10px;
        height: 40px;
        min-width: 70px;
        border: 2px solid white;
        text-align: center;
        background-color: beige;
        cursor: pointer;
    }

    .map__button--unobtrusive {
        opacity: 0.7;
    }

    .map__modal-buttons {
        position: absolute;
        left: 20px;
        top: 20px;
        z-index: 10000;
        cursor: pointer;
    }

    .map__location-button {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 10000;
        opacity: 0.7;
        cursor: pointer;
    }

    @media only screen and (max-width: 992px) {
        .map__container {
            order: 1;
            width: 100%;
            height: 100vh;
        }
    }

    @media only screen and (max-width: 768px) {
        .map__modal {
            display: flex;
            flex-direction: column;
        }
        .map__distance{
            margin-top: 5px;
        }
    }

</style>
