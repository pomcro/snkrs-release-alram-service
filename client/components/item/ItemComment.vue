<template>
	<div class="wrap_swiper">
		<div class="item_mobile" :class="$mq">
			<client-only>
				<div class="comment_title_box">
					<div class="comment_title">COMMENTS</div>
					<div class="comment_sub_title">
						댓글 <span>{{ comment.length }}개</span>
					</div>
					<div
						v-for="(data, index) in comment"
						:key="index"
						class="comment"
						:value="index"
					>
						<div class="row_comment_title">
							<span class="profile_avatar"
								><a class="avatar_link"
									><div class="avatar_wrapper">
										<img
											class="avatar_image"
											src="https://cdn.dribbble.com/users/3342618/avatars/normal/81c16a3483f1735e032f399ae6895908.jpg?1562642963&amp;compress=1&amp;resize=64x64"
										/></div></a
							></span>
							<a class="profile_username">
								{{ data.username }}
								<!----></a
							>
						</div>
						<div class="row_comment_content">
							<div class="row_comment_text">
								<p>{{ data.comment }}</p>
							</div>
							<div class="row_comment_action">
								<p class="time_ago">
									{{ data.updatedAt | timeSince }}
								</p>
								<p class="like">
									좋아요 1개
								</p>
								<p class="reply">
									답글 달기
								</p>
							</div>
						</div>
					</div>
					<div class="comment_input">
						<div class="row_comment_title">
							<span class="profile_avatar"
								><div class="avatar_wrapper">
									<img
										class="avatar_image"
										src="https://cdn.dribbble.com/users/3342618/avatars/normal/81c16a3483f1735e032f399ae6895908.jpg?1562642963&amp;compress=1&amp;resize=64x64"
									/></div
							></span>
						</div>
						<div class="row_comment_content">
							<input
								class="comment_enter"
								type="text"
								name="comment"
								readonly
								placeholder="댓글을 입력해주세요."
								@click="showComment"
							/>
						</div>
					</div>
				</div>
			</client-only>
		</div>
	</div>
</template>

<script>
import { timeSince } from '@/utils/datefilter.js';
export default {
	filters: {
		timeSince,
	},
	props: { comment: { type: Object, required: true } },
	data() {
		return {};
	},
	methods: {
		showComment() {
			this.$emit('child-method');
		},
	},
};
</script>
<style scoped>
/* 모바일 뷰 */
.item_mobile {
	padding: 2% 5% 2% 5%;
	border-bottom: 8px solid rgb(246, 246, 246);
}
/* 모바일 환경 */
.comment_title_box {
	line-height: 2rem;
	font-size: 1.2rem;
	color: black;
	font-weight: bold;
	text-align: left;
	margin-top: 3%;
	margin-bottom: 2%;
	margin-left: 1%;
}
.comment_sub_title {
	font-size: 0.9rem;
	line-height: 1rem;
	color: black;
	font-weight: normal;
	color: rgba(34, 34, 34, 0.5);
	margin-bottom: 16px;
}
.comment {
	position: relative;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-direction: column;
	flex-direction: column;
	margin-bottom: 24px;
}
.comment_input {
	position: relative;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-direction: column;
	flex-direction: column;
	margin-bottom: 12px;
}
.comment_input .profile_avatar {
	position: absolute;
	top: 0;
	left: 10px;
}
.comment_input .avatar_wrapper {
	width: 24px;
	height: 24px;
}
.comment_enter {
	border-radius: 5px;
	background: #eeeeee;
	font-size: 0.7rem;
	padding: 0 3%;
	width: 100%;
}
.row_comment_title {
	display: flex;
	padding-left: 44px;
	padding-right: 32px;
	pointer-events: none;
}
.profile_avatar {
	position: absolute;
	top: 0;
	left: 0;
}
.avatar_link {
	display: inline-block;
	opacity: 1;
	-webkit-transition: opacity 0.2s ease;
	transition: opacity 0.2s ease;
}
.avatar_wrapper {
	width: 32px;
	height: 32px;
}
.avatar_image {
	border-radius: 50%;
	width: 100%;
	height: auto;
}
.profile_username {
	font-size: 14px;
	font-weight: 500;
	line-height: 20px;
	line-height: 16px;
	color: #0d0c22;
	margin-bottom: 4px;
	pointer-events: auto;
}
.row_comment_content {
	padding-left: 44px;
}
.row_comment_text {
	font-size: 14px;
	font-weight: 400;
	line-height: 20px;
	color: #3d3d4e;
	margin-bottom: 2px;
	word-wrap: break-word;
}
.row_comment_action {
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	color: #6e6d7a;
	display: flex;
}
.row_comment_action p:nth-child(2) {
	margin: 0 10px;
}
.row_comment_action p:nth-child(3) {
	cursor: pointer;
}
</style>
