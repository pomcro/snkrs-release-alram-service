<template>
	<!-- 모바일뷰 네비게이션바  -->
	<div v-if="!$store.state.layout.hasNavAction">
		<MainHeader></MainHeader>
	</div>
	<div v-else><ActionHeader></ActionHeader></div>
</template>

<script>
import MainHeader from '@/components/common/nav/default.vue';
import ActionHeader from '@/components/common/nav/action.vue';
export default {
	components: {
		MainHeader,
		ActionHeader,
	},
};
</script>

<style scoped></style>
