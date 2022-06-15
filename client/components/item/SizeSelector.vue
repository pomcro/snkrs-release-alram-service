<template>
	<div class="size_selecor">
		<div v-if="!chartVisible" class="selector">
			<div class="layer_header disabled">
				<div class="chart" @click="sizeChart">
					사이즈 표<svg-icon
						class="ico-arr-right"
						name="ico-arr-right"
					></svg-icon>
				</div>
				<div class="title">사이즈 선택</div>
			</div>
			<ul class="select_list">
				<li
					v-for="(size, i) in sizeOptionList"
					:key="'size_' + i"
					class="select_item"
					:class="current_size == i ? 'active' : ''"
				>
					<div class="select_link" @click="sizeSelect(i)">
						<p>{{ size.name }}</p>
						<p>US {{ size.us }}</p>
					</div>
				</li>
			</ul>
		</div>
		<div v-if="chartVisible" class="select-options">
			<div>
				<div class="select_option_title">
					<div class="back" @click="sizeChart">
						<svg-icon class="ico-arr-left" name="ico-arr-left"></svg-icon>
						뒤로
					</div>
					<div class="title">사이즈 차트</div>
				</div>
			</div>
			<div>
				<div class="row_title">
					<div class="item">US</div>
					<div class="item">UK</div>
					<div class="item">EU</div>
					<div class="item">CM</div>
					<div class="item">W</div>
				</div>
				<div class="size_container">
					<div
						v-for="(size, index) in sizeOptionList.slice(2)"
						:key="'size_' + index"
						class="row_item"
					>
						<div class="row_size">{{ size.us }}</div>
						<div class="row_size">{{ size.uk }}</div>
						<div class="row_size">{{ size.eu }}</div>
						<div class="row_size">{{ size.cm }}</div>
						<div class="row_size">{{ size.w }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		currentSize: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			chartVisible: false,
			current_size: -1,
			sizeOptionList: [
				{
					name: '모든 사이즈',
					size: -1,
					us: 'ALL',
					uk: 'ALL',
					eu: 'ALL',
					cm: 'ALL',
					w: 'ALL',
				},
				{ name: '230', size: 225, us: 3.5, uk: 2.5, eu: 35.5, cm: 22.5, w: 5 },
				{ name: '230', size: 230, us: 4, uk: 3, eu: 36, cm: 23, w: 5.5 },
				{ name: '235', size: 235, us: 4.5, uk: 3.5, eu: 36.5, cm: 23.5, w: 6 },
				{ name: '235', size: 235, us: 5, uk: 4, eu: 37.5, cm: 23.5, w: 6.5 },
				{ name: '240', size: 240, us: 5.5, uk: 4.5, eu: 38, cm: 24, w: 7 },
				{ name: '240', size: 240, us: 6, uk: 5, eu: 38.5, cm: 24, w: 7.5 },
				{ name: '245', size: 245, us: 6.5, uk: 5.5, eu: 39, cm: 24.5, w: 8 },
				{ name: '250', size: 250, us: 7, uk: 6, eu: 40, cm: 25, w: 8.5 },
				{ name: '255', size: 255, us: 7.5, uk: 6.5, eu: 40.5, cm: 25.5, w: 9 },
				{ name: '260', size: 260, us: 8, uk: 7, eu: 41, cm: 26, w: 9.5 },
				{ name: '265', size: 265, us: 8.5, uk: 7.5, eu: 42, cm: 26.5, w: 10 },
				{ name: '270', size: 270, us: 9, uk: 8, eu: 42.5, cm: 27, w: 10.5 },
				{ name: '275', size: 275, us: 9.5, uk: 8.5, eu: 43, cm: 27.5, w: 11 },
				{ name: '280', size: 280, us: 10, uk: 9, eu: 44, cm: 28, w: 11.5 },
				{
					name: '285',
					size: 285,
					us: 10.5,
					uk: 9.5,
					eu: 44.5,
					cm: 28.5,
					w: 12,
				},
				{ name: '290', size: 290, us: 11, uk: 10, eu: 45, cm: 29, w: 12.5 },
				{
					name: '295',
					size: 295,
					us: 11.5,
					uk: 10.5,
					eu: 45.5,
					cm: 29.5,
					w: 13,
				},
				{ name: '300', size: 300, us: 12, uk: 11, eu: 46, cm: 30, w: 13.5 },
				{ name: '305', size: 305, us: 12.5, uk: 11.5, eu: 47, cm: 30.5, w: 14 },
				{ name: '310', size: 310, us: 13, uk: 12, eu: 47.5, cm: 31, w: 14.5 },
				{ name: '315', size: 315, us: 13.5, uk: 12.5, eu: 48, cm: 31.5, w: 15 },
				{ name: '320', size: 320, us: 14, uk: 13, eu: 48.5, cm: 32, w: 15.5 },
				{ name: '330', size: 330, us: 15, uk: 14, eu: 49.5, cm: 33, w: 16 },
				{ name: '340', size: 340, us: 16, uk: 15, eu: 50.5, cm: 34, w: 16.5 },
				{ name: '350', size: 350, us: 17, uk: 16, eu: 51.5, cm: 35, w: 17 },
				{ name: '360', size: 360, us: 18, uk: 17, eu: 52.5, cm: 36, w: 17.5 },
			],
		};
	},
	created() {
		if (isNaN(this.currentSize)) {
			this.current_size = -1;
		}
		this.current_size = this.findSize(this.currentSize);
	},
	methods: {
		sizeChart() {
			this.chartVisible = !this.chartVisible;
		},
		findSize(size) {
			return this.sizeOptionList.findIndex(el => el.size === size);
		},
		sizeSelect(i) {
			const result = {
				index: i,
				value: this.sizeOptionList[i].size,
				name: this.sizeOptionList[i].name,
			};
			this.$emit('closePanel', result);
			this.activeItem = i;
		},
	},
};
</script>

<style scoped>
.select_option_title {
	display: flex;
	justify-content: center;
	margin: 4%;
}
.select_option_title .back {
	position: absolute;
	left: 4%;
	display: flex;
	align-items: center;
	text-align: center;
}
.size_container {
	overflow: scroll;
}
.row_title {
	padding: 5px 0px;
	display: flex;
	justify-content: space-around;
	-webkit-box-align: stretch;
	align-items: stretch;
	text-align: center;
	background: white;
	height: 36px;
	box-shadow: rgba(206, 206, 206, 0.7) 0px 13px 20px 0px;
}
.row_item {
	flex-direction: row;
	justify-content: space-around;
	-webkit-box-align: stretch;
	align-items: stretch;
	text-align: center;
	background: rgb(250, 250, 250);
	display: flex !important;
}
.row_item div {
	text-align: center;
	width: 20%;
	font-size: 14px;
	color: rgb(0, 0, 0);
	letter-spacing: 1.2px;
	padding: 7px 0px 8px;
}
/* 모바일 리스트 누르면 나오는 프로파일 */
.layer_header {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 4% 4% 1% 4%;
	text-align: center;
}
.layer_header .chart {
	position: absolute;
	right: 4%;
	display: flex;
	align-items: center;
	text-align: center;
}
.layer_header .title {
	font-size: 16px;
}
.size_selecor {
	border-radius: 16px 16px 0 0;
	background: white;
	width: 100%;
	height: 100%;
}
.select_list {
	height: 100%;
	border: none;
	padding: 6px 6px 20px;
	overflow-y: auto;
	text-align: center;
	border-width: 1px 0 0 1px;
}
.select_item {
	display: flex;
	width: calc(33% - 9px);
	overflow: hidden;
	margin: 5px;
	border: 1px solid #d3d3d3;
	padding: 1% 0;
	border-radius: 4px;
	background-color: #fff;
	position: relative;
	float: left;
}
.select_item.active {
	border: 1px solid #222;
}
.select_link {
	display: grid;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 100%;
	padding: 0;
	border: 0;
	outline: none;
	background: none;
	background-color: rgba(0, 0, 0, 0);
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border-radius: 0;
	font-size: 0.8rem;
}
.select_link p:first-child {
	font-size: 0.9rem;
	color: black;
	font-weight: 500;
}
</style>
