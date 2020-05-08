<template>
	<div>
		<div class="article-editor">
			<div class="artcle-title">
				<el-input v-model="title" size="large " placeholder="请输入标题(最多50字)"></el-input>
			</div>
			<tinymce-editor v-model="tinymceHtml" :height="600" :disabled="false" ref="editor"></tinymce-editor>
		</div>
		<div class="option">
			<el-button type="success" @click="dialogPreview = true">预览</el-button>

			<el-dialog title="预览" :visible.sync="dialogPreview">
				<div>
					<h2>{{title}}</h2>
				</div>
				<div v-html="tinymceHtml"></div>
				<div style="margin: 1.25rem; text-align: center;">
					<el-button v-if="tinymceHtml!='' " type="primary">发布</el-button>
				</div>
			</el-dialog>
			<el-button type="primary">保存</el-button>
			<el-button type="primary">发布</el-button>
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
				tinymceHtml: 'Welcome to Use Tinymce Editor',
				dialogPreview:false,
				circleUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
			}
		}
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
