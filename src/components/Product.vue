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
						@click="getProductsBydirect(detail.id)">{{detail.directName}}</el-button>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="card-group" style="padding: 1.875rem 0rem 2.5rem 0rem;">
			<card v-for="(obj,index) in productList" :key="index" :to="obj" 
			:data-image="obj.productUrl">
				<!-- <h1 slot="header">{{obj.productName}}</h1> -->
				<p slot="content">{{obj.productIntro}}</p>
			</card>
		</div>
		
		<div style="text-align: center;margin-bottom: 1.875rem;">
			<el-pagination background layout="prev, pager, next" :page-size="pageSize"
			:total="total" :current-page="currentPage" @current-change="handlePageChange" hide-on-single-page>
			</el-pagination>
		</div>
		
		<!-- cardDialig -->
		<el-dialog title="查看作品" :visible.sync="cardDialog">
			<div v-if="cardObj!=null" style="width: 70%;">
				<el-image :src="cardObj.productUrl"></el-image>
				<div class="product-bottom">
					<div class="person-info">
						<el-avatar v-if="cardUser!=null" :size="50" :src="cardUser.userAvatarURL"></el-avatar>
					</div>
					<div class="product-info">
						<h3>{{cardObj.productName}}</h3>
						<a class="a-btn">
							<svg t="1588943012344" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2428" width="20" height="20"><path d="M470.24 284.48a173.888 173.888 0 0 0-245.664 0 173.824 173.824 0 0 0 0 245.632l271.488 271.488 271.488-271.488a173.888 173.888 0 0 0 0-245.664 173.824 173.824 0 0 0-245.632 0l-25.856 25.856-25.824-25.824z" fill="#F83B57" p-id="2429"></path><path d="M480 16v64a16 16 0 1 0 32 0v-64a16 16 0 1 0-32 0z m242.144 56.32l-32 55.424a16 16 0 1 0 27.712 16l32-55.424a16 16 0 1 0-27.712-16z m181.536 169.824l-55.424 32a16 16 0 0 0 16 27.712l55.424-32a16 16 0 0 0-16-27.712zM976 480h-64a16 16 0 1 0 0 32h64a16 16 0 1 0 0-32z m-56.32 242.144l-55.424-32a16 16 0 0 0-16 27.712l55.424 32a16 16 0 0 0 16-27.712z m-169.824 181.536l-32-55.424a16 16 0 0 0-27.712 16l32 55.424a16 16 0 0 0 27.712-16zM512 976v-64a16 16 0 1 0-32 0v64a16 16 0 1 0 32 0z m-242.144-56.32l32-55.424a16 16 0 0 0-27.712-16l-32 55.424a16 16 0 0 0 27.712 16zM88.32 749.856l55.424-32a16 16 0 0 0-16-27.712l-55.424 32a16 16 0 0 0 16 27.712zM16 512h64a16 16 0 1 0 0-32h-64a16 16 0 1 0 0 32z m56.32-242.144l55.424 32a16 16 0 1 0 16-27.712l-55.424-32a16 16 0 1 0-16 27.712zM242.144 88.32l32 55.424a16 16 0 1 0 27.712-16l-32-55.424a16 16 0 1 0-27.712 16z" fill="#84EBF1" p-id="2430"></path></svg>
							<span>{{cardObj.productLike}}</span>
						</a>
						<p>{{cardObj.productIntro}}</p>
					</div>
				</div>
			</div>
		</el-dialog>
		<!-- /cardDialig -->
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
				cardDialog:false,
				cardObj:null,
				cardUser:null,
			}
		},
		methods:{
			handleClick(){
				//获取相关专业的具体
				this.getDirectsByMajor(this.major[Number(this.activeName)].id);
				
				//获取相关作品
				this.getProducts(this.major[Number(this.activeName)].id,null);
			},
			clickCard(obj){
				this.cardDialog=true
				this.cardObj = obj;
			},
			getMajors(){
				this.$ajax({
					url: this.global.serverSrc+'/major/getAllMajor',
					method: 'post',
				}).then(res => {
					this.major = res.data.data;
					//获取相关专业的方向
					this.getDirectsByMajor(this.major[Number(this.activeName)].id);
					
					//获取相关作品
					this.getProducts(this.major[Number(this.activeName)].id,null);
					
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
			getProductsBydirect(directId){
				//每次点击专业方向的时候修改this.directId的值
				this.directId = directId;
				this.getProducts(this.major[Number(this.activeName)].id,directId,this.lastTag);
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
			getUserById(id){
				this.$ajax({
					url: this.global.serverSrc+'/user/getUser',
					method: 'post',
					params:{
						id,
					}
				}).then(res => {
					console.log(res)
					if(res.data.code==200){
						this.cardUser = res.data.data;
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
	.product-bottom{
		display: flex;
		justify-content: left;
		align-items: center;
	}
	.person-info{
		padding: 1.25rem;
	}
	.product-info{
		display: inline-block;
	}

	.a-btn{
		text-decoration: none;
		display: flex;
		align-items: center;
		color: #333333;
	}

</style>
