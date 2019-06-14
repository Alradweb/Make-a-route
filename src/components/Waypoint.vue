<template>
    <li class="panel__item">
        <span>{{point.name}}</span>
        <div class="panel__buttons">
            <ModalEditPoint :point="point"></ModalEditPoint>
            <button @click="onDelete(point.index)" class="panel__button"><span
                    class="close close--button">&times;</span></button>
        </div>
    </li>
</template>

<script>
    import ModalEditPoint from "./ModalEditPoint"

    export default {
        name: "Waypoint",
        props: ['point', 'onDelete'],
        components: {
            ModalEditPoint
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .panel__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;
        background-color: beige;
        border: 1px dashed lightgray;
        padding: 5px 10px;
        margin-bottom: 10px;
        cursor: move;
    }

    .panel__buttons {
        display: flex;
        flex-direction: row;
    }

    .panel__button {
        width: 70px;
        min-height: 40px;
        border: 2px solid white;
        text-align: center;
        background-color: beige;
        color: tomato;
        cursor: pointer;
    }

    .close--button {
        display: block;
        cursor: pointer;
    }

    .close {
        color: tomato;
        font-size: 28px;
        font-weight: bold;
    }

    @media only screen and (max-width: 992px) {
        .panel__item {
            width: 90%;
        }
    }
</style>