<template>
	<div>
		<div class="itemFooter_mobile">
			<div class="product_info">
				<div class="thumb" style="background-color: rgb(235, 240, 245);">
					<img
						:src="summary.thumbnail | imagefilter320"
						alt="thumbnail_img"
						class="thumb_img"
						@error="replaceByDefault"
					/>
				</div>
				<p class="title">
					{{ summary.name }}
				</p>
				<div class="size" @click.prevent="showSizeSelector()">
					<a href="#" class="btn_size"
						><span class="btn_text">{{ current_size.name }}</span>
						<svg-icon
							class="ico-arr-dir-down-circle"
							name="ico-arr-dir-down-circle"
						/>
					</a>
				</div>
			</div>
			<div class="action">
				<div class="userAttract">
					<div v-if="!isSaved" class="attract_btn" @click="goSave()">
						관심등록
					</div>
					<div v-else class="attract_btn" @click="goUnSave()">
						삭제
					</div>
				</div>

				<div class="userDraw" @click="goRaffle">
					응모하기
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { imagefilter320 } from '@/utils/imagefilter.js';
export default {
	filters: {
		imagefilter320,
	},
	props: {
		summary: { type: Object, required: true },
		user: { type: Object, required: true },
	},
	data() {
		return {
			isSaved: false,
			current_size: {},
			unLogo: require('@/assets/img/no_image_transparent.png'),
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
	mounted() {},
	created() {
		this.$parent.$on('selector', this.updateData);
		this.current_size = this.sizeOptionList[0];
		const isLogin = this.$store.state.isLogin;
		if (isLogin) {
			const sizeInfo = this.findSize(this.$store.state.userInfo.size);
			if (sizeInfo !== undefined) {
				this.current_size = sizeInfo;
			}
		}
		this.isSaved = this.user.isSaved;
	},
	methods: {
		replaceByDefault(e) {
			e.target.src = this.unLogo;
		},
		findSize(size) {
			return this.sizeOptionList.find(el => el.size === size); // el is string type
		},
		showSizeSelector() {
			this.$emit('child-method', this.current_size);
		},
		updateData(data) {
			this.current_size = this.sizeOptionList[data.index];
		},
		goRaffle(url) {
			this.$router.push({
				path: '/product/' + this.$route.params.id + '/raffle',
			});
		},
		goSave() {
			if (!this.$store.state.isLogin) {
				if (confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?')) {
					this.$router.push({
						path: '/login',
					});
				}
				return;
			}
			this.$axios.$post('/prod/' + this.$route.params.id + '/save');
			this.isSaved = true;
		},
		goUnSave() {
			if (!this.$store.state.isLogin) {
				if (confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?')) {
					this.$router.push({
						path: '/login',
					});
				}
				return;
			}
			this.$axios.$post('/prod/' + this.$route.params.id + '/unsave');
			this.isSaved = false;
		},
	},
};
</script>

<style scoped>
[class*='ico-'] {
	width: 24px;
	height: 24px;
}
.itemFooter_mobile {
	z-index: 2;
	position: fixed;
	max-width: 430px;
	width: 100%;
	height: auto;
	bottom: 0;
	display: block;
	padding: 15px 10px;
	background: white;
	-webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}
.itemFooter_mobile .action {
	display: flex;
	width: 100%;
}
.product_info {
	margin-bottom: 10px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}
.product_info .size {
	margin-left: auto;
	white-space: nowrap;
}
.product_info .size .btn_size {
	display: block;
	font-size: 16px;
	line-height: 20px;
	letter-spacing: -0.21px;
	color: black;
	font-weight: 700;
}
.product_info .title {
	margin-right: 30px;
	font-size: 13px;
	line-height: 20px;
	letter-spacing: -0.03px;
	overflow: hidden;
	-o-text-overflow: ellipsis;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: rgba(34, 34, 34, 0.8);
}
.product_info .thumb {
	margin-right: 12px;
	position: relative;
	min-width: 44px;
	height: 44px;
	border-radius: 12px;
}
.product_info .thumb img {
	position: absolute;
	top: 30%;
	left: 4px;
	right: 4px;
	bottom: 4px;
	width: 36px;
	height: auto;
}
.userDraw a:active {
	text-decoration: none;
}
.userDraw {
	width: 100%;
	background: black;
	border: 1px solid white;
	color: white;
	font-weight: bold;
	border-radius: 50px;
	font-size: 1rem;
	font-family: 'Arial';
	line-height: 40px;
	text-align: center;
	cursor: pointer;
	margin-left: 2%;
}
.userAttract {
	width: 100%;
	background: white;
	border: 1px solid black;
	border-radius: 50px;
	font-size: 1rem;
	font-family: 'Arial';
	line-height: 40px;
	color: black;
	text-align: center;
	cursor: pointer;
}
.userAttract:active {
	background: black;
	color: white;
}
</style>
