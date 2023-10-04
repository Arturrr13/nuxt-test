<template>
    <div class="content">
        <div class="form__wrapper">
            <h1>Login</h1>
            <input 
                type="text"
                v-model="data.name"
            >
            <button @click="login">
                Login
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'login'
    })

    const data = reactive({
        name: ''
    })

    const login = () => {
        if(data.name.length > 0){
            const client = clientStore()
            client.setName(data.name)
            navigateTo('/') 
        } 
    }
</script>

<style lang="scss" scoped>
    .content{
        height: calc(100vh - 19px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .form__wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 400px;
        gap: 20px;
        background: rgb(78, 81, 106);
        border-radius: 15px;
        padding: 20px;
    }

    h1{
        color: aliceblue;
        font-style: italic;
        font-weight: 600;
    }

    input[type=text]{
        width: 85%;
        height: 50px;
        border: none;
        border-radius: 10px;
        padding: 0 20px;
        font-size: 16px;
        color: rgb(78, 81, 106);
        background: aliceblue;
    }

    button{
        height: 50px;
        width: 150px;
        background: aliceblue;
        border-radius: 10px;
        border: none;
        color: rgb(78, 81, 106);
        font-size: 17px;
    }
</style>