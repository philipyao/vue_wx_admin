<template>
    <div> 
        <Form :model="formAddMaterial" >
            <FormItem label="素材名称">
                <Input v-model="formAddMaterial.title"></Input>
            </FormItem>
            <FormItem>
                <Upload
                    type="drag"
                    :before-upload="beforeUpload"
                    :format="['wav','amr','mp3', 'wma']"
                    :max-size="2048"
                    action="//10.1.164.45:8080/api/admin/upload">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                    </div>
                </Upload>                
            </FormItem>
            <FormItem>
                <Button type="success" @click="handleCreateMaterial">确定</Button>
                <Button type="ghost" style="margin-left: 8px">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
    	data () {
    		return {
                formAddMaterial: {
                    mtype: "",
                    mname: "",
                    title: "",
                },
            }
    	},
    	methods: {
            beforeUpload(file) {
                this.formAddMaterial.mname = file.name
                console.log(file.type)
                if (file.type === "audio/wav" || "audio/mp3") {
                    this.formAddMaterial.mtype = "voice"
                }
                console.log(this.formAddMaterial.mname, this.formAddMaterial.mtype)
            },
            handleCreateMaterial() {
                if (this.formAddMaterial.mtype === "") {
                    this.$Message.error("不支持的素材")
                    return
                }
                this.$formHttp.post('/api/admin/wechat/material/create', {mtype: this.formAddMaterial.mtype, mname: this.formAddMaterial.mname}).then((response) => {
                    console.log("/api/admin/wechat/material/create: ", response)
                    if (response.status != 200) {
                      this.$Message.error("失败：%d %s", response.status, response.statusText)
                      console.error("失败：%d %s", response.status, response.statusText)
                      return
                    }
                    console.log("media_id: ", response.data.media_id)
                    this.$Message.success('创建素材成功')
                }).catch((error) => {
                    this.$Message.error(error)
                    console.log(error)
                })  
            }
    	}
    }
</script>
