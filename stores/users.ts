import { defineStore } from "pinia"
import { Item } from '~/types'

export const useUsersStore = defineStore('users', () => {
    let users = ref<Array<{ name: string, id: number }>>([])
    let user = ref<Array<Item>>([])

    const setUsers = (data: any) => users.value = data
    const setUser = (data: any) => user.value = data

    const getUsers = async () => {
        try {
            const data = await $fetch<Array<{ name: string, id: number }>>('https://jsonplaceholder.typicode.com/users')
            await setUsers(data)
        } catch(error) {
            console.log(error)
        }
    }

    const getUser = async (id: any) => {
        try {
            const data = await $fetch<Array<Item>>(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
            await setUser(data)
        } catch(error) {
            console.log(error)
        }
    }

    return { users, user, getUsers, getUser }
})