<template>
	<div class="modal" v-show="showModal">
		<div class="modal-dialog">
			<div class="modal-header">
				<div class="login-logo">
					<img src="../../public/star.png" alt="">
				</div>
				<h3 class="">加入STAR家族</h3>
				<div class="close-modal">
					<i @click="closeMyself">
						<svg t="1585398525264" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2661"
							width="200" height="200">
							<path d="M780 229H244c-8.3 0-15 6.7-15 15v536c0 8.3 6.7 15 15 15h330.6L795 574.6V244c0-8.3-6.7-15-15-15z m-479.5 88.9c-14.7 0-26.6-11.9-26.6-26.6s11.9-26.6 26.6-26.6 26.6 11.9 26.6 26.6-12 26.6-26.6 26.6z m354.1 315.5c5.9 5.9 5.9 15.4 0 21.2-2.9 2.9-6.8 4.4-10.6 4.4s-7.7-1.5-10.6-4.4L512 533.2 390.6 654.6c-2.9 2.9-6.8 4.4-10.6 4.4s-7.7-1.5-10.6-4.4c-5.9-5.9-5.9-15.4 0-21.2L490.8 512 369.4 390.6c-5.9-5.9-5.9-15.4 0-21.2 5.9-5.9 15.4-5.9 21.2 0L512 490.8l121.4-121.4c5.9-5.9 15.4-5.9 21.2 0 5.9 5.9 5.9 15.4 0 21.2L533.2 512l121.4 121.4zM780 795c8.3 0 15-6.7 15-15v-49.1L730.9 795H780zM688.4 795L795 688.4v-71.3L617.1 795z"
								fill="#FFBC00" p-id="2662"></path>
							<path d="M780 199H244c-24.8 0-45 20.2-45 45v536c0 24.8 20.2 45 45 45h536c24.8 0 45-20.2 45-45V244c0-24.8-20.2-45-45-45z m15 581c0 8.3-6.7 15-15 15h-49.1l64.1-64.1V780z m0-91.6L688.4 795H617l178-177.9v71.3z m0-113.8L574.6 795H244c-8.3 0-15-6.7-15-15V244c0-8.3 6.7-15 15-15h536c8.3 0 15 6.7 15 15v330.6z"
								fill="#46287C" p-id="2663"></path>
							<path d="M654.6 369.4c-5.9-5.9-15.4-5.9-21.2 0L512 490.8 390.6 369.4c-5.9-5.9-15.4-5.9-21.2 0-5.9 5.9-5.9 15.4 0 21.2L490.8 512 369.4 633.4c-5.9 5.9-5.9 15.4 0 21.2 2.9 2.9 6.8 4.4 10.6 4.4s7.7-1.5 10.6-4.4L512 533.2l121.4 121.4c2.9 2.9 6.8 4.4 10.6 4.4s7.7-1.5 10.6-4.4c5.9-5.9 5.9-15.4 0-21.2L533.2 512l121.4-121.4c5.8-5.8 5.8-15.3 0-21.2z"
								fill="#FFFFFF" p-id="2664"></path>
							<path d="M300.5 291.3m-26.6 0a26.6 26.6 0 1 0 53.2 0 26.6 26.6 0 1 0-53.2 0Z" fill="#FFFFFF" p-id="2665"></path>
						</svg>
					</i>
				</div>
			</div>
			<div class="modal-content">
				<el-button class="login-weixin">
					<div class="btn-weixin">
						<svg t="1585467487553" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3331"
							width="200" height="200">
							<path d="M683.058 364.695c11 0 22 1.016 32.943 1.976C686.564 230.064 538.896 128 370.681 128c-188.104 0.66-342.237 127.793-342.237 289.226 0 93.068 51.379 169.827 136.725 229.256L130.72 748.43l119.796-59.368c42.918 8.395 77.37 16.79 119.742 16.79 11 0 21.46-0.48 31.914-1.442a259.168 259.168 0 0 1-10.455-71.358c0.485-148.002 128.744-268.297 291.403-268.297l-0.06-0.06z m-184.113-91.992c25.99 0 42.913 16.79 42.913 42.575 0 25.188-16.923 42.579-42.913 42.579-25.45 0-51.38-16.85-51.38-42.58 0-25.784 25.93-42.574 51.38-42.574z m-239.544 85.154c-25.384 0-51.374-16.85-51.374-42.58 0-25.784 25.99-42.574 51.374-42.574 25.45 0 42.918 16.79 42.918 42.575 0 25.188-16.924 42.579-42.918 42.579z m736.155 271.655c0-135.647-136.725-246.527-290.983-246.527-162.655 0-290.918 110.88-290.918 246.527 0 136.128 128.263 246.587 290.918 246.587 33.972 0 68.423-8.395 102.818-16.85l93.809 50.973-25.93-84.677c68.907-51.93 120.286-119.815 120.286-196.033z m-385.275-42.58c-16.923 0-34.452-16.79-34.452-34.179 0-16.79 17.529-34.18 34.452-34.18 25.99 0 42.918 16.85 42.918 34.18 0 17.39-16.928 34.18-42.918 34.18z m188.165 0c-16.984 0-33.972-16.79-33.972-34.179 0-16.79 16.927-34.18 33.972-34.18 25.93 0 42.913 16.85 42.913 34.18 0 17.39-16.983 34.18-42.913 34.18z"
								fill="#09BB07" p-id="3332"></path>
						</svg>
						<span>使用微信一键登录</span>
					</div>
				</el-button>
				<div class="login-btn">
					<el-button :class="loginStyle=='0'?'form-show':'form-hidden'" @click="loginStyle='1'">
						使用账号密码登录
					</el-button>
				</div>
				<!-- /登录 -->
				<div :class="loginStyle=='1'?'form-show':'form-hidden'">
					<el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="60px">
						<el-form-item label="邮箱" prop="loginEmail">
							<el-input v-model="loginForm.loginEmail"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="loginPass">
							<el-input type="password" v-model="loginForm.loginPass" autocomplete="off"></el-input>
						</el-form-item>
						<el-button style="width: 100%;" type="primary" :loading="loading" @click="submitLoginForm('loginForm')">登 录</el-button>
					</el-form>
					<el-button style="width: 100%; margin-top:1.25rem" type="info" @click="loginStyle='2'">注 册</el-button>
				</div>
				<!-- /登录 -->
				<!-- 注册 -->
				<div :class="loginStyle=='2'?'form-show':'form-hidden'">
					<el-form :model="regForm" status-icon :rules="rules" ref="regForm" label-width="80px">
						<el-form-item label="邮箱" prop="regEmail">
							<el-input v-model="regForm.regEmail"></el-input>
						</el-form-item>
						<el-form-item prop="checkCode">
							<el-row type="flex" justify="start">
								<el-col :span="10">
									<el-input placeholder="输入验证码" v-model="regForm.checkCode" autocomplete="off"></el-input>
								</el-col>
								<el-col :span="6" style="padding-left: 1.25rem;">
									<el-button @click="countDown" :disabled="!canClick">{{content}}</el-button>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="设置密码" prop="pass">
							<el-input type="password" v-model="regForm.pass" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="checkPass">
							<el-input type="password" v-model="regForm.checkPass" autocomplete="off"></el-input>
						</el-form-item>
						<el-button style="width: 100%;" type="primary" @click="submitRegisterForm('regForm')">注册</el-button>
					</el-form>
					<el-button style="width: 100%; margin-top:1.25rem" type="text" @click="loginStyle='1'">已有账号,去登录</el-button>
				</div>
				<!-- /注册 -->
			</div>

		</div>
	</div>

</template>

<script>
	import axios from "axios";
	import global from '../constant/global.vue'
	export default {
		props: {
			showModal: {
				default: true,
				type: Boolean,
				required: true
			},
		},
		data() {
			var checkEmail = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('邮箱不能为空'));
				}
				setTimeout(() => {
					var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
					if (!reg.test(value)) {
						callback(new Error('请输入正确的邮箱'));
					}
					if (rule.field == 'regEmail') {
						this.canClick = true;
					}
					callback(); //一定别忘了回调
				}, 500);
			};
			var validateLoginPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.loginForm.loginPass.length < 6) {
						callback(new Error('密码长度至少大于等于6位'));
					}
					callback();
				}
			};
			//注册
			var validateCheckCode = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入验证码'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.regForm.pass.length < 6) {
						callback(new Error('密码长度至少大于等于6位'));
					}
					if (this.regForm.checkPass !== '') {
						this.$refs.regForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.regForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				loading:false,
				loginStyle: '0',
				content: "获取验证码",
				totalTime: 60,
				canClick: false,
				loginForm: {
					loginEmail: '',
					loginPass: '',
				},
				regForm: {
					regEmail: '',
					checkCode: '',
					pass: '',
					checkPass: '',
				},
				rules: {
					loginEmail: [{
						validator: checkEmail,
						trigger: 'blur'
					}],
					loginPass: [{
						validator: validateLoginPass,
						trigger: 'blur'
					}],
					regEmail: [{
						validator: checkEmail,
						trigger: 'blur'
					}],
					checkCode: [{
						validator: validateCheckCode,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],

				}
			}
		},
		methods: {
			closeMyself() {
				this.$emit("on-close",false)
			},
			submitLoginForm(formName) {
				this.loading = true;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						axios({
							url: global.serverSrc + "/member/login",
							method: "post",
							params: {
								email: this.loginForm.loginEmail,
								passwd: this.loginForm.loginPass
							}
						}).then(res => {
							this.loading = false;
							this.$notify({
								title: res.data.message,
								type: res.data.code==200 ? 'success':'warning',
							});
							if(res.data.code==200){
								//修改父页面user
								this.$emit("on-close",res.data.data)
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//提交注册
			submitRegisterForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						axios({
							url: global.serverSrc + "/member/register",
							method: "post",
							params: {
								mailAddress: this.regForm.regEmail,
								passwd: this.regForm.pass,
								checkCode: this.regForm.checkCode
							}
						}).then(res => {
							this.$notify({
								title: res.data.message,
								type: res.data.code==200 ? 'success':'warning',
							});
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			sendCheckCode() {
				if (this.regForm.regEmail != '') {
					axios({
						url: global.serverSrc + "/member/reg/checkEmail",
						method: "post",
						params: {
							mailAddress: this.regForm.regEmail
						}
					}).then(res => {
						console.log(res)
					})
				} else {
					this.$message('请先输入邮箱');
				}
			},
			//发送验证码的按钮的方法
			countDown() {
				this.sendCheckCode()

				if (this.canClick) {
					this.canClick = false;
				}
				//发送验证码的定时器
				let clock = window.setInterval(() => {
					this.totalTime--
					this.content = this.totalTime + 's后重新发送'
					if (this.totalTime < 0) {
						window.clearInterval(clock)
						this.content = '重新获取验证码'
						this.totalTime = 60
						this.canClick = true //这里重新开启
					}
				}, 1000)
			},

		}

	}
</script>

<style lang="scss" scoped>
	.modal {
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1050;
		outline: 0;

		&:before {
			content: "";
			display: block;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: #171e26;
			opacity: .7;
			-webkit-transition: opacity .3s ease-out;
			transition: opacity .3s ease-out;
		}

		.modal-dialog {
			width: 24rem;
			background-color: #FFFFFF;
			border-radius: 0.625rem;
			margin: 0 auto;
			transform: none;
			position: relative;
			box-shadow: 0 2px 0 #E6E6E6;

		}
	}

	.modal-header {
		display: flex;
		align-items: center;
		margin-bottom: 1.25rem;

		h3 {
			font-family: 'Roboto', sans-serif;
			font-size: 1.25rem;
			font-weight: 700;
			letter-spacing: 0.2rem;
			color: #e04f62;
			margin-left: 0.625rem;
		}


	}

	.login-logo {
		display: inline-flex;
		padding-left: 0.625rem;
		padding-top: 0.625rem;

		img {
			width: 3.125rem;
			height: 3.125rem;
		}
	}

	.close-modal {
		width: 98%;
		height: 2.5rem;
		display: flex;
		flex: 1;
		flex-direction: row-reverse;
		padding-right: 2%;
		align-items: center;

		i {
			svg {
				width: 2.5rem;
				height: 2.5rem;
			}
		}
	}

	.modal-content {
		padding: 0.625rem 1.25rem;

	}

	.login-weixin {
		width: 100%;
		margin-bottom: 1.25rem;
		background-color: #2f3542;
		color: #2ed573;
	}

	.btn-weixin {
		display: flex;
		align-items: center;
		justify-content: center;

		svg {
			width: 1.8rem;
			height: 1.8rem;
			display: inline;
		}

		span {
			margin-left: 0.625rem;
			font-size: 1rem;
		}
	}

	.login-btn {
		width: 100%;

		.el-button {
			width: 100%;
			margin-bottom: 1.25rem;
			background-color: #16a085;
			color: #ecf0f1;
			opacity: .9;

			&:hover {
				opacity: 1;
			}
		}
	}

	.form-show {
		display: block;
		transition: 0.5s ease-in;
	}

	.form-hidden {
		display: none;
	}

	.el-form {
		font-family: 'Roboto', sans-serif;

	}
</style>
