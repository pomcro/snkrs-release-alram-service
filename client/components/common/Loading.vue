<template>
	<div v-if="loading" class="loading-page">
		<lottie
			:options="defaultOptions"
			:height="100"
			:width="100"
			@animCreated="handleAnimation"
		/>
	</div>
</template>

<script>
import Lottie from './lottie.vue';
import aniData from '@/assets/img/loading.json';
export default {
	components: {
		lottie: Lottie,
	},
	data: () => ({
		defaultOptions: { animationData: aniData },
		animationSpeed: 1,
		loading: false,
	}),
	methods: {
		start() {
			this.loading = true;
		},
		finish() {
			this.loading = false;
		},
		handleAnimation(anim) {
			this.anim = anim;
		},

		stop() {
			this.anim.stop();
		},

		play() {
			this.anim.play();
		},

		pause() {
			this.anim.pause();
		},

		onSpeedChange() {
			this.anim.setSpeed(this.animationSpeed);
		},
	},
};
</script>

<style scoped>
.loading-page {
	position: fixed;
	z-index: 999999;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	max-width: 430px;
	margin: auto;
	height: 100%;
	background: white;
}
</style>
