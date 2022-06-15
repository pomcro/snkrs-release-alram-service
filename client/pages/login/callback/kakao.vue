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
		};
		const result = await app.$axios.post('/auth/kakao', postData);
		const res = result.data;
		store.dispatch('LoginResponse', { res }).then(data => {
			if (data.code === 0) {
				// eslint-disable-next-line no-undef
				return redirect('/');
			}
		});
	},
};
</script>
