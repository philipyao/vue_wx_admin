<template>
    <div> 代理商列表 </div>
</template>

<script>
    export default {
    	data () {
    		return {}
    	},
    	methods: {
    		requestData() {
				this.$http.post('/api/agent/list', {cond: ""}).then((response) => {
                    console.log("/api/agent/list response: ", response)
                    if (response.status != 200) {
                      this.$Message.error("拉取数据失败：%d %s", response.status, response.statusText)
                      return
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                    console.log(error)
                })    			
    		}
    	}
    }
</script>
