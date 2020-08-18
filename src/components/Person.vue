<template>
	<div v-if="show" class="person">
		<div class="p-header">
			<div v-if="form!=null" class="head-img" style="text-align: center; color: #1abc9c;" 
			@click="clickAvatar">
				<el-avatar style="width: 100%; height: 100%;" :src="form.userAvatarURL"></el-avatar>
				<h2>{{form.userNickName}}</h2>
			</div>
			<!-- 关注 -->
			<div v-if="form!=null&&global.user!=null&&form.id != global.user.id" class="follow" @click="follow()">
				<el-tooltip class="item" effect="dark" :content="followed ? '取消关注':'关注'" placement="bottom">
					<svg t="1589535208355" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2533"
					width="50" height="50">
						<path d="M882.346667 569.813333c56.106667 99.2-75.306667 209.92-139.093334 256a55.466667 55.466667 0 0 1-64 0c-64-45.866667-195.2-156.586667-139.093333-256a103.04 103.04 0 0 1 164.693333-21.333333 9.386667 9.386667 0 0 0 13.653334 0 103.04 103.04 0 0 1 164.693333 21.333333z"
						:fill="followed ? '#27ae60':'#FC455D'" p-id="2534"></path>
						<!--#FC455D #27ae60 -->
						<path d="M815.36 337.066667a195.413333 195.413333 0 0 0-320-56.96 17.92 17.92 0 0 1-26.026667 0A195.413333 195.413333 0 0 0 149.333333 337.066667C54.613333 547.413333 381.226667 778.88 463.36 832a33.28 33.28 0 0 0 36.693333 0c81.92-53.12 408.533333-284.586667 315.306667-494.933333z m-390.186667 28.586666a32 32 0 0 1-40.106666 21.333334 64 64 0 0 0-81.493334 74.666666 32 32 0 1 1-62.506666 13.44 128 128 0 0 1 162.986666-149.333333 32 32 0 0 1 21.12 39.893333z"
						:fill="followed ? '#27ae60':'#FC455D'" p-id="2535"></path>
					</svg>
				</el-tooltip>
			</div>
			<!-- 私信 -->
			<div v-if="form!=null&&global.user!=null&&form.id != global.user.id" 
			class="contact" @click="msgDialog=true">
				<el-tooltip class="item" effect="dark" content="私信" placement="bottom">
					<svg t="1590649254606" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4423" width="32" height="32"><path d="M512 0c282.8 0 512 229.2 512 512s-229.2 512-512 512S0 794.8 0 512 229.2 0 512 0z" fill="#E9E9FF" p-id="4424"></path><path d="M511.8 268.3c-142.9 0-258.5 101.5-258.5 226.5 0 71.3 38.1 135.1 97 176.5v114.5l113.4-68.6c15.7 2.6 31.7 4.1 48.5 4.1 142.9 0 258.5-101.1 258.5-226.5s-116-226.5-258.9-226.5z" fill="#FFFFFF" p-id="4425"></path><path d="M511.8 462.3c-17.9 0-32.5 14.5-32.5 32.5 0 17.9 14.5 32.5 32.5 32.5 17.9 0 32.5-14.5 32.5-32.5 0-17.9-14.6-32.5-32.5-32.5zM382.7 462.3c-17.9 0-32.5 14.5-32.5 32.5 0 17.9 14.5 32.5 32.5 32.5 17.9 0 32.5-14.5 32.5-32.5-0.4-17.9-14.6-32.5-32.5-32.5zM641.3 462.3c-17.9 0-32.5 14.5-32.5 32.5 0 17.9 14.5 32.5 32.5 32.5s32.5-14.5 32.5-32.5c-0.1-17.9-14.6-32.5-32.5-32.5z" fill="#4545FF" p-id="4426"></path></svg>
				</el-tooltip>
			</div>
		</div>
		
		<!-- 私信弹窗 -->
		<el-dialog title="" :visible.sync="msgDialog">
			<div style="width: 90%;">
				<el-row :gutter="20">
					<el-col style="margin: 1.25rem 0;">
						<el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="msgContent">
						</el-input>
					</el-col>
					<el-col :offset='20' :span="4">
						<el-button type="primary" @click="subMsg">发送</el-button>
					</el-col>
				</el-row>
			</div>
		</el-dialog>
		<!-- /私信弹窗 -->
		
		<!-- avatarDialig -->
		<el-dialog title="更换头像" :visible.sync="avatarDialig">
			<div >
				<el-upload class="avatar-uploader" style="border: 1px solid #ecf0f1;" 
				:action="global.serverSrc+'/file/uploadFile'" :show-file-list="false"
				:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</div>
		</el-dialog>
		<!-- /avatarDialig -->
		<div class="p-nav">
			<a v-if="form!=null&&form.id == global.user.id" :style="nav==1 ? 'color: darkcyan;':'' " @click="nav=1">
				<div class="nav-item">
					<h3 style="opacity: 0;">0</h3>
					<span>个人信息</span>
				</div>
			</a>
			<!-- <a v-else-if="form!=null&&form.id != global.user.id" :style="nav==1 ? 'color: darkcyan;':'' " @click="nav=1">
				<div class="nav-item">
					<h3 style="opacity: 0;">0</h3>
					<span> ta 的主页</span>
				</div>
			</a> -->
			<a :style="nav==2 ? 'color: darkcyan;':'' "  @click="clickSelectCourse">
				<div class="nav-item">
					<h3 :style="selectCourseList.length==0 ? 'opacity: 0;':''">{{total}}</h3>
					<span v-if="form.status==1">已学课程</span>
					<span v-else>所授课程</span>
				</div>
			</a>
			<!-- <a :style="nav==3 ? 'color: darkcyan;':'' " @click="nav=3">
				<div class="nav-item">
					<h3 >5</h3>
					<span>作品</span>
				</div>
			</a> -->
			<a :style="nav==4 ? 'color: darkcyan;':'' " @click="clickFollow">
				<div class="nav-item">
					<h3 :style="followList.length==0 ? 'opacity: 0;':''">{{followNum}}</h3>
					<span>关注</span>
				</div>
			</a>
			<a :style="nav==5 ? 'color: darkcyan;':'' " @click="clickFans">
				<div class="nav-item">
					<h3 :style="fansList.length==0 ? 'opacity: 0;':''">{{fansNum}}</h3>
					<span>粉丝</span>
				</div>
			</a>
		</div>
		<div class="p-main">
			<!-- 个人信息 -->
			<div v-if="nav==1&&form!=null&&form.id == global.user.id" class="info">
				<h2>个人信息</h2>
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="姓名">
						<el-input v-model="form.userName" :disabled="!editable"></el-input>
					</el-form-item>
					<el-form-item label="昵称">
						<el-input v-model="form.userNickName" :disabled="!editable"></el-input>
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input v-model="form.userEmail" disabled=""></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-input v-if="!editable" v-model="form.userSex" disabled></el-input>
						<div v-else>
							<el-radio v-model="form.userSex" label="男">男</el-radio>
							<el-radio v-model="form.userSex" label="女">女</el-radio>
							<el-radio v-model="form.userSex" label="暂时保密">暂时保密</el-radio>
						</div>
					</el-form-item>
					<el-form-item label="出生日期">
						<!-- <el-input v-model="form.userBirth" :disabled="!editable"></el-input> -->
						<el-date-picker v-model="form.userBirth" type="date" placeholder="选择出生日期" :disabled="!editable">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="专业">
						<el-input v-if="!editable && userMajor!=null" v-model="userMajor.majorName" disabled></el-input>
						<div v-else>
							<el-radio-group v-model="form.userMajor">
								<el-radio-button label="1">美术专业</el-radio-button>
								<el-radio-button label="2">音乐专业</el-radio-button>
							</el-radio-group>
						</div>
					</el-form-item>
					<el-form-item label="方向">
						<!-- <el-input v-model="form.userDirections" :disabled="!editable"></el-input> -->
						<div v-if="userDirects!=null">
							<el-tag v-for="(obj,i) in userDirects" :key="i" style="margin: 0 10px;" :closable="editable" @close="tagClose(i)">{{obj.directName}}</el-tag>
							<el-button v-if="editable" size="small" @click="addDirects()">添加</el-button>
							<div v-if="editable">
								<el-tag v-for="(obj,i) in directList" :key="i" style="margin: 0 10px;" type="warning" @click="selectDirect(i)">{{obj.directName}}</el-tag>
							</div>
						</div>

					</el-form-item>
					<el-form-item label="个人简介">
						<el-input v-model="form.userIntro" :disabled="!editable"></el-input>
					</el-form-item>
					<el-form-item v-if="!editable">
						<el-button type="primary" @click="editable=true">编辑</el-button>
					</el-form-item>
					<el-form-item v-else>
						<el-button type="primary" @click="updateInfo">确认修改</el-button>
						<el-button @click="cancelUpdateInfo">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
			<!-- <div v-else-if="form!=null&&form.id != global.user.id" class="show-other">
				<h2>{{form.userNickName}}</h2>
				<el-tag>{{form.userSex}}</el-tag>
				<div v-if="userMajor!=null" style="margin-top: 0.625rem;">
					<el-tag>{{userMajor.majorName}}</el-tag>
				</div>
				<div>
					<h3>兴趣</h3>
					<el-tag v-for="(obj,i) in userDirects" :key="i" style="margin: 0 10px;"
					type="warning" @click="selectDirect(i)">{{obj.directName}}</el-tag>
				</div>
				<p>{{form.getUserInfo}}</p>
			</div> -->
			<!-- /个人信息 -->
			<!-- 已学课程 -->
			<div v-if="nav==2">
				<div v-if="selectCourseList.length==0">
					<h2>暂无选课哦</h2>
				</div>
				<el-row :gutter="20" style="margin-bottom: 1.25rem;">
					<el-col :span="6" v-for="(obj,index) in selectCourseList" :key="index">
						<el-card class="box-card" :body-style="{ padding: '0' }" style="margin-top: 1.25rem;">
							<div>
								<img class="image" :src="obj.course.coverImgurl" @click="clickCourse(obj)">
							</div>
							<div style="padding: 14px;">
								<span @click="clickCourse(obj.course)">{{obj.course.courseName}}</span>
								<div class="bottom clearfix">
									<div class="tag-line">
										<span v-for="(x,index) in obj.course.tags.split(';')" :key="index">{{x}}</span>
									</div>
									<time class="time">选课日期 {{new Date(obj.selectCourse.selectDate).toLocaleDateString()}}</time>
									<span v-if="obj.selectCourse.finished==1" class="price" style="font-size: 13px;">已学完</span>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<div style="text-align: center;margin: 1.875rem; 0">
					<el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total" :current-page="currentPage"
					@current-change="handlePageChange" hide-on-single-page>
					</el-pagination>
				</div>
			</div>
			<!-- /已学课程 -->
			<!-- 作品 -->
			<div v-if="nav==3">
				<h2>我的作品</h2>
			</div>
			<!-- /作品 -->
			<!-- 关注 -->
			<div v-if="nav==4">
				<h2>我的关注</h2>
				<div class="follow-group">
					<div class="follow-item" v-for="(obj,i) in followList" :key="i">
						<div class="follow-center" @click="clickPerson(obj.id)">
							<el-avatar :size="50" :src="obj.userAvatarURL"></el-avatar>
							<h3 >{{obj.userNickName}}</h3>
						</div>
						<div class="follow-right" v-if="global.user!=null&form.id==global.user.id">
							<el-button size="small" @click="unfollow(i,obj)">取消关注</el-button>
						</div>
					</div>
				</div>
			</div>
			<!-- /关注 -->
			<!-- 粉丝 -->
			<div v-if="nav==5">
				<h2>关注我的</h2>
				<div class="follow-group">
					<div class="follow-item" v-for="(obj,i) in fansList" :key="i">
						<div class="follow-center" @click="clickPerson(obj.id)">
							<el-avatar :size="50" :src="obj.userAvatarURL"></el-avatar>
							<h3>{{obj.userNickName}}</h3>
						</div>
					</div>
				</div>
			</div>
			<!-- /粉丝 -->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				id:null,
				imageUrl:'',
				avatarDialig:false,
				msgDialog:false,
				msgContent:'',
				followed:false,
				followList:[],
				followNum:0,
				fansList:[],
				fansNum:0,
				nav: 1,
				editable: false,
				form: null,
				userMajor: null,
				userDirects: null,
				directList: [],
				//课程
				selectCourseList: [],
				total: 100,
				pageSize: 10,
				currentPage: 1,
				//作品

			}
		},
		methods: {
			clickAvatar(){
				if(this.form.id == this.global.user.id){
					this.avatarDialig = true;
				}
			},
			handleAvatarSuccess(res) {
				this.imageUrl = res.data;

				this.form.userAvatarURL = res.data;
				this.global.user.userAvatarURL = res.data;
				this.$ajax({
					url: this.global.serverSrc + '/user/updateUserInfo',
					method: 'post',
					data: this.form
				}).then(res => {
					if(res.data.code == 200){
						this.$notify.success("头像修改成功")
					}
					this.avatarDialig = false;
				})
				
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
			
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			subMsg(){
				if(this.msgContent==''){
					this.$notify.warning("内容不能为空");
					return;
				}
				this.$ajax({
					url: this.global.serverSrc + '/message/addMessage',
					method: 'post',
					params: {
						msgContent:this.msgContent,
						fromId:this.global.user.id,
						toId:this.form.id,
					}
				}).then(res => {
					console.log(res)
					if(res.data.code == 200){
						this.$notify.success(res.data.message)
					}else{
						this.$notify.error(res.data.message)
					}
					this.msgDialog = false;
				})
			},
			follow(){
				if(this.followed){
					this.$ajax({
						url: this.global.serverSrc + '/follow/unFollow',
						method: 'post',
						params: {
							entityType:3,
							entityId:this.form.id
						}
					}).then(res => {
						if(res.data.code == 200){
							this.$notify.success("已取消关注")
						}
					})
					this.followed = false;
				}else{
					//this.$notify.success("关注成功")
					this.$ajax({
						url: this.global.serverSrc + '/follow/follow',
						method: 'post',
						params: {
							entityType:3,
							entityId:this.form.id
						}
					}).then(res => {
						if(res.data.code == 200){
							this.$notify.success("关注成功")
						}
					})
					this.followed = true;
				}
			},
			/*个人信息*/
			updateInfo() {
				this.getMajorById(this.form.userMajor)
				//更新用户的directs
				let str = '';
				for (let j = 0; j < this.userDirects.length; j++) {
					str = str + this.userDirects[j].id + ";";
				}
				if (str != '') {
					str = str.substring(0, str.length - 1)
				}
				this.form.userDirections = str;

				this.$ajax({
					url: this.global.serverSrc + '/user/updateUserInfo',
					method: 'post',
					data: this.form
				}).then(res => {
					this.$notify.success(res.data.message)

					this.editable = false;
				})

			},
			cancelUpdateInfo() {
				this.editable = false;
				this.getUserInfo();
			},
			tagClose(i) {
				this.directList.push(this.userDirects[i])
				this.userDirects.splice(i, 1);
			},
			addDirects() {
				this.getDirectsByMajor(this.form.userMajor);
			},
			selectDirect(i) {
				//先添加
				this.userDirects.push(this.directList[i])
				//在删除,顺序乱了会出问题
				this.directList.splice(i, 1);
			},
			/*课程*/
			clickSelectCourse() {
				this.nav = 2;
				this.getSelectCourses(this.form.id);
			},
			//处理课程卡片点击
			clickCourse(course) {
				this.$router.push({
					path: '/courseDetail',
					query: {
						course: JSON.stringify(course)
					}
				})
			},
			/*关注和粉丝*/
			clickFollow(){
				this.nav=4;
				this.getFollowList(this.form.id);
			},
			unfollow(i,obj){
				this.$ajax({
					url: this.global.serverSrc + '/follow/unFollow',
					method: 'post',
					params: {
						entityType:3,
						entityId:obj.id
					}
				}).then(res => {
					if(res.data.code == 200){
						this.$notify.success("已取消关注")
					}
				})
				this.followNum--;
				this.followList.splice(i,1);
			},
			clickFans(){
				this.nav=5;
				this.getFansList(3,this.form.id);
			},
			clickPerson(id) {
				this.$router.push({
					path: '/person' ,
					query:{
						id,
					}
				})
			},
			getFollowList(userId){
				this.$ajax({
					url: this.global.serverSrc + '/follow/getFollowPeople',
					method: 'post',
					params: {
						userId
					}
				}).then(res => {
					if(res.data.code == 200){
						this.followList = res.data.data;
						this.followNum = this.followList.length;
					}
				})
			},
			getFansList(entityType,entityId){
				this.$ajax({
					url: this.global.serverSrc + '/follow/getFans',
					method: 'post',
					params: {
						entityType,
						entityId
					}
				}).then(res => {
					if(res.data.code == 200){
						this.fansList = res.data.data;
						this.fansNum = this.fansList.length;
					}
				})
			},
			getMajorById(majorId) {
				this.$ajax({
					url: this.global.serverSrc + '/major/getMajorById',
					method: 'post',
					params: {
						majorId
					}
				}).then(res => {
					this.userMajor = res.data.data;
				})
			},
			getDirectsByMajor(majorId) {
				this.$ajax({
					url: this.global.serverSrc + '/direct/getDirects',
					method: 'post',
					params: {
						majorId
					}
				}).then(res => {
					this.directList = res.data.data;

					//删除用户已选的方向
					for (var i = 0; i < this.userDirects.length; i++) {
						for (var j = 0; j < this.directList.length; j++) {
							if (this.userDirects[i].id == this.directList[j].id) {
								this.directList.splice(j, 1);
							}
						}

					}
				})
			},
			getUserDirects(userDirects) {
				this.$ajax({
					url: this.global.serverSrc + "/direct/getUserDirects",
					method: "post",
					params: {
						userDirects,
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.userDirects = res.data.data;
					}

				})
			},
			getUserInfo(id) {
				this.$ajax({
					url: this.global.serverSrc + "/user/getUser",
					method: "get",
					params: {
						id,
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.form = res.data.data;
						//显示页面
						this.show = true;
						//获取用户专业
						this.getMajorById(this.form.userMajor)
						//获取用户选择的专业
						this.getUserDirects(this.form.userDirections);

						if (this.global.user!=null && this.id != this.global.user.id) {
							this.nav = 2;
							this.getSelectCourses(this.form.id);
							
							//获取关注状态
							this.getFollowStatus(3,this.form.id);
						}

					}

				})
			},
			getSelectCourses(userId, page, pageSize) {
				this.$ajax({
					url: this.global.serverSrc + '/selectCourse/getSelectCourses',
					method: 'post',
					params: {
						userId,
						page,
						pageSize
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.selectCourseList = res.data.data.list;
						this.total = res.data.data.total
						this.pageSize = res.data.data.pageSize;
					} else {
						this.$notify.error({
							title: res.data.message,
						});
					}

				})
			},
			handlePageChange(currentPage) {
				this.currentPage = currentPage;
				this.getSelectCourses(this.form.id, this.currentPage);
			},
			getRouterData() {
				this.id = this.$route.query.id;
				if(this.id==null){
					this.$notify.error("无法访问")
					//进入首页
					this.$router.push('/')
				}
			},
			getFollowStatus(){
				this.$ajax({
					url: this.global.serverSrc + '/follow/getFollowStatus',
					method: 'post',
					params: {
						entityType:3,
						entityId:this.form.id
					}
				}).then(res => {
					if(res.data.code == 200){
						this.followed = res.data.data;
					}
				})
			}
		},
		created() {
			this.getRouterData();
			this.getUserInfo(this.id);
		},
		watch: {
			// 利用watch方法检测路由变化：
			'$route': function(to) {
				// 拿到目标参数 to.query.id 去再次请求数据接口
				this.getUserInfo(to.query.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

	.highlight {
		color: darkcyan;
	}

	.person {
		margin: 0;
		padding: 0;
		position: relative;
	}

	.p-header {
		width: 100%;
		height: 25rem;
		position: relative;
		padding-top: 5rem;
		justify-content: center;
		background: #2C3E50;
		/* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #4CA1AF, #2C3E50);
		/* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #4CA1AF, #2C3E50);
		/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
	/*avatarDialig*/
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	/* /avatarDialig*/
	.head-img {
		width: 12.5rem;
		height: 12.5rem;
		position: absolute;
		left: 43%;
		border: 2px solid #FFFFFF;
		border-radius: 50%;

		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	.follow {
		position: absolute;
		left: 60%;
		top: 48%;
	}
	.contact{
		position: absolute;
		left: 66%;
		top: 50%;
	}

	.p-nav {
		width: 80%;
		height: 6.25rem;
		margin: 0 auto;
		margin-bottom: 1.25rem;
		border-bottom-left-radius: 0.625rem;
		border-bottom-right-radius: 0.625rem;
		border: 1px solid #ecf0f1;
		box-shadow: 0px 1px 2px #ecf0f1;
		position: relative;
		display: flex;
		align-items: top;
		justify-content: center;

		a {
			text-decoration: none;
			color: #666;
			font-weight: bold;
			font-size: 18px;
			margin: 0 1.25rem;

			&:hover {
				color: darkcyan;
			}
		}

	}

	.nav-item {

		//border: 1px solid red;
		h3 {
			text-align: center;
		}

		span {
			font-size: 14px;
		}
	}

	.p-nav::before {
		content: '';
		width: 100%;
		height: 5rem;
		background: none;
		border: 1px solid #ecf0f1;
		border-bottom: none;
		border-top-left-radius: 0.625rem;
		border-top-right-radius: 0.625rem;
		position: absolute;
		top: -80px;
		left: -1;
	}

	.p-main {
		width: 80%;
		margin: 0 auto;

	}

	.show-other {
		border: 1px solid red;

		h3 {
			font-family: 'Roboto', sans-serif;
			font-size: 1rem;
			font-weight: 700;
			letter-spacing: 0.2rem;
			color: #333;
			margin-left: 1rem;
		}
	}

	.info {
		width: 60%;
		margin: 1.25rem auto;
	}

	/*关注和粉丝样式*/
	.follow-group {
		width: 80%;
		margin: 1.25rem auto;
	}

	.follow-item {
		padding: 10px;
		border-bottom: 1px solid #ecf0f1;

		.follow-center {
			width: 80%;
			display: inline-flex;
			justify-content: left;
			align-items: center;

			h3 {
				font-family: 'Roboto', sans-serif;
				font-size: 1.2rem;
				font-weight: 700;
				letter-spacing: 0.2rem;
				color: #333;
				margin-left: 1rem;
			}

			&:hover {
				cursor: pointer;

				h3 {
					color: darkred;
				}
			}

		}

		.follow-right {
			display: inline-flex;
			float: right;
		}

	}
</style>
