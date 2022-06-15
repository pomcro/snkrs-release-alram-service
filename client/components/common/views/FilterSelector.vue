<template>
	<div class="filter_selecor">
		<ul class="select_list">
			<li
				v-for="(sort, i) in filterOptionList"
				:key="sort.sort"
				class="select_item"
				:class="current_sort == i ? 'active' : ''"
			>
				<button class="select_link" @click="sortFilter(i)">
					{{ sort.name }}
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: { sort: Object },
	data() {
		return {
			current_sort: 0,
			filterOptionList: [
				{ name: '최근 발매순', sort: 'release_date' },
				{ name: '인기순', sort: 'popular' },
				{ name: '판매량순', sort: 'sales' },
				{ name: '프리미엄 가격순', sort: 'premium' },
			],
		};
	},
	created() {
		this.current_sort = this.findFilter(this.sort.sort);
	},
	methods: {
		findFilter(sort) {
			return this.filterOptionList.findIndex(el => el.sort === sort);
		},
		sortFilter(i) {
			const result = { index: i, sort: this.filterOptionList[i] };
			this.$emit('closePanel', result);
			this.activeItem = i;
		},
	},
};
</script>

<style scoped>
/* 모바일 리스트 누르면 나오는 프로파일 */
.layer_header {
	pointer-events: none;
	padding: 16px 50px 0;
	font-size: 18px;
	line-height: 26px;
	color: #000;
	font-weight: 700;
	text-align: center;
}
.layer_header .title {
	font-size: 16px;
	line-height: 24px;
	letter-spacing: -0.16px;
}
.filter_selecor {
	border-radius: 16px 16px 0 0;
	background: white;
	width: 100%;
	height: 100%;
	overflow-y: hidden;
}
.select_list {
	height: 100%;
	border: none;
	padding: 6px 6px 20px;
	overflow-y: auto;
	text-align: center;
	border-width: 1px 0 0 1px;
	display: block;
	margin-top: 2vh;
}
.select_item {
	width: 100%;
	overflow: hidden;
	border-bottom: 1px solid #d3d3d3;
	text-align: left;
	font-size: 0.8rem;
	padding: 2vh 3vw 2vh 3vw;
}
.select_item.active {
	border-bottom: 1px solid #222;
	color: black;
}
.select_item.active button {
	color: black;
}
.select_item button {
	color: #d3d3d3;
}
.select_link {
	padding: 0;
	border: 0;
	outline: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border-radius: 0;
	background: white;
}
</style>
