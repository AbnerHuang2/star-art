<template>
	<div>
		<el-row>
			<el-col :span="14">
				<div class="course-header">
					<svg t="1585207479329" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1401" width="200" height="200"><path d="M0 0m512 0l0 0q512 0 512 512l0 0q0 512-512 512l0 0q-512 0-512-512l0 0q0-512 512-512Z" fill="#FFFFFF" p-id="1402"></path><path d="M268.8 281.6m38.4 0l332.8 0q38.4 0 38.4 38.4l0 371.2q0 38.4-38.4 38.4l-332.8 0q-38.4 0-38.4-38.4l0-371.2q0-38.4 38.4-38.4Z" fill="#FCCF0A" p-id="1403"></path><path d="M358.4 358.4m38.4 0l332.8 0q38.4 0 38.4 38.4l0 371.2q0 38.4-38.4 38.4l-332.8 0q-38.4 0-38.4-38.4l0-371.2q0-38.4 38.4-38.4Z" fill="#046EA7" p-id="1404"></path><path d="M435.2 486.4m19.2 0l64 0q19.2 0 19.2 19.2l0 0q0 19.2-19.2 19.2l-64 0q-19.2 0-19.2-19.2l0 0q0-19.2 19.2-19.2Z" fill="#82D2F7" p-id="1405"></path><path d="M435.2 576m19.2 0l128 0q19.2 0 19.2 19.2l0 0q0 19.2-19.2 19.2l-128 0q-19.2 0-19.2-19.2l0 0q0-19.2 19.2-19.2Z" fill="#82D2F7" p-id="1406"></path><path d="M435.2 665.6m19.2 0l192 0q19.2 0 19.2 19.2l0 0q0 19.2-19.2 19.2l-192 0q-19.2 0-19.2-19.2l0 0q0-19.2 19.2-19.2Z" fill="#82D2F7" p-id="1407"></path></svg>
					<h2>课程分类</h2>
				</div>
			</el-col>
			<el-col :span="10">
				<div class="course-search">
					<el-input v-model="courseName" placeholder="搜索感兴趣的课程"></el-input>
					<el-button @click="clickSearch"><i class="el-icon-search"></i></el-button>
				</div>
			</el-col>
		</el-row>
		<div class="course-tags">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="(m,i) in major" :key="i" :label="m.majorName" :name="i+''">
					<el-row>
						<el-button v-for="(detail,i) in directList" :key="i" size="mini" 
						@click="getCourseBydirect(detail.id)">{{detail.directName}}</el-button>
						
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="course-tags">
			<span class="level">难度</span>
			<el-radio-group v-model="lastTag" size="small" @change="getCourseByTag(lastTag)">
				<el-radio-button label="入门" ></el-radio-button>
				<el-radio-button label="初级" ></el-radio-button>
				<el-radio-button label="中级" ></el-radio-button>
				<el-radio-button label="高级" ></el-radio-button>
			</el-radio-group>
		</div>
		<!-- 卡片组 -->
		<div style="padding: 1.25rem;">
			<el-row type="flex" justify="left" :gutter="20">
				<el-col :span="6" v-for="(obj,index) in courseList.slice(0, 4)" :key="index">
					<el-card class="box-card"  :body-style="{ padding: '0' }">
						<img :src="obj.coverImgurl" class="image" @click="clickCourse(obj)">
						<div style="padding: 14px;" @click="clickCourse(obj)">
							<span>{{obj.courseName}}</span>
							<div class="bottom clearfix">
								<div class="tag-line">
									<span v-for="(x,index) in obj.tags.split(';')" :key="index">{{x}}</span>
								</div>
								<time class="time">学习人数 {{obj.stuNum}}</time>
								<span class="price" v-if="obj.cost==0">限时免费</span>
								<span class="price" v-else>￥{{obj.cost}}</span>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
			<el-row type="flex" justify="left" :gutter="20" style="margin-top: 1.25rem;">
				<el-col :span="6" v-for="(obj,index) in courseList.slice(4,8)" :key="index">
					<el-card class="box-card"  :body-style="{ padding: '0' }" >
						<img :src="obj.coverImgurl" class="image" @click="clickCourse(obj)">
						<div style="padding: 14px;" @click="clickCourse(obj)">
							<span>{{obj.courseName}}</span>
							<div class="bottom clearfix">
								<div class="tag-line">
									<span v-for="(x,index) in obj.tags.split(';')" :key="index">{{x}}</span>
								</div>
								<time class="time">学习人数 {{obj.stuNum}}</time>
								<span class="price" v-if="obj.cost==0">限时免费</span>
								<span class="price" v-else>￥{{obj.cost}}</span>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<!-- /卡片组 -->
		
		<div style="text-align: center;margin: 1.875rem; 0">
			<el-pagination background layout="prev, pager, next" :page-size="pageSize" 
			:total="total" :current-page="currentPage" @current-change="handlePageChange" hide-on-single-page>
			</el-pagination>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'Product',
		data() {
			return {
				courseName:'',
				courseList:[],
				directList:[],
				directId:null,//记录上一次点的directId。(给按tag搜索做记录用的)
				lastTag:'',	//记录上一次点的tag（分页时候用的）
				activeName:'0',
				total: 100,
				pageSize:10,
				currentPage:1,
				major:[
					{
						id:null,
						majorName:'全部'
					}
				],
				radio1:'',
			};
		},
		methods:{
			//处理标签页点击
			handleClick(){
				//把directId清零，防止点击到另一个专业还是搜索上一个专业的directId
				this.directId = null;
				this.lastTag = '';
				this.courseName = '';
				//获取相关专业的具体
				this.getDirectsByMajor(this.major[Number(this.activeName)].id);
				//获取课程
				this.getCourses(this.major[Number(this.activeName)].id,null,'');
			},
			clickSearch(){
				this.getCourses(null,null,'',this.courseName);
			},
			//处理课程卡片点击
			clickCourse(course){
				this.$router.push({
					path: '/courseDetail' ,
					query:{
						courseId:course.id
					}
				})
			},
			getMajors(){
				this.$ajax({
					url: this.global.serverSrc+'/major/getAllMajor',
					method: 'post',
				}).then(res => {
					this.major = res.data.data;
					this.major.splice(0,0,{'id':null,'majorName':'全部'});
					
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
			getCourseBydirect(directId){
				//每次点击专业方向的时候修改this.directId的值
				this.directId = directId;
				this.getCourses(this.major[Number(this.activeName)].id,directId,this.lastTag);
			},
			getCourseByTag(tag){
				this.lastTag = tag;
				this.getCourses(this.major[Number(this.activeName)].id,this.directId,tag);
			},
			getCourses(majorId,directId,tag,name,page,pageSize){
				this.$ajax({
					url: this.global.serverSrc+'/course/getCourses',
					method: 'post',
					params:{
						majorId,
						directId,
						tag,
						name,
						page,
						pageSize
					}
				}).then(res => {
					if(res.data.code==200){
						this.courseList = res.data.data.list;
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
				this.getCourses(this.major[Number(this.activeName)].id,this.directId,this.lastTag,this.courseName,this.currentPage);
			},
		},
		created() {
			this.getMajors();
			this.getCourses(null,null,'');
		}
	}
	
</script>

<style lang="scss" scoped>
	
	/* 清除浮动 */
	.clearfix:before,
	.clearfix:after {
		display: block;
		content: "";
	}
	
	.clearfix:after {
		clear: both
	}
	/* /清除浮动 */
	
	.course-header{
		height: 6.25rem;
		display: flex;
		align-items: center;
		justify-content:left;
		
		svg{
			width: 60px;
			height: 60px;
			//border: 1px solid red;
		}
		
		h2{
			color: #333;
		}
	}
	.course-search{
		margin: 0 1.875rem;
		height: 6.25rem;
		display: flex;
		align-items: center;
		justify-content:center;
	}
	.course-tags{
		width: 96%;
		margin: 0 auto;
		padding-bottom: 1.25rem;
	}
	.level{
		font-weight: bold;
		margin-right: 1.875rem;
	}
	/*course-cardgroup*/
	.course-cardgroup{
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: 1.25rem 0;
	}
	.course-cardgroup .box-card{
		width: 280px;
		height: 17.5rem;
		margin-left: 0.9375rem;
		border-radius: 10px;
	}
	/* /course-cardgroup*/
</style>
