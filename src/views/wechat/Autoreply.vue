<template>
    <div>
        <Tabs>
            <TabPane label="被关注回复" icon="social-apple">
        		<Row v-if="subscribeAuto" class="open-base flex-align-center" >
        			<Col span="2" style="display:flex; flex: 1; justify-content:center; ">
        				<Icon type="android-unlock" size="50"></Icon>
					</Col>
        			<Col span="18">
	            		<span style="font-size: 16px">已开启设置</span><br>
	            		<span style="color: #9ea7b4">通过编辑内容，快速进行自动回复设置；每当新用户关注，即回复该消息设置。</span>
        			</Col>
        			<Col span="4" style="display:flex; justify-content:center;">
        				<Button type="error" @click="handleSetAutoReply(false)">停用</Button>
        			</Col>
        		</Row>
        		<Row v-else class="open-base flex-align-center">
        			<Col span="2" style="display:flex; flex: 1; justify-content:center; ">
        				<Icon type="android-lock" size="50"></Icon>
					</Col>
        			<Col span="18">
	            		<span style="font-size: 16px">未开启设置</span><br>
	            		<span style="color: #9ea7b4">通过编辑内容，快速进行自动回复设置；每当新用户关注，即回复该消息设置。</span>
        			</Col>
        			<Col span="4" style="display:flex; justify-content:center;">
        				<Button type="success" @click="handleSetAutoReply(true)">开启</Button>
        			</Col>
        		</Row>

    			<div class="reply-edit">
    				<div class="reply-tab-parent">
						<div class="reply-tab"><a href="javascript:void(0);"><Icon type="edit" size="18"></Icon>&nbsp;文字</a></div>
						<div class="reply-tab"><a href="javascript:void(0);"><Icon type="image" size="18"></Icon>&nbsp;图片</a></div>
						<div class="reply-tab"><a href="javascript:void(0);"><Icon type="ios-mic" size="18"></Icon>&nbsp;语音</a></div>
						<div class="reply-tab"><a href="javascript:void(0);"><Icon type="ios-videocam" size="18"></Icon>&nbsp;视频</a></div>
    				</div>
    				<div contenteditable="" ref="edit" style="border-top: 1px solid #dedede; border-bottom: 1px solid #dedede; flex: 1" focus>
    				</div>
    				<div ref="emojiBtn" @click="toggleEmoji" style="height: 36px; display: flex; align-items: center; margin-left: 10px;">
    					<a href="javascript:void(0)" ><Icon type="happy" size="22"></Icon></a>
    				</div>
			        <vue-emoji
			          v-show="showEmoji"
			          ref="emoji"
			          @select="handleSelect"
			          @hide="handleHide"
			        ></vue-emoji>		
    			</div>

            </TabPane>
            <TabPane label="关键词回复" icon="social-apple">
        		<Row class="open-base flex-align-center">
        			<Col span="2" style="display:flex; flex: 1; justify-content:center; ">
        				<Icon type="android-lock" size="50"></Icon>
					</Col>
        			<Col span="18">
	            		<span style="font-size: 16px">未开启被关注自动回复设置</span><br>
	            		<span style="color: #9ea7b4">通过编辑内容，快速进行自动回复设置；每当新用户关注，即回复该消息设置。</span>	
        			</Col>
        			<Col span="4" style="display:flex; justify-content:center;">
        				<Button type="success">开启</Button>
        			</Col>
        		</Row>            	
            	<div>xxxx</div>
            </TabPane>
            <TabPane label="收到消息回复" icon="social-apple">
        		<Row class="open-base flex-align-center">
        			<Col span="2" style="display:flex; flex: 1; justify-content:center; ">
        				<Icon type="android-lock" size="50"></Icon>
					</Col>
        			<Col span="18">
						<span style="font-size: 16px">未开启被关注自动回复设置</span><br>
	            		<span style="color: #9ea7b4">通过编辑内容，快速进行自动回复设置；每当新用户关注，即回复该消息设置。</span>   				
        			</Col>
        			<Col span="4" style="display:flex; justify-content:center;">
        				<Button type="success">开启</Button>
        			</Col>
        		</Row>            	
            	<div>yyyy</div>
            </TabPane>                          
        </Tabs>
    </div>
</template>

<script>
    import VueEmoji from 'rui-vue-emoji'
    import 'rui-vue-emoji/dist/vue-emoji.css'

    export default {
    	data () {
    		return {
    			subscribeAuto: true,
    			showEmoji: false,
    		}
    	},
    	methods: {
    		handleSetAutoReply (open) {
    			if (open) {
    				setTimeout(() => {
    					this.$Message.success("开启成功")
    					this.subscribeAuto = true
    				}, 500)
    			} else {
    				setTimeout(() => {
    					this.$Message.success("自动回复已关闭")
    					this.subscribeAuto = false
    				}, 500)
    			}
    		},
    		toggleEmoji () {
    			this.showEmoji = !(this.showEmoji)
    		},
            hide () {
              this.showEmoji = false
            },
            handleHide (e) {
              this.hide()
            },
            handleSelect (img) {
              // if (img.nodeType === 3) {
              //   var $img = new Image();
              //   $img.src =  this.$refs.emoji.getImgPathByUnicode(img.textContent);
              //   $app1.appendChild($img);
              // }
              // this.hide();
            },    		
    	},
    	mounted () {
            this.$refs.emoji.appendTo({
              area: this.$refs.edit,
              btn: this.$refs.emojiBtn,
              position: 'top left',
            }).setPath('../static/images/')   		
    	},
    	components: {
    		VueEmoji
    	},
    }
</script>

<style scoped>
	.open-base {
		height: 80px;
		background-color: #EFF3F8;
		border-radius: 3px;
	}
	.flex-align-center {
		display: flex;
		flex: 1;
		align-items: center;
	}
	.reply-edit{
		display: flex; 
		flex-flow: column wrap;
		height: 300px; 
		margin:25px; 
		border: 1px solid #dedede; 		
	}

	a:link {
    	color: #C0C0BE;
	}
	a:hover {
    	color: #363636;
	}

	.reply-tab-parent {
		display: flex;
		/*tab横排*/
		flex-flow: row;
		height: 36px; 
		/*所有tab上下居中*/
		align-items: center;	
	}
	.reply-tab {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100px;
		font-size: 14px;
	}

    [contenteditable] {
      background: #fff;
      padding: 20px;
      text-align: left;
      color: #333;
      line-height: 1.7;
    }
    [contenteditable]:focus .rui-emoji-img{
      vertical-align: text-top;
    }
    [contenteditable]:focus {
      outline: none;
    }	
</style>