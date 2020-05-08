<template>
	<div>
		<div class="main">
			<div class="title">
				<h3>我们的生活场景也可以如一场艺术展览</h3>
			</div>
			<div class="author">
				<div class="info">
					<el-avatar :size="50" :src="circleUrl"></el-avatar>
					<h4>暮秋君</h4>
				</div>
				<div class="follow">
					<el-button :type="follow ? '' : 'primary'" @click="followWriter">
						<!-- el-icon-plus  el-icon-check -->
						<i :class="follow ? 'el-icon-check' : 'el-icon-plus' "></i> 
						关注 ta </el-button>
				</div>
			</div>
			<span class="like">15,575 人赞同了该文章</span>
			<div class="news-content">
				<div v-html="content"></div>
				我花了一天时间，爬取了到2020年为止，B站上科技类目下的几乎所有学习资源视频，共计58950个视频，并分类整理成了14个excel
			</div>
			<div class="comment">
				<div class="comment-header">
					<h3>335条评论</h3>
				</div>
				<div class="comment-write">
					<el-row :gutter="20">
						<el-col :span="18">
							<el-input v-model="commentContent"></el-input>
						</el-col>
						<el-col :span="6">
							<el-button type="primary">发布</el-button>
						</el-col>
					</el-row>
				</div>
				<div class="comment-show">
					<div class="comment-item" v-for="(obj,i) in 4" :key="i">
						<el-avatar :src='circleUrl' :size="50"></el-avatar>
						<div class="content">
							<span class="comment-name">逃跑被风吹</span>
							<span class="comment-time">2020/4/22 19:00</span>
							<p>收藏夹：妖精哪里跑，我叫你一声你敢答应吗，收!!!</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default{
		data(){
			return{
				follow:false,
				commentContent:'',
				content:'<h2>你好吗</h2>',
				circleUrl:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
			}
		},
		methods:{
			followWriter(){
				if(this.follow == true){
					this.follow = false;
					
				}else{
					this.follow = true;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
	*{
		margin: 0;
		padding: 0;
		font-family: 'Roboto', sans-serif;
	}
	.main{
		width: 90%;
		margin: 0 auto;
	}
	.title{
		padding: 0.625rem;
		
		h3{
			font-size: 1.5rem;
			font-weight: 700;
		}
	}
	
	.author{
		width: 100%;
		
		.info{
			width: 50%;
			padding: 0.625rem;
			display: inline-flex;
			justify-content: left;
			align-items: center;
			
			h4{
				margin-left: 1.25rem;
			}
		}
		.follow{
			width: 40%;
			padding: 0.625rem;
			float: right;
			text-align: center;
		}
	}
	.like{
		padding: 0.3125rem;
		color: #7f8c8d;
	}
	.news-content{
		padding: 1.25rem;
		height: 50vh;
		//border: 1px solid darkgray;
	}
	.comment{
		width: 80%;
		margin: 1.25rem auto;
		padding: 1.25rem;
		box-shadow: 0 0 0 1px #ecf0f1;
		border: 1px solid #bdc3c7;
		
		
	}
	.comment-header{
		h3{
			font-family: 'Roboto', sans-serif;
			font-size: 1.2rem;
			font-weight: 700;
		}
	}
	.comment-write{
		padding: 20px 5%;
	}
	.comment-show{
		
	}
	.comment-item {
		display: flex;
		justify-content: left;
		align-items: center;
		padding: 0.625rem;
		font-family: 'Roboto', sans-serif;
	
		.content {
			margin-left: 0.625rem;
			padding: 0.625rem;
			width: 90%;
	
			.comment-name {
				margin-left: 0.625rem;
				font-size: 0.9rem;
				font-weight: 700;
			}
	
			.comment-time {
				float: right;
				margin-right: 0.625rem;
				font-size: 0.9rem;
				color: grey;
			}
	
			p {
				margin-top: 1rem;
				text-indent: 1em;
				font-size: 0.98rem;
			}
		}
	}
	
</style>
