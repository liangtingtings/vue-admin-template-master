<template>
  <div class="indexSecond-container">
    <el-row v-if="showBox !== 4 ? true : false">
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
          ></el-option>
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
          ></el-option>
        </el-select>
        <label style="margin-left: 80px">抽屉开关</label>
        <el-select
          v-model="searchKey3"
          placeholder="请选择"
          style="width: 140px"
          @change="searchKey4 = ''"
          popper-class="change-el-select-dropdown"
        >
          <el-option
            v-for="item in options3"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <label style="margin-left: 80px">预测参数</label>
        <el-select
          style="width: 150px"
          v-model="searchKey4"
          placeholder="请选择"
          popper-class="change-el-select-dropdown"
          @change="gettrendList"
        >
          <el-option
            v-for="(item, index) in options4"
            :key="item"
            :label="item"
            :value="index + 1"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row
      v-if="showBox == 4 ? true : false"
      style="text-align: center; margin-bottom: 20px"
    >
      <el-col :span="24">
        <label>变压器编号</label>
        <el-select
          @change="getStartb1"
          v-model="searchKey11"
          placeholder="请选择"
          style="width: 140px"
          popper-class="change-el-select-dropdown"
        >
          <el-option
            v-for="item in options11"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <label style="margin-left: 80px">配电柜编号</label>
        <el-select
          @change="drawdLine()"
          v-model="searchKey22"
          placeholder="请选择"
          style="width: 140px"
          popper-class="change-el-select-dropdown"
        >
          <el-option
            v-for="item in options22"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div v-if="showBox == 1 ? true : false">
      <el-row style="width: 100%; height: calc(100vh - 190px)">
        <el-col
          :span="12"
          style="height: 50%; padding: 0px 20px; box-sizing: border-box"
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
          <div
            id="myChart1"
            v-if="showBox == 1 ? true : false"
            :style="{ width: '100%', height: '90%' }"
          ></div>
        </el-col>
        <el-col
          :span="12"
          style="box-sizing: border-box; height: 50%; padding: 0px 20px"
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
          <div
            id="myChart2"
            v-if="showBox == 1 ? true : false"
            :style="{ width: '100%', height: '90%' }"
          ></div>
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
          <div
            id="myChart3"
            v-if="showBox == 1 ? true : false"
            :style="{ width: '100%', height: '90%' }"
          ></div>
        </el-col>
      </el-row>
    </div>
    <div v-if="showBox == 2 ? true : false">
      <el-row style="width: 100%; height: calc(100vh - 190px)">
        <el-col
          :span="8"
          style="height: 50%; padding: 20px; box-sizing: border-box"
        >
          <div class="toptitle">
            <span
              @click="getLists1(item)"
              v-for="item in lists1"
              :class="spanActives1 == item ? 'spanActive' : ''"
              :key="item"
              >{{ item }}</span
            >
          </div>
          <div
            id="myCharts1"
            v-if="showBox == 2 ? true : false"
            :style="{ width: '100%', height: '100%' }"
          ></div>
        </el-col>
        <el-col
          :span="8"
          style="height: 50%; padding: 20px; box-sizing: border-box"
        >
          <div class="toptitle">
            <span
              @click="getLists2(item)"
              v-for="item in lists2"
              :class="spanActives2 == item ? 'spanActive' : ''"
              :key="item"
              >{{ item }}</span
            >
          </div>
          <div
            id="myCharts2"
            v-if="showBox == 2 ? true : false"
            :style="{ width: '100%', height: '100%' }"
          ></div>
        </el-col>
        <el-col
          :span="8"
          style="height: 50%; padding: 20px; box-sizing: border-box"
        >
          <div class="toptitle">
            <span
              @click="getLists3(item)"
              v-for="item in lists3"
              :class="spanActives3 == item ? 'spanActive' : ''"
              :key="item"
              >{{ item }}</span
            >
          </div>
          <div
            id="myCharts3"
            v-if="showBox == 2 ? true : false"
            :style="{ width: '100%', height: '100%' }"
          ></div>
        </el-col>
        <el-col
          :span="8"
          style="height: 50%; padding: 20px; box-sizing: border-box"
        >
          <div class="toptitle">
            <span
              @click="getLists4(item)"
              v-for="item in lists4"
              :class="spanActives4 == item ? 'spanActive' : ''"
              :key="item"
              >{{ item }}</span
            >
          </div>
          <div
            id="myCharts4"
            v-if="showBox == 2 ? true : false"
            :style="{ width: '100%', height: '100%' }"
          ></div>
        </el-col>
        <el-col
          :span="8"
          style="height: 50%; padding: 20px; box-sizing: border-box"
        >
          <div class="toptitle">
            <span
              @click="getLists5(item)"
              v-for="item in lists5"
              :class="spanActives5 == item ? 'spanActive' : ''"
              :key="item"
              >{{ item }}</span
            >
          </div>
          <div
            id="myCharts5"
            v-if="showBox == 2 ? true : false"
            :style="{ width: '100%', height: '100%' }"
          ></div>
        </el-col>
      </el-row>
    </div>
    <div v-if="showBox == 3 ? true : false">
      <el-row style="width: 100%; height: calc(100vh - 190px)">
        <el-col
          :span="12"
          style="height: 50%; padding: 20px; box-sizing: border-box"
        >
          <div class="toptitle">
            <span
              @click="getListb1(item)"
              v-for="item in listb1"
              :class="spanActiveb1 == item ? 'spanActive' : ''"
              :key="item"
              >{{ item }}</span
            >
          </div>
          <div id="myChartb1" :style="{ width: '100%', height: '100%' }"></div>
        </el-col>
        <el-col
          :span="12"
          style="height: 50%; padding: 20px; box-sizing: border-box"
        >
          <div class="toptitle">
            <span
              @click="getListb2(item)"
              v-for="item in listb2"
              :class="spanActiveb2 == item ? 'spanActive' : ''"
              :key="item"
              >{{ item }}</span
            >
          </div>
          <div id="myChartb2" :style="{ width: '100%', height: '100%' }"></div>
        </el-col>
        <el-col
          :span="12"
          style="height: 50%; padding: 20px; box-sizing: border-box"
        >
          <div class="toptitle">
            <span
              @click="getListb3(item)"
              v-for="item in listb3"
              :class="spanActiveb3 == item ? 'spanActive' : ''"
              :key="item"
              >{{ item }}</span
            >
          </div>
          <div id="myChartb3" :style="{ width: '100%', height: '100%' }"></div>
        </el-col>
      </el-row>
    </div>
    <div v-if="showBox == 4 ? true : false">
      <div style="width: 1300px; height: 550px; margin: 0 auto">
        <div id="myChartD" :style="{ width: '100%', height: '100%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getInitTrendList,
  getselectTrendList,
  getselectTrendTableList,
  getstartStop,
  getInitStartStop,
} from "@/api/indexSecond";
export default {
  name: "indexSecond",
  data() {
    return {
      showBox: 1,
      spanActive: "今日三相电流预测",
      list1: ["今日三相电流预测", "本月三相电流预测"],
      spanActive2: "今日三相有功功率预测",
      list2: ["今日三相有功功率预测", "本月三相有功功率预测"],
      spanActive3: "今日三相功率因数预测",
      list3: ["今日三相功率因数预测", "本月三相功率因数预测"],

      spanActives1: "今日电压不平衡度预测",
      lists1: ["今日电压不平衡度预测", "本月电压不平衡度预测"],
      spanActives2: "今日电流总谐波畸变率预测",
      lists2: ["今日电流总谐波畸变率预测", "本月电流总谐波畸变率预测"],
      spanActives3: "今日电流总奇次谐波畸变率预测",
      lists3: ["今日电流总奇次谐波畸变率预测", "本月电流总奇次谐波畸变率预测"],
      spanActives4: "今日电流分次谐波畸变率预测",
      lists4: ["今日电流分次谐波畸变率预测", "本月电流分次谐波畸变率预测"],
      spanActives5: "今日K因子预测",
      lists5: ["今日K因子预测", "本月K因子预测"],

      spanActiveb1: "今日正向有功电能预测",
      listb1: ["今日正向有功电能预测", "本月正向有功电能预测"],
      spanActiveb2: "今日正向无功电能预测",
      listb2: ["今日正向无功电能预测", "本月正向无功电能预测"],
      spanActiveb3: "今日视在电能预测",
      listb3: ["今日视在电能预测", "本月视在电能预测"],

      options1: [],
      options2: [],
      options11: [],
      options22: [],
      options3: [],
      options4: [],
      searchKey1: "",
      searchKey2: "",
      searchKey3: "",
      searchKey4: "",
      searchKey11: "",
      searchKey22: "",
    };
  },
  watch: {
    $route() {
      this.showBox = this.$route.query.index == 1 ? 1 : 4;
      setTimeout(() => {
        if (this.$route.query.index == 1) {
          this.getListA();
        } else {
          this.getListB();
        }
      }, 100);
    },
  },
  mounted() {
    this.showBox = this.$route.query.index == 1 ? 1 : 4;
    setTimeout(() => {
      if (this.$route.query.index == 1) {
        this.getListA();
      } else {
        this.getListB();
      }
    }, 100);
  },
  methods: {
    getListA() {
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
            this.searchKey4 = 1; 
            this.gettrendList(1);
          });
        });
      });
    },
    getListB() { 
      this.searchKey11="";
      this.options11 =[]
      this.searchKey22 = "";
      this.options22 = [];
      getInitStartStop({
        byqNumber: this.searchKey11,
        pdgNumber: this.searchKey22,
      }).then((res) => {
        this.options11 = res.byqNumber;
        this.searchKey11 = this.options11[0];
        getInitStartStop({
          byqNumber: this.searchKey11,
          pdgNumber: this.searchKey22,
        }).then((res) => {
          this.options22 = res.pdgNumber;
          this.searchKey22 = this.options22[0];
          this.drawdLine();
        });
      });
    },
    gettrendList(type) {
      this.showBox = type;
      getselectTrendList({
        byqNumber: this.searchKey1,
        pdgNumber: this.searchKey2,
        ct: this.searchKey3,
        yc: this.searchKey4,
      }).then((res) => {
        if (type == 1) {
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
        } else if (type == 2) {
          this.drawsLine(
            res.dataList.table_1.dataList_1,
            res.dataList.table_1.dataList_2,
            "myCharts1",
            "电压不平衡度",
            "rgba(91, 126, 255, 1)",
            "rgba(91, 126, 255, .6)"
          );

          this.drawsLine(
            res.dataList.table_2.dataList_1,
            res.dataList.table_2.dataList_2,
            "myCharts2",
            "电流总谐波畸变率",
            "rgba(65, 181, 164, 1)",
            "rgba(65, 181, 164, .6)"
          );
          this.drawsLine(
            res.dataList.table_3.dataList_1,
            res.dataList.table_3.dataList_2,
            "myCharts3",
            "电流总奇次谐波畸变率",
            "rgba(125, 137, 255, 1)",
            "rgba(125, 137, 255, .6)"
          );
          this.drawsLine2(
            res.dataList.table_4.dataList_1,
            res.dataList.table_4.dataList_2
          );
          this.drawsLine(
            res.dataList.table_5.dataList_1,
            res.dataList.table_5.dataList_2,
            "myCharts5",
            "K因子",
            "rgba(255, 65, 136, 1)",
            "rgba(255, 65, 136, .6)"
          );
        } else {
          this.drawbLine(
            res.dataList.table_1.dataList_1,
            res.dataList.table_1.dataList_2,
            "myChartb1",
            "正向有功电能",
            "rgba(91, 126, 255, 1)",
            "rgba(91, 126, 255, .6)"
          );
          this.drawbLine(
            res.dataList.table_2.dataList_1,
            res.dataList.table_2.dataList_2,
            "myChartb2",
            "正向无功电能",
            "rgba(65, 181, 164, 1)",
            "rgba(65, 181, 164, .6)"
          );
          this.drawbLine(
            res.dataList.table_3.dataList_1,
            res.dataList.table_3.dataList_2,
            "myChartb3",
            "视在电能",
            "rgba(152, 125, 255, 1)",
            "rgba(152, 125, 255, .6)"
          );
        }
      });
    },
    getStart1() {
      this.searchKey2 = "";
      this.searchKey3 = "";
      this.searchKey4 = "";
      this.options2 = [];
      this.options3 = [];
      this.getStart();
    },
    getStart2() {
      this.searchKey3 = "";
      this.searchKey4 = "";
      this.options3 = [];
      this.getStart();
    },
    getStartb1() { 
      this.searchKey22 = "";
      this.options22 = [];
      getInitStartStop({
        byqNumber: this.searchKey11,
        pdgNumber: this.searchKey22,
      }).then((res) => {
        this.options22 = res.pdgNumber;
        this.drawdLine();
      });
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
    getChangeList(spanActive, type, chart, string, color, color6) {
      getselectTrendTableList({
        byqNumber: this.searchKey1,
        pdgNumber: this.searchKey2,
        ct: this.searchKey3,
        tableData: spanActive,
      }).then((res) => {
        if (type == 1) {
          this.drawLine1(res.dataList.dataList_1, res.dataList.dataList_2);
        } else if (type == 2) {
          this.drawLine2(
            res.dataList.dataList_1,
            res.dataList.dataList_2,
            chart
          );
        } else if (type == 3) {
          this.drawsLine(
            res.dataList.dataList_1,
            res.dataList.dataList_2,
            chart,
            string,
            color,
            color6
          );
        } else if (type == 4) {
          this.drawsLine2(res.dataList.dataList_1, res.dataList.dataList_2);
        } else {
          this.drawbLine(
            res.dataList.dataList_1,
            res.dataList.dataList_2,
            chart,
            string,
            color,
            color6
          );
        }
      });
    },
    getList1(item) {
      this.spanActive = item;
      this.getChangeList(item, 1);
    },
    getList2(item) {
      this.spanActive2 = item;
      this.getChangeList(item, 2, "myChart2");
    },
    getList3(item) {
      this.spanActive3 = item;
      this.getChangeList(item, 2, "myChart3");
    },
    getLists1(item) {
      this.spanActives1 = item;
      this.getChangeList(
        item,
        3,
        "myCharts1",
        "电压不平衡度",
        "rgba(91, 126, 255, 1)",
        "rgba(91, 126, 255, .6)"
      );
    },
    getLists2(item) {
      this.spanActives2 = item;
      this.getChangeList(
        item,
        3,
        "myCharts2",
        "电流总谐波畸变率",
        "rgba(65, 181, 164, 1)",
        "rgba(65, 181, 164, .6)"
      );
    },
    getLists3(item) {
      this.spanActives3 = item;
      this.getChangeList(
        item,
        3,
        "myCharts3",
        "电流总奇次谐波畸变率",
        "rgba(125, 137, 255, 1)",
        "rgba(125, 137, 255, .6)"
      );
    },
    getLists4(item) {
      this.spanActives4 = item;
      this.getChangeList(item, 4);
    },
    getLists5(item) {
      this.spanActives5 = item;
      this.getChangeList(
        item,
        3,
        "myCharts5",
        "K因子",
        "rgba(255, 65, 136, 1)",
        "rgba(255, 65, 136, .6)"
      );
    },
    getListb1(item) {
      this.spanActiveb1 = item;
      this.getChangeList(
        item,
        5,
        "myChartb1",
        "正向有功电能",
        "rgba(91, 126, 255, 1)",
        "rgba(91, 126, 255, .6)"
      );
    },
    getListb2(item) {
      this.spanActiveb2 = item;
      this.getChangeList(
        item,
        5,
        "myChartb2",
        "正向无功电能",
        "rgba(65, 181, 164, 1)",
        "rgba(65, 181, 164, .6)"
      );
    },
    getListb3(item) {
      this.spanActiveb3 = item;
      this.getChangeList(
        item,
        5,
        "myChartb3",
        "视在电能",
        "rgba(152, 125, 255, 1)",
        "rgba(152, 125, 255, .6)"
      );
    },
    drawLine1(datalist1, datalist2) {
      let xAxis = datalist2["A相电流预测"].map((item) => {
        return item.time;
      });

      this.$echarts.init(document.getElementById("myChart1")).dispose();
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));

      let that = this;
      let obj = {
        grid: {
          top: "30px",
          left: "7%",
          right: "0px",
        },
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
          boundaryGap: false,
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
          selected: {
            A相电流: true,
            A相电流预测: true,
            B相电流: false,
            C相电流: false,
            B相电流预测: false,
            C相电流预测: false,
          },
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
            // let colors = [
            //   "rgba(65, 181, 164, 1)",
            //   "rgba(112, 234, 255, 1)",
            //   "rgba(132, 172, 255, 1)",
            //   "rgba(65, 181, 164, 1)",
            //   "rgba(112, 234, 255, 1)",
            //   "rgba(132, 172, 255, 1)",
            // ];
            let returnData = '<div style="padding: 5px 10px;">';
            // if (params.length == 6) {
            //   params = params.filter((item, index) => index % 2 !== 0);
            // }

            for (let i = 0; i < params.length; i++) {
              returnData +=
                '<span style="display:inline-block; width:20px; height:8px; margin-right:5px; border-radius:1px; background-color:' +
                params[i].color +
                '"></span>';
              returnData +=
                '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: ' +
                params[i].color +
                '">' +
                params[i].seriesName +
                '：</span><span style="font-family: Verdana; font-size: 14px; color: ' +
                params[i].color +
                '">' +
                params[i].data.value +
                '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: ' +
                params[i].color +
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
            smooth: true,
            data: datalist1["A相电流"],
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "rgba(65, 181, 164, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(65, 181, 164, 1)",
              borderColor: "rgba(255, 255, 255, 1)",
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
            itemStyle: {
              color: "rgba(65, 181, 164, 1)",
            },
            symbol: "none",
            data: datalist2["A相电流预测"],
          },
          {
            name: "B相电流",
            type: "line",
            smooth: true,
            data: datalist1["B相电流"],
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "rgba(88, 143, 255, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(88, 143, 255, 1)",
              borderColor: "rgba(255, 255, 255, 1)",
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
            itemStyle: {
              color: "rgba(88, 143, 255, 1)",
            },
            symbol: "none",
            data: datalist2["B相电流预测"],
          },
          {
            name: "C相电流",
            type: "line",
            smooth: true,
            data: datalist1["C相电流"],
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "rgba(132, 172, 255, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(132, 172, 255, 1)",
              borderColor: "rgba(255, 255, 255, 1)",
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
            itemStyle: {
              color: "rgba(132, 172, 255, 1)",
            },
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
            data: datalist2["C相电流预测"],
          },
        ],
      };
      myChart1.setOption(obj);
      myChart1.on("legendselectchanged", function (params) {
        console.log(params);
        obj.legend = {
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
          selected: {
            A相电流: params.selected["A相电流"],
            A相电流预测: params.selected["A相电流"],
            B相电流: params.selected["B相电流"],
            C相电流: params.selected["C相电流"],
            B相电流预测: params.selected["B相电流"],
            C相电流预测: params.selected["C相电流"],
          },
        };
        myChart1.setOption(obj);
      });
    },
    drawLine2(datalist1, datalist2, chart) {
      this.$echarts.init(document.getElementById(chart)).dispose();
      let myChart2 = this.$echarts.init(document.getElementById(chart));
      // 绘制图表
      let xAxis = datalist2[
        chart == "myChart2" ? "总有功功率预测" : "总功率因数预测"
      ].map((item) => {
        return item.time;
      });

      let that = this;
      let obj = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "30px",
          left: "7%",
          right: "0px",
        },
        xAxis: {
          type: "category",
          data: xAxis,
          axisLabel: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 12,
            color: "rgba(212, 212, 212, 1)",
          },
          boundaryGap: false,
        },
        yAxis: {
          name: "(kW)",
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
          data:
            chart == "myChart2"
              ? ["总有功功率", "A相有功功率", "B相有功功率", "C相有功功率"]
              : ["总功率因数", "A相功率因数", "B相功率因数", "C相功率因数"],
          selected:
            chart == "myChart2"
              ? {
                  总有功功率: true,
                  总有功功率预测: true,
                  A相有功功率: false,
                  B相有功功率: false,
                  C相有功功率: false,
                  A相有功功率预测: false,
                  B相有功功率预测: false,
                  C相有功功率预测: false,
                }
              : {
                  总功率因数: true,
                  总功率因数预测: true,
                  A相功率因数: false,
                  B相功率因数: false,
                  C相功率因数: false,
                  A相功率因数预测: false,
                  B相功率因数预测: false,
                  C相功率因数预测: false,
                },
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
            // let colors = [
            //   "rgba(255, 246, 173, 1)",
            //   "rgba(65, 181, 164, 1)",
            //   "rgba(112, 234, 255, 1)",
            //   "rgba(132, 172, 255, 1)",
            // ];
            let returnData = '<div style="padding: 5px 10px;">';
            if (params.length == 8) {
              params = params.filter((item, index) => index % 2 !== 0);
            }

            for (let i = 0; i < params.length; i++) {
              returnData +=
                '<span style="display:inline-block; width:20px; height:8px; margin-right:5px; border-radius:1px; background-color:' +
                params[i].color +
                '"></span>';
              returnData +=
                '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: ' +
                params[i].color +
                '">' +
                params[i].seriesName +
                '：</span><span style="font-family: Verdana; font-size: 14px; color: ' +
                params[i].color +
                '">' +
                params[i].data.value +
                '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: ' +
                params[i].color +
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
            smooth: true,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "rgba(255, 246, 173, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(255, 246, 173, 1)",
              borderColor: "rgba(255, 255, 255, 1)",
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
                      color: "rgba(255, 246, 173, .6)",
                    },
                    {
                      offset: 1,
                      color: "rgba(65, 181, 164, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(255, 246, 173, .6)",
                shadowBlur: 20,
              },
            },
            data: datalist1[chart == "myChart2" ? "总有功功率" : "总功率因数"],
          },
          {
            name: chart == "myChart2" ? "总有功功率预测" : "总功率因数预测",
            type: "line",
            data: datalist2[
              chart == "myChart2" ? "总有功功率预测" : "总功率因数预测"
            ],
            smooth: true,
            lineStyle: {
              type: "dashed",
              color: "rgba(255, 246, 173, 1)",
              width: 2,
              shadowColor: "rgba(255, 246, 173, .8)",
              shadowBlur: 5,
              shadowOffsetY: 2,
            },
            itemStyle: {
              color: "rgba(255, 246, 173, 1)",
            },
            symbol: "none",
          },
          {
            name: chart == "myChart2" ? "A相有功功率" : "A相功率因数",
            type: "line",
            smooth: true,
            data: datalist1[
              chart == "myChart2" ? "A相有功功率" : "A相功率因数"
            ],
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "rgba(65, 181, 164, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(65, 181, 164, 1)",
              borderColor: "rgba(255, 255, 255, 1)",
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
            name: chart == "myChart2" ? "A相有功功率预测" : "A相功率因数预测",
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
            itemStyle: {
              color: "rgba(65, 181, 164, 1)",
            },
            symbol: "none",
            data: datalist2[
              chart == "myChart2" ? "A相有功功率预测" : "A相功率因数预测"
            ],
          },
          {
            name: chart == "myChart2" ? "B相有功功率" : "B相功率因数",
            type: "line",
            smooth: true,
            data: datalist1[
              chart == "myChart2" ? "B相有功功率" : "B相功率因数"
            ],
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "rgba(88, 143, 255, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(88, 143, 255, 1)",
              borderColor: "rgba(255, 255, 255, 1)",
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
            name: chart == "myChart2" ? "B相有功功率预测" : "B相功率因数预测",
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
            itemStyle: {
              color: "rgba(88, 143, 255, 1)",
            },
            symbol: "none",
            data: datalist2[
              chart == "myChart2" ? "B相有功功率预测" : "B相功率因数预测"
            ],
          },
          {
            name: chart == "myChart2" ? "C相有功功率" : "C相功率因数",
            type: "line",
            smooth: true,
            data: datalist1[
              chart == "myChart2" ? "C相有功功率" : "C相功率因数"
            ],
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "rgba(132, 172, 255, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(132, 172, 255, 1)",
              borderColor: "rgba(255, 255, 255, 1)",
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
            name: chart == "myChart2" ? "C相有功功率预测" : "C相功率因数预测",
            type: "line",
            smooth: true,
            itemStyle: {
              color: "rgba(132, 172, 255, 1)",
            },
            lineStyle: {
              type: "dashed",
              color: "rgba(132, 172, 255, 1)",
              width: 2,
              shadowColor: "rgba(132, 172, 255, .8)",
              shadowBlur: 5,
              shadowOffsetY: 2,
            },
            symbol: "none",
            data: datalist2[
              chart == "myChart2" ? "C相有功功率预测" : "C相功率因数预测"
            ],
          },
        ],
      };
      myChart2.setOption(obj);
      myChart2.on("legendselectchanged", function (params) {
        console.log(params);
        obj.legend = {
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
          data:
            chart == "myChart2"
              ? ["总有功功率", "A相有功功率", "B相有功功率", "C相有功功率"]
              : ["总功率因数", "A相功率因数", "B相功率因数", "C相功率因数"],

          selected:
            chart == "myChart2"
              ? {
                  总有功功率: params.selected["总有功功率"],
                  总有功功率预测: params.selected["总有功功率"],
                  A相有功功率: params.selected["A相有功功率"],
                  B相有功功率: params.selected["B相有功功率"],
                  C相有功功率: params.selected["C相有功功率"],
                  A相有功功率预测: params.selected["A相有功功率"],
                  B相有功功率预测: params.selected["B相有功功率"],
                  C相有功功率预测: params.selected["C相有功功率"],
                }
              : {
                  总功率因数: params.selected["总功率因数"],
                  总功率因数预测: params.selected["总功率因数"],
                  A相功率因数: params.selected["A相功率因数"],
                  B相功率因数: params.selected["B相功率因数"],
                  C相功率因数: params.selected["C相功率因数"],
                  A相功率因数预测: params.selected["A相功率因数"],
                  B相功率因数预测: params.selected["B相功率因数"],
                  C相功率因数预测: params.selected["C相功率因数"],
                },
        };
        myChart2.setOption(obj);
      });
    },
    drawsLine(datalist1, datalist2, chart, string, color, color6) {
      this.$echarts.init(document.getElementById(chart)).dispose();
      let myCharts = this.$echarts.init(document.getElementById(chart));
      let xAxis = datalist2[string + "预测"].map((item) => {
        return item.time;
      });
      let that = this;
      myCharts.setOption({
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "30px",
          left: "7%",
          right: "0px",
        },
        xAxis: {
          type: "category",
          data: xAxis,
          axisLabel: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 12,
            color: "rgba(212, 212, 212, 1)",
          },
          boundaryGap: false,
        },
        yAxis: {
          name: "(%)",
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
          show: false,
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

            let returnData = '<div style="padding: 5px 10px;">';
            if (params.length == 6) {
              params = params.filter((item, index) => index % 2 !== 0);
            }

            for (let i = 0; i < params.length; i++) {
              returnData +=
                '<span style="display:inline-block; width:20px; height:8px; margin-right:5px; border-radius:1px; background-color:' +
                params[i].color +
                '"></span>';
              returnData +=
                '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: ' +
                params[i].color +
                '">' +
                params[i].seriesName +
                '：</span><span style="font-family: Verdana; font-size: 14px; color: ' +
                params[i].color +
                '">' +
                params[i].data.value +
                '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: ' +
                params[i].color +
                '">%</span><br/>';
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
            // label: {
            //   show: true,
            //   position: "top",
            // },
            name: string,
            type: "line",
            smooth: true,
            data: datalist1[string],
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: color,
            },
            itemStyle: {
              color: color,
              borderColor: "rgba(255, 255, 255, 1)",
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
                      color: color6,
                    },
                    {
                      offset: 1,
                      color: "rgba(65, 181, 164, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: color6,
                shadowBlur: 20,
              },
            },
          },
          {
            name: string + "预测",
            type: "line",
            smooth: true,
            lineStyle: {
              type: "dashed",
              color: color,
              width: 2,
              shadowColor: color6,
              shadowBlur: 5,
              shadowOffsetY: 2,
            },
            itemStyle: {
              color: color,
            },
            symbol: "none",
            data: datalist2[string + "预测"],
          },
        ],
      });
    },
    drawsLine2(datalist1, datalist2) {
      let xAxis = datalist2["3次谐波预测"].map((item) => {
        return item.time;
      });

      this.$echarts.init(document.getElementById("myCharts4")).dispose();
      let myCharts4 = this.$echarts.init(document.getElementById("myCharts4"));

      let that = this;
      let obj = {
        grid: {
          top: "30px",
          left: "7%",
          right: "0px",
        },
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
          boundaryGap: false,
        },
        yAxis: {
          name: "(%)",
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
          data: ["3次谐波", "5次谐波", "7次谐波", "9次谐波", "11次谐波"],
          selected: {
            "3次谐波": true,
            "3次谐波预测": true,
            "5次谐波": false,
            "5次谐波预测": false,
            "7次谐波": false,
            "7次谐波预测": false,
            "9次谐波": false,
            "9次谐波预测": false,
            "11次谐波": false,
            "11次谐波预测": false,
          },
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
            let returnData = '<div style="padding: 5px 10px;">';
            if (params.length == 6) {
              params = params.filter((item, index) => index % 2 !== 0);
            }

            for (let i = 0; i < params.length; i++) {
              returnData +=
                '<span style="display:inline-block; width:20px; height:8px; margin-right:5px; border-radius:1px; background-color:' +
                params[i].color +
                '"></span>';
              returnData +=
                '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: ' +
                params[i].color +
                '">' +
                params[i].seriesName +
                '：</span><span style="font-family: Verdana; font-size: 14px; color: ' +
                params[i].color +
                '">' +
                params[i].data.value +
                '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: ' +
                params[i].color +
                '">%</span><br/>';
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
            name: "3次谐波",
            type: "line",
            smooth: true,
            data: datalist1["3次谐波"],
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "rgba(65, 181, 164, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(65, 181, 164, 1)",
              borderColor: "rgba(255, 255, 255, 1)",
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
            name: "3次谐波预测",
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
            itemStyle: {
              color: "rgba(65, 181, 164, 1)",
            },
            symbol: "none",
            data: datalist2["3次谐波预测"],
          },
          {
            name: "5次谐波",
            type: "line",
            smooth: true,
            data: datalist1["5次谐波"],
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "rgba(88, 143, 255, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(88, 143, 255, 1)",
              borderColor: "rgba(255, 255, 255, 1)",
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
            name: "5次谐波预测",
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
            itemStyle: {
              color: "rgba(88, 143, 255, 1)",
            },
            symbol: "none",
            data: datalist2["5次谐波预测"],
          },
          {
            name: "7次谐波",
            type: "line",
            smooth: true,
            data: datalist1["7次谐波"],
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "rgba(132, 172, 255, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(132, 172, 255, 1)",
              borderColor: "rgba(255, 255, 255, 1)",
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
            name: "7次谐波预测",
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
            itemStyle: {
              color: "rgba(132, 172, 255, 1)",
            },
            data: datalist2["7次谐波预测"],
          },
          {
            name: "9次谐波",
            type: "line",
            smooth: true,
            data: datalist1["9次谐波"],
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "rgba(65, 181, 164, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(65, 181, 164, 1)",
              borderColor: "rgba(255, 255, 255, 1)",
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
            name: "9次谐波预测",
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
            itemStyle: {
              color: "rgba(65, 181, 164, 1)",
            },
            data: datalist2["9次谐波预测"],
          },
          {
            name: "11次谐波",
            type: "line",
            smooth: true,
            data: datalist1["11次谐波"],
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "rgba(65, 181, 164, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(65, 181, 164, 1)",
              borderColor: "rgba(255, 255, 255, 1)",
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
            name: "11次谐波预测",
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
            itemStyle: {
              color: "rgba(65, 181, 164, 1)",
            },
            symbol: "none",
            data: datalist2["11次谐波预测"],
          },
        ],
      };
      myCharts4.setOption(obj);
      myCharts4.on("legendselectchanged", function (params) {
        console.log(params);
        obj.legend = {
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
          data: ["3次谐波", "5次谐波", "7次谐波", "9次谐波", "11次谐波"],
          selected: {
            "3次谐波": params.selected["3次谐波"],
            "3次谐波预测": params.selected["3次谐波"],
            "5次谐波": params.selected["5次谐波"],
            "5次谐波预测": params.selected["5次谐波"],
            "7次谐波": params.selected["7次谐波"],
            "7次谐波预测": params.selected["7次谐波"],
            "9次谐波": params.selected["9次谐波"],
            "9次谐波预测": params.selected["9次谐波"],
            "11次谐波": params.selected["11次谐波"],
            "11次谐波预测": params.selected["11次谐波"],
          },
        };
        myCharts4.setOption(obj);
      });
    },

    drawbLine(datalist1, datalist2, chart, string, color, color6) {
      this.$echarts.init(document.getElementById(chart)).dispose();
      let myChartb = this.$echarts.init(document.getElementById(chart));
      let xAxis = datalist2[string + "预测"].map((item) => {
        return item.time;
      });
      let that = this;
      myChartb.setOption({
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "30px",
          left: "7%",
          right: "0px",
        },
        xAxis: {
          type: "category",
          data: xAxis,
          axisLabel: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 12,
            color: "rgba(212, 212, 212, 1)",
          },
          boundaryGap: false,
        },
        yAxis: {
          name: "(kWh)",
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
          show: false,
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
            let returnData = '<div style="padding: 5px 10px;">';
            if (params.length == 6) {
              params = params.filter((item, index) => index % 2 !== 0);
            }

            for (let i = 0; i < params.length; i++) {
              returnData +=
                '<span style="display:inline-block; width:20px; height:8px; margin-right:5px; border-radius:1px; background-color:' +
                params[i].color +
                '"></span>';
              returnData +=
                '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: ' +
                params[i].color +
                '">' +
                params[i].seriesName +
                '：</span><span style="font-family: Verdana; font-size: 14px; color: ' +
                params[i].color +
                '">' +
                params[i].data.value +
                '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: ' +
                params[i].color +
                '">kwh</span><br/>';
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
            // label: {
            //   show: true,
            //   position: "top",
            // },
            name: string,
            type: "line",
            smooth: true,
            data: datalist1[string],
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: color,
            },
            itemStyle: {
              color: color,
              borderColor: "rgba(255, 255, 255, 1)",
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
                      color: color6,
                    },
                    {
                      offset: 1,
                      color: "rgba(65, 181, 164, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: color6,
                shadowBlur: 20,
              },
            },
          },
          {
            name: string + "预测",
            type: "line",
            smooth: true,
            itemStyle: {
              color: color,
            },
            lineStyle: {
              type: "dashed",
              color: color,
              width: 2,
              shadowColor: color6,
              shadowBlur: 5,
              shadowOffsetY: 2,
            },
            symbol: "none",
            data: datalist2[string + "预测"],
          },
        ],
      });
    },

    drawdLine() {
      getstartStop({
        byqNumber: this.searchKey11,
        pdgNumber: this.searchKey22,
      }).then((res) => {
        let that = this;
        this.$echarts.init(document.getElementById("myChartD")).dispose();
        let myChartd = this.$echarts.init(document.getElementById("myChartD"));
        var arrList = res.dataList

        var xAxis = res.dataList.map(item=>{
          return  item.name
        })
        var minHour = 0;
        var maxHour = 24;
        //模拟数据,一个开始时间,对应一个结束时间.
        var hourData =  res.dataList.map(item=>{
          return  item.value
        })

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
                var blankValue =
                  seriesBlank[param.seriesIndex][param.dataIndex];
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
                // align:"right",
                // padding: [0, 60, 0, 0],
                // show: true,
                color: "#fff",
                margin:60,
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

              boundaryGap: false,
            },
          ],
          series: series,
        });
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
  
}
</style>
