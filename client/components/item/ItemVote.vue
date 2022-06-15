<template>
	<div>
		<div class="detail_mobile">
			<div class="category_title_box">
				<div class="category_title">VOTE</div>
				<div class="category_sub_title">예측 리셀 가격 투표</div>
			</div>
			<div v-if="!isVoted">
				<vue-slider
					v-model="sliderCustomzie.val"
					:min="sliderCustomzie.min"
					:max="sliderCustomzie.max"
					:interval="sliderCustomzie.interval"
					:process-style="{ backgroundColor: 'black' }"
					:tooltip-style="{
						backgroundColor: 'black',
						borderColor: 'black',
						z_index: 0,
					}"
					:tooltip="'always'"
				>
				</vue-slider>
				<button class="btn-vote" @click="vote">투표하기</button>
			</div>
			<div v-else>
				<div class="canvasWrapper">
					<VoteChart :height="120" :chart-data="voteData.vote"></VoteChart>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import component
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js';
import 'vue-slider-component/dist-css/vue-slider-component.css';
// import theme
import 'vue-slider-component/theme/default.css';
import VoteChart from '@/components/common/chart/VoteChart.vue';
export default {
	components: {
		VoteChart,
		VueSlider,
	},
	props: {
		voteData: { type: Object, required: true },
		isVoted: { type: Boolean, required: true },
	},
	data() {
		return {
			sliderCustomzie: {
				val: 9,
				lineHeight: 10,
				data: [],
				processStyle: {
					backgroundColor: '#000',
				},
				tooltipStyles: {
					backgroundColor: '#000',
					borderColor: '#0000',
				},
			},
		};
	},
	mounted() {
		const maxPrice = this.voteData.vote.max_price;
		const minPrice = this.voteData.vote.min_price;
		const unit = this.voteData.vote.unit; // Slider 단위
		this.sliderCustomzie.min = minPrice;
		this.sliderCustomzie.max = maxPrice;
		this.sliderCustomzie.interval = unit;
		this.sliderCustomzie.val = this.voteData.vote.resale_price;
	},
	methods: {
		async vote() {
			if (!this.$store.state.isLogin) {
				if (confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?')) {
					this.$router.push({
						path: '/login',
					});
				}
				return;
			}
			const postData = { price: this.sliderCustomzie.val };
			return await this.$axios
				.$post('prod/' + this.$route.params.id + '/vote', postData)
				.then(res => {
					return { iteminfo: res };
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
};
</script>

<style scoped>
::v-deep .vue-slider-process {
	z-index: 0;
}
::v-deep .vue-slider-dot {
	z-index: 1;
}
.vue-slide-bar-component {
	padding-top: 15px;
	padding-left: 5px;
	padding-right: 5px;
}
.detail_mobile {
	text-align: center;
	padding: 2% 5% 5% 5%;
	border-bottom: 8px solid rgb(246, 246, 246);
}
.detail_mobile div {
	font-family: Arial;
}
.category_title_box {
	line-height: 2rem;
	font-size: 1.2rem;
	color: black;
	font-weight: bold;
	text-align: left;
	margin-top: 3%;
	margin-bottom: 4%;
	margin-left: 1%;
}
.category_sub_title {
	font-size: 0.9rem;
	line-height: 1rem;
	color: black;
	font-weight: normal;
	color: rgba(34, 34, 34, 0.5);
}
.row {
	padding: 3px 0px;
}
.content-title {
	text-align: left;
	font-size: 0.9rem;
	color: #333333;
}
.content-content {
	text-align: right;
	white-space: pre-line;
	word-break: break-word;
	padding: 0 0.7% 0.7% 0.7%;
	font-size: 0.9rem;
	color: black;
}
.btn-vote {
	width: 100%;
	margin-top: 4%;
	background: black;
	color: white;
	font-size: 0.9rem;
	font-weight: 400;
	border-radius: 12px;
	height: 40px;
	line-height: inherit;
	text-align: center;
	outline: none;
	border: none;
}
</style>
