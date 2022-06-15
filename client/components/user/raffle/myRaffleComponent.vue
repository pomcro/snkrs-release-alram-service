<template>
	<div class="raffle" @click="goItem(raffleData.data.id)">
		<div class="raffle_img">
			<img :src="raffleData.data.thumbnail" alt="thumnail_image" />
		</div>
		<div class="raffle_info">
			<div class="info_time">{{ raffleData.updateAt }}</div>
			<div class="info_brand">
				<img
					:src="raffleData.data.shop.thumbnail"
					alt="thumnail_image"
					@error="replaceByDefault"
				/>
				{{ raffleData.data.shop.name }}
			</div>
			<div class="info_title">{{ raffleData.data.name }}</div>
			<button>{{ status }}</button>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
export default {
	props: {
		raffleData: { type: Object, required: true },
	},
	data() {
		return {
			unLogo: require('@/assets/img/no_image_transparent.png'),
			raffleStatusConfig: [
				{ status: 0, label: '응모중', color: '#58af58' },
				{ status: 1, label: '발매완료', color: '#000000' },
			],
			status: '',
		};
	},
	mounted() {
		this.getRaffleStatus();
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
		getRaffleStatus() {
			const startDate = this.raffleData.data.release.startAt;
			const endDate = this.raffleData.data.release.endAt;
			const date = moment();
			const start = moment(startDate);
			const end = moment(endDate);
			let selectedIndex = 1;
			// 사이값 구함
			if (date >= start && date <= end) {
				selectedIndex = 0;
			} else if (date > start && date > end) {
				selectedIndex = 1;
			} else if (date < start) {
				selectedIndex = 0;
			} else if (date > end) {
				selectedIndex = 0;
			} else {
				selectedIndex = 1;
			}
			this.status = this.raffleStatusConfig[selectedIndex].label;
		},
	},
};
</script>

<style scoped>
.raffle {
	display: flex;
	margin-top: 20px;
}
.raffle_img {
	width: 90px;
	height: 90px;
	background: rgba(157, 160, 162, 0.09);
	padding: 0 0.5rem;
	border-radius: 5px;
	display: inline-grid;
	align-items: center;
}
.raffle_img img {
	width: 100%;
}
.raffle_info {
	flex-grow: 1;
	margin-left: 6%;
}
.info_time {
	font-size: 0.7rem;
	font-weight: bold;
}
.info_brand {
	font-size: 0.85rem;
	color: black;
	font-weight: bold;
	margin-top: 4%;
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
.info_size {
	font-size: 12px;
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
