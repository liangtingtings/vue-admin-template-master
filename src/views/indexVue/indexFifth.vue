<template>
  <div class="indexFifth-container">
    <el-row style="margin-top: 30px">
      <el-col :span="8">
        <div>
          <span>
            <label>点位选择（ * 最多可选四个参数 ）</label>
            <label style="float: right"
              >当前已选参数{{ this.thirdListCheck.length }}</label
            >
            <div class="listsBox">
              <ul class="listUlbox">
                <label style="display: block; margin-bottom: 14px">类型</label>
                <li
                  class="showCircle"
                  :class="item == showThirdActive ? 'showThirdActive' : ''"
                  @click="showListSecond(item)"
                  v-for="item in optionsList"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
              <div class="showThird">
                <label style="display: block; margin-bottom: 16px">点位</label>
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item
                    :title="item.lable"
                    :name="index + 1"
                    v-for="(item, index) in optionsList2"
                    :key="item"
                  >
                    <div
                      :title="item2.name"
                      v-for="item2 in item.children"
                      :key="item2"
                      :class="
                        item2.id == showSecondActive ? 'showSecondActive' : ''
                      "
                      @click="getThirdList(item2)"
                    >
                      {{ item2.name }}
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
                  @click="checkdataName(index, item)"
                  :class="item.ischeck == true ? 'checkActive' : ''"
                  v-for="(item, index) in thirdList"
                  :key="item"
                  >{{ item.name }}
                  <i v-if="item.ischeck" class="el-icon-check"></i
                ></span>
              </span>
            </div>
            <div class="uploadBtn">
              <div @click="downLoadurl">
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
            v-model="selectType"
            placeholder="请选择"
            popper-class="change-el-select-dropdown"
          >
            <el-option key="1" label="日" value="date"> </el-option>
            <el-option key="2" label="月" value="month"> </el-option>
            <el-option key="3" label="年" value="year"> </el-option>
          </el-select>
          <el-date-picker
            style="width: 180px"
            v-model="selectTime"
            :type="selectType"
            @change="getformLoad"
            popper-class="indexFifth-dropdown"
          >
          </el-date-picker>
          <label style="margin-left: 60px">间隔时间</label>
          <el-select
            v-model="space"
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
          <!-- <div class="doBtn">
            <div>
              <img src="@/assets/index/Icon_quyufangda.png" alt="" /> 区域放大
            </div>
            <div>
              <img src="@/assets/index/Icon_houtui.png" alt="" /> 后退一步
            </div>
            <div>
              <img src="@/assets/index/Icon_huifu.png" alt="" /> 恢复初始状态
            </div>
          </div> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { initHistoryData, formLoad, downLoaddcbb } from "@/api/indexFifth";
export default {
  name: "indexFifth",
  data() {
    return {
      showSecondActive: "",
      showThirdActive: "",
      showThirdBtn: false,
      space: "3",
      selectType: "date",
      selectTime: "",
      // ulList: false,
      activeName: "",
      optionsList: [],
      optionsList2: [],
      options: [
        { value: "0", label: "5分钟" },
        { value: "1", label: "10分钟" },
        { value: "2", label: "30分钟" },
        { value: "3", label: "1个小时" },
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
      thirdList: [],
      thirdListCheck: [],
      dataList: {},
    };
  },
  mounted() {
    this.getformLoad();
    this.getinitHistoryData();
  },
  methods: {
    getinitHistoryData() {
      // type point dataName
      initHistoryData({
        type: this.showThirdActive,
        point: "",
        dataName: "",
      }).then((res) => {
        this.optionsList = res.type;
        this.optionsList2 = res.point;
      });
    },
    showListSecond(item) {
      this.showThirdActive = item;
      this.getinitHistoryData();
    },
    getThirdList(item) {
      this.showSecondActive = item.id;
      this.thirdList = [];
      initHistoryData({
        type: this.showThirdActive,
        point: this.showSecondActive,
        dataName: "",
      }).then((res) => {
        res.dataName.forEach((item) => {
          this.thirdList.push({
            ischeck: false,
            name: item,
          });
        });
      });
    },
    checkdataName(index, item) {
      let arr = [...this.thirdList];
      let selarr = [...this.thirdListCheck];
      if (arr[index].ischeck == false) {
        if (this.thirdListCheck.length == 4) {
          return false;
        }
        arr[index].ischeck = true;
        selarr.push(item);
      } else {
        arr[index].ischeck = false;
        if (selarr.indexOf(index) == -1) {
          selarr.splice(
            selarr.findIndex((ele) => ele.name == item.name),
            1
          );
        }
      }
      this.thirdList = arr;
      this.thirdListCheck = selarr;
    },
    getformLoad() {
      formLoad({
        type: this.showThirdActive,
        point: this.showSecondActive,
        dataName: this.thirdListCheck,
        selectType: this.selectType,
        selectTime: this.selectTime,
        space: this.space,
      }).then((res) => {
        this.dataList = res.dataList;
        this.drawLine(this.dataList);
      });
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
      this.drawLine(this.dataList);
    },
    changesList(dataList) {
      let colorList = [
        "rgba(91, 143, 249, 1)",
        "rgba(144, 106, 255, 1)",
        "rgba(90, 216, 166, 1)",
        "rgba(255, 200, 96, 1)",
      ];
      let colorList1 = [
        "rgba(91, 143, 249, .8)",
        "rgba(144, 106, 255, .8)",
        "rgba(90, 216, 166, .8)",
        "rgba(255, 200, 96, .8)",
      ];
      let imageList = [
        require("@/assets/index/Icon_zuizhi_lan.png"),
        require("@/assets/index/Icon_zuizhi_zi.png"),
        require("@/assets/index/Icon_zuizhi_lv.png"),
        require("@/assets/index/Icon_zuizhi_huang.png"),
      ];
      let sList = [];
      let flag = true;
      let index = 0;
      let avg = false;
      let maxmin = false;
      let dianlag = false;
      for (let i = 0; i < this.statusCheckList.length; i++) {
        if (this.statusCheckList[i].name == "最值") {
          maxmin = true;
        }
        if (this.statusCheckList[i].name == "平均值") {
          avg = true;
        }
        if (this.statusCheckList[i].name == "打点显示") {
          dianlag = true;
        }
      }
      for (var i in dataList) {
        flag = !flag;
        let obj = {
          name: i,
          barWidth: "30%",
          type: "line",
          lineStyle: {
            width: 2,
            color: colorList[index],
            shadowColor: colorList1[index],
            shadowBlur: 5,
            shadowOffsetY: 5,
          },
          itemStyle: {
            normal: {
              fontSize: 11,
              color: colorList[index],
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 1)",
            },
          },
          symbolSize: dianlag ? 5 : 0,
          symbol: "circle",
          smooth: true,
          // showSymbol: false,
          yAxisIndex: flag ? 0 : 1, ////使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
          data: dataList[i].map((item) => {
            return item.value;
          }),
          markPoint: maxmin
            ? {
                symbol: "image://" + imageList[index],
                symbolSize: [25, 30],
                symbolOffset: [0, -12],
                label: {
                  formatter: function (params) {
                    // console.log(params);
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
                      color: colorList[index],
                    },
                  },
                ],
              }
            : "",

          markLine: avg
            ? {
                data: [{ type: "average", name: "Avg" }],
                label: {
                  color: colorList[index],
                  position: "insideStartTop",
                  formatter: function (params) {
                    return "平均值：" + params.value;
                  },
                  fontWeight: "bold",
                  fontSize: 14,
                },
              }
            : "",
        };
        sList.push(obj);
        index++;
      }
      return sList;
    },
    drawLine(dataList) {
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      myChart1.setOption({
        toolbox: {
          right: 80,
          top: 30,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
              title: {
                zoom: "区域放大",
                back: "后退一步",
              },
              icon: {
                zoom:
                  "image://" + require("@/assets/index/Icon_quyufangda.png"),
                back: "image://" + require("@/assets/index/Icon_houtui.png"),
              },
              emphasis: {
                iconStyle: {
                  textBackgroundColor: "rgba(91, 126, 255, 0.5)",
                  textPadding: 10,
                  textBorderRadius: 4,
                  textFill: "#fff",
                  borderWidth: 1,
                  borderColor: "rgba(91, 126, 255, 0.3)",
                },
              },
            },
            restore: {
              type: "png",
              title: "恢复初始状态",
              icon: "image://" + require("@/assets/index/Icon_huifu.png"),
              emphasis: {
                iconStyle: {
                  textBackgroundColor: "rgba(91, 126, 255, 0.5)",
                  textPadding: 10,
                  textBorderRadius: 4,
                  textFill: "#fff",
                  borderWidth: 1,
                  borderColor: "rgba(91, 126, 255, 0.3)",
                },
              },
            },
          },
        },
        // dataZoom: [
        //   {
        //     // startValue: dataList[this.thirdListCheck[0].name].map((item) => {
        //     //   return item.time;
        //     // })[0],
        //     startValue: dataList["A相电流"].map((item) => {
        //       return item.time;
        //     })[0],
        //   },
        //   {
        //     type: "inside",
        //   },
        // ],
        grid: {
          top: 100,
        },
        legend: {
          data: this.thirdListCheck,
          textStyle: {
            color: "#ffffff",
            fontSize: 11,
          },
          y: "bottom",
          x: 120,
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
            data: dataList[this.thirdListCheck[0].name].map((item) => {
              return item.time;
            }),
            // data: dataList["A相电流"].map((item) => {
            //   return item.time;
            // }),
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              // interval: 0, //横轴信息全部显示
              textStyle: {
                color: "#fff",
              },
              fontSize: 11,
              // rotate: 45, //度角倾斜显示
              // formatter: function (value) {
              //   return value.length > 5 ? value.substring(0, 5) + "..." : value;
              // },
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
        series: this.changesList(dataList),
      });
    },
    downLoadurl() {
      if (this.selectType == "year") {
        this.$message({
          message: "暂无功能",
          type: "warning",
        });
        return false;
      }
      downLoaddcbb(this.selectType).then((res) => {
        var url = res.data; // 获取图片地址
        var a = document.createElement("a"); // 创建一个a节点插入的document
        var event = new MouseEvent("click"); // 模拟鼠标click点击事件
        a.download = item.name; // 设置a节点的download属性值
        a.href = url; // 将图片的src赋值给a节点的href
        a.dispatchEvent(event); // 触发鼠标点击事件
      });
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
  cursor: pointer;
  margin-right: 20px;
  float: right;
  width: 220px;
  text-align: center;
  height: 36px;
  line-height: 34px;
  color: #fff;
  font-size: 14px;
  background: linear-gradient(
    90deg,
    rgba(91, 126, 255, 0.4) 0%,
    rgba(138, 191, 255, 0.4) 47%,
    rgba(91, 126, 255, 0.4) 100%
  );
  border-radius: 4px;
  border: 1px solid #5b7eff;
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
  max-height: 505px;
  overflow-y: auto;
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
    overflow-y: auto;
    max-height: 326px;
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
.el-year-table td .cell,
.el-month-table td .cell {
  color: #fff;
}
</style>
