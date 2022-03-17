<template>
  <div class="indexThird-container">
    <el-row>
      <el-col :span="20">
        <el-row class="statusBox">
          <el-col :span="10">
            <lable>状态</lable>
            <span
              @click="checkStatus"
              class="checkActive"
              v-for="item in statusList"
              :key="item.key"
              >{{ item.name }} <i class="el-icon-check"></i
            ></span>
          </el-col>
          <el-col :span="14">
            <lable>等级</lable>
            <span>应急</span>
            <span>告警</span>
            <span>故障</span>
            <span>预警</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-input
          placeholder="请输入关键词搜索"
          v-model="searchKey"
          class="searchBox"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>

          <span slot="suffix" class="searcBtn">| <span>搜索</span></span>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="padding: 30px 0" class="tableBox">
        <el-table
          header-align="center"
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column align="center" label="序号" width="150">
            <template slot-scope="scope">
              <span class="colorc">00{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="等级" width="150">
            <template slot-scope="scope">
              <span class="colorR colorC">应急</span>
              <!-- <span class="colorY colorC">告警</span> -->
              <!-- <span class="colorY1 colorC">预警</span> -->
              <!-- <span class="colorR1 colorC">故障</span> -->
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date" label="时间" width="180">
            <template slot-scope="scope">
              <span class="colorc">2021-12-45 15:44:01</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="检测设备"
            width="150"
          >
          </el-table-column>
          <el-table-column align="center" prop="name" label="位置" width="150">
          </el-table-column>
          <el-table-column align="center" prop="name" label="类型" width="150">
          </el-table-column>
          <el-table-column align="center" prop="name" label="状态" width="150">
            <template slot-scope="scope">
              <span class="colorr">未处理</span>
              <!-- <span class="colorg">已完成</span> -->
              <!-- <span class="colorb">处理中</span>  -->
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="详情" width="180">
            <template slot-scope="scope">
              <el-popover
                placement="left"
                width="400"
                trigger="click"
                popper-class="popoverBox"
              >
                <div class="popoverBoxInner">
                  <div class="el-dialog__header">
                    <span class="el-dialog__title"> 事件详情 </span>
                  </div>
                  <div class="el-dialog__body">
                    <el-form
                      ref="form"
                      :model="formDetail"
                      label-position="left"
                      label-width="100px"
                    >
                      <el-form-item label="事件名称">
                        动环水浸告警
                      </el-form-item>
                      <el-form-item label="事件编号">
                        动环水浸告警
                      </el-form-item>
                      <el-form-item label="事件描述">
                        动环水浸告警
                      </el-form-item>
                      <el-form-item label="事件类型">
                        动环水浸告警
                      </el-form-item>
                      <el-form-item label="关联设备">
                        动环水浸告警
                      </el-form-item>
                      <el-form-item label="事件发生位置">
                        动环水浸告警
                      </el-form-item>
                      <el-form-item label="设备ID"> 动环水浸告警 </el-form-item>
                      <el-form-item label="事件发生时间">
                        动环水浸告警
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="el-dialog__footer">
                      
                  </div>
                </div>
                <span slot="reference" class="detailBtn">
                  <img src="@/assets/index/Icon_xiangqing.png" alt="" />
                  <span>详情</span>
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            header-align="left"
            align="left"
            prop="address"
            label="描述"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
        <div class="paginationBox">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "indexThird",
  data() {
    return {
      formDetail: {},
      statusList: [
        { name: "处理中", key: 1 },
        { name: "待处理", key: 2 },
        { name: "已完成", key: 3 },
      ],
      currentPage: 1,
      searchKey: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return "success-row";
      } else {
        return "";
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    checkStatus() {},
  },
};
</script> 
<style lang="scss" scoped>
.indexThird-container {
  box-sizing: border-box;
  padding: 24px;

  .statusBox {
    font-size: 16px;
    color: rgba(206, 206, 206, 1);
    label {
      color: rgba(206, 206, 206, 1);
    }
    span {
      cursor: pointer;
      color: #abbdff;
      width: 160px;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: rgba(91, 126, 255, 0.2);
      vertical-align: middle;
      margin: 0px 10px;
      border-radius: 4px;
      font-size: 16px;
      position: relative;
      overflow: hidden;
    }
    .el-icon-check {
      position: absolute;
      display: inline-block;
      top: -20px;
      right: -20px;
      background: rgba(91, 126, 255, 1);
      height: 42px;
      width: 42px;
      border-radius: 50%;
    }
    .el-icon-check:before {
      position: absolute;
      bottom: 5px;
      left: 5px;
    }
    .checkActive {
      background: rgba(91, 126, 255, 0.55);
      color: #fff;
    }
  }
}
</style>
