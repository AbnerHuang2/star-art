<template>
	<div class="comment">
		<div class="comment-header">
			<h3 v-if="totalComment!=0">{{totalComment}}条评论</h3>
			<h3 v-else>暂无评论</h3>
		</div>
		<div v-if="pubButton" class="comment-write">
			<el-row :gutter="20">
				<el-col :span="18">
					<el-input v-model="commentContent"></el-input>
				</el-col>
				<el-col :span="6">
					<el-button type="primary" @click="pubComment">发布</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="comment-show">
			<div class="comment-item" v-for="(obj,i) in commentVoList" :key="i">
				<div @click="showPersonInfo(obj.user.id)">
					<el-avatar :src='obj.user.userAvatarURL' :size="50"></el-avatar>
				</div>
				<div class="content">
					<span class="comment-name" @click="showPersonInfo(obj.user.id)">{{obj.user.userNickName}}</span>
					<span class="comment-time">{{obj.comment.commentCreatetime}}</span>
					<p>{{obj.comment.commentContent}}</p>
				</div>
			</div>
			<div style="text-align: center;margin: 1.875rem; 0">
				<el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalComment" :current-page="currentPage"
				@current-change="handlePageChange" hide-on-single-page>
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			entityType: {
				type: Number,
				required: true,
			},
			entityId: {
				type: Number,
				required: true
			},
			sort: {
				type: String,
				default: null
			},
			pageSize: {
				type: Number,
				default: 6,
			},
			pubButton: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				commentContent:'',
				commentVoList: [],
				totalComment: 10,
				currentPage: 1,
			}
		},
		methods: {
			pubComment(){
				//先判断用户是否登录
				if(this.global.user==null){
					this.$message({
						message: '请先登录',
						type: 'warning'
					});
					return;
				}
				if(this.commentContent==''){
					this.$message({
						message: '评论不能为空',
						type: 'warning'
					});
					return;
				}
				this.$ajax({
					url: this.global.serverSrc+'/comment/addComment',
					method: 'post',
					params:{
						entityId:this.entityId,
						entityType:this.entityType,
						commentContent:this.commentContent,
					}
				}).then(res =>{
					if(res.data.code==200){
						this.$notify.success(res.data.message);
						//清空输入框
						this.commentContent = '';
						//刷新commentList
						this.getComment(this.entityType,this.entityId,this.sort,this.currentPage,this.pageSize)
						
					}else{
						this.$notify.error(res.data.message);
					}
				})
			},
			getComment(entityType,entityId, sort, page, pageSize) {
				this.$ajax({
					url: this.global.serverSrc + '/comment/getComments',
					method: 'post',
					params: {
						entityId,
						entityType,
						sort,
						page,
						pageSize,
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.commentVoList = res.data.data.list;
						this.totalComment = res.data.data.total;
					}
				})
			},
			handlePageChange(page) {
				this.currentPage = page;
				//获取分页数据
				this.getComment(this.entityType,this.entityId, this.sort, this.currentPage, this.pageSize)
			},
			showPersonInfo(id){
				this.$router.push({
					path: '/person' ,
					query:{
						id,
					}
				})
			},
		},
		created() {
			this.getComment(this.entityType,this.entityId, this.sort, this.currentPage, this.pageSize)
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
	.comment{
		margin: 1.25rem auto;
		padding: 1.25rem;
		box-shadow: 0 0 0 1px #ecf0f1;
		//border: 1px solid #ecf0f1;
		
		
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
	.comment-show {
		max-height: 50rem;
		overflow: auto;
		
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
				
				&:hover{
					color:darkred;
				}
			}

			.comment-time {
				float: right;
				margin-right: 0.625rem;
				font-family: 'Roboto', sans-serif;
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
