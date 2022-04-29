<template>
  <div class="indexSixth-container">
    <el-row>
      <el-col :span="20">
        <el-row>
          <el-col :span="6" class="statusBox"
            ><label>查询时段</label>
            <el-date-picker
              @change="changeTime"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 260px"
              v-model="allTime"
              type="daterange"
              placeholder="开始日期"
            >
            </el-date-picker>
          </el-col>

          <el-col :span="10" class="statusBox">
            <label>类型</label>
            <span
              style="
                background: rgba(91, 126, 255, 0.2);
                color: rgba(171, 189, 255, 0.45);
              "
              >应急</span
            >
            <span
              @click="checkTypes(index, item)"
              :class="item.ischeck == true ? 'checkActive' : ''"
              v-for="(item, index) in typesList"
              :key="item.key"
              >{{ item.name }} <i v-if="item.ischeck" class="el-icon-check"></i
            ></span>
          </el-col>
          <el-col :span="8" class="statusBox">
            <label>状态</label>
            <span
              @click="checkStatus(index, item)"
              :class="item.ischeck == true ? 'checkActive' : ''"
              v-for="(item, index) in statusList"
              :key="item.key"
              >{{ item.name }} <i v-if="item.ischeck" class="el-icon-check"></i
            ></span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-autocomplete
          placeholder="请输入关键词搜索"
          v-model="state"
          class="searchBox"
          :fetch-suggestions="querySearchAsync"
          @select="handleSelect"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
          <span slot="suffix" class="searcBtn"
            >| <span @click="getAllList()">搜索</span></span
          >
        </el-autocomplete>
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
          <el-table-column align="center" label="序号" width="150" prop="xh">
            <template slot-scope="scope">
              <span class="colorc">{{ scope.row.xh }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="类型"
            width="150"
            prop="alarmType"
          >
            <template slot-scope="scope">
              <span class="colorR colorC" v-if="scope.row.alarmType == '应急'"
                >应急</span
              >
              <span class="colorY colorC" v-if="scope.row.alarmType == '告警'"
                >告警</span
              >
              <span class="colorY1 colorC" v-if="scope.row.alarmType == '预警'"
                >预警</span
              >
              <span class="colorR1 colorC" v-if="scope.row.alarmType == '故障'"
                >故障</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="numbers" label="单号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="issueTime"
            label="签发时间"
            width="180"
          >
            <template slot-scope="scope">
              <span class="colorc">{{ scope.row.issueTime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="issuer" label="签发人">
          </el-table-column>
          <el-table-column align="center" prop="ol" label="作业地点">
          </el-table-column>
          <el-table-column
            align="center"
            prop="personInCharge"
            label="作业负责人"
          >
          </el-table-column>
          <el-table-column align="center" prop="state" label="状态">
            <template slot-scope="scope">
              <span
                :class="
                  scope.row.state == '待审核'
                    ? 'colorr'
                    : scope.row.state == '已完成'
                    ? 'colorg'
                    : 'colorb'
                "
                >{{
                  scope.row.state == "待审核"
                    ? "待审核"
                    : scope.row.state == "已完成"
                    ? "已完成"
                    : "已接单"
                }}</span
              >
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
                  <div class="popoverBoxInner indexSixth-popoverBoxInner">
                    <div class="el-dialog__body">
                      <el-tabs
                        type="border-card"
                        @tab-click="handleClick"
                        v-model="activeName"
                      >
                        <el-tab-pane label="工单详情" name="first">
                          <el-form
                            ref="form"
                            :model="formDetail"
                            label-position="left"
                            label-width="100px"
                          >
                            <el-form-item label="工单编号">
                              {{ formDetail.gdNumber }}
                            </el-form-item>
                            <el-form-item label="工单类型">
                              <span
                                style="padding: 5px 10px"
                                class="colorR colorC"
                                v-if="formDetail.gdType == '应急'"
                                >应急</span
                              >
                              <span
                                class="colorY colorC"
                                style="padding: 5px 10px"
                                v-if="formDetail.gdType == '告警'"
                                >告警</span
                              >
                              <span
                                class="colorY1 colorC"
                                style="padding: 5px 10px"
                                v-if="formDetail.gdType == '预警'"
                                >预警</span
                              >
                              <span
                                class="colorR1 colorC"
                                style="padding: 5px 10px"
                                v-if="formDetail.gdType == '故障'"
                                >故障</span
                              >
                            </el-form-item>
                            <el-form-item label="工单状态">
                              <span
                                :class="
                                  formDetail.gdState == '待审核'
                                    ? 'colorr'
                                    : formDetail.gdState == '已完成'
                                    ? 'colorg'
                                    : 'colorb'
                                "
                                >{{
                                  formDetail.gdState == "待审核"
                                    ? "待审核"
                                    : formDetail.gdState == "已完成"
                                    ? "已完成"
                                    : "已接单"
                                }}</span
                              >
                            </el-form-item>
                            <el-form-item label="作业负责人">
                              {{ formDetail.personInCharge }}
                            </el-form-item>
                            <el-form-item label="作业班组人员">
                              {{ formDetail.otm }}
                            </el-form-item>
                            <el-form-item label="作业地点">
                              {{ formDetail.ol }}
                            </el-form-item>
                            <div class="lineSpan"></div>
                            <el-form-item label="签发时间">
                              {{ formDetail.issueTime }}
                            </el-form-item>
                            <el-form-item label="计划完成时间">
                              {{ formDetail.planTime }}
                            </el-form-item>
                            <el-form-item label="实际完成时间">
                              {{ formDetail.actualTime }}
                            </el-form-item>
                            <el-form-item label="计划耗时">
                              {{ formDetail.planTimeUse }}
                            </el-form-item>
                            <el-form-item label="实际耗时">
                              {{ formDetail.actualTimeUse }}
                            </el-form-item>
                            <div class="lineSpan"></div>
                            <el-form-item label="关联事件" class="statusForm">
                              {{ formDetail.glAlarm }}
                            </el-form-item>
                          </el-form>
                        </el-tab-pane>
                        <el-tab-pane
                          name="second"
                          :disabled="scope.row.state == '已接单' ? true : false"
                        >
                          <span
                            slot="label"
                            :class="
                              scope.row.state == '已接单' ? '' : 'second-icon'
                            "
                            >作业内容</span
                          >
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
                                {{ apformDetail.jobFeedback }}
                              </p>
                            </el-form-item>
                            <div class="lableText" style="margin-top: 10px">
                              根因分析
                            </div>
                            <el-form-item label="" label-width="0">
                              <p class="apTextP" style="color: #fff">
                                {{ apformDetail.rca }}
                              </p>
                            </el-form-item>
                            <div class="lableText" style="margin-top: 10px">
                              耗用材料
                            </div>
                            <el-form-item label="" label-width="0">
                              <p class="apTextP">
                                {{ apformDetail.cm }}
                              </p>
                            </el-form-item>
                            <div class="lableText" style="margin-top: 10px">
                              上传附件
                            </div>
                            <el-form-item label="" label-width="0">
                              <p class="apTextP">
                                <el-row
                                  v-for="item in apformDetail.enclosure"
                                  :key="item"
                                >
                                  <el-col :span="19">
                                    <img
                                      src="@/assets/index/Icon_image.png"
                                      alt=""
                                    />
                                    <span>{{ item.name }}</span>
                                  </el-col>
                                  <el-col :span="5">
                                    <img
                                      @click="seeImg(item.address)"
                                      src="@/assets/index/Icon_yulan.png"
                                      alt=""
                                    />
                                    <img @click="downLoadImg(item)"
                                      src="@/assets/index/Icon_xiazai.png"
                                      alt=""
                                    />
                                  </el-col>
                                </el-row>
                              </p>
                            </el-form-item>
                            <el-form-item
                              label="审核结果"
                              label-width="140px"
                              v-if="apformDetail.state == '已完成'"
                            >
                              <img
                                v-if="
                                  apformDetail.findingsOfAudit == '审核通过'
                                "
                                src="@/assets/index/Img_shenhetongguo.png"
                                alt=""
                              />
                              <img
                                v-if="
                                  apformDetail.findingsOfAudit == '审核未通过'
                                "
                                src="@/assets/index/Img_shenheweitongguo.png"
                                alt=""
                              />
                            </el-form-item>
                            <div
                              class="lableText"
                              style="margin-top: 10px"
                              v-if="apformDetail.state == '待审核'"
                            >
                              审核意见
                            </div>
                            <el-form-item
                              label=""
                              label-width="0"
                              v-if="apformDetail.state == '待审核'"
                            >
                              <el-input
                                type="textarea"
                                v-model="apformDetail.findingsOfAudit"
                              ></el-input>
                            </el-form-item>
                          </el-form>
                          <div
                            v-if="apformDetail.state == '待审核'"
                            class="el-dialog__footer"
                            style="padding-bottom: 10px"
                          >
                            <span class="addBtn" @click="IsAdoptBtn(1)">
                              通 过
                            </span>
                            <span
                              class="addBtn nopassBtn"
                              @click="IsAdoptBtn(2)"
                            >
                              不通过
                            </span>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane name="third">
                          <span
                            slot="label"
                            :class="
                              scope.row.state == '已接单' ? '' : 'third-icon'
                            "
                            >进度跟踪</span
                          >
                          <div
                            class="card-list"
                            v-for="(item, index) in trackformDetail"
                            :key="item"
                            :class="
                              item.status == 'false'
                                ? 'card-list-w'
                                : item.status == 'end'
                                ? 'card-list-e'
                                : ''
                            "
                          >
                            <el-row>
                              <el-col :span="4">{{ index + 1 }}</el-col>
                              <el-col :span="20">
                                <div class="left-line">
                                  <el-row>
                                    <el-col :span="21">{{ item.name }}</el-col>
                                    <el-col :span="3"
                                      ><img
                                        :class="
                                          item.status == 'false'
                                            ? 'anm-img'
                                            : ''
                                        "
                                        :src="
                                          item.status == 'true'
                                            ? Iconyiwancheng
                                            : item.status == 'false'
                                            ? Iconjinxingzhong
                                            : Iconzhongzhi
                                        "
                                        alt=""
                                    /></el-col>
                                  </el-row>
                                  <div class="colorc">{{ item.time }}</div>
                                  <div
                                    v-if="
                                      item.status == 'end' &&
                                      item.button == 'block'
                                    "
                                    class="el-dialog__footer"
                                    style="padding-bottom: 10px"
                                  >
                                    <span
                                      class="addBtn nopassBtn"
                                      @click="trackBtn(1)"
                                      style="margin: 0px 15px 0px 0px"
                                    >
                                      确认终止
                                    </span>
                                    <span class="addBtn" @click="trackBtn(2)">
                                      驳 回
                                    </span>
                                  </div>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                  <span
                    class="i-detail-box text-span"
                    slot="reference"
                    @click="getDetailBtn(scope.row.id, scope.row.state)"
                  >
                    <i class="icon-detail"></i>
                    <span class="colorb">详情</span>
                  </span>
                </el-popover>

                <span class="line-q">|</span>
                <!-- <span class="i-ap-box text-span">
                  <i class="icon-ap"></i>
                  <span class="colorr">审核</span>
                </span> -->
                <!-- <span class="line-q">|</span> -->
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
                        :model="readformDetail"
                        label-position="left"
                        label-width="100px"
                      >
                        <div class="lableText" style="margin-top: 10px">
                          请输入标记为已完成原因
                        </div>
                        <el-form-item label="" label-width="0">
                          <el-input
                            type="textarea"
                            v-model="readformDetail.reason"
                          ></el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div class="el-dialog__footer" style="padding-bottom: 10px">
                      <span
                        class="addBtn"
                        @click="signCompleteBtn(scope.row.id)"
                      >
                        确 定
                      </span>
                      <span
                        class="addBtn closeBtn"
                        @click="closeBoxBtn(scope.row.id)"
                      >
                        取 消
                      </span>
                    </div>
                  </div>
                  <span
                    class="i-read-box text-span"
                    slot="reference"
                    v-if="scope.row.state != '已完成'"
                  >
                    <i class="icon-read"></i>
                    <span class="colorg">标记为已完成</span>
                  </span>
                </el-popover>
                <span
                  class="i-read-box text-span"
                  v-if="scope.row.state == '已完成'"
                >
                  <i class="icon-readzhihui"></i>
                  <span class="colorzh">标记为已完成</span>
                </span>
                <!-- :class="scope.row.state != '已完成'?'line-h':''" -->
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginationBox">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="14"
            layout="prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogimgVisible" append-to-body>
      <img :src="imgUrl" alt="" class="imgBox" />
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  getDetail,
  homework,
  IsAdopt,
  gettrack,
  getisEnd,
  signComplete,
} from "@/api/indexSixth";

export default {
  name: "indexSixth",
  data() {
    return {
      imgUrl: "",
      dialogimgVisible: false,
      readformDetail: {},
      Iconzhongzhi: require("@/assets/index/Icon_zhongzhi.png"),
      Iconjinxingzhong: require("@/assets/index/Icon_jinxingzhong.png"),
      Iconyiwancheng: require("@/assets/index/Icon_yiwancheng.png"),
      activeName: "first",
      allTime: [],
      total: 0,
      restaurants: [],
      state: "",
      timeout: null,
      statusCheckList: [
        { name: "处理中", key: 1, ischeck: true },
        { name: "待处理", key: 2, ischeck: true },
        { name: "已完成", key: 3, ischeck: true },
      ],
      statusList: [
        { name: "处理中", key: 1, ischeck: true },
        { name: "待处理", key: 2, ischeck: true },
        { name: "已完成", key: 3, ischeck: true },
      ],
      typeCheckList: [
        // { name: "应急", key: 1, ischeck: true },
        { name: "告警", key: 2, ischeck: true },
        { name: "故障", key: 3, ischeck: true },
        { name: "预警", key: 4, ischeck: true },
      ],
      typesList: [
        // { name: "应急", key: 1, ischeck: true },
        { name: "告警", key: 2, ischeck: true },
        { name: "故障", key: 3, ischeck: true },
        { name: "预警", key: 4, ischeck: true },
      ],
      apformDetail: {},
      formDetail: {},
      currentPage: 1,
      trackformDetail: [],
      tableData: [],
    };
  },
  mounted() {
    this.getAllList();
  },
  methods: {
    signCompleteBtn(id) {
      signComplete({ id: id, reason: this.readformDetail.reason }).then(
        (res) => {
          this.$refs[`popover-${id}`].doClose();
          this.getAllList();
        }
      );
    },
    closeBoxBtn(id) {
      this.$refs[`popover-${id}`].doClose();
    },
    trackBtn(type) {
      //  1：确认终止  2：驳回
      let obj = {
        id: this.trackformDetail.id,
        button: type,
      };
      getisEnd(obj).then((res) => {
        this.gettrackbtn(this.trackformDetail.id);
      });
    },
    handleClick(tab, event) {
      console.log(this.activeName, tab, event);
    },
    getDetailBtn(id, state) {
      this.activeName = "first";
      getDetail({ id: id }).then((res) => {
        this.formDetail = res.workOrderDetail;
        if (state !== "已结单") {
          this.gethomework(id, state);
        }
        this.gettrackbtn(id);
      });
    },
    gethomework(id, state) {
      homework({ id: id }).then((res) => {
        this.apformDetail = res.homework;
        this.apformDetail.state = state;
        this.apformDetail.id = id;
      });
    },
    gettrackbtn(id) {
      gettrack({ id: id }).then((res) => {
        this.trackformDetail = res.track;
        this.trackformDetail.id = id;
      });
    },
    IsAdoptBtn(type) {
      let obj = {
        id: this.apformDetail.id,
        adoptYj: this.apformDetail.findingsOfAudit,
        IsAdopt: type,
      };
      IsAdopt(obj).then((res) => {
        this.$set(this.apformDetail, "state", "已完成");
        console.log(this.apformDetail);
      });
    },
    handleSelect(item) {
      console.log(item);
    },
    changeTime(val) {
      console.log(val, this.allTime);
      this.getAllList();
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    getAllList() {
      this.tableData = [];
      this.restaurants = [];
      let obj = {
        type:
          this.statusCheckList.length > 0
            ? this.statusCheckList.map((item) => {
                return item.name;
              })
            : [],
        evel:
          this.typeCheckList.length > 0
            ? this.typeCheckList.map((item) => {
                return item.name;
              })
            : [],
        likeSelect: this.state,
        limt: this.currentPage,
        startTime: this.allTime.length > 0 ? this.allTime[0] : "",
        stopTime: this.allTime.length > 0 ? this.allTime[1] : "",
      };
      getList(obj)
        .then((response) => {
          this.total = response.sumLimit * 14;
          this.tableData = response.list;
          this.restaurants = response.likeSelect.map((item) => {
            return {
              value: item,
            };
          });
        })
        .catch((error) => {});
    },
    checkStatus(index, item) {
      let arr = [...this.statusList];
      let selarr = [...this.statusCheckList];
      if (arr[index].ischeck == false) {
        arr[index].ischeck = true;
        selarr.push(item);
      } else {
        arr[index].ischeck = false;
        if (selarr.indexOf(index) == -1) {
          selarr.splice(
            selarr.findIndex((ele) => ele.key == item.key),
            1
          );
        }
      }
      this.statusList = arr;
      this.statusCheckList = selarr;
      this.getAllList();
    },
    checkTypes(index, item) {
      let arr = [...this.typesList];
      let selarr = [...this.typeCheckList];
      if (arr[index].ischeck == false) {
        arr[index].ischeck = true;
        selarr.push(item);
      } else {
        arr[index].ischeck = false;
        if (selarr.indexOf(index) == -1) {
          selarr.splice(
            selarr.findIndex((ele) => ele.key == item.key),
            1
          );
        }
      }
      this.typesList = arr;
      this.typeCheckList = selarr;
      this.getAllList();
    },
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
      this.currentPage = val 
      this.getAllList();
    },
    seeImg(url) {
      this.dialogimgVisible = true;
      this.imgUrl = url;
    },
    downLoadImg(item) {
      var url = item.url; // 获取图片地址
      var a = document.createElement("a"); // 创建一个a节点插入的document
      var event = new MouseEvent("click"); // 模拟鼠标click点击事件
      a.download = item.name; // 设置a节点的download属性值
      a.href = url; // 将图片的src赋值给a节点的href
      a.dispatchEvent(event); // 触发鼠标点击事件
    },
  },
};
</script> 
<style lang="scss">
.popoverBox.el-popper .el-dialog__body .el-form .el-form-item {
  margin-bottom: 0px;
}
.popoverBoxInner.indexSixth-popoverBoxInner {
  .el-dialog__footer {
    padding: 0px;
    .nopassBtn {
      margin-left: 16px;
    }
  }
}

.indexSixth-container {
  sizing: border-box;
  padding: 24px;
  label {
    margin-right: 5px;
    color: rgba(206, 206, 206, 1);
    font-size: 16px;
  }
  .statusBox {
    .el-range-editor.el-input__inner {
      border: 0px;
      background: rgba(91, 126, 255, 0.2);
    }
    .el-range-editor .el-range-input {
      background: none;
    }
    .el-date-editor .el-range-separator {
      color: #fff;
      background: none;
      width: 20px;
    }
    .el-date-editor .el-range-input {
      color: #fff;
    }
    .el-date-editor .el-range__icon {
      line-height: 36px;
    }

    font-size: 16px;
    color: #fff;

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
  width:373px;
  height: 74px;
  overflow-y: auto;
  padding: 6px 10px;
  line-height: 20px;
  color: #fff;
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
.third-icon::after,
.second-icon::after {
  content: "";
  background: url("../../assets/index/Icon_new_hong.png") no-repeat;
  position: absolute;
  top: 5px;
  right: 2px;
  width: 16px;
  height: 16px;
  display: block;
}
.imgBox {
  display: block;
  margin: 100px auto 0px;
}
</style>
