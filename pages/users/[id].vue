<template>
    <div class="content">
        <h1>User №{{ userID }}</h1>
        <div class="posts__wrapper">
            <div 
                class="post__wrapper"
                v-for="(item) in userStore.user"
                :key="item.id"
            >
                <h3>
                    {{ item.title }}
                </h3>
                <p>
                    {{ item.body }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const router = useRoute()
    const userID = ref<number>()

    useHead({
        title: `User №${router.params.id}`
    })

    onMounted(async() => {
        const userStore = useUsersStore()
        await userStore.getUser(router.params.id)
        userID.value = userStore.user[0].userId
    })

    const userStore = useUsersStore()
    userStore.getUser(router.params.id)
</script>

<style lang="scss" scoped>
.content{
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
}

h1{
    color: aliceblue;
    font-weight: 600;
    margin: 10px 0;
}
.posts__wrapper{
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-bottom: 25px;
    max-height: calc(100vh - 76px);
    overflow: auto;
    &::-webkit-scrollbar {
        width: 5px;
        position: relative;
    }
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgb(61, 61, 61); 
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: #c8bebe; 
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #ffffff; 
    }
}
.post__wrapper{
    width: 70%;
    margin: 0 auto;
    padding: 10px;
    background: rgb(39, 54, 89);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p{
        color: aliceblue;
        font-size: 16px;
    }
}
</style>