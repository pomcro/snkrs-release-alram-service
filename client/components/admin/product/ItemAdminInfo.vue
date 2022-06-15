<template>
	<div class="iteminfo">
		<div v-if="releaseDetail" class="item_mobile">
			<div class="item_img">
				<div v-if="releaseDetail.thumbnail" class="img">
					<img
						:src="data.thumbnail | imagefilter"
						alt="thumbnail_image"
						@error="replaceByDefault"
					/>
				</div>
				<div v-else class="img">
					<img :src="unLogo" alt="notFound_image" />
				</div>
			</div>
			<div class="item_contents">
				<div class="title_img">
					<label>이미지</label>
					<textarea
						id="img_url"
						v-model="data.img_url"
						type="text"
						rows="1"
						placeholder="이미지 주소"
					/>
					<div class="btn-container">
						<button @click="imageUpdate('update')">수정</button>
						<button @click="imageUpdate('crop')">크롭</button>
					</div>
				</div>
				<div class="title">
					<textarea
						id="name_kr"
						v-model="data.name_kr"
						type="text"
						rows="1"
						placeholder="상품 한국명"
					/>
				</div>
				<div class="title_en">
					<textarea
						id="name"
						v-model="data.name"
						type="text"
						rows="1"
						placeholder="상품 영문명"
					/>
				</div>
				<div class="keyword">
					<textarea
						id="keywords"
						v-model="data.keywords"
						type="text"
						rows="2"
						placeholder="키워드"
					/>
				</div>
				<div class="editor">
					<div class="editor_title">Editor's Note</div>
					<div class="editor_content">
						<textarea
							id="description"
							v-model="data.description"
							rows="5"
							type="text"
							placeholder="상품 설명"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import moment from 'moment';
import { pricefilter } from '@/utils/pricefilter.js';
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
	props: { releaseDetail: { type: Object, required: true } },
	data() {
		return {
			data: {
				thumbnail: this.releaseDetail.thumbnail,
				img_url: this.releaseDetail.thumbnail,
				name: this.releaseDetail.name.toUpperCase(),
				name_kr: this.releaseDetail.name_kr,
				keywords: this.releaseDetail.keywords,
				description: this.releaseDetail.description,
			},
			unLogo: require('@/assets/img/no_image_transparent.png'),
			swiperOption: {
				pagination: {
					el: '.swiper-pagination',
					dynamicBullets: true,
				},
			},
		};
	},
	methods: {
		admin() {
			this.$router.push({
				path: '/admin/product/' + this.$route.params.id,
			});
		},
		// 이미지 업데이트
		async imageUpdate(act) {
			const data = {
				productId: this.$route.params.id,
				product_name: this.data.name,
				img_url: this.imagefilter(this.data.img_url),
				action: act,
			};
			const result = await this.$axios.$post('/admin/prod', data);
			if (result.includes('storage.snkrs98.com')) {
				this.data.thumbnail = result;
				this.data.img_url = result;
			}
		},
		modalId() {
			return 'modal_admin';
		},
		replaceByDefault(e) {
			e.target.src = this.unLogo;
		},
		imagefilter(value) {
			return String(value).replace('320', '1080');
		},
	},
};
</script>

<style scoped>
.iteminfo {
	text-align: center;
}
.iteminfo div {
	text-align: left;
	font-family: Arial;
	width: 100%;
}
/* 모바일 뷰 */
.item_mobile {
	border-bottom: 8px solid rgb(246, 246, 246);
}
.item_contents {
	padding: 6%;
}
.title {
	margin-top: 8%;
}
.title_img {
	display: grid;
}
.title_img label {
	margin-bottom: 0;
	font-size: 0.8rem;
	color: black;
	font-weight: bold;
}
.title_img textarea {
	margin-top: 6px;
	font-size: 0.8rem;
	padding-bottom: 1%;
	border-bottom: 1px solid black;
	resize: none;
	white-space: nowrap;
}
.btn-container {
	margin-top: 6px;
	display: flex;
}
.title_img button {
	flex: 0 0 48%;
	color: white;
	border: 0;
	margin: 1%;
	height: 35px;
	border-radius: 20px;
	background-color: black;
}
.title textarea {
	text-align: left;
	font-size: 1rem;
	font-weight: bold;
	width: 100%;
}
.title_en textarea {
	margin-top: 2%;
	text-align: left;
	font-size: 0.7rem;
	color: rgb(94, 94, 94);
	font-weight: normal;
	width: 100%;
}
.keyword textarea {
	margin-top: 4%;
	text-align: left;
	font-size: 0.7rem;
	color: rgb(94, 94, 94);
	font-weight: normal;
	width: 100%;
}
.title_resale {
	margin-top: 7%;
	text-align: left;
	font-size: 0.7rem;
	color: rgb(94, 94, 94);
	font-weight: normal;
}
.resale_price {
	margin-top: 1%;
	text-align: left;
	font-size: 1.4rem;
	font-weight: bold;
	line-height: 1;
}
.item_img {
	/* Header Height */
	padding-top: 54px;
	display: flex;
	align-items: flex-end;
	background: rgba(157, 160, 162, 0.09);
}
.item_img .img {
	height: 350px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.item_img .img img {
	width: 85%;
}
.item_release {
	padding: 3%;
}
.item_release_time {
	text-align: center;
	font-size: 0.8rem;
	color: black;
}
.item_now {
	margin-top: 1.5%;
	font-size: 1.8rem;
	font-weight: bold;
}
.item_time {
	font-size: 0.75rem;
	color: rgb(94, 94, 94);
	font-weight: 300;
}
.like_share {
	padding: 1% 0 2% 0;
}
.like_share button {
	color: black;
	margin: 1%;
	border-radius: 6px;
	border: none;
	background-color: rgb(243, 243, 243);
	text-align: center;
	line-height: 2em;
	font-weight: normal;
	font-size: 0.75rem;
}
.editor {
	text-align: left;
	margin-top: 6%;
	font-size: 0.75rem;
}
.editor_title {
	font-weight: bold;
	margin-bottom: 1%;
}
.editor_content {
	font-weight: 500;
}
.editor_content textarea {
	width: 100%;
}
.modal_info_header {
	text-align: right;
	width: 100%;

	font-weight: bold;
	padding: 0.4rem 1rem;
}
</style>
