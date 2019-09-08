<template>
	<section>
		<div>
			<p>导入阿里三元组</p>
			<input type="file" name="csv" @change="uploadFile($event)" />
		    <button type="submit" @click="saveDevCsv($event)">提交</button>
		</div>
	</section>
</template>

<script>
	import { saveDevCsv } from '../../api/api';
	export default {
		data() {
			return {
				file: []
			}
		},
		methods: {
			uploadFile(event) {
				console.log(event.target.files[0]);
				this.file = event.target.files[0];
			},
			saveDevCsv(event) {
				event.preventDefault();
				let params = new FormData();
				params.append('csv',this.file);
				saveDevCsv(params).then((res) => {
					console.log(res);
				})
			}
		}
	}
</script>