<template>
	<div>
		<div style="width: 80%; margin: 20px auto;">
			<comment :entityType="1" :entityId="newsId" :pageSize="6" :pubButton="true"></comment>
		</div>
		<div style="width: 80%; margin: 20px auto;">
			<NewsArticle></NewsArticle>
		</div>
	</div>
</template>

<script>
	import comment from "../views/comment-dialog.vue"
	import NewsArticle from "./NewsArticle.vue"
	export default {
		name: 'Test',
		components: {
			comment,
			NewsArticle,
		},
		data() {
			return {
				newsId: 2,
				pageSize: 6,
			}
		},
		
	}
</script>

<style>

</style>
