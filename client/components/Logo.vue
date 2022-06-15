<template>
	<div>
		<svg-icon class="NuxtLogo" name="static/ico-logo" />
	</div>
</template>
<script>
export default {
	// created() {
	//   this.$axios
	//     .$get('https://jsonplaceholder.typicode.com/todos/1')
	//     .then(res => console.log(res));
	// },
};
</script>
<style>
.NuxtLogo {
	animation: 1s appear;
	margin: auto;
}

@keyframes appear {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>
