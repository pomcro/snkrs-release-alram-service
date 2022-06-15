<template>
	<b-sidebar
		id="sidebar-search"
		:ref="lank"
		aria-labelledby="sidebar-no-header-title"
		class="z-index:99999;"
		no-header
		right
		backdrop
		shadow
		target="456"
		@change="toggleBodyScrollbar"
	>
		<template v-slot:default="{ hide }">
			<div class="pre_search_wrap open">
				<div class="pre_search_iner">
					<div class="pred_search">
						<span class="">
							<input
								v-model="searchStr"
								type="text"
								value=""
								placeholder="검색"
								class="ui-autocomplete-input"
								@keyup.enter="goSearch()"
							/>
						</span>
						<button class="pre_search_btn" type="button" @click="goSearch">
							<span class="ns-search-large">
								<svg-icon class="ico-search" name="ico-search" />
							</span>
						</button>
					</div>

					<button class="search_close" @click="hide">
						<svg-icon class="ico-close" name="ico-close" />
					</button>
				</div>

				<div class="search_list">
					<p>최근 검색어</p>
					<ul class="iru">
						<li
							v-for="item in searchLists"
							:key="item.id"
							@click="goRecentSearch(item)"
						>
							<a>{{ item }}</a>
						</li>
					</ul>
					<p>인기 검색어</p>

					<ul v-if="lank.length > 0" id="ui-id-gnb">
						<li
							v-for="(item, i) in lank"
							:key="i"
							@click="getRecommend(item.id)"
						>
							<a>{{ item.name_kr }}</a>
						</li>
					</ul>
				</div>
			</div>
		</template>
	</b-sidebar>
</template>

<script>
export default {
	data() {
		return {
			lank: [],
			searchStr: '',
			searchLists: [],
		};
	},
	mounted() {
		this.searchLists =
			sessionStorage.getItem('searchKey') === null
				? []
				: JSON.parse(sessionStorage.getItem('searchKey'));
	},
	methods: {
		async getSearchData() {
			const searchData = await this.$axios.get('web/search');
			this.lank = searchData.data.searchLank;
		},
		goRecentSearch(name) {
			if (name !== this.$route.query.q) {
				this.toggleBodyScrollbar(false);
				this.$nuxt.$loading.start();
				this.$router.push({
					path: '/search/',
					query: { q: name },
				});
			}
		},
		getRecommend(productId) {
			this.$router.push('/product/' + productId);
		},
		goSearch() {
			if (this.searchStr !== this.$route.query.q) {
				this.toggleBodyScrollbar(false);
				this.$nuxt.$loading.start();
				const output = sessionStorage.getItem('searchKey');
				let searchView = [];
				if (output !== null) {
					searchView = JSON.parse(output);
				}
				if (searchView.every(e => e !== this.searchStr)) {
					searchView.push(this.searchStr);
					this.searchLists.push(this.searchStr);
				}
				sessionStorage.setItem('searchKey', JSON.stringify(searchView));
				this.$router.push({
					path: '/search/',
					query: { q: this.searchStr },
				});
			}
		},
		navCheck() {
			this.navChk = !this.navChk;
		},
		toggleBodyScrollbar(visible) {
			const el = document.body;
			if (visible) {
				el.classList.add('slideout-panel-open');
				this.getSearchData();
			} else {
				el.classList.remove('slideout-panel-open');
			}
		},
	},
};
</script>

<style scoped>
::v-deep .b-sidebar {
	width: 100%;
}
::v-deep .b-sidebar > .b-sidebar-body {
	height: 100vh;
	position: absolute;
	top: 0;
	bottom: 0;
	overflow-y: hidden;
	transform: translateY(0px);
	z-index: 120;
	background: #fff;
	width: 100%;
	padding: 0;
	left: 0;
	right: 0;
	display: inline-block;
	transition: transform 0.15s ease 0.15s;
	text-align: left;
}
.pre_search_iner {
	position: relative;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	margin-top: 8px;
	-webkit-box-flex: 1;
	-webkit-flex-grow: 1;
	-ms-flex-positive: 1;
	flex-grow: 1;
	justify-content: flex-start;
}
.pred_search {
	max-width: 100%;
	width: 100%;
	padding: 0 74px 0 24px;
	box-sizing: border-box;
	transition: width 0.25s ease, transform 0.25s ease;
	position: relative;
	margin: auto 0;
	transform: translateX(0);
}
.pred_search > span {
	display: block;
	z-index: 3;
}
.pred_search input {
	height: 40px;
	visibility: visible;
	width: 100%;
	background: #f5f5f5;
	color: inherit;
	padding: 8px 48px;
	cursor: text;
	font-weight: 300;
	font-size: 16px;
	border-radius: 100px;
	line-height: 1.5;
	box-sizing: border-box;
	border: 0;
	outline: none;
}
input::placeholder {
	white-space: pre;
	word-wrap: normal;
	overflow-x: hidden;
	overflow-y: hidden;
	line-height: initial;
}
.pre_search_btn {
	left: 25px;
	width: 40px;
	right: -86px;
	z-index: 100;
	height: 40px;
	position: absolute;
	top: 0px;
	padding: 8px;
	display: flex;
	align-items: center;
	border-radius: 100px;
	background: transparent;
	transform: translateZ(0);
	box-sizing: border-box;
	border: 0;
}
.pre_search_btn:hover {
	background: #e5e5e5;
}
.pre_search_btn .ns-search-large {
	margin-top: 1px;
	font-size: 24px;
	color: #111;
}
[class^='ns-'] {
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.search_close {
	display: flex;
	background: #f5f5f5;
	padding: 0px 9px;
	opacity: 1;
	position: absolute;
	top: 0;
	right: 24px;
	flex: 0 0 auto;
	align-items: center;
	border-radius: 100px;
	width: 40px;
	height: 40px;
	box-sizing: border-box;
	visibility: visible;
	animation: b 0.25s ease 0.45s forwards;
	z-index: 3;
	border: 0;
}
.search_close:hover {
	background: #e5e5e5;
}
.search_close .ns-x-small {
	height: 40px;
	line-height: 40px;
	font-size: 30px;
	color: #111;
}
.search_list {
	overflow-y: auto;
	margin: unset;
	max-width: 100%;
	padding: 20px 20px 26px 36px;
	height: calc(100% - 120px);
	box-sizing: border-box;
	visibility: initial;
	transform: translateY(0);
	transition: all 0.65s;
}
.search_list p {
	display: block;
	margin-bottom: 3%;
	margin-top: 6%;
	font-weight: 500;
	font-size: 16px;
	line-height: 1.5;
	color: #757575;
	visibility: visible;
	opacity: 1;
	transform: translateY(0);
	transition: opacity 0.35s 0.4s, visibility 0.35s 0.4s,
		transform 0.25s ease 0.35s;
}
.search_list > ul li a {
	visibility: visible;
	opacity: 1;
	transform: translateY(0);
	outline: 0;
	cursor: pointer;
	transition: opacity 0.45s 0.5s, visibility 0.45s 0.5s,
		transform 0.45s ease 0.3s;
	display: block;
	margin-bottom: 12px;
	font-weight: 500;
	font-size: 1.1rem;
	color: black;
	line-height: 1.2;
}
.search_list > .lru {
	margin-bottom: 20px;
}
.search_list > li {
	margin-top: 5px;
	margin-bottom: 5px;
}
.pre_btn_group {
	display: flex;
	align-items: center;
	z-index: 2;
}
</style>
