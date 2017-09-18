<template>
	<tempalte>
	<div>
		<ul>
			<li v-for="page in pages">
				{{page.name}}<span>：</span>{{page.content}}
			</li>
		</ul>
	</div>
</tempalte>
<script>
  export default {
    name: "Pages1",
    data () {
    return{
    	pages: [
    		{
    		'name': '1',
    		'content': "非常得好"
    		},
    		{
    		'name': '2',
    		'content': "开心每一天"
    		}
    	]
    }
    }
  }
</script>
</template>