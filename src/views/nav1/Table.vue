<template>
  <section>
    <!--列表-->
    <el-table :data="userData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" type="expand">
	   <el-table-column type="expand">
	      <template slot-scope="props">
          <el-form>
            <el-input v-model="inputDevID" placeholder="请输入内容"></el-input>
            <el-button size="small" @click="compelBind(props.row.publicWxOpenId)">绑定设备</el-button>
          </el-form>
	        <el-form label-position="left" inline class="demo-table-expand" v-for="item in props.row.dev">
	          <el-form-item label="设备名称(mac)：">
	            <span>{{ item.devName }}</span>
	          </el-form-item>
	          <el-form-item label="设备ID：">
	            <span>{{ item.devID }}</span>
	          </el-form-item>
	          <el-form-item label="操作：">
	            <el-button size="small" @click="compelUnbind(item.devID, item.devName, props.row.publicWxOpenId)">解绑设备</el-button>
	          </el-form-item>
	        </el-form>
	      </template>
	  </el-table-column>

      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="wxName" label="用户名" width="140">
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="160">
      </el-table-column>
      <el-table-column prop="publicWxOpenId" label="openId" width="280">
      </el-table-column>
      <el-table-column prop="wxUnionid" label="wxUnionid" min-width="180">
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template scope="scope">
          <el-button size="small" @click="openidGetdeviceid(scope.row.publicWxOpenId)">匹配绑定设备</el-button>
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
          <label>设备名：</label>
          <el-input v-model="devName" placeholder="请输入devName"></el-input>
        </div>
        <div style="width:200px;">
          <label>设备ID：</label>
          <el-input v-model="devID" placeholder="请输入devID"></el-input>
        </div>
        <div style="width:200px;">
          <label>openID：</label>
          <el-input v-model="publicWxOpenId" placeholder="请输入openid"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="compelUnbind">确 定</el-button>
        </span>
    </el-dialog>
  </section>
</template>

<script>
  // import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import { getUserList, compelUnbind, compelBind, openidGetdeviceid } from '../../api/api';

  export default {
    data() {
      return {
        userData:[],
        listLoading: true,
        dialogVisible: false,
        devName: '',
        devID: '',
        inputDevID: '',
        publicWxOpenId: '',
        sels: 0,
        total: 1000
      }
    },
    methods: {
      getDev(page) {
        getUserList({page: page}).then((res) => {
          console.log(res);
          if(res.data.code === 200) {
          	if (res.data.resData.length === 0) {
	          	this.$message({
		          message: '暂无数据!',
		          type: 'warning'
		        });
          	}
	          this.userData = res.data.resData;
            this.total = res.data.total;
	          this.listLoading = false;
          } else {
          	this.$message({
	          message: '出了点小问题！',
	          type: 'warning'
	        });
          }
        });
      },
      selsChange() {

      },
      authorizeDevSubmit () {

      },

      dialogShow(index, row) {
        this.publicWxOpenId = row.publicWxOpenId;
        this.dialogVisible = true;
      },
      handleCurrentChange(page) {
        this.getDev(page-1);
      },
      batchRemove() {

      },
      compelUnbind (devID, devName, publicWxOpenId) {
        let params = {
          openid: publicWxOpenId,
          deviceid: devID,
          devName: devName
        };
        this.$confirm('此操作将永久解绑该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          compelUnbind(params).then(res => {
            if (res.data.code === 200) {
              this.$message('解绑成功!');
              window.location.reload();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解绑操作'
          });          
        });
      },
      compelBind (publicWxOpenId){
        let params = {
          openid: publicWxOpenId,
          deviceid: this.inputDevID
        };
        this.$confirm('此操作将绑定该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          compelBind(params).then(res => {
            if (res.data.code === 200) {
              this.$message('解绑成功!');
              window.location.reload();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解绑操作'
          });          
        });
      },
      openidGetdeviceid(publicWxOpenId) {
        console.log(publicWxOpenId)
        let params = {
          openid: publicWxOpenId
        };
        this.$confirm('将匹配用户的设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          openidGetdeviceid(params).then(res => {
            if (res.data.code === 200) {
              this.$message('获取成功!');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      }
    },
    mounted() {
      this.getDev(0);
    }
  }

</script>

<style scoped>

</style>