<template>
  <section>


    <!--列表-->
    <el-table :data="devData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" sortable>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="100"  sortable>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="100" sortable>
      </el-table-column>
      <el-table-column prop="birth" label="注册时间" width="120" sortable>
      </el-table-column>
      <el-table-column prop="addr" label="地址" min-width="180" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="">编辑</el-button>
          <el-button type="danger" size="small" @click="">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import { getDevList } from '../../api/api';

  export default {
    data() {
      return {
        devData:[]

      }
    },
    methods: {
      getDev(page) {
        getDevList({page: page}).then((res) => {
          console.log(res);
        })
      },
      listLoading(){

      },
      selsChange(){

      }
    },
    mounted() {
      this.getDev(0);
    }
  }

</script>

<style scoped>

</style>