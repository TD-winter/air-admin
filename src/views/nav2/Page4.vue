<template>
  <section>
    <!--列表-->
    <el-table :data="devData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="devName" label="设备名称" width="100">
      </el-table-column>
      <el-table-column prop="key" label="key" width="120">
      </el-table-column>
      <el-table-column prop="secret" label="secret" width="160">
      </el-table-column>
      <el-table-column prop="devID" label="设备ID" width="180">
      </el-table-column>
      <el-table-column prop="mac" label="mac地址" min-width="100">
      </el-table-column>
      <el-table-column prop="qrticket" label="设备二维码" min-width="180">
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template scope="scope">
          <el-button size="small" @click="dialogShow(scope.$index, scope.row)">授权</el-button>
          <el-button type="danger" size="small" @click="deleteData(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <el-dialog title="授权" :visible.sync="dialogVisible">
        <div style="width:200px;">
          <label>product_id：</label>
          <el-input v-model="productID" placeholder="请输入product_id"></el-input>
        </div>
        <div style="width:200px;">
          <label>mac：</label>
          <el-input v-model="mac" placeholder="请输入mac"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="authorizeDevSubmit">确 定</el-button>
        </span>
    </el-dialog>
  </section>
</template>

<script>
  // import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import { getDevList, singleAuthorizeDevice, deleteDev } from '../../api/api';

  export default {
    data() {
      return {
        devData:[],
        listLoading: true,
        dialogVisible: false,
        productID: '',
        mac: '',
        sels: 0,
        total: 1000
      }
    },
    methods: {
      getDev(page) {
        getDevList({page: page}).then((res) => {
          console.log(res);
          if(res.data.length === 0){
            this.$message({
              message: '无数据',
              type: 'warning'
            });
          }
          this.devData = res.data;
          this.listLoading = false;
        });
      },
      selsChange() {

      },
      authorizeDev() {
        this.dialogVisible = true;
      },
      authorizeDevSubmit() {
        let params = {
          product_id: this.productID,
          mac: this.mac
        };
        singleAuthorizeDevice(params).then(res => {
          if(res.data.resp[0].errcode === 0){
            this.$message('授权成功！');
          } else {
            this.$message({
              showClose: true,
              message: res.data.resp[0].errmsg,
              type: 'error'
            });
          }
          this.dialogVisible = false;
        })
      },
      dialogShow(index, row) {
        this.mac = row.devName;
        this.dialogVisible = true;
      },
      handleCurrentChange(page) {
        this.getDev(page-1);
      },
      batchRemove() {

      },
      deleteData(index, row) {
        deleteDev({_id: row._id}).then((res) => {
          if(res.data.code  === 0){
            this.$message('删除成功!');
          } else {
            this.$message('已经删除!');
          }
        })
      }
    },
    mounted() {
      this.getDev(0);
    }
  }

</script>

<style scoped>

</style>