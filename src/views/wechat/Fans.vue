<template>
    <div> 
        <Tabs>
            <TabPane label="已关注" icon="social-apple">
                <div style="border: 1px solid #dedede; ">
                    <Row>
                        <Col span="20" style="padding: 10px; border: 1px solid #dedede; height:600px">
                            <Row class="mb-15">
                                <Col style="1px solid #dedede; background-color: #dedede; ">
                                     <h3>&nbsp;&nbsp;&nbsp;{{selectTag}}</h3>
                                </Col>
                            </Row>
                            <Row class="mb-15">
                                <Poptip placement="right" :transfer="false" width="300">
                                    <Button :disabled="selects.length == 0" type="primary">打标签</Button>
                                    <div slot="content">
                                        <Form :model="formBatchSetTag" label-position="top">
                                            <FormItem label="选择标签">
                                                <CheckboxGroup v-model="formBatchSetTag.selectTags">
                                                    <Checkbox v-for="tag in tags" :label="tag.name" :key="tag.id"></Checkbox>
                                                </CheckboxGroup>
                                            </FormItem>
                                            <FormItem>
                                                <Button type="success"  @click="doBatchSetTag()">确定</Button>
                                                <Button type="ghost" style="margin-left: 8px">取消</Button>
                                            </FormItem>                                        
                                        </Form>
                                    </div>
                                </Poptip>                                 
                                
                                <Button :disabled="selects.length == 0" type="primary" @click="setBlack">拉入黑名单</Button>  
                            </Row>
                            <Table :columns="tblColumns" :data="tblData" @on-selection-change="onSelectChange" stripe></Table>
                            <div style="margin: 30px 10px;overflow: hidden">
                                <div style="float: right;">
                                    <Page :total="100" :current="1" @on-change="changePage"></Page>
                                </div>
                            </div>
                        </Col>
                        <Col span="4" style="border: 1px solid #dedede; ">
                            <Button type="success" @click="handleListTag">刷新标签</Button>
                            <Menu active-name="全部" width="100" @on-select="onSelectTag">
                                <MenuItem name="全部">
                                    全部({{fansTotal}})
                                </MenuItem>
                                <MenuItem :name="tag.name" v-for="(tag, index) in tags" :key="index">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{tag.name}}({{tag.count}})
                                </MenuItem>
                                <!-- <div style="line-height: 40px;"> -->
<!--                                     <Poptip title="提示标题" content="提示内容">
                                        <span><a href="javascript:;">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新增标签
                                        </a></span>                                    
                                    </Poptip> -->
                                <!-- </div> -->
                            </Menu>
                            <Poptip placement="right" :transfer="false" width="300">
                                <span><a href="javascript:;">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新增标签
                                </a></span> 
                                <div slot="content">
                                    <Form :model="formAddTag" label-position="top">
                                        <FormItem label="标签名称">
                                            <Input v-model="formAddTag.tagname"></Input>
                                        </FormItem>
                                        <FormItem>
                                            <Button type="success"  @click="handleAddTag" >确定</Button>
                                            <Button type="ghost" style="margin-left: 8px">取消</Button>
                                        </FormItem>                                        
                                    </Form>
                                </div>
                            </Poptip>                              
                        </Col>
                    </Row>              
                </div>
            </TabPane>
            <TabPane label="黑名单" icon="social-windows">
                黑名单
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    export default {
    	data () {
    		return {
                tblData: [],
                fansTotal: 0,
                fansCurCount: 0,
                fansNextOpenid: '',
                tblColumns: [
                    {
                        type: 'selection',
                        width: 58,
                    },       
                    {
                        title: '头像',
                        width: 60,
                        render: (h, params) => {
                            let url = params.row.headimgurl
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: url.substring(0, url.length-1) + '46',
                                        title: params.row.nickname
                                    },
                                    style:  {
                                        width: "38px",
                                        height: "38px"
                                    }
                                })                                
                            ])
                        }
                    },
                    {
                        title: '昵称',
                        width: 120,
                        align: 'left',
                        render: (h, params) => {
                            let divs = []
                            let names = []
                            if (params.row.remark === '') {
                                names.push(h('span', params.row.nickname))
                            } else {
                                names.push(h('span', params.row.remark + '(' + params.row.nickname + ')'))
                            }
                            divs.push(h('div', names))

                            let tagnames = []
                            if (params.row.tagid_list.length === 0) {
                                tagnames.push(h('Tag', '无标签'))
                            } else {
                                for (var tagid of params.row.tagid_list) {
                                    for (var tag of this.tags) {
                                        if (tagid === tag.id) {
                                            tagnames.push(h('Tag', tag.name))
                                        }
                                    }
                                }
                            }
                            divs.push(tagnames)
                            return h('div', divs)
                        }
                    },
                    {
                        title: '性别',
                        width: 60,
                        render: (h, params) => {
                            if (params.row.sex == 1) {
                                return h('span', '男')
                            } else if (params.row.sex == 2) {
                                return h('span', '女')
                            } else {
                                return h('span', '未知')
                            }
                        }
                    },
                    {
                        title: '省市',
                        render: (h, params) => {
                            return h('span', params.row.province + '-' + params.row.city)
                        }
                    },
                    {
                        title: '关注时间',
                        key: 'subscribe_time'
                    },
                    {
                        title: '备注名',
                        key: 'remark'
                    },                    
                    {
                        title: '操作',
                        align: 'center',
                        width: 200,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },                                    
                                    on: {
                                        click: () => {
                                            this.$Message.info("发消息")
                                        }
                                    }
                                }, '消息'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },                                    
                                    on: {
                                        click: () => {
                                            this.$Message.info("拉黑")
                                        }
                                    }                                    
                                }, '拉黑')
                            ])
                        }
                    }
                ],
                selects: [],
                selectOpenids: [],
                tags: [],
                selectTag: '全部',
                formAddTag: {
                    tagname: '',
                },
                formBatchSetTag: {
                    selectTags: [],
                }
            }
    	},
        computed: {
            total_count: function() {
                let count = 0
                for (let tag of this.tags) {
                    count += tag.count
                }
                return count
            },
        },
    	methods: {
    		listFans(tagid) {
				this.$formHttp.post('/api/admin/wechat/fans/list', {tagid: tagid}).then((response) => {
                    console.log("/api/admin/wechat/fans/list: ", response)
                    if (response.status != 200) {
                      this.$Message.error("拉取数据失败：%d %s", response.status, response.statusText)
                      console.error("拉取数据失败：%d %s", response.status, response.statusText)
                      return
                    }
                    console.log("data: ", response.data)
                    if (response.data.errcode != 0) {
                        this.$Message.error("拉取数据出错：%d", response.data.errcode)
                        return
                    }
                    this.fansTotal = response.data.total
                    this.fansCurCount = response.data.count
                    this.fansNextOpenid = response.data.next_openid
                    this.tblData = response.data.fans
                }).catch((error) => {
                    this.$Message.error(error)
                    console.log(error)
                })    			
    		},
            onSelectChange(selection) {
                console.log("onSelectChange ", selection)
                this.selects = []
                this.selectOpenids = []                
                if(typeof(selection) == 'object' && selection.length > 0) {
                    //循环处理数据
                    for (var value of selection) {
                        this.selects.push(value.id)
                        this.selectOpenids.push(value.openid)
                    }
                    console.log(this.selects)
                    console.log(this.selectOpenids)
                }
            },            
            setTag() {

            },
            setBlack() {

            },
            changePage() {
                this.$Message.info("换页")
            },
            onSelectTag(name) {
                this.selectTag = name
                //发起http请求刷新页面
            },
            handleListTag(cb) {
                this.$formHttp.post('/api/admin/wechat/tag/list').then((response) => {
                    console.log("/api/admin/wechat/tag/list: ", response)
                    if (response.status != 200) {
                      this.$Message.error("失败：%d %s", response.status, response.statusText)
                      console.error("失败：%d %s", response.status, response.statusText)
                      return
                    }
                    console.log("data: ", response.data)
                    this.tags = response.data.tags
                    if (cb) {
                        cb()                        
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                    console.log(error)
                })                      
            }, 
            handleAddTag() {
                this.$formHttp.post('/api/admin/wechat/tag/add', {name: this.formAddTag.tagname}).then((response) => {
                    console.log("/api/admin/wechat/tag/add: ", response)
                    if (response.status != 200) {
                      this.$Message.error("失败：%d %s", response.status, response.statusText)
                      console.error("失败：%d %s", response.status, response.statusText)
                      return
                    }
                    response.data.errcode = response.data.errcode || 0
                    if (response.data.errcode !== 0) {
                        this.$Message.error("错误码：", response.data.errcode)
                        console.log("错误码：", response.data.errcode)
                        return
                    }
                    console.log("add tag: ", response.data.tag)
                    this.tags.push(response.data.tag)
                    this.$Message.success('添加成功')
                }).catch((error) => {
                    this.$Message.error(error)
                    console.log(error)
                })                      
            },

            doBatchSetTag() {
                if (this.selectOpenids.length === 0) {
                    this.$Message.error("请先选择一个用户")
                    return
                }
                if (this.formBatchSetTag.selectTags.length === 0) {
                    this.$Message.error("选择一个标签吧")
                    return                    
                }

                let tagids = []
                for (var tname of this.formBatchSetTag.selectTags) {
                    for (var tag of this.tags) {
                        if (tname === tag.name) {
                            tagids.push(tag.id)
                            break
                        }
                    }
                }
                console.log(this.selectOpenids)
                console.log(tagids)                
                this.$jsonHttp.post('/api/admin/wechat/tag/batch_set', {tagids: tagids, openid_list: this.selectOpenids}).then((response) => {
                    console.log("/api/admin/wechat/tag/batch_set: ", response)
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
                    console.log("设置标签成功: ")
                    for (var openid of this.selectOpenids) {
                        for (var fans of this.tblData) {
                            if (fans.openid === openid) {
                                console.log("set fans tagids: ", fans.nickname, tagids)
                                fans.tagid_list = tagids
                                break
                            }
                        }
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                    console.log(error)                    
                })       
            }
    	},
        mounted() {
            var vm = this
            vm.handleListTag(function(){
                vm.listFans(0)
            })
        }
    }
</script>

<style scoped>
    .mb-15 {
        margin-bottom: 15px;
    }
</style>
