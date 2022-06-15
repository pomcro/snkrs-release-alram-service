<template>
	<div class="wrap_swiper">
		<div class="item_mobile" :class="$mq">
			<client-only>
				<div class="category_title_box">
					<div class="category_title">RELATED</div>
					<div class="category_sub_title">연관 추천제품</div>
				</div>
			</client-only>
			<client-only>
				<swiper class="swiper" :options="swiperOption">
					<swiper-slide v-for="content in relatedItems" :key="content.data.id">
						<router-link class="gourl" :to="'/product/' + content.data.id">
							<div class="swiper_items">
								<div class="swiper_item">
									<div v-if="content.data.thumbnail" class="item_img">
										<img
											:src="content.data.thumbnail"
											alt="thumnail_image"
											@error="replaceByDefault"
										/>
									</div>
									<div v-else class="item_img">
										<img :src="unLogo" alt="notFound_image" />
									</div>
								</div>
								<div class="item_info">
									<div class="item_brand">{{ content.brand.name }}</div>
									<div class="item_title">{{ content.data.full_name }}</div>
									<div class="item_date">
										{{ content.data.release_date | datefilter }}
									</div>
								</div>
							</div>
						</router-link>
					</swiper-slide>
				</swiper>
			</client-only>
		</div>
	</div>
</template>

<script>
export default {
	filters: {
		datefilter(value) {
			if (!value) return '';
			value = value.toString();
			return value.slice(0, 10);
		},
	},
	props: { relatedItems: { type: Array, required: true } },
	data() {
		return {
			unLogo: require('@/assets/img/no_image_transparent.png'),
			swiperOption: {
				slidesPerView: 'auto',
				spaceBetween: 15,
			},
		};
	},
	methods: {
		replaceByDefault(e) {
			e.target.src = this.unLogo;
		},
	},
};
</script>
<style scoped>
/* 모바일 뷰 */
.item_mobile {
	padding: 2% 5% 5% 5%;
	border-bottom: 8px solid rgb(246, 246, 246);
}
/* 모바일 환경 */
.category_title_box {
	line-height: 2rem;
	font-size: 1.2rem;
	color: black;
	font-weight: bold;
	text-align: left;
	margin-top: 3%;
	margin-bottom: 2%;
	margin-left: 1%;
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
	color: black;
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
	display: flex;
	justify-content: center;
	align-items: center;
}
.item_created {
	font-size: 0.75rem;
	color: black;
	font-weight: bold;
}
.item_img {
	height: 150px;
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
	margin-top: 1%;
	color: #000000;
	font-size: 0.9rem;
	font-weight: bold;
	height: 24px;
}
.item_title {
	text-align: left;
	color: #333333;
	font-size: 0.8rem;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2; /* number of lines to show */
	-webkit-box-orient: vertical;
	height: 2.8em;
	line-height: 1.4em;
}
.item_title span {
	margin-top: 0.5%;
	font-weight: normal;
}
.item_date {
	margin-top: 0.5%;
	font-size: 0.75rem;
	color: rgb(0, 0, 0);
	line-height: 1.5em;
	font-family: Arial;
	text-align: left;
	font-weight: normal;
}
.none {
	display: none;
}
</style>
