<template>
    <div id="app">
        <h1 class="app__title">Make a route</h1>
        <div class="app__container">
            <ControlPanel @addPoint="addedPoint" :points="points" :onDelete="onDelete" @pointChanged="pointChanged"/>
            <Map @addPointByClicked="addedPoint" :points="points"/>
        </div>
    </div>
</template>

<script>
    import uniqid from 'uniqid'
    import {newName} from "./sayHelloToParents"
    import Map from './components/Map.vue'
    import ControlPanel from './components/ControlPanel'

    class Point {
        constructor(name, id, location) {
            this.name = name
            this.id = id
            this.location = location
        }
    }

    export default {

        name: 'app',
        components: {
            Map,
            ControlPanel
        },
        data() {
            return {
                points: []
            }
        },
        mounted() {
            newName.$on('new-name', this.nameChanged)
        },
        methods: {
            addedPoint(name, location = null) {
                const newPoints = this.points.slice()
                newPoints.push(new Point(name || `point ${Math.random().toString(36).slice(10)}`, uniqid(), location))
                this.points = newPoints
            },
            onDelete(index) {
                this.points = [...this.points.slice(0, index),
                    ...this.points.slice(index + 1)
                ]
            },
            pointChanged({index, futureIndex}) {
                const copyPoints = [...this.points]
                const move = (arr, from, to) => {
                    const copyPoint = arr[from]
                    arr.splice(from, 1)
                    arr.splice(to, 0, copyPoint)
                }
                move(copyPoints, index, futureIndex)
                this.points = copyPoints
            },
            nameChanged({index, name}) {
                this.points[index].name = name
            }
        }
    }
</script>

<style>
    html,
    body {
        margin: 0;
        padding: 0;
    }

    #app {
        text-align: center;
    }

    .app__title {
        margin: 5px 0;
    }

    .app__container {
        display: flex;
        justify-content: center;
        width: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 10px;
    }

    @media only screen and (max-width: 992px) {
        .app__container {
            flex-direction: column;
            margin-top: 0;
        }
        .app__title{
            font-size: 1.5em;
        }
    }
</style>
