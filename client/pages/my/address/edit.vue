<template>
	<div :class="$mq + ' address_form'">
		<client-only>
			<div class="address_content">
				<label for="address_tag">설명</label>
				<input
					v-model="address.tag"
					name="address_tag"
					placeholder="주소록 설명"
				/>
				<label for="address_name">이름</label>
				<div class="address_group">
					<input
						v-model="address.first_name"
						name="address_first_name"
						placeholder="이름"
					/>
					<input
						v-model="address.last_name"
						name="address_last_name"
						placeholder="성"
					/>
				</div>
				<label for="address_phone">연락처</label>
				<input
					v-model="address.phone"
					name="address_phone"
					placeholder="연락처"
				/>
				<label for="address_email">이메일</label>
				<input
					v-model="address.email"
					name="address_email"
					placeholder="이메일"
				/>
				<label for="address_country">국가지역</label>
				<select v-model="address.region" name="address_country">
					<option value="" selected disabled hidden>Select to Country</option>
					<option value="korea">대한민국</option>
					<option value="asia">아시아</option>
					<option value="eu">유럽</option>
					<option value="usa">미국</option>
					<option value="ect">기타</option>
				</select>
				<label for="address_post">우편번호</label>
				<div class="address_post_group">
					<input
						v-model="address.zipcode"
						name="address_post"
						placeholder="우편번호"
					/>
					<button class="btn outlinegrey small" @click="openPostSearch">
						우편번호
					</button>
				</div>

				<label for="address_state">도시</label>
				<div class="address_group">
					<input
						v-model="address.state"
						name="address_state"
						placeholder="도"
					/>
					<input v-model="address.city" name="address_city" placeholder="시" />
				</div>
				<label for="address_one">주소1</label>
				<input
					v-model="address.address1"
					name="address_one"
					placeholder="주소1"
				/>
				<label for="address_two">주소2</label>
				<input
					v-model="address.address2"
					name="address_two"
					placeholder="주소2"
				/>
			</div>
			<div class="address_btn">
				<button class="edit" @click="edit">
					수정완료
				</button>
				<button class="translate" @click="changeLanguage">
					한/영
				</button>
			</div>
		</client-only>
	</div>
</template>

<script>
import Vue from 'vue';
import EventBus from '@/plugins/eventbus.js';
export default {
	middleware: 'authenticated',
	data() {
		return {
			// dummy
			translated: false,
			isDaumLoad: false,
			address: {
				zipcode: '',
				state: '',
				address1: '',
				address2: '',
				city: '',
				region: '',
				email: '',
				phone: '',
				first_name: '',
				last_name: '',
				tag: '',
			},
			daumAddress: {},
		};
	},
	created() {
		const layout = {
			hasHeader: false, // Header 여부
			hasNav: false, // Nav(발매정보 / 타임라인) 여부
			hasNavAction: true, // Header 타입
			navTransParent: false, // 투명도 설정
			hasFooter: false, // Footer 여부
			title: '주소록 수정',
		};
		this.$store.state.layout = layout;
		this.address = this.$store.state.data;
		// 주소록 정보 수신
		EventBus.$on('address', payload => {
			this.daumAddress = payload;
			this.address.zipcode = payload.zonecode;
			this.address.state = payload.sido;
			this.address.address1 = payload.roadAddress;
			this.address.city = payload.sigungu;
		});
	},
	mounted() {
		// Daum 주소 검색 API
		Vue.loadScript(
			'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
		)
			.then(() => {
				// Script is loaded, do something
				this.isDaumLoad = true;
			})
			.catch(() => {
				// Failed to fetch script
			});
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.state.history = from.path;
			vm.prevRoute = from;
		});
	},
	methods: {
		onModal() {},
		async edit() {
			const check = this.address;
			if (check.tag.length === 0 || check.region.length === 0) {
				// 입력해
				alert('설명과 지역은 필수적으로 설정해야합니다.');
				return;
			}
			const result = await this.$axios.$post('my/address/edit', this.address);
			if (result === true) {
				this.$router.back();
			}
		},
		openPostSearch() {
			if (this.isDaumLoad) {
				// eslint-disable-next-line no-undef
				new daum.Postcode({
					oncomplete(data) {
						EventBus.$emit('address', data);
					},
				}).open();
			}
		},
		changeLanguage() {
			if (this.translated) {
				this.changeKorean();
			} else {
				this.changeEnglish();
			}
			this.translated = !this.translated;
		},
		changeEnglish() {
			this.address.state = this.daumAddress.sidoEnglish;
			this.address.address1 = this.daumAddress.addressEnglish;
			this.address.city = this.daumAddress.sigunguEnglish;
		},
		changeKorean() {
			this.address.state = this.daumAddress.sido;
			this.address.address1 = this.daumAddress.address;
			this.address.city = this.daumAddress.sigungu;
		},
	},
};
</script>

<style scoped>
*:focus {
	outline: none;
}
input {
	border: 0;
	outline: none;
}
button {
	border: 0;
}
input::placeholder {
	color: #ebebeb;
}
.address_form {
	margin-top: 50px;
	padding: 1vh 4vw 12vh 4vw;
}
.address_content {
	display: block;
	font-weight: 100;
}
.address_post_group {
	position: relative;
}
.address_post_group button {
	position: absolute;
	top: 50%;
	right: 0;
	margin-top: -19px;
	font-size: 0.7rem;
	border: 1px solid black;
	outline: 0;
}
.address_group {
	display: flex;
}
.address_group input:first-child {
	flex: 0 0 50%;
}
.address_group input:last-child {
	margin-left: 10px;
	flex: 0 0 calc(50% - 10px);
}
.address_content select {
	width: 100%;
	font-size: 0.8rem;
}
.address_content label {
	width: 100%;
	font-size: 0.7rem;
	margin-top: 3vh;
	color: black;
}
.address_content input {
	width: 100%;
	border-bottom: 1px solid #ebebeb;
	font-size: 0.8rem;
	padding-bottom: 10px;
	color: black;
}
.address_content input:focus {
	border-bottom: 1px solid black;
}
.address_btn {
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: 430px;
	margin-bottom: 8px;
	font-size: 0.8rem;
	height: 50px;
	display: flex;
}
.address_btn .edit {
	border-radius: 14px;
	background: black;
	color: white;
	flex: 0 0 73%;
}
.address_btn .translate {
	border-radius: 14px;
	background-color: rgba(157, 160, 162, 0.09);
	color: black;
	flex: 0 0 18%;
	margin-left: 2%;
}
</style>
