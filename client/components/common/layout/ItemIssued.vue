<template>
	<div class="wrap">
		<div class="items_mobile">
			<div v-if="time.message_data.indexOf('-1') > -1" class="release_soon">
				<div class="title">
					{{ itemData.message.title | datachkfilter }}
				</div>
				<div class="time">{{ time.message_data | datachkfilter }}</div>
				<div class="message">
					{{ itemData.message.message | datachkfilter }}
				</div>
			</div>
			<swiper
				v-show="item_list"
				ref="mySwiper"
				class="swiper itemsimg"
				:style="
					time.message_data.indexOf('-1') > -1
						? 'padding-top: 10vh;'
						: 'padding-top: 2vh;'
				"
				:options="swiperOption"
				:auto-update="true"
				:auto-destroy="true"
				@slideChange="hello"
			>
				<swiper-slide
					v-for="(info, index) in item_list"
					:key="info.data.id"
					:class="'slide-' + index"
					:style="'z-index:' + index"
				>
					<div class="item_info">
						<div class="item_now">
							<div style="font-size:0.75rem;font-weight:bold">RELEASE ON</div>
							{{ time.time_data | datachkfilter }}
						</div>
						<div class="item_time">
							<span style="padding:0 2.2%;">DAYS</span
							><span style="padding:0 2.2%;">HOURS</span
							><span style="padding:0 2.2%;;">MINS</span
							><span style="padding:0 2.2%;">SECS</span>
						</div>
						<div v-if="info.data.thumbnail" class="item_img">
							<img
								alt="thumbnail_image"
								:src="info.data.thumbnail | imagefilter640"
								@error="replaceByDefault"
							/>
						</div>
						<div v-else class="item_img">
							<img :src="unLogo" alt="notFound_image" />
						</div>
						<div class="item_title">
							{{ info.data.full_name | datachkfilter }}
						</div>
						<div class="item_colorway">
							{{ info.data.colorway | datachkfilter }}
						</div>
					</div>
					<div class="item_type_box">
						<div class="item_raffle">
							<nuxt-link :to="{ path: '/product/' + info.data.id }"
								>응모하기</nuxt-link
							>
						</div>
						<div v-if="!info.user.isSaved" class="item_favorite">
							<a @click="goSave(index, info.data.id)">
								관심등록
							</a>
						</div>
						<div v-else class="item_favorite">
							<a @click="goUnSave(index, info.data.id)">
								삭제
							</a>
						</div>
					</div>
				</swiper-slide>
				<div slot="button-prev" class="swiper-button-prev"></div>
				<div slot="button-next" class="swiper-button-next"></div>
				<!-- <div
          class="swiper-pagination swiper-pagination-bullets"
          style="padding-bottom:1vh;"
          slot="pagination"
        ></div> -->
			</swiper>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import { imagefilter640 } from '@/utils/imagefilter.js';
export default {
	filters: {
		imagefilter640,
		datachkfilter(value) {
			if (value === undefined) {
				return 'NULL';
			}
			return value;
		},
	},
	props: { itemData: { type: Object, required: true } },
	data() {
		return {
			unLogo: require('@/assets/img/no_image_transparent.png'),
			item_list: [],
			swiperOption: {
				effect: 'fade',
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				// pagination: {
				//   el: '.swiper-pagination',
				//   type: 'fraction',
				// },
			},
			times: '',
			time: {
				time_data: 'Load...',
				message_data: '출시 예정일 입니다.',
			},
			message_time: '',
		};
	},
	mounted() {
		this.item_list = this.itemData.data;
		this.start();
	},
	destroyed() {
		clearInterval(this.times);
		clearInterval(this.message_time);
	},
	methods: {
		goSave(index, id) {
			if (!this.$store.state.isLogin) {
				if (confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?')) {
					this.$router.push({
						path: '/login',
					});
				}
				return;
			}
			this.$axios.$post('/prod/' + id + '/save');
			this.$ga.event({
				eventCategory: 'main',
				eventAction: 'save product',
				eventLabel: 'product_id : ' + id,
				eventValue: 1,
			});
			this.item_list[index].user.isSaved = true;
		},
		goUnSave(index, id) {
			if (!this.$store.state.isLogin) {
				if (confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?')) {
					this.$router.push({
						path: '/login',
					});
				}
				return;
			}
			this.$ga.event({
				eventCategory: 'main',
				eventAction: 'unsave product',
				eventLabel: 'product_id : ' + id,
				eventValue: 0,
			});
			this.$axios.$post('/prod/' + id + '/unsave');
			this.item_list[index].user.isSaved = false;
		},
		replaceByDefault(e) {
			e.target.src = this.unLogo;
		},
		timeDiff(item, date) {
			const stDate = moment();
			const edDate = moment(date);
			const remainDate = edDate - stDate;
			// this.time = remainDate;
			if (remainDate > 0) {
				let days = Math.floor(remainDate / (1000 * 60 * 60 * 24));
				let hours = Math.floor(
					(remainDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
				);
				let miniutes = Math.floor(
					(remainDate % (1000 * 60 * 60)) / (1000 * 60),
				);
				let seconds = Math.floor((remainDate % (1000 * 60)) / 1000);
				days = days < 10 ? '0' + days : days;
				hours = hours < 10 ? '0' + hours : hours;
				miniutes = miniutes < 10 ? '0' + miniutes : miniutes;
				seconds = seconds < 10 ? '0' + seconds : seconds;
				const m = days + ' : ' + hours + ' : ' + miniutes + ' : ' + seconds;
				this.time[item] = m;
				return true;
			} else {
				this.time[item] = '출시 예정일 입니다.';
				return false;
			}
		},
		hello(a) {
			clearInterval(this.times);
			this.times = '';
			this.time_data = 'Load..';
			const activeIndex = this.$refs.mySwiper.$swiper.activeIndex;
			const date = this.item_list[activeIndex].data.release_date;
			this.timeDiff('time_data', date);
			this.times = setInterval(() => {
				const data = this.timeDiff('time_data', date);
				if (data === false) {
					clearInterval(this.times);
				}
			}, 1000);
		},
		start() {
			// utils로 이동
			const date = this.item_list[0].data.release_date;
			this.timeDiff('time_data', date);
			this.times = setInterval(() => {
				const data = this.timeDiff('time_data', date);
				if (data === false) {
					clearInterval(this.times);
				}
			}, 1000);

			const messageDate = this.itemData.message.end_date;
			this.timeDiff('message_data', messageDate);
			this.message_time = setInterval(() => {
				const data = this.timeDiff('message_data', messageDate);
				if (data === false) {
					clearInterval(this.message_time);
				}
			}, 1000);
		},
	},
};
</script>

<style scoped>
.wrap {
	width: 100%;
	padding: 97px 0vw 0px 0vw;
	min-height: 500px;
	text-align: center;
}
/* 모바일 환경 */
.release_soon {
	opacity: 0.85;
	position: fixed;
	top: 96px;
	width: 100%;
	z-index: 1;
	background: black;
	font-weight: bold;
	color: white;
	height: 11vh;
}
.release_soon .title {
	padding: 1vh 0;
	font-size: 12px;
	color: rgb(255, 255, 255);
}
.release_soon .time {
	font-size: 4vh;
	line-height: 6vh;
	color: rgb(255, 255, 255);
}
.waiting {
	margin-top: 4vh;
	display: block;
	font-size: 1.5rem;
	font-weight: bold;
}
.fixedWindowMargin {
	margin-top: 11vh;
}
.swiper {
	z-index: 0;
}
.item_img {
	overflow: hidden;
	height: 25vh;
	max-width: 100%;
	margin-top: 5%;
	width: auto;
	display: flex;
	justify-content: center;
	align-items: center;
}
.item_img img {
	vertical-align: bottom;
}
.items_mobile {
	height: 100%;
	background: rgb(248, 248, 248);
}
.item_info {
	margin-top: 1vh;
}
.item_info img {
	overflow: hidden;
	max-width: 70%;
	max-height: 85%;
}
.item_title {
	color: rgb(30, 30, 30);
	font-weight: bold;
	font-size: 1.6rem;
	overflow: hidden;
	width: 80%;
	margin: 0 0 1vh 5vh;
	overflow: hidden;
	text-overflow: ellipsis;
	height: 4rem;
	line-height: 2rem;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	text-align: left;
}
.item_colorway {
	max-height: 20px;
	min-height: 20px;
	overflow: hidden;
	font-size: 0.9rem;
	margin-bottom: 2vh;
	color: rgb(94, 94, 94);
	margin: 0vh 0 1vh 5vh;
	text-align: left;
}
.item_type_box {
	display: flex;
	margin: 3vh 0vh 3vh 5vh;
}
.item_type_box div {
	cursor: pointer;
	width: 34%;
	border-radius: 28px;
	padding: 0.8rem 0.8rem;
}
.item_favorite {
	background: white;
	color: black;
	border: 1px solid black;
	margin-left: 10px;
}
.item_favorite:active {
	background: black;
	color: white;
}
.item_favorite a {
	text-decoration: none;
	font-size: 0.9rem;
}
.item_raffle {
	background: black;
}
.item_raffle a {
	color: white;
	text-decoration: none;
	font-size: 0.9rem;
}
.item_now {
	line-height: 90%;
	font-size: 1.8rem;
	margin-bottom: 0.5vh;
	font-weight: bold;
}
.item_time {
	font-size: 0.675rem;
	color: rgb(94, 94, 94);
	font-weight: 300;
	padding-bottom: 1vh;
}
.item_info button {
	width: 35vw;
	color: white;
	background: black;
	margin-bottom: 5vh;
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
	display: none;
}
.swiper-button-next,
.swiper-container-rtl,
.swiper-button-prev {
	opacity: 0.3;
	color: black;
}
.swiper-pagination {
	font-size: 0.75rem;
	color: black;
}
.none {
	display: none;
}
</style>
