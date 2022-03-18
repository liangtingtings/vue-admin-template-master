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
                trigger="click"
                :ref="`popover-${scope.row.id}`"
                popper-class="popoverBox"
              >
                <div class="popoverBoxInner" v-if="showdetailBox">
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
                      <div class="lineSpan"></div>
                      <el-form-item label="事件状态" class="statusForm">
                        <img src="@/assets/index/Icon_daichuli.png" alt="" />
                        <span>待处理</span>
                        <span class="colorc">2022-03-16 09:34:53</span>
                      </el-form-item>
                      <div style="margin-bottom: 20px">
                        <el-progress
                          :stroke-width="10"
                          :percentage="0"
                          :show-text="false"
                        ></el-progress>
                        <!-- <el-progress :percentage="50" :stroke-width="10" class="customColors" :color="customColors" :show-text="false"></el-progress> -->
                        <!-- <el-progress :percentage="100" :stroke-width="10" class="customsuccessColors" :color="customsuccessColors" :show-text="false"></el-progress> -->
                      </div>
                      <div class="lineSpan"></div>
                      <el-form-item label="原因分析" class="statusForm">
                      </el-form-item>
                      <p class="formP">
                        1、电流超过标定阈值<br />
                        2、负载过大，可能存在大功率用电设备电流超过 标定阈值
                      </p>
                      <el-form-item label="操作建议" class="statusForm">
                      </el-form-item>
                      <p class="formP">1、负载过大，可能存在大功率用电设备</p>
                    </el-form>
                  </div>
                  <div class="el-dialog__footer">
                    <span class="addBtn" @click="addBtn(scope.row.id)">
                      创建工单
                    </span>
                    <span class="addBtn closeBtn"> 忽略该事件 </span>
                  </div>
                </div>
                <div class="popoverBoxInner showAddBox" v-if="showAddBox">
                  <div class="el-dialog__header">
                    <span class="el-dialog__title"> 创建工单 </span>
                  </div>
                  <div class="el-dialog__body">
                    <el-form
                      ref="form"
                      :model="formDetail"
                      label-position="left"
                      label-width="100px"
                    >
                      <el-row>
                        <el-col
                          :span="12"
                          style="width: 380px; padding: 10px 11px 0px 20px"
                        >
                          <el-form-item label="工单类型">
                            <el-input
                              v-model="formDetail.name"
                              disabled
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="作业地点">
                            <el-input
                              v-model="formDetail.name"
                              disabled
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="*签发时间" required>
                            <el-date-picker
                              v-model="formDetail.date"
                              type="datetime"
                              placeholder="选择日期时间"
                            >
                            </el-date-picker>
                          </el-form-item>
                          <el-form-item label="*计划耗时" required>
                            <el-input v-model="formDetail.name"></el-input>
                          </el-form-item>
                          <el-form-item label="完成时间">
                            <el-input
                              v-model="formDetail.name"
                              disabled
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="关联设备">
                            <el-input
                              v-model="formDetail.name"
                              disabled
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="关联事件">
                            <el-input
                              v-model="formDetail.name"
                              disabled
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="*选择负责人" required>
                            <el-select
                              v-model="formDetail.region"
                              placeholder="请选择负责人"
                            >
                              <el-option
                                label="区域一"
                                value="shanghai"
                              ></el-option>
                              <el-option
                                label="区域二"
                                value="beijing"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="选择班组人员">
                            <el-select
                              v-model="formDetail.region"
                              placeholder="请选择班组人员"
                            >
                              <el-option
                                label="区域一"
                                value="shanghai"
                              ></el-option>
                              <el-option
                                label="区域二"
                                value="beijing"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col
                          :span="12"
                          style="width: 260px; padding: 10px 20px 0px 11px"
                        >
                          <div class="lableText formcolorr">*作业内容</div>
                          <el-form-item label="" label-width="0" required>
                            <el-input
                              type="textarea"
                              v-model="formDetail.desc"
                            ></el-input>
                          </el-form-item>
                          <div class="lableText">评审标准</div>
                          <el-form-item label="" label-width="0">
                            <el-input
                              type="textarea"
                              v-model="formDetail.desc"
                            ></el-input>
                          </el-form-item>
                          <div class="lableText">安全交底</div>
                          <el-form-item label="" label-width="0">
                            <el-input
                              type="textarea"
                              v-model="formDetail.desc"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </div>
                  <div class="el-dialog__footer">
                    <span class="addBtn"> 确 定 </span>
                    <span class="addBtn closeBtn" @click="showAddBox = false">
                      取 消
                    </span>
                  </div>
                </div>
                <span
                  slot="reference"
                  class="detailBtn"
                  @click="showdetailBox = true;showAddBox=false"
                >
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

    <!-- 创建工单 -->

    <!-- 创建工单 -->
  </div>
</template>

<script>
export default {
  name: "indexThird",
  data() {
    return {
      showdetailBox: false,
      showAddBox: false,
      customColors: "rgba(255, 171, 91, .4)",
      customsuccessColors: "rgba(119, 255, 122, .4)",
      formDetail: {
        name: 23423,
      },
      statusList: [
        { name: "处理中", key: 1 },
        { name: "待处理", key: 2 },
        { name: "已完成", key: 3 },
      ],
      currentPage: 1,
      searchKey: "",
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 4,
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
    addBtn(id) {
      this.$refs[`popover-${id}`].doClose();
      this.showdetailBox = false;
      this.showAddBox = true;
      let that = this;
      setTimeout(() => {
        that.$refs[`popover-${id}`].doShow();
      }, 0);
    },
  },
};
</script> 
<style lang="scss">
.formP {
  margin: 0px;
}
.statusForm {
  .el-form-item__content {
    text-align: right;
    img {
      vertical-align: middle;
      margin-right: 10px;
      display: inline-block;
    }
    span {
      vertical-align: middle;
      display: inline-block;
      margin-right: 10px;
    }
    span.colorc {
      font-size: 12px;
    }
  }
}
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
