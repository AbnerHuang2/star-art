<template>
	<div>
		<d-player ref="player" :options="options"></d-player>
	</div>
</template>

<script type="text/ecmascript-6">
	import dPlayer from 'vue-dplayer'
	import 'vue-dplayer/dist/vue-dplayer.css'
	
	export default {
		name: 'in-video',
		components: {
			dPlayer
		},
		props: {
			source: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				player: null,
				options: {
					logo: this.global.serverSrc+'/file/getImage?name=star.png',
					video: {
						url: this.source,
						type: 'auto',
					},
					danmaku: {
						id: 'demo',
						api: 'https://api.prprpr.me/dplayer/',
					},
					contextmenu: [{}],

				}
			}
		},
		mounted() {
			this.player = this.$refs.player.dp;
		},
		created() {
			//this._setVideoUrl(this.source);
		},
		methods: {
			// 设置视频播放路径
			_setVideoUrl(url) {
				this.player.switchVideo({
					url: url
				});
			}
		},

	}
</script>

<style scoped="scoped">
	.player{
		width: 600px;
		height: 400px;
	}
</style>

