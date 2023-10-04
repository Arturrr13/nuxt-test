export default defineNuxtRouteMiddleware((to, from) => {
    const client = clientStore()

    if (client.clientName === undefined) {
        abortNavigation()
    }

    if (to.path !== '/login' && client.clientName === undefined) {
        return navigateTo('/login')
    }
})