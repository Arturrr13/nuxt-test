<template>
    <header>
        <ul>
            <li>
                <NuxtLink to="/">
                    Home
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/chat">
                    Chat
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/users">
                    Users
                </NuxtLink>
            </li>
        </ul>
    </header>
</template>

<style lang="scss" scoped>
ul{
    display: flex;
    justify-content: space-evenly;
}

a{
    text-decoration: none;
    color: rgb(59, 255, 147);
}

.router-link-active{
    color: rgb(43, 0, 151);
}
</style>