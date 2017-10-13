<template>
    <div class="layout">
        <div class="header box-shadow">
            <h1 class="logo"><a href="/"></a></h1>
            <div class="header-right">
                <a href="#">注册登录</a>
                <a href="#">注册登录2</a>
                <a href="#">注册登录3</a>
                <a href="#">登出</a>
            </div>
        </div>
        <div class="content">
            <div class="content-bg">
                <div class="content-main">
                    <div class="content-box">
                        <div class="mymenu">
                            <!-- 菜单头 -->
                            <dir class="menu-head">
                                管理中心
                            </dir>
                            <!-- 菜单体 -->
                            <div class="menu-body">
                                <Menu  width="auto" theme="light" style="overflow:hidden">
                                    <Submenu :name="index" v-for="(item, index) in routes" :key="item.id">
                                        <template slot="title">
                                            <Icon :type="item.icon"></Icon>
                                            {{item.name}}
                                        </template>
                                        <Menu-item :name="index*1000+key" v-for="(child, key) in item.children" :key="child.id">
                                            <router-link :to="item.path + '/' + child.path">{{child.name}}</router-link>
                                        </Menu-item>
                                    </Submenu>
                                </Menu>                             
                            </div>
                        </div>
                        <div class="content-body">
                                <div>
                                    <!-- 面包屑头 -->
                                    <div class="breadcrumb">
                                        <Breadcrumb>
                                            <Breadcrumb-item href="#">管理中心</Breadcrumb-item>
                                            <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                                            <BreadcrumbItem>某应用</BreadcrumbItem>
                                        </Breadcrumb>
                                    </div>
                                    <div v-if="$route.path === '/example'">根目录主体内容</div>
                                    <!-- 链接内容显示, 点击菜单链接的内容渲染在此处 -->
                                  <transition name="fade" mode="out-in">
                                    <keep-alive><router-view class="view"></router-view></keep-alive>
                                  </transition>
                                </div>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                routes: []         
            }
        },
        mounted() {
            //通过这种方式来处理路由
            const menu = window.localStorage.getItem('menuInfo')
            this.routes = menu ? typeof (JSON.parse(menu) == "object") ? JSON.parse(menu) : [] : []
        }        
    }
</script>

<style scoped>
    /* 清除浏览器默认样式 */
    * {
        padding: 0;
        margin: 0;
    }

    .box-shadow {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .06);
    }

    .header {
        position: fixed;
        top:0;
        right: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color: #1c2438;
        z-index: 99;
    }
    .header .logo {
        float: left;
        width: 480px;
        padding: 0;
        margin-left: 20px; 
    }
    .header .logo a {
        display: block;  /*将a转化为块级元素，从而可以设置高度*/
        height: 60px;
        background: url(./logo.png) no-repeat left center; 
    }
    .header-right {
        padding-right: 15px;
        float: right;
        color: #9ba7b5;
    }

    /* 加背景图全部铺满，z-index的原因被header盖住 */
    .content {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* 背景图没有的地方用背景图一样的背景色 #fof1f1 ; 背景图水平居中 */
        background: #f0f1f1 url(./bg-body.jpg) no-repeat center 80px;
    }
    .content-bg {
        /*相对于content进行绝对定位*/        
        position: absolute;
        top: 60px;
        right: 0;
        bottom: 0;
        left: 0;
        overflow-y: scroll; /*显示y轴滚动条*/
        overflow-x: hidden; /*隐藏x轴滚动条*/
    }

    /* 中间空白背景内容主体 */
    .content-main {
        display: flex;
        flex-direction: column;  /* 元素从上到下 */
        flex: 1;    /* 宽度占满 */
        margin: 0 auto; /* 水平居中 */
        width: 1500px;   /*固定宽度 */
        min-height: 100%;
        background: #FFFFFF;
        border: 1px solid #dedede;
    }

    /* 包含主体的box */
    .content-box {
        display: flex;
        flex-direction: row;    /* 元素从左到右: 左菜单，右内容; */
        flex: 1;
        margin: 20px 15px 20px;
        height: auto;
        /*border: 1px solid blue;        */
    }

    .mymenu {
        width: 240px;
        height: auto;
        /*border-radius: 3px;*/
        /*border: 1px solid red;*/
    }
    .menu-head {
        height: 70px;
        line-height: 70px;
        padding-left: 70px;
        font-size: 16px;
        color: white;
        background-color: #1c2438;
        border: 1px solid #dedede;
        border-radius: 3px 3px 0 0;
    }
    .menu-body {
        border: 1px solid #dedede;
        border-radius: 0 0 3px 3px;        
    }
    .menu-body  .ivu-menu-item {
        padding: 0;
    }
    .menu-body  .ivu-menu-item a {
        /* 整成块级元素，定义尺寸 */
        display: block;        
        padding: 14px 24px 14px 67px;

        color: #657180;
    }

    .content-body {
        flex: 1;    /* 剩余宽度全部占满 */
        margin-left: 15px;
        /*border: 1px solid green;*/
    }

    .breadcrumb {
        padding-left: 20px;
        height: 70px;
        display: flex;
        align-items: center;
        line-height: 70px;
    }
</style>
