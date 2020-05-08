<template>
	<div class="product">
		<div class="product-header">
			<div class="title">
				<svg t="1585225517792" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2044" width="200" height="200"><path d="M772.93 665.3l15.62 27.41c28.72 2.2 62.52-30.55 65.17-73.86-29.06 34.32-66.03 18.21-80.79 46.45z" fill="#FF9C52" p-id="2045"></path><path d="M770.55 666.25c5.7-3.29 13.92 0.28 18.37 8s3.43 16.61-2.27 19.9L528.27 843.32l-16.1-27.89z" fill="#6410C6" p-id="2046"></path><path d="M509.930412 835.3055a16.05 11.88 60 1 0 20.576764-11.88 16.05 11.88 60 1 0-20.576764 11.88Z" fill="#765EEF" p-id="2047"></path><path d="M615.06 610.27L293.14 796.13V406.77l321.92-185.86z" fill="#FFFFFF" p-id="2048"></path><path d="M408.16 478.08c0 10.76-6.88 23.45-15.37 28.35s-15.37 0.16-15.37-10.6 6.88-23.45 15.37-28.35 15.37-0.15 15.37 10.6zM360.31 639.11l43.25-110.17c3.66-9.32 12.13-13.6 15.12-7.63l14.5 28.93c1.15 2.3 4.42 0.67 5.84-2.93l34.51-87c3.41-8.59 11.05-13.06 14.52-8.48l59.85 79z" fill="#FF9C52" p-id="2049"></path><path d="M615.06 610.52l-19.13-11.04v-357.9l19.13 7.83v361.11z" fill="#6410C6" p-id="2050"></path><path d="M282.37 400.21v443.66l366.82-211.78V188.42z m332.69 210.31L316.5 782.89V421.78l298.56-172.37z" fill="#765EEF" p-id="2051"></path><path d="M282.37 400.21l366.82-211.78-71.32-41.18-366.82 211.79 71.32 41.17z" fill="#5C37E2" p-id="2052"></path><path d="M282.37 400.21v443.66l-71.32-41.17V359.04l71.32 41.17z" fill="#6410C6" p-id="2053"></path><path d="M615.06 610.52l-19.13-11.04-279.59 161.57 0.16 21.84 298.56-172.37z" fill="#5C37E2" p-id="2054"></path></svg>
				<h2>作品展示</h2>
			</div>
			<p>优秀的作品值得被欣赏</p>
		</div>
		<div>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="(m,i) in major" :key="i" :label="m.majorName" :name="i+''">
					<el-row>
						<el-button v-for="(detail,i) in directList" :key="i" size="mini" 
						@click="getCourseBydirect(detail.id)">{{detail.directName}}</el-button>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="card-group" style="padding: 1.875rem 0rem 2.5rem 0rem;">
			<card v-for="(obj,index) in productList" :key="index" :to="obj.productName" :data-image="obj.productUrl">
				<!-- <h1 slot="header">{{obj.productName}}</h1> -->
				<p slot="content">{{obj.productIntro}}</p>
			</card>
		</div>
		
		<div style="text-align: center;margin-bottom: 1.875rem;">
			<el-pagination background layout="prev, pager, next" :page-size="pageSize"
			:total="total" :current-page="currentPage" @current-change="handlePageChange" hide-on-single-page>
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import card from '../views/card.vue'
	export default {
		name: 'Product',
		components: {
			card,
		},
		data() {
			return {
				activeName:'0',
				total: 10,
				pageSize:8,
				currentPage:1,
				major:[],
				directList:[],
				productList:[],
				directId:null,
				lastTag:null,
			}
		},
		methods:{
			handleClick(){
				//获取相关专业的具体
				this.getDirectsByMajor(this.major[Number(this.activeName)].id);
			},
			getMajors(){
				this.$ajax({
					url: this.global.serverSrc+'/major/getAllMajor',
					method: 'post',
				}).then(res => {
					this.major = res.data.data;
					//获取相关专业的方向
					this.getDirectsByMajor(this.major[Number(this.activeName)].id);
				})
			},
			getDirectsByMajor(majorId){
				this.$ajax({
					url: this.global.serverSrc+'/direct/getDirects',
					method: 'post',
					params:{
						majorId
					}
				}).then(res => {
					this.directList = res.data.data;
				})
			},
			getProducts(majorId,directId,tag,page,pageSize){
				this.$ajax({
					url: this.global.serverSrc+'/product/getProducts',
					method: 'post',
					params:{
						majorId,
						directId,
						tag,
						page,
						pageSize,
					}
				}).then(res => {
					console.log(res)
					if(res.data.code==200){
						this.productList = res.data.data.list;
						this.total = res.data.data.total
						this.pageSize = res.data.data.pageSize;
					}else{
						this.$notify.error({
							title: res.data.message,
						});
					}
				})
			},
			handlePageChange(currentPage){
				this.currentPage = currentPage;
				this.getProducts(this.major[Number(this.activeName)].id,this.directId,this.lastTag,this.currentPage);
			},
			
		},
		created() {
			this.getMajors();
			this.getProducts(1,null);
		}
	}
</script>

<style lang="scss" scoped>
	.product {
		//margin-top: 1.25rem;
	}
	.product-header{
		width: 100%;
		height: 6.25rem;
		margin: 1.25rem 0;
		background: #06beb6;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #48b1bf, #06beb6);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #48b1bf, #06beb6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		color: ghostwhite;
		display: flex;
		justify-content: left;
		align-items: center;
		
		.title{
			height: 6.25rem;
			display: flex;
			align-items: center;
			justify-content:left;
			padding-left: 0.625rem;
			svg{
				width: 3.125rem;
				height: 3.125rem;
				//border: 1px solid red;
			}
		}
	}
	
	.el-card {
		margin-top: 0.625rem;
		
		&:nth-child(2n){
			margin-top: 1.25rem;
			color: cyan;
		}
		
	}
	
</style>
