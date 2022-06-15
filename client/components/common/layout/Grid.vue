<template>
	<div class="release_all">
		<client-only>
			<div class="filter_area">
				<swiper ref="mySwiper" class="swiper" :options="swiperOption">
					<!-- @click-slide="handleClickSlide" -->
					<swiper-slide ref="first_slide" :class="{ now_swiper: !prevchek }"
						><span class="sort_brand">All</span></swiper-slide
					>
				</swiper>
				<div v-if="query.length !== 0" class="search">
					<span>
						총 {{ itemCnt }}개의 '<strong>{{ query }}</strong
						>' 검색결과</span
					>
					<div @click="showFilterSelector()">
						{{ sort.name }} <svg-icon class="ico-sort" name="ico-sort" />
					</div>
				</div>
			</div>
			<a href="#" class="float">
				↑
			</a>
		</client-only>
		<div v-if="!this.$store.state.loading" class="list_items">
			<div
				v-for="(content, index) in listItem.data"
				:key="'conetent_' + index"
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
							<div
								v-if="viewType === 'C'"
								class="item_status"
								:style="{ backgroundColor: content.data.meta.color }"
							>
								{{ content.data.meta.label }}
							</div>
						</div>
						<div v-else class="item_img">
							<img :src="unLogo" alt="notFound_image" />
						</div>
					</div>
					<div v-if="viewType === 'C'">
						<div class="item_brand_space">
							<img
								alt="thumnail_image"
								:src="content.data.shop.thumbnail"
								@error="replaceByDefault"
							/>
							{{ content.data.shop.name.toUpperCase() }}
						</div>
						<div class="item_title">
							<span>{{ content.data.name }}</span>
						</div>
						<div class="item_date">
							{{ content.data.meta.data }}
						</div>
						<div class="item_date_text">응모마감일</div>
					</div>
					<div v-else-if="viewType === 'D'">
						<div class="item_brand">{{ content.brand.name.toUpperCase() }}</div>
						<div class="item_title">
							<span>{{ content.data.name }}</span>
						</div>
						<div class="item_sell">
							{{ content.data.raffle_count }}곳 응모중
						</div>
					</div>
					<div v-else>
						<div class="item_brand">{{ content.brand.name.toUpperCase() }}</div>
						<div class="item_title">
							<span>{{ content.data.name }}</span>
						</div>
						<div class="item_date">
							{{ content.data.release_date | simpledatefilter }}
						</div>
						<div class="item_date_text">발매일</div>
					</div>
					<br />
				</nuxt-link>
			</div>
		</div>
		<client-only>
			<div class="pagination_list">
				<paginate
					:page-count="pages"
					:page-range="3"
					:margin-pages="2"
					:click-handler="pageUpdate"
					:prev-text="'<'"
					:next-text="'>'"
					:container-class="'pagination'"
					:page-class="'page-item'"
				>
				</paginate>
			</div>
			<slideout-panel></slideout-panel>
		</client-only>
	</div>
</template>

<script>
import moment from 'moment';
import FilterSelector from '@/components/common/views/FilterSelector.vue';
import { simpledatefilter } from '@/utils/datefilter.js';
import { imagefilter320 } from '@/utils/imagefilter.js';
export default {
	name: 'List',
	components: {
		/* eslint-disable */
		FilterSelector,
		/* eslint-enable */
	},
	filters: {
		simpledatefilter,
		imagefilter320,
	},
	props: {
		itemData: { type: Object, required: true },
		viewType: { type: String, required: true },
	},
	data() {
		return {
			listItem: [],
			unLogo: require('@/assets/img/no_image_transparent.png'),
			prevchek: false,
			prev: '',
			itemCnt: 0,
			pages: 1,
			currentPages: 1,
			sort: { name: '최근 발매순', sort: 'release_date' },
			query: '',
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
	computed: {
		getList() {
			return this.release_list;
		},
	},
	created() {
		this.$parent.$on('update', this.updateData);
	},
	mounted() {
		this.prev = 'first';
		// item_list 를 기점으로 카테고리를 분리합니다.
		// 상태관리에서 가져오는데 시간이 걸리기떄문에 구해지면 settimeout을 멈추는것도 괜찮습니다.

		// 데이터 불러온거에서 4개 만 출력하는 fourAll과 카테고리를 정립하는 것
		this.initData(this.itemData);
	},
	methods: {
		addProductMeta(list) {
			const date = moment();
			for (let idx = 0; idx < list.data.length; idx++) {
				const release = list.data[idx].data.release;
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
				// eslint-disable-next-line no-var
				var meta = { label: '', color: '', data: '' };
				if (diff > 0) {
					let h, m, s;
					s = Math.floor(diff / 1000);
					m = Math.floor(s / 60);
					s = s % 60;
					h = Math.floor(m / 60);
					m = m % 60;
					const d = Math.floor(h / 24);
					h = h % 24;
					if (h < 10) h = '0' + h;
					if (d === 0) {
						meta.label = '오늘마감';
						meta.data = h + '시간 남음';
						meta.color = 'red';
					} else {
						meta.label = '응모중';
						meta.data = d + '일 ' + h + '시간 남음';
						meta.color = 'black';
					}
				} else {
					meta.label = '응모마감';
					meta.data = '응모마감';
					meta.color = 'black';
				}
				list.data[idx].data.meta = meta;
			}
			return list;
		},
		updateData(data) {
			this.initData(data);
		},
		initData(items) {
			if (items !== '' && items !== undefined) {
				this.listItem =
					this.viewType === 'C' ? this.addProductMeta(items) : items;
				this.itemCnt = items.cnt;
				this.pages = items.pages;
				if ('p' in this.$route.query) {
					this.currentPages = this.$route.query.p;
				}
				if ('q' in this.$route.query) {
					this.query = this.$route.query.q;
				}
				if ('sort' in this.$route.query) {
					this.sort.sort = this.$route.query.sort;
				}
			}
		},
		showFilterSelector(data) {
			const panel1Handle = this.$showPanel({
				component: FilterSelector,
				openOn: 'bottom',
				height: 300,
				background: 'transparent',
				cssClass: 'slideout-custom',
				props: {
					// any data you want passed to your component
					sort: this.sort,
				},
			});

			panel1Handle.promise.then(result => {
				if ('index' in result) {
					this.sort = result.sort;
					this.pageUpdate(1, result.sort.sort);
				}
			});
		},
		replaceByDefault(e) {
			e.target.src = this.unLogo;
		},
		pageUpdate(pageNum, sort) {
			this.$nuxt.$loading.start();
			const routeName = this.$route.name;
			switch (routeName) {
				case 'search':
					this.$router.push({
						path: '/search',
						query: { q: this.query, p: pageNum, sort },
					});
					this.$store.state.loading = true;
					this.$emit('search-method', { q: this.query, p: pageNum, sort });
					setTimeout(() => {
						this.$store.state.loading = false;
					}, 200);

					break;
				case 'web-draw':
				case 'web-completed':
				case 'web-closed':
				case 'list':
					this.$router.push({
						path: this.$route.path,
						query: { p: pageNum, sort },
					});
					this.$store.state.loading = true;
					this.$emit('list-method', { p: pageNum });
					setTimeout(() => {
						this.$store.state.loading = false;
					}, 200);
					break;
			}
		},
	},
};
</script>
<style scoped>
* {
	font-family: 'Noto Sans CJK KR', Noto Sans KR, sans-serif;
}
.release_all {
	text-align: center;
	padding: 70px 0 0 0;
}
.filter_area {
	margin-top: 20px 10px;
}
.search {
	padding: 2% 1% 2% 4%;
	font-size: 0.8rem;
	text-align: left;
	display: flex;
}
.search span {
	flex: 0 0 60%;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	height: 1.2rem;
	line-height: 1.2rem;
}
.search div {
	text-align: right;
	flex: 0 0 40%;
	font-weight: bold;
}
.search svg {
	padding: 3px;
}
.intro {
	margin-top: 3%;
	font-size: 1rem;
	font-weight: bold;
}
.sort_brand {
	font-size: 0.75rem;
	font-weight: bold;
}
.swiper {
	margin-bottom: 1%;
}
.sorted {
	margin-top: 1%;
	color: #333333;
	font-size: 0.75rem;
	font-weight: 300;
}
.list_items {
	padding: 0 1% 0 1%;
	font-size: 0.625rem;
	color: #6e6d7a;
	margin-bottom: 1%;
	text-align: left;
}

.swiper-slide {
	width: auto;
	padding: 0px 20px;
	line-height: inherit;
}
.swiper-container {
	padding: 0 2% 0 2%;
}
.now_swiper {
	color: black;
	border-radius: 10px;
	background: rgba(13, 12, 34, 0.05);
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
	position: relative;
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
.item_brand_space img,
.item_brand img {
	border-radius: 100%;
	width: 16px;
	height: 16px;
	margin-right: 4px;
	object-fit: contain;
	object-position: center;
}
.item_brand_space {
	margin-top: calc(4% + 14px);
	text-align: left;
	color: #000000;
	font-size: 0.8rem;
	font-weight: bold;
	display: flex;
	line-height: 1.3em;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1; /* number of lines to show */
	-webkit-box-orient: vertical;
}
.item_brand {
	text-align: left;
	margin-top: 4%;
	color: #000000;
	font-size: 0.8rem;
	font-weight: bold;
	display: flex;
	line-height: 1.3em;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1; /* number of lines to show */
	-webkit-box-orient: vertical;
}
.item_sell {
	font-size: 0.8rem;
	color: gray;
	text-align: left;
	margin-top: 3%;
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
.item_status {
	position: absolute;
	display: block;
	bottom: -10px;
	left: 6px;
	width: 60px;
	height: 24px;
	text-align: center;
	font-size: 0.6rem;
	line-height: 24px;
	color: white;
	border-radius: 3px;
}
.none {
	display: none;
}
.pagination {
	margin: auto;
}
.pagination_list {
	display: flex;
	padding: 14px 0;
}

.float {
	z-index: 999;
	position: fixed;
	width: 50px;
	height: 50px;
	bottom: 3%;
	right: 3%;
	background-color: #000;
	color: #fff;
	border-radius: 50px;
	text-align: center;
	box-shadow: 2px 2px 3px #999;
	line-height: 50px;
	text-decoration: none;
	outline: none;
}
</style>
