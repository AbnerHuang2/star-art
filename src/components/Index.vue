<template>
	<div>
		<div>
			<!-- 轮播 -->
			<el-carousel :interval="5000" arrow="arrow" height="400px">
				<el-carousel-item v-for="(item,index) in sites" :key="index">
					<img :src="item.imgUrl" alt="">
				</el-carousel-item>
			</el-carousel>
			<!-- /轮播 -->
			<!-- fancy -->
			<div class="fancy">
				<div style="width: 100%; text-align: center;">
					<h2><i class="el-icon-magic-stick"></i> STAR 玩法</h2>
					<h5>艺术知识无穷尽，快乐学习成长快</h5>
				</div>
				<!-- 这里打算放课程，导师，作品，社区各一张 -->
				<div style="width: 94%; margin: 0 auto;">
					<div class="card-group">
						<card v-for="(obj,index) in homeStartList" :key="index" :to="obj.title" :data-image="obj.imgUrl">
							<h1 slot="header">{{obj.title}}</h1>
							<p slot="content">{{obj.intro}}
							</p>
						</card>
					</div>
					<el-row style="margin-top: 1.25rem;">
						<el-col :offset="10" :span="6"><button class="btn draw">想 看 更 多</button></el-col>
					</el-row>
				</div>
			</div>
			<!-- / fancy -->
			<!-- 第二栏 -->
			<el-row>
				<el-col :span="16">
					<!-- 公开课 -->
					<div class="publicClass">
						<div style="width: 100%; text-align: center;">
							<h2>STAR 公开课</h2> <h5>艺术知识无国界，大师经典零距离</h5>
						</div>
						<el-row>
							<el-col :span="3" :offset="21" align='right'>
								<el-button type="text" size="medium" round style="color: #008B8B;">查看更多 >></el-button>
							</el-col>
						</el-row>
						<el-row type="flex" justify="center" :gutter="20">
							<el-col :span="6" v-for="(obj,index) in homeCourses.pubCourseList" :key="index">
								<el-card :body-style="{ padding: '0' }" shadow="hover">
									<img :src="obj.coverImgurl" class="image">
									<div style="padding: 14px;">
										<span>{{obj.courseName}}</span>
										<div class="bottom clearfix">
											<time class="time">{{ obj.pubTime }}</time>
											<el-button size="mini" class="button" type="text" @click="clickCourse(obj)">查看详情</el-button>
										</div>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</div>
					<!-- /公开课 -->
				</el-col>
				<el-col :span="8">
					<div class="hot">
						<el-tabs v-model="activeName" @tab-click="tabClick">
							<el-tab-pane label="社区精选" name="1">
								<div class="hot-pane">
									<div class="index-blog" v-for="(obj,i) in newsVoList" :key="i">
										<div @click="showPersonInfo(obj.user.id)">
											<el-avatar :size="40" :src="obj.user.userAvatarURL" ></el-avatar>
										</div>
										<div class="title">
											<h3 @click="clickNews(obj)">{{obj.news.newsTitle}} </h3>
										</div>
									</div>
									<div style="text-align: center;">
										<router-link to="/community" style="text-decoration: none;color: darkcyan;">
											查看更多
										</router-link>
									</div>
								</div>
							</el-tab-pane>
							<el-tab-pane label="STAR最佳榜" name="2">
								<h3 style="margin: 20px 0;"><i class="el-icon-sunny"></i>最佳人气</h3>
								<div class="active-group">
									<div class="active-card" v-for="(obj,i) in hotUserList" :key="i" @click="showPersonInfo(obj.id)">
										<el-avatar :size="40" :src="obj.userAvatarURL"></el-avatar>
										<span>{{obj.userNickName}}</span>
									</div>
								</div>
								<h3 style="margin: 20px 0;"><i class="el-icon-cloudy-and-sunny"></i>最佳周活跃</h3>
								<div class="active-group">
									<div class="active-card" v-for="(obj,i) in 4" :key="i">
										<el-avatar :size="40" :src="circleUrl"></el-avatar>
										<span>艺考小神童fsdfsadf</span>
									</div>
								</div>
							</el-tab-pane>
						</el-tabs>
					</div>
				</el-col>
			</el-row>
			<!-- /第二栏 -->
			<div>
				<!-- 美术专业 -->
				<course :courseList="homeCourses.artCourseList" title="美术专业" :loadMore="1"></course>
				<!-- /美术专业 -->
				<!-- 音乐专业 -->
				<course :courseList="homeCourses.musicCourseList" title="音乐专业" :loadMore="2"></course>
				<!-- / 音乐专业 -->
			</div>
			<!-- funcy -->
			<div :class="showFuncy?'showFunny':'funny'" style="position: relative;height: 250px;margin-top: 2rem;">
				<div class="bubble">看累了吧，放松一下</div>
				<div class="wrapper">
					<div class="candles">
						<div class="light__wave"></div>
						<div class="candle1">
							<div class="candle1__body">
								<div class="candle1__eyes">
									<span class="candle1__eyes-one"></span>
									<span class="candle1__eyes-two"></span>
								</div>
								<div class="candle1__mouth"></div>
							</div>
							<div class="candle1__stick"></div>
						</div>

						<div class="candle2">
							<div class="candle2__body">
								<div class="candle2__eyes">
									<div class="candle2__eyes-one"></div>
									<div class="candle2__eyes-two"></div>
								</div>
							</div>
							<div class="candle2__stick"></div>
						</div>
						<div class="candle2__fire"></div>
						<div class="sparkles-one"></div>
						<div class="sparkles-two"></div>
						<div class="candle__smoke-one">

						</div>
						<div class="candle__smoke-two">

						</div>
					</div>
					<div class="floor">
					</div>
				</div>
			</div>
			<!-- funcy -->
			<!-- 导师介绍 -->
			<div>
				<el-row>
					<el-col :span="12">
						<h2>导师团队</h2>
					</el-col>
					<el-col :span="2" :offset='10' align='middle' style="padding-top: 1.25rem;">
						<el-tooltip class="item" effect="dark" content="查看更多" placement="bottom">
							<router-link to="/teacher">
								<svg style="width: 2.5rem; height: 2.5rem; " t="1585275691552" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3868" width="200" height="200"><path d="M820.8 944H539.2c-86.4 0-155.2-70.4-155.2-155.2v-46.4c0-86.4 70.4-155.2 155.2-155.2h281.6c86.4 0 155.2 70.4 155.2 155.2v46.4c0 84.8-70.4 155.2-155.2 155.2z" fill="#96E8BA" p-id="3869"></path><path d="M304 465.6c-100.8 0-182.4-81.6-182.4-182.4S203.2 102.4 304 102.4s182.4 81.6 182.4 182.4S404.8 465.6 304 465.6z m0-320c-75.2 0-137.6 62.4-137.6 137.6s62.4 137.6 137.6 137.6 137.6-62.4 137.6-137.6-62.4-137.6-137.6-137.6zM768 462.4h-128c-65.6 0-118.4-52.8-118.4-118.4v-128c0-65.6 52.8-118.4 118.4-118.4h128c65.6 0 118.4 52.8 118.4 118.4v128c0 65.6-52.8 118.4-118.4 118.4z m-128-320c-40 0-73.6 33.6-73.6 73.6v128c0 40 33.6 73.6 73.6 73.6h128c40 0 73.6-33.6 73.6-73.6v-128c0-40-33.6-73.6-73.6-73.6h-128zM368 862.4h-128c-65.6 0-118.4-52.8-118.4-118.4v-128c0-65.6 52.8-118.4 118.4-118.4h128c65.6 0 118.4 52.8 118.4 118.4v128c0 65.6-52.8 118.4-118.4 118.4z m-128-320c-40 0-73.6 33.6-73.6 73.6v128c0 40 33.6 73.6 73.6 73.6h128c40 0 73.6-33.6 73.6-73.6v-128c0-40-33.6-73.6-73.6-73.6h-128zM768 862.4h-128c-65.6 0-118.4-52.8-118.4-118.4v-128c0-65.6 52.8-118.4 118.4-118.4h128c65.6 0 118.4 52.8 118.4 118.4v128c0 65.6-52.8 118.4-118.4 118.4z m-128-320c-40 0-73.6 33.6-73.6 73.6v128c0 40 33.6 73.6 73.6 73.6h128c40 0 73.6-33.6 73.6-73.6v-128c0-40-33.6-73.6-73.6-73.6h-128z" fill="#103E26" p-id="3870"></path><path d="M304 368c-46.4 0-83.2-38.4-83.2-83.2s38.4-83.2 83.2-83.2 83.2 38.4 83.2 83.2S350.4 368 304 368z m0-128c-24 0-44.8 19.2-44.8 44.8s19.2 44.8 44.8 44.8 44.8-19.2 44.8-44.8S328 240 304 240z" fill="#103E26" p-id="3871"></path></svg>
							</router-link>
						</el-tooltip>
					</el-col>
				</el-row>
				<div class="team-members">
					<div class="single-member effect-1" v-for="(obj,i) in teacherList" :key="i">
						<div class="member-image">
							<img :src="obj.userAvatarURL" alt="Member">
						</div>
						<div class="member-info">
							<h3>{{obj.userName}}</h3>
							<h5>{{obj.userMajor}}</h5>
							<p>{{obj.userIntro}}</p>
							<div class="social-touch">
								<a @click="showPersonInfo(obj.id)">查看更多</a>
								<a href="#">我要咨询</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- /导师介绍 -->
		</div>
		<!-- 选择专业 Dialog -->
		<el-dialog title="选择专业" :visible.sync="tagChooseDialog">
			<div>
				<h5>选择感兴趣的专业可以给你推荐更合适的信息哦</h5>
				<div>
					<el-radio-group v-model="radio1">
						<el-radio-button label="美术专业"></el-radio-button>
						<el-radio-button label="音乐专业"></el-radio-button>
					</el-radio-group>
				</div>
				<div>
					<el-button type="text" @click="tagChooseDialog=false;">以后在说(可在个人中心设置)</el-button>
				</div>
			</div>
		</el-dialog>
		<!-- / 选择专业 Dialog -->
	</div>
</template>

<script>
	import axios from "axios"
	import card from '../views/card.vue'
	import course from '../views/course-dialog.vue'
	export default {
		name: 'Index',
		components: {
			card,
			course,
		},
		data() {
			return {
				homeStartList:[],
				homeCourses:[],
				teacherList:[],
				newsVoList:[],
				hotUserList:[],
				activeName:'1',
				showFuncy: false,
				sites: [{
						title: '素描几何0基础入门体系课程',
						imgUrl: 'http://www.psoneart.com/Uploads/Content/2020-03-23/5e784fa5e0aea.jpg'
						//'https://images.pexels.com/photos/4370670/pexels-photo-4370670.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1000'
					},
					{
						title: '导师',
						imgUrl: "http://www.psoneart.com/Uploads/Content/2020-05-14/5ebcb1e24f057.jpg"
						// 'http://img02.img.mei-shu.net/Uploads/exhibition/1807/bbesmc5xpuv.jpg'
					},
					{
						title: '作品',
						imgUrl: 'http://pic.tianlailive.com/cycllepic/67843/20200424/92b46ff7-fa13-4329-bf3f-af26be10cdba.png'
						//'https://images.pexels.com/photos/3978594/pexels-photo-3978594.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1000'
					},
					{
						title: '社区',
						imgUrl: 'http://pic.tianlailive.com/cycllepic/67843/20200403/ec9369d2-7c5c-463d-a3ee-ad469a1c1034.jpg'
						//'https://images.pexels.com/photos/1292241/pexels-photo-1292241.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1000'
					},
				],
				tempImg: 'http://www.psoneart.com/Uploads/Content/2018-05-09/5af29c1fcdb84.jpg',
				circleUrl:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
				tagChooseDialog:false,
				radio1:'美术专业',
			};
		},
		methods: {
			tabClick(){
				if(this.activeName==2){
					this.getHotUserList(1,4);
				}
			},
			choosePub(o) {
				alert("ok" + o);
			},
			clickNews(obj){
				this.$router.push({
					path: '/newsDetail' ,
					query:{
						newsVo:JSON.stringify(obj)
					}
				})
			},
			showPersonInfo(id){
				this.$router.push({
					path: '/person' ,
					query:{
						id,
					}
				})
			},
			showSth() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				if (scrollTop > 2000) {
					this.showFuncy = true;
				}
			},
			getHotUserList(page,pageSize){
				this.$ajax({
					url: this.global.serverSrc+'/user/getHotUsers',
					method: 'post',
					params:{
						page,
						pageSize,
					}
				}).then(res => {
					if(res.data.code==200){
						this.hotUserList = res.data.data;
					}
				})
			},
			getNews(page,pageSize){
				this.$ajax({
					url: this.global.serverSrc+'/news/getNews',
					method: 'post',
					params:{
						sort:"hot",
						page,
						pageSize,
					}
				}).then(res => {
					if(res.data.code==200){
						this.newsVoList = this.newsVoList.concat(res.data.data.list);
					}
				})
			},
			getHomeStart(){
				this.$ajax({
					url: this.global.serverSrc + "/getHomeStart",
					method: "get",
				}).then(res => {
					if(res.data.code==200){
						this.homeStartList = res.data.data;
					}
				})
			},
			getHomeCourses(){
				axios({
					url: this.global.serverSrc + "/course/homeCourses",
					method: "get",
					params: {
						offset: 0,
						pageSize: 4
					}
				}).then(res => {
					if(res.data.code==200){
						this.homeCourses = res.data.data;
					}
				})
			},
			clickCourse(course){
				this.$router.push({
					path: '/courseDetail' ,
					query:{
						course:JSON.stringify(course),
					}
				})
			},
			getHomeTeachers(size){
				axios({
					url: this.global.serverSrc + "/teacher/getRecommandTeachers",
					method: "get",
					params: {
						size
					}
				}).then(res => {
					if(res.data.code==200){
						this.teacherList = res.data.data;
					}
				})
			},
			index(){
				this.getHomeStart();
				this.getHomeCourses();
				this.getHomeTeachers(3);
				this.getNews(1,5);
				
				setTimeout(() => {
					if(this.global.user!=null){
						//判断用户是否选了专业
						if(this.global.user.userDirections==null){
							this.tagChooseDialog = true;
						}
					}
				}, 1000)
			}
		},
		created() {
			window.addEventListener('scroll', this.showSth);
			//加载首页内容
			this.index();
		},
		mounted() {
			
		},
		// 离开该页面需要移除这个监听的事件
		destroyed() {
			window.removeEventListener('scroll', this.showSth)
		}
	}
</script>

<style lang="scss" scoped>
	@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
	
	@import url("../assets/css/index.css");
	@import url("../assets/css/button.css");
	@import url("../assets/css/personCard.css");

	/* 热点 */
	.hot{
		height: 23.75rem;
		padding: 0.625rem;
		padding-left: 1.25rem;
		
		h3{
			font-family: 'Roboto', sans-serif;
			font-size: 0.85rem;
			font-weight: 700;
			letter-spacing: 0.2rem;
			overflow:hidden;
			white-space:nowrap;
			text-overflow:ellipsis;	
		}
		
	}
	.hot-pane{
		height: 20rem;
		overflow: auto;
		
	}
	.index-blog{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5rem 0;
		
		.title{
			width: 80%;
			height: 2.5rem;
			margin-left: 0.625rem;
			
		}
		
		&:hover{
			color: darkred;
		}
		
	}

	/*活跃*/
	.active-group{
		display: flex;
		flex-wrap: wrap;
		justify-content: left;
		align-items: center;
		padding: 0.3125rem;
	}
	.active-card{
		width: 80px;
		height: 60px;
		padding: 0 2px;
		text-align: center;
		font-family: 'Roboto', sans-serif;
		font-size: 0.55rem;
		font-weight: 700;
		letter-spacing: 0.2rem;
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;	
		
		.el-avatar{
			margin: 0 auto;
			margin-bottom: 0.3125rem;
			display: block;
		}
		
		&:hover{
			color:darkred;
		}
		
	}

	/* /热点 */

	.funny {
		display: none;
	}

	.showFunny {
		display: block;
		transition: 2s;
	}
</style>
