<template>
	<div v-if="show">
		<el-row :gutter="20">
			<!-- 左边 -->
			<el-col :span="16">
				<div style="margin: 0.625rem 0 0 1.25rem">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item :to="{ path: '/course' }">全部课程</el-breadcrumb-item>
						<el-breadcrumb-item v-if="course.directId<5">美术专业</el-breadcrumb-item>
						<el-breadcrumb-item v-else>音乐专业</el-breadcrumb-item>
						<el-breadcrumb-item>{{course.courseName}}</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="left">
					<el-image :src="course.coverImgurl" fit="cover"></el-image>
					<div class="left-content">
						<h2>{{course.courseName}}</h2>
						<div class="tag-line" style="margin-top: 0.3rem;">
							<span>学习人数：{{course.stuNum}}</span>
							<span>课程有效期至 : 无限期</span>
						</div>
						<span class="price" style="float: left;" v-if="course.cost==0">限时免费</span>
						<span class="price" style="float: left;" v-else>￥{{course.cost}}</span>
						<div class="clearfix"></div>
						<el-button v-if="btnText=='开始学习'" type="success" style="padding:0.625rem 0.8rem;margin-left: 6.25rem" @click="chapterClick(0)">{{btnText}}</el-button>
						<el-button v-else type="primary" style="padding:0.625rem 0.8rem;margin-left: 6.25rem" @click="joinLearn(course)">{{btnText}}</el-button>
					</div>
				</div>
				<el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left: 1.25rem;">
					<el-tab-pane label="课程介绍" name="first">
						<div class="course-intro">
							<h2>简介</h2>
							{{course.courseName}}
							<br>
							在线课程，录播课程+回放学习+专属学员群+名师答疑。
							<h2>课程大纲</h2>
							<h5>声乐初级·唱歌姿势讲解</h5>
							<h5>声乐初级·介绍三种不同的呼吸方法</h5>
							<h5>声乐初级·口型训练</h5>
							<h5>声乐初级·鸣哼练习</h5>
							<h5>声乐初级·演唱气息不足训练</h5>
							<h2>学习目标</h2>
							本课天籁在线音乐老师将对基本的唱歌姿势讲解、介绍三种不同的呼吸方法及针对口型训练、鸣哼练习、演唱气息不足训练等几个方面带你了解到声乐学习快速入门的训练方法，通过老师详细示范和讲解教你在课后的声乐演唱过程中自己能进行有效的练习，从而使自己在声乐演唱的学习中更上一层楼。
						</div>
					</el-tab-pane>
					<el-tab-pane label="目 录" name="second">
						<div class="chapter">
							<ul>
								<li v-for="(obj,i) in chapterList" :key="i" @click="chapterClick(i)">
									<i class="el-icon-video-play"></i>
									<span>{{obj.chapterTitle}}</span>
								</li>
							</ul>
						</div>
					</el-tab-pane>
					<el-tab-pane label="评 论" name="third">
						<div>
							<comment :entityType="2" :entityId="course.id" :pageSize="6" :pubButton="btnText=='开始学习'?true:false"></comment>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-col>
			<!-- /左边 -->
			<!-- 右边 -->
			<el-col :span="8">
				<div class="right">
					<div class="right-teacher">
						<el-avatar :size="70" :src="teacher.userAvatarURL"></el-avatar>
						<h2>{{teacher.userName}}</h2>
					</div>
					<div class="intro">
						<p>{{teacher.userIntro}}</p>
					</div>
				</div>
			</el-col>
			<!-- /右边 -->
		</el-row>
		<!-- 支付 Dialog -->
		<el-dialog title="购买课程" :visible.sync="payDialog">
			<h4>支付</h4>
			<div style="text-align: center;">
				<img style="width: 200px;" :src="codeImg" alt="">
			</div>
		</el-dialog>
		<!-- / 支付 Dialog -->
	</div>
</template>

<script>
	import comment from "../views/comment-dialog.vue"
	export default {
		components: {
			comment,
		},
		data() {
			return {
				show:false,
				btnText: '加入学习',
				teacherAvatar: 'http://www.psoneart.com/Uploads/Content/2018-05-09/5af29c1fcdb84.jpg',
				activeName: 'second',
				courseImg: 'http://pic.tianlailive.com/course/67843/20200401/05686a07-6002-44ad-99a7-866dd46ebac1.png',
				course:{},
				teacher:{},
				chapterList:[],
				payDialog:false,
				codeImg:"https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1590634241&di=9319e5e93a126d495da80a4f08d23121&src=http://bpic.588ku.com/element_origin_min_pic/01/42/51/90573d7eb6115f6.jpg",
			}
		},
		methods: {
			handleClick() {
				
			},
			chapterClick(index){
				if(this.btnText == '加入学习'){
					this.$alert('请先将课程加入学习', '', {
							confirmButtonText: '确定',
						})
						
					return;
				}
				let routeData = this.$router.resolve({
					path: '/coursePlay' ,
					query: {
						index,
						courseId:this.course.id
						//chapterList:JSON.stringify(this.chapterList),
					},
				})
				window.open(routeData.href, '_blank');
			},
			joinLearn(course) {
				if (this.btnText == '加入学习') {
					//检测是否登录
					if (this.global.user != null) {
						//支付操作
						//TODO
						if(course.cost>0){
							this.payDialog = true;
						}else{
							this.btnText = '开始学习';
						}
					} else {
						this.$message({
							message: '请先登录',
							type: 'warning'
						});
					}
				}
			},
			getTeacher(id){
				this.$ajax({
					url: this.global.serverSrc+'/teacher/getOneTeacher',
					method: 'post',
					params:{
						id
					}
				}).then(res => {
					this.teacher = res.data.data;
				})
			},
			getChapters(courseId){
				this.$ajax({
					url: this.global.serverSrc+'/chapter/getChapters',
					method: 'post',
					params:{
						courseId,
					}
				}).then(res => {
					this.chapterList = res.data.data;
				})
			},
			getCourse(courseId){
				this.$ajax({
					url: this.global.serverSrc+'/course/getSingleCourse',
					method: 'post',
					params:{
						courseId,
					}
				}).then(res => {
					console.log(res)
					if(res.data.code==200){
						this.show = true;
						this.course = res.data.data;
						this.getTeacher(2);
						//this.getTeacher(this.course.teacherId);
						
						//this.getChapters(this.course.id);
						//先测试
						this.getChapters(1);
						
					}
				})
			},
			getRouterData() {
				let courseId = this.$route.query.courseId;
				this.getCourse(courseId);
				//this.course = JSON.parse(this.$route.query.course)
			},
			handlePageChange(currentPage){
				this.currentPage = currentPage;
				//获取分页数据
				this.getComment(this.course.id,null,this.currentPage,this.pageSize)
			},
		},
		created() {
			this.getRouterData();
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

	* {
		margin: 0;
		padding: 0;
	}

	.left {
		width: 100%;
		display: flex;
		justify-content: left;
		padding: 1.25rem;

		.el-image {
			width: 40%;
			border: 2px solid whitesmoke;
		}
	}

	.left-content {
		margin-left: 1.25rem;
		padding: 1.25rem;
	}

	/*right*/
	.right {
		padding: 1.25rem;
	}

	.right-teacher {
		display: flex;
		justify-content: left;
		align-items: center;

		h2 {
			margin-left: 1.25rem;
			font-family: 'Roboto', sans-serif;
			font-size: 1.25rem;
			font-weight: 700;
		}
	}

	.intro {
		position: relative;
		margin-top: 1.25rem;
		padding: 0.8rem;
		background-color: #f5f6fa;
		border-radius: 0.625rem;

		::before {
			content: " ";
			width: 0.625rem;
			height: 0.625rem;
			position: absolute;
			left: 1.875rem;
			top: -5px;
			border-left: 2px solid #f5f6fa;
			border-top: 2px solid #f5f6fa;
			transform: rotate(45deg);
		}

		p {
			text-indent: 1em;
			color: #353b48;
			font-family: 'Roboto', sans-serif;
			font-size: 0.8rem;
			font-weight: 700;
		}
	}

	/*课程介绍*/
	.course-intro {
		padding: 1.25rem;
		font-family: 'Roboto', sans-serif;

		h2 {
			padding: 0.625rem 0;
			color: #487eb0;
			font-size: 1.2rem;
			font-weight: 700;
		}
	}

	/*目录*/
	.chapter {

		ul li {
			padding: 0.625rem;
			font-family: 'Roboto', sans-serif;
			font-size: 0.9rem;
			font-weight: 700;

			i {
				font-weight: bold;
			}

			span {
				margin-left: 1rem;
			}

			&:hover {
				color: darkred;
				background-color: #f5f6fa;


			}
		}
	}

	/*评论*/
	.course-comment {
		margin-top: 1.25rem;
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
				text-indent: 1em;
			}
		}
	}
</style>
