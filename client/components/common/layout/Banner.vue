<template>
	<div class="Banner">
		<button v-if="this.$store.state.isAdmin" class="btn_edit" @click="edit">
			수정하기
		</button>
		<img
			v-if="current_item.banner_type === 'A'"
			:src="current_item.img_url"
			alt="banner"
			@click="search(current_item.keyword)"
		/>
		<img
			v-if="current_item.banner_type === 'B'"
			:src="current_item.img_url"
			alt="banner"
			@click="goItem(current_item.product_id)"
		/>
		<img
			v-if="current_item.banner_type === 'C'"
			:src="current_item.img_url"
			alt="banner"
			@click="goUrl(current_item.url)"
		/>
	</div>
</template>

<script>
export default {
	props: { itemData: { type: Object, required: true } },
	data() {
		return {
			title: '',
			sub_title: '',
			item_list: [],
			current_item: {},
		};
	},
	mounted() {
		// releaseInfo 를 기점으로 카테고리를 분리합니다.
		// 상태관리에서 가져오는데 시간이 걸리기떄문에 구해지면 settimeout을 멈추는것도 괜찮습니다.
		// 데이터 불러온거에서 4개 만 출력하는 fourAll과 카테고리를 정립하는 것
		this.title = this.itemData.title;
		this.sub_title = this.itemData.sub_title;
		this.item_list = this.itemData.data;
		this.current_item = this.item_list[0];
	},
	methods: {
		edit() {
			this.$router.push('/admin/banner/' + this.itemData.componentId);
		},
		search(keyword) {
			if (keyword === undefined) {
				return alert('None');
			}
			this.$nuxt.$loading.start();
			this.$router.push('/search?q=' + keyword + '&p=1');
		},
		goUrl(url) {
			window.open(url);
		},
		goItem(id) {
			if (id === undefined) {
				return alert('None');
			}
			this.$nuxt.$loading.start();
			this.$router.push('/product/' + id);
		},
	},
};
</script>

<style scoped>
.Banner {
	margin: 2rem auto 2rem;
	position: relative;
	overflow: hidden;
}
.Banner img {
	width: 100%;
	cursor: pointer;
}
.Banner .btn_edit {
	position: absolute;
	bottom: 0;
	right: 0;
	padding: 5px 30px;
	background: white;
	text-align: center;
}
</style>
