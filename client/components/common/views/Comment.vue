<template>
	<div class="comment_list">
		<div class="comment_title_box">
			<div class="comment_title">
				COMMENTS<button class="comment_close" @click="hide">
					<svg-icon class="ico-close" name="ico-close" />
				</button>
			</div>
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
						id="comment_input"
						v-model="commentStr"
						class="comment_enter"
						type="text"
						name="comment"
						placeholder="댓글을 입력해주세요."
						@input="changeComment"
						@keyup.enter="postComment()"
					/>
					<label
						for="comment_input"
						@click="postComment()"
						:style="
							labelEnabled
								? 'color: rgba(61, 148, 239, 1);'
								: 'color: rgba(61, 148, 239, 0.5);'
						"
						>게시</label
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			comment: [],
			commentStr: '',
			labelEnabled: false,
		};
	},
	mounted() {
		this.getComment(1);
	},
	methods: {
		hide() {
			this.$emit('closePanel', {});
		},
		getComment(p) {
			const postData = { page: p };
			this.$axios
				.$post('prod/' + this.$route.params.id + '/comment/get', postData)
				.then(res => {
					return { comment: res };
				})
				.catch(err => {
					console.log(err);
				});
		},
		changeComment(e) {
			const len = e.target.value.length; // 댓글 length
			if (len === 0) {
				// label 비활성화
				this.labelEnabled = false;
			} else {
				// label 활성화
				this.labelEnabled = true;
			}
		},
		postComment() {
			const comment = this.commentStr;
			if (comment.length === 0) {
				// 최저 글자수 부족,
			}
			console.log(comment);
		},
	},
};
</script>

<style scoped>
/* 모바일 환경 */
.comment_title {
	display: flex;
	align-items: center;
}
.comment_close {
	background: transparent;
	position: absolute;
	right: 5px;
	vertical-align: middle;
}
.comment_title_box {
	line-height: 2rem;
	font-size: 1.2rem;
	color: black;
	font-weight: bold;
	text-align: left;
	margin: 3%;
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
	position: absolute;
	bottom: 0;
	left: 6px;
	width: calc(100% - 16px);
	display: flex;
	flex-direction: column;
	margin-bottom: 12px;
}
.comment_input .profile_avatar {
	position: absolute;
	top: 0;
	left: 3px;
}
.comment_input .avatar_wrapper {
	width: 36px;
	height: 36px;
}
.comment_enter {
	border-radius: 20px;
	background: #eeeeee;
	font-size: 0.8rem;
	padding: 1% 4%;
	width: 100%;
}
.row_comment_content label {
	color: rgba(61, 148, 239, 0.5);
	position: absolute;
	right: 5%;
	top: 50%;
	transform: translateY(-50%);
	font-size: 0.9rem;
	font-weight: 600;
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
	padding-left: 46px;
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
