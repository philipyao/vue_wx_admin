<template>
    <div>
        <Header></Header>

        <div class="body">
            <h1>主要内容</h1>
<!--             <Sidebar></Sidebar>
            <Content></Content> -->
        </div>

        <div style="float: left">
        </div>
        <Row>
            <Col span="8">
                <Menu :theme="curtheme" >
                    <Submenu v-for="(sm, index) in menus" :key="sm.id" :name="index">
                        <template slot="title">
                            <Icon :type="sm.icon"></Icon>
                            {{ sm.text }}
                        </template>
                        <MenuItem v-for="(item, idx) in sm.items" :name="index * 100 + idx" :key="index-idx">{{ item }}</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
        </Row>
        <Row>
            <br>
            <Col span="8">
            <p>切换主题</p>
            <RadioGroup v-model="curtheme">
                <Radio label="light"></Radio>
                <Radio label="dark"></Radio>
            </RadioGroup>
            </Col>
        </Row>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import Sidebar from '@/components/Sidebar'
    import Content from '@/components/Content'

    export default {
        name: 'main',
        components: {
          Header
        },
        data () {
            return {
                curtheme: 'dark',
                menus: [
                    {
                        id: 1,
                        icon: 'ios-paper',
                        text: '内容管理',
                        items: ['文章管理', '评论管理', '举报管理']
                    },
                    {
                        id: 2,
                        icon: 'ios-people',
                        text: '用户管理',
                        items: ['新增用户', '活跃用户']
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .body {
      /*position:relative;*/
      margin: 0 auto;

      background-color: white;
      width: 1200px;
      height: 400px;
      border: 1px solid #eeeeee;        
    }
</style>

