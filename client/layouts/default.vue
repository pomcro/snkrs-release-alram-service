<template>
	<div>
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
		/>
		<meta name="HandheldFriendly" content="true" />
		<AppNavbar></AppNavbar>
		<transition name="fade" mode="out-in">
			<nuxt />
		</transition>
		<client-only>
			<app-footer v-if="$store.state.layout.hasFooter"></app-footer>
		</client-only>
	</div>
</template>

<script>
import AppNavbar from '@/components/common/AppNavbar.vue';
import AppFooter from '@/components/common/AppFooter.vue';
import firebase from '@/plugins/sw.js';
import '@firebase/messaging';
export default {
	components: {
		AppNavbar,
		AppFooter,
	},

	async mounted() {
		const token = await this.getToken();
		if (token !== null && token !== undefined) {
			await this.uploadFcmToekn(token);
		}
	},

	methods: {
		async getToken() {
			const messaging = firebase.messaging();
			return await new Promise((resolve, reject) => {
				messaging
					.getToken({
						vapidKey:
							'BFmtUbU6iFB3ZDf3806k2GoRzfujBfDSpTDDiqUclC3kDKo-24ffVFhn9zX5RNnShpcCDZwNWzfOVAbHlIQqkvs',
					})
					.then(function(result) {
						if (result) {
							resolve(result);
						} else {
							// Need  Permission Granted
						}
					})
					.catch(function(err) {
						reject(err);
						// console.log('Unable to get permission to notify.', err);
					});
			});
		},
		async uploadFcmToekn(tk) {
			const postData = { token: tk };
			return await this.$axios.post('api/fcm/save', postData);
		},
	},
};
</script>
