<template>
	<div>
		<div class="timeline">
			<div class="date">
				<client-only>
					<swiper
						ref="mySwiper"
						class="swiper"
						:options="swiperOption"
						@ready="handleSwiperReadied"
						@click-slide="handleClickSlide"
					>
						<swiper-slide>JAN</swiper-slide>
						<swiper-slide>FEB</swiper-slide>
						<swiper-slide>MARCH</swiper-slide>
						<swiper-slide>APRIL</swiper-slide>
						<swiper-slide>MAY</swiper-slide>
						<swiper-slide>JUNE</swiper-slide>
						<swiper-slide>JULY</swiper-slide>
						<swiper-slide>AUG</swiper-slide>
						<swiper-slide>SEP</swiper-slide>
						<swiper-slide>OCT</swiper-slide>
						<swiper-slide>NOVEM</swiper-slide>
						<swiper-slide>DEC</swiper-slide>
					</swiper>

					<div
						v-for="(timelines, index) in nowTimeline"
						:key="timelines.id"
						:class="{ none: !timelines.flag }"
					>
						<!-- 달 에 따라서 반복문 접근   -->
						<!-- 카테고리 등록 swiper -->
						<!-- <span>{{ index }}</span> -->
						<swiper
							v-if="timelines.data.brand !== []"
							ref="mySwiper2"
							class="swiper2"
							:options="swiperOption2"
							@click-slide="handleClickSlide2"
						>
							<swiper-slide ref="first_slide" :class="{ now_swiper: !prevchek }"
								><span class="sort_brand">All</span></swiper-slide
							>
							<swiper-slide
								v-for="brand in timelines.data.brand"
								:key="brand.id"
								><span class="sort_brand">{{ brand.name }}</span></swiper-slide
							>
							<div
								ref="prev_btn"
								slot="button-prev"
								class="swiper-button-prev2"
							></div>
							<div
								ref="next_btn"
								slot="button-next"
								class="swiper-button-next2"
							></div>
						</swiper>
						<div v-if="release_list.length === 12">
							<div :class="{ none: !release_list[index][0] }">
								<div v-if="timeline !== ''" style="margin-top: 3%">
									<div
										v-for="(value, index2) in timeline"
										:key="value.day"
										class="newsletter"
									>
										<div
											v-if="index2 === 0"
											data-text-content="true"
											class="letter_on"
										></div>
										<div
											v-else
											class="letter_off"
											data-text-content="true"
										></div>
										<div class="letter_date">
											{{ value.day }}일
											<div class="date_day">
												{{ value.data[0].updated_time | dayNameFilter }}요일
											</div>
										</div>
										<div
											v-for="val in value.data"
											:key="val.id"
											class="aside_letter"
										>
											<nuxt-link :to="{ path: '/product/' + val.product.id }">
												<div v-if="val.product.thumbnail" class="letter_img">
													<img
														alt="thumnail_image"
														:src="val.product.thumbnail"
														@error="replaceByDefault"
													/>
												</div>
												<div v-else class="letter_img">
													<img :src="unLogo" alt="notFound_image" />
												</div>
												<div class="letter_content">
													<div class="content_title">
														<img
															alt="thumnail_image"
															:src="val.shop.thumbnail"
															@error="replaceByDefault"
														/>
														{{ val.shop.name }}
													</div>
													<div class="content_brand">
														{{ val.product.name }}
													</div>
													<div class="content_date">
														{{ val.updated_time | timeSince }}
													</div>
												</div>
											</nuxt-link>
										</div>
									</div>
								</div>
								<div style="clear: both"></div>
							</div>
							<div
								v-for="(brand, i) in timelines.data.brand"
								:key="brand.id"
								:class="{ none: !release_list[index][i + 1] }"
							>
								<!-- 날짜 정렬을 해서 주던가, -->
								<div style="margin-top: 3%">
									<div
										v-for="(content, today) in brand.content"
										:key="content.id"
										class="newsletter"
									>
										<div
											v-if="today === 0"
											data-text-content="true"
											class="letter_on"
										></div>
										<div
											v-else
											class="letter_off"
											data-text-content="true"
										></div>
										<div class="letter_date">
											{{ content.day }}일
											<div class="date_day">
												{{ content.date | dayNameFilter }}요일
											</div>
										</div>
										<div
											v-for="item in content.content"
											:key="Math.random() + item"
											class="aside_letter"
										>
											<nuxt-link :to="{ path: '/product/' + item.product.id }">
												<div v-if="item.product.thumbnail" class="letter_img">
													<img
														alt="thumnail_image"
														:src="item.product.thumbnail"
														@error="replaceByDefault"
													/>
												</div>
												<div v-else class="letter_img">
													<img :src="unLogo" alt="notFound_image" />
												</div>
												<div class="letter_content">
													<div class="content_title">
														<img
															alt="thumnail_image"
															:src="item.shop.thumbnail"
															@error="replaceByDefault"
														/>
														{{ item.shop.name }}
													</div>
													<div class="content_brand">
														{{ item.product.name }}
													</div>
													<div class="content_date">
														{{ item.updated_time | timeSince }}
													</div>
												</div>
											</nuxt-link>
										</div>
									</div>
								</div>

								<div style="clear: both"></div>
							</div>
						</div>
					</div>
					<infinite-loading spinner="spiral" @infinite="infiniteHandler">
					</infinite-loading>
				</client-only>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
import { timeSince, dayNameFilter } from '@/utils/datefilter.js';
export default {
	filters: {
		timeSince,
		dayNameFilter,
	},
	props: { asyncTimeline: { type: Object, required: true } },
	data() {
		return {
			cursor: 2,
			unLogo: require('@/assets/img/no_image_transparent.png'),
			swiperOption: {
				slidesPerView: 3,
				centeredSlides: true,
				freeMode: true,
				grabCursor: true,
			},
			prevDateSwiper: '',
			monthNow: -1,
			// 달에 따라 바뀌는 것!
			timeline: '',
			ready: false,
			nowTimeline: [
				{ flag: false, data: { brand: [] } },
				{ flag: false, data: { brand: [] } },
				{ flag: false, data: { brand: [] } },
				{ flag: false, data: { brand: [] } },
				{ flag: false, data: { brand: [] } },
				{ flag: false, data: { brand: [] } },
				{ flag: false, data: { brand: [] } },
				{ flag: false, data: { brand: [] } },
				{ flag: false, data: { brand: [] } },
				{ flag: false, data: { brand: [] } },
				{ flag: false, data: { brand: [] } },
				{ flag: false, data: { brand: [] } },
			],
			// 카테고리 관련 데이터
			prevchek: false,
			prev: '',
			swiperOption2: {
				slidesPerView: 'auto',
				freeMode: true,
				grabCursor: true,
				navigation: {
					nextEl: '.swiper-button-next2',
					prevEl: '.swiper-button-prev2',
				},
			},
			release_list: [],
		};
	},
	beforeMount() {
		// 달력 슬라이드 관련 소스
		const month = moment().month();
		this.monthNow = month;
		this.nowTimeline[month].flag = true;
		// 카테고리 슬라이드 관련 소스
		this.prev = 'first';

		for (let i = 0; i < 12; i++) {
			this.release_list.push([
				true,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			]);
		}
	},
	methods: {
		infiniteHandler($state) {
			setTimeout(async () => {
				const data = await this.$axios.$get(
					'timeline?y=' +
						moment().year() +
						'&m=' +
						(this.monthNow + 1) +
						'&cursor=' +
						this.cursor++,
				);
				if (data.items.length) {
					$state.loaded();

					for (let idx = 0; idx < data.items.length; idx++) {
						const id = data.items[idx].day;
						const item = data.items[idx].data;

						let tflag = false;
						// 인피니티 스크롤링으로 ALL 카테고리 추가하는 것
						for (let idx2 = 0; idx2 < this.timeline.length; idx2++) {
							const day2 = this.timeline[idx2].day;
							if (day2 === id) {
								this.timeline[idx2].data.push(...item);
								tflag = true;
							}
						}
						if (!tflag) {
							this.timeline.push(data.items[idx]);
						}
						// ALL카테고리가 아닌 나머지 카테고리에 데이터 추가하는 로직
						for (let i = 0; i < item.length; i++) {
							let flag = false;
							let idx = -1;
							for (
								let j = 0;
								j < this.nowTimeline[this.monthNow].data.brand.length;
								j++
							) {
								if (
									this.nowTimeline[this.monthNow].data.brand[j].name ===
									item[i].brand.name
								) {
									flag = true;
									idx = j;
									break;
								}
							}
							if (!flag) {
								this.nowTimeline[this.monthNow].data.brand.push({
									name: item[i].brand.name,
									content: [
										{
											day: id,
											date: item[0].updated_time,
											content: [item[i]],
										},
									],
								});
							} else {
								let flag2 = false;
								for (
									let j = 0;
									j <
									this.nowTimeline[this.monthNow].data.brand[idx].content
										.length;
									j++
								) {
									if (
										this.nowTimeline[this.monthNow].data.brand[idx].content[j]
											.day === id
									) {
										flag2 = true;
										this.nowTimeline[this.monthNow].data.brand[idx].content[
											j
										].content.push(item[i]);
										break;
									}
								}
								if (!flag2) {
									this.nowTimeline[this.monthNow].data.brand[idx].content.push({
										day: id,
										date: item[0].updated_time,
										content: [item[i]],
									});
								}
							}
						}
					}
				} else {
					$state.complete();
				}
			}, 1500);
		},
		replaceByDefault(e) {
			e.target.src = this.unLogo;
		},
		// 달력 클릭 관련 소스
		async handleClickSlide(index) {
			if (index === undefined) {
				return;
			}
			if (this.$refs.mySwiper.$swiper.slides[index] === this.prevDateSwiper) {
				return;
			}
			if (this.prevDateSwiper.classList === undefined) {
				return;
			}
			// 카테고리 관련 소스
			const releaseListTmp = [true];
			for (let i = 0; i < this.release_list.length - 1; i++) {
				releaseListTmp.push(false);
			}
			if (this.monthNow > -1) {
				this.release_list[this.monthNow] = releaseListTmp;
			}
			this.prevchek = false;
			if (this.prev !== '' && this.prev !== 'first') {
				this.prev.classList.remove('now_swiper');
				this.prev = '';
			}
			// 현재 클릭된 달이 언제인지 저장
			this.monthNow = index;
			// const dateSwiper = [];
			for (let i = 0; i < this.nowTimeline.length; i++) {
				this.nowTimeline[i].flag = false;
			}
			this.nowTimeline[index].flag = true;
			// this.dateLists = dateSwiper;
			this.prevDateSwiper.classList.remove('now_swiper');
			this.prevDateSwiper = '';

			const nowswiper = this.$refs.mySwiper.$swiper.slides[index];
			this.prevDateSwiper = nowswiper;
			nowswiper.classList.add('now_swiper');
			const year = moment().year();
			const month = index + 1;
			if (this.ready) {
				this.$nuxt.$loading.start();
				try {
					const data = await this.$axios.$get(
						'timeline?y=' + year + '&m=' + month,
					);
					this.timeline = data.items;
					for (let idx = 0; idx < data.items.length; idx++) {
						const id = data.items[idx].day;
						const item = data.items[idx].data;
						for (let i = 0; i < item.length; i++) {
							let flag = false;
							let idx = -1;
							for (
								let j = 0;
								j < this.nowTimeline[this.monthNow].data.brand.length;
								j++
							) {
								if (
									this.nowTimeline[this.monthNow].data.brand[j].name ===
									item[i].brand.name
								) {
									flag = true;
									idx = j;
									break;
								}
							}
							if (!flag) {
								this.nowTimeline[this.monthNow].data.brand.push({
									name: item[i].brand.name,
									content: [
										{
											day: id,
											date: item[0].updated_time,
											content: [item[i]],
										},
									],
								});
							} else {
								let flag2 = false;
								for (
									let j = 0;
									j <
									this.nowTimeline[this.monthNow].data.brand[idx].content
										.length;
									j++
								) {
									if (
										this.nowTimeline[this.monthNow].data.brand[idx].content[j]
											.day === id
									) {
										flag2 = true;
										this.nowTimeline[this.monthNow].data.brand[idx].content[
											j
										].content.push(item[i]);
										break;
									}
								}
								if (!flag2) {
									this.nowTimeline[this.monthNow].data.brand[idx].content.push({
										day: id,
										date: item[0].updated_time,
										content: [item[i]],
									});
								}
							}
						}
					}
					this.$refs.mySwiper.$swiper.slideTo(index, 1000, false);
					this.$nuxt.$loading.finish();
				} catch (e) {
					console.log(e);
				}
			}
		},
		handleSwiperReadied(e) {
			this.$nuxt.$loading.start();
			const month = moment().month();
			this.monthNow = month;
			this.$refs.mySwiper.$swiper.slideTo(month, 0, false);

			const data = this.asyncTimeline;
			try {
				this.timeline = data.items;
				for (let idx = 0; idx < data.items.length; idx++) {
					const id = data.items[idx].day;
					const item = data.items[idx].data;
					for (let i = 0; i < item.length; i++) {
						let flag = false;
						let idx = -1;
						for (
							let j = 0;
							j < this.nowTimeline[this.monthNow].data.brand.length;
							j++
						) {
							if (
								this.nowTimeline[this.monthNow].data.brand[j].name ===
								item[i].brand.name
							) {
								flag = true;
								idx = j;
								break;
							}
						}
						if (!flag) {
							this.nowTimeline[this.monthNow].data.brand.push({
								name: item[i].brand.name,
								content: [
									{ day: id, date: item[0].updated_time, content: [item[i]] },
								],
							});
						} else {
							let flag2 = false;
							for (
								let j = 0;
								j <
								this.nowTimeline[this.monthNow].data.brand[idx].content.length;
								j++
							) {
								if (
									this.nowTimeline[this.monthNow].data.brand[idx].content[j]
										.day === id
								) {
									flag2 = true;
									this.nowTimeline[this.monthNow].data.brand[idx].content[
										j
									].content.push(item[i]);
									break;
								}
							}
							if (!flag2) {
								this.nowTimeline[this.monthNow].data.brand[idx].content.push({
									day: id,
									date: item[0].updated_time,
									content: [item[i]],
								});
							}
						}
					}
				}

				const nowswiper = this.$refs.mySwiper.$swiper.slides[month];
				this.prevDateSwiper = nowswiper;
				nowswiper.classList.add('now_swiper');
			} catch (e) {
				console.log(e);
			}
			this.ready = true;
			this.$nuxt.$loading.finish();
		},
		// 카테고리 슬라이드
		handleClickSlide2(index) {
			if (index === undefined) {
				return;
			}
			// index와 우리가 몇월달에서 여기 들어가는지를 알아야함 그래야 둘다 파악이 가능합니다.
			// 몇달인지 알려면 monthNow
			const releaseListTmp = [];
			for (let i = 0; i < this.release_list.length; i++) {
				releaseListTmp.push(false);
			}
			releaseListTmp[index] = true;
			Vue.set(this.release_list, this.monthNow, releaseListTmp);
			// 클릭시 해당 제외 클릭 포함
			if (this.prev !== '' && this.prev !== 'first') {
				this.prev.classList.remove('now_swiper');
				this.prev = '';
			}
			// 이미지 슬라이더 이동
			this.$refs.mySwiper2[this.monthNow].$swiper.slideTo(
				index - 1,
				1000,
				false,
			);
			const nowswiper = this.$refs.mySwiper2[this.monthNow].$swiper.slides[
				index
			];
			nowswiper.classList.add('now_swiper');
			this.prev = nowswiper;
			// 처음일때 all on
			if (index === 0) {
				this.prevchek = false;
			} else {
				this.prevchek = true;
			}
		},
	},
};
</script>

<style scoped>
.timeline {
	padding-top: 110px;
}
.date {
	padding-top: 4%;
}
.swiper .swiper-slide {
	color: rgb(190, 190, 190);
	font-size: 1.5rem;
	height: 8%;
}
.swiper .swiper-slide-active {
	text-align: center;
}
.swiper .now_swiper {
	font-weight: bold;
	font-size: 1.8rem;
	vertical-align: top;
	color: black;
}
.swiper .swiper-slide-next {
	text-align: right;
}

/* 카테고리 슬라이더 */
.swiper2 {
	padding: 4% 4%;
}
.swiper2 .swiper-slide {
	width: auto;
	line-height: 25px;
	padding: 0.2rem 0.8rem;
}
.swiper2 .sort_brand {
	font-size: 0.75rem;
	color: #6e6d7a;
}
.swiper2 .now_swiper {
	color: black;
	border-radius: 5px;
	background: rgba(13, 12, 34, 0.05);
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
	display: none;
}
.swiper2 .swiper-button-prev {
	left: 0;
	color: #6e6d7a;
	font-weight: bold;
	background: white;
	opacity: 0.9;
}
.swiper2 .swiper-button-next {
	right: 0;
	font-weight: bold;
	color: #6e6d7a;
	background: white;
	opacity: 0.9;
}
.swiper2 .swiper-button-prev,
.swiper-button-next {
	top: 55%;
}
.swiper2 .swiper-button-prev:after,
.swiper-button-next:after {
	font-size: 14px;
	opacity: 1;
}
.none {
	display: none;
}
.newsletter {
	text-align: left;
	margin-left: 4%;
	margin-bottom: 5%;
}
.newsletter > div {
	margin-right: 3%;
	vertical-align: top;
	margin-bottom: 3%;
}
.aside_letter {
	/* width: 68vw;
  float: right; */
	height: 100%;
	padding-left: 20%;
}
.aside_letter .letter_img {
	/*margin-right: 8vw;*/
	display: inline-grid;
	align-items: center;
}
.aside_letter .letter_content {
	vertical-align: top;
	display: inline-block;
}
.letter_date {
	font-size: 20px;
	text-align: left;
	font-weight: bold;
	line-height: 18px;
	float: left;
}
.date_day {
	margin-top: 4px;
	font-size: 12px;
	color: rgb(190, 190, 190);
	font-weight: normal;
}

.letter_img {
	width: 90px;
	height: 90px;
	background: rgba(157, 160, 162, 0.09);
	padding: 0 0.5rem;
	border-radius: 5px;
}
.letter_img img {
	width: 100%;
}
.letter_on {
	margin-top: 3px;
	width: 8px;
	height: 8px;
	border-radius: 100%;
	background-color: rgb(0, 110, 255);
	float: left;
}
.letter_off {
	margin-top: 3px;
	width: 8px;
	height: 8px;
	border-radius: 100%;
	background-color: white;
	float: left;
}
.letter_content {
	font-weight: bold;
	text-align: left;
	overflow: hidden;
	word-break: normal;
	color: black;
	font-size: 12px;
	width: 60%;
	margin-left: 2%;
}
.letter_content img {
	border-radius: 100%;
	width: 16px;
	height: 16px;
	margin-right: 4px;
	object-fit: contain;
	object-position: center;
}
.content_title {
	display: flex;
	line-height: 1.3em;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1; /* number of lines to show */
	-webkit-box-orient: vertical;
}
.content_brand {
	font-weight: normal;
	margin-top: 4.5%;
	height: 2.6em;
	line-height: 1.3em;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2; /* number of lines to show */
	-webkit-box-orient: vertical;
}
.content_date {
	font-weight: normal;
	margin-top: 16px;
	color: rgb(158, 158, 158);
}
</style>
