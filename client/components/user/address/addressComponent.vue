<template>
	<div class="address_list">
		<div class="address_info">
			<div class="info_name">{{ addressData.tag }}</div>
			<div class="info_address">
				({{ addressData.zipcode }}) {{ addressData.address2 }},
				{{ addressData.address1 }}
			</div>
			<div class="info_region">
				<div data-text-content="true" class="region_s">
					{{ addressData.region | regionfilter }}
				</div>
			</div>
			<div class="address_btn">
				<b-button size="sm" variant="dark" @click="editAddress(addressData)"
					>수정</b-button
				>
				<b-button
					size="sm"
					variant="light"
					@click="deleteAddress(addressData.key)"
					>삭제</b-button
				>
			</div>
		</div>
	</div>
</template>

<script>
import { regionfilter } from '@/utils/regionfilter.js';
export default {
	filters: {
		regionfilter,
	},
	props: {
		addressData: { type: Object, required: true },
	},
	methods: {
		editAddress(data) {
			this.$store.state.data = data;
			this.$router.push('address/edit');
		},
		async deleteAddress(id) {
			const data = { key: id };
			const result = await this.$axios.$post('my/address/delete', data);
			if (result === true) {
				this.$emit('remove-address', id);
			}
		},
	},
};
</script>

<style scoped>
.address_list {
	display: flex;
	padding: 10px 4% 10px 4%;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-around;
}
.address_info {
	flex-grow: 5;
	/* flex-basis */
}
.info_name {
	font-weight: bold;
	font-size: 13px;
}
.info_address {
	font-size: 13px;
	margin-top: 6px;
	word-break: keep-all;
	overflow-x: hidden;
}
.info_region {
	margin-top: 2vh;
}
.region_s {
	font-size: 11px;
	text-align: center;
	border-radius: 100px;
	border: 1px solid black;
	line-height: 2em;
	width: 55px;
	display: inline-block;
	margin-right: 5px;
}
.address_btn {
	text-align: right;
}
</style>
