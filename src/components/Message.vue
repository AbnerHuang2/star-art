<template>
	<div class="msg">
		<el-row>
			<!-- 左边 -->
			<el-col :span="6">
				<div class="left">
					<div style="margin: 0.625rem;">
						<el-input v-model="searchFriend" suffix-icon="el-icon-search"></el-input>
					</div>
					<ul>
						<li>
							<div class="item" v-for="(obj,i) in friendList" :key="i" :unRead="obj.unReadCount>0 ? obj.unReadCount:''" :style="obj.user.id==talkUser.id ? 'background-color:#ecf0f1;':'' "
							@click="clickFriend(i,obj)">
								<el-avatar :size="40" :src="obj.user.userAvatarURL"></el-avatar>
								<span>{{obj.user.userNickName}}</span>
							</div>
						</li>
					</ul>
				</div>
			</el-col>
			<!-- 右边 -->
			<el-col :span="18">
				<div class="right">
					<div style="text-align: center;border-bottom: 1px solid #bdc3c7;padding-bottom: 0.625rem;">
						<span>STAR小伙伴</span>
					</div>
					<div class="content">
						<div class="talk-item" v-for="(obj,i) in conversationList" :key="i">
							<div style="text-align: center;margin-bottom: 0.3125rem;">
								<span style="color: #bdc3c7; font-size: .8rem;">{{obj.msgCreatetime}}</span>
							</div>
							<div :class="obj.fromId!=talkUser.id ? 'talk-item-detail2':'talk-item-detail'">
								<el-avatar v-if="obj.fromId==talkUser.id" :size="40" :src="talkUser.userAvatarURL"></el-avatar>
								<el-avatar v-else :size="40" :src="global.user.userAvatarURL"></el-avatar>
								<div class="talk-item-content">
									{{obj.msgContent}}
								</div>
							</div>
						</div>
					</div>
					<div class="text" v-if="conversationList.length>0">
						<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea">
						</el-input>
						<el-button size="small" type="primary" @click="sendMsg(textarea)">发送</el-button>
					</div>
				</div>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				friendList: [],
				//fromId:0, //正在聊天那个人
				talkUser: null,
				conversationList: [],
				searchFriend: '',
				textarea: '',
				circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
				websock: null,
				reconnectData: null,
				lockReconnect: false, //避免重复连接，因为onerror之后会立即触发 onclose
				timeout: 10000, //10s一次心跳检测
				timeoutObj: null,
				serverTimeoutObj: null,
			}
		},
		created() {
			this.initWebSocket();
		},
		methods: {
			clickFriend(i, obj) {
				this.talkUser = obj.user;
				//清除未读消息
				this.friendList[i].unReadCount = 0;
				//获取聊天记录
				let sendData = {
					"messageType": 2,
					"conversationId": obj.conversationId,
				}
				this.websocketsend(sendData);
			},
			sendMsg(data) {
				if (data == '') {
					this.$notify.warning("信息不能为空");
					return;
				}
				let sendData = {
					"messageType": 4,
					"msgContent": data,
					"fromId": this.global.user.id,
					"toId": this.talkUser.id,
					"msgCreatetime": this.dateFormat("YYYY-mm-dd HH:MM:SS", new Date())
				}
				this.websocketsend(sendData);
				this.textarea = '',
				this.conversationList.push(sendData);
				this.$notify.success("消息发送成功");
			},
			//格式化时间函数
			dateFormat(fmt, date) {
				let ret;
				const opt = {
					"Y+": date.getFullYear().toString(), // 年
					"m+": (date.getMonth() + 1).toString(), // 月
					"d+": date.getDate().toString(), // 日
					"H+": date.getHours().toString(), // 时
					"M+": date.getMinutes().toString(), // 分
					"S+": date.getSeconds().toString() // 秒
					// 有其他格式化字符需求可以继续添加，必须转化成字符串
				};
				for (let k in opt) {
					ret = new RegExp("(" + k + ")").exec(fmt);
					if (ret) {
						fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
					}
				}
				return fmt;
			},
			initWebSocket() {
				console.log('启动中')
				let wsurl = '';
				if (this.global.user != null) {
					wsurl = 'ws://localhost:8010/websocket/' + this.global.user.id;
					this.websock = new WebSocket(wsurl);
					this.websock.onopen = this.websocketonopen; //连接成功
					this.websock.onmessage = this.websocketonmessage; //广播成功
					this.websock.onerror = this.websocketonerror; //连接断开，失败
					this.websock.onclose = this.websocketclose; //连接关闭
				}
			}, //初始化weosocket
			websocketonopen() {
				console.log('连接成功')
				//this.heatBeat();
			}, //连接成功
			websocketonerror() {
				console.log('连接失败')
				//this.reconnect();
			}, //连接失败
			websocketclose() {
				console.log('断开连接');
				//this.reconnect();
			}, //各种问题导致的 连接关闭
			websocketonmessage(data) {
				//this.heatBeat(); //收到消息会刷新心跳检测，如果一直收到消息，就推迟心跳发送
				let msgData = JSON.parse(data.data);
				if (msgData.messageType == 2) { //会话的聊天记录
					console.log(msgData)
					this.conversationList = msgData.msgList.list;
					this.conversationList.reverse();
				}
				if (msgData.messageType == 3) { //获取好友列表
					this.friendList = msgData.resList;
					if (msgData.resList.length > 0) {
						this.talkUser = msgData.resList[0].user;
						//获取某个会话的聊天记录
						let sendData = {
							"messageType": 2,
							"conversationId": msgData.resList[0].conversationId,
						}
						this.websocketsend(sendData);
					}

				} else if (msgData.messageType == 4) { //接收别的好友发送过来的信息
					this.$notify.success("收到一条新的消息");
					console.log(msgData)
					if (msgData.fromId == this.talkUser.id) {
						this.conversationList.push(msgData)
					}
				}
			}, //数据接收
			websocketsend(data) {
				this.websock.send(JSON.stringify(data));
			}, //数据发送
			reconnect() {
				if (this.lockReconnect) { //这里很关键，因为连接失败之后之后会相继触发 连接关闭，不然会连接上两个 WebSocket
					return
				}
				this.lockReconnect = true;
				this.reconnectData && clearTimeout(this.reconnectData);
				this.reconnectData = setTimeout(() => {
					this.initWebSocket();
					this.lockReconnect = false;
				}, 5000)
			}, //socket重连
			heatBeat() {
				if(this.textarea==''){
					this.timeoutObj && clearTimeout(this.timeoutObj);
					this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
					this.timeoutObj = setTimeout(() => {
						// this.websocketsend({
						// 	type: '心跳检测'
						// }) //根据后台要求发送
						this.serverTimeoutObj = setTimeout(() => {
							this.websock.close(); //如果  5秒之后我们没有收到 后台返回的心跳检测数据 断开socket，断开后会启动重连机制
						}, 5000);
					}, this.timeout)
				}
				
			}, //心跳检测
		},
		destroyed() {
			this.lockReconnect = true;
			this.websock.close() //离开路由之后断开websocket连接
			clearTimeout(this.reconnectData); //离开清除 timeout
			clearTimeout(this.timeoutObj); //离开清除 timeout
			clearTimeout(this.serverTimeoutObj); //离开清除 timeout
		}
	}
</script>

<style lang="scss" scoped>
	@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

	* {
		margin: 0;
		padding: 0;
	}

	.msg {
		width: 80%;
		margin: 0 auto;
		border: 1px solid #bdc3c7;
	}

	span {
		font-family: 'Roboto', sans-serif;
		font-size: 1rem;
		font-weight: 700;
		color: #333;
	}

	.left {
		padding: 10px;
		height: 38.75rem;
		overflow: auto;
		border-right: 1px solid #bdc3c7;

		ul {

			li {
				list-style: none;
			}
		}
	}

	.item {
		position: relative;
		display: flex;
		justify-content: left;
		align-items: center;
		cursor: pointer;
		padding: 5px;
		border-bottom: 1px solid #bdc3c7;

		span {
			margin-left: 1rem;

		}

		&::before {
			content: attr(unRead);
			position: absolute;
			top: -2px;
			text-align: center;
			//border: 1px solid #bdc3c7;
			//border-radius: 50%;
			color: red;
		}

		&:hover {
			span {
				color: darkred;
			}
		}
	}

	.right {
		padding: 0.625rem 0;
		height: 38.75rem;

	}

	.content {
		height: 72%;
		overflow: auto;
		border-bottom: 1px solid #bdc3c7;

		font-family: 'Roboto', sans-serif;
		font-size: .85rem;
		letter-spacing: 0.2rem;
		color: #333;

	}

	.talk-item {
		padding: 0.625rem;
	}

	.talk-item-detail {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;

	}

	.talk-item-detail2 {
		display: flex;
		justify-content: flex-start;
		flex-direction: row-reverse;
		align-items: flex-start;
	}

	.talk-item-content {
		position: relative;
		max-width: 80%;
		margin: 0 1.25rem;
		padding: 0.625rem;
		border-radius: 0.3125rem;
		color: #2d3436;
		border: 1px solid #ecf0f1;
	}

	.text {
		padding: 10px;

		.el-button {
			margin-top: 0.3125rem;
			float: right;
		}
	}
</style>
