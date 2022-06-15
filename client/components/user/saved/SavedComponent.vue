<template>
	<div class="saved" @click="goItem(savedData.data.id)">
		<div class="saved_img">
			<img
				:src="savedData.data.thumbnail | imagefilter320"
				alt="image_filter"
			/>
		</div>
		<div class="saved_info">
			<div class="info_brand">{{ savedData.brand.name.toUpperCase() }}</div>
			<div class="info_title">{{ savedData.data.name }}</div>
			<div class="info_model">{{ savedData.data.model }}</div>
			<div class="info_release">{{ savedData.release_date | datefilter }}</div>
		</div>
	</div>
</template>

<script>
import { datefilter } from '@/utils/datefilter.js';
import { imagefilter320 } from '@/utils/imagefilter.js';
export default {
	filters: {
		imagefilter320,
		datefilter,
	},
	props: {
		savedData: { type: Object, required: true },
	},
	data() {
		return {
			unLogo: require('@/assets/img/no_image_transparent.png'),
			status: '',
		};
	},
	methods: {
		goItem(id) {
			this.$nuxt.$loading.start();
			this.$router.push({
				path: '/product/' + id,
			});
		},
		replaceByDefault(e) {
			e.target.src = this.unLogo;
		},
	},
};
</script>

<style scoped>
.saved {
	display: flex;
	margin-top: 20px;
}
.saved_img {
	width: 90px;
	height: 90px;
	background: rgba(157, 160, 162, 0.09);
	padding: 0 0.5rem;
	border-radius: 5px;
	display: inline-grid;
	align-items: center;
}
.saved_img img {
	width: 100%;
}
.saved_info {
	flex-grow: 1;
	margin-left: 6%;
}
.info_time {
	font-size: 0.7rem;
	font-weight: bold;
}
.info_model {
	font-size: 0.7rem;
	margin-top: 2%;
}
.info_brand {
	font-size: 0.85rem;
	color: black;
	font-weight: bold;
	display: flex;
	align-items: center;
}
.info_brand img {
	border-radius: 100%;
	width: 20px;
	height: 20px;
	margin-right: 4px;
	object-fit: contain;
	object-position: center;
}
.info_title {
	font-size: 0.8rem;
	margin-top: 1%;
}
.info_release {
	margin-top: 3%;
	font-size: 0.7rem;
}
button {
	margin-top: 5%;
	padding: 6px 12px;
	border-radius: 25px;
	font-size: 0.7rem;
	font-weight: bold;
	outline: none;
	background-color: black;
	color: white;
}
</style>
