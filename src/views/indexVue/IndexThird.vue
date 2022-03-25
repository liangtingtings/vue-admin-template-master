<template>
  <div class="indexThird-container">
    <el-row>
      <el-col :span="20">
        <el-row class="statusBox">
          <el-col :span="10">
            <label>状态</label>
            <span
              @click="checkStatus(index, item)"
              :class="item.ischeck == true ? 'checkActive' : ''"
              v-for="(item, index) in statusList"
              :key="item.key"
              >{{ item.name }} <i v-if="item.ischeck" class="el-icon-check"></i
            ></span>
          </el-col>
          <el-col :span="14">
            <label>等级</label>
            <span
              @click="checkTypes(index, item)"
              :class="item.ischeck == true ? 'checkActive' : ''"
              v-for="(item, index) in typesList"
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

          <el-table-column align="center" label="等级" width="150" prop="evel">
            <template slot-scope="scope">
              <span class="colorR colorC" v-if="scope.row.evel == '应急'"
                >应急</span
              >
              <span class="colorY colorC" v-if="scope.row.evel == '告警'"
                >告警</span
              >
              <span class="colorY1 colorC" v-if="scope.row.evel == '预警'"
                >预警</span
              >
              <span class="colorR1 colorC" v-if="scope.row.evel == '故障'"
                >故障</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="time" label="时间" width="180">
            <template slot-scope="scope">
              <span class="colorc">{{ scope.row.time }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="equipment"
            label="检测设备"
            width="150"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="position"
            label="位置"
            width="300"
          >
          </el-table-column>
          <el-table-column align="center" prop="lx" label="类型" width="150">
          </el-table-column>
          <el-table-column align="center" prop="type" label="状态" width="150">
            <template slot-scope="scope">
              {{
                scope.row.type == "待处理"
                  ? "待处理"
                  : scope.row.type == "已完成"
                  ? "已完成"
                  : "处理中"
              }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="详情" width="180">
            <template slot-scope="scope">
              <el-popover
                placement="left"
                trigger="click" 
                :ref="`popover-${scope.row.ID}`"
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
                        {{ formDetail.data.alarmName }}
                      </el-form-item>
                      <el-form-item label="事件编号">
                        {{ formDetail.data.alarmBh }}
                      </el-form-item>
                      <el-form-item label="事件描述">
                        {{ formDetail.data.alarmDescribe }}
                      </el-form-item>
                      <el-form-item label="事件类型">
                        {{ formDetail.data.alarmType }}
                      </el-form-item>
                      <el-form-item label="关联设备">
                        {{ formDetail.data.glEquipment }}
                      </el-form-item>
                      <el-form-item label="事件发生位置">
                        {{ formDetail.data.alarmPosition }}
                      </el-form-item>
                      <el-form-item label="设备ID">
                        {{ formDetail.data.equipmentId }}
                      </el-form-item>
                      <el-form-item label="事件发生时间">
                        {{ formDetail.data.alarmTime }}
                      </el-form-item>
                      <div class="lineSpan"></div>
                      <el-form-item label="事件状态" class="statusForm">
                        <img
                          :src="
                            formDetail.type == '待处理'
                              ? Icondaichuli
                              : formDetail.type == '已完成'
                              ? Iconyiwancheng
                              : Iconchulizhong
                          "
                          alt=""
                        />

                        <span :class='formDetail.type == "待处理"
                            ? "colorc"
                            : formDetail.type == "已完成"
                            ? "colorg"
                            : "colory"'>{{
                          formDetail.type == "待处理"
                            ? "待处理"
                            : formDetail.type == "已完成"
                            ? "已完成"
                            : "处理中"
                        }}</span>
                        <span class="colorc">{{ formDetail.time }}</span>
                      </el-form-item>
                      <div style="margin-bottom: 20px">
                        <el-progress
                          :stroke-width="10"
                          :percentage="
                            formDetail.type == '待处理'
                              ? 0
                              : formDetail.type == '已完成'
                              ? 100
                              : 50
                          "
                          :class="
                            formDetail.type == '待处理'
                              ? ''
                              : formDetail.type == '已完成'
                              ? 'customsuccessColors'
                              : 'customColors'
                          "
                          :color="
                            formDetail.type == '待处理'
                              ? ''
                              : formDetail.type == '已完成'
                              ? customsuccessColors
                              : customColors
                          "
                          :show-text="false"
                        ></el-progress>
                      </div>
                      <div class="lineSpan"></div>
                      <el-form-item label="原因分析" class="statusForm">
                      </el-form-item>
                      <p class="formP" v-if="formDetail.causeAnalysis.length>0?true:false">
                        <div v-for="item in formDetail.causeAnalysis" :key="item">{{item}}</div>
                      </p>
                      <el-form-item label="操作建议" class="statusForm">
                      </el-form-item>
                      <p class="formP" v-if="formDetail.operationSugg.length>0?true:false">
                        <div v-for="item in formDetail.operationSugg" :key="item">{{item}}</div>
                      </p>
                    </el-form>
                  </div>
                  <!-- -->
                  <div class="el-dialog__footer" v-if="formDetail.button == 'none'?false:true" >
                    <span class="addBtn" @click="addBtn(scope.row.ID,1)">
                      创建工单
                    </span>
                    <span class="addBtn closeBtn" @click="addBtn(scope.row.ID,2)"> 忽略该事件 </span>
                  </div>
                </div> 
                  <!-- 创建 -->
                <div class="popoverBoxInner showAddBox" v-if="showAddBox">
                  <div class="el-dialog__header">
                    <span class="el-dialog__title"> 创建工单 </span>
                  </div>
                  <div class="el-dialog__body">
                    <el-form 
                      :rules="rules" ref="ruleForm"
                      :model="creatDetail"
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
                              v-model="creatDetail.associatedEvents.alarmType"
                              disabled
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="作业地点">
                            <el-input
                              v-model="creatDetail.associatedEvents.operationLocation"
                              disabled
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="*签发时间" required>
                            <el-date-picker
                              v-model="creatDetail.issueTime"
                              type="datetime"
                              placeholder="选择日期时间"
                            >
                            </el-date-picker>
                          </el-form-item>
                          <el-form-item label="*计划耗时" required>
                            <el-input v-model="creatDetail.consumeTime"></el-input>
                          </el-form-item>
                          <el-form-item label="完成时间">
                            <el-input
                              v-model="creatDetail.completeTime"
                              disabled
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="关联设备">
                            <el-input
                              v-model="creatDetail.associatedEvents.glEquipment"
                              disabled
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="关联事件">
                            <el-input
                              v-model="creatDetail.associatedEvents.alarmName"
                              disabled
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="*选择负责人" required v-if="creatDetail.personInCharge.length>0?true:false">
                            <el-select
                              v-model="creatDetail.personInChargeCreat"
                              placeholder="请选择负责人"
                            >
                              <el-option v-for="item in creatDetail.personInCharge" :key="item" :label="item.name" :value="item.uid" 
                              ></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="选择班组人员" v-if="creatDetail.crew.length>0?true:false">
                            <el-select
                              multiple
                              v-model="creatDetail.crewCreat"
                              placeholder="请选择班组人员"
                            >
                              <el-option v-for="item in creatDetail.crew" :key="item" :label="item.name" :value="item.uid" 
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
                              v-model="creatDetail.jobContent"
                              :rows="4"
                            ></el-input>
                          </el-form-item>
                          <div class="lableText">评审标准</div>
                          <el-form-item label="" label-width="0">
                            <el-input
                              :rows="4"
                              type="textarea"
                              v-model="creatDetail.reviewCriteria"
                            ></el-input>
                          </el-form-item>
                          <div class="lableText">安全交底</div>
                          <el-form-item label="" label-width="0">
                            <el-input
                              :rows="4"
                              type="textarea"
                              v-model="creatDetail.safetyDisclosure"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </div>
                  <div class="el-dialog__footer">
                    <span class="addBtn" @click="addComBtn"> 确 定 </span>
                    <span class="addBtn closeBtn" @click="closeBox">
                      取 消
                    </span>
                  </div>
                </div>

                 <!-- 忽略 -->
                 <div class="popoverBoxInner showAddBox" v-if="showCloseBox">
                    <div class="el-dialog__body">
                      <el-form
                        ref="form"
                        :model="apformDetail"
                        label-position="left"
                        label-width="100px"
                      >
                        <div class="lableText" style="margin-top: 10px">
                          请输入忽略该事件原因
                        </div>
                        <el-form-item label="" label-width="0">
                          <el-input
                            type="textarea"
                            v-model="apformDetail.reason"
                          ></el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div class="el-dialog__footer" style="padding-bottom: 10px">
                      <span class="addBtn" @click="addCloBtn"> 确 定 </span>
                      <span class="addBtn closeBtn" @click="closeBox"> 取 消 </span>
                    </div>
                  </div>
                <span
                  slot="reference"
                  class="detailBtn"
                  @click="getDetailBtn(scope.row.ID)"
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
            prop="describe"
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
            :page-size="14"
            layout="prev, pager, next, jumper"
            :total="total"
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
import {
  getList,
  getDetail,
  getCreateDetail,
  gongdanConfirm,
  alarmShield,
} from "@/api/indexThird";
export default {
  name: "indexThird",
  data() {
    return {
      apformDetail: {},
      showCloseBox: false,
      rules: [],
      Icondaichuli: require("@/assets/index/Icon_daichuli.png"),

      Iconchulizhong: require("@/assets/index/Icon_chulizhong.png"),

      Iconyiwancheng: require("@/assets/index/Icon_yiwancheng.png"),
      total: 0,
      showdetailBox: false,
      showAddBox: false,
      customColors: "rgba(255, 171, 91, .4)",
      customsuccessColors: "rgba(119, 255, 122, .4)",
      formDetail: {
        data: {},
        causeAnalysis: [],
        operationSugg: [],
      },
      creatDetail: {
        associatedEvents: {},
        personInCharge: [],
        crew: [],
      },
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
        { name: "应急", key: 1, ischeck: true },
        { name: "告警", key: 2, ischeck: true },
        { name: "故障", key: 3, ischeck: true },
        { name: "预警", key: 4, ischeck: true },
      ],
      typesList: [
        { name: "应急", key: 1, ischeck: true },
        { name: "告警", key: 2, ischeck: true },
        { name: "故障", key: 3, ischeck: true },
        { name: "预警", key: 4, ischeck: true },
      ],
      currentPage: 1,
      tableData: [],
      restaurants: [],
      state: "",
      timeout: null,
      creatId: "",
    };
  },
  mounted() {
    this.getAllList();
  },
  methods: {
    addComBtn() {
      let obj = {
        gdType: this.creatDetail.associatedEvents.type,
        equipmentId: this.creatDetail.associatedEvents.equipmentId,
        glEquipment: this.creatDetail.associatedEvents.glEquipment,
        operationLocation: this.creatDetail.associatedEvents.operationLocation,
        glAlarm: this.creatDetail.associatedEvents.alarmName,
        alarmId: this.creatDetail.associatedEvents.alarmId,
        consumeTime: this.creatDetail.consumeTime,
        issueTime: this.creatDetail.issueTime,
        completeTime: this.creatDetail.completeTime,
        personInCharge: this.creatDetail.personInChargeCreat,
        crew: this.creatDetail.crewCreat,
        jobContent: this.creatDetail.jobContent,
        reviewCriteria: this.creatDetail.reviewCriteria,
        safetyDisclosure: this.creatDetail.safetyDisclosure,
      };
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          gongdanConfirm(obj).then((res) => {
            this.$refs[`popover-${this.creatId}`].doClose();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addCloBtn() {
      alarmShield({id:this.creatId,reason:this.apformDetail.reason}).then((res) => {
        this.$refs[`popover-${this.creatId}`].doClose();
      });
    },
    closeBox(){
this.$refs[`popover-${this.creatId}`].doClose();
    },
    getDetailBtn(id) {
      this.showdetailBox = true;
      this.showAddBox = false;
      this.showCloseBox = false;
      getDetail({ id: id }).then((res) => {
        this.formDetail = res;
      });
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
    handleSelect(item) {
      console.log(item);
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
      this.currentPage = val;
      this.getAllList();
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
    addBtn(id, type) {
      this.creatId = id;
      this.$refs[`popover-${id}`].doClose();
      this.showdetailBox = false;
      this.showAddBox = type == 1 ? true : false;
      this.showCloseBox = type == 2 ? true : false;
      let that = this;
      setTimeout(() => {
        that.$refs[`popover-${id}`].doShow();
      }, 0);
      if (type == 1) {
        getCreateDetail({ id: id }).then((res) => {
          this.creatDetail = res.data;
        });
      }
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
</style>
