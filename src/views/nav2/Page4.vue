<template>
  <section>
    <!--列表-->
    <el-table :data="devData" highlight-current-row height="500" v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column width="60">
        <template scope="scope">
          {{scope.$index + 1 + (currentPage - 1) * 20}}
        </template>
      </el-table-column>
      <el-table-column prop="devName" label="设备名称(mac)" width="140">
      </el-table-column>
      <el-table-column prop="key" label="key" width="120">
      </el-table-column>
      <el-table-column prop="secret" label="secret" width="160">
      </el-table-column>
      <el-table-column prop="devID" label="设备ID" width="180">
      </el-table-column>
      <el-table-column prop="qrticket" label="设备二维码" min-width="180">
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template scope="scope">
          <el-button size="small" @click="dialogShow(scope.$index, scope.row)">授权</el-button>
          <el-button size="small" @click="showQRCode(scope.$index, scope.row)">二维码</el-button>
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

    <div style="position:absolute;top:30%;left:50%;z-index:100;" v-show="codeDialog" @click="codeDialog = false">
      <div class="qrcode" ref="qrcodeContainer"></div>
    </div>
    

  </section>
</template>

<script>
  // import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import { getDevList, singleAuthorizeDevice, deleteDev } from '../../api/api';
  import QRCode from 'qrcodejs2';
  export default {
    data() {
      return {
        devData:[],
        listLoading: true,
        dialogVisible: false,
        codeDialog: false,
        productID: '',
        mac: '',
        sels: 0,
        total: 1000,
        currentPage: 1,
        qrcode: null
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
          this.devData = res.data.data;
          this.total = res.data.total;
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
        this.currentPage = page;
        this.getDev(page-1);
      },
      batchRemove() {

      },
      compelUnbind (index, row) {
        let params = {
          openid: row.publicWxOpenId,
          deviceid: row.devID,
          devName: row.devName
        };
        compelUnbind(params).then(res => {

        })
      },
      deleteData(index, row) {
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDev({_id: row._id}).then((res) => {
            if(res.data.code  === 0){
              this.$message('删除成功!');
            } else {
              this.$message('已经删除!');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      showQRCode (index, row) {
        if(row.qrticket){
          this.codeDialog = true;
          this.qrcode.clear();
          this.qrcode.makeCode(row.qrticket);
        }
      }
    },
    mounted() {
      this.getDev(0);
      this.qrcode = new QRCode(this.$refs.qrcodeContainer, {  
            text: 'http://we.qq.com/d/AQAzI8Hnw-KzVYP1AgKMWzBT4r_9fB3ZNuCclZ3U',  
            width: 150,  
            height: 150,
            colorDark: '#000000',  
            colorLight: '#ffffff',  
            correctLevel: QRCode.CorrectLevel.H  
      });
    }
  }

</script>

<style scoped>

</style>