<template>
	<div>
		<div class="article-editor">
			<div class="artcle-title">
				<el-input v-model="title" size="large " placeholder="请输入标题(最多50字)"></el-input>
			</div>
			<tinymce-editor v-model="tinymceHtml" :height="600" :disabled="false" ref="editor"></tinymce-editor>
			<el-col style="margin: 1.25rem 0;">
				<el-input type="textarea" :rows="2" placeholder="请输入摘要(最多50个字)" v-model="intro">
				</el-input>
			</el-col>
		</div>
		<div class="option">
			<el-button type="success" @click="dialogPreview = true">预览</el-button>

			<el-dialog title="预览" :visible.sync="dialogPreview">
				<div>
					<h2>{{title}}</h2>
				</div>
				<div v-html="tinymceHtml"></div>
				<div style="margin: 1.25rem; text-align: center;">
					<el-button type="primary" @click="pubArticle">发布</el-button>
				</div>
			</el-dialog>
			<el-button type="primary" @click="pubArticle">发布</el-button>
		</div>
	</div>
</template>

<script>
	import TinymceEditor from "../views/tinymce-editor.vue"
	export default {
		components: {
			TinymceEditor,
		},
		data() {
			return {
				title: "",
				tinymceHtml: '',
				intro:'',
				dialogPreview:false,
				circleUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
			}
		},
		methods:{
			pubArticle(){
				if(this.title==''||this.tinymceHtml==''||this.intro==''){
					this.$notify.warning('标题或内容或摘要不能为空哦');
					return;
				}
				const formData = new FormData();
				formData.append("newsTitle",this.title);
				formData.append("newsContent",this.tinymceHtml);
				formData.append("newsIntro",this.intro);
				let config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					}
				};
				this.$ajax.post(this.global.serverSrc+'/news/addNews',formData,config)
				.then(res =>{
					console.log(res)
					if(res.data.code==200){
						this.$notify.success(res.data.message);
						
						//进入信息列表
						this.$router.push({
							path: '/community' ,
							// query:{
							// 	course:JSON.stringify(obj)
							// }
						})
					}
				})
				
			},
		},
		created() {
			
		},
	}
</script>

<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.article-editor {}

	.artcle-title {
		width: 80%;
		margin: 20px auto;

		.el-input {
			font-size: 20px;
			font-weight: bolder;

		}

	}

	.option {
		width: 40%;
		margin: 20px auto;
		margin-bottom: 1.875rem;
		display: flex;
		justify-content: space-between;
	}
</style>
