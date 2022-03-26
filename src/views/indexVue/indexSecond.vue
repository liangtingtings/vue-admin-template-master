<template>
  <div class="indexSecond-container">
    <el-row>
      <el-col :span="12">
        <label>抽屉开关</label>
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
        <label style="margin-left: 80px">预测参数</label>
        <el-select
          style="width: 150px"
          v-model="searchKey"
          placeholder="请选择"
          popper-class="change-el-select-dropdown"
        >
          <el-option key="1" label="电气基本量参数" value="day"> </el-option>
          <el-option key="2" label="电能质量参数" value="mouth"> </el-option>
          <el-option key="3" label="能耗参数" value="year"> </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div v-if="showbox1">
      <el-row style="width: 100%; height: calc(100vh - 160px)">
        <el-col :span="12" style="height: 50%">
          <div class="toptitle">
            <span
              @click="getList1(item)"
              v-for="item in list1"
              :class="spanActive == item ? 'spanActive' : ''"
              :key="item"
              >{{ item }}</span
            >
          </div>
          <div id="myChart" :style="{ width: '100%', height: '100%' }"></div>
        </el-col>
        <el-col :span="12"> </el-col>

        <el-col :span="12"> </el-col>
      </el-row>
    </div>
    <div v-if="showbox2">
      <el-row style="width: 100%; height: calc(100vh - 160px)">
        <el-col :span="8" style="height: 50%">
          <div class="toptitle">
            <span
              @click="getList1(item)"
              v-for="item in list1"
              :class="spanActive == item ? 'spanActive' : ''"
              :key="item"
              >{{ item }}</span
            >
          </div>
          <div id="myChart" :style="{ width: '100%', height: '100%' }"></div>
        </el-col>
        <el-col :span="8"> </el-col>
        <el-col :span="8"> </el-col>
        <el-col :span="8"> </el-col>
        <el-col :span="8"> </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexSecond",
  data() {
    return {
      showbox1: false,
      showbox2:true,
      spanActive: "今日三相电流预测",
      list1: ["今日三相电流预测", "本月三相电流预测"],
      options: [],
      searchKeytime: "",
      searchKey: "",
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    getList1(item) {
      this.spanActive = item;
    },
    //   能耗用电趋势
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));

      // 绘制图表
      let list0 = [
        {
          name: "00:00",
          value: 120,
        },
        {
          name: "02:00",
          value: 192,
        },
        {
          name: "04:00",
          value: 240,
        },
        {
          name: "06:00",
          value: 141,
        },
        {
          name: "08:00",
          value: 274,
          predict: true,
        },
        {
          name: "10:00",
          value: 230,
          predict: true,
        },
        {
          name: "12:00",
          value: 280,
          predict: true,
        },
      ];
      let list = [
        {
          name: "00:00",
          value: 220,
        },
        {
          name: "02:00",
          value: 182,
        },
        {
          name: "04:00",
          value: 220,
        },
        {
          name: "06:00",
          value: 191,
        },
        {
          name: "08:00",
          value: 234,
          predict: true,
        },
        {
          name: "10:00",
          value: 330,
          predict: true,
        },
        {
          name: "12:00",
          value: 210,
          predict: true,
        },
      ];
      let list2 = [
        {
          name: "00:00",
          value: 124,
        },
        {
          name: "02:00",
          value: 111,
        },
        {
          name: "04:00",
          value: 111,
        },
        {
          name: "06:00",
          value: 223,
        },
        {
          name: "08:00",
          value: 231,
          predict: true,
        },
        {
          name: "10:00",
          value: 212,
          predict: true,
        },
        {
          name: "12:00",
          value: 332,
          predict: true,
        },
      ];
      let list3 = [
        {
          name: "00:00",
          value: 123,
        },
        {
          name: "02:00",
          value: 443,
        },
        {
          name: "04:00",
          value: 221,
        },
        {
          name: "06:00",
          value: 332,
        },
        {
          name: "08:00",
          value: 223,
          predict: true,
        },
        {
          name: "10:00",
          value: 356,
          predict: true,
        },
        {
          name: "12:00",
          value: 145,
          predict: true,
        },
      ];

      let data = [];
      let data0 = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];
      let data4 = [];
      let data5 = [];
      let data6 = [];
      list0.forEach((item) => {
        if (item.predict) {
          data0.push([item.name, item.value]);
        } else {
          data.push([item.name, item.value]);
        }
      });

      list.forEach((item) => {
        if (item.predict) {
          data2.push([item.name, item.value]);
        } else {
          data1.push([item.name, item.value]);
        }
      });
      list2.forEach((item) => {
        if (item.predict) {
          data4.push([item.name, item.value]);
        } else {
          data3.push([item.name, item.value]);
        }
      });
      list3.forEach((item) => {
        if (item.predict) {
          data6.push([item.name, item.value]);
        } else {
          data5.push([item.name, item.value]);
        }
      });

      // 如果是折线图，此处需要追加实际数据的最后一组数据，如果是柱状图，则不需要。
      data0.unshift(data[data.length - 1]);
      data2.unshift(data1[data1.length - 1]);
      data4.unshift(data3[data3.length - 1]);
      data6.unshift(data5[data5.length - 1]);

      let labels = list.map((m) => {
        return m.name;
      });
      let that = this;
      myChart.setOption({
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: labels,
          axisLabel: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 12,
            color: "rgba(212, 212, 212, 1)",
          },
        },
        yAxis: {
          name: "(A)",
          type: "value",
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(91, 126, 255, .2)",
              type: "dashed",
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontFamily: "MicrosoftYaHei",
              fontSize: 12,
              color: "rgba(212, 212, 212, 1)",
            },
          },
          axisTick: {
            show: false,
          },
        },
        legend: {
          bottom: 0,
          icon: "rect",
          itemWidth: 16,
          itemHeight: 4,
          itemGap: 15,
          textStyle: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 14,
            color: "rgba(255, 255, 255, 1)",
          },
          data: ["功率总值", "A相电流", "B相电流", "C相电流"],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "rgba(113, 113, 113, 1)",
            },
          },
          backgroundColor: "rgba(13, 14, 16, .76)",
          borderColor: "transparent",
          formatter: function (params) {
            console.log(params);
            let colors = [
              "rgba(65, 181, 164, 1)",
              "rgba(112, 234, 255, 1)",
              "rgba(132, 172, 255, 1)",
            ];
            let returnData = '<div style="padding: 5px 10px;">';
            if (params.length == 6) {
              params = params.filter((item, index) => index % 2 !== 0);
            }

            for (let i = 0; i < params.length; i++) {
              returnData +=
                '<span style="display:inline-block; width:20px; height:8px; margin-right:5px; border-radius:1px; background-color:' +
                colors[i] +
                '"></span>';
              returnData +=
                '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: ' +
                colors[i] +
                '">' +
                params[i].seriesName +
                '：</span><span style="font-family: Verdana; font-size: 14px; color: ' +
                colors[i] +
                '">' +
                params[i].value[1] +
                '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: ' +
                colors[i] +
                '">A</span><br/>';
            }
            returnData +=
              "<br><div style='text-align:right;color:#fff'>当天 " +
              params[0].axisValue +
              "</div></div>";
            return returnData;
          },
        },

        series: [
          {
            name: "功率总值",
            type: "line",
            smooth: false,
            symbolSize: 15,
            symbol: "circle",
            showAllSymbol: true,
            lineStyle: {
              color: "rgba(255, 246, 173, 1)",
              width: 2,
            },
            itemStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255, 246, 173, 1)", //中心颜色
                  },
                  {
                    offset: 0.4,
                    color: "rgba(255, 246, 173, 1)",
                  },
                  {
                    offset: 0.5,
                    color: "#ffffff00",
                  },
                  {
                    offset: 1,
                    color: "#ffffff00",
                  },
                ],
              },
              borderColor: "rgba(255, 246, 173, 1)",
              borderWidth: 2,
            },
            data: data,
          },
          {
            name: "功率总值预测",
            type: "line",
            lineStyle: {
              type: "dashed",
              color: "rgba(255, 246, 173, 1)",
              width: 2,
              shadowColor: "rgba(255, 246, 173, .8)",
              shadowBlur: 5,
              shadowOffsetY: 2,
            },
            symbol: "none",
            data: data0,
            smooth: false,
            symbolSize: 15,
            symbol: "circle",
            showAllSymbol: true,
            itemStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255, 246, 173, 1)", //中心颜色
                  },
                  {
                    offset: 0.4,
                    color: "rgba(255, 246, 173, 1)",
                  },
                  {
                    offset: 0.5,
                    color: "#ffffff00",
                  },
                  {
                    offset: 1,
                    color: "#ffffff00",
                  },
                ],
              },
              borderColor: "rgba(255, 246, 173, 1)",
              borderWidth: 2,
            },
          },
          {
            name: "A相电流",
            type: "line",
            smooth: true,
            data: data1,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 0,
            lineStyle: {
              color: "rgba(65, 181, 164, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(65, 181, 164, .6)",
              borderColor: "rgba(65, 181, 164, .6)",
              borderWidth: 3,
            },
            areaStyle: {
              normal: {
                color: new that.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(65, 181, 164, .6)",
                    },
                    {
                      offset: 1,
                      color: "rgba(65, 181, 164, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(65, 181, 164, .6)",
                shadowBlur: 20,
              },
            },
          },
          {
            name: "A相电流预测",
            type: "line",
            smooth: true,
            lineStyle: {
              type: "dashed",
              color: "rgba(65, 181, 164, 1)",
              width: 2,
              shadowColor: "rgba(65, 181, 164, .8)",
              shadowBlur: 5,
              shadowOffsetY: 2,
            },
            symbol: "none",
            data: data2,
          },
          {
            name: "B相电流",
            type: "line",
            smooth: true,
            data: data3,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 0,
            lineStyle: {
              color: "rgba(88, 143, 255, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(88, 143, 255, .6)",
              borderColor: "rgba(88, 143, 255, .6)",
              borderWidth: 3,
            },
            areaStyle: {
              normal: {
                color: new that.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(88, 143, 255, .6)",
                    },
                    {
                      offset: 1,
                      color: "rgba(88, 143, 255, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(88, 143, 255, .6)",
                shadowBlur: 20,
              },
            },
          },
          {
            name: "B相电流预测",
            type: "line",
            smooth: true,
            lineStyle: {
              type: "dashed",
              color: "rgba(88, 143, 255, 1)",
              width: 2,
              shadowColor: "rgba(88, 143, 255, .8)",
              shadowBlur: 5,
              shadowOffsetY: 2,
            },
            symbol: "none",
            data: data4,
          },
          {
            name: "C相电流",
            type: "line",
            smooth: true,
            data: data5,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 0,
            lineStyle: {
              color: "rgba(132, 172, 255, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(132, 172, 255, .6)",
              borderColor: "rgba(132, 172, 255, .6)",
              borderWidth: 3,
            },
            areaStyle: {
              normal: {
                color: new that.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(132, 172, 255, .6)",
                    },
                    {
                      offset: 1,
                      color: "rgba(132, 172, 255, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(132, 172, 255, .6)",
                shadowBlur: 20,
              },
            },
          },
          {
            name: "C相电流预测",
            type: "line",
            smooth: true,
            lineStyle: {
              type: "dashed",
              color: "rgba(132, 172, 255, 1)",
              width: 2,
              shadowColor: "rgba(132, 172, 255, .8)",
              shadowBlur: 5,
              shadowOffsetY: 2,
            },
            symbol: "none",
            data: data6,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.indexSecond-container {
  padding: 24px;
  label {
    color: rgba(206, 206, 206, 1);
    margin-right: 20px;
  }
  .toptitle {
    width: 100%;
    color: rgba(206, 206, 206, 1);
    border-bottom: 1px solid rgba(91, 126, 255, 0.3);
    padding: 30px 0 15px;
    text-align: center;
    margin-bottom: 10px;
    span {
      margin: 10px;
      cursor: pointer;
      position: relative;
      font-size: 14px;
    }
    span.spanActive::before {
      content: "";
      display: block;
      width: 80px;
      height: 6px;
      border-radius: 4px;
      background: rgba(91, 126, 255, 1);
      position: absolute;
      bottom: -16px;
      left: 0;
      right: 0;
      margin: auto;
    }
    span.spanActive {
      font-weight: 500;
      color: #ffffff;
      font-size: 16px;
    }
  }
}
</style>
