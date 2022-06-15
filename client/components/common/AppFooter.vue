<template>
	<div class="footer">
		<div class="inner">
			<div class="footer_sns">
				<a class="sns" @click="goSns('insta')">
					<svg-icon class="ico-instagram" name="ico-instagram-black" />
				</a>
				<a class="sns" @click="goSns('facebook')"
					><svg-icon class="ico-facebook" name="ico-facebook-black"
				/></a>
			</div>
			<div class="service_info">
				<p class="service_title">SNKRS98 고객센터</p>
				<dl class="info_item">
					<dt class="blind">대표 전화</dt>
					<dd>
						<span class="main_txt">고객센터 준비중</span>
						<span class="sub_txt">(평일 11시-18시 / 점심 13-14시)</span>
					</dd>
				</dl>
				<!--
				<dl class="info_item">
					<dt class="blind">이메일</dt>
					<dd>
						<a href="mailto:help@snkrs98.com" class="email_link">
							help@snkrs98.com
						</a>
						<span class="sub_txt">(평일 11시-18시)</span>
					</dd>
				</dl>
				-->
			</div>
			<div class="fnb_info">
				<ul class="fnb_list">
					<li class="fnb_item">
						<nuxt-link class="fnb_link" :to="{ path: '/notice' }">
							공지사항
						</nuxt-link>
					</li>
					<li class="fnb_item">
						<nuxt-link class="fnb_link" :to="{ path: '/terms' }">
							이용약관
						</nuxt-link>
					</li>
					<li class="fnb_item privacy">
						<nuxt-link class="fnb_link" :to="{ path: '/privacy' }">
							개인정보처리방침
						</nuxt-link>
					</li>
				</ul>
			</div>
			<div class="notice">
				<address class="company_info">
					<div class="info_list">
						<dl class="item">
							<dt class="com_title">싸발적인 스트릿패션 · 대표</dt>
							<dd class="com_txt">최원준</dd>
						</dl>
						<dl class="item">
							<dt class="com_title">사업자등록번호:</dt>
							<dd class="com_txt">446-60-00587</dd>
							<dd class="com_txt">
								<a href="#" class="license_link" @click="goBussiness()">
									사업자정보확인
								</a>
							</dd>
						</dl>
						<dl class="item">
							<dt class="com_title">통신판매업:</dt>
							<dd class="com_txt">제 2020-수원권선-1194 호</dd>
						</dl>
					</div>
					<div class="info_list">
						<dl class="item">
							<dt class="com_title">사업장소재지:</dt>
							<dd class="com_txt">
								경기도 수원시 권선구 권광로 55
							</dd>
						</dl>
						<dl class="item">
							<dt class="com_title">개인정보관리책임자:</dt>
							<dd class="com_txt">최원준</dd>
						</dl>
						<dl class="item">
							<dt class="com_title">호스팅 서비스:</dt>
							<dd class="com_txt">아마존 웹 서비스</dd>
						</dl>
					</div>
				</address>
				<p class="notice_txt">
					싸발적인 스트릿패션은 통신판매 중개자로서 통신판매의 당사자가
					아닙니다. 본 상품은 개별판매자가 등록한 상품으로 상품, 상품정보,
					거래에 관한 의무와 책임은 각 판매자에게 있습니다. 단, 거래과정에서
					검수하고 보증하는 내용에 대한 책임은 싸발적인 스트릿패션에 있습니다.
				</p>
			</div>
			<p class="copy_right">© 2021 싸발적인 스트릿패션</p>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		goBussiness() {
			window.open('https://www.ftc.go.kr/bizCommPop.do?wrkr_no=4466000587');
		},
		goSns(type) {
			if (type === 'insta') {
				window.open('https://www.instagram.com/snkrs98.kr/');
			} else if (type === 'facebook') {
				window.open('https://www.facebook.com/snkrs98');
			}
		},
	},
};
</script>

<style scoped>
a {
	text-decoration: none;
	color: black;
}
dl,
dd {
	margin: 0;
	padding: 0;
}
.footer {
	padding: 23px 20px 39px;
	border-top: 1px solid #ebebeb;
}
.inner {
	position: relative;
	display: grid;
}
.footer_sns {
	position: static;
	margin-left: -4px;
	overflow: hidden;
	top: -5px;
	right: -3px;
}
.footer_sns .sns {
	padding: 5px;
	float: left;
}

.service_info {
	margin-top: 18px;
}
.service_info .service_title {
	padding-right: 0;
	padding-bottom: 6px;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.21px;
	font-weight: 700;
}
.service_info .info_item {
	margin-top: 2px;
}
.service_info .main_txt {
	display: inline-block;
	font-size: 13px;
	line-height: 19px;
	letter-spacing: -0.07px;
	vertical-align: top;
}
.service_info .sub_txt {
	display: inline-block;
	font-size: 12px;
	line-height: 18px;
	letter-spacing: -0.06px;
	color: rgba(34, 34, 34, 0.5);
	vertical-align: top;
}
.service_info .email_link {
	display: inline-block;
	font-size: 13px;
	line-height: 19px;
	letter-spacing: -0.07px;
	vertical-align: top;
}
.blind {
	overflow: hidden !important;
	position: absolute !important;
	clip: rect(0, 0, 0, 0) !important;
	width: 1px !important;
	height: 1px !important;
	margin: -1px !important;
}
.fnb_info {
	margin-top: 20px;
}
.fnb_item {
	float: left;
}
.fnb_info .fnb_item:first-child .fnb_link {
	padding-left: 0;
}
.fnb_info .fnb_item .fnb_link {
	padding-left: 5px;
	font-size: 12px;
	letter-spacing: -0.06px;
	display: block;
	padding: 10px;
	color: #222;
}
.privacy .fnb_link {
	font-weight: 700;
}
.notice {
	display: block;
	padding-bottom: 14px;
	margin-top: 29px;
	color: rgba(34, 34, 34, 0.5);
	font-size: 11px;
	line-height: 16px;
}
.notice .info_list {
	overflow: hidden;
}
.notice .item {
	margin-top: 0;
	float: left;
	margin-right: 12px;
	line-height: 16px;
}
.notice .com_title {
	float: left;
	margin-right: 3px;
}
.notice .com_txt {
	float: left;
}
.notice .notice_txt {
	margin-top: 13px;
}
.notice .license_link {
	margin-left: 5px;
	display: inline-block;
	text-decoration: underline;
}
.copy_right {
	margin-top: 30px;
	text-align: center;
	font-size: 12px;
	line-height: 18px;
	letter-spacing: -0.06px;
	color: rgba(34, 34, 34, 0.3);
}
</style>
