<template>
	<div>
		<div class="upcomming_mobile">
			<div class="type">UPCOMMING</div>

			<br />

			<div
				v-for="content in fourAll"
				:key="content.data.id"
				class="release_items"
			>
				<router-link :to="'/product/' + content.data.id" style="display: block">
					<div class="release_item">
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
							{{ content.data.release_date | simpledatefilter }}
						</div>
						<div class="item_date_text">발매일</div>
					</div>
				</router-link>
			</div>
			<div class="more_info">
				<nuxt-link to="/list">더보기</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { simpledatefilter } from '@/utils/datefilter.js';
export default {
	filters: {
		simpledatefilter,
	},
	data() {
		return {
			unLogo: require('@/assets/img/no_image_transparent.png'),
			fourAll: [],
		};
	},
	computed: {
		...mapState(['releaseInfo']),
	},
	created() {
		this.prev = 'first';
		// releaseInfo 를 기점으로 카테고리를 분리합니다.
		// 상태관리에서 가져오는데 시간이 걸리기떄문에 구해지면 settimeout을 멈추는것도 괜찮습니다.

		// 데이터 불러온거에서 4개 만 출력하는 fourAll과 카테고리를 정립하는 것
		const releaseValid = setInterval(() => {
			if (this.releaseInfo !== '') {
				for (let i = 0; i < this.releaseInfo.list.length; i++) {
					if (i < 6) {
						this.fourAll.push(this.releaseInfo.list[i]);
					}
					clearInterval(releaseValid);
				}
			} else {
				console.log('upcomitem 준비중');
			}
		}, 300);
	},
	methods: {
		replaceByDefault(e) {
			e.target.src = this.unLogo;
		},
		goUrl(id) {
			if (Number(id) === Number(this.$route.params.id)) {
				return alert('동일한 페이지');
			}
			this.$router.push('/product/' + id);
			//   this.$store
			//     .dispatch('FETCH_RELEASE_INFO', id)
			//     .then(() => this.$router.push('/item/' + id));
			// 에러처리 필요
		},
	},
};
</script>

<style scoped>
.upcomming_mobile {
	margin-top: 2vh;
	text-align: center;
	padding: 0 2vw 2vh 2vw;
}
.type {
	font-size: 1.3rem;
	font-weight: bold;
}
.release_items {
	text-align: center;
	margin-top: 1vh;
	padding: 0.3rem 0.5rem 0.3rem 0.5rem;
	display: inline-block;
	width: 50%;
}
.release_items a:hover {
	text-decoration: none;
}
.release_item {
	background: rgba(157, 160, 162, 0.09);
	padding: 0 0.3rem;
	height: 20vh;
	border-radius: 5px;
}
.item_created {
	font-size: 0.75rem;
	color: black;
	font-weight: bold;
}
.item_img {
	height: 14.5vh;
	line-height: 17vh;
	text-align: center;
}
.item_img img {
	max-height: 15vh;
	vertical-align: bottom;
	width: 90%;
}
.item_brand {
	text-align: left;
	margin-top: 1vh;
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
	max-height: 2.8em;
	line-height: 1.4em;
}
.item_title span {
	margin-top: 0.5vh;
	font-weight: normal;
}
.item_date {
	text-align: left;
	margin-top: 0.8vh;
	font-size: 1rem;
	font-weight: normal;
	overflow: hidden;
	white-space: nowrap;
	color: #212529;
}
.item_date_text {
	font-size: 0.8rem;
	color: gray;
	text-align: left;
}
.none {
	display: none;
}
.more_info {
	margin-top: 2vh;
	margin-bottom: 2vh;
	font-size: 1rem;
	color: #333333;
	text-decoration: underline;
}
.more_info a {
	color: #333333;
}
</style>
