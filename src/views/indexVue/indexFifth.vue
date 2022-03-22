<template>
  <div class="indexFifth-container">
    <el-row>
      <el-col :span="12" :offset="2">
        <label>查询时段</label>
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
          style="width: 260px"
          v-model="value1"
          type="date"
          popper-class="indexFifth-dropdown"
        >
        </el-date-picker>
        <label style="margin-left: 80px">间隔时间</label>
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
      </el-col>
      <el-col :span="10" class="statusBox">
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
    <el-row style="margin-top: 30px">
      <el-col :span="4" :offset="2">
        <div>
          <label style="vertical-align: top; line-height: 42px">点位一</label>
          <span style="width: 190px; display: inline-block">
            <el-input
              placeholder="请输入内容"
              suffix-icon="el-icon-caret-bottom"
              v-model="input1"
              @focus="showNextList()"
            >
            </el-input>
            <!-- v-show="ulList" -->
            <div>
              <ul class="listUlbox">
                <li
                  :class="
                    item.value == showThirdActive ? 'showThirdActive' : ''
                  "
                  @click="showListSecond(item)"
                  v-for="item in optionsList"
                  :key="item"
                >
                  {{ item.label }}
                  <div
                    v-show="item.value == showThirdActive ? true : false"
                    class="showThird"
                  >
                    <el-collapse v-model="activeName" accordion>
                      <el-collapse-item
                        :title="item1.label"
                        :name="index + 1"
                        v-for="(item1, index) in item.children"
                        :key="item1"
                      >
                        <div v-for="item2 in item1.list" :key="item2">
                          {{ item2.label }}
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </li>
              </ul>
            </div>
          </span>
        </div>
        <div>
          <label style="vertical-align: top; line-height: 42px">点位二</label>
          <span style="width: 190px; display: inline-block">
            <el-input
              placeholder="请输入内容"
              suffix-icon="el-icon-caret-bottom"
              v-model="input1"
              @focus="showNextList()"
            >
            </el-input>
            <!-- v-show="ulList" -->
            <div>
              <ul class="listUlbox">
                <li
                  :class="
                    item.value == showThirdActive ? 'showThirdActive' : ''
                  "
                  @click="showListSecond(item)"
                  v-for="item in optionsList"
                  :key="item"
                >
                  {{ item.label }}
                  <div
                    v-show="item.value == showThirdActive ? true : false"
                    class="showThird"
                  >
                    <el-collapse v-model="activeName" accordion>
                      <el-collapse-item
                        :title="item1.label"
                        :name="index + 1"
                        v-for="(item1, index) in item.children"
                        :key="item1"
                      >
                        <div v-for="item2 in item1.list" :key="item2">
                          {{ item2.label }}
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </li>
              </ul>
            </div>
          </span>
        </div>
      </el-col>
      <el-col
        :span="18"
        style="border-left: 1px solid rgba(255, 255, 255, 0.2)"
      >
        <div style="position: relative">
          <div style="width: 1000px; height: 500px" id="myChart1"></div>
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
export default {
  name: "indexFifth",
  data() {
    return {
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
            name: "单位（万）",
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
            name: "单位（万）",
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
            data: [44, 52, 3, 23, 455, 81, 32, 130, 219, 208, 303, 253],
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
            data: [0, 0, 6, 23, 45, 71, 112, 160, 219, 288, 363, 453],
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
  left: 1000px;
  bottom: 50px;
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
.listUlbox {
  background: rgba(91, 126, 255, 0.15);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px 12px;
  position: relative;
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    margin-bottom: 5px;
    border-radius: 4px;
    background: url("../../assets/index/Button_biaoji_Normal.png") no-repeat;
    background-size: 100% 100%;
    color: rgba(210, 210, 210, 1);
    box-sizing: border-box;
    padding-left: 30px;
    width: 166px;
  }
  li.showThirdActive {
    background: url("../../assets/index/Button_biaoji_Selected.png") no-repeat;
    color: #fff;
    position: relative;
  }
  li.showThirdActive:before {
    content: "";
    width: 0;
    height: 0;
    border-top: 11px solid transparent;
    border-right: 10px solid rgba(91, 126, 255, 0.6);
    border-bottom: 11px solid transparent;
    display: block;
    position: absolute;
    top: 7px;
    right: -6px;
  }
}
.el-icon-arrow-right:before {
  content: "";
}
.showThird {
  position: absolute;
  top: 0;
  left: 172px;
  .el-collapse {
    border: 0px;
  }
  .el-collapse-item {
    border: 1px solid rgba(91, 126, 255, 0.6);

    background: rgba(91, 126, 255, 0.3);
    width: 295px;
    border-radius: 4px;
  }
  .el-collapse-item__header {
    background: rgba(23, 39, 90, 0.5);
    padding: 0px 10px;
    color: #fff;
    border: 0px;
    // border: 1px solid rgba(91, 126, 255, 0.6);
  }
  .el-collapse-item__wrap {
    background: none;
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
</style>
