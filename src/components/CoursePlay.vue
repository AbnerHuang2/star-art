<template>
	<div style="margin: 1.25rem;">
		<el-row :gutter="20">
			<el-col :span="18">
				<videoPlay ref="player" :source="source"></videoPlay>
				
				<!-- flash视频播放 -->
				<!-- <div id="video" class="video" style="height: 30rem;">
					<div id="cc_video_2A4F0AFFFEDC1EDC9C33DC5901307461_1611921" style="width: 100%; height: 100%;">
						<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
						codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="100%"
						height="100%" id="cc_2A4F0AFFFEDC1EDC9C33DC5901307461">
							<param name="movie" value="https://p.bokecc.com/flash/player.swf?vid=2A4F0AFFFEDC1EDC9C33DC5901307461&amp;siteid=[object%20HTMLInputElement]&amp;playerid=undefined&amp;playertype=1&amp;autoStart=true&amp;mediatype=1">
							<param value="transparent" name="wmode">
							<param name="allowFullScreen" value="true">
							<param name="allowScriptAccess" value="always">
							<embed id="embedId" src="https://p.bokecc.com/flash/player.swf?vid=A5AE58E5C6C8CCB69C33DC5901307461&amp;siteid=[object%20HTMLInputElement]&amp;playerid=undefined&amp;playertype=1&amp;autoStart=true&amp;mediatype=1"
							width="100%" height="100%" name="cc_2A4F0AFFFEDC1EDC9C33DC5901307461" wmode="transparent" allowfullscreen="true"
							allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash">
						</object>
					</div>
				</div> -->
				<!-- flash视频播放 -->
			</el-col>
			<el-col :span="6">
				<div class="chapter">
					<ul>
						<li v-for="(obj,i) in chapterList" :key="i" @click="changeSource(i,obj.chapterUrl)">
							<div v-if="i==index" style="color: darkred;">
								<i class="el-icon-video-pause"></i>
								<span>{{obj.chapterTitle}}</span>
							</div>
							<div v-else>
								<i class="el-icon-video-play"></i>
								<span>{{obj.chapterTitle}}</span>
							</div>
						</li>
					</ul>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import videoPlay from "../views/player.vue"
	export default {
		components: {
			videoPlay
		},
		data() {
			return {
				index:0,
				chapterList:[],
				source: 'http://stream4.iqilu.com/ksd/video/2020/02/17/87d03387a05a0e8aa87370fb4c903133.mp4',
			}
		},
		methods: {
			changeSource(index,source) {
				//先更换index
				this.index = index;
				this.$refs.player._setVideoUrl(source)
			},
			getRouterData() {
				this.index = this.$route.query.index
				this.chapterList = JSON.parse(this.$route.query.chapterList)
				//更换视频地址
				this.source = this.chapterList[this.index].chapterUrl;
			},

		},
		created() {
			this.getRouterData();
		}
	}
</script>

<style scoped lang="scss">
	/*目录*/
	.chapter {
		padding: 0;
		margin: 0;

		ul {
			padding: 0;
			margin: 0;
			max-height: 31.25rem;
			overflow: auto;
		}

		ul li {
			list-style-type: none;
			padding: 0.625rem;
			padding-left: 1.25rem;
			border-bottom: 1px solid #f5f6fa;
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
</style>