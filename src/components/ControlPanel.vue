<template>
    <div class="panel">
        <h3 class="panel__title">Control Panel</h3>
        <form class="panel__form" @submit.prevent>
            <label>
                <input v-model='newPoint'
                       @keyup.enter="addPoint"
                       class="panel__control"
                       placeholder="Add point"
                       type="text"
                >
            </label>
        </form>
        <div class="panel__wrapper">
            <draggable v-model="pointsList" @start="isDragging=true" @end="endDragging" :disabled="modalOpen" tag="ul">
                <Waypoint v-for="(point, index) in points" :point="{id: point.id, name: point.name, index}"
                          :onDelete="onDelete" :key="point.id"/>
            </draggable>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import {modalStatus} from "../sayHelloToParents"
    import Waypoint from "./Waypoint"

    export default {
        name: "ControlPanel",
        data() {
            return {
                newPoint: '',
                isDragging: false,
                pointsList: [],
                modalOpen: false
            }
        },
        props: {points: Array, onDelete: Function},
        components: {
            draggable, Waypoint
        },
        mounted() {
            modalStatus.$on('modal-status', this.modal)
        },
        methods: {
            addPoint() {
                this.$emit('addPoint', this.newPoint)
                this.newPoint = ''
            },
            endDragging(ev) {
                this.$emit('pointChanged', {futureIndex: ev.newDraggableIndex, index: ev.oldDraggableIndex})
                this.isDragging = false
            },
            modal(status) {
                this.modalOpen = status
            }
        }
    }
</script>

<style>
    .panel {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 40%;
        height: 50vh;
        padding: 0 10px;
    }

    .panel__title {
        margin: 5px 0;
    }

    .panel__control {
        padding: 10px;
        font-size: 16px;
    }

    .panel__wrapper ul {
        margin: 10px 0;
        padding: 0;
    }

    @media only screen and (max-width: 992px) {
        .panel {
            order: 2;
            width: 100%;
            height: unset;
            padding: 0 10px;
        }

        .panel__wrapper ul {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }
    }
</style>