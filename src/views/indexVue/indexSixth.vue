<template>
  <div class="indexSixth-container">
    <el-row>
      <el-col :span="20">
        <el-row class="statusBox">
          <el-col :span="6"
            ><lable>查询时段</lable>
            <el-date-picker
              style="width: 260px"
              v-model="value1"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-col>

          <el-col :span="8"
            ><lable>状态</lable><span>处理中</span><span>待处理</span
            ><span>已完成</span></el-col
          >
          <el-col :span="10"
            ><lable>等级</lable><span>应急</span><span>告警</span
            ><span>故障</span><span>预警</span></el-col
          >
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
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              <span class="colorc">00{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="类型">
            <template slot-scope="scope">
              <span class="colorR colorC">应急</span>
              <!-- <span class="colorY colorC">告警</span> -->
              <!-- <span class="colorY1 colorC">预警</span> -->
              <!-- <span class="colorR1 colorC">故障</span> -->
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="单号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="date"
            label="签发时间"
            width="180"
          >
            <template slot-scope="scope">
              <span class="colorc">2021-12-45 15:44:01</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="检测设备">
          </el-table-column>
          <el-table-column align="center" prop="name" label="签发人">
          </el-table-column>
          <el-table-column align="center" prop="name" label="作业地点">
          </el-table-column>
          <el-table-column align="center" prop="name" label="作业负责人">
          </el-table-column>
          <el-table-column align="center" prop="name" label="状态">
            <template slot-scope="scope">
              <span class="colorr">未处理</span>
              <!-- <span class="colorg">已完成</span> -->
              <!-- <span class="colorb">处理中</span>  -->
            </template>
          </el-table-column>
          <el-table-column label="详情" align="center" width="300">
            <template slot-scope="scope">
              <span class="doBtnBox">
                <el-popover
                  placement="left"
                  trigger="click"
                  :ref="`popover-${scope.row.id}`"
                  popper-class="popoverBox"
                >
                  <div class="popoverBoxInner">
                    <div class="el-dialog__body">
                      <el-tabs type="border-card">
                        <el-tab-pane label="工单详情">
                          <el-form
                            ref="form"
                            :model="formDetail"
                            label-position="left"
                            label-width="100px"
                          >
                            <el-form-item label="工单编号">
                              48905820AFl
                            </el-form-item>
                            <el-form-item label="工单类型">
                              动环水浸告警
                            </el-form-item>
                            <el-form-item label="作业负责人">
                              动环水浸告警
                            </el-form-item>
                            <el-form-item label="作业班组人员">
                              动环水浸告警
                            </el-form-item>
                            <el-form-item label="作业地点">
                              动环水浸告警
                            </el-form-item>
                            <div class="lineSpan"></div>
                            <el-form-item label="签发时间">
                              动环水浸告警
                            </el-form-item>
                            <el-form-item label="计划完成时间">
                              动环水浸告警
                            </el-form-item>
                            <el-form-item label="实际完成时间">
                              动环水浸告警
                            </el-form-item>
                            <el-form-item label="计划耗时">
                              动环水浸告警
                            </el-form-item>
                            <el-form-item label="实际耗时">
                              动环水浸告警
                            </el-form-item>
                            <div class="lineSpan"></div>
                            <el-form-item label="关联事件" class="statusForm">
                            </el-form-item>
                          </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="作业内容">
                          <el-form
                            ref="form"
                            :model="apformDetail"
                            label-position="left"
                            label-width="100px"
                          >
                            <div class="lableText" style="margin-top: 10px">
                              作业反馈情况
                            </div>
                            <el-form-item label="" label-width="0">
                              <p class="apTextP">
                                这里是作业反馈情况辅助文字UI，仅提供
                                行间距和段落参考；这里是作业反馈情…
                              </p>
                            </el-form-item>
                            <div class="lableText" style="margin-top: 10px">
                              根因分析
                            </div>
                            <el-form-item label="" label-width="0">
                              <p class="apTextP" style="color: #fff">
                                这里是作业反馈情况辅助文字UI，仅提供
                                行间距和段落参考；这里是作业反馈情…
                              </p>
                            </el-form-item>
                            <div class="lableText" style="margin-top: 10px">
                              耗用材料
                            </div>
                            <el-form-item label="" label-width="0">
                              <p class="apTextP">
                                这里是作业反馈情况辅助文字UI，仅提供
                                行间距和段落参考；这里是作业反馈情…
                              </p>
                            </el-form-item>
                            <div class="lableText" style="margin-top: 10px">
                              上传附件
                            </div>
                            <el-form-item label="" label-width="0">
                              <p class="apTextP">
                                <el-row>
                                  <el-col :span="19">
                                    <img
                                      src="@/assets/index/Icon_image.png"
                                      alt=""
                                    />
                                    <span>附件文件（十）.pdf</span>
                                  </el-col>
                                  <el-col :span="5">
                                    <img
                                      src="@/assets/index/Icon_yulan.png"
                                      alt=""
                                    />
                                    <img
                                      src="@/assets/index/Icon_xiazai.png"
                                      alt=""
                                    />
                                  </el-col>
                                </el-row>
                                <el-row>
                                  <el-col :span="19">
                                    <img
                                      src="@/assets/index/Icon_image.png"
                                      alt=""
                                    />
                                    <span>附件文件（十）.pdf</span>
                                  </el-col>
                                  <el-col :span="5">
                                    <img
                                      src="@/assets/index/Icon_yulan.png"
                                      alt=""
                                    />
                                    <img
                                      src="@/assets/index/Icon_xiazai.png"
                                      alt=""
                                    />
                                  </el-col>
                                </el-row>
                                <el-row>
                                  <el-col :span="19">
                                    <img
                                      src="@/assets/index/Icon_image.png"
                                      alt=""
                                    />
                                    <span>附件文件（十）.pdf</span>
                                  </el-col>
                                  <el-col :span="5">
                                    <img
                                      src="@/assets/index/Icon_yulan.png"
                                      alt=""
                                    />
                                    <img
                                      src="@/assets/index/Icon_xiazai.png"
                                      alt=""
                                    />
                                  </el-col>
                                </el-row>

                                <el-row>
                                  <el-col :span="19">
                                    <img
                                      src="@/assets/index/Icon_image.png"
                                      alt=""
                                    />
                                    <span>附件文件（十）.pdf</span>
                                  </el-col>
                                  <el-col :span="5">
                                    <img
                                      src="@/assets/index/Icon_yulan.png"
                                      alt=""
                                    />
                                    <img
                                      src="@/assets/index/Icon_xiazai.png"
                                      alt=""
                                    />
                                  </el-col>
                                </el-row>
                              </p>
                            </el-form-item>
                            <div class="lableText" style="margin-top: 10px">
                              审核意见
                            </div>
                            <el-form-item label="" label-width="0">
                              <p class="apTextP">
                                这里是作业反馈情况辅助文字UI，仅提供
                                行间距和段落参考；这里是作业反馈情…
                              </p>
                            </el-form-item>
                            <div class="lableText" style="margin-top: 10px">
                              审核结果
                            </div>
                            <el-form-item label="" label-width="0">
                              <img
                                src="@/assets/index/Img_shenhetongguo.png"
                                alt=""
                              />
                              <img
                                src="@/assets/index/Img_shenheweitongguo.png"
                                alt=""
                              />
                            </el-form-item>
                          </el-form>
                          <div
                            class="el-dialog__footer"
                            style="padding-bottom: 10px"
                          >
                            <span class="addBtn"> 通 过 </span>
                            <span class="addBtn nopassBtn"> 不通过 </span>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="进度跟踪">
                          <div class="card-list">
                            <el-row>
                              <el-col :span="4">2</el-col>
                              <el-col :span="20">346363737</el-col>
                            </el-row>
                          </div>
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                  <span class="i-detail-box text-span" slot="reference">
                    <i class="icon-detail"></i>
                    <span class="colorb">详情</span>
                  </span>
                </el-popover>

                <span class="line-q">|</span>
                <span class="i-ap-box text-span">
                  <i class="icon-ap"></i>
                  <span class="colorr">审核</span>
                </span>
                <span class="line-q">|</span>
                <el-popover
                  placement="left"
                  trigger="click"
                  :ref="`popover-${scope.row.id}`"
                  popper-class="popoverBox"
                >
                  <div class="popoverBoxInner">
                    <div class="el-dialog__body">
                      <el-form
                        ref="form"
                        :model="apformDetail"
                        label-position="left"
                        label-width="100px"
                      >
                        <div class="lableText" style="margin-top: 10px">
                          请输入标记为已完成原因
                        </div>
                        <el-form-item label="" label-width="0">
                          <el-input
                            type="textarea"
                            v-model="apformDetail.desc"
                          ></el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div class="el-dialog__footer" style="padding-bottom: 10px">
                      <span class="addBtn"> 确 定 </span>
                      <span class="addBtn closeBtn"> 取 消 </span>
                    </div>
                  </div>
                  <span class="i-read-box text-span" slot="reference">
                    <i class="icon-read"></i>
                    <span class="colorg">标记为已读</span>
                  </span>
                </el-popover>
              </span>
            </template>
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
  name: "indexSixth",
  data() {
    return {
      apformDetail: {},
      formDetail: {},
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
  },
};
</script> 
<style lang="scss">
.indexSixth-container {
  box-sizing: border-box;
  padding: 24px;

  .statusBox {
    .el-range-editor.el-input__inner {
      background: none;
    }
    .el-range-editor .el-range-input {
      background: none;
    }
    .el-date-editor .el-range-separator {
      color: #fff;
    }
    font-size: 16px;
    color: #fff;
    label {
      margin-right: 5px;
      color: rgba(206, 206, 206, 1);
      font-size: 16px;
    }
    span {
      width: 120px;
      display: inline-block;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: rgba(91, 126, 255, 0.1);
      vertical-align: middle;
      margin: 0px 10px;
      border-radius: 4px;
    }
  }
}

.apTextP {
  border: 1px solid #5b7eff;
  border-radius: 4px;
  width: 272px;
  height: 74px;
  overflow-y: auto;
  padding: 6px 10px;
  line-height: 20px;
  color: rgba(171, 189, 255, 0.7);
  margin: 0px 0px 5px 0px;
  img {
    vertical-align: middle;
    margin-right: 8px;
  }
  span {
    vertical-align: middle;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
