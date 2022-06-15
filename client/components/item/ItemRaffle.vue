<template>
	<div>
		<div class="raffle_mobile">
			<div class="category_title_box">
				<div class="category_title">RAFFLES</div>
				<div class="category_sub_title">발매처</div>
			</div>
			<!-- grid version -->
			<b-container>
				<template v-if="releaseDetail.raffles.length">
					<b-row
						v-for="(list, i) in releaseDetail.raffles"
						:key="list.id"
						class="raffle_item"
					>
						<div
							class="foreground"
							:class="{ active: list.isDraw || list.props.status == 2 }"
						></div>
						<b-col cols="3" class="raffle_logo"
							><img :src="list.shop.thumbnail" alt="thumnail_image" />
							<div
								class="raffle_status"
								:style="{
									color: list.props.color,
								}"
							>
								{{ list.props.label }}
							</div>
						</b-col>
						<b-col cols="7" class="raffle_info">
							<b-row class="info_title">{{ list.shop.name }}</b-row>
							<b-row class="info_date"
								><div v-if="parseInt(list.start_date.substr(0, 4)) > 2000">
									응모시작 : {{ list.start_date | rafflefilter }}
								</div>
								<div v-if="parseInt(list.end_date.substr(0, 4)) > 2000">
									응모마감 : {{ list.end_date | rafflefilter }}
								</div></b-row
							>
							<b-row class="raffle_type">
								<span v-for="(type, index) in list.tags" :key="index">
									<a variant="outline-secondary">{{ type }}</a>
								</span>
							</b-row>
						</b-col>
						<b-col
							cols="2"
							class="raffle_btn_group"
							:class="{ active: list.isDraw }"
						>
							<div v-if="!list.isDraw" class="raffle_btn">
								<!-- <b-button
              pill
              variant="outline-secondary"
              @click="goUrl(list.release_url)"
            > -->
								<button v-b-modal="modalId(i)">
									응모
								</button>
								<b-modal :id="'modal' + i" hide-footer no-fade>
									<template v-slot:modal-header="{ close }">
										<!-- Emulate built in modal header close button action -->
										<div class="modal_info_header">
											<button
												style="float:none;"
												type="button"
												aria-label="Close"
												class="close"
												@click="close"
											>
												×
											</button>
										</div>
										<b-container style="padding-bottom:2vh">
											<div class="raffle_brand">
												<div class="raffle_logo2">
													<img
														:src="list.shop.thumbnail"
														alt="thumnail_image"
														@click="goCalendar(i)"
													/>
												</div>
												<div class="raffle_info">
													<div class="info_title">{{ list.shop.name }}</div>
													<div
														v-if="parseInt(list.start_date.substr(0, 4)) > 2000"
														class="info_date"
													>
														응모시작 : {{ list.start_date | rafflefilter }}
													</div>
													<div
														v-if="parseInt(list.end_date.substr(0, 4)) > 2000"
														class="info_date"
													>
														응모마감 : {{ list.end_date | rafflefilter }}
													</div>
												</div>
											</div>
										</b-container>
									</template>
									<div v-b-toggle.collapse-1 class="raffle_intro">
										<span>설명보기</span>
										<b-icon
											v-if="!isExpaned"
											icon="chevron-down"
											style="float:right;margin-top:4px"
											@click="toggleExpand"
										></b-icon>
										<b-icon
											v-else
											icon="chevron-up"
											style="float:right;margin-top:4px"
											@click="toggleExpand"
										></b-icon>
										<div style="clear:both"></div>
										<b-collapse
											id="collapse-1"
											class="mt-2"
											style="font-weight:400"
										>
											{{ list.shop.description }}
										</b-collapse>
									</div>
									<div class="select_box">
										<b-form-select
											v-model="selectedRegionIndex"
											@change="selectRegion"
										>
											<option
												v-for="(value, region) in myAddress"
												:key="region"
												:value="region"
												>{{ region | regionfilter }}</option
											>
										</b-form-select>
										<b-form-select
											v-model="selectedAddress"
											@change="selectAddress"
											><option
												v-for="(value, index) in myAddress[selectedRegion]"
												:key="index"
												:value="index"
												>{{ value.tag }}</option
											></b-form-select
										>
									</div>
									<div v-if="currentAddress.length > 0" class="copy_box">
										<b-container>
											<b-row v-for="(q, i) in currentAddress" :key="q.id">
												<b-col cols="3">{{ q.name }}</b-col>
												<b-col cols="6">{{ q.value }}</b-col>
												<b-col cols="3" style="text-align:right"
													><b-button
														variant="dark"
														style="border-radius:20px"
														@click="goClipboard(i)"
													>
														복사
													</b-button></b-col
												>
											</b-row>
										</b-container>
									</div>
									<div class="ra_btn">
										<div
											v-if="list.isDraw"
											class="attract_btn"
											:class="{ active: list.isDraw }"
											@click="goUnDraw(list)"
										>
											응모체크
										</div>
										<div v-else class="attract_btn" @click="goDraw(list)">
											응모완료
										</div>
										<div class="draw_btn" @click="goUrl(list.release_url)">
											이동하기
										</div>
									</div>
								</b-modal>
								<!-- <b-modal :id="'modal' + i" hide-footer>
                <iframe
                  :src="list.release_url"
                  width="100%"
                  height="100%"
                  frameborder="0"
                  style="position:relative;z 
       index:999"
                ></iframe>
              </b-modal> -->
							</div>

							<div v-else class="raffle_btn_drawed" @click="goUnDraw(list)">
								<button>
									완료
								</button>
							</div>
							<div
								v-if="$store.state.isAdmin"
								class="raffle_btn_edit"
								@click="goEdit(list)"
							>
								<button>
									수정
								</button>
							</div>
							<!--
              <div class="raffle_btn">
                <b-button v-b-modal="modalId(i)">
                  참여전
                </b-button>
              </div>
              -->
						</b-col>
					</b-row>
				</template>
				<template v-else>
					<b-row>
						<b-col cols="12">데이터가 존재하지 않습니다.</b-col>
					</b-row>
				</template>
			</b-container>
			<router-link
				v-if="releaseDetail.raffles.length"
				class="view_all"
				:to="'/product/' + this.$route.params.id + '/raffle'"
			>
				전체보기
			</router-link>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import Clipboard from 'v-clipboard';
import moment from 'moment';
import { rafflefilter, datefilter } from '@/utils/datefilter.js';
import { regionfilter } from '@/utils/regionfilter.js';
Vue.use(Clipboard);
export default {
	filters: {
		datefilter,
		rafflefilter,
		regionfilter,
	},
	props: { releaseDetail: { type: Object, required: true } },
	data() {
		return {
			isExpaned: false,
			myAddress: {},
			selectedRegionIndex: 0,
			selectedRegion: '',
			selectedAddress: 0,
			currentAddress: [],
			raffleStatusConfig: [
				{ status: 0, label: '응모중', color: '#58af58' },
				{ status: 1, label: '발매예정', color: 'red' },
				{ status: 2, label: '발매완료', color: '#000000' },
				{ status: 3, label: '테스트', color: 'red' },
			],
		};
	},
	created() {
		if (this.releaseDetail.raffles.length > 0) {
			for (let i = 0; i < this.releaseDetail.raffles.length; i++) {
				this.releaseDetail.raffles[i].props = this.getRaffleStatus(i);
			}
		}
		this.sortByOnRaffle();
	},
	mounted() {
		// 로그인 되어있을 시 주소록 정보 불러옴
		if (this.$store.state.isLogin) {
			this.addressLoad();
		}
	},
	methods: {
		goCalendar(index) {
			console.log(this.releaseDetail);
			const raffle = this.releaseDetail.raffles;
			const title = raffle[index];
			console.log(title);
			// const url = 'https://calendar.google.com/calendar/u/0/r/eventedit?text=[국내]+이지부스트+테스트&dates=20210314T100000Z/20210314T110000Z&trp=false&details=Brunch+frequently%0A+eggs+benedict!&pli=1&sf=true';
			// window.open(url);
		},
		getRaffleStatus(index) {
			const raffle = this.releaseDetail.raffles;
			const startDate = raffle[index].start_date;
			const endDate = raffle[index].end_date;
			const date = moment();
			const start = moment(startDate);
			const end = moment(endDate);
			let selectedIndex = 1;
			// 사이값 구함
			if (date >= start && date <= end) {
				selectedIndex = 0;
			} else if (date > start && date > end) {
				selectedIndex = 2;
			} else if (date < start) {
				selectedIndex = 1;
			} else if (date <= end && !isNaN(end.unix())) {
				selectedIndex = 0;
			} else {
				selectedIndex = 2;
			}
			return this.raffleStatusConfig[selectedIndex];
		},
		sortByOnRaffle() {
			this.releaseDetail.raffles.sort((a, b) => {
				if (a.props.status < b.props.status) {
					return -1;
				} else {
					return 1;
				}
			});
		},
		modalId(idx) {
			return 'modal' + idx;
		},
		goUrl(url) {
			window.open(url);
		},
		selectRegion(item) {
			this.selectedRegion = item;
			this.selectAddress(0);
		},
		selectAddress(index) {
			const item = this.myAddress[this.selectedRegion][index];
			this.selectedAddress = index;
			this.currentAddress = [
				{ name: 'First Name', value: item.first_name },
				{ name: 'Last Name', value: item.last_name },
				{ name: 'Address 1', value: item.address1 },
				{ name: 'Address 2', value: item.address2 },
				{ name: 'E-mail', value: item.email },
				{ name: 'ZipCode', value: item.zipcode },
				{ name: 'City', value: item.city },
				{ name: 'State', value: item.state },
				{ name: 'Phone', value: item.phone },
			];
		},
		async addressLoad() {
			const result = await this.$axios.$get('my/address');
			const addressList = {};
			for (let i = 0; i < result.data.length; i++) {
				const address = result.data[i];
				if (!Object.keys(addressList).includes(address.region)) {
					addressList[address.region] = [];
				}
				addressList[address.region].push(address);
			}
			const regions = Object.keys(addressList);
			this.myAddress = addressList;
			this.selectedRegionIndex = 0;
			this.selectRegion(regions[0]);
		},
		goDraw(shop) {
			if (!this.$store.state.isLogin) {
				if (confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?')) {
					this.$router.push({
						path: '/login',
					});
				}
				return;
			}
			this.$ga.event({
				eventCategory: 'product',
				eventAction: 'draw product',
				eventLabel: 'product_id : ' + this.$route.params.id,
				eventValue: 1,
			});
			const data = { id: shop.id };
			shop.isDraw = true;
			this.$axios.$post('/prod/' + this.$route.params.id + '/draw', data);
		},
		goUnDraw(shop) {
			if (!this.$store.state.isLogin) {
				if (confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?')) {
					this.$router.push({
						path: '/login',
					});
				}
				return;
			}
			this.$ga.event({
				eventCategory: 'product',
				eventAction: 'undraw product',
				eventLabel: 'product_id : ' + this.$route.params.id,
				eventValue: 0,
			});
			const data = { id: shop.id };
			shop.isDraw = false;
			this.$axios.$post('/prod/' + this.$route.params.id + '/undraw', data);
		},
		goEdit(shop) {
			if (!this.$store.state.isLogin) {
				if (confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?')) {
					this.$router.push({
						path: '/login',
					});
				}
				return;
			}
			this.$router.push({
				path: '/admin/product/' + this.$route.params.id + '/shop',
				query: { id: shop.id },
			});
		},
		toggleExpand() {
			this.isExpaned = !this.isExpaned;
		},
		selectText(element) {
			let range;
			if (document.selection) {
				// IE
				range = document.body.createTextRange();
				range.moveToElementText(element);
				range.select();
			} else if (window.getSelection) {
				range = document.createRange();
				range.selectNode(element);
				window.getSelection().removeAllRanges();
				window.getSelection().addRange(range);
			}
		},
		goClipboard(i) {
			try {
				this.$clipboard(this.currentAddress[i].value);
				// document.execCommand('copy');
			} catch (err) {
				alert('Oops, unable to copy');
			}
			this.$ga.event({
				eventCategory: 'product',
				eventAction: 'copy address',
				eventLabel: 'address ',
				eventValue: 1,
			});
			this.$bvToast.toast(`복사가 완료되었습니다.`, {
				toaster: 'b-toaster-bottom-center',
				solid: true,
				appendToast: false,
			});
		},
	},
};
</script>

<style scoped>
.container {
	padding-left: 0;
	padding-right: 0;
}
.row .col-7 {
	padding-left: 10px;
}
.raffle_mobile {
	text-align: center;
	padding: 2% 5% 0% 5%;
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
.update_date {
	font-size: 0.75rem;
	color: #333333;
	margin-bottom: 2vh;
}
.raffle_item {
	position: relative;
	padding-top: 2vh;
	padding-bottom: 2vh;
	border-bottom: 1px solid #ebebeb;
	margin: 0 auto;
}
.raffle_item .foreground.active {
	position: absolute;
	height: 100%;
	z-index: 1;
	width: 100%;
	top: 0;
	left: 0;
	background-color: white;
	opacity: 0.7;
	pointer-events: none;
}
.raffle_logo {
	padding-left: 0px;
	margin-top: auto;
	margin-bottom: auto;
}
.raffle_logo img {
	width: 50px;
	height: 50px;
	padding: 6px;
	border-radius: 100%;
	border: 1px solid #ebebeb;
	object-fit: contain;
	object-position: center;
}
.raffle_logo div {
	margin-top: 8%;
	font-size: 0.7rem;
	font-weight: bold;
}
.info_title {
	font-size: 1rem;
	font-weight: bold;
}
.info_date {
	font-size: 0.7rem;
	margin-top: 2%;
	color: rgba(34, 34, 34, 0.5);
	display: block;
	text-align: left;
}
.raffle_type {
	min-height: 26.16px;
	max-height: 26.16px;
	overflow: hidden;
	margin-top: 5%;
}
.raffle_type a {
	width: 60px;
	margin-right: 5px;
	font-size: 0.625rem;
	padding: 3px 8px;
	border-radius: 20px;
	color: black;
	border: 1px solid black;
}
.raffle_btn_group {
	text-align: right;
	margin-top: auto;
	margin-bottom: auto;
	padding-left: 0;
	padding-right: 10px;
	outline: none;
	box-shadow: none;
}
.raffle_btn_drawed,
.raffle_btn {
	margin: auto;
}
.raffle_btn_group.active {
	z-index: 1;
}
.drawed {
	background: gray;
}
.raffle_btn_edit button,
.raffle_btn_drawed button {
	background: black;
	color: white;
	font-size: 0.75rem;
	width: 100%;
	margin-bottom: 3px;
	border-radius: 6px;
	padding: 7px 0;
	outline: none;
}
.raffle_btn_edit {
	position: relative;
	z-index: 2;
	margin: auto;
}
.raffle_btn button {
	border: 1px solid black;
	background: white;
	color: black;
	font-size: 0.75rem;
	width: 100%;
	margin-bottom: 3px;
	border-radius: 6px;
	padding: 7px 0;
	outline: none;
}
.raffle_btn button:active {
	background: black;
	color: white;
}
.raffle_intro {
	padding: 1rem 1.5rem;
	font-size: 0.8rem;
	font-weight: bold;
	border-bottom: 1px solid #dee2e6;
}
.raffle_brand {
	display: inline-flex;
	padding: 0.5% 5%;
}
.raffle_logo2 {
	height: 7vh;
	width: 7vh;
	border-radius: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	border: 1px solid #ebebeb;
}
.raffle_logo2 img {
	width: 85%;
	border-radius: 50%;
	object-fit: contain;
	object-position: center;
}
.raffle_logo2 + .raffle_info {
	margin: auto 6px;
}
.raffle_logo2 + .raffle_info > .info_title {
	padding-left: 10px;
}
.raffle_logo2 + .raffle_info > .info_date {
	padding-left: 10px;
}
.select_box {
	height: 96px;
	padding-top: 0.5vh;
	width: 90%;
	margin: auto;
	padding-bottom: 1vh;
}
.select_box select {
	height: 32px;
	margin-top: 10px;
	font-size: 0.7rem;
}
.draw_btn {
	width: 100%;
	height: 100%;
	background: black;
	border: 1px solid white;
	color: white;
	font-weight: bold;
	border-radius: 50px;
	font-size: 1rem;
	font-family: 'Arial';
	line-height: 6vh;
	text-align: center;
	cursor: pointer;
}
.attract_btn {
	width: 100%;
	height: 100%;
	background: white;
	border: 1px solid black;
	border-radius: 50px;
	font-size: 1rem;
	font-family: 'Arial';
	line-height: 6vh;
	text-align: center;
	cursor: pointer;
}
.attract_btn.active {
	z-index: 1;
}
.view_all {
	display: block;
	text-decoration: underline;
	font-weight: bold;
	font-size: 0.7rem;
	padding: 3vh 0 3vh;
	color: #333333;
	border-bottom: 8px solid rgb(246, 246, 246);
}
/* modal */
.modal_raffle {
	display: inline-block;
}
::v-deep .modal {
	overflow-y: hidden;
	overflow-x: hidden;
}
::v-deep .modal-header {
	height: 14vh;
}
::v-deep .modal-content {
	width: 95%;
	margin: auto;
}
.modal-dialog .row {
	margin: 0;
}
.modal-body {
	overflow-y: hidden;
}
.modal_info_header {
	text-align: right;
	width: 100%;

	font-weight: bold;
	padding: 0.4rem 1rem;
}
.copy_box {
	width: 100%;
	height: 230px;
	margin: auto;
	background: rgb(246, 246, 246);
	font-size: 3.5%;
}
.copy_box div {
	line-height: 1.2rem;
	font-size: 0.75rem;
	padding: 0;
	margin-top: 9px;
	align-items: center;
}
.copy_box > .container {
	overflow: scroll;
	margin-top: 3px;
	height: 100%;
	padding: 0.5% 5%;
}
.copy_box button {
	font-size: 0.7rem;
	padding: 5px 16px;
	background: rgb(220, 220, 220);
	border: none;
	color: black;
}
.ra_btn {
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 8vh;
	width: 100%;
	text-align: center;
	display: inline-flex;
	background: rgb(228, 228, 228);
}
.ra_btn > div {
	display: grid;
	width: 48%;
	height: 90%;
	align-items: center;
	text-align: center;
	margin: auto;
}
</style>
