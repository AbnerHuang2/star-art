<template>
	<div id="app">
		<Header :class="isShow?'':'hidden'"></Header>
		<div class="main">
			<router-view></router-view>
		</div>
		<div class="footer">
			<div class="footer-nav">
				<a href="#">艺术教育</a>
				<el-divider direction="vertical"></el-divider>
				<a href="#">人才招聘</a>
				<el-divider direction="vertical"></el-divider>
				<a href="#">帮助中心</a>
				<el-divider direction="vertical"></el-divider>
				<a href="#">关于我们</a>
			</div>
			<div>
				STAR陪你一起艺术成长，在这里收获知识与快乐、
			</div>
		</div>
	</div>
</template>
<script>
	// import Test from './components/Test.vue'
	import Header from './components/Header.vue'
	export default {
		name: 'App',
		components: {
			Header
		},
		data(){
			return{
				top:1,
				isShow:true
			}
		},
		methods: {
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
		
				if(scrollTop>this.top){
					this.top = scrollTop;
					//隐藏header
					this.isShow = false;
					
				}else{
					this.top = scrollTop;
					//显示header
					this.isShow = true;
				}
			}
		},
		created() {
			window.addEventListener('scroll', this.handleScroll)
		},
		// 离开该页面需要移除这个监听的事件
		destroyed() {
			window.removeEventListener('scroll', this.handleScroll)
		}
	}
</script>
<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
	/* h2{
		font-family: 'Roboto', sans-serif;
		font-size: 1.25rem;
		font-weight: 900;
		color: #333;
	} */
	
	body {
		margin: 0;
		padding: 0;
		background-color: #F6F8FA;
	}
	
	.hidden{
		opacity: 0;
	}
	.main {
		width: 75rem;
		margin: 0 auto;
		padding-top: 4.5rem;
		//padding-bottom: 1.5rem;
		border-bottom: 1px solid #CCCCCC;
		background-color: #FFFFFF;
	}

	/* footer */
	.footer {
		width: 100%;
		height: 7.5rem;
		color: #757779;
		padding-top: 1.875rem;
		//box-shadow: 0px -2px 5px 0px gray;
	}

	.footer-nav {
		font-size: 0.8125rem;
		padding: 0.625rem;
		font-weight: 550;
	}

	.footer-nav a {
		color: #757779;
		text-decoration: none;
	}

	.footer-nav a:hover {
		color: #333333;
	}

	.footer div {
		text-align: center;
	}

	/* /footer */
</style>
