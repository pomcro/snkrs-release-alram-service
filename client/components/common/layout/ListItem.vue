<template>
	<div class="wrap_list">
		<div class="list_mobile">
			<client-only>
				<div class="category_title_box">
					<div class="category_title">RELEASE SOON</div>
					<div class="category_sub_title">발매예정 스니커즈</div>
				</div>
			</client-only>
			<!-- 캐싱 작업 필요  -->
			<template v-if="category.length !== 0">
				<div class="list_items">
					<swiper
						ref="mySwiper"
						class="swiper"
						:options="swiperOption"
						@click-slide="handleClickSlide"
					>
						<swiper-slide ref="first_slide" :class="{ now_swiper: !prevchek }"
							><span class="sort_brand">All</span></swiper-slide
						>
						<swiper-slide v-for="categor in category" :key="categor.title"
							><span class="sort_brand">{{ categor.title }}</span></swiper-slide
						>
						<div
							ref="prev_btn"
							slot="button-prev"
							class="swiper-button-prev"
						></div>
						<div
							ref="next_btn"
							slot="button-next"
							class="swiper-button-next"
						></div>
					</swiper>
					<div
						:class="{ none: release_list[0] === false }"
						style="text-align:left"
					>
						<div
							v-for="content in fourAll"
							:key="content.data.id"
							class="release_items"
						>
							<nuxt-link :to="{ path: '/product/' + content.data.id }">
								<div class="release_item">
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
								<div class="item_date">
									{{ content.data.release_date | simpledatefilter }}
								</div>
								<div class="item_date_text">발매일</div>
								<br />
							</nuxt-link>
						</div>
					</div>
					<div
						v-for="(categor, index) in category"
						:key="categor.title"
						:class="{ none: !release_list[index + 1] }"
						style="text-align:left"
					>
						<div
							v-for="content in categor.content"
							:key="content.src"
							class="release_items"
						>
							<nuxt-link :to="{ path: '/product/' + content.data.id }">
								<div class="release_item">
									<div v-if="content.data.thumbnail" class="item_img">
										<img
											alt="thumbnail_image"
											:src="content.data.thumbnail | imagefilter320"
											@error="replaceByDefault"
										/>
									</div>
									<div v-else class="item_img">
										<img :src="unLogo" alt="notFound_img" />
									</div>
								</div>
								<div class="item_brand">
									{{ content.brand.name.toUpperCase() }}
								</div>
								<div class="item_title">
									<span>{{ content.data.name }}</span>
								</div>
								<div class="item_date">
									{{ content.data.release_date | simpledatefilter }}
								</div>
								<div class="item_date_text">발매일</div>
								<br />
							</nuxt-link>
						</div>
					</div>
					<div class="more_info">
						<nuxt-link :to="{ path: 'list', query: { p: '1' } }"
							>더보기</nuxt-link
						>
					</div>
				</div>
			</template>
			<div></div>
		</div>
	</div>
</template>

<script>
import { simpledatefilter } from '@/utils/datefilter.js';
import { imagefilter320 } from '@/utils/imagefilter.js';
export default {
	filters: {
		simpledatefilter,
		imagefilter320,
	},
	props: { itemData: { type: Object, required: true } },
	data() {
		return {
			unLogo: require('@/assets/img/no_image_transparent.png'),
			title: '',
			sub_title: '',
			item_list: [],
			fourAll: [],
			category: [],
			release_list: [true],
			prevchek: false,
			prev: '',
			swiperOption: {
				slidesPerView: 'auto',
				freeMode: true,
				grabCursor: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			},
		};
	},
	mounted() {
		this.prev = 'first';
		// releaseInfo 를 기점으로 카테고리를 분리합니다.
		// 상태관리에서 가져오는데 시간이 걸리기떄문에 구해지면 settimeout을 멈추는것도 괜찮습니다.
		// 데이터 불러온거에서 6개 만 출력하는 fourAll과 카테고리를 정립하는 것
		this.title = this.itemData.title;
		this.sub_title = this.itemData.sub_title;
		this.item_list = this.itemData.data;
		if (this.item_list !== '') {
			for (let i = 0; i < this.item_list.length; i++) {
				// 4개만 출력함
				if (i < 4) {
					this.fourAll.push(this.item_list[i]);
				}
				let flag = true;
				for (let j = 0; j < this.category.length; j++) {
					if (this.category[j].title === this.item_list[i].brand.name) {
						flag = false;
						// view more에서 전체 뿌려주기
						if (this.category[j].content.length < 6) {
							this.category[j].content.push(this.item_list[i]);
						}
						break;
					}
				}
				if (flag) {
					this.category.push({
						id: this.item_list[i].brand.id,
						title: this.item_list[i].brand.name,
						content: [this.item_list[i]],
					});
				}
				// 카페고리 배열에 해당 내역이 있으면 출력 x
			}
			this.category.sort((a, b) => {
				if (a.id > b.id) {
					return 1;
				} else {
					return -1;
				}
			});
		}
		// 홀수개거나 4개보다 작으면 4개까지 빈 값으로 채워주기

		// 카테고리 수와 스위퍼를 연결하는 곳
		const num = this.category.length;
		for (let i = 0; i < num; i++) {
			this.release_list.push(false);
		}
	},

	methods: {
		replaceByDefault(e) {
			e.target.src = this.unLogo;
		},
		handleClickSlide(index) {
			if (index === undefined) {
				return;
			}
			// 버튼 누르면 toggle 되는거
			const categorys = this.category.length;
			const categorylist = [];
			for (let i = 0; i < categorys; i++) {
				categorylist.push(false);
			}
			categorylist[index] = true;
			this.release_list = categorylist;

			// 처음일때 all on
			if (index === 0) {
				this.prevchek = false;
			}
			// 클릭시 해당 제외 클릭 포함
			if (this.prev !== '' && this.prev !== 'first') {
				this.prev.classList.remove('now_swiper');
				this.prev = '';
			}
			// 이미지 슬라이더 이동
			this.$refs.mySwiper.$swiper.slideTo(index - 1, 1000, false);
			const nowswiper = this.$refs.mySwiper.$swiper.slides[index];
			nowswiper.classList.add('now_swiper');
			this.prev = nowswiper;
			this.prevchek = true;
		},
	},
};
</script>

<style scoped>
/* 기본설정 */
.wrap_list {
	text-align: center;
	font-size: 1.3rem;
	font-weight: bold;
}
.list_mobile {
	margin-top: 2%;
}
.category_title_box {
	margin: 5% 0px 5% 1%;
	padding: 0% 11px 0px 11px;
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
.sorted {
	font-size: 0.75rem;
	color: #333333;
	font-weight: 300;
}
.list_items {
	padding: 0 1% 0 1%;
	font-size: 0.625rem;
	color: #6e6d7a;
	margin-bottom: 1%;
}
.swiper {
	z-index: 0;
	margin-bottom: 2%;
	margin-right: 3%;
	margin-left: 3%;
}
.sort_brand {
	font-size: 0.75rem;
}
.swiper-slide {
	width: auto;
	padding: 0.5rem 0.7rem;
}
.now_swiper {
	color: black;
	border-radius: 10px;
	background: rgba(13, 12, 34, 0.05);
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
	display: none;
}
.swiper-button-prev {
	left: 0;
	color: #6e6d7a;
	background: white;
	opacity: 0.9;
}
.swiper-button-next {
	right: 0;
	color: #6e6d7a;
	background: white;
	opacity: 0.9;
}
.swiper-button-prev,
.swiper-button-next {
	top: 55%;
}
.swiper-button-prev:after,
.swiper-button-next:after {
	font-size: 14px;
	opacity: 1;
}

.release_items {
	text-align: center;
	cursor: pointer;
	font-weight: normal;
	margin: 0.3rem 1.5% 0.3rem 1.5%;
	display: inline-block;
	width: 47%;
}
.release_item {
	font-weight: bold;
	background: rgba(157, 160, 162, 0.09);
	padding: 0 0.3rem;
	height: 44%;
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
	margin-top: 4%;
	color: #000000;
	font-size: 0.8rem;
	font-weight: bold;
}
.item_title {
	text-align: left;
	color: #333333;
	font-size: 0.8rem;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	height: 2.4rem;
	margin-top: 1%;
	line-height: 1.2rem;
}
.item_date {
	text-align: left;
	font-size: 0.9rem;
	font-weight: normal;
	overflow: hidden;
	white-space: nowrap;
	margin-top: 3%;
	color: black;
}

.item_date_text {
	font-size: 0.8rem;
	color: gray;
	text-align: left;
}
.more_info {
	margin-top: 2%;
	font-size: 0.9rem;
	color: #333333;
	text-decoration: underline;
}
.more_info a {
	color: #333333;
}
.none {
	display: none;
}
</style>
