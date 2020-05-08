<template>
	<div class="header-container">
		<div class="header">
			<el-menu :default-active="$route.path" router mode="horizontal" text-color="#24243e" active-text-color="#000000">
				<el-menu-item v-for="(item,index) in navList" :key="index" :index="item.name">
					<i v-if="index==1" class="el-icon-postcard"></i>
					<i v-if="index==2" class="el-icon-user"></i>
					<i v-if="index==3" class="el-icon-copy-document"></i>
					<i v-if="index==4" class="el-icon-message"></i>
					<span>{{item.navItem}}</span>
				</el-menu-item>
			</el-menu>
			<div class="logo">
				<img src="../../public/star.png" alt="LOGO">
			</div>
			<!-- 头像 -->
			<div class="loginBtn">
				<el-button v-if="!user" icon="el-icon-user-solid" @click="showModal=true">登录/注册</el-button>
				<div class="demo-type" v-else>
					<el-avatar :size="40" src="../../public/head.png">
						<img src="../../public/head.png" @click="showPersonInfo" />
					</el-avatar>
				</div>
				<el-input style="margin-right: 1.875rem;" placeholder="搜我试试" prefix-icon="el-icon-search" v-model="globalInput">
				</el-input>
			</div>
		</div>
		<!-- 登录弹窗 -->
		<logindialog :showModal="showModal" @on-close="closeDialog"></logindialog>
		<!-- /登录弹窗 -->
	</div>

</template>

<script>
	import logindialog from "../views/login-dialog.vue"
	//引入ajax
	import axios from "axios";
	//支持携带cookie
	axios.defaults.withCredentials = true;
	export default {
		components:{
			logindialog
		},
		data() {
			return {
				showModal:false,
				user: '',
				activeIndex: '1',
				globalInput:'',
				navList: [{
						name: '/',
						navItem: '首页'
					},
					{
						name: '/course',
						navItem: '课程'
					},
					{
						name: '/teacher',
						navItem: '导师'
					},
					{
						name: '/product',
						navItem: '作品'
					},
					{
						name: '/community',
						navItem: 'STAR 社区'
					}
				]
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			// 关闭弹窗
			closeDialog(user){
				this.showModal = false;
				this.user = user;
			},
			showPersonInfo(){
				this.$router.push('/person')
			},
			async getUserInfo(){
				await axios({
					url: this.global.serverSrc + "/",
					method: "get",
					
				}).then(res => {
					if(res.data.code==200){
						this.user = res.data.data;
						this.global.user = res.data.data;
					}
				})
			}
		},
		created() {
			this.getUserInfo();
		},
	}
</script>

<style scoped>
	.header-container {
		width: 100%;
		display: flex;
		justify-content: center;
		position: fixed;
		z-index: 9;
		//box-shadow: 0px 1px 3px 1px #CCCCCC;;
	}

	.header {
		width: 75rem;
		height: 4.5rem;
		//border-bottom: 1px solid #CCCCCC;
		background-color: #FFFFFF;
		margin: 0 auto;
		display: flex;
		justify-content: left;
		//position: fixed;
		//z-index: 9;
	}

	.logo {
		width: 18rem;
		height: 4.5rem;
		margin-left: 8%;
	}

	.logo img {
		width: 3.5rem;
		height: auto;
		margin-top: 0.625rem;
		//border: 1px solid red;
		//transform: rotate(15deg);
	}

	.el-menu {
		font-weight: bolder;
		padding: 0.75rem;
	}

	.loginBtn {
		display: flex;
		flex: 1;
		flex-direction: row-reverse;
		align-items: center;
		//justify-content: center;
		padding-right: 1.25rem;
	}

	.loginBtn .el-button {
		border-radius: 1.25rem;
		box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
		font-weight: bold;
		color: #333333;
		background: #355C7D;
		/* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #C06C84, #6C5B7B, #355C7D);
		/* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #C06C84, #6C5B7B, #355C7D);
		/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}

	.loginBtn .el-button:hover {
		color: snow;
	}
</style>
