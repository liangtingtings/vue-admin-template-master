<template>
  <div class="indexSecond-container">
    <el-row>
      <el-col :span="24">
        <label>变压器编号</label>
        <el-select
          @change="getStart1"
          v-model="searchKey1"
          placeholder="请选择"
          style="width: 140px"
          popper-class="change-el-select-dropdown"
        >
          <el-option
            v-for="item in options1"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <label style="margin-left: 80px">配电柜编号</label>
        <el-select
          @change="getStart2"
          v-model="searchKey2"
          placeholder="请选择"
          style="width: 140px"
          popper-class="change-el-select-dropdown"
        >
          <el-option
            v-for="item in options2"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <label style="margin-left: 80px">抽屉开关</label>
        <el-select
          v-model="searchKey3"
          placeholder="请选择"
          style="width: 140px"
          popper-class="change-el-select-dropdown"
        >
          <el-option
            v-for="item in options3"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <label style="margin-left: 80px">预测参数</label>
        <el-select
          style="width: 150px"
          v-model="searchKey4"
          placeholder="请选择"
          popper-class="change-el-select-dropdown"
        >
          <el-option
            v-for="item in options4"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div v-if="showbox1">
      <el-row style="width: 100%; height: calc(100vh - 190px)">
        <el-col
          :span="12"
          style="height: 50%; padding:0px 20px; box-sizing: border-box"
        >
          <div class="toptitle">
            <span
              @click="getList1(item)"
              v-for="item in list1"
              :class="spanActive == item ? 'spanActive' : ''"
              :key="item"
              >{{ item }}</span
            >
          </div>
          <div id="myChart1" :style="{ width: '100%', height: '90%' }"></div>
        </el-col>
        <el-col
          :span="12"
          style="box-sizing: border-box; height: 50%; padding:0px 20px"
        >
          <div class="toptitle">
            <span
              @click="getList2(item)"
              v-for="item in list2"
              :class="spanActive2 == item ? 'spanActive' : ''"
              :key="item"
              >{{ item }}</span
            >
          </div>
          <div id="myChart2" :style="{ width: '100%', height: '90%' }"></div>
        </el-col>

        <el-col
          :span="12"
          style="height: 50%; padding: 20px; box-sizing: border-box"
        >
          <div class="toptitle">
            <span
              @click="getList3(item)"
              v-for="item in list3"
              :class="spanActive3 == item ? 'spanActive' : ''"
              :key="item"
              >{{ item }}</span
            >
          </div>
          <div id="myChart3" :style="{ width: '100%', height: '90%' }"></div>
        </el-col>
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
          <div id="myCharts" :style="{ width: '100%', height: '100%' }"></div>
        </el-col>
        <el-col :span="8"> </el-col>
        <el-col :span="8"> </el-col>
        <el-col :span="8"> </el-col>
        <el-col :span="8"> </el-col>
      </el-row>
    </div>

    <div v-if="showbox3">
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
          <div id="myChartb" :style="{ width: '100%', height: '100%' }"></div>
        </el-col>
        <el-col :span="12"> </el-col>
        <el-col :span="12"> </el-col>
      </el-row>
    </div>
    <div v-if="showbox4">
      <div style="width: 1300px; height: 550px; margin: 0 auto">
        <!-- <div class="xBox">
          <span v-for="item in hourDatas" :key="item">{{ item }}</span>
        </div> -->
        <div id="myChartD" :style="{ width: '100%', height: '100%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInitTrendList, trendList } from "@/api/indexSecond";
export default {
  name: "indexSecond",
  data() {
    return {
      hourDatas: [
        "0:00",
        "1:00",
        "2:00",
        "3:00",
        "4:00",
        "5:00",
        "6:00",
        "7:00",
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ],
      showbox1: true,
      showbox2: false,
      showbox3: false,
      showbox4: false,
      spanActive: "今日三相电流预测",
      list1: ["今日三相电流预测", "本月三相电流预测"],
      spanActive2: "今日三相有功功率预测",
      list2: ["今日三相有功功率预测", "本月三相有功功率预测"],
      spanActive3: "今日三相功率因数预测",
      list3: ["今日三相功率因数预测", "本月三相功率因数预测"],
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      searchKey1: "",
      searchKey2: "",
      searchKey3: "",
      searchKey4: "",
      datalistold0: [],
      datalistyc0: [],
    };
  },
  mounted() {
    getInitTrendList({
      byqNumber: this.searchKey1,
      pdgNumber: this.searchKey2,
    }).then((res) => {
      this.options1 = res.byqNumber;
      this.searchKey1 = this.options1[0];
      this.options4 = res.ycCs;
      getInitTrendList({
        byqNumber: this.searchKey1,
        pdgNumber: this.searchKey2,
      }).then((res) => {
        this.options2 = res.pdgNumber;
        this.searchKey2 = this.options2[0];
        this.options3 = res.ct;
        getInitTrendList({
          byqNumber: this.searchKey1,
          pdgNumber: this.searchKey2,
        }).then((res) => {
          this.options3 = res.ct;
          this.searchKey3 = this.options3[0];
          this.searchKey4 = this.options4[0];
          this.gettrendList();
        });
      });
    });
    // this.drawsLine();
    // this.drawbLine();
    // this.drawdLine();
  },
  methods: {
    gettrendList() {
      trendList({
        mid: 199,
      }).then((res) => {
        this.drawLine1(
          res.dataList.table_1.dataList_1,
          res.dataList.table_1.dataList_2
        );
        this.drawLine2(
          res.dataList.table_2.dataList_1,
          res.dataList.table_2.dataList_2,
          "myChart2"
        );
        this.drawLine2(
          res.dataList.table_3.dataList_1,
          res.dataList.table_3.dataList_2,
          "myChart3"
        );
      });
    },
    getStart1() {
      this.searchKey2 = "";
      this.searchKey3 = "";
      this.options2 = [];
      this.options3 = [];
      this.getStart();
    },
    getStart2() {
      this.searchKey3 = "";
      this.options3 = [];
      this.getStart();
    },
    getStart() {
      getInitTrendList({
        byqNumber: this.searchKey1,
        pdgNumber: this.searchKey2,
      }).then((res) => {
        this.options1 = res.byqNumber;
        this.options2 = res.pdgNumber;
        this.options3 = res.ct;
        this.options4 = res.ycCs;
      });
    },
    getList1(item) {
      this.spanActive = item;
    },
    getList2() {
      this.spanActive2 = item;
    },
    getList3() {
      this.spanActive3 = item;
    },
    drawLine1(datalist1, datalist2) {
      let xAxis1 = datalist1["A相电流"].map((item) => {
        return item.time;
      });
      let xAxis2 = datalist2["A相电流预测"].map((item) => {
        return item.time;
      });
      let xAxis = xAxis1.concat(xAxis2);

      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));

      let data1 = [];
      let data2 = [];
      let data3 = [];
      let data4 = [];
      let data5 = [];
      let data6 = [];

      datalist1["A相电流"].forEach((item) => {
        data1.push([item.time, item.value]);
      });
      datalist2["A相电流预测"].forEach((item) => {
        data2.push([item.time, item.value]);
      });
      datalist1["B相电流"].forEach((item) => {
        data3.push([item.time, item.value]);
      });
      datalist2["B相电流预测"].forEach((item) => {
        data4.push([item.time, item.value]);
      });
      datalist1["C相电流"].forEach((item) => {
        data5.push([item.time, item.value]);
      });
      datalist2["C相电流预测"].forEach((item) => {
        data6.push([item.time, item.value]);
      });

      // 如果是折线图，此处需要追加实际数据的最后一组数据，如果是柱状图，则不需要。
      data2.unshift(data1[data1.length - 1]);
      data4.unshift(data3[data3.length - 1]);
      data6.unshift(data5[data5.length - 1]);

      let that = this;
      myChart1.setOption({
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: xAxis,
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
          bottom: 10,
          icon: "rect",
          itemWidth: 16,
          itemHeight: 4,
          itemGap: 15,
          textStyle: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 14,
            color: "rgba(255, 255, 255, 1)",
          },
          data: ["A相电流", "B相电流", "C相电流"],
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
            // console.log(params);
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
            name: "A相电流",
            type: "line",
            smooth: false,
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
            smooth: false,
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
            smooth: false,
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
            smooth: false,
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
            smooth: false,
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
            smooth: false,
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
    drawLine2(datalist1, datalist2, chart) {
      let myChart2 = this.$echarts.init(document.getElementById(chart));
      // 绘制图表
      let xAxis1 = datalist1[
        chart == "myChart2" ? "总有功功率" : "总功率因数"
      ].map((item) => {
        return item.time;
      });
      let xAxis2 = datalist2[
        chart == "myChart2" ? "总有功功率预测" : "总功率因数预测"
      ].map((item) => {
        return item.time;
      });
      let xAxis = xAxis1.concat(xAxis2);
      let data = [];
      let data0 = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];
      let data4 = [];
      let data5 = [];
      let data6 = [];
      datalist1[chart == "myChart2" ? "总有功功率" : "总功率因数"].forEach((item) => {
        data.push([item.time, item.value]);
      });
      datalist2[chart == "myChart2" ? "总有功功率预测" : "总功率因数预测"].forEach((item) => {
        data0.push([item.time, item.value]);
      });

      datalist1[chart == "myChart2" ? "A相有功功率" : "A相功率因数"].forEach((item) => {
        data1.push([item.time, item.value]);
      });
      datalist2[chart == "myChart2" ? "A相有功功率预测" : "A相功率因数预测"].forEach((item) => {
        data2.push([item.time, item.value]);
      });
      datalist1[chart == "myChart2" ? "B相有功功率" : "B相功率因数"].forEach((item) => {
        data3.push([item.time, item.value]);
      });
      datalist2[chart == "myChart2" ? "B相有功功率预测" : "B相功率因数预测"].forEach((item) => {
        data4.push([item.time, item.value]);
      });
      datalist1[chart == "myChart2" ? "C相有功功率" : "C相功率因数"].forEach((item) => {
        data5.push([item.time, item.value]);
      });
      datalist2[chart == "myChart2" ? "C相有功功率预测" : "C相功率因数预测"].forEach((item) => {
        data6.push([item.time, item.value]);
      });

      // 如果是折线图，此处需要追加实际数据的最后一组数据，如果是柱状图，则不需要。
      data0.unshift(data[data.length - 1]);
      data2.unshift(data1[data1.length - 1]);
      data4.unshift(data3[data3.length - 1]);
      data6.unshift(data5[data5.length - 1]);

      let that = this;
      myChart2.setOption({
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: xAxis,
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
          bottom:10,
          icon: "rect",
          itemWidth: 16,
          itemHeight: 4,
          itemGap: 15,
          textStyle: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 14,
            color: "rgba(255, 255, 255, 1)",
          },
          data: chart == "myChart2" ? ["总有功功率", "A相有功功率", "B相有功功率", "C相有功功率"] :["总功率因数", "A相功率因数", "B相功率因数", "C相功率因数"],
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
            // console.log(params);
            let colors = [
              "rgba(255, 246, 173, 1)",
              "rgba(65, 181, 164, 1)",
              "rgba(112, 234, 255, 1)",
              "rgba(132, 172, 255, 1)",
            ];
            let returnData = '<div style="padding: 5px 10px;">';
            if (params.length == 8) {
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
            name: chart == "myChart2" ? "总有功功率" : "总功率因数",
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
            name: chart == "myChart2" ? "总有功功率预测" : "总功率因数预测",
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
            name: chart == "myChart2" ? "A相有功功率" : "A相功率因数",
            type: "line",
            smooth: false,
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
            name: chart == "myChart2" ? "A相有功功率预测" : "A相功率因数预测",
            type: "line",
            smooth: false,
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
            name: chart == "myChart2" ? "B相有功功率" : "B相功率因数",
            type: "line",
            smooth: false,
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
            name:chart == "myChart2" ? "B相有功功率预测" : "B相功率因数预测",
            type: "line",
            smooth: false,
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
            name: chart == "myChart2" ? "C相有功功率" : "C相功率因数",
            type: "line",
            smooth: false,
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
            name:chart == "myChart2" ? "C相有功功率预测" : "C相功率因数预测",
            type: "line",
            smooth: false,
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
    drawsLine() {
      let myCharts = this.$echarts.init(document.getElementById("myCharts"));
      myCharts.getZr().on("mouseover", function (param) {
        myCharts.setOption({
          series: [
            {
              name: "系统内部",
              type: "line",
              symbolSize: 0, // 去掉点的显示
              data: [220, 182, 191, 234],
              barWidth: 8,
              lineStyle: {
                width: 1, // 线宽是0
                color: "rgba(255, 0, 0, 1)", // 线的颜色是透明的
              },
            },
            {
              name: "电压不平衡度",
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
                show: true,
                position: "top",
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
              name: "电压不平衡度预测",
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
          ],
        });
      });
      myCharts.getZr().on("mouseout", function (param) {
        myCharts.setOption({
          series: [
            {
              name: "系统内部",
              type: "line",
              symbolSize: 0, // 去掉点的显示
              data: [220, 182, 191, 234],
              barWidth: 8,
              lineStyle: {
                width: 0, // 线宽是0
                color: "rgba(255, 0, 0, 1)", // 线的颜色是透明的
              },
            },
            {
              name: "电压不平衡度",
              label: {
                show: true,
                position: "top",
              },
              type: "line",
              smooth: true,
              data: data1,
              showAllSymbol: true,
              symbol: "circle",
              symbolSize: 0,
              lineStyle: {
                color: "rgba(65, 181, 164, 1)",
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
              name: "电压不平衡度预测",
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
          ],
        });
      });

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

      let data1 = [];
      let data2 = [];

      list.forEach((item) => {
        if (item.predict) {
          data2.push([item.name, item.value]);
        } else {
          data1.push([item.name, item.value]);
        }
      });

      // 如果是折线图，此处需要追加实际数据的最后一组数据，如果是柱状图，则不需要。
      data2.unshift(data1[data1.length - 1]);

      let labels = list.map((m) => {
        return m.name;
      });
      let that = this;
      myCharts.setOption({
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
          data: ["电压不平衡度"],
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
            // console.log(params);
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
            label: {
              show: true,
              position: "top",
            },
            name: "电压不平衡度",
            type: "line",
            smooth: true,
            data: data1,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 0,
            lineStyle: {
              color: "rgba(65, 181, 164, 1)",
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
            name: "电压不平衡度预测",
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
        ],
      });
    },

    drawbLine() {
      let myChartb = this.$echarts.init(document.getElementById("myChartb"));
      let list = [
        {
          name: "00:00",
          value: 0,
        },
        {
          name: "02:00",
          value: 70,
        },
        {
          name: "04:00",
          value: 100,
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
          value: 360,
          predict: true,
        },
      ];

      let data1 = [];
      let data2 = [];

      list.forEach((item) => {
        if (item.predict) {
          data2.push([item.name, item.value]);
        } else {
          data1.push([item.name, item.value]);
        }
      });

      // 如果是折线图，此处需要追加实际数据的最后一组数据，如果是柱状图，则不需要。
      data2.unshift(data1[data1.length - 1]);

      let labels = list.map((m) => {
        return m.name;
      });
      let that = this;
      myChartb.setOption({
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
          data: ["电压不平衡度"],
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
            // console.log(params);
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
            label: {
              show: false,
            },
            name: "电压不平衡度",
            type: "line",
            data: data1,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              color: "rgba(65, 181, 164, 1)",
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
                    color: "rgba(65, 181, 164, 1)", //中心颜色
                  },
                  {
                    offset: 0.4,
                    color: "rgba(65, 181, 164, 1)",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(65, 181, 164, 1)",
                  },
                  {
                    offset: 1,
                    color: "#fff",
                  },
                ],
              },
              borderWidth: 1,
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
            name: "电压不平衡度预测",
            type: "line",
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
        ],
      });
    },
    drawdLine() {
      let that = this;
      let myChartd = this.$echarts.init(document.getElementById("myChartD"));
      /************************************************
       * 机器出现故障的时间段,Y轴代表小时数,X代表异常机器
       ************************************************/
      var arrList = [
        { name: "双工况一次冰蓄冷循环泵", type: 1, value: [3, 10], pec: 30 },
        {
          name: "1#基载冷水机组",
          pec: 60,
          type: 2,
          value: [
            [6, 8],
            [11, 13],
            [20, 24],
          ],
        },
        { name: "换热机房", type: 3, value: [10, 15], pec: 30 },
        { name: "冷却塔循环水泵", type: 1, value: [5, 10], pec: 30 },
        { name: "运监大厅UPS", type: 2, value: [5, 7], pec: 30 },
        // { name: "机器h", type: 3, value: [8, 10], pec: 30 },
      ];

      var xAxis = [
        "双工况一次冰蓄冷循环泵",
        "1#基载冷水机组",
        "换热机房",
        "冷却塔循环水泵",
        "运监大厅UPS",
        // "机器h",
      ];
      var minHour = 0;
      var maxHour = 24;
      //模拟数据,一个开始时间,对应一个结束时间.
      var hourData = [
        [[3, 10]], //机器A 3点钟开始异常,10点维修完成
        [
          [6, 8],
          [11, 13],
          [20, 24],
        ],
        [[10, 15]],
        [[5, 10]],
        [[5, 7]],
        // [[8, 10]],
      ];

      //補缺空擋數據
      var maxColumn = 0; //最大列
      for (var i in hourData) {
        var array = hourData[i];
        var addCount = 0; //新增計數器,因每次新增后,數組長度都會實時變化
        for (var j in array) {
          if (j == 0 && array[j][0] > minHour) {
            array.unshift([0, array[j][0] - minHour, -1]);
            addCount++;
          } else if (j > 0) {
            var newJ = parseInt(j) + addCount;
            var currentStart = array[newJ][0];
            var currentEnd = array[newJ][1];
            var beforeEnd = array[newJ - 1][1];
            if (beforeEnd != currentStart) {
              array.splice(newJ, 0, [beforeEnd, currentStart, -1]);
              addCount++;
            }
          }
        }
        if (maxColumn < array.length) {
          maxColumn = array.length;
        }
      }

      //初始化每层的数据,默认空
      var seriesArray = [];
      var seriesBlank = []; //保存需要透明的下標
      for (var i = 0; i < maxColumn; i++) {
        var arrayTemp = [];
        var arrayBlankTemp = [];
        for (var j in hourData) {
          var array = hourData[j][i];
          if (!!array) {
            var s = hourData[j][i][0];
            var e = hourData[j][i][1];
            arrayTemp.push(e - s);
            if (!!hourData[j][i][2] && hourData[j][i][2] == -1) {
              arrayBlankTemp.push("透明");
            } else {
              arrayBlankTemp.push("非透明");
            }
          } else {
            arrayTemp.push(0);
            arrayBlankTemp.push("透明");
          }
        }
        seriesArray.push(arrayTemp);
        seriesBlank.push(arrayBlankTemp);
      }

      // var imgurl = require("@/assets/index/Button_daochu_jinyong.png");
      // var imgHtml = new Image();
      // imgHtml.src = imgurl;
      // imgHtml.width = "500";
      // imgHtml.height = "12";
      // console.log(imgHtml);
      //生成圖表
      var series = [];
      for (var i in seriesArray) {
        series.push({
          name: "DownTime",
          type: "bar",
          stack: "DownTime",
          data: seriesArray[i],
          barWidth: 12,
          itemStyle: {
            color: function (param) {
              var blankValue = seriesBlank[param.seriesIndex][param.dataIndex];
              if (!!blankValue && blankValue == "透明") {
                return "rgba(128, 128, 128, 0)";
              } else {
                let type = arrList.filter((item) => {
                  return item.name == param.name;
                })[0].type;
                if (type == 1) {
                  // return {
                  //   image: imgHtml,
                  //   repeat: "repeat",
                  // };
                  return "rgba(63, 255, 204, 0.5)";
                } else if (type == 2) {
                  return "rgba(255, 234, 63, 0.5)";
                } else {
                  return "rgba(255, 116, 55, 0.5)";
                }
              }
            },
            barBorderRadius: 4,
            shadowBlur: 5,
            shadowColor: "#fff",
          },
          // symbol: "image://" + require("@/assets/index/Button_daochu_jinyong.png"),
        });
      }
      for (let i = 0; i < arrList.length; i++) {
        let poS = (521 / (arrList.length * 2)) * (i * 2 + 1) + 20;
        series.push({
          name: arrList[i].name,
          type: "pie",
          clockWise: true,
          radius: [20, 15],
          itemStyle: {
            normal: {
              borderRadius: 7,
              color:
                arrList[i].type == 1
                  ? "rgba(63, 255, 204, 0.7)"
                  : arrList[i].type == 2
                  ? "rgba(255, 234, 63, 0.7)"
                  : "rgba(255, 116, 55, 0.7)",
              shadowColor:
                arrList[i].type == 1
                  ? "rgba(63, 255, 204, 0.7)"
                  : arrList[i].type == 2
                  ? "rgba(255, 234, 63, 0.7)"
                  : "rgba(255, 116, 55, 0.7)",
              shadowBlur: 0,
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
          hoverAnimation: false,
          center: ["14%", poS + "px"],
          data: [
            {
              value: arrList[i].pec,
              label: {
                normal: {
                  formatter: function (params) {
                    return params.value + "%";
                  },
                  position: "center",
                  show: true,
                  textStyle: {
                    fontSize: "12",
                    color: "#fff",
                  },
                },
              },
            },
            {
              value: 100 - arrList[i].pec,
              name: "invisible",
              itemStyle: {
                normal: {
                  color:
                    arrList[i].type == 1
                      ? "rgba(63, 255, 204, 0.2)"
                      : arrList[i].type == 2
                      ? "rgba(255, 234, 63, 0.2)"
                      : "rgba(255, 116, 55, 0.2)",
                },
                emphasis: {
                  color:
                    arrList[i].type == 1
                      ? "rgba(63, 255, 204, 0.2)"
                      : arrList[i].type == 2
                      ? "rgba(255, 234, 63, 0.2)"
                      : "rgba(255, 116, 55, 0.2)",
                },
              },
            },
          ],
        });
      }
      myChartd.setOption({
        // title: {
        //   text: "DownTime",
        //   textStyle: {
        //     color: "#707070",
        //     fontSize: "12",
        //     fontWeight: "normal",
        //   },
        // },
        grid: {
          top: "0",
          left: "6%",
          right: "8",
          bottom: "0",
          containLabel: true,
        },
        yAxis: [
          {
            type: "category",
            data: xAxis,
            axisLabel: {
              padding: [0, 60, 0, 0],
              show: true,
              color: "#fff",
              // formatter: function (param) {
              //   let stringName = arrList.filter((item) => {
              //     return item.name == param;
              //   })[0].pec;
              //   return param + " " + stringName + "%";
              // },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },
        ],
        xAxis: [
          {
            type: "value",
            splitNumber: 23,
            position: "top",
            max: 23,
            axisLabel: {
              show: true,
              color: "rgba(212, 212, 212, .8)",
            },
            splitLine: {
              show: false,
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(91, 126, 255, .05)", "rgba(91, 126, 255, 0)"],
              },
            },
          },
        ],
        series: series,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.indexSecond-container {
  .xBox {
    margin: 0 auto;
    text-align: center;
    span {
      display: inline-block;
      width: 50px;
      color: rgba(212, 212, 212, 0.8);
    }
  }
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
