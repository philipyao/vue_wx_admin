<template>
    <div>
        <div style="height: 60px; padding: 10px 30px 20px 0; display:flex; justify-content:flex-end;">
            <Button type="success" @click="showCreateMaterial">
                新增素材
            </Button>
        </div>
        <Table :columns="tblColumns" :data="tblData" stripe></Table>   
        <div style="margin: 30px 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalCount" :current="1"></Page>
            </div>
        </div>
        <Modal
            v-model="modalAudio"
            title="试听音频">
            <audio :src="audioSrc" preload="auto" controls>
                <p>你的浏览器不支持audio标签</p>
            </audio>
        </Modal>   

        <Modal v-model="modalCreate">
            <Form  :model="formCreateMaterial">
                <FormItem label="素材名称">
                    <Input v-model="formCreateMaterial.name"></Input>
                </FormItem>
                <FormItem>
                    <Upload
                        ref="uploadCtl"
                        type="select"
                        name="file"
                        :before-upload="beforeUpload"
                        :format="['wav','amr','mp3', 'wma']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        action="//10.1.164.45:8080/api/admin/upload">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或将文件拖拽到这里上传</p>
                        </div>
                    </Upload>                
                </FormItem>                                     
            </Form> 
            <div slot="footer">
                <Button size="large" @click="modalCreate = false">取消</Button>
                <Button type="success" size="large" @click="handleCreateMaterial">确定</Button>
            </div>            
        </Modal>  
                
    </div>
</template>

<script>
    export default {
    	data () {
    		return {
                modalCreate: false,
                modalAudio: false,
                audioSrc: "",
                totalCount: 0,
                tblData: [],
                formCreateMaterial: {
                    name: "",
                    mtype: "",
                },
                tblColumns: [
                    {
                        type: 'selection',
                        width: 58,
                    },       
                    {
                        title: '素材名称',
                        key: 'name',
                    },
                    {
                        title: '更新时间',
                        key: 'update_time'
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
                                            this.handleGetMaterial(params.row.media_id)
                                        }
                                    }
                                }, '查看'),
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
                                            this.$Message.info("删除")
                                        }
                                    }                                    
                                }, '删除')
                            ])
                        }
                    }
                ],

            }
    	},
    	methods: {
            handleListMaterial() {
                this.$formHttp.post('/api/admin/wechat/material/list', {mtype: "voice"}).then((response) => {
                    console.log("/api/admin/wechat/material/list: ", response)
                    if (response.status != 200) {
                      this.$Message.error("失败：%d %s", response.status, response.statusText)
                      console.error("失败：%d %s", response.status, response.statusText)
                      return
                    }
                    if (response.data.errcode != 0) {
                      this.$Message.error("错误码：", response.data.errcode)
                      return
                    }
                    if (Array.isArray(response.data.materials)) {
                        this.tblData = response.data.materials
                        this.totalCount = this.tblData.length                 
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                    console.log(error)
                })                  
            },
            handleGetMaterial(media_id) {
                console.log("get material ", media_id)
                this.$formHttp.post('/api/admin/wechat/material/get', {media_id: media_id}).then((response) => {
                    console.log("/api/admin/wechat/material/get: ", response)
                    if (response.status != 200) {
                      this.$Message.error("失败：", response.status, response.statusText)
                      console.error("失败：", response.status, response.statusText)
                      return
                    }
                    if (response.data.errcode != 0) {
                      this.$Message.error("错误码：", response.data.errcode)
                      return
                    }
                    this.audioSrc = "http://10.1.164.45:8080/api/download/" + response.data.url
                    this.modalAudio = true
                }).catch((error) => {
                    this.$Message.error(error)
                    console.log(error)
                })                
            },
            showCreateMaterial() {
                this.modalCreate = true
                this.$refs.uploadCtl.clearFiles()
            },
            beforeUpload(file) {
                this.$refs.uploadCtl.clearFiles()
                this.formCreateMaterial.mname = file.name
                console.log(file.type)
                if (file.type === "audio/wav" || "audio/mp3") {
                    this.formCreateMaterial.mtype = "voice"
                }
                console.log(this.formCreateMaterial.mname, this.formCreateMaterial.mtype)
            },     
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件< ' + file.name + ' >格式不正确，请上传 [mp3|wma|wav|amr] 格式的音频。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件< ' + file.name + ' >太大，不能超过 2M。'
                });
            },  
            handleCreateMaterial() {
                if (this.formCreateMaterial.mtype === "") {
                    this.$Message.error("不支持的素材")
                    return
                }
                this.$formHttp.post('/api/admin/wechat/material/create', {mtype: this.formCreateMaterial.mtype, mname: this.formCreateMaterial.mname}).then((response) => {
                    console.log("/api/admin/wechat/material/create: ", response)
                    if (response.status != 200) {
                      this.$Message.error("失败：%d %s", response.status, response.statusText)
                      console.error("失败：%d %s", response.status, response.statusText)
                      return
                    }
                    console.log("media_id: ", response.data.media_id)
                    this.$Message.success('创建素材成功')
                    this.tblData.push({media_id: response.data.media_id, name: this.formCreateMaterial.mname, update_time: 0})
                }).catch((error) => {
                    this.$Message.error(error)
                    console.log(error)
                })
                this.formCreateMaterial.mtype = ""
                this.formCreateMaterial.mname = ""     
                this.modalCreate = false          
            }
    	},
        mounted() {
            this.handleListMaterial()
        }        
    }
</script>
