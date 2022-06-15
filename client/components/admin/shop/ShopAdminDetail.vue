<template>
	<div>
		<div class="detail_mobile">
			<div class="category_title_box">
				<div class="category_title">RELEASE</div>
				<div class="category_sub_title">세부정보</div>
			</div>
			<b-container>
				<b-row class="content">
					<b-col cols="4" class="content-title">발매가격</b-col
					><b-col cols="8" class="content-content"
						><textarea
							id="price"
							v-model="data.data.release.price"
							rows="1"
							type="text"
							placeholder="발매가격"
					/></b-col>
				</b-row>
				<b-row class="content">
					<b-col cols="4" class="content-title">발매타입</b-col
					><b-col cols="8" class="content-content"
						><select id="release" v-model="data.data.release.tag.release"
							><option value="none" selected>없음</option>
							<option
								v-for="(tag, idx) in data.config.release"
								:key="idx"
								:value="tag"
								>{{ tag }}</option
							>
						</select></b-col
					>
				</b-row>
				<b-row class="content">
					<b-col cols="4" class="content-title">구매방법</b-col
					><b-col cols="8" class="content-content"
						><select id="method" v-model="data.data.release.tag.method"
							><option value="none" selected>없음</option>
							<option
								v-for="(tag, idx) in data.config.method"
								:key="idx"
								:value="tag"
								>{{ tag }}</option
							>
						</select></b-col
					>
				</b-row>
				<b-row class="content">
					<b-col cols="4" class="content-title">구매방법</b-col
					><b-col cols="8" class="content-content"
						><select id="ship" v-model="data.data.release.tag.ship"
							><option value="none" selected>없음</option>
							<option
								v-for="(tag, idx) in data.config.ship"
								:key="idx"
								:value="tag"
								>{{ tag }}</option
							>
						</select></b-col
					>
				</b-row>
			</b-container>
		</div>
	</div>
</template>

<script>
// import moment from 'moment';
import { pricefilter } from '@/utils/pricefilter.js';
import { datefilter } from '@/utils/datefilter.js';
export default {
	filters: {
		pricefilter,
		datefilter,
	},
	props: { item: { type: Object, required: true } },
	data() {
		return {
			data: this.item,
		};
	},
	created() {},
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
.content-content select,
.content-content textarea {
	text-align: right;
	text-align-last: right;
	white-space: pre-line;
	word-break: break-word;
	padding: 0 0.7% 0.7% 0.7%;
	font-size: 0.9rem;
	color: black;
	width: 100%;
}
</style>
