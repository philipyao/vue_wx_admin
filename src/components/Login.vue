<template>
  <div class="hello">
    <div>欢迎登陆后台管理平台</div>
    <Form ref="formLogin" :model="formLogin" :rules="ruleValidate" class="form">
        <Form-item prop="account">
            <Input type="text" v-model="formLogin.account" placeholder="帐号"
                   @on-enter="handleSubmit('formLogin')">
            <Icon type="person" slot="prepend" class="icon"></Icon>
            </Input>
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="formLogin.password" placeholder="请填写密码"
                   @on-enter="handleSubmit('formLogin')">
            <Icon type="locked" slot="prepend" class="icon"></Icon>
            </Input>
        </Form-item>
        <Form-item prop="code">
            <Input type="text" v-model="formLogin.code" placeholder="请填写验证码"
                   @on-enter="handleSubmit('formLogin')"></Input>
            <img :src="verifyUrl" @click="refreshVerify()" class="code-img" title="点击切换验证码">
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formLogin')">登录</Button>
        </Form-item>
    </Form>
  </div>
</template>

<script>
  import { routeFromMenu } from '../router'

  export default {
    name: 'login',
    data(){
        return {
            formLogin: {
                account: '',
                password: '',
                code: ''
            },
            ruleValidate: {
                account: [
                    {required: true, message: '请填写帐号', trigger: 'blur'},
                    {type: 'string', min: 3, message: '帐号长度不能低于3位', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请填写密码', trigger: 'blur'},
                    {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                ],
                code: [
                    {required: true, message: '验证码不能为空', trigger: 'blur'},
                    {type: 'string', message: '验证码只能英文数字', trigger: 'blur', pattern: /^[a-z0-9A-Z]+$/}
                ]
            },
            verifyUrl: '',
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$formHttp.post('/api/admin/login', this.formLogin).then((response) => {
                        console.log(response)
                        if (response.status != 200) {
                          this.$Message.error("登录失败：%d %s", response.status, response.statusText)
                          return
                        }
                        this.$Message.success('登录成功')
                        window.localStorage.setItem('menuInfo', JSON.stringify(response.data.data.menu))
                        let menuRoutes = routeFromMenu(response.data.data.menu)
                        menuRoutes.push({
                          path: '*',
                          name: 'notfound',
                          component: resolve => require(['@/components/NotFound'], resolve)
                        })
                        console.log("add menu route ", menuRoutes)
                        this.$router.addRoutes(menuRoutes)
                        //返回主页
                        this.$router.push('/example')
                    }).catch((error) => {
                        this.$Message.error(error)
                        console.log(error)
                    })
                } else {
                    this.$Message.error('表单验证失败!')
                }
            })
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>
