<template>
    <div class="content">
        <div class="container">
			<div 
				class="value"
				v-for="(item, index) in data.values"
				:key="index"
			></div>
		</div>

		<input 
			type="number" 
			v-model="data.value"
			max="500"
		>

		<button @click="addNewValue">
			Add
		</button>
    </div>
</template>

<script setup lang="ts">
	useHead({
        title: `Spin`
    })
	const data = reactive({
		values: new Array<{ value: number, color: string }>(),
		value: 1 as number
	})

	onMounted(() => {
		const { $io } = useNuxtApp()
		$io.connect()

		$io.on(SocketEvent.new_value, (socketData) => {
            socketData.value !== undefined ? data.values.push({ value: socketData.value, color: socketData.color }) : null
        })
	})

	watchEffect(() => {
		const arr = [...data.values]
		let allValues: number = 0
		arr.forEach((el) => {
			allValues += el.value
		})
		let pr: number = 360 / allValues
		setTimeout(() => {
			const myClass = document.querySelectorAll('.value') as NodeListOf<HTMLElement>
			let from: number = 0
			myClass.forEach((el: HTMLElement, index: number) => {
				el.style.background = `conic-gradient(rgba(255, 0, 0, 0) ${ from * pr }deg, ${arr[index].color} ${ from * pr }deg ${ (arr[index].value + from) * pr }deg)`
				from += arr[index].value
			})
  		}, 0) 
	})

	async function addNewValue(){
		const { $io } = useNuxtApp()
		const letters: string = '0123456789ABCDEF'
        let color: string = '#'
        for (let i: number = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
		$io.emit(SocketEvent.down, {value: data.value, color: color})
	}
</script>

<style lang="scss" scoped>
.content {

}
.container{
	width: 400px;
	height: 400px;
	position: relative;
}
.value{
	width: 100%;
	height: 100%;
	border-radius: 50%;
	position: absolute;
	top: 0;
}
.two{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	border-radius: 50%;
	background: conic-gradient(rgba(255, 0, 0, 0) 6deg, rgb(255, 162, 0) 6deg 18deg, rgba(255, 0, 0, 0) 18deg);
}
</style>