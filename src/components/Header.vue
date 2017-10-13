<template>
	<div class="header">
		<div class="header_left">
			<h2>头部左边 {{ hello }}</h2>
		</div>
		<div class="header_right">
			<h2>头部右边 {{ boy }}</h2>
		</div>		
	</div>
</template>

<script>
	export default {
        data () {
            return {
                hello: 'HELLO',
                boy: 'BOY'
		    }
	    }
    }
</script>

<style scoped>
    .header {
        position: relative;
        height: 25px;
        /*height-inline: 25px;*/
        width: 100%;
        background-color: white;
        border-bottom: 1px solid #eeeeee;
    }

    .header_left {
    	float: left;
    	width: 200px;
    }

    .header_right {
    	float: right;
    	width: 300px;
    }    
</style>