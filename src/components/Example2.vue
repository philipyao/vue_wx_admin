<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }

    [contenteditable] {
      min-height: 200px;
      background: #fff;
      padding: 20px;
      border: 1px solid #233;
      box-shadow: 0 0 3px yellowgreen;
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
<template>
    <div>
        <div contenteditable="" ref = 'edit' focus></div>
        <button ref = 'btn' @click = 'showEmoji = !showEmoji'>emoji</button>
        <vue-emoji
          v-show = 'showEmoji'
          ref = 'emoji'
          :captions = 'captions'
          @select = 'handleSelect'
          @hide = 'handleHide' 
        ></vue-emoji>
    </div>
    <!-- <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto">
                    <div class="layout-logo-left"></div>
                    <MenuItem name="1">
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">选项 1</span>
                    </MenuItem>
                    <MenuItem name="2">
                        <Icon type="ios-keypad" :size="iconSize"></Icon>
                        <span class="layout-text">选项 2</span>
                    </MenuItem>
                    <MenuItem name="3">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">选项 3</span>
                    </MenuItem>
                </Menu>
            </Col>
            <Col :span="sr">
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">首页</BreadcrumbItem>
                        <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                        <BreadcrumbItem>某应用</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <Poptip placement="bottom" transfer="false" width="300">
                            <Button type="warning">click 激活</Button>
                            <div slot="content">
                                <Form :model="formAddTag" label-position="top">
                                    <FormItem label="标签名称">
                                        <Input v-model="formAddTag.tagname"></Input>
                                    </FormItem>
                                    <FormItem>
                                        <Button type="success">确定</Button>
                                        <Button type="ghost" style="margin-left: 8px">取消</Button>
                                    </FormItem>                                        
                                </Form>
                            </div>
                        </Poptip>   
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </Col>
        </Row>
    </div> -->
</template>
<script>
    import VueEmoji from 'rui-vue-emoji'
    import 'rui-vue-emoji/dist/vue-emoji.css'

    export default {
        data () {
            return {
                spanLeft: 5,
                formAddTag: {
                    tagname: "",
                },
                showEmoji: false,
                captions: ['表情'],
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            },
            sr () {
                return 24 - this.spanLeft;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                } else {
                    this.spanLeft = 5;
                }
            },
            hide () {
              this.showEmoji = false;
            },
            handleHide (e) {
              this.hide();
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
        components: {
            VueEmoji
        },
          mounted () {
            this.$refs.emoji.appendTo({
              area: this.$refs.edit,
              btn: this.$refs.btn,
              position: 'top left'
            }).setPath('../static/images/');
          },
    }
</script>