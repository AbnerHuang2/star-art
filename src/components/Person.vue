<template>
	<div class="person">
		<div class="p-header">
			<div class="head-img">
				<el-image :src='circleUrl'></el-image>
			</div>
		</div>
		<div class="p-nav">
			<router-link to="/">
				<div class="nav-item">
					<h3>3</h3>
					<span>个人信息</span>
				</div>
			</router-link>
			<router-link to="/">
				<div class="nav-item">
					<h3>3</h3>
					<span>已学课程</span>
				</div>
			</router-link>
			<router-link to="/">
				<div class="nav-item">
					<h3>5</h3>
					<span>我的作品</span>
				</div>
			</router-link>
			<router-link to="/">
				<div class="nav-item">
					<h3>3</h3>
					<span>关注</span>
				</div>
			</router-link>
			<router-link to="/">
				<div class="nav-item">
					<h3>2</h3>
					<span>粉丝</span>
				</div>
			</router-link>
		</div>
		<div class="p-main">
			<el-tabs tab-position="left" style="height: 200px;">
				<el-tab-pane label="用户管理">
					<el-button type="primary">主要按钮</el-button>
					<el-button type="success">成功按钮</el-button>
					<el-button type="info">信息按钮</el-button>
					<el-button type="warning">警告按钮</el-button>
					<el-button type="danger">危险按钮</el-button>
				</el-tab-pane>
				<el-tab-pane label="配置管理">配置管理</el-tab-pane>
				<el-tab-pane label="角色管理">角色管理</el-tab-pane>
				<el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				person:{},
				circleUrl: 'https://images.pexels.com/users/avatars/2659/pixabay-617.png?w=256&h=256&fit=crop&crop=faces&auto=compress',
			}
		}
	}
</script>

<style lang="scss" scoped>
	.person {
		margin: 0;
		padding: 0;
		position: relative;
	}

	.p-header {
		width: 100%;
		height: 25rem;
		display: flex;
		align-items: top;
		padding-top: 5rem;
		justify-content: center;
		background: #2C3E50;
		/* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #4CA1AF, #2C3E50);
		/* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #4CA1AF, #2C3E50);
		/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

		// background-image: url("https://images.pexels.com/photos/743986/pexels-photo-743986.jpeg?auto=compress&cs=tinysrgb&dpr=3&w=1000&h=400");
		// background-repeat: no-repeat;
		// background-size: 100% 100%;
	}

	.head-img {
		width: 12.5rem;
		height: 12.5rem;
		border: 2px solid #FFFFFF;
		border-radius: 50%;

		.el-image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	.p-nav {
		width: 80%;
		height: 6.25rem;
		margin: 0 auto;
		margin-bottom: 1.25rem;
		border-bottom-left-radius: 0.625rem;
		border-bottom-right-radius: 0.625rem;
		border: 1px solid #ecf0f1;
		box-shadow: 0px 1px 2px #ecf0f1;
		position: relative;
		display: flex;
		align-items: top;
		justify-content: center;

		a {
			text-decoration: none;
			color: #666;
			font-size: 18px;
			margin: 0 1.25rem;

			&:hover {
				color: #333333;
			}
		}

	}

	.nav-item {

		h3 {
			text-align: center;
		}

		span {
			font-size: 14px;
		}
	}

	.p-nav::before {
		content: '';
		width: 100%;
		height: 5rem;
		background: none;
		border: 1px solid #ecf0f1;
		border-bottom: none;
		border-top-left-radius: 0.625rem;
		border-top-right-radius: 0.625rem;
		position: absolute;
		top: -80px;
		left: -1;
	}

	.p-main {
		width: 100%;
	}
</style>
