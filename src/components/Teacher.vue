<template>
	<div>
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
						<a href="#">查看主页</a>
					</div>
				</div>
			</div>
		</div>
		<div style="text-align: center;margin: 1.875rem; 0">
			<el-pagination background layout="prev, pager, next" :page-size="pageSize" 
			:total="total" :current-page="currentPage" @current-change="handlePageChange" hide-on-single-page>
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				teacherList:[],
				total: 100,
				pageSize:10,
				currentPage:1,
			}
		},
		methods:{
			getTeachers(page,pageSize){
				this.$ajax({
					url: this.global.serverSrc + "/teacher/getTeachers",
					method: "get",
					params: {
						page,
						pageSize
					}
				}).then(res => {
					if(res.data.code==200){
						this.teacherList = res.data.data.list;
					}
				})
			}
		},
		created() {
			this.getTeachers(1,6);
		}
	}
</script>

<style>
</style>
