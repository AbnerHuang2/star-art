<template>
	<div class="mycard">
		<div>
			<el-image style="width: 100%; height: 10rem" :src="tempImg" fit="fill" :preview-src-list="srcList"></el-image>
		</div>
		<div class="mycard-info">
			<span class="title">美术·素描几何0基础入门体系课程{{obj}}美术·素描几何0基础入门体系课程</span>
			<div class="tag-line">
				<!-- <span v-for="(obj,index) in 3" :key="index">标签{{obj}}</span> -->
				<span>中级</span>
				<span>精选</span>
			</div>
			<div>
				<span style="color:#333;font-size: 0.9375rem;">学习人数550</span>
				<span class="price">限时免费</span>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
	/* my-card */
	.mycard {
		position: relative;
		margin: 0 0.625rem;
		//flex: 0 0 280px;
		width: 280px;
		height: 17.5rem;
		overflow: hidden;
		border-radius: 10px;
		//border: 1px solid #CCCCCC;
	}
	
	.mycard:first-child {
		margin-left: 0;
	}
	
	.mycard:nth-child(2n+1) {
		margin-top: 0;
	}
	
	.mycard:hover {
		//border: 1px solid #CCCCCC;
		//box-shadow: 0 1px 3px gray;
		cursor: pointer;
	}
	
	.mycard:hover .title {
		color: firebrick;
	}
	
	.mycard-info {
		padding: 0.3125rem 0.625rem;
	}
	
	.mycard-info .title {
		font-weight: bold;
	}
	
	.tag-line {
		width: 100%;
		height: 1.875rem;
		color: gray;
	}
	
	.tag-line span {
		font-size: 0.75rem;
		margin: 0.625rem;
		cursor: pointer;
	}
	
	.price {
		float: right;
		color: firebrick;
		font-weight: bold;
	}
	/* /my-card */
</style>
