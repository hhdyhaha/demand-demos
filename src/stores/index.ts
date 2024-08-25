import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNodesStore = defineStore('nodes-stores', () => {
    interface multiNode {
        node_id: number,
        node_position?: {
            top: number,
            left: number
        }
    }
    const multiNodes = ref<multiNode[]>([])

    return {
        multiNodes
    }
})