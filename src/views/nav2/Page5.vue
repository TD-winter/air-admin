<template>
	<section>
		<div>
			<p>批量导入导入阿里三元组</p>
			<input type="file" name="csv" @change="uploadFile($event)" />
		    <button type="submit" @click="saveDevCsv($event)">提交</button>
		</div>
		<div>
			<p>单个生成设备</p>
			<el-form ref="form" :model="form" label-width="80px">
			  <el-form-item label="MAC地址">
			    <el-input v-model="form.mac"></el-input>
			  </el-form-item>
			    <el-form-item>
			    <el-button type="primary" @click="productDev">立即创建</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</section>
</template>

<script>
	import { saveDevCsv } from '../../api/api';
	export default {
		data() {
			return {
				file: [],
				form:{}
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
					if(res.data.code === 0){
						this.$message(res.data.message);
					}
				})
			},
			productDev(mac) {
				
			}
		}
	}
</script>