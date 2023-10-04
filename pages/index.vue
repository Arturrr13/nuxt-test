<template>
    <div class="content">
        <div class="chat__wrapper">
            <div v-for="(item, index) in data.messages" :key="index"
                :class="{ yourMessage: item.user === data.id }"
                class="message__wrapper"
            >
                <div class="message" v-if="item.message">
                    <span>
                        {{ item.message }}
                    </span>
                </div>
                <div class="image" v-if="item.image">
                    <img :src="item.image" alt="Message">
                </div>
            </div>
        </div>
        <div class="send__wrapper">
            <div class="upload__wrapper">
                <input 
                    type="file" 
                    accept=".jpg, .jpeg, .png"
                    @change="lol"
                >
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                    <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z"/>
                </svg>
            </div>
            <textarea 
                placeholder="Message"
                v-model="data.message" 
                @keydown.prevent.enter="sendMessage"
                @keydown="autosize"
                rows="1"
            ></textarea>
    
            <button type="button" @click="sendMessage" class="btn__send">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    useHead({
        title: `Chat`
    })

    const data = reactive({
        message: '' as string,
        id: '' as string,
        messages: new Array<any>()
    })

    onMounted(() => {
        localStorage.hasOwnProperty('Messages') ? getLocalStorage() : null
        const { $io } = useNuxtApp()
        $io.connect()

        $io.on(SocketEvent.new_count, (socketData) => {
            data.id === '' ? data.id = socketData.id : null
            socketData.message !== undefined ? data.messages.push({ message: socketData.message, user: socketData.id }) : null
            socketData.image !== undefined ? data.messages.push({ image: socketData.image, user: socketData.id }) : null
        })
    })

    function lol(e: Event) {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0]; 
        const reader = new FileReader()
        reader.onload = (evt: any) => {
            const { $io } = useNuxtApp()
            const myClass: HTMLInputElement | null = document.querySelector('.chat__wrapper') as HTMLInputElement;
            $io.emit(SocketEvent.up, {value: evt.target.result, type: 'image'})
            setTimeout(() => {
                document.querySelector('.chat__wrapper')?.scrollTo(0, myClass.scrollHeight + 200)
            }, 250)
        }

        reader.readAsDataURL(file)
    }

    function sendMessage(){
        if(data.message !== ''){
            const { $io } = useNuxtApp()
            const myClass: HTMLInputElement | null = document.querySelector('.chat__wrapper') as HTMLInputElement;
            $io.emit(SocketEvent.up, {value: data.message, type: 'message'})
            data.message = ''
            setTimeout(() => {
                document.querySelector('.chat__wrapper')?.scrollTo(0, myClass.scrollHeight + 200)
                //document.querySelector('.chat__wrapper')?.scrollTo(0, document.querySelector<any>('.chat__wrapper').scrollHeight + 200)
            }, 250)
            setLocalStorage()
        }
    }

    const setLocalStorage = () => localStorage.setItem('Messages', JSON.stringify(data.messages))
    const getLocalStorage = () => data.messages = JSON.parse(localStorage.getItem('Messages') || '')

    function autosize(el: KeyboardEvent){
        const element = el.target as HTMLInputElement
        const elementParent = element.parentElement as HTMLInputElement
        const size = () => {
            setTimeout(function(){
                element.style.height = 'auto'
                element.style.padding = '10px'
                element.style.height = element.scrollHeight + 'px';
                elementParent.style.height = element.scrollHeight + 'px';
            }, 0)  
        }
        if(element.clientHeight < 150){
            size()
        } else if(el.key === 'Backspace') {
            size()
        } else {
            setTimeout(function(){
                element.style.overflow = 'auto'
            }, 0)
        }
    }
</script>

<style lang="scss" scoped>
span{
    color: #ffffff;
}
.content{
    max-width: 1100px;
    margin: 0 auto;
    height: calc(100vh - 19px);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.upload__wrapper{
    position: relative;
    input[type=file]{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: #646464;
    svg{
        height: 23px;
    }
}
.send__wrapper{
    width: calc(100% - 125px);
    max-height: 150px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
}

textarea{
    width: 80%;
    max-height: 150px;
    border-radius: 10px;
    outline: none;
    overflow:hidden;
    border: none;
    padding: 10px;
    background: #646464;
    color: #ffffff;
    font-size: 18px;
    line-height: 23px;
    resize: none;
    &::placeholder{
        color: #ffffff;
        letter-spacing: 2px;
    }
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
.chat__wrapper{
    margin: 0 auto;
    overflow: auto;
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
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
.message{
    background: #646464;
    width: 60%;
    padding: 10px;
    border-radius: 10px;
    word-break: break-word;
}
.image{
    max-height: 500px;
    max-width: 500px;
    img{
        border-radius: 15px;
        width: 100%;
        height: 100%;
    }
}
.btn__send{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: #646464;
    svg{
        height: 23px;
    }
}
.yourMessage{
    display: flex;
    justify-content: flex-end;
    .message{
        background: #9babc6;
    }
    span{
        color: #0008c4;
    }
}
</style>