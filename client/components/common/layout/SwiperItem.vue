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
					<swiper-slide v-for="content in item_list" :key="content.data.id">
						<nuxt-link :to="{ path: '/product/' + content.data.id }">
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
							</div>
							<div class="item_brand">
								{{ content.brand.name.toUpperCase() }}
							</div>
							<div class="item_title">
								<span>{{ content.data.name }}</span>
							</div>
							<div class="item_detail">
								<div v-if="isValue">
									<div class="item_date_text">최근거래가</div>
									<div class="item_price">
										{{ content.data.recent_trade_price | pricefilter }}
										<span>원</span>
									</div>
								</div>
								<div v-if="display_type === 'A'">
									<div class="item_price">
										{{ content.data.price | pricefilter }} <span>원</span>
									</div>
									<div class="item_price_text">발매가</div>
									<br />
								</div>
								<div v-if="display_type === 'B'">
									<div class="item_date">
										{{ content.data.release_date | datefilter }}
									</div>
									<div class="item_date_text">발매일</div>
								</div>
								<div v-if="display_type === 'C'">
									<div class="item_sell">
										{{ content.data.recent_sells }}개 판매
									</div>
								</div>
								<div v-if="display_type === 'D'">
									<div class="item_sell">
										{{ content.data.raffle_count }}곳 응모중
									</div>
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
import { pricefilter } from '@/utils/pricefilter.js';
import { datefilter } from '@/utils/datefilter.js';
import { imagefilter320 } from '@/utils/imagefilter.js';
export default {
	filters: {
		pricefilter,
		datefilter,
		imagefilter320,
	},
	props: { itemData: { type: Object, required: true } },
	data() {
		return {
			title: '',
			sub_title: '',
			isValue: false,
			display_type: '',
			item_list: [],
			unLogo: require('@/assets/img/no_image_transparent.png'),
			swiperOption: {
				slidesPerView: 'auto',
				spaceBetween: 12,
			},
		};
	},
	mounted() {
		this.title = this.itemData.title;
		this.sub_title = this.itemData.sub_title;
		this.display_type = this.itemData.display_type;
		this.isValue = this.itemData.isValue;
		this.item_list = this.itemData.data;
	},
	methods: {
		replaceByDefault(e) {
			e.target.src = this.unLogo;
		},
	},
};
</script>
<style scoped>
.wrap_swiper {
	padding: 0vh 11px 0px 11px;
	text-align: center;
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
	width: 45% !important;
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
	height: 45%;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.item_time {
	font-size: 12px;
	height: 24px;
}
.item_img {
	height: 150px;
	max-height: 50%;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
}
.item_img img {
	vertical-align: bottom;
	max-width: 90%;
	width: auto;
	max-height: 90%;
}
.item_brand {
	text-align: left;
	margin-top: 1.5vh;
	color: #000000;
	font-size: 0.9rem;
	font-weight: bold;
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
	line-height: 1.2rem;
	margin-top: 0.4rem;
}
.item_detail {
	text-align: left;
	margin-top: 1vh;
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
	font-size: 0.9rem;
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
