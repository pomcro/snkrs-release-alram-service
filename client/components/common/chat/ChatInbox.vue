<template>
	<div class="live-chat">
		<div class="layer_header disabled">
			<div class="title">LIVE CHAT</div>
		</div>
		<ul class="chat_list">
			<li class="chat_container">
				<div class="chat_item_user">
					<span
						class="w-1 h-1 rounded-full inline-flex items-center justify-center text-white dark:text-gray-900"
						style="background-color: rgb(138, 109, 233);"
					></span
					><span class="flex items-center"
						>사슴과춤을<span
							class="ml-1 text-gray-400 dark:text-gray-600 text-xxs"
							>C3H</span
						><i
							aria-hidden="true"
							class="fas fa-ban text-gray-200 dark:text-gray-800 ml-1.5"
						></i
					></span>
				</div>
				<div class="chat_item">
					<span class="w-1"></span
					><span class="item">워코 발도내밀지마라 차트</span
					><span
						class="mx-1.5 mb-0.5 text-xs whitespace-nowrap text-gray-500"
						title="2021.03.02 21:10:59"
						>21:10</span
					>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {
		console.log('chat widget mounted');
	},
	methods: {
		sizeChart() {
			this.chartVisible = !this.chartVisible;
		},
		findSize(size) {
			return this.sizeOptionList.findIndex(el => el.size === size);
		},
		sizeSelect(i) {
			const result = {
				index: i,
				value: this.sizeOptionList[i].size,
				name: this.sizeOptionList[i].name,
			};
			this.$emit('closePanel', result);
			this.activeItem = i;
		},
	},
};
</script>

<style scoped>
.size_container {
	overflow: scroll;
}
.row_title {
	padding: 5px 0px;
	display: flex;
	justify-content: space-around;
	-webkit-box-align: stretch;
	align-items: stretch;
	text-align: center;
	background: white;
	height: 36px;
	box-shadow: rgba(206, 206, 206, 0.7) 0px 13px 20px 0px;
}
.row_item {
	flex-direction: row;
	justify-content: space-around;
	-webkit-box-align: stretch;
	align-items: stretch;
	text-align: center;
	background: rgb(250, 250, 250);
	display: flex !important;
}
.row_item div {
	text-align: center;
	width: 20%;
	font-size: 14px;
	color: rgb(0, 0, 0);
	letter-spacing: 1.2px;
	padding: 7px 0px 8px;
}
/* 모바일 리스트 누르면 나오는 프로파일 */
.layer_header {
	display: flex;
	justify-content: left;
	align-items: center;
	margin: 4% 4% 1% 4%;
	text-align: center;
}
.layer_header .title {
	font-size: 16px;
}
.live-chat {
	background: white;
	width: 100%;
	height: 100%;
}
.chat_list {
	height: 100%;
	border: none;
	padding: 6px 6px 20px;
	overflow-y: auto;
	text-align: center;
	border-width: 1px 0 0 1px;
}
.chat_container {
	display: list-item;
}
.chat_item_user {
	display: flex;
}
.chat_item {
	display: flex;
}
.chat_item.item {
	background-color: rgba(39, 39, 42, var(--tw-bg-opacity));
	--tw-bg-opacity: 1;
	color: white;
	font-size: 0.76rem;
	padding: 8px;
}
.timestamp {
	align-self: flex-end;
	margin-left: 6px;
	font-size: 11px;
	--tw-text-opacity: 1;
	color: rgba(113, 113, 122, var(--tw-text-opacity));
}
</style>
