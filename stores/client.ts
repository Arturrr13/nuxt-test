import { defineStore } from "pinia"

export const clientStore = defineStore('client', () => {
    const clientName = ref<string>()

    const setName = (name: string) => clientName.value = name

    return { clientName, setName }
})