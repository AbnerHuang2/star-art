<template>
	<div class="comment-show">
		<div class="comment-item" v-for="(obj,i) in commentVoList" :key="i">
			<el-avatar :src='obj.user.userAvatarURL' :size="50"></el-avatar>
			<div class="content">
				<span class="comment-name">{{obj.user.userNickName}}</span>
				<span class="comment-time">{{obj.comment.commentCreatetime}}</span>
				<p>{{obj.comment.commentContent}}</p>
			</div>
		</div>
		<div style="text-align: center;margin: 1.875rem; 0">
			<el-pagination background layout="prev, pager, next" :page-size="pageSize" 
			:total="totalComment" :current-page="currentPage" @current-change="handlePageChange" hide-on-single-page>
			</el-pagination>
		</div>
	</div>
</template>

<script>
</script>

<style>
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
