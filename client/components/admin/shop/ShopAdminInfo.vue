<template>
	<div class="iteminfo">
		<div v-if="releaseDetail" class="item_mobile">
			<div class="item_img">
				<div v-if="releaseDetail.release.shop.thumbnail" class="img">
					<img
						:src="releaseDetail.release.shop.thumbnail | imagefilter"
						@error="replaceByDefault"
					/>
				</div>
				<div v-else class="img">
					<img :src="unLogo" />
				</div>
				<div class="title">{{ releaseDetail.release.shop.name }}</div>
			</div>
			<div class="title_url">
				<label>응모링크</label>
				<textarea
					id="url"
					v-model="data.release.url"
					type="text"
					rows="1"
					placeholder="응모 주소"
				/>
			</div>
			<div class="default_container">
				<div class="category_title_box">
					<div class="category_title">RELEASE DATE</div>
					<div class="category_sub_title">응모기간</div>
				</div>
				<b-container>
					<b-row class="content">
						<b-col cols="4" class="content-title">응모시작</b-col
						><b-col cols="8" class="content-content"
							><datetime
								v-model="data.release.startAtISO"
								type="datetime"
								input-id="start_date"
								format="kkkk-LL-dd"
								input-style="text-align:right; font-size:0.9rem;"
							></datetime
						></b-col>
					</b-row>

					<b-row class="content">
						<b-col cols="4" class="content-title">응모마감</b-col
						><b-col cols="8" class="content-content"
							><datetime
								v-model="data.release.endAtISO"
								type="datetime"
								input-id="end_date"
								format="kkkk-LL-dd"
								input-style="text-align:right; font-size:0.9rem;"
							></datetime
						></b-col>
					</b-row>
				</b-container>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import { Datetime } from 'vue-datetime';
import { pricefilter } from '@/utils/pricefilter.js';
import 'vue-datetime/dist/vue-datetime.css';
export default {
	filters: {
		pricefilter,
		imagefilter(value) {
			return String(value).replace('320', '1080');
		},
		datachkfilter(value) {
			if (value === undefined) {
				return 'NULL';
			}
			return value;
		},
	},
	components: {
		Datetime,
	},
	props: { releaseDetail: { type: Object, required: true } },
	data() {
		return {
			data: this.releaseDetail,
			unLogo: require('@/assets/img/no_image_transparent.png'),
		};
	},
	created() {
		this.data.release.startAtISO = moment(
			this.data.release.startAt,
		).toISOString();
		this.data.release.endAtISO = moment(this.data.release.endAt).toISOString();
	},
	methods: {
		admin() {
			this.$router.push({
				path: '/admin/product/' + this.$route.params.id,
			});
		},
		// 이미지 업데이트
		replaceByDefault(e) {
			e.target.src = this.unLogo;
		},
	},
};
</script>

<style scoped>
.iteminfo {
	text-align: center;
}
.iteminfo div {
	font-family: Arial;
	width: 100%;
}
.default_container {
	text-align: center;
	padding: 2% 5% 2% 5%;
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
.content-title {
	text-align: left;
	font-size: 0.9rem;
	color: #333333;
}
.content-content {
	text-align: right;
	padding: 0 0 2% 0;
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
/* 모바일 뷰 */
.item_mobile {
	border-bottom: 8px solid rgb(246, 246, 246);
}
.item_img {
	/* Header Height */
	padding-top: 5%;
	margin-top: 54px;
	display: block;
	text-align: center;
}
.item_img .img {
	height: 100px;
	width: 100px;
	border-radius: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	border: 1px solid #ebebeb;
	object-fit: contain;
	object-position: center;
}
.item_img .title {
	margin-top: 2%;
	font-size: 1.1rem;
	color: black;
	font-weight: bold;
}
.item_img .img img {
	width: 85%;
	border-radius: 50%;
}
.title_url {
	display: block;
	text-align: left;
	padding: 2% 6% 0 6%;
}
.title_url textarea,
.title_url label {
	width: 100%;
}
.title_url textarea {
	margin-top: 6px;
	font-size: 0.8rem;
	padding-bottom: 1%;
	border-bottom: 1px solid black;
	resize: none;
	white-space: nowrap;
}
</style>
