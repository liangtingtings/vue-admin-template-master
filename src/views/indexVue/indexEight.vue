<template>
  <div class="indexEight-container">
    <el-row>
      <el-col style="width: calc(100% - 420px)">
        <el-row>
          <el-col :span="18">
            <el-row class="statusBox">
              <el-col :span="8">
                <label>设备类型</label>
                <el-select
                  style="width: 110px"
                  v-model="searchKey"
                  @change="changeNum"
                  placeholder="请选择"
                  popper-class="change-el-select-dropdown"
                >
                  <el-option key="all" label="全部" value=""> </el-option>
                  <el-option
                    v-for="item in options"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <label>是否在线</label>
                <el-select
                  style="width: 110px"
                  v-model="searchKey"
                  @change="changeNum"
                  placeholder="请选择"
                  popper-class="change-el-select-dropdown"
                >
                  <el-option key="all" label="全部" value=""> </el-option>
                  <el-option key="1" label="在线" value=""> </el-option>
                  <el-option key="2" label="离线" value=""> </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <label>设备状态</label>
                <el-select
                  style="width: 110px"
                  v-model="searchKey"
                  @change="changeNum"
                  placeholder="请选择"
                  popper-class="change-el-select-dropdown"
                >
                  <el-option key="all" label="全部" value=""> </el-option>
                  <el-option key="1" label="正常" value=""> </el-option>
                  <el-option key="2" label="故障" value=""> </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
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
              <el-table-column align="center" label="序号" prop="xh">
                <template slot-scope="scope">
                  <span class="colorc">{{ scope.row.xh }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="设备ID" prop="evel">
              </el-table-column>
              <el-table-column align="center" prop="time" label="设备名称">
              </el-table-column>
              <el-table-column align="center" prop="equipment" label="设备类型">
              </el-table-column>
              <el-table-column align="center" prop="position" label="设备位置">
              </el-table-column>

              <el-table-column align="center" prop="lx" label="厂家">
              </el-table-column>
              <el-table-column align="center" prop="lx" label="型号">
              </el-table-column>

              <el-table-column align="center" prop="lx" label="是否在线">
                <template slot-scope="scope">
                  <span class="colorc" v-if="scope.row.alarmType == '离线'"
                    >离线</span
                  >
                  <span v-if="scope.row.alarmType == '正常'">正常</span>
                </template>
              </el-table-column>

              <el-table-column align="center" prop="type" label="设备状态">
                <template slot-scope="scope">
                  <span
                    class="colorR1 colorC"
                    v-if="scope.row.alarmType == '故障'"
                    >故障</span
                  >
                  <span v-if="scope.row.alarmType == '正常'">正常</span>
                </template>
              </el-table-column>
              <el-table-column label="详情" align="center">
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
                            <el-tab-pane label="设备详情" name="first">
                              <el-form
                                ref="form"
                                :model="formDetail"
                                label-position="left"
                                label-width="100px"
                              >
                                <el-form-item label="设备ID">
                                  {{ formDetail.gdNumber }}
                                </el-form-item>
                                <el-form-item label="设备名称">
                                  {{ formDetail.gdNumber }}
                                </el-form-item>
                                <el-form-item label="设备类型">
                                  {{ formDetail.gdNumber }}
                                </el-form-item>
                                <el-form-item label="设备位置">
                                  {{ formDetail.gdNumber }}
                                </el-form-item>
                                <div class="lineSpan"></div>
                                <el-form-item label="出厂日期">
                                  {{ formDetail.issueTime }}
                                </el-form-item>
                                <el-form-item label="投运日期">
                                  {{ formDetail.planTime }}
                                </el-form-item>
                                <el-form-item label="上次维护日期">
                                  {{ formDetail.actualTime }}
                                </el-form-item>
                                <el-form-item label="累计运行时间">
                                  {{ formDetail.planTimeUse }}
                                </el-form-item>
                                <el-form-item label="厂家">
                                  {{ formDetail.actualTimeUse }}
                                </el-form-item>
                                <el-form-item label="型号">
                                  {{ formDetail.actualTimeUse }}
                                </el-form-item>

                                <div class="lineSpan"></div>
                                <el-form-item
                                  label="是否在线"
                                  class="statusForm"
                                >
                                  {{ formDetail.glAlarm }}
                                </el-form-item>
                                <el-form-item
                                  label="设备状态"
                                  class="statusForm"
                                >
                                  {{ formDetail.glAlarm }}
                                </el-form-item>
                              </el-form>
                            </el-tab-pane>
                            <el-tab-pane name="second" label="事件记录">
                              <div style="width: 670px">
                                <el-col :span="24" style="width: 670px">
                                  <label style="margin-left: 20px"
                                    >查询时段</label
                                  >
                                  <el-select
                                    style="width: 94px"
                                    v-model="selectType"
                                    placeholder="请选择"
                                    popper-class="change-el-select-dropdown"
                                  >
                                    <el-option key="1" label="日" value="date">
                                    </el-option>
                                    <el-option key="2" label="月" value="month">
                                    </el-option>
                                    <el-option key="3" label="年" value="year">
                                    </el-option>
                                  </el-select>
                                  <el-date-picker
                                    style="width: 180px"
                                    v-model="selectTime"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    :type="selectType"
                                    @change="getformLoad"
                                    popper-class="indexFifth-dropdown"
                                  >
                                  </el-date-picker>
                                </el-col>
                                <el-col
                                  :span="24"
                                  style="padding: 30px 0 0; width: 670px"
                                  class="tableBox"
                                >
                                  <el-table
                                    header-align="center"
                                    :data="tableData"
                                    style="width: 100%"
                                    :row-class-name="tableRowClassName"
                                  >
                                    <el-table-column
                                      align="center"
                                      label="序号"
                                      prop="xh"
                                    >
                                      <template slot-scope="scope">
                                        <span class="colorc">{{
                                          scope.row.xh
                                        }}</span>
                                      </template>
                                    </el-table-column>

                                    <el-table-column
                                      align="center"
                                      prop="time"
                                      label="时间"
                                    >
                                      <template slot-scope="scope">
                                        <span class="colorc">{{
                                          scope.row.time
                                        }}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      align="center"
                                      label="等级"
                                      prop="evel"
                                    >
                                      <template slot-scope="scope">
                                        <span
                                          class="colorR colorC"
                                          v-if="scope.row.evel == '应急'"
                                          >应急</span
                                        >
                                        <span
                                          class="colorY colorC"
                                          v-if="scope.row.evel == '告警'"
                                          >告警</span
                                        >
                                        <span
                                          class="colorY1 colorC"
                                          v-if="scope.row.evel == '预警'"
                                          >预警</span
                                        >
                                        <span
                                          class="colorR1 colorC"
                                          v-if="scope.row.evel == '故障'"
                                          >故障</span
                                        >
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      align="center"
                                      prop="lx"
                                      label="类型"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                      header-align="left"
                                      align="left"
                                      prop="describe"
                                      label="事件描述"
                                      show-overflow-tooltip
                                    >
                                    </el-table-column>
                                    <el-table-column
                                      align="center"
                                      prop="type"
                                      label="状态"
                                    >
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
                                  </el-table>
                                  <div class="paginationBox paginationBoxi">
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
                              </div>
                            </el-tab-pane>
                            <el-tab-pane name="third" label="设备维护记录">
                              <div style="width: 670px">
                                <el-col :span="24" style="width: 670px">
                                  <label style="margin-left: 20px"
                                    >查询时段</label
                                  >
                                  <el-select
                                    style="width: 94px"
                                    v-model="selectType"
                                    placeholder="请选择"
                                    popper-class="change-el-select-dropdown"
                                  >
                                    <el-option key="1" label="日" value="date">
                                    </el-option>
                                    <el-option key="2" label="月" value="month">
                                    </el-option>
                                    <el-option key="3" label="年" value="year">
                                    </el-option>
                                  </el-select>
                                  <el-date-picker
                                    style="width: 180px"
                                    v-model="selectTime"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    :type="selectType"
                                    @change="getformLoad"
                                    popper-class="indexFifth-dropdown"
                                  >
                                  </el-date-picker>
                                </el-col>

                                <el-col
                                  :span="24"
                                  style="padding: 30px 0 0; width: 670px"
                                  class="tableBox"
                                >
                                  <el-table
                                    header-align="center"
                                    :data="tableData"
                                    style="width: 100%"
                                    :row-class-name="tableRowClassName"
                                  >
                                    <el-table-column
                                      align="center"
                                      label="序号"
                                      prop="xh"
                                    >
                                      <template slot-scope="scope">
                                        <span class="colorc">{{
                                          scope.row.xh
                                        }}</span>
                                      </template>
                                    </el-table-column>

                                    <el-table-column
                                      align="center"
                                      prop="time"
                                      label="时间"
                                    >
                                      <template slot-scope="scope">
                                        <span class="colorc">{{
                                          scope.row.time
                                        }}</span>
                                      </template>
                                    </el-table-column>

                                    <el-table-column
                                      align="center"
                                      prop="lx"
                                      label="类型"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                      header-align="left"
                                      align="left"
                                      prop="describe"
                                      label="操作内容"
                                      show-overflow-tooltip
                                    >
                                    </el-table-column>
                                    <el-table-column
                                      align="center"
                                      prop="type"
                                      label="操作人"
                                    >
                                      2515210
                                    </el-table-column>
                                  </el-table>
                                  <div class="paginationBox paginationBoxi">
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
                              </div>
                            </el-tab-pane>
                          </el-tabs>
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
      </el-col>
      <el-col style="width: 420px; padding-left: 29px">
        <div style="margin-top: 70px"></div>
        <div class="right-box">
          <el-row>
            <el-col :span="12">
              <div class="boldText">全局统计数据</div>
              <div style="position: relative">
                <div
                  id="myChart1"
                  :style="{ width: '100%', height: '190px' }"
                ></div>
                <div class="img-text">
                  <img src="@/assets/index/Bg_shuliang.png" alt="" />
                  <span> 50 </span>
                </div>
              </div>

              <div
                style="text-align: center; margin-bottom: 20px; font-size: 14px"
              >
                <span class="color1 colorn"></span
                ><span class="colortext">监测设备在线率</span><span>86%</span>
              </div>
              <div
                style="text-align: center; margin-bottom: 20px; font-size: 14px"
              >
                <span class="color2 colorn"></span
                ><span class="colortext">监测设备离线率</span><span>86%</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="text-align: center">监测设备总数：{{ 560 }}</div>
              <div style="position: relative">
                <div
                  id="myChart2"
                  :style="{ width: '100%', height: '190px' }"
                ></div>
                <div class="img-text">
                  <img src="@/assets/index/Bg_shuliang.png" alt="" />
                  <span> 50 </span>
                </div>
              </div>
              <div
                style="text-align: center; margin-bottom: 20px; font-size: 14px"
              >
                <span class="color3 colorn"></span
                ><span class="colortext">监测设备正常率</span><span>86%</span>
              </div>
              <div
                style="text-align: center; margin-bottom: 20px; font-size: 14px"
              >
                <span class="color4 colorn"></span
                ><span class="colortext">监测设备故障率</span><span>86%</span>
              </div>
            </el-col>
          </el-row>
          <div class="lineSpan" style="margin-bottom: 20px"></div>
          <div class="boldText">监测设备类型统计</div>
          <div id="myChart3" :style="{ width: '100%', height: '380px' }"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "indexEight",
  data() {
    return {
      total: 0,
      currentPage: 1,
      tableData: [{}, {}, {}, {}],
      formDetail: {},
      apformDetail: {},
      activeName: "first",
      searchKey: "",
      options: [],
      state: "",
      selectType: "",
      selectTime: "",
      querySearchAsync: "",
    };
  },
  mounted() {
    this.drawLine1("myChart1", "rgba(216, 224, 255, 1)", 50, "在线设备数量");
    this.drawLine1("myChart2", "rgba(255, 159, 91, 1)", 80, "正常设备数量");
    this.drawLine2();
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.activeName, tab, event);
    },
    changeNum() {
      this.getAllList();
    },
    handleSelect(item) {
      console.log(item);
    },
    getformLoad() {},
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
      this.currentPage = val;
      this.getAllList();
    },
    drawLine2() {
      let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      myChart3.setOption({
        legend: {
          itemHeight: 6,
          itemWidth: 20,
          icon: "rect",
          bottom: 40,
          textStyle: {
            color: "#fff",
          },
        },
        color: ["rgba(91, 126, 255, 1)", "rgba(255, 159, 91, 1)"],
        grid: {
          x: 90,
          y: 20,
          x2: 10,
          y2: 70,
        },
        xAxis: {
          show: false,
          type: "value",
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          data: [
            "网关",
            "管道流量",
            "管道温度",
            "管道压力",
            "空气质量",
            "温湿度传感器",
            "液位计",
            "水浸传感器",
            "烟雾探测器",
            "无线测温",
            "智能电表",
          ],
          axisLine: {
            lineStyle: {
              color: "rgba(212, 212, 212, .4)",
            },
          },
          axisLabel: {
            textStyle: {
              color: "rgba(225, 225, 225, 1)",
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "正常",
            type: "bar",
            stack: "all",
            barWidth: 6,
            data: [5, 3, 8, 9, 3, 7, 7, 1, 3, 2, 5],
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#FFFFFF",
                    fontSize: 12,
                  },
                  offset: [-15, -15],
                },
              },
            },
          },
          {
            name: "故障",
            type: "bar",
            stack: "all",
            barWidth: 6,
            data: [3, 4, 5, 2, 1, 10, 6, 1, 1, 1, 1],
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#FFFFFF",
                    fontSize: 12,
                  },
                  offset: [-15, -15],
                },
              },
            },
          },
        ],
      });
    },
    drawLine1(chart, color, data, text) {
      let myChart1 = this.$echarts.init(document.getElementById(chart));
      var getmax = 100;
      //要改变的数据
      var getvalue = data;
      myChart1.setOption({
        grid: {
          top: 0,
          bottom: 0,
        },
        angleAxis: {
          show: false,
          max: (getmax * 360) / 270, //-45度到225度，二者偏移值是270度除360度
          type: "value",
          startAngle: 225, //极坐标初始角度
          splitLine: {
            show: false,
          },
        },
        barMaxWidth: 8, //圆环宽度
        radiusAxis: {
          show: false,
          type: "category",
        },
        //圆环位置和大小
        polar: {
          center: ["50%", "50%"],
          radius: "150%",
        },

        series: [
          {
            type: "bar",
            data: [
              {
                //上层圆环，显示数据
                value: getvalue,
                itemStyle: {
                  color: "rgba(91, 126, 255, 1)",
                },
              },
            ],
            barGap: "-100%", //柱间距离,上下两层圆环重合
            coordinateSystem: "polar",
            roundCap: true, //顶端圆角
            z: 3, //圆环层级，同zindex
          },
          {
            //下层圆环，显示最大值
            type: "bar",
            data: [
              {
                value: getmax,
                itemStyle: {
                  color: color,
                  opacity: 1,
                  borderWidth: 0,
                },
              },
            ],
            barGap: "-100%",
            coordinateSystem: "polar",
            roundCap: true,
            z: 1,
          },
          //仪表盘
          {
            type: "gauge",
            startAngle: 225, //起始角度，同极坐标
            endAngle: -45, //终止角度，同极坐标
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLabel: {
              show: false,
            },
            pointer: {
              // 分隔线
              shadowColor: "auto", //默认透明
              shadowBlur: 5,
              length: "50%",
              width: "2",
              show: false,
            },
            itemStyle: {
              color: "#1598FF",
              borderColor: "#1598FF",
              borderWidth: 6,
            },
            detail: {
              formatter: function (params) {
                // return '完成率\n'+getvalue + '%';
                return `{wcl|` + text + `}`;
              },
              rich: {
                number: {
                  fontSize: 25,
                  textAlign: "center",
                },
                wcl: {
                  fontSize: 14,
                  textAlign: "center",
                },
              },
              color: "rgba(225, 225, 225, 1)",
              lineHeight: 30,
              offsetCenter: ["0", "0"],
            },
            title: {
              show: false,
            },
            data: [
              {
                value: getvalue,
              },
            ],
          },
          {
            name: "外部刻度",
            type: "gauge",
            //  center: ['20%', '50%'],
            radius: "70%",
            min: 0, //最小刻度
            max: 100, //最大刻度
            splitNumber: 10, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(0,0,0,0)"]],
              },
            }, //仪表盘轴线
            axisLabel: {
              show: false,
              color: "#4d5bd1",
              distance: 25,
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 1,
              lineStyle: {
                color: "rgba(202, 213, 255, .4)", //用颜色渐变函数不起作用
                width: 3,
              },
              length: 3,
            }, //刻度样式
            splitLine: {
              show: false,
              length: -20,
              lineStyle: {
                color: "#C7CBCF", //用颜色渐变函数不起作用
              },
            }, //分隔线样式
            detail: {
              show: false,
            },
            pointer: {
              show: false,
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.indexEight-container {
  padding: 24px;
  .right-box {
    width: 392px;
    height: calc(100vh - 250px);
    background: rgba(91, 126, 255, 0.06);
    border-radius: 4px;
    box-sizing: border-box;
    padding: 22px 18px;
    color: rgba(255, 255, 255, 1);
    .boldText {
      font-weight: bold;
    }
  }
  .statusBox {
    label {
      color: rgba(206, 206, 206, 1);
      margin-right: 26px;
    }
  }
  .colorc {
    color: rgba(177, 177, 177, 1);
  }
  .colorn {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .color1 {
    border: 2px solid #5b7eff;
  }
  .color2 {
    border: 2px solid #d8e0ff;
  }
  .color3 {
    border: 2px solid #5b7eff;
  }
  .color4 {
    border: 2px solid #ff9f5b;
  }
  .colortext {
    color: rgba(225, 225, 225, 1);
    margin-right: 15px;
  }
  .img-text {
    text-align: center;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    bottom: 30px;
    width: 100%;
    height: 20px;
    img {
      display: inline-block;
      position: absolute;
      bottom: 0px;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
}
</style>
<style>
.paginationBox.paginationBoxi {
  position: static;
  padding-bottom: 0;
}
</style>