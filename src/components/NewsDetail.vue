<template>
	<div>
		<div class="main">
			<div class="title">
				<h3>{{newsVo.news.newsTitle}}</h3>
			</div>
			<div class="author">
				<div class="info">
					<el-avatar :size="50" :src="newsVo.user.userAvatarURL"></el-avatar>
					<h4>{{newsVo.user.userNickName}}</h4>
				</div>
				<div class="follow">
					<el-button :type="follow ? '' : 'primary'" @click="followWriter">
						<!-- el-icon-plus  el-icon-check -->
						<i :class="follow ? 'el-icon-check' : 'el-icon-plus' "></i> 
						关注 ta </el-button>
				</div>
			</div>
			<div>
				<a @click="like(newsVo)">
					<svg t="1585307816006" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="4501" width="50" height="50">
						<path d="M784.781 464.318h-9.103l-46.104 263.563c0 21.758-17.627 39.385-39.385 39.385H387.477v8.175c0 21.747 17.633 39.385 39.381 39.385h310.386c21.737 0 39.385-17.638 39.385-39.385l47.529-271.738c-0.002-21.758-17.638-39.385-39.377-39.385M569.176 208.908c1.592 4.6 3.164 9.355 4.435 14.102 5.858 20.283 9.043 41.514 9.043 63.701 0 44.59-12.521 81.65-34.845 121.416-22.334 39.775 58.009 80.693 58.009 80.693l2.323-24.961c8.711-24.209 21.543-102.383 21.543-129.59 0-22.188-3.163-43.418-9.022-63.701-1.271-4.756-2.853-9.512-4.435-14.102 0 0-21.25-40.557-48.633-50.391a162.986 162.986 0 0 1 1.582 2.833"
							fill="#4510E6" opacity=".1" p-id="4502"></path>
						<path d="M276.529 839.826h-26.563c-41.019 0-74.39-33.374-74.39-74.396V513.703c0-41.016 33.371-74.385 74.39-74.385h26.563c41.019 0 74.39 33.369 74.39 74.385v251.729c0 41.021-33.371 74.394-74.39 74.394z m-26.563-350.508c-13.448 0-24.39 10.939-24.39 24.385v251.728c0 13.452 10.941 24.396 24.39 24.396h26.563c13.449 0 24.39-10.943 24.39-24.395V513.703c0-13.446-10.941-24.385-24.39-24.385h-26.563z"
							fill="#50E3C2" p-id="4503"></path>
						<path v-if="newsVo.likeStatus==1" d="M737.243 839.827H426.857c-35.505 0-64.391-28.883-64.391-64.385V503.704c0-16.488 8-34.799 21.948-50.237 6.04-6.682 11.758-10.347 16.804-13.581 1.162-0.745 2.311-1.481 3.479-2.271 46.734-38.53 74.328-96.58 74.328-157.448l0.044-12.006c0-46.411 37.828-84.244 84.325-84.244 21.351 0 42.081 11.859 61.615 35.249 12.334 14.769 19.978 29.12 20.809 30.708a25.1 25.1 0 0 1 1.485 3.446c1.667 4.837 3.411 10.065 4.886 15.554a254.425 254.425 0 0 1 9.945 70.395c0 34.622-7.017 68.61-20.501 100.049h143.148c35.496 0 64.375 28.883 64.375 64.385a24.97 24.97 0 0 1-0.374 4.307l-47.2 269.859c-1.279 34.383-29.649 61.958-64.339 61.958zM421.239 487.294c-6.047 6.805-8.772 13.667-8.772 16.41v271.738c0 7.932 6.456 14.385 14.391 14.385h310.386c7.932 0 14.385-6.453 14.385-14.385 0-1.443 0.125-2.885 0.374-4.308l47.063-269.07c-0.815-7.163-6.91-12.746-14.282-12.746H600.543a25.002 25.002 0 0 1-22.505-35.887l1.758-3.634c0.397-0.821 0.839-1.62 1.323-2.393 20.291-32.365 31.016-69.758 31.016-108.136 0-19.172-2.709-38.27-8.051-56.763a21.016 21.016 0 0 1-0.137-0.491c-0.917-3.437-2.085-7.035-3.264-10.501-9.943-18.042-27.599-37.597-37.289-37.597-18.927 0-34.325 15.403-34.325 34.336l-0.044 12.006c0 40.395-9.76 80.674-28.224 116.392-11.317 21.892-25.918 42.147-43.083 59.922-9.379 10.689-16.953 16.849-23.063 21.129a250.587 250.587 0 0 1-9.148 7.058 24.958 24.958 0 0 1-4.268 2.535z"
							fill="#50E3C2" p-id="4504"></path>
						<path v-else d="M737.243 839.827H426.857c-35.505 0-64.391-28.883-64.391-64.385V503.704c0-16.488 8-34.799 21.948-50.237 6.04-6.682 11.758-10.347 16.804-13.581 1.162-0.745 2.311-1.481 3.479-2.271 46.734-38.53 74.328-96.58 74.328-157.448l0.044-12.006c0-46.411 37.828-84.244 84.325-84.244 21.351 0 42.081 11.859 61.615 35.249 12.334 14.769 19.978 29.12 20.809 30.708a25.1 25.1 0 0 1 1.485 3.446c1.667 4.837 3.411 10.065 4.886 15.554a254.425 254.425 0 0 1 9.945 70.395c0 34.622-7.017 68.61-20.501 100.049h143.148c35.496 0 64.375 28.883 64.375 64.385a24.97 24.97 0 0 1-0.374 4.307l-47.2 269.859c-1.279 34.383-29.649 61.958-64.339 61.958zM421.239 487.294c-6.047 6.805-8.772 13.667-8.772 16.41v271.738c0 7.932 6.456 14.385 14.391 14.385h310.386c7.932 0 14.385-6.453 14.385-14.385 0-1.443 0.125-2.885 0.374-4.308l47.063-269.07c-0.815-7.163-6.91-12.746-14.282-12.746H600.543a25.002 25.002 0 0 1-22.505-35.887l1.758-3.634c0.397-0.821 0.839-1.62 1.323-2.393 20.291-32.365 31.016-69.758 31.016-108.136 0-19.172-2.709-38.27-8.051-56.763a21.016 21.016 0 0 1-0.137-0.491c-0.917-3.437-2.085-7.035-3.264-10.501-9.943-18.042-27.599-37.597-37.289-37.597-18.927 0-34.325 15.403-34.325 34.336l-0.044 12.006c0 40.395-9.76 80.674-28.224 116.392-11.317 21.892-25.918 42.147-43.083 59.922-9.379 10.689-16.953 16.849-23.063 21.129a250.587 250.587 0 0 1-9.148 7.058 24.958 24.958 0 0 1-4.268 2.535z"
							fill="#bdc3c7" p-id="4504"></path>
						<!-- #4510E6 -->
					</svg>
				</a>
			</div>
			<span class="like">{{newsVo.news.newsLike}} 人赞同了该文章</span>
			<div class="news-content">
				<div v-html="newsVo.news.newsContent"></div>
			</div>
			<!-- 评论 -->
			<div>
				<comment :entityType="1" :entityId="newsVo.news.id" :pubButton="true"></comment>
			</div>
			<!-- 评论 -->
		</div>
	</div>
</template>

<script>
	import comment from "../views/comment-dialog.vue"
	export default{
		components:{
			comment,
		},
		data(){
			return{
				newsVo:{},
				follow:false,
				content:'<h2>你好吗</h2>',
				circleUrl:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
			}
		},
		methods:{
			followWriter(){
				if(this.follow == true){
					this.$message({
						message: '已取消关注',
						type: 'warning'
					});
					this.follow = false;
					
				}else{
					this.$message({
						message: '关注成功',
						type: 'success'
					});
					this.follow = true;
				}
			},
			//点赞
			like(obj){
				if(obj.likeStatus==0){
					obj.likeStatus = 1;
					obj.news.newsLike++;
					
					this.newsLike(obj.news.id);
					
				}else{
					obj.likeStatus = 0;
					obj.news.newsLike--;
					
					this.newsUnLike(obj.news.id);
				}
				
			},
			newsLike(newsId){
				this.$ajax({
					url: this.global.serverSrc+'/news/newsLike',
					method: 'post',
					params:{
						newsId,
					}
				}).then(res => {
					if(res.data.code==200){
						this.$notify.success({
							title: res.data.message,
						});
						
					}else{
						this.$notify.error({
							title: res.data.message,
						});
					}
				})
			},
			newsUnLike(newsId){
				this.$ajax({
					url: this.global.serverSrc+'/news/newsUnLike',
					method: 'post',
					params:{
						newsId,
					}
				}).then(res => {
					if(res.data.code==200){
						this.$notify.success({
							title: "已取消点赞",
						});
					}
				})
			},
			getRouterData() {
				this.newsVo = JSON.parse(this.$route.query.newsVo)
			},
		},
		created() {
			this.getRouterData()
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
		//border: 1px solid darkgray;
	}
	
</style>
