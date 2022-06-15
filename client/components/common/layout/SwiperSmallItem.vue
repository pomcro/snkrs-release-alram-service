<template>
	<div class="wrap_swiper">
		<div class="wrap_mobile">
			<client-only>
				<div class="category_title_box">
					<div class="category_title">{{ title }}</div>
					<div class="category_sub_title">{{ sub_title }}</div>
				</div>
			</client-only>
			<client-only>
				<swiper class="swiper" :options="swiperOption">
					<swiper-slide v-for="(content, i) in item_list" :key="i">
						<nuxt-link :to="{ path: '/product/' + content.data.id }">
							<div class="swiper_container">
								<div class="swiper_item">
									<div v-if="content.data.thumbnail" class="item_img">
										<img
											alt="thumbnail_image"
											:src="content.data.thumbnail | imagefilter320"
											@error="replaceByDefault"
										/>
									</div>
									<div v-else class="item_img">
										<img :src="unLogo" alt="notFound_image" />
									</div>
									<div class="item_brand_icon">
										<img
											alt="thumbnail_image"
											:src="content.data.shop.thumbnail"
											@error="replaceByDefault"
										/>
									</div>
									<div class="item_shop_name">{{ content.data.shop.name }}</div>
								</div>
								<div class="item_brand">
									{{ content.brand.name.toUpperCase() }}
								</div>
								<div class="item_title">
									<span>{{ content.data.name }}</span>
								</div>
								<div class="item_time_limit">
									{{ base | updateDiff(content.data.release) }}
								</div>
							</div>
						</nuxt-link>
					</swiper-slide>
				</swiper>
			</client-only>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import { pricefilter } from '@/utils/pricefilter.js';
import { datefilter } from '@/utils/datefilter.js';
import { imagefilter320 } from '@/utils/imagefilter.js';
export default {
	filters: {
		pricefilter,
		datefilter,
		imagefilter320,
		updateDiff(base, release) {
			const date = base * 1000;
			const edDate = moment(release.endAt);
			const stDate = moment(release.startAt);
			const diffed = edDate.diff(moment(date));
			const diffst = stDate.diff(moment(date));

			let current = 0;
			if (diffed > 0 && diffst > 0) {
				current = edDate;
			} else if (diffed > 0) {
				current = edDate;
			} else if (diffst > 0) {
				current = stDate;
			}
			const diff = current - date;

			let result = null;
			if (diff > 0) {
				let h, m, s;
				s = Math.floor(diff / 1000);
				m = Math.floor(s / 60);
				s = s % 60;
				h = Math.floor(m / 60);
				m = m % 60;
				const d = Math.floor(h / 24);
				h = h % 24;
				if (s < 10) s = '0' + s;
				if (m < 10) m = '0' + m;
				if (h < 10) h = '0' + h;
				if (d === 0) {
					result = h + ':' + m + ':' + s;
				} else {
					result = d + '일 ' + h + ':' + m + ':' + s;
				}
			} else {
				result = '응모마감';
			}
			return result;
		},
	},
	props: { itemData: { type: Object, required: true } },
	data() {
		return {
			base: moment().unix(),
			times: '',
			title: '',
			sub_title: '',
			timeleft: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
			isValue: false,
			display_type: '',
			item_list: [],
			unLogo: require('@/assets/img/no_image_transparent.png'),
			swiperOption: {
				slidesPerView: 'auto',
				spaceBetween: 15,
			},
		};
	},
	mounted() {
		this.title = this.itemData.title;
		this.sub_title = this.itemData.sub_title;
		this.display_type = this.itemData.display_type;
		this.isValue = this.itemData.isValue;
		this.item_list = this.itemData.data;
		this.timer();
	},
	beforeDestroy() {
		clearInterval(this.times);
	},
	methods: {
		timer() {
			this.times = setInterval(() => {
				this.base = moment().unix();
			}, 1000);
		},
		replaceByDefault(e) {
			e.target.src = this.unLogo;
		},
	},
};
</script>
<style scoped>
.wrap_swiper {
	padding: 0% 11px 0px 11px;
	text-align: center;
}
.item_brand_icon {
	width: 45px;
	height: 45px;
	border-radius: 100px;
	border: 1px solid #ebebeb;
	display: inline-flex;
	justify-content: center;
}
.item_brand_icon img {
	border-radius: 100px;
	width: 100%;
	object-fit: contain;
	object-position: center;
}
/* 모바일 환경 */
.category_title_box {
	margin: 5% 0px 5% 1%;
	line-height: 2rem;
	font-size: 1.3rem;
	color: black;
	font-weight: bold;
	text-align: left;
}
.category_sub_title {
	font-size: 0.9rem;
	line-height: 1rem;
	color: black;
	font-weight: normal;
	color: rgba(34, 34, 34, 0.5);
}
.swiper {
	z-index: 0;
}
.swiper-slide {
	width: 40% !important;
}
.gourl {
	display: block;
}
.gourl:hover {
	text-decoration: none;
}
.swiper_item {
	font-weight: bold;
	background: rgba(157, 160, 162, 0.09);
	padding: 0 0.3rem;
	height: 140px;
	border-radius: 5px;
	display: block;
	justify-content: center;
	align-items: center;
	margin-bottom: 7%;
}
.item_time {
	font-size: 12px;
	height: 24px;
}
.item_img {
	height: 120px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
}
.item_img img {
	vertical-align: center;
	width: 90%;
}
.item_time_limit {
	text-align: left;
	margin-top: 5%;
	color: red;
	font-size: 0.7rem;
}
.item_shop_name {
	text-align: center;
	color: #000000;
	font-size: 0.9rem;
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	height: 1.2rem;
	margin-top: 0.4rem;
	line-height: 1.2rem;
}
.item_brand {
	text-align: left;
	color: #000000;
	font-size: 0.9rem;
	font-weight: bold;
	margin-top: 60px;
}
.item_title {
	text-align: left;
	color: #333333;
	font-size: 0.9rem;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	height: 2.4rem;
	margin-top: 0.4rem;
	line-height: 1.2rem;
}
.item_detail {
	text-align: left;
	margin-top: 1%;
}
.item_price {
	text-align: left;
	font-size: 1.1rem;
	font-weight: normal;
	overflow: hidden;
	white-space: nowrap;
}
.item_price span {
	font-size: 1.1rem;
}
.item_price_text {
	font-size: 0.8rem;
	color: gray;
	text-align: left;
}
.item_date {
	font-size: 1.1rem;
	color: rgb(0, 0, 0);
	line-height: 1.5em;
	font-family: Arial;
	text-align: left;
	font-weight: normal;
}
.item_date_text {
	font-size: 0.8rem;
	color: gray;
	text-align: left;
}
.item_sell {
	font-size: 0.8rem;
	color: gray;
	text-align: left;
}

.none {
	display: none;
}
</style>
