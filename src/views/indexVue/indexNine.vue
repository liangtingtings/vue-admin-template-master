<template>
  <div class="indexSecond-container">
    <el-row style="text-align: center; margin-bottom: 20px">
      <el-col :span="24" style="margin-top:5%">
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
    <div>
      <div style="width: 1300px; height: 550px; margin: 0 auto">
        <div id="myChartD" :style="{ width: '100%', height: '100%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  getstartStop,
  getInitStartStop,
} from "@/api/indexSecond";
export default {
  name: "indexNine",
  data() {
    return {
      options11: [],
      options22: [],
      searchKey11: "",
      searchKey22: "",
    };
  },
  mounted() {
    this.getListB();
  },
  methods: {
    getListB() {
      this.searchKey11 = "";
      this.options11 = [];
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
    drawdLine() {
      getstartStop({
        byqNumber: this.searchKey11,
        pdgNumber: this.searchKey22,
      }).then((res) => {
        let that = this;
        this.$echarts.init(document.getElementById("myChartD")).dispose();
        let myChartd = this.$echarts.init(document.getElementById("myChartD"));
        var arrList = res.dataList;

        var xAxis = res.dataList.map((item) => {
          return item.name;
        });
        var minHour = 0;
        var maxHour = 24;
        //模拟数据,一个开始时间,对应一个结束时间.
        var hourData = res.dataList.map((item) => {
          return item.value;
        });

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
                margin: 60,
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
