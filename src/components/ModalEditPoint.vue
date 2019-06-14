<template>
    <div>
        <button @click="open" class="modal__button"><span>Edit point</span></button>
        <div ref='modal' class="modal">
            <div class="modal__content">
                <span @click="close" class="modal__close" role="button">&times;</span>
                <form class="panel__form" @submit.prevent>
                    <label>
                        Edit point:
                        <input v-model='editName'
                               @keyup.enter="changeName"
                               class="panel__control panel__control--editable"
                               type="text"
                        >
                    </label>
                    <button @click="changeName" class="modal__button modal__button--save">Save</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {modalStatus, newName} from "../sayHelloToParents"

    export default {
        name: "ModalEditPoint",
        props: {
            point: Object
        },
        data() {
            return {
                editName: '',
                modalIsOpen: false
            }
        },
        watch: {
            'modalIsOpen': function () {
                modalStatus.$emit('modal-status', this.modalIsOpen)
            }
        },
        methods: {
            open() {
                const {modal} = this.$refs
                modal.style.display = "block"
                this.modalIsOpen = true
                this.editName = this.point.name
            },
            close() {
                const {modal} = this.$refs
                modal.style.display = "none"
                this.modalIsOpen = false
            },
            changeName() {
                if (this.point.name === this.editName) {
                    this.close()
                } else {
                    newName.$emit('new-name', {name: this.editName, index: this.point.index})
                    this.close()
                }
            }
        }
    }
</script>

<style>
    .modal {
        display: none;
        position: fixed;
        z-index: 99999;
        padding-top: 100px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
        cursor: default;
    }

    .modal__content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }

    .panel__control--editable {
        min-height: 22px;
        margin: 10px;
    }

    .modal__button {
        width: 90px;
        min-height: 40px;
        border: 2px solid white;
        text-align: center;
        background-color: beige;
        margin-right: 10px;
        cursor: pointer;

    }
    .modal__button--save{
        min-height: 46px;
        border: 2px solid #cccccc;
    }
    .modal__close {
        position: absolute;
        top: 4px;
        right: 10px;
        color: tomato;
        font-weight: bold;
        font-size: 28px;
        cursor: pointer;
    }
</style>