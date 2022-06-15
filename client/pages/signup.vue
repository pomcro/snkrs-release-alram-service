<template>
	<div>
		<div :class="'signup ' + $mq">
			<h2>회원가입</h2>
			<span class="deco">필수입력*</span>
			<div class="required_form">
				<label for="username">닉네임*</label><br />
				<input v-model="username" type="text" name="username" />
				<label for="email">이메일*</label><br />
				<input v-model="email" type="email" name="email" />
				<label for="pw">비밀번호*</label><br />
				<input v-model="pw" type="password" name="pw" />
			</div>
			<span class="deco2">선택입력</span>

			<span class="deco3">성별</span>
			<div class="selected_form">
				<div class="radio-group">
					<div v-for="(value, index) in gender" :key="'gender_' + index">
						<input
							:id="'option-' + index"
							v-model="selected"
							:value="value.value"
							type="radio"
							name="selector"
						/><label :for="'option-' + index">{{ value.text }}</label>
					</div>
				</div>
			</div>
			<span class="deco3">신발 사이즈</span>
			<div class="sized" @click="showSizeSelector(size.value)">
				<div class="size">{{ size.name }}</div>
			</div>
			<div class="agree_form">
				<label
					><input
						v-model="chkAll"
						type="checkbox"
						name="agree"
						value="all1"
						@change="checkAll()"
					/>
					전체 동의하기</label
				><br />
				<!-- Checkboxes list -->
				<ul>
					<li v-for="check in checkList" :key="'chk_' + check.value">
						<input
							v-model="chekedList"
							type="checkbox"
							:value="'chk_' + check.value"
							@change="updateCheckall()"
						/>
						<strong>(필수)</strong>
						<span class="chk_label">
							{{ check.name }}
							<span class="chk_view_all_label" @click="moveChk(check.location)"
								>전체보기</span
							>
						</span>
					</li>
				</ul>
			</div>
			<button @click="signup()">회원가입</button>
		</div>
		<client-only>
			<slideout-panel></slideout-panel>
		</client-only>
	</div>
</template>
<script>
import SizeSelector from '@/components/item/SizeSelector.vue';
export default {
	asyncData({ route, app, store }) {
		const data = {
			fullPath: route.fullpath,
			name: route.name,
			query: route.query,
		};
		store.state.requestLog = data;
	},
	data() {
		return {
			email: null,
			pw: null,
			username: null,
			size: { name: '모든 사이즈', value: -1 },
			chkAll: false,
			selected: null,
			gender: [
				{ text: '남성', value: 'male' },
				{ text: '여성', value: 'female' },
			],
			checkList: [
				{ name: '개인정보 수집, 이용동의', location: '/privacy', value: 0 },
				{ name: '서비스 이용약관 동의', location: '/terms', value: 1 },
			],
			esChecklist: ['chk_0', 'chk_1'], // 필수 체크 리스트
			chekedList: [],
		};
	},
	created() {
		const layout = {
			hasHeader: true, // Header 여부
			hasNav: false, // Nav(발매정보 / 타임라인) 여부
			hasNavAction: true, // Header 타입
			navTransParent: true, // 투명도 설정
			hasFooter: false, // Footer 여부
			title: '회원가입',
		};
		this.$store.state.layout = layout;
	},
	methods: {
		moveChk(location) {
			window.open(process.env.VUE_APP_WEB_URL + location);
		},
		isEmail(asValue) {
			// eslint-disable-next-line no-useless-escape
			const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
			return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
		},
		chkUsername(asValue) {
			const regExp = /^[ㄱ-ㅎ가-힣a-z]+[ㄱ-ㅎ가-힣a-z0-9]{4,20}$/g;
			return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
		},
		chkPassword(asValue) {
			const regExp = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
			return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
		},
		updateData(value) {
			this.size = value;
		},
		showSizeSelector(size) {
			const panel1Handle = this.$showPanel({
				component: SizeSelector,
				openOn: 'bottom',
				height: 350,
				cssClass: 'slideout-custom',
				props: {
					// any data you want passed to your component
					currentSize: size,
				},
			});

			panel1Handle.promise.then(result => {
				if ('index' in result) {
					this.$emit('selector', result);
					this.updateData(result);
				}
			});
		},
		updateCheckall(chk) {
			const chkLength = this.chekedList.length;
			if (chkLength === this.checkList.length) {
				this.chkAll = true;
			} else {
				this.chkAll = false;
			}
		},
		checkAll() {
			// Check all
			if (this.chkAll === true) {
				for (const key in this.checkList) {
					const id = 'chk_' + this.checkList[key].value;
					this.chekedList.push(id);
				}
			} else {
				this.chekedList = [];
			}
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.$store.state.history = from.path;
				vm.prevRoute = from;
			});
		},
		async signup() {
			if (!this.isEmail(this.email)) {
				// 이메일 틀림
				alert('이메일 형식을 확인해주세요.');
				return;
			}
			for (let i = 0; i < this.esChecklist.length; i++) {
				const value = this.esChecklist[i];
				if (!this.chekedList.includes(value)) {
					alert('필수동의 항목 체크를 확인해주세요.');
					return;
				}
			}
			// 아이디 유효성 검사
			// 패스워드 유효성 검사
			if (this.username == null || this.username.length === 0) {
				alert('닉네임을 입력해주세요.');
				return;
			}
			if (!this.chkUsername(this.username)) {
				alert(
					'닉네임 한/영으로 시작하는 최소 4자/ 최대 20자로 설정해야합니다.',
				);
				return;
			}
			if (this.pw == null || this.pw.length === 0) {
				alert('패스워드를 입력해주세요.');
				return;
			}
			if (!this.chkPassword(this.pw)) {
				alert(
					'패스워드는 최소 6자, 최소 1개의 숫자 혹은 특수 문자를 포함해야 합니다.',
				);
				return;
			}
			const data = {
				account: {
					username: this.username,
					password: this.pw,
					email: this.email,
				},
				user: {
					size: this.size.value,
					gender: this.selected,
				},
			};
			const res = await this.$axios.$post('auth/register', data);
			const eventItem = {
				category: 'signup',
				action: 'sign up',
				label: '',
				value: 1,
			};
			if (res.code === 0) {
				alert('회원가입 성공.');
				eventItem.label = 'success';
				this.$store.dispatch('LOGIN', res);
			} else if (res.code === 1) {
				alert('존재하지 않는 아이디 또는 이메일입니다.');
				eventItem.label = 'not exist accout';
			} else if (res.code === 2) {
				alert('잘못된 패스워드 입니다.');
				eventItem.label = 'worng password';
			} else if (res.code === 3) {
				alert('이미 존재하는 계정입니다.');
				eventItem.label = 'already account';
			} else {
				alert('회원가입중 알 수 없는 오류가 발생하였습니다.');
				eventItem.label = 'Unknown Error';
			}

			this.$ga.event({
				eventCategory: eventItem.category,
				eventAction: eventItem.action,
				eventLabel: eventItem.label,
				eventValue: eventItem.value,
			});
		},
	},
};
</script>

<style scoped>
::v-deep .slideout-panel .slideout-wrapper .slideout {
	transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
	transition-duration: 0.6s;
}
.slideout-custom {
	border-radius: 4% 4% 0 0;
}
.chk_view_all_label {
	font-size: 0.8em;
	text-decoration: underline;
	cursor: pointer;
}
.signup,
.signup.tablet,
.signup.desktop,
.signup.mobiled {
	padding-top: 70px;
	margin-bottom: 2vh;
}
h2 {
	padding: 4.5vw;
	font-weight: bold;
}
.required_form {
	padding-left: 6vw;
	padding-right: 6vw;
	font-size: 11px;
	padding-bottom: 2vh;
	border-bottom: 1vh solid rgb(243, 243, 243);
}
.deco {
	display: block;
	padding-left: 4.5vw;
	font-size: 14px;
	color: #333333;
}
.deco2 {
	display: block;
	margin-top: 2vh;
	padding-left: 1rem;
	font-size: 14px;
	color: #333333;
}
.selected_form {
	padding-left: 6%;
	padding-right: 6%;
	margin-top: 0.5vh;
	font-size: 11px;
}
label {
	margin-top: 2vh;
	margin-bottom: 0.1rem;
}
input[type='password'],
input[type='email'],
input[type='text'] {
	background-color: rgb(243, 243, 243);
	border-radius: 5px;
	border-width: 0px;
	border-style: none;
	padding: 10px;
	font-size: 0.9rem;
	width: 100%;
	height: 34px;
	margin-top: 6px;
}
.deco3 {
	display: block;
	font-size: 11px;
	padding-left: 6vw;
	margin-top: 2vh;
	margin-bottom: 0.1rem;
}
.selected_form {
	text-align: center;
}
.radio-group {
	width: 100%;
}
.radio-group > div {
	flex: 0 0 50%;
}
.selected_form input[type='radio'] {
	position: absolute;
	visibility: hidden;
	display: none;
}
.selected_form label {
	color: #9a929e;
	display: inline-block;
	cursor: pointer;
	font-weight: bold;
	padding: 8px;
	width: 100%;
	border-radius: 30px;
}
.selected_form input[type='radio']:checked + label {
	color: rgb(0, 0, 0);
	background: rgb(243, 243, 243);
}
.selected_form .radio-group {
	display: flex;
	overflow: hidden;
}
.sized {
	margin-top: 2vh;
	padding-bottom: 2vh;
	text-align: center;
	padding-left: 6%;
	padding-right: 6%;
	border-bottom: 1vh solid rgb(243, 243, 243);
}
.size {
	border: 1px solid rgb(94, 94, 94);
	border-radius: 100px;
	width: 100%;
	height: 32px;
	font-size: 0.9rem;
	line-height: 32px;
}
.agree_form {
	margin-top: 2vh;
	padding-left: 6vw;
	padding-right: 6vw;
	padding-bottom: 50px;
	font-size: 0.85rem;
}
.agree_form label {
	margin-top: 0.5vh;
}
button {
	position: fixed;
	bottom: 0;
	max-width: 430px;
	font-size: 14px;
	color: rgb(255, 255, 255);
	text-align: center;
	height: 50px;
	width: 100%;
	background-color: rgb(0, 0, 0);
}
</style>
