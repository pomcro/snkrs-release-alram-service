<template>
	<div>
		<div class="detail_mobile">
			<div class="category_title_box">
				<div class="category_title">PRODUCT</div>
				<div class="category_sub_title">상품정보</div>
			</div>
			<b-container
				><b-row class="content">
					<b-col cols="4" class="content-title">모델번호</b-col
					><b-col cols="8" class="content-content">{{ item.data.model }}</b-col>
				</b-row>

				<b-row class="content">
					<b-col cols="4" class="content-title">제품색상</b-col
					><b-col cols="8" class="content-content">{{
						item.data.colorway
					}}</b-col>
				</b-row>

				<b-row class="content">
					<b-col cols="4" class="content-title">발매가격</b-col
					><b-col cols="8" class="content-content">{{
						item.data.price | pricefilter
					}}</b-col>
				</b-row>

				<b-row class="content">
					<b-col cols="4" class="content-title">출시일</b-col
					><b-col cols="8" class="content-content">{{
						item.data.release_date | datefilter
					}}</b-col>
				</b-row>
				<b-row class="content">
					<b-col cols="4" class="content-title">프리미엄</b-col
					><b-col cols="8" style="color: red;" class="content-content"
						>{{ item.data.price | premiumfilter(item.market.sales) }}%</b-col
					>
				</b-row>
			</b-container>
		</div>
	</div>
</template>

<script>
import { pricefilter, premiumfilter } from '@/utils/pricefilter.js';
import { datefilter } from '@/utils/datefilter.js';
export default {
	filters: {
		pricefilter,
		premiumfilter,
		datefilter,
	},
	props: { item: { type: Object, required: true } },
	created() {
		this.$parent.$on('update', this.updateData);
	},
	methods: {
		updateData(data) {
			this.item = data;
		},
	},
};
</script>

<style scoped>
.detail_mobile {
	text-align: center;
	padding: 2% 5% 5% 5%;
	border-bottom: 8px solid rgb(246, 246, 246);
}
.detail_mobile div {
	font-family: Arial;
}
.category_title_box {
	line-height: 2rem;
	font-size: 1.2rem;
	color: black;
	font-weight: bold;
	text-align: left;
	margin-top: 3%;
	margin-bottom: 4%;
	margin-left: 1%;
}
.category_sub_title {
	font-size: 0.9rem;
	line-height: 1rem;
	color: black;
	font-weight: normal;
	color: rgba(34, 34, 34, 0.5);
}
.row {
	padding: 3px 0px;
}
.content-title {
	text-align: left;
	font-size: 0.9rem;
	color: #333333;
	padding: 0 1%;
}
.content-content {
	text-align: right;
	white-space: pre-line;
	word-break: break-word;
	padding: 0 0.7% 0.7% 0.7%;
	font-size: 0.9rem;
	color: black;
}
</style>
