<template>
	<div class="iteminfo">
		<div v-if="banner" class="item_mobile">
			<div class="item_img" :style="{ backgroundColor: color }">
				<div class="drgree" :style="`transform: rotate(${rotation}deg);`">
					<div v-if="banner.img_url" class="img">
						<img
							:src="imagefilter(banner.img_url)"
							alt="banner"
							@error="replaceByDefault"
						/>
					</div>
					<div v-else class="img">
						<img :src="unLogo" alt="notFound_image" />
					</div>
				</div>
			</div>
			<div class="item_contents">
				<div class="item_default">
					<div class="title_ratio">
						<label>이미지 회전</label>
						<vue-slider
							v-model="rotation"
							:min="0"
							:max="360"
							:interval="sliderDegreeCustomzie.interval"
							:process-style="{ backgroundColor: 'black' }"
							:tooltip-style="{
								backgroundColor: 'black',
								borderColor: 'black',
								z_index: 0,
							}"
							:tooltip="'always'"
						>
						</vue-slider>
						<label>이미지 비율</label>
						<vue-slider
							v-model="ratio"
							:min="0"
							:max="2"
							:interval="sliderCustomzie.interval"
							:process-style="{ backgroundColor: 'black' }"
							:tooltip-style="{
								backgroundColor: 'black',
								borderColor: 'black',
								z_index: 0,
							}"
							:tooltip="'always'"
						>
						</vue-slider>
						<label>이미지 좌표</label>
						<div class="position_group">
							<input v-model="posX" name="position_x" placeholder="X" />
							<input v-model="posY" name="position_y" placeholder="Y" />
						</div>
					</div>
					<div class="title_img">
						<label>이미지</label>
						<div class="img_selector">
							<textarea
								id="img_url"
								v-model="img_url"
								type="text"
								rows="1"
								placeholder="이미지 주소"
							/>
							<client-only>
								<verte
									v-model="color"
									picker="square"
									menu-position="center"
									model="hex"
								></verte
							></client-only>
						</div>
						<div class="image_upload">
							<input
								ref="inputFile"
								type="file"
								accept="image/png"
								@change="uploadImage"
							/>
							<button
								class="btn_file_delete"
								style="display: block; cursor: pointer;"
							>
								<svg-icon
									class="ico-delete-circle"
									name="ico-delete-circle"
									@click="clearUpload"
								/>
							</button>
						</div>
					</div>
					<div class="content_banner_type">
						<label for="banner_type">배너타입</label>
						<select v-model="banner.sub_type" name="banner_type">
							<option value="">배너 타입을 선택해주세요.</option>
							<option value="A">키워드검색</option>
							<option value="B">상품이동</option>
							<option value="C">URL이동</option>
						</select>
					</div>
					<div v-if="banner.sub_type == 'A'" class="keyword_type">
						<label for="keywords">키워드</label>
						<textarea
							id="keywords"
							v-model="banner.keyword"
							type="text"
							rows="1"
							placeholder="키워드"
						/>
					</div>
					<div v-if="banner.sub_type == 'B'" class="product_type">
						<label for="product">상품ID</label>
						<textarea
							id="product"
							v-model="banner.product_id"
							type="number"
							rows="1"
							placeholder="상품ID"
						/>
					</div>
					<div v-if="banner.sub_type == 'C'" class="url_type">
						<label for="url">주소</label>
						<textarea
							id="url"
							v-model="banner.url"
							type="text"
							rows="1"
							placeholder="이동될 URL"
						/>
					</div>
				</div>
				<div class="item_product">
					<div class="search_container">
						<label>제품검색</label>
						<div class="search_wrap">
							<div class="search_area">
								<div class="search">
									<svg-icon class="ico-search-gray" name="ico-search-gray" />
									<input
										type="text"
										placeholder="브랜드명, 모델명, 모델번호 등"
										title="검색창"
										value=""
										class="input_search show_placeholder_on_focus"
										@input="search = $event.target.value"
										@keyup.enter="SearchInput()"
									/>
									<button
										class="btn_search_delete"
										style="display: block; cursor: pointer;"
									>
										<svg-icon
											class="ico-delete-circle"
											name="ico-delete-circle"
											@click="clear"
										/>
									</button>
								</div>
							</div>
						</div>
						<div
							v-if="searchList.length > 0 && search.length > 0"
							class="suggest_wrap"
						>
							<div class="suggest_area">
								<div class="suggest_title_area" style="">
									<p class="suggest_title">{{ search }}</p>
									<a href="#" class="more_link" style=""
										><span class="more_text">{{ searchCount }}</span>

										<svg-icon class="ico-arr-right" name="ico-arr-right" />
									</a>
								</div>
								<ul class="suggest_list mo">
									<li
										v-for="product in searchList"
										:key="'product_' + product.data.id"
										class="suggest_item"
										@click="select(product)"
									>
										<div class="suggest_thumb">
											<img
												:src="product.data.thumbnail"
												alt="thumbnail_image"
												class="thumb_img"
											/>
										</div>
										<div class="suggest_info">
											<p class="model_title">
												{{ product.data.name }}
											</p>
											<p class="model_sub_info">
												{{ product.data.name_kr }}
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div class="product_container">
						<label>제품정보</label>
						<div>
							<div class="product_thumbnail" @click="copyImage">
								<img
									alt="thumbnail_image"
									:src="selectedItem.data.thumbnail"
									class="product_thumbnail_img"
								/>
							</div>
							<div class="product_info">
								<div class="title">
									<textarea
										id="name_kr"
										v-model="selectedItem.data.name_kr"
										type="text"
										rows="1"
										placeholder="상품 한국명"
									/>
								</div>
								<div class="title_en">
									<textarea
										id="name"
										v-model="selectedItem.data.name"
										type="text"
										rows="1"
										placeholder="상품 영문명"
									/>
								</div>
								<div class="modelId">
									{{ selectedItem.data.model }}
								</div>
								<div class="productId">
									{{ selectedItem.data.id }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import moment from 'moment';
import Verte from 'verte';
import 'verte/dist/verte.css';

import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js';
import 'vue-slider-component/dist-css/vue-slider-component.css';
import 'vue-slider-component/theme/default.css';
// register component globally
import { pricefilter } from '@/utils/pricefilter.js';
export default {
	components: {
		Verte,
		VueSlider,
	},
	filters: {
		pricefilter,
		datachkfilter(value) {
			if (value === undefined) {
				return 'NULL';
			}
			return value;
		},
	},
	props: { banner: { type: Object, required: true } },
	data() {
		return {
			rotation: 0,
			sliderDegreeCustomzie: {
				interval: 1,
				lineHeight: 10,
				data: [],
				processStyle: {
					backgroundColor: '#000',
				},
				tooltipStyles: {
					backgroundColor: '#000',
					borderColor: '#0000',
				},
			},
			sliderCustomzie: {
				interval: 0.05,
				lineHeight: 10,
				data: [],
				processStyle: {
					backgroundColor: '#000',
				},
				tooltipStyles: {
					backgroundColor: '#000',
					borderColor: '#0000',
				},
			},
			ratio: 0.85,
			posX: null,
			posY: null,
			search: '',
			searchList: [],
			searchCount: 0,
			upload_img: null,
			img_url: this.banner.img_url,
			banner_url: this.banner.img_url,
			color: '#9da0a2',
			selectedItem: {
				data: {
					name: '',
					name_kr: '',
					thumbnail: '',
					id: this.banner.product_id,
				},
			},
			unLogo: require('@/assets/img/no_image_transparent.png'),
		};
	},
	created() {
		this.$parent.$on('update', this.updateData);
		this.$parent.$on('preview', this.previewData);
	},
	methods: {
		async getBase64(file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			const result = await new Promise(function(resolve, reject) {
				reader.onload = function() {
					resolve(reader.result);
				};
				reader.onerror = function(error) {
					reject(error);
				};
			});
			return result;
		},
		async uploadImage(e) {
			const file = e.target.files[0];
			this.upload_img = await this.getBase64(file);
			this.banner.img_url = URL.createObjectURL(file);
		},
		clearUpload() {
			this.upload_img = null;
			this.banner.img_url = this.banner_url;
			this.$refs.inputFile.value = null;
		},
		async updateData() {
			this.$nuxt.$loading.start();
			const data = {
				banner: this.banner,
				color: this.color,
				keyword: this.keyword,
				product: this.selectedItem.data,
			};
			const result = await this.$axios.$post('web/banner/edit', data);
			if (result === true) {
				this.$router.back();
			}
		},
		copyImage() {
			this.banner.img_url = this.imagefilter(this.selectedItem.data.thumbnail);
			this.img_url = this.imagefilter(this.selectedItem.data.thumbnail);
			this.upload_img = null;
		},
		async previewData() {
			if (
				this.selectedItem.data.name == null ||
				this.selectedItem.data.name.length === 0
			) {
				alert('제품 명(영문)을 입력해주세요');
				return;
			}
			if (
				this.selectedItem.data.name_kr == null ||
				this.selectedItem.data.name_kr.length === 0
			) {
				alert('제품 명(한글)을 입력해주세요');
				return;
			}
			this.$nuxt.$loading.start();
			if (this.posX == null) {
				this.posX = 0;
			}
			if (this.posY == null) {
				this.posY = 0;
			}
			const data = {
				img_url: this.imagefilter(this.img_url),
				file: this.upload_img,
				color: this.color,
				name_kr: this.selectedItem.data.name_kr,
				name: this.selectedItem.data.name,
				ratio: this.ratio,
				rotation: this.rotation,
				posx: parseInt(this.posX),
				posy: parseInt(this.posY),
			};
			const result = await this.$axios.$post('/admin/banner', data);
			this.rotation = 0;
			this.banner.img_url = result;
			this.$nuxt.$loading.finish();
		},
		clear() {
			this.searchList = [];
			this.search = '';
		},
		select(prod) {
			this.clear();
			this.selectedItem = prod;
			this.banner.product_id = prod.data.id;
		},
		async SearchInput() {
			if (this.search.length !== 0) {
				const postData = { query: this.search, type: 'preview' };
				return await this.$axios
					.$post('/search', postData)
					.then(res => {
						this.searchList = res.data;
						this.searchCount = res.cnt;
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
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
.position_group {
	display: flex;
}
.img_selector {
	display: flex;
}
.product_type label,
.url_type label,
.keyword_type label,
.content_banner_type label {
	width: 100%;
}
.content_banner_type select {
	width: 100%;
}
.keyword_type,
.url_type,
.product_type,
.content_banner_type {
	margin-top: 6%;
}
.product_type textarea,
.url_type textarea,
.keyword_type textarea {
	width: 100%;
}
.product_container {
	margin-top: 6%;
}
.product_container > div {
	display: flex;
	margin-top: 2%;
	align-items: center;
}
.product_info {
	width: 80%;
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
.modelId {
	font-size: 0.7rem;
	margin-top: 6px;
}
.productId {
	font-size: 0.7rem;
	margin-top: 6px;
}
.product_thumbnail {
	float: left;
	margin-right: 7px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 60px;
}
.product_thumbnail img {
	width: 80%;
}
/* suggest */
.ico-arr-right {
	display: inline-block;
	vertical-align: top;
	width: 18px;
	height: 18px;
}
.search_container {
	position: relative;
}
.suggest_title {
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.21px;
	color: #000;
}
.more_text {
	margin-top: 1px;
	margin-right: 2px;
	display: inline-block;
	vertical-align: top;
	font-size: 12px;
	line-height: 16px;
	letter-spacing: -0.06px;
	color: #000;
}
.model_title {
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.21px;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.model_sub_info {
	margin-top: 2px;
	font-size: 12px;
	line-height: 18px;
	letter-spacing: -0.06px;
	color: rgba(34, 34, 34, 0.5);
}
.suggest_wrap {
	position: absolute;
	background: #fefefe;
	width: inherit;
	left: 0;
	z-index: 2;
	padding: 10px;
	max-height: 200px;
	overflow-y: scroll;
}
.suggest_item {
	list-style: none;
	display: flex;
	border-bottom: 1px solid #ebebeb;
	align-items: center;
	padding: 10px 0;
}
.suggest_list {
	margin-top: 6px;
}
.suggest_title_area {
	display: flex;
	justify-content: space-between;
}
.suggest_thumb {
	float: left;
	margin-right: 7px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 60px;
}
.suggest_thumb img {
	width: 80%;
}
.search_area .ico-search-gray {
	position: absolute;
	top: 8px;
	left: 12px;
}
.image_upload {
	display: flex;
	align-items: center;
	margin-top: 10px;
}
.image_upload button {
	width: 24px;
	height: 24px;
	background: transparent;
	outline: none;
}
.btn_search_delete {
	position: absolute;
	top: 8px;
	right: 12px;
	width: 24px;
	height: 24px;
	background: transparent;
	outline: none;
}
.search {
	position: relative;
	padding: 0 40px 0 44px;
	height: 40px;
	background-color: #f4f4f4;
	border-radius: 8px;
}
.input_search {
	width: 100%;
	height: 100%;
	-webkit-transition: all 0.1s;
	-o-transition: all 0.1s;
	transition: all 0.1s;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.21px;
}
.iteminfo {
	text-align: center;
	padding-bottom: 150px;
}
.item_contents > div {
	text-align: left;
	font-family: Arial;
	width: 100%;
}
/* 모바일 뷰 */
.item_default {
	border-bottom: 8px solid rgb(246, 246, 246);
	padding: 6%;
}
.item_product {
	border-bottom: 8px solid rgb(246, 246, 246);
	padding: 6%;
}
.title_ratio {
	display: block;
}
.title_img {
	display: block;
	margin-top: 6%;
}
.title_img label {
	display: inline-block;
	margin-bottom: 0.5rem;
}
.title_img input {
	overflow: hidden;
}
.title_img textarea {
	font-size: 0.9rem;
	padding-bottom: 1%;
	border-bottom: 1px solid black;
	resize: none;
	white-space: nowrap;
	width: 100%;
	margin-right: 10px;
}
.btn-container {
	margin-top: 6px;
	display: flex;
}
.keyword textarea {
	margin-top: 4%;
	text-align: left;
	font-size: 0.7rem;
	color: rgb(94, 94, 94);
	font-weight: normal;
	width: 100%;
}
.item_img {
	/* Header Height */
	padding-top: 54px;
	display: flex;
	align-items: flex-end;
	background: #9da0a2;
	justify-content: center;
}
.item_img .img {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 370px;
}
.item_img .img img {
	width: 100%;
}
.modal_info_header {
	text-align: right;
	width: 100%;

	font-weight: bold;
	padding: 0.4rem 1rem;
}
</style>
