<template>
	<div class="address_form">
		<client-only>
			<div class="header_bar" data-text-content="true">
				<div class="search-box">
					<a class="search-btn" href="#">
						<b-icon icon="search" aria-hidden="true"></b-icon>
					</a>
					<input
						v-model="search"
						type="text"
						class="search-txt"
						placeholder="검색"
						@input="handleSearchInput"
					/>
				</div>
				<div class="selector logo_navbar">
					<div class="logo_nav">
						<!-- props로 넘겨준다. -->
						<div class="nav_router">
							<NuxtLink to="/my/address" class="router">전체</NuxtLink>
						</div>
						<div class="nav_router">
							<nuxt-link to="/my/address?region=asia" class="router"
								>아시아</nuxt-link
							>
						</div>
						<div class="nav_router">
							<nuxt-link to="/my/address?region=usa" class="router"
								>미국</nuxt-link
							>
						</div>
						<div class="nav_router">
							<nuxt-link to="/my/address?region=eu" class="router"
								>유럽</nuxt-link
							>
						</div>
					</div>
				</div>
			</div>
			<div v-if="this.$route.query.region === 'asia'" class="addressList">
				<addressComponent
					v-for="(address, i) in searchList"
					:key="address.updateAt"
					:address-data="address"
					@remove-address="removeAddress('asia', i)"
				></addressComponent>
			</div>
			<div v-else-if="this.$route.query.region === 'eu'" class="addressList">
				<addressComponent
					v-for="(address, i) in searchList"
					:key="address.updateAt"
					:address-data="address"
					@remove-address="removeAddress('eu', i)"
				></addressComponent>
			</div>
			<div v-else-if="this.$route.query.region === 'usa'" class="addressList">
				<addressComponent
					v-for="(address, i) in searchList"
					:key="address.updateAt"
					:address-data="address"
					@remove-address="removeAddress('usa', i)"
				></addressComponent>
			</div>
			<div v-else class="addressList">
				<addressComponent
					v-for="(address, i) in searchList"
					:key="address.updateAt"
					:address-data="address"
					@remove-address="removeAddress('all', i)"
				></addressComponent>
			</div>
			<div style="clear: both"></div>
			<div class="footer">
				<button class="btn-add" @click="add()">
					추가
				</button>
				<button class="btn-done" @click="back()">완료</button>
			</div>
		</client-only>
	</div>
</template>

<script>
import addressComponent from '@/components/user/address/addressComponent';
export default {
	components: {
		addressComponent,
	},
	middleware: 'authenticated',
	beforeRouteEnter(to, from, next) {
		next(vm => {
			if (!from.path.includes(vm.$route.path)) {
				vm.$store.state.history = from.path;
				vm.prevRoute = from;
			}
		});
	},
	async asyncData({ route, app, store }) {
		return await app.$axios
			.$get('my/address')
			.then(res => {
				return { searchList: res.data, addressAll: res.data };
			})
			.catch(err => {
				console.log(err);
			});
	},
	data() {
		return {
			// dummy
			addressAll: [],
			addressAsia: [],
			addressUsa: [],
			addressEu: [],
			search: '',
			searchList: [],
			regionList: {
				korea: '대한민국',
				europe: '유럽',
				america: '미국',
				asia: '아시아',
				ect: '기타',
			},
		};
	},
	watch: {
		'$route.query.region'() {
			this.searchList = this.getCurrentList();
		},
	},
	created() {
		if (this.$store.state.history === this.$route.path) {
			this.$store.state.history = '/';
		}
		const layout = {
			hasHeader: false, // Header 여부
			hasNav: false, // Nav(발매정보 / 타임라인) 여부
			hasNavAction: true, // Header 타입
			navTransParent: false, // 투명도 설정
			hasFooter: false, // Footer 여부
			title: '주소록 설정',
		};
		this.$store.state.layout = layout;
		this.region();
	},
	methods: {
		getCurrentList() {
			const currentRegion = this.$route.query.region;
			let currentArray = null;
			switch (currentRegion) {
				case 'asia':
					currentArray = this.addressAsia;
					break;
				case 'eu':
					currentArray = this.addressEu;
					break;
				case 'usa':
					currentArray = this.addressUsa;
					break;
				default:
					currentArray = this.addressAll;
					break;
			}
			return currentArray;
		},
		handleSearchInput(e) {
			this.search = e.target.value;
			const currentArray = this.getCurrentList();
			if (this.search.length !== 0) {
				const filteredList = currentArray.filter(item => {
					return (
						item.address1.includes(this.search) ||
						item.address2.includes(this.search) ||
						item.zipcode.includes(this.search) ||
						item.tag.includes(this.search) ||
						this.regionList[item.region].includes(this.search)
					);
				});
				this.searchList = filteredList;
			} else {
				this.searchList = currentArray;
			}
		},
		region() {
			const all = this.addressAll;
			for (let i = 0; i < all.length; i++) {
				const address = all[i];
				switch (address.region) {
					case 'asia':
						this.addressAsia.push(address);
						break;
					case 'usa':
						this.addressUsa.push(address);
						break;
					case 'europe':
						this.addressEu.push(address);
						break;
				}
			}
		},
		removeAddress(region, index) {
			// eslint-disable-next-line no-var
			var spliceItem = null;
			switch (region) {
				case 'all':
					spliceItem = this.addressAll[index];
					break;
				case 'asia':
					spliceItem = this.addressAsia[index];
					this.addressAsia.splice(index, 1);
					break;
				case 'eu':
					spliceItem = this.addressEu[index];
					this.addressEu.splice(index, 1);
					break;
				case 'usa':
					spliceItem = this.addressUsa[index];
					this.addressUsa.splice(index, 1);
					break;
			}
			const spliceIndex = this.addressAll.findIndex(
				el => el.updateAt === spliceItem.updateAt,
			);
			this.addressAll.splice(spliceIndex, 1);
		},
		add() {
			this.$router.push({ path: 'address/add' });
		},
		back() {
			this.$router.back();
		},
	},
};
</script>

<style scoped>
.header_bar {
	margin: auto;
	width: 100%;
	max-width: 430px;
	margin-top: 80px;
	background: white;
}
.search-box {
	margin: auto;
	height: 30px;
	background-color: rgb(243, 243, 243);
	border: 1px solid rgb(243, 243, 243);
	border-radius: 100px;
	box-shadow: 0px 0px 0.5px 1px rgb(243, 243, 243);
	color: rgb(158, 158, 158);
	width: 90%;
}
.search-box a {
	color: rgb(158, 158, 158);
}
.search-btn {
	text-decoration: none;
	float: left;
	width: 30px;
	height: 30px;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.search-txt {
	display: flex;
	padding: 0;
	width: 80%;
	border: none;
	background: none;
	outline: none;
	float: left;
	line-height: 30px;
}
.selector {
	margin-top: 2vh;
}
.logo_navbar {
	height: 40px;
	padding: 0;
	text-align: center;
	box-shadow: 0px 4px 3px -3px rgba(0, 0, 0, 0.05);
}
.nav_router {
	display: inline-block;
	width: 23%;
	height: 100%;
	line-height: 42px;
}
.router {
	display: block;
	width: 100%;
	height: 100%;
	font-size: 13px;
	font-weight: 300;
	color: black;
	text-decoration: none;
}
.router.nuxt-link-exact-active {
	display: block;
	width: 100%;
	height: 42px;
	padding: 0 1rem 0 1rem;
	font-size: 0.8rem;
	border-bottom: 3px solid black;
	font-weight: 500 !important;
}
.footer {
	display: flex;
	z-index: 999;
	bottom: 0;
	position: fixed;
	padding: 10px 20px;
	border-top: 1px solid #ebebeb;
	width: 100%;
	max-width: 430px;
}
.footer button {
	margin: 0 10px 0 0;
	font-size: 0.9rem;
	font-weight: 400;
	border-radius: 12px;
	height: 50px;
	line-height: inherit;
	text-align: center;
	outline: none;
	border: none;
}
.footer .btn-add {
	background-color: rgba(157, 160, 162, 0.09);
	color: black;
	flex: 0 0 65%;
}
.footer .btn-done {
	background-color: black;
	color: white;
	flex: 0 0 35%;
}
.addressList {
	margin-top: 10px;
}
</style>
