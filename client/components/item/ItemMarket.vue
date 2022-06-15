<template>
	<div>
		<div class="detail_mobile">
			<div class="category_title_box">
				<div class="category_title">RECENT TRADE</div>
				<div class="category_sub_title">최근 거래</div>
			</div>
			<ul role="tablist" class="tab_list">
				<li
					v-for="(category, index) in salesCategory"
					:key="Math.random() + category"
					role="tab"
					:class="{ on: currentChartId == index }"
					@click="updateChart(index)"
				>
					<a class="item_link">{{ category }}</a>
				</li>
			</ul>
			<div class="canvasWrapper">
				<AreaChart :height="120" :chart="targerChart"></AreaChart>
			</div>
			<table class="latest-transaction">
				<thead>
					<tr>
						<th>사이즈</th>
						<th>거래가</th>
						<th>거래일</th>
					</tr>
				</thead>
				<tbody id="txOrderBooksTableBody">
					<tr v-for="item in market.sales" :key="item.id">
						<td>{{ item.size }}</td>
						<td>
							<span>{{ item.price | pricefilter }}</span>
						</td>
						<td>{{ item.date | datefilterMarket }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import AreaChart from '@/components/common/chart/AreaChart.vue';
import { pricefilter } from '@/utils/pricefilter.js';
import { datefilterMarket } from '@/utils/datefilter.js';
export default {
	filters: {
		pricefilter,
		datefilterMarket,
	},
	components: {
		AreaChart,
	},
	props: { market: { type: Object, required: true } },
	data() {
		return {
			version: 0,
			salesCategory: ['1개월', '3개월', '6개월', '1년', '전체'],
			salesCategoryParams: ['1m', '3m', '6m', '12m', 'all'],
			salesCount: [30, 90, 180, 360, -1],
			currentChartId: 0,
			targerChart: {
				count: 30,
				name: '1m',
				data: this.market.chart['1m'],
			},
		};
	},
	created() {
		this.$parent.$on('update', this.updateData);
	},
	methods: {
		updateData(data) {
			this.market = data.market;
			this.updateChart(0);
		},
		updateChart(index) {
			this.currentChartId = index;
			this.targerChart = {
				count: this.salesCount[index],
				name: this.salesCategoryParams[index],
				data: this.market.chart[this.salesCategoryParams[index]],
			};
		},
	},
};
</script>

<style scoped>
.tab_list {
	display: -webkit-box;
	display: flex;
	border-radius: 7px;
	background-color: #f4f4f4;
}
.tab_list li {
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	margin: 4px;
	list-style: none;
}
.tab_list li a {
	display: block;
	padding: 4px 0;
	font-size: 10px;
	line-height: 16px;
	letter-spacing: -0.06px;
	text-align: center;
	border-radius: 7px;
	color: rgba(34, 34, 34, 0.8);
	text-decoration: none;
}
.tab_list .on {
	background-color: #fff;
	border-radius: 7px;
}
.canvasWrapper {
	margin-top: 16px;
}
.chartjs-render-monitor {
	height: 100px !important;
}
.detail_mobile {
	text-align: center;
	padding: 2% 5% 5% 5%;
	border-bottom: 8px solid rgb(246, 246, 246);
}
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
.latest-transaction {
	width: 100%;
	table-layout: fixed;
	font-size: 13px;
	line-height: 22px;
	margin-top: 9px;
}
/* 카테고리 */
.latest-transaction thead th:nth-child(1) {
	padding-left: 0.74%;
}
.latest-transaction thead th:nth-child(2) {
	padding-left: 3.27%;
	padding-right: 0.89%;
}
.latest-transaction thead th:nth-child(3) {
	padding-left: 8.92%;
	padding-right: 0.89%;
}
.latest-transaction tbody tr:first-child td {
	padding-top: 10px;
}
.latest-transaction th:nth-child(1) {
	text-align: left;
}
.latest-transaction td:nth-child(1) {
	text-align: left;
}
.latest-transaction th:nth-child(2) {
	padding-right: 37px;
}
.latest-transaction td:nth-child(2) {
	padding-left: 3.27%;
}
.latest-transaction th {
	text-align: right;
	border-bottom: 1px solid #ebebeb;
	font-weight: normal;
	color: #222222cc;
}
.latest-transaction td {
	text-align: right;
	color: #222222;
}
</style>
