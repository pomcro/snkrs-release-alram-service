<template>
	<v-layout column> </v-layout>
</template>

<script>
export default {
	async asyncData({ redirect, route, app, store }) {
		const redirectUri =
			process.env.NODE_ENV === 'production'
				? process.env.VUE_APP_WEB_URL
				: process.env.VUE_APP_WEB_DEV_URL;
		const postData = {
			redirect_uri: redirectUri + route.path,
			code: route.query.code,
			state: route.query.state,
		};
		const result = await app.$axios.post('/auth/naver', postData);
		const res = result.data;
		store.dispatch('LoginResponse', { res }).then(data => {
			if (data.code === 0) {
				return redirect('/');
			}
		});
	},
};
</script>
