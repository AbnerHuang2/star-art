<template>
	<div>
		<el-row>
			<el-col :span="12">
				<h2>{{title}}</h2>
			</el-col>
			<el-col v-if="loadMore!=0" :span="2" :offset='10' align='middle' style="padding-top: 1.25rem;">
				<el-tooltip class="item" effect="dark" content="查看更多" placement="bottom">
					<div @click="clickMore(loadMore)">
						<svg style="width: 2.5rem; height: 2.5rem; " t="1585275691552" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3868" width="200" height="200"><path d="M820.8 944H539.2c-86.4 0-155.2-70.4-155.2-155.2v-46.4c0-86.4 70.4-155.2 155.2-155.2h281.6c86.4 0 155.2 70.4 155.2 155.2v46.4c0 84.8-70.4 155.2-155.2 155.2z" fill="#96E8BA" p-id="3869"></path><path d="M304 465.6c-100.8 0-182.4-81.6-182.4-182.4S203.2 102.4 304 102.4s182.4 81.6 182.4 182.4S404.8 465.6 304 465.6z m0-320c-75.2 0-137.6 62.4-137.6 137.6s62.4 137.6 137.6 137.6 137.6-62.4 137.6-137.6-62.4-137.6-137.6-137.6zM768 462.4h-128c-65.6 0-118.4-52.8-118.4-118.4v-128c0-65.6 52.8-118.4 118.4-118.4h128c65.6 0 118.4 52.8 118.4 118.4v128c0 65.6-52.8 118.4-118.4 118.4z m-128-320c-40 0-73.6 33.6-73.6 73.6v128c0 40 33.6 73.6 73.6 73.6h128c40 0 73.6-33.6 73.6-73.6v-128c0-40-33.6-73.6-73.6-73.6h-128zM368 862.4h-128c-65.6 0-118.4-52.8-118.4-118.4v-128c0-65.6 52.8-118.4 118.4-118.4h128c65.6 0 118.4 52.8 118.4 118.4v128c0 65.6-52.8 118.4-118.4 118.4z m-128-320c-40 0-73.6 33.6-73.6 73.6v128c0 40 33.6 73.6 73.6 73.6h128c40 0 73.6-33.6 73.6-73.6v-128c0-40-33.6-73.6-73.6-73.6h-128zM768 862.4h-128c-65.6 0-118.4-52.8-118.4-118.4v-128c0-65.6 52.8-118.4 118.4-118.4h128c65.6 0 118.4 52.8 118.4 118.4v128c0 65.6-52.8 118.4-118.4 118.4z m-128-320c-40 0-73.6 33.6-73.6 73.6v128c0 40 33.6 73.6 73.6 73.6h128c40 0 73.6-33.6 73.6-73.6v-128c0-40-33.6-73.6-73.6-73.6h-128z" fill="#103E26" p-id="3870"></path><path d="M304 368c-46.4 0-83.2-38.4-83.2-83.2s38.4-83.2 83.2-83.2 83.2 38.4 83.2 83.2S350.4 368 304 368z m0-128c-24 0-44.8 19.2-44.8 44.8s19.2 44.8 44.8 44.8 44.8-19.2 44.8-44.8S328 240 304 240z" fill="#103E26" p-id="3871"></path></svg>
					</div>
				</el-tooltip>
			</el-col>
		</el-row>
		<!-- 卡片组 -->
		<el-row type="flex" justify="center" :gutter="20">
			<el-col :span="6" v-for="(obj,index) in courseList" :key="index">
				<el-card :body-style="{ padding: '0' }" style="border: none; box-shadow: none;">
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
		<!-- /卡片组 -->
	</div>
</template>

<script>
	export default {
		props: {
			courseList:{
				type:Array,
			},
			title:{
				type:String,
			},
			loadMore:{
				type:Number,
				default:0,
			}
		},
		data() {
			return {
				
			}
		},
		methods:{
			clickMore(majorId){
				this.$router.push({
					path: '/course' ,
					query:{
						majorId,
					}
				})
			},
			clickCourse(course){
				this.$router.push({
					path: '/courseDetail' ,
					query:{
						courseId:course.id
					}
				})
			},
		},
		created() {
			
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
