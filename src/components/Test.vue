<template>
	<div class="infinite-list-wrapper" style="overflow:auto">
		<ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
			<li v-for="i in count" class="list-item">{{ i }}</li>
		</ul>
		<p v-if="loading">加载中...</p>
		<p v-if="noMore">没有更多了</p>
	</div>

	

</template>

<script>
	export default {
		data() {
			return {
				count: 10,
				loading: false
			}
		},
		computed: {
			noMore() {
				return this.count >= 20
			},
			disabled() {
				return this.loading || this.noMore;

			}
		},
		methods: {
			load() {
				this.loading = true
				setTimeout(() => {
					this.count += 2
					this.loading = false
				}, 2000)



			}

			//addElementDiv("parent");

		}
	}
	}
</script>

<style>
	.infinity-box {
		height: 200px;
	}

	.nui-scroll {
		margin-left: 100px;
		border: 1px solid #000;
		width: 200px;
		height: 100px;
		overflow: auto;
	}

	.nui-scroll::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	/*正常情况下滑块的样式*/

	.nui-scroll::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, .05);
		border-radius: 10px;
		-webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1);
	}

	/*鼠标悬浮在该类指向的控件上时滑块的样式*/

	.nui-scroll:hover::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, .2);
		border-radius: 10px;
		-webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1);
	}

	/*鼠标悬浮在滑块上时滑块的样式*/

	.nui-scroll::-webkit-scrollbar-thumb:hover {
		background-color: rgba(0, 0, 0, .4);
		-webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1);
	}

	/*正常时候的主干部分*/

	.nui-scroll::-webkit-scrollbar-track {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
		background-color: white;
	}

	/*鼠标悬浮在滚动条上的主干部分*/

	.nui-scroll::-webkit-scrollbar-track:hover {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .4);
		background-color: rgba(0, 0, 0, .01);
	}
</style>
