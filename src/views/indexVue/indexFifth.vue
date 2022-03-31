<template>
  <div class="indexFifth-container">
    <el-row style="margin-top: 30px">
      <el-col :span="8">
        <div>
          <span>
            <label>点位选择（ * 最多可选四个参数 ）</label>
            <label style="float: right">当前已选参数{{}}</label>
            <div class="listsBox">
              <ul class="listUlbox">
                <label style="display: block; margin-bottom: 14px">类型</label>
                <li
                  class="showCircle"
                  :class="
                    item.value == showThirdActive ? 'showThirdActive' : ''
                  "
                  @click="showListSecond(item)"
                  v-for="item in optionsList"
                  :key="item"
                >
                  {{ item.label }}
                </li>
              </ul>
              <div class="showThird">
                <label style="display: block; margin-bottom: 16px">点位</label>
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item
                    :title="item.label"
                    :name="index + 1"
                    v-for="(item, index) in optionsList"
                    :key="item"
                  >
                    <div
                      v-for="item2 in item.children"
                      :key="item2"
                      :class="
                        item2.value == showSecondActive
                          ? 'showSecondActive'
                          : ''
                      "
                      @click="showSecondActive = item2.value"
                    >
                      {{ item2.label }}
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <span
                class="statusBox"
                style="display: inline-block; width: 140px; padding-left: 5px"
              >
                <label
                  style="display: block; margin-left: 16px; margin-bottom: 14px"
                  >参数</label
                >
                <span
                  @click="checkStatus(index, item)"
                  :class="item.ischeck == true ? 'checkActive' : ''"
                  v-for="(item, index) in statusList"
                  :key="item.key"
                  >{{ item.name }}
                  <i v-if="item.ischeck" class="el-icon-check"></i
                ></span>
              </span>
            </div>
            <div class="uploadBtn">
              <div>
                <img src="@/assets/index/Icon_daochu.png" alt="" />
                <span>导出数据报表</span>
              </div>
            </div>
          </span>
        </div>
      </el-col>
      <el-col
        :span="16"
        style="border-left: 1px solid rgba(255, 255, 255, 0.2)"
      >
        <div>
          <label style="margin-left: 20px">查询时段</label>
          <el-select
            style="width: 94px"
            v-model="searchKeydate"
            placeholder="请选择"
            popper-class="change-el-select-dropdown"
          >
            <el-option key="1" label="日" value="day"> </el-option>
            <el-option key="2" label="月" value="mouth"> </el-option>
            <el-option key="3" label="年" value="year"> </el-option>
          </el-select>
          <el-date-picker
            style="width: 180px"
            v-model="value1"
            type="date"
            popper-class="indexFifth-dropdown"
          >
          </el-date-picker>
          <label style="margin-left: 60px">间隔时间</label>
          <el-select
            v-model="searchKeytime"
            placeholder="请选择"
            style="width: 140px"
            popper-class="change-el-select-dropdown"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <label style="margin-left: 60px">状态</label>
          <span class="statusBox">
            <span
              @click="checkStatus(index, item)"
              :class="item.ischeck == true ? 'checkActive' : ''"
              v-for="(item, index) in statusList"
              :key="item.key"
              >{{ item.name }} <i v-if="item.ischeck" class="el-icon-check"></i
            ></span>
          </span>
        </div>
        <div style="position: relative">
          <div style="width: 100%; height: 600px" id="myChart1"></div>
          <div class="doBtn">
            <div>
              <img src="@/assets/index/Icon_quyufangda.png" alt="" /> 区域放大
            </div>
            <div>
              <img src="@/assets/index/Icon_houtui.png" alt="" /> 后退一步
            </div>
            <div>
              <img src="@/assets/index/Icon_huifu.png" alt="" /> 恢复初始状态
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "indexFifth",
  data() {
    return {
      showSecondActive:"",
      thirdList: [],
      showThirdActive: "",
      showThirdBtn: false,
      value1: "",
      input1: "",
      // ulList: false,
      activeName: "",
      optionsList: [
        {
          value: "zhinan111",
          label: "指南1",
          children: [
            {
              value: "shejiyuan1ze",
              label: "指南111",
              list: [
                {
                  value: "3",
                  label: "222222",
                },
                {
                  value: "4",
                  label: "67567",
                },
              ],
            },
            {
              value: "shejiy2uanze",
              label: "指南22",
              list: [
                {
                  value: "4",
                  label: "指南4444",
                },
              ],
            },
          ],
        },
        {
          value: "5",
          label: "指南3",
          children: [
            {
              value: "shejiyu3anze",
              label: "指南33",
            },
          ],
        },
      ],
      searchKeydate: "",
      searchKeytime: "",
      options: [
        { value: "30", label: "30分钟" },
        { value: "1", label: "1个小时" },
      ],
      statusCheckList: [
        { name: "最值", key: 1, ischeck: true },
        { name: "平均值", key: 2, ischeck: true },
        { name: "打点显示", key: 3, ischeck: true },
      ],
      statusList: [
        { name: "最值", key: 1, ischeck: true },
        { name: "平均值", key: 2, ischeck: true },
        { name: "打点显示", key: 3, ischeck: true },
      ],
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart1.getZr().on("mousedown", function (param) {
        console.log(param, "1");
        document.createElement("div");
      });
      myChart1.getZr().on("mouseup", function (param) {
        console.log(param, "2");
      });
      let that = this;
      myChart1.setOption({
        grid: {
          top: 100,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        legend: {
          data: [{ name: "点位一" }, { name: "点位二" }],
          textStyle: {
            color: "#ffffff",
            fontSize: 11,
          },
          y: "bottom",
          x: "center",
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "rgba(212, 212, 212, .4)",
                width: 1,
              },
            },
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              interval: 0, //横轴信息全部显示
              textStyle: {
                color: "#fff",
              },
              fontSize: 11,
              // rotate:45,//度角倾斜显示
              formatter: function (value) {
                return value.length > 5 ? value.substring(0, 5) + "..." : value;
              },
            },
          },
        ],
        yAxis: [
          //这里配置两条Y轴
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(91, 126, 255, .1)",
                width: 1,
              },
            },
            axisLine: {
              lineStyle: {
                color: "#1F7EFF",
                width: 1,
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(213, 213, 213, 1)",
              },
              fontSize: 11,
              interval: "auto",
              formatter: "{value}",
            },
            name: "(V) / (A)",
            nameTextStyle: {
              color: "rgba(213, 213, 213, 1)",
            },
          },
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(91, 126, 255, .1)",
                width: 1,
              },
            },
            axisLine: {
              lineStyle: {
                color: "#1F7EFF",
                width: 1,
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(213, 213, 213, 1)",
              },
              fontSize: 11,
              interval: "auto",
              formatter: "{value}",
            },
            name: "(V) / (A)",
            nameTextStyle: {
              color: "rgba(213, 213, 213, 1)",
              fontSize: 11,
            },
          },
        ],
        series: [
          {
            name: "点位一",
            barWidth: "30%",
            type: "line",
            lineStyle: {
              width: 2,
              color: "rgba(91, 143, 249, 1)",
              shadowColor: "rgba(91, 143, 249, .8)",
              shadowBlur: 5,
              shadowOffsetY: 5,
            },
            itemStyle: {
              normal: {
                fontSize: 11,
                color: "rgba(91, 143, 249, 1)",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 1)",
              },
            },
            symbolSize: 5,
            symbol: "circle",
            smooth: true,
            // showSymbol: false,
            yAxisIndex: 0, ////使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
            data: [77, 471, 140, 175, 455, 574, 145, 130, 219, 208, 303, 253],
            markPoint: {
              symbol:
                "image://" + require("@/assets/index/Icon_zuizhi_lan.png"),
              symbolSize: [25, 30],
              symbolOffset: [0, -12],
              label: {
                formatter: function (params) {
                  console.log(params);
                  return (
                    (params.name == "Max"
                      ? "(最大值)"
                      : params.name == "Min"
                      ? "(最小值)"
                      : params.name) +
                    "\n\n" +
                    params.value
                  );
                },
                position: [12, -55],
                backgroundColor: "rgba(13, 14, 16, .76)",
                padding: 10,
                width: 70,
                color: "#fff",
                borderRadius: 4,
                align: "center",
              },
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
                {
                  name: "点位一",
                  yAxis: "130",
                  xAxis: "8月",
                  value: "130",
                  label: {
                    color: "rgba(91, 143, 249, 1)",
                  },
                },
              ],
            },

            markLine: {
              data: [{ type: "average", name: "Avg" }],
              label: {
                color: "rgba(91, 143, 249, 1)",
                position: "insideStartTop",
                formatter: function (params) {
                  return "平均值：" + params.value;
                },
                fontWeight: "bold",
                fontSize: 14,
              },
            },
          },
          {
            name: "点位二",
            barWidth: "30%",
            type: "line",
            lineStyle: {
              width: 2,
              color: "rgba(90, 216, 166, 1)",
              shadowColor: "rgba(90, 216, 166, .8)",
              shadowBlur: 5,
              shadowOffsetY: 5,
            },
            itemStyle: {
              normal: {
                fontSize: 11,
                color: "rgba(90, 216, 166, 1)",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 1)",
              },
            },
            symbolSize: 5,
            symbol: "circle",
            smooth: true,
            // showSymbol: false,
            yAxisIndex: 1, ////使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
            data: [146, 66, 46, 77, 45, 71, 112, 160, 219, 288, 363, 453],
            markPoint: {
              symbol: "image://" + require("@/assets/index/Icon_zuizhi_lv.png"),
              symbolSize: [25, 30],
              symbolOffset: [0, -12],
              label: {
                formatter: function (params) {
                  console.log(params);
                  return (
                    "(最" +
                    (params.name == "max" ? "大" : "小") +
                    "值)\n\n" +
                    params.value
                  );
                },
                position: [12, -55],
                backgroundColor: "rgba(13, 14, 16, .76)",
                padding: 10,
                width: 70,
                color: "#fff",
                borderRadius: 4,
                align: "center",
              },
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
              label: {
                color: "rgba(91, 143, 249, 1)",
                position: "insideStartTop",
                formatter: function (params) {
                  return "平均值：" + params.value;
                },
                fontWeight: "bold",
                fontSize: 14,
              },
            },
          },
        ],
      });
    },
    // showNextList() {
    //   console.log(1111);
    //   this.ulList = true;
    // },
    showListSecond(item) {
      this.showThirdActive = item.value;
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
    },
  },
};
</script>

<style lang="scss">
.doBtn {
  position: absolute;
  right: 50px;
  bottom: -60px;
  div {
    cursor: pointer;
    width: 132px;
    height: 34px;
    line-height: 34px;
    background: rgba(91, 126, 255, 0.3);
    border-radius: 4px;
    border: 1px solid rgba(91, 126, 255, 0.3);
    color: #fff;
    font-size: 14px;
    margin-bottom: 24px;
    text-align: center;
    float: left;
    margin-right: 20px;
    img {
      vertical-align: middle;
      margin-right: 5px;
      display: inline-block;
    }
  }
  div:hover {
    background: rgba(91, 126, 255, 0.6);
    border: 1px solid rgba(91, 126, 255, 0.3);
  }
}
.uploadBtn {
  margin-right: 20px;
  float: right;
  width: 220px;
  text-align: center;
  height: 36px;
  line-height: 36px;
  color: rgba(171, 189, 255, 0.45);
  font-size: 14px;
  background: rgba(91, 126, 255, 0.2);
  div {
    background: rgba(255, 255, 255, 0.1);
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  border-radius: 4px;
  img,
  span {
    vertical-align: middle;
    display: inline-block;
    margin: 0px 2px;
  }
}
.listsBox {
  background: rgba(91, 126, 255, 0.06);
  height: 550px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px 12px;
  position: relative;
  margin: 20px 20px 20px 0px;
  .statusBox {
    margin-top: 14px;
    box-sizing: border-box;
  }
  .statusBox span {
    margin-bottom: 10px;
  }
}
.listUlbox {
  // background: rgba(91, 126, 255, 0.06);
  display: inline-block;
  width: 120px;
  border-right: 1px dashed rgba(255, 255, 255, 0.3);
  margin-right: 14px;
  padding: 0px;
  vertical-align: top;
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    margin-bottom: 10px;
    border-radius: 4px;
    background: rgba(91, 126, 255, 0.3);
    background-size: 100% 100%;
    color: rgba(210, 210, 210, 1);
    box-sizing: border-box;
    padding-left: 10px;
    width: 106px;
  }
  .showCircle::before {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(91, 126, 255, 0.3);
    display: inline-block;
  }
  .showCircle.showThirdActive {
    color: #fff;
    border: 1px solid rgba(91, 126, 255, 0.6);
    position: relative;
  }
  .showCircle.showThirdActive::before {
    background: rgba(91, 126, 255, 1);
  }
  .showCircle.showThirdActive::after {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    display: inline-block;
    position: absolute;
    left: 13px;
    top: 14px;
  }
  // li.showThirdActive:before {
  //   content: "";
  //   width: 0;
  //   height: 0;
  //   border-top: 11px solid transparent;
  //   border-right: 10px solid rgba(91, 126, 255, 0.6);
  //   border-bottom: 11px solid transparent;
  //   display: block;
  //   position: absolute;
  //   top: 7px;
  //   right: -6px;
  // }
}
.el-icon-arrow-right:before {
  content: "";
}
.showThird {
  display: inline-block;

  border-right: 1px dashed rgba(255, 255, 255, 0.3);
  vertical-align: top;
  margin-top: 14px;
  box-sizing: border-box;
  padding-right: 14px;
  .el-collapse {
    border: 0px;
  }
  .el-collapse-item {
    border: 1px solid rgba(91, 126, 255, 0.6);
    // background: rgba(91, 126, 255, 0.3);
    width: 280px;
    border-radius: 4px;
  }
  .el-collapse-item__header {
    background: rgba(91, 126, 255, 0.3);
    padding: 0px 10px;
    color: #fff;
    border: 0px;
    height: 36px;
    line-height: 36px;
    position: relative;
    // border: 1px solid rgba(91, 126, 255, 0.6);
  }
  .el-collapse-item__header.is-active::before {
    background: rgba(91, 126, 255, 1);
  }
  .el-collapse-item__header::before {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(91, 126, 255, 0.3);
    display: inline-block;
    margin-right: 5px;
  }
  .el-collapse-item__header.is-active::after {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    display: inline-block;
    position: absolute;
    left: 13px;
    top: 15px;
  }
  .el-collapse-item__wrap {
    background: rgba(91, 126, 255, 0.13);
    border: 0px;
  }
  .el-collapse-item__content {
    padding-bottom: 0px;
    div {
      height: 36px;
      line-height: 36px;
      padding: 0px 10px;
      box-sizing: border-box;
      color: #fff;
      background: rgba(91, 126, 255, 0.3);
      margin: 10px;
      border-radius: 4px;
      position: relative;
      cursor: pointer;
    }

    div.showSecondActive::before {
      background: rgba(91, 126, 255, 1);
    }
    div::before {
      content: "";
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(91, 126, 255, 0.3);
      display: inline-block;
      margin-right: 5px;
    }
    div.showSecondActive::after {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #fff;
      display: inline-block;
      position: absolute;
      left: 13px;
      top: 13px;
    }
    div:hover {
      background: rgba(91, 126, 255, 0.4);
    }
  }
}
.indexFifth-container {
  padding-top: 5%;
  label {
    color: rgba(206, 206, 206, 1);
    margin-right: 20px;
  }
}
.el-picker-panel.indexFifth-dropdown .el-picker-panel__body-wrapper,
.el-picker-panel.indexFifth-dropdown .el-picker-panel__footer {
  background: none;
}

.indexFifth-container .statusBox span {
  width: 120px;
}
</style>
