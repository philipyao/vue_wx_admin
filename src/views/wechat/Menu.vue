
<template>
    <div>
        <div style="display: flex;">
            <!--手机模块-->
            <div class="menu-setting-area">
                <div class="preview-area">
                    <div class="mobile-menu-preview">
                        <div class="mobile-hd">
                            {{ publicName }}
                        </div>
                        <div class="mobile-bd" style="z-index:3;">
                            <ul class="pre-menu-list" >
                                <li v-for="(btn,index) in menu.button" :key="btn.id"
                                    class="pre-menu-item grid-item size1of3">
                                    <a href="javascript:void(0);" @click="menuSelected(btn.name,index)"
                                       :class="[{'pre-menu-link': index===activeMenuIndex && activeMenuType()==1}]"
                                       draggable="false">
                                        <i class="icon-menu-dot dn"></i>
                                        <i class="icon-common sort-gray"></i>
                                        <span>{{ btn.name }}</span>
                                    </a>
                                    <div class="sub-pre-menu-box" v-if="index===activeMenuIndex">
                                        <ul class="sub-pre-menu-list" style="border: 1px solid #d0d0d0;">
                                            <li v-for="(sub,index) in btn.sub_button" :key="sub.id"
                                                :class="[{current: index===activeMenuItemIndex && activeMenuType()==2}]">
                                                <a href="javascript:void(0);" @click="menuItemSelected(sub.name,index)"
                                                   draggable="false">
                                                    <span class="sub-pre-menu-inner">
                                                        <i class="icon-common sort-gray"></i>
                                                        <span>{{ sub.name }}</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li v-if="isSet(menu.button[activeMenuIndex].sub_button)&&btn.sub_button.length>=0&&btn.sub_button.length < 5">
                                                <a href="javascript:void(0);" title="最多添加5个子菜单" @click="menuItemAdd"
                                                   draggable="false">
                                                    <span class="sub-pre-menu-inner">
                                                        <i class="icon-menu-add"></i>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                        <i class="arrow arrow-out"></i>
                                        <i class="arrow arrow-in"></i>
                                    </div>
                                </li>
                                <li class="pre-menu-item grid-item no-extra size1of1">
                                    <a href="javascript:void(0);"
                                       v-if="showAddMenu"
                                       @click="menuAdd" :class="[{'pre-menu-link': activeMenuIndex===''}]"
                                       title="最多添加3个一级菜单" draggable="false">
                                        <i class="icon-menu-add"></i>
                                        <span>添加菜单</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <!--手机模块END-->
            <!--编辑表单区域-->
            <div class="right-box">
                <div class="editor-inner"
                     v-show="activeMenuIndex > 0 || activeMenuIndex === 0 || activeMenuItemIndex > 0 || activeMenuIndex === 0 ">
                    <div class="menu-title-bar">
                        <h4 class="title">菜单名称</h4>
                        <div class="delete">
                            <a href="javascript:void(0);" @click="menuDel" v-if="showDelBtnType===1">删除菜单</a>
                            <a href="javascript:void(0);" @click="menuItemDel" v-if="showDelBtnType===2">删除子菜单</a>
                        </div>
                    </div>

                    <Form :label-width="60">
                        <FormItem label="菜单名称">
                            <Input v-model="menuName" placeholder="请出入菜单名称" :maxlength="20" style="width: 250px;"></Input>
                        </FormItem>
                        <FormItem label="菜单内容"
                            v-show="((activeMenuIndex > 0 || activeMenuIndex === 0) && (menu.button[activeMenuIndex].sub_button.length == 0)) || (activeMenuItemIndex > 0 || activeMenuItemIndex === 0) ">
                            <RadioGroup v-model="menuContentType">
                                <Radio label="click">发送消息</Radio>
                                <Radio label="view">跳转网页</Radio>
                                <Radio label="custom">自定义事件</Radio>                                
                                <Radio label="miniapp">跳转小程序</Radio>
                            </RadioGroup>
                        </FormItem>                                       
                    </Form>

                    <div class="msg-content-container">
                        <!--发送消息-->
                        <div class="msg-content" v-show="menuContentType=='click'">
                            <div class="content">
                                <!-- 内容选项tab -->
                                <div class="nav-box">
                                    <ul class="tabs">
                                        <li class="item" :class="[{selected:showMenuContentMsgType===1}]"
                                            @click="showMenuContentMsgType = 1">
                                            <i class="tabs-icon news"></i>
                                            图文消息
                                        </li>
                                        <li class="item" :class="[{selected:showMenuContentMsgType===2}]"
                                            @click="showMenuContentMsgType = 2">
                                            <i class="tabs-icon image"></i>
                                            图片
                                        </li>
                                        <li class="item" :class="[{selected:showMenuContentMsgType===3}]"
                                            @click="showMenuContentMsgType = 3">
                                            <i class="tabs-icon audio"></i>
                                            语音
                                        </li>
                                        <li class="item" :class="[{selected:showMenuContentMsgType===4}]"
                                            @click="showMenuContentMsgType = 4">
                                            <i class="tabs-icon video"></i>
                                            视频
                                        </li>
                                    </ul>
                                </div>
                                <!--tabs 具体内容-->
                                <div class="tab-panel">
                                    <!--图文-->
                                    <div class="inner" v-show="showMenuContentMsgType===1">
                                        <div class="content-box">
                                            <div class="item">
                                                <Icon type="android-add" class="icon"></Icon>
                                                <div class="font">从素材库中选择</div>
                                            </div>
                                            <div class="item position-r">
                                                <div class="cover">
                                                    <div class="item">
                                                        <Icon type="compose" class="icon"></Icon>
                                                        <div class="font">自建图文</div>
                                                    </div>
                                                    <div class="item">
                                                        <Icon type="android-share-alt" class="icon"></Icon>
                                                        <div class="font">分享图文</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--图片-->
                                    <div class="inner" v-show="showMenuContentMsgType===2">
                                        <div class="content-box">
                                            <div class="item">
                                                <Icon type="android-add" class="icon"></Icon>
                                                <div class="font">从素材库中选择</div>
                                            </div>
                                            <div class="item">
                                                <Icon type="image" class="icon"></Icon>
                                                <div class="font">上传图片</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--语音-->
                                    <div class="inner" v-show="showMenuContentMsgType===3">
                                        <div class="content-box">
                                            <div class="item">
                                                <Icon type="android-add" class="icon"></Icon>
                                                <div class="font">从素材库中选择</div>
                                            </div>
                                            <div class="item">
                                                <Icon type="android-microphone" class="icon"></Icon>
                                                <div class="font">新建语音</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--视频-->
                                    <div class="inner" v-show="showMenuContentMsgType===4">
                                        <div class="content-box">
                                            <div class="item">
                                                <Icon type="android-add" class="icon"></Icon>
                                                <div class="font">从素材库中选择</div>
                                            </div>
                                            <div class="item">
                                                <Icon type="ios-videocam" class="icon"></Icon>
                                                <div class="font">新建视频</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--跳转网页-->
                        <div class="msg-content" v-show="menuContentType=='view'">
                            <Form :label-width="60" style="padding: 15px;">
                                <FormItem label="页面地址">
                                    <Input v-if="activeMenuType() !== 0" v-model="menuURL" placeholder="请填写链接地址"></Input>
                                </FormItem>
                            </Form>
                        </div>
                        <!--自定义事件-->
                        <div class="msg-content bind-app" v-show="menuContentType=='custom'">
                            <RadioGroup v-model="customizeEvent" @on-change="radioLabelSelected">
                                <Radio label="1">扫码推事件</Radio>
                                <Radio label="2">扫码带提示</Radio>
                                <Radio label="3">系统拍照发图</Radio>
                                <Radio label="4">拍照或者相册发图</Radio>
                                <Radio label="4">微信相册发图器</Radio>
                                <Radio label="4">地理位置选择器</Radio>
                            </RadioGroup>
                        </div>                        
                        <!--跳转小程序-->
                        <div class="msg-content bind-app" v-show="menuContentType=='miniapp'">
                            <p class="desc">自定义菜单可跳转已绑定的小程序，本公众号尚未绑定小程序。</p>
                            <a href="https://mp.weixin.qq.com/cgi-bin/wxopen?action=list&amp;token=515462925&amp;lang=zh_CN"
                               class="btn btn_default">前往绑定</a>
                        </div>
                    </div>
                </div>

                <!-- 没有选中时候的提示 -->
                <div class="editor-inner-notice" v-show="menu.button.length == 0 || activeMenuIndex===''">
                    请点击左侧菜单进行编辑操作
                </div>

            </div>
        </div>
        <Row type="flex" justify="center" align="middle" style="margin-top: 20px;">
            <Button type="success" style="margin-right: 20px;" @click="save">保存</Button>
            <Button type="warning" @click="deleteMenu">清空菜单</Button>
        </Row>

    </div>
</template>

<script>

    export default{
        data(){
            return {
                platform: 0,
                publicName: '黄山行之教育',
                menu: {button: []},
                activeMenuName: '',
                activeMenuIndex: '',
                activeMenuItemName: '',
                activeMenuItemIndex: '',
                showDelBtnType: '', //1:delMenu 2:delMenuItem
                showMenuContentType: 'click',
                showMenuContentMsgType: 1, //1:图文信息 2:图片 3:语音 4:视频
                stringNumberTips: '字数不超过4个汉字或8个字母',
                customizeEvent: '', //自定义事件
            }
        },
        components: {},
        methods: {
            //服务器拉取数据
            getData() {
                this.$formHttp.get('/api/admin/wechat/menu/get').then((response) => {
                    console.log("/api/admin/wechat/menu/get: ", response)
                    if (response.status != 200) {
                      this.$Message.error("失败：%d %s", response.status, response.statusText)
                      console.error("失败：%d %s", response.status, response.statusText)
                      return
                    }
                    console.log("get menu: ", response.data)
                    this.menu = response.data
                }).catch((error) => {
                    this.$Message.error(error)
                    console.log(error)
                })          
            },
            //变量状态检测判断
            isSet(variable) {
                if (typeof(variable) != 'undefined') {
                    return true;
                } else {
                    return false;
                }
            },
            //添加一级菜单
            menuAdd() {
                if (this.menu.button.length < 3) {
                    //显示“删除菜单”
                    this.showDelBtnType = 1;   

                    var defaultMenu = {
                        "type": "click", 
                        "name": "菜单名称", 
                        "key": "", 
                        "url": "", 
                        "sub_button": []
                    }
                    this.menu.button.push(defaultMenu);
                    this.activeMenuIndex = this.menu.button.length - 1;
                    this.activeMenuName = this.menu.button[this.activeMenuIndex].name;
 
                    this.activeMenuItemIndex = '';
                    this.activeMenuItemName = '';             

                    //补全数据,无数据也要为空
                    this.menuDataCompleting();

                    //菜单内容radio默认选中“第1项”
                    this.showMenuContentType = 'click';

                    console.log(this.menu.button);
                } else {
                    alert('最多3个一级菜单');
                }
            },
            //添加二级菜单
            menuItemAdd() {
                if (this.menu.button[this.activeMenuIndex].sub_button.length < 5) {
                    this.menu.button[this.activeMenuIndex].sub_button.push({
                        "type": "click",
                        "name": "子菜单名称",
                        "key": "",
                        "url": "",
                        "sub_button": []
                    });
                    this.activeMenuItemIndex = this.menu.button[this.activeMenuIndex].sub_button.length - 1;
                    this.activeMenuItemName = '子菜单名称';
                    this.showDelBtnType = 2;
                    //补全数据,无数据也要为空
                    this.menuDataCompleting();
                } else {
                    alert('最多5个二级菜单');
                }
            },
            //当前菜单
            menuSelected(name, index) {
                this.showDelBtnType = 1;
                this.activeMenuName = name;
                this.activeMenuIndex = index;
                this.activeMenuItemName = '';
                this.activeMenuItemIndex = '';
                //补全数据,无数据也要为空
                this.menuDataCompleting()
                if (this.menu.button[this.activeMenuIndex].sub_button.length > 0) {
                    this.showMenuContentType = '';
                } else {
                    this.showMenuContentType = this.activeMenuBtnType();
                }
            },
            //当前子菜单选中
            menuItemSelected(name, index) {
                this.showDelBtnType = 2;
                this.activeMenuItemName = name;
                this.activeMenuItemIndex = index;
                //补全数据,无数据也要为空
                this.menuDataCompleting();
                if (this.activeMenuIndex > 0 || this.activeMenuIndex === 0) {
                    if (this.menu.button[this.activeMenuIndex].sub_button.length > 0) {
                        this.showMenuContentType = this.activeMenuBtnType();
                    }
                }
            },
            //菜单删除
            menuDel() {
                if (this.menu.button.length <= 3 && this.menu.button.length > 0) {
                    if ((this.activeMenuIndex !== 0) && (this.activeMenuIndex == this.menu.button.length - 1)) {
                        this.menu.button.splice(this.activeMenuIndex, 1);
                        this.activeMenuIndex -= 1;
                    } else if (this.activeMenuIndex == 0) {
                        this.menu.button.splice(this.activeMenuIndex, 1);
                        this.activeMenuIndex = 0;
                    } else {
                        this.menu.button.splice(this.activeMenuIndex, 1);
                    }
                    if (this.menu.button.length == 0) {
                        this.activeMenuIndex = '';
                        this.activeMenuName = '';
                        this.activeMenuItemIndex = '';
                        this.activeMenuItemName = '';
                    }
                }
            },
            //鹰酱：如果过不去，我们就回不了家了
            //弹幕：可是你们过去了，我们就没有家了
            //删除子菜单
            menuItemDel() {
                if (this.menu.button[this.activeMenuIndex].sub_button.length <= 5 && this.menu.button[this.activeMenuIndex].sub_button.length > 0) {
                    if (this.activeMenuItemIndex == this.menu.button[this.activeMenuIndex].sub_button.length - 1) {
                        this.menu.button[this.activeMenuIndex].sub_button.splice(this.activeMenuItemIndex, 1);
                        this.activeMenuItemIndex -= 1;
                    } else if (this.activeMenuItemIndex == 0) {
                        this.menu.button[this.activeMenuIndex].sub_button.splice(this.activeMenuItemIndex, 1);
                        this.activeMenuItemIndex = 0;
                    } else {
                        this.menu.button[this.activeMenuIndex].sub_button.splice(this.activeMenuItemIndex, 1);
                    }
                    if (this.menu.button[this.activeMenuIndex].sub_button.length == 0) {
                        this.activeMenuIndex = '';
                        this.activeMenuName = '';
                        this.activeMenuItemIndex = '';
                        this.activeMenuItemName = '';
                    }
                    this.showMenuContentType = this.activeMenuBtnType();
                }
            },
            //菜单内容选项
            radioLabelSelected(val) {
                if (val == 1) {
                    this.setType('click');
                } else if (val == 2) {
                    this.setType('view');
                } else if (val == 3) {
                    this.setType('app');
                }
            },
            //设置菜单内容类型
            setType: function (type) {
                if (this.activeMenuType() == 1) {
                    this.menu.button[this.activeMenuIndex].type = type;
                } else if (this.activeMenuType() == 2) {
                    this.menu.button[this.activeMenuIndex].sub_button[this.activeMenuItemIndex].type = type;
                }
            },
            //数据补全方法
            menuDataCompleting() {
                for (var i = 0; i < this.menu.button.length; i++) {
                    if (!('type' in this.menu.button[i])) {
                        this.menu.button[i].type = 'click';
                    }
                    if (!('name' in this.menu.button[i])) {
                        this.menu.button[i].name = '';
                    }
                    if (!('key' in this.menu.button[i])) {
                        this.menu.button[i].key = '';
                    }
                    if (!('url' in this.menu.button[i])) {
                        this.menu.button[i].url = '';
                    }
                    if (!('sub_button' in this.menu.button[i])) {
                        this.menu.button[i].sub_button = [];
                    }
                    if (this.menu.button[i].sub_button.length > 0) {
                        for (var j = 0; j < this.menu.button[i].sub_button.length; j++) {
                            if (!('type' in this.menu.button[i].sub_button[j])) {
                                this.menu.button[i].sub_button[j].type = 'click';
                            }
                            if (!('name' in this.menu.button[i].sub_button[j])) {
                                this.menu.button[i].sub_button[j].name = '';
                            }
                            if (!('key' in this.menu.button[i].sub_button[j])) {
                                this.menu.button[i].sub_button[j].key = '';
                            }
                            if (!('url' in this.menu.button[i].sub_button[j])) {
                                this.menu.button[i].sub_button[j].url = '';
                            }
                            if (!('sub_button' in this.menu.button[i].sub_button[j])) {
                                this.menu.button[i].sub_button[j].sub_button = [];
                            }
                        }
                    }
                }
            },
            //选中菜单属于几级菜单
            activeMenuType() {
                if (this.activeMenuIndex !== '' && this.activeMenuItemIndex !== '') {
                    //子菜单、二级菜单
                    return 2;
                } else if (this.activeMenuIndex !== '' && this.activeMenuItemIndex === '') {
                    //一级菜单
                    return 1;
                } else {
                    return 0;
                }
            },
            //选中菜单类型
            activeMenuBtnType() {
                if (this.activeMenuType() === 1) {
                    //一级菜单
                    return this.menu.button[this.activeMenuIndex].type
                } else if (this.activeMenuType() === 2) {
                    //子菜单、二级菜单
                    return this.menu.button[this.activeMenuIndex].sub_button[this.activeMenuItemIndex].type
                } else {
                    return ''
                }
            },
            //消息内容选项
            msgContentTabNav(val) {
                this.showMenuContentMsgType = val;
            },
            //保存菜单数据
            save() {
                var url = ''
                var data = {}
                if (this.menu.button.length === 0) {
                    url = '/api/admin/wechat/menu/delete'
                    data = {}
                    this.$jsonHttp.post(url, data).then((response) => {
                        console.log(url, response)
                        if (response.status != 200) {
                          this.$Message.error("失败：%d %s", response.status, response.statusText)
                          console.error("失败：%d %s", response.status, response.statusText)
                          return
                        }
                        console.log("保存菜单成功")
                    }).catch((error) => {
                        this.$Message.error(error)
                        console.log(error)                    
                    })                          
                } else {
                    url = '/api/admin/wechat/menu/update'
                    data = this.menu
                    console.log("update menu", data)
                    this.$jsonHttp.post(url, data).then((response) => {
                        console.log(url, response)
                        if (response.status != 200) {
                          this.$Message.error("失败：%d %s", response.status, response.statusText)
                          console.error("失败：%d %s", response.status, response.statusText)
                          return
                        }
                        console.log(response.data)
                        if (response.data.errcode !== 0) {
                            this.$Message.error("失败：", response.data.errcode)
                            return
                        }
                        console.log("保存菜单成功")
                    }).catch((error) => {
                        this.$Message.error(error)
                        console.log(error)                    
                    })                     
                }
                     
            },
            deleteMenu() {
                var url = '/api/admin/wechat/menu/delete'
                this.$jsonHttp.post(url, {}).then((response) => {
                    console.log(url, response)
                    if (response.status != 200) {
                      this.$Message.error("失败：%d %s", response.status, response.statusText)
                      console.error("失败：%d %s", response.status, response.statusText)
                      return
                    }
                    console.log("清空菜单成功")
                }).catch((error) => {
                    this.$Message.error(error)
                    console.log(error)                    
                })                     
            },
            //键盘事件 检测是是否有多输入菜单文字
            inputName(e) {

            },

            getActiveMenuButton() {
                if (this.activeMenuType() == 1) {
                    return this.menu.button[this.activeMenuIndex]
                } else if (this.activeMenuType() == 2) {
                    return this.menu.button[this.activeMenuIndex].sub_button[this.activeMenuItemIndex]
                }
                return null
            }
        },
        computed: {
            // 计算属性的 getter
            showAddMenu: function () {
                if (this.isSet(this.menu.button)) {
                    return (this.menu.button.length>=0&&this.menu.button.length<3)
                }
                return false;
            },
            'menuName': {
                get() {
                    var btn = this.getActiveMenuButton()
                    if (btn != null) {
                        return btn.name
                    } else {
                        return ''
                    }
                },
                set(value) {
                    var btn = this.getActiveMenuButton()
                    if (btn != null) {
                        btn.name = value
                    }
                }
            },
            'menuContentType': {
                get() {
                    var btn = this.getActiveMenuButton()
                    if (btn != null) {
                        return btn.type
                    } else {
                        return ''
                    }
                },
                set(value) {
                    var btn = this.getActiveMenuButton()
                    if (btn != null) {
                        btn.type = value
                    }
                }              
            },
            'menuURL': {
                get() {
                    var btn = this.getActiveMenuButton()
                    if (btn != null) {
                        return btn.url
                    } else {
                        return ''
                    }
                },
                set(value) {
                    var btn = this.getActiveMenuButton()
                    if (btn != null) {
                        btn.url = value
                    }
                }
            }
        },   
        mounted() {
            //服务器上拖取菜单数据
            this.getData()
        },
    }
</script>

<style lang="less" scoped>
.position-r {
    position: relative;
}
//菜单预览区域
.menu-setting-area {
    margin: 0;

    .preview-area {
        float: left;
        margin-right: 12px;
        position: relative;

        .mobile-menu-preview {
            position: relative;
            width: 317px;
            height: 580px;
            background: transparent url(https://res.wx.qq.com/mpres/htmledition/images/bg/bg_mobile_head_default2968da.png) no-repeat 0 0;
            background-position: 0 0;
            border: 1px solid #e7e7eb;

            .mobile-hd {
                color: #fff;
                text-align: center;
                padding-top: 30px;
                font-size: 15px;
                width: auto;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                margin: 0 30px;
            }

            .mobile-bd {
                overflow: hidden;
                .pre-menu-list {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height:50px;
                    border-top: 1px solid #e7e7eb;
                    background: transparent url(https://res.wx.qq.com/mpres/htmledition/images/bg/bg_mobile_foot_default2968da.png) no-repeat 0 0;
                    background-position: 0 0;
                    background-repeat: no-repeat;
                    padding-left: 43px;

                    .icon-menu-add {
                        background: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/style/page/menu/index_z354723.png) 0 -18px no-repeat;
                    }

                    .sort-gray {
                        margin-top: -4px;
                        display: none;
                    }

                    .grid-item {
                        float: left;
                    }

                    .no-extra.grid-item {
                        float: none;
                        width: auto;
                        overflow: hidden;
                    }

                    .pre-menu-item {
                        position: relative;
                        float: left;
                        line-height: 50px;
                        text-align: center;
                        height:50px;

                        a {
                            display: block;
                            width: auto;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            word-wrap: normal;
                            color: #616161;
                            text-decoration: none;
                        }

                        .icon-menu-dot {
                            background: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/style/page/menu/index_z354723.png) 0 -36px no-repeat;
                            width: 7px;
                            height: 7px;
                            vertical-align: middle;
                            display: inline-block;
                            margin-right: 2px;
                            margin-top: -2px;
                        }

                        .pre-menu-link {
                            border: 1px solid #44b549;
                            line-height: 48px;
                            background-color: #fff;
                            color: #44b549;
                        }
                    }
                }
            }
        }

        .sub-pre-menu-box {
            position: absolute;
            bottom: 60px;
            left: 0;
            width: 100%;
            background-color: #fafafa;

            .sub-pre-menu-list li {
                line-height: 44px;
                border: 1px solid transparent;
                margin: 0 -1px -1px;

                a {
                    padding: 0 .5em;

                    .sub-pre-menu-inner {
                        display: block;
                        border-top: 1px solid #e7e7eb;
                        width: auto;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-wrap: normal;
                        cursor: pointer;
                    }
                }
            }
            li:first-child a .sub-pre-menu-inner {
                border-top-width: 0;
            }

            li.current {
                background-color: #fff;
                border: 1px solid #44b549;
                position: relative;
                z-index: 1;
                line-height: 44px;
            }

            //三角形
            .arrow-out {
                bottom: -6px;
                display: inline-block;
                width: 0;
                height: 0;
                border-width: 6px;
                border-style: dashed;
                border-color: transparent;
                border-bottom-width: 0;
                border-top-color: #d0d0d0;
                border-top-style: solid;
            }

            .arrow {
                position: absolute;
                left: 50%;
                margin-left: -6px;
            }

            .arrow-in {
                bottom: -5px;
                display: inline-block;
                width: 0;
                height: 0;
                border-width: 6px;
                border-style: dashed;
                border-color: transparent;
                border-bottom-width: 0;
                border-top-color: #fafafa;
                border-top-style: solid;
            }
        }

        .icon-common.sort-gray {
            background: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/style/base/base_z3560fc.png) 0 -4779px no-repeat;
        }
        .icon-common {
            width: 20px;
            height: 20px;
            vertical-align: middle;
            display: inline-block;
            line-height: 100px;
            overflow: hidden;
        }

        .size1of1 {
            width: 100%;
        }

        .size1of3 {
            width: 33.33%;
        }

        .dn {
            display: none;
        }

        .icon-menu-add {
            background: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/style/page/menu/index_z354723.png) 0 0 no-repeat;
            width: 14px;
            height: 14px;
            vertical-align: middle;
            display: inline-block;
            margin-top: -2px;
        }
    }
}
//右边区域
.right-box {
    flex: 1;
    position: relative;

    .editor-inner-notice {
        min-height: 580px;
        background-color: #f4f5f9;
        border: 1px solid #e7e7eb;
        align-items: center;
        text-align: center;
        display: flex;
        justify-content: center;
        font-size: 14px;
    }

    .editor-inner {
        min-height: 580px;
        //左右离自己border空20px
        padding: 0 20px 5px;
        //灰色底色
        background-color: #f4f5f9;
        border: 1px solid #e7e7eb;

        //头部
        .menu-title-bar {
            //只显示下边框，作分割线，与后面的内容分开
            border-bottom: 1px solid #e7e7eb;

            padding: 9px 0;

            //去掉子块级元素inline-block的间隙
            font-size: 0px;

            //左边一半，默认左对齐
            .title {
                //一行显示
                display: inline-block;
                width: 50%;
                font-size: 14px;
                //字体粗细
                font-weight: 400;
            }

            //右边一半，右对齐
            .delete {
                //一行显示
                display: inline-block;
                width: 50%;
                text-align: right;
                font-size: 14px;
                a {
                    //链接颜色
                    color: #459ae9;
                    //去掉链接文字下划线
                    text-decoration: none;
                }
            }
        }

        //表单(菜单名称text input+菜单内容radio)
        .form-group {
            //与头部分隔点距离
            margin-top: 30px;            
            //与下面的白底编辑器分隔点距离
            margin-bottom: 10px;
        }

        .msg-content-container {

            .msg-content {
                //白底边框
                background-color: #fff;
                border: 1px solid #e7e7eb;

                .content {
                    height: auto;

                    .nav-box {
                        height: 40px; 
                        border-bottom: 1px solid #e7e7eb;
                    }

                    .tab-panel {
                        background-color: #fff;
                        min-height: 216px;

                        .inner {
                            width: 100%;
                            height: 215px;

                            .content-box {
                                padding: 20px;
                                display: flex;
                                flex-direction: row;
                                width: 100%;
                                height: 100%;
                                justify-content: space-around;
                                //上下对齐
                                align-items: center;

                                .item {
                                    //浅色波点边框
                                    border: 2px dotted #dedede;
                                    width: 40%;
                                    height: 130px;

                                    //上下左右居中
                                    display: flex;
                                    //图标和文字上下排列
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                    cursor: pointer;

                                    //大图标
                                    .icon {
                                        font-size: 45px;
                                        color: #c3c3c3;
                                        padding-bottom: 5px;
                                    }

                                    .font {
                                        color: #8d8d8d;
                                    }

                                    .cover {
                                        position: absolute;
                                        width: 100%;
                                        height: 100%;
                                        background: #FFFFFF;
                                        display: flex;
                                        justify-content: space-around;

                                        .item {
                                            border: none;
                                            width: 40%;
                                        }

                                        .item:hover * {
                                            color: #222;
                                        }
                                    }
                                }
                                //移动上去的时候有边框
                                .item:hover {
                                    border: 2px dotted #a9a9a9;
                                }
                            }
                        }
                    }
                }
            }

            .bind-app {
                text-align: center;
                padding: 70px 0;

                .desc {
                    margin-bottom: 10px;
                }

                .btn {
                    background-color: #fff;
                    width: 120px;
                    border: 1px solid #e7e7eb;
                    color: #222;
                    display: inline-block;
                    overflow: visible;
                    height: 38px;
                    line-height: 38px;
                    vertical-align: middle;
                    text-align: center;
                    text-decoration: none;
                    border-radius: 3px;
                    -moz-border-radius: 3px;
                    -webkit-border-radius: 3px;
                    font-size: 14px;
                    cursor: pointer;
                }
            }
        }

    }
}

//tab条容器
.tabs {
    width: 430px; 
    line-height: 38px; 
    height: 38px; 
    text-align: center; 
    font-size: 14px;
    //border: 1px solid green;

    .item {
        //tab item横排
        display: inline-block;
        border: 1px solid green;
        width: 85px;
        cursor: pointer;


        .tabs-icon {
            //图标大小
            width: 20px; height: 20px;
            //包含多个小图片的背景图sprite，通过background-postion来定位背景图上的不同图标
            background: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/style/widget/msg_tab_z25df2d.png);
            background-repeat: no-repeat;

            //图标上下对齐
            vertical-align: middle;
            //啥意思？？？
            display: inline-block;
        }

        .news {
            //意思是背景图左上角放在item的0, -240的位置，20px大小的框内就显示出了需要的背景图
            background-position: 0px -240px;
        }
        .image {
            background-position: 0px -60px;
        }
        .audio {
            background-position: 0 -180px;
        }
        .video {
            background-position: 0 -120px;
        }
    }

    //tab项选中css效果：通过位置定位切换背景图
    .selected {
        .news {
            background-position: 0px -270px;
        }
        .image {
            background-position: 0px -90px;
        }
        .audio {
            background-position: 0 -210px;
        }
        .video {
            background-position: 0 -150px;
        }
        color: #222;
    }

}    
</style>
