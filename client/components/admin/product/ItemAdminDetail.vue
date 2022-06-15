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
					><b-col cols="8" class="content-content"
						><textarea
							id="model"
							v-model="data.model"
							type="text"
							rows="1"
							placeholder="상품모델명"
					/></b-col>
				</b-row>

				<b-row class="content">
					<b-col cols="4" class="content-title">제품색상</b-col
					><b-col cols="8" class="content-content"
						><textarea
							id="colorway"
							v-model="data.colorway"
							rows="2"
							type="text"
							placeholder="상품색상"
					/></b-col>
				</b-row>

				<b-row class="content">
					<b-col cols="4" class="content-title">발매가격</b-col
					><b-col cols="8" class="content-content"
						><textarea
							id="price"
							v-model="data.price"
							rows="1"
							type="text"
							placeholder="발매가격"
					/></b-col>
				</b-row>

				<b-row class="content">
					<b-col cols="4" class="content-title">출시일</b-col
					><b-col cols="8" class="content-content"
						><datetime
							v-model="data.release_date_ISO"
							type="datetime"
							input-id="release_date"
							format="kkkk-LL-dd"
							input-style="text-align:right; font-size:0.9rem;"
						></datetime
					></b-col>
				</b-row>
			</b-container>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import { Datetime } from 'vue-datetime';
import { pricefilter } from '@/utils/pricefilter.js';
import { datefilter } from '@/utils/datefilter.js';
import 'vue-datetime/dist/vue-datetime.css';
export default {
	filters: {
		pricefilter,
		datefilter,
	},
	components: {
		Datetime,
	},
	props: { item: { type: Object, required: true } },
	data() {
		return {
			data: {
				model: this.item.data.model.toUpperCase(),
				colorway: this.item.data.colorway.toUpperCase(),
				price: this.item.data.price,
				release_date: this.item.data.release_date,
			},
		};
	},
	created() {
		this.data.release_date_ISO = moment(this.data.release_date).toISOString();
	},
};
</script>

<style scoped>
.detail_mobile {
	text-align: center;
	padding: 2% 5% 15% 5%;
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
}
.content-content {
	text-align: right;
}
.content-content textarea {
	text-align: right;
	white-space: pre-line;
	word-break: break-word;
	padding: 0 0.7% 0.7% 0.7%;
	font-size: 0.9rem;
	color: black;
	width: 100%;
}
</style>
