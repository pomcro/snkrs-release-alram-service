<template>
	<div>
		<div class="detail_mobile">
			<div class="category_title_box">
				<div class="category_title">VOTE</div>
				<div class="category_sub_title">예상 리셀가격 투표</div>
			</div>
			<b-container
				><b-row class="content">
					<b-col cols="4" class="content-title">최소가격</b-col
					><b-col cols="8" class="content-content"
						><textarea
							id="min_price"
							v-model="data.minPrice"
							type="text"
							rows="1"
							placeholder="상품모델명"
					/></b-col>
				</b-row>

				<b-row class="content">
					<b-col cols="4" class="content-title">최대가격</b-col
					><b-col cols="8" class="content-content"
						><textarea
							id="max_price"
							v-model="data.maxPrice"
							type="text"
							rows="1"
							placeholder="최대 가격"
					/></b-col>
				</b-row>

				<b-row class="content">
					<b-col cols="4" class="content-title">단위가격</b-col
					><b-col cols="8" class="content-content"
						><textarea
							id="unit"
							v-model="data.unit"
							type="text"
							rows="1"
							placeholder="단위 가격"
					/></b-col>
				</b-row>
			</b-container>
		</div>
	</div>
</template>

<script>
export default {
	props: { item: { type: Object, required: true } },
	data() {
		return {
			data: {
				maxPrice: this.item.vote.max_price,
				minPrice: this.item.vote.min_price,
				unit: this.item.vote.unit,
			},
		};
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
