<template>
	<div class="iteminfo">
		<div v-if="releaseDetail.data" class="item_mobile">
			<div class="item_img">
				<div v-if="releaseDetail.data.thumbnail" class="img">
					<img
						:alt="releaseDetail.data.name"
						:src="releaseDetail.data.thumbnail | imagefilter1080"
						@error="replaceByDefault"
					/>
				</div>
				<div v-else class="img">
					<img :src="unLogo" alt="로고가 없습니다." />
				</div>
			</div>
			<div class="item_contents">
				<div class="title">
					{{ releaseDetail.data.name_kr | datachkfilter }}
				</div>
				<div class="title_en">
					{{ releaseDetail.data.name | datachkfilter }}
				</div>
				<div v-if="releaseDetail.data.recent_trade_price > 0">
					<div class="title_price">
						최근 거래가
					</div>
					<div class="content_price">
						{{ releaseDetail.data.recent_trade_price | pricefilter }}원
					</div>
				</div>
				<div v-else-if="releaseDetail.data.vote.resale_price > 0">
					<div class="title_price">
						예상리셀가
					</div>
					<div class="content_price">
						{{ releaseDetail.data.vote.resale_price | pricefilter }}원
					</div>
				</div>
				<div v-if="releaseDetail.data.description" class="editor">
					<div class="editor_title">Editor's Note</div>
					<div class="editor_content">
						{{ releaseDetail.data.description | datachkfilter }}
					</div>
				</div>
				<button
					v-if="this.$store.state.isAdmin"
					class="btn-admin"
					@click="adminPage"
				>
					수정하기
				</button>
				<!-- {{ $route.params.search_str }} -->
			</div>
			<div class="item_release">
				<div class="item_release_time">SNEAKRES RELEASE ON</div>
				<div class="item_now">{{ time | datachkfilter }}</div>
				<div class="item_time">
					<span style="padding:0 2.2%;">DAYS</span
					><span style="padding:0 2.2%;">HOURS</span
					><span style="padding:0 2.2%;;">MINS</span
					><span style="padding:0 2.2%;">SECS</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import { pricefilter } from '@/utils/pricefilter.js';
import { imagefilter1080 } from '@/utils/imagefilter.js';
export default {
	filters: {
		pricefilter,
		imagefilter1080,
		datachkfilter(value) {
			if (value === undefined) {
				return 'NULL';
			}
			return value;
		},
	},
	props: { releaseDetail: { type: Object, required: true } },
	data() {
		return {
			isAdmin: false,
			timetrack: '',
			unLogo: require('@/assets/img/no_image_transparent.png'),
			time: '',
			swiperOption: {
				pagination: {
					el: '.swiper-pagination',
					dynamicBullets: true,
				},
			},
		};
	},
	mounted() {
		this.start();
	},
	destroyed() {
		clearInterval(this.timetrack);
	},
	methods: {
		modalId() {
			return 'modal_admin';
		},
		replaceByDefault(e) {
			e.target.src = this.unLogo;
		},
		adminPage() {
			this.$router.push('/admin/product/' + this.$route.params.id);
		},
		timeDiff(date) {
			const stDate = moment().unix();
			// let edDate = new Date('16 May 2020 22:48');

			const edDate = moment(this.releaseDetail ? date : '').unix();

			const remainDate = edDate - stDate;
			if (remainDate > 0) {
				let days = Math.floor(remainDate / (60 * 60 * 24));
				let hours = Math.floor((remainDate % (60 * 60 * 24)) / (60 * 60));
				let miniutes = Math.floor((remainDate % (60 * 60)) / 60);
				let seconds = Math.floor(remainDate % 60);
				days = days < 10 ? '0' + days : days;
				hours = hours < 10 ? '0' + hours : hours;
				miniutes = miniutes < 10 ? '0' + miniutes : miniutes;
				seconds = seconds < 10 ? '0' + seconds : seconds;
				const m = days + ' : ' + hours + ' : ' + miniutes + ' : ' + seconds;
				this.time = m;
			} else {
				this.time = '발매가 완료되었습니다.';
				clearInterval(this.timetrack);
			}
		},
		start() {
			// utils로 이동
			const date = this.releaseDetail
				? this.releaseDetail.data.release_date
				: '';
			this.timeDiff(date);
			this.timetrack = setInterval(() => {
				this.timeDiff(date);
			}, 1000);
		},
	},
};
</script>

<style scoped>
.iteminfo {
	text-align: center;
}
.iteminfo div {
	font-family: Arial;
	width: 100%;
}
/* 모바일 뷰 */
.item_mobile {
	border-bottom: 8px solid rgb(246, 246, 246);
}
.item_contents {
	padding: 6%;
	border-bottom: 8px solid rgb(246, 246, 246);
}
.title {
	text-align: left;
	font-size: 1rem;
	font-weight: bold;
	line-height: 1;
}
.title_en {
	margin-top: 2%;
	text-align: left;
	font-size: 0.7rem;
	color: rgb(94, 94, 94);
	font-weight: normal;
}
.title_price {
	margin-top: 7%;
	text-align: left;
	font-size: 0.7rem;
	color: rgb(94, 94, 94);
	font-weight: normal;
}
.content_price {
	margin-top: 1%;
	text-align: left;
	font-size: 1.4rem;
	font-weight: bold;
	line-height: 1;
}
.item_img {
	/* Header Height */
	padding-top: 54px;
	display: flex;
	align-items: flex-end;
	background: rgba(157, 160, 162, 0.09);
}
.item_img .img {
	height: 350px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.item_img .img img {
	max-width: 85%;
	max-height: 85%;
}
.item_release {
	padding: 3%;
}
.item_release_time {
	text-align: center;
	font-size: 0.8rem;
	color: black;
}
.item_now {
	margin-top: 1.5%;
	font-size: 1.8rem;
	font-weight: bold;
}
.item_time {
	font-size: 0.75rem;
	color: rgb(94, 94, 94);
	font-weight: 300;
}
.like_share {
	padding: 1% 0 2% 0;
}
.like_share button {
	color: black;
	margin: 1%;
	border-radius: 6px;
	border: none;
	background-color: rgb(243, 243, 243);
	text-align: center;
	line-height: 2em;
	font-weight: normal;
	font-size: 0.75rem;
}
.editor {
	text-align: left;
	margin-top: 6%;
	font-size: 0.75rem;
}
.editor_title {
	font-weight: bold;
	margin-bottom: 1%;
}
.editor_content {
	font-weight: 500;
}
.modal_info_header {
	text-align: right;
	width: 100%;

	font-weight: bold;
	padding: 0.4rem 1rem;
}
.btn-admin {
	width: 100%;
	margin-top: 5%;
	padding: 3% 0;
	border-radius: 5px;
	background: #eeeeee;
}
.btn-admin:hover {
	background: #bcbcbc;
}
</style>
