<template>
  <div class="indexContainer">
    <el-row>
      <el-col :span="4">
        asdfasf
      </el-col>
      <el-col :span="14">
        <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img src="@/assets/index/1.jpg" alt="">
              </div>
              <div class="swiper-slide">
                <img src="@/assets/index/2.jpg" alt="">
              </div>
              <!-- <div class="swiper-slide">Slide 3</div> -->
            </div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button">
            <div class="swiper-button-prev"></div>
            <div class="floor-btn">
              <img src="@/assets/index/btn-arrow.png" alt="" class="swiper-img">
              <span>{{activeIndexs}}F</span>
            </div>
            <div class="swiper-button-next"></div>
          </div>

          <!-- 如果需要滚动条 -->
          <!--    <div class="swiper-scrollbar"></div>-->
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <div class="rightNavTop">
            待办事项
            <img
              src="@/assets/index//Img_title_you.png"
              alt=""
              class="rightNavTopimgr"
            />
            <img
              src="@/assets/index//Img_title_zuo.png"
              alt=""
              class="rightNavTopimgl"
            />
            <i class="el-icon-caret-right"></i>
            <i class="el-icon-caret-left"></i>
          </div>
          <div class="rightNavLine"></div>
          <div>
            <ul class="right-ul">
              <li>
                <span class="li-textContain"
                  ><span class="li-colorO">【配电】</span
                  >13F-西南强电间-线电压过电压告…</span
                >
                <span class="li-date">2022-03-03 10:05:32</span>
              </li>
              <li>
                <span class="li-textContain"
                  ><span class="li-colorY">【配电】</span
                  >-西南强电间-线电压过电压线电压过电告…</span
                >
                <span class="li-date">2022-03-03 10:05:32</span>
              </li>
              <li>
                <span class="li-textContain">
                  <span class="li-colorG">【给排水】</span
                  >8F-弱电间-水箱液位超标</span
                >
                <span class="li-date">2022-03-03 10:05:32</span>
              </li>
              <li>
                <span class="li-textContain"
                  ><span class="li-colorR">【消防】</span
                  >13F-西南强电间-线电压过线电压过电电压告…</span
                >
                <span class="li-date">2022-03-03 10:05:32</span>
              </li>
              <li>
                <span class="li-textContain"
                  ><span class="li-colorR">【消防】</span
                  >13F-西南强电间-线电压过线电压过电电压告…</span
                >
                <span class="li-date">2022-03-03 10:05:32</span>
              </li>
            </ul>
            <div class="right-ul-line"></div>
            <div class="right-seeMore">
              <span>查看更多</span
              ><img src="@/assets/index/Icon_gengduo.png" alt="" />
            </div>
          </div>
        </div>
        <div>
          <div class="rightNavTop">
            点位总数
            <i class="el-icon-caret-right"></i>
            <i class="el-icon-caret-left"></i>
          </div>
          <el-row class="zwzsBox">
            <el-col :span="8">
              <div>
                <img src="@/assets/index/Bg_zaixiandianwei.png" alt="" />
                <strong class="color-g">432</strong>
              </div>
              <span>在线点位数</span>
            </el-col>
            <el-col :span="8">
              <div>
                <img src="@/assets/index/Bg_lixiandianwei.png" alt="" />
                <strong class="color-h">22</strong>
              </div>
              <span>离线点位数</span>
            </el-col>
            <el-col :span="8">
              <div>
                <img src="@/assets/index/Bg_guzhangdianwei.png" alt="" />
                <strong class="color-o">54</strong>
              </div>
              <span>故障点位数</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="rightNavTop">
            能耗用电趋势
            <i class="el-icon-caret-right"></i>
            <i class="el-icon-caret-left"></i>
          </div>
          <div style="padding-top: 20px">
            <div id="myChart" :style="{ width: '100%', height: '190px' }"></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>
          <div class="rightNavTop">
            水浸监测区域占比
            <i class="el-icon-caret-right"></i>
            <i class="el-icon-caret-left"></i>
          </div>
          <div style="padding-top: 20px">
            <div
              id="myChart1"
              :style="{ width: '100%', height: '190px' }"
            ></div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <div class="rightNavTop">
            回路信息统计
            <i class="el-icon-caret-right"></i>
            <i class="el-icon-caret-left"></i>
          </div>
          <div id="myChart2" :style="{ width: '100%', height: '190px' }"></div>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <div class="rightNavTop">
            分类用电占比
            <i class="el-icon-caret-right"></i>
            <i class="el-icon-caret-left"></i>
          </div>
          <div style="padding-top: 20px">
            <div
              id="myChart4"
              :style="{ width: '100%', height: '190px' }"
            ></div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <div class="rightNavTop">
            预警统计
            <i class="el-icon-caret-right"></i>
            <i class="el-icon-caret-left"></i>
          </div>
          <div style="padding-top: 20px">
            <div
              id="myChart5"
              :style="{ width: '100%', height: '190px' }"
            ></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Swiper from "swiper";

import { getAllList } from "@/api/indexFirst";
export default {
  name: "IndexFirst",
  data() {
    return {
      activeIndexs: 1,
    };
  },
  mounted() { 
    getAllList({ mid:1999 })
      .then((response) => {
        
      })
      .catch((error) => {
      });
    let that = this
    new Swiper(".swiper-container", {
      direction: "vertical",
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on:{
        slideChange: function() {
          that.activeIndexs = this.activeIndex + 1;
        },
      },
    });
    // 能耗用电趋势
    this.drawLine();
    // 水浸监测区域占比
    this.drawLine1();
    // 回路信息统计
    this.drawLine2();
    // 分类用电占比
    this.drawLine4();
    // 预警统计
    this.drawLine5();
  },
  methods: {
    //   能耗用电趋势
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      let that = this;
      myChart.setOption({
        legend: {
          top: 0,
          right: 20,
          icon: "rect",
          itemWidth: 16,
          itemHeight: 4,
          itemGap: 15,
          textStyle: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 14,
            color: "rgba(255, 255, 255, 1)",
          },
          data: ["同比去年", "去年", "今年"],
        },
        grid: {
          top: "15%",
          left: "5%",
          right: "10%",
          bottom: "10%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "rgba(113, 113, 113, 1)",
            },
          },
          backgroundColor: "rgba(42, 51, 74, 0.6)",
          borderColor: "transparent",
          formatter: function (params) {
            let colors = [
              "rgba(255, 145, 91, 1)",
              "rgba(122, 255, 216, 1)",
              "rgba(108, 181, 255, 1)",
            ];
            let returnData = '<div style="padding: 5px 10px;">';

            for (let i = 0; i < params.length; i++) {
              returnData +=
                '<span style="display:inline-block; width:10px; height:8px; margin-right:5px; border-radius:1px; background-color:' +
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
                params[i].value +
                '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: ' +
                colors[i] +
                '">kwh</span><br/>';
            }
            returnData += "</div>";
            return returnData;
          },
        },
        xAxis: {
          type: "category",
          name: "(月)",
          nameTextStyle: {
            color: "rgba(212, 212, 212, 1)",
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(212, 212, 212, 0.4)",
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 12,
            color: "rgba(212, 212, 212, 1)",
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          boundaryGap: false,
          data: [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ],
        },
        yAxis: {
          type: "value",
          name: "(万)",
          nameTextStyle: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 12,
            color: "rgba(212, 212, 212, 1)",
          },
          min: 0,
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
        series: [
          {
            name: "同比去年",
            type: "line",
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              color: "rgba(255, 145, 91, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(255, 145, 91, 0.8)",
              borderColor: "rgba(255, 145, 91, 0.8)",
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
                      color: "rgba(255, 145, 91, 0.8)",
                    },
                    {
                      offset: 1,
                      color: "rgba(255, 145, 91, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(255, 145, 91, 0.8)",
                shadowBlur: 20,
              },
            },
            data: [444, 84, 205, 97, 555, 79, 645, 55, 222, 35, 431, 2],
          },
          {
            name: "去年",
            type: "line",
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              color: "rgba(122, 255, 216, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(122, 255, 216, 0.8)",
              borderColor: "rgba(122, 255, 216, 0.8)",
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
                      color: "rgba(122, 255, 216, 0.8)",
                    },
                    {
                      offset: 1,
                      color: "rgba(122, 255, 216, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(122, 255, 216, 0.8)",
                shadowBlur: 20,
              },
            },
            data: [502, 84, 205, 97, 332, 79, 281, 55, 398, 35, 214, 2],
          },
          {
            name: "今年",
            type: "line",
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              color: "rgba(108, 181, 255, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(108, 181, 255, 0.8)",
              borderColor: "rgba(108, 181, 255, 0.8)",
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
                      color: "rgba(108, 181, 255, 0.8)",
                    },
                    {
                      offset: 1,
                      color: "rgba(108, 181, 255, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(108, 181, 255, 0.8)",
                shadowBlur: 20,
              },
            },
            data: [281, 55, 398, 35, 214, 2, 179, 55, 289, 57, 356, 14],
          },
        ],
      });
    },
    // 水浸监测区域占比
    drawLine1() {
      let color = [
        "rgba(98, 91, 255, 1)",
        "rgba(91, 126, 255, 1)",
        "rgba(255, 219, 91, 1)",
        "rgba(91, 178, 255, 1)",
        "rgba(91, 255, 250, 1)",
        "rgba(119, 246, 165, 1)",
        "rgba(203, 255, 91, 1)",
        "rgba(255, 219, 91, 1)",
        "rgba(255, 159, 91, 1)",
      ];
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart1.setOption({
        title: {
          text: "本月事件: 26  环比上月:+6",
          textStyle: {
            fontSize: 14,
            color: "#CECECE",
          },
          bottom: 0,
          left: "10%",
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "rgba(113, 113, 113, 1)",
            },
          },
          backgroundColor: "rgba(42, 51, 74, 0.6)",
          borderColor: "transparent",
          formatter: function (params) {
            let colors = [
              "rgba(255, 145, 91, 1)",
              "rgba(122, 255, 216, 1)",
              "rgba(108, 181, 255, 1)",
            ];
            let returnData = '<div style="padding: 5px 10px;">';

            for (let i = 0; i < params.length; i++) {
              returnData +=
                '<span style="display:inline-block; width:10px; height:8px; margin-right:5px; border-radius:1px; background-color:' +
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
                params[i].value +
                '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: ' +
                colors[i] +
                '">kwh</span><br/>';
            }
            returnData += "</div>";
            return returnData;
          },
        },
        legend: {
          width: "50%",
          height: "50%",
          orient: "vertical",
          top: "24%",
          right: 20,
          icon: "circle",
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 14,
            color: "rgba(255, 255, 255, 1)",
          },

          data: [
            "强电间",
            "弱电间",
            "配电室",
            "管井间",
            "空调总管道",
            "生活水房",
            "换热机房",
            "消防泵房",
            "电梯底坑",
          ],
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: function (params) {
                  return color[params.dataIndex];
                },
                borderWidth: 2,
                opacity: 1,
              },
            },
            type: "pie",
            radius: ["40%", "70%"],
            center: ["30%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
              itemStyle: {
                borderWidth: 2,
                borderColor: "#fff",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 1048,
                name: "强电间",
                itemStyle: {
                  normal: {
                    borderWidth: 2,
                    shadowBlur: 2,
                    borderColor: "#FFDB5B",
                    shadowColor: "#FFDB5B",
                  },
                },
              },
              { value: 735, name: "弱电间" },
              { value: 580, name: "配电室" },
              { value: 484, name: "管井间" },
              { value: 300, name: "空调总管道" },
              { value: 735, name: "生活水房" },
              { value: 580, name: "换热机房" },
              { value: 484, name: "消防泵房" },
              { value: 300, name: "电梯底坑" },
            ],
          },
        ],
      });
    },
    drawLine2() {
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      let dataMax = 60;
      const source = {
        data: [43, 30, 28, 35, 50],
        indicator: [
          { name: "家政服务", max: dataMax },
          { name: "助餐服务", max: dataMax },
          { name: "助医服务", max: dataMax },
          { name: "待办服务", max: dataMax },
          { name: "交谈服务", max: dataMax },
        ],
      };
      const buildSeries = function (data) {
        const helper = data.map((item, index) => {
          const arr = new Array(data.length);
          arr.splice(index, 1, item);
          return arr;
        });

        return [data, ...helper].map((item, index) => {
          return {
            type: "radar",
            itemStyle: {
              color: "#31e586",
            },
            symbol: "circle", //圆点
            symbolSize: 0, //圆点大小
            lineStyle: {
              color: index === 0 ? "rgba(36,173,254,1)" : "transparent",
            },
            areaStyle: {
              normal: {
                // 单项区域填充样式
                color: {
                  type: "radial",
                  x: 0.5, //右
                  y: 0.5, //下
                  r: 1,
                  colorStops: [
                    {
                      offset: 1,
                      color: "rgba(91, 126, 255, .7)",
                    },
                    {
                      offset: 0,
                      color: "rgba(91, 194, 255, .7)",
                    },
                  ],
                  globalCoord: false,
                },
                opacity: 0.8, // 区域透明度
              },
            },
            tooltip: {
              axisPointer: {
                type: "line",
                lineStyle: {
                  color: "rgba(255, 255, 255, 1)",
                },
              },
              textStyle: {
                fontFamily: "MicrosoftYaHei",
                fontSize: 14,
                color: "rgba(255, 255, 255, 1)",
              },
              backgroundColor: "rgba(42, 51, 74, 0.6)",
              borderColor: "transparent",
              show: index === 0 ? false : true,
              formatter: function () {
                let string = "<span>11111</span>";
                string +=
                  source.indicator[index - 1].name +
                  "不满意度：" +
                  source.data[index - 1] +
                  "%";
                return string;
              },
            },
            z: index === 0 ? 1 : 2,
            data: [item],
          };
        });
      };
      myChart2.setOption({
        tooltip: {
          showContent: true,
        },
        legend: {
          show: true,
          textStyle: {
            fontSize: 14,
            color: "#fff",
          },
        },
        radar: {
          name: {
            show: true,
            color: "#CECECE",
            fontSize: "14px",
          },
          splitNumber: 4,
          splitArea: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: "rgba(233, 233, 233, .35)",
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(233, 233, 233, .35)",
            },
          },
          indicator: source.indicator,
        },
        series: [...buildSeries(source.data)],
      });
    },
    // 分类用电占比
    drawLine4() {
      let myChart4 = this.$echarts.init(document.getElementById("myChart4"));
      // 绘制图表
      let that = this;

      let color = [
        "rgba(98, 91, 255, 1)",
        "rgba(91, 126, 255, 1)",
        "rgba(91, 178, 255, 1)",
        "rgba(91, 255, 250, 1)",
        "rgba(119, 246, 165, 1)",
        "rgba(203, 255, 91, 1)",
        "rgba(255, 219, 91, 1)",
        "rgba(255, 159, 91, 1)",
      ];
      myChart4.setOption({
        title: {
          text: "统计范围: 上周                        单位:kwh",
          textStyle: {
            fontSize: 14,
            color: "#CECECE",
          },
          bottom: 0,
          left: "10%",
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(42, 51, 74, 0.6)",
          borderColor: "transparent",
          textStyle: {
            color: "#E2E2E2",
          },
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          top: 0,
          right: 10,
          icon: "circle",
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 14,
            color: "rgba(255, 255, 255, 1)",
          },
          dat: [
            "通信专业",
            "调度专业",
            "信息专业",
            "公共照明",
            "消防用能",
            "公共设备",
            "办公区域",
            "其他",
          ],
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: function (params) {
                  return color[params.dataIndex];
                },
                borderWidth: 2,
                opacity: 1,
              },
            },
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: [
              {
                value: 335,
                name: "通信专业",
                itemStyle: {
                  normal: {
                    borderWidth: 2,
                    shadowBlur: 2,
                    borderColor: "#FFDB5B",
                    shadowColor: "#FFDB5B",
                  },
                },
              },
              { value: 300, name: "调度专业" },
              { value: 274, name: "信息专业" },
              { value: 235, name: "公共照明" },
              { value: 400, name: "消防用能" },
              { value: 315, name: "公共设备" },
              { value: 380, name: "办公区域" },
              { value: 200, name: "其他" },
            ].sort(function (a, b) {
              return b.value - a.value;
            }),
            roseType: "radius",
            label: {
              color: "rgba(255, 255, 255,1)",
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.6)",
              },
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      });
    },
    // 预警统计
    drawLine5() {
      let myChart5 = this.$echarts.init(document.getElementById("myChart5"));
      // 绘制图表
      let that = this;
      myChart5.setOption({
        legend: {
          top: 0,
          right: 20,
          icon: "rect",
          itemWidth: 16,
          itemHeight: 4,
          itemGap: 15,
          textStyle: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 14,
            color: "rgba(255, 255, 255, 1)",
          },
          data: ["同比去年", "去年", "今年"],
        },
        grid: {
          top: "15%",
          left: "5%",
          right: "10%",
          bottom: "10%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "rgba(113, 113, 113, 1)",
            },
          },
          backgroundColor: "rgba(42, 51, 74, 0.6)",
          borderColor: "transparent",
          formatter: function (params) {
            let colors = [
              "rgba(255, 145, 91, 1)",
              "rgba(122, 255, 216, 1)",
              "rgba(108, 181, 255, 1)",
            ];
            let returnData = '<div style="padding: 5px 10px;">';

            for (let i = 0; i < params.length; i++) {
              returnData +=
                '<span style="display:inline-block; width:10px; height:8px; margin-right:5px; border-radius:1px; background-color:' +
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
                params[i].value +
                '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: ' +
                colors[i] +
                '">kwh</span><br/>';
            }
            returnData += "</div>";
            return returnData;
          },
        },
        xAxis: {
          type: "category",
          name: "(月)",
          nameTextStyle: {
            color: "rgba(212, 212, 212, 1)",
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(212, 212, 212, 0.4)",
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 12,
            color: "rgba(212, 212, 212, 1)",
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          data: [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ],
        },
        yAxis: {
          type: "value",
          name: "(万)",
          nameTextStyle: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 12,
            color: "rgba(212, 212, 212, 1)",
          },
          min: 0,
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
        series: [
          {
            barWidth: 10,
            name: "同比去年",
            type: "bar",
            stack: "total",
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              color: "rgba(255, 145, 91, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(255, 145, 91, 0.8)",
              borderColor: "rgba(255, 145, 91, 0.8)",
              borderWidth: 2,
            },
            areaStyle: {
              normal: {
                backgroundColor: "rgba(154, 255, 192, 1)",
                shadowColor: "rgba(255, 145, 91, 0.8)",
                shadowBlur: 20,
              },
            },
            data: [444, 84, 205, 97, 555, 79, 645, 55, 222, 35, 431, 2],
          },
          {
            name: "去年",
            barWidth: 10,
            type: "bar",
            stack: "total",
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              color: "rgba(122, 255, 216, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(122, 255, 216, 0.8)",
              borderColor: "rgba(122, 255, 216, 0.8)",
              borderWidth: 2,
            },
            areaStyle: {
              normal: {
                backgroundColor: "rgba(154, 255, 192, 1)",
                shadowColor: "rgba(122, 255, 216, 0.8)",
                shadowBlur: 20,
              },
            },
            data: [502, 84, 205, 97, 332, 79, 281, 55, 398, 35, 214, 2],
          },
          {
            name: "今年",
            barWidth: 10,
            type: "bar",
            stack: "total",
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              color: "rgba(108, 181, 255, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(108, 181, 255, 0.8)",
              borderColor: "rgba(108, 181, 255, 0.8)",
              borderWidth: 2,
            },
            areaStyle: {
              normal: {
                backgroundColor: "rgba(154, 255, 192, 1)",
                shadowColor: "rgba(108, 181, 255, 0.8)",
                shadowBlur: 20,
              },
            },
            data: [281, 55, 398, 35, 214, 2, 179, 55, 289, 57, 356, 14],
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss">
.swiper-button-prev, .swiper-button-next {
  width: 94px;
  height: 24px;
  background-size: 94px 24px;
  background-image: url(../../assets/index/arrow1.png);
  top: initial;
  right: auto;
}
.swiper-button-prev {
  left: auto;
  bottom: 80px;
}
.floor-btn {
  position: relative;
  bottom: 27px;
}
.floor-btn span {
  font-size: 16px;
  position: absolute;
  left: 42px;
  top: 11px;
  color: #fff;
}
.swiper-button-next {
  transform: rotate(180deg);
}
.indexContainer {
  // padding: 46px 6px;
}
.swiper-container {
  // height: 570px!important;
}
.swiper-slide {
  height: 100%!important;
}
.indexContainer .swiper-slide img {
  display: block;
  width: 80%;
  height: 100%;
  margin-left: auto; 
}
.swiper-button {
  position: absolute;
  bottom: 20%;
  right: 10px;
  z-index: 2;
}
.rightNavTop {
  font-size: 14px;
}
.swiper-container {
  width: 74%;
  position:fixed;
  top: 30px;
  left: 0;
  height: 80%;
  z-index: 0;
  .swiper-wrapper {
    .swiper-slide {
      text-align: center;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-right: 50px;
      // background: linear-gradient(90deg, rgba(16, 26, 60, 0) 0%, #101A3C 100%);
      text-align: center;
      line-height: 500px;
    }
  }
}
</style>
<style lang="scss" scoped>
/*css主要部分的样式*/
/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

::-webkit-scrollbar {
  width: 8px; /*对垂直流动条有效*/
  height: 8px; /*对水平流动条有效*/
}

/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background: linear-gradient(
    180deg,
    rgba(16, 26, 60, 0) 0%,
    rgba(16, 26, 60, 1) 100%
  );
  border-radius: 3px;
}

/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background: linear-gradient(
    180deg,
    rgba(91, 126, 255, 1) 0%,
    rgba(138, 191, 255, 1) 50%,
    rgba(91, 126, 255, 1) 100%
  );
}

/*定义两端按钮的样式*/
// ::-webkit-scrollbar-button {
// background-color:cyan;
// }

/*定义右下角汇合处的样式*/
::-webkit-scrollbar-corner {
  background: khaki;
}
.el-col {
  padding: 9px;
}
.rightNavLine {
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(91, 126, 255, 0.03) 0%,
    #5b7eff 50%,
    rgba(91, 126, 255, 0.03) 100%
  );
}
.rightNavTop {
  .rightNavTopimgr {
    position: absolute;
    right: 0;
    height: 100%;
  }
  .rightNavTopimgl {
    position: absolute;
    left: 0;
    height: 100%;
  }
  width: 100%;
  height: 34px;
  line-height: 34px;
  text-align: center;
  color: #fff;
  font-weight: 500;
  background: linear-gradient(
    90deg,
    rgba(91, 126, 255, 0.03) 0%,
    rgba(91, 126, 255, 0.75) 50%,
    rgba(91, 126, 255, 0.03) 100%
  );
  //   background: url("../../assets/index/Bg_title.png") no-repeat;
  //   background-size:cover;
  position: relative;
  i {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    color: rgba(255, 226, 152, 1);
    font-size: 20px;
    display: inline-block;
    width: 20px;
    height: 34px;
    line-height: 34px;
  }
  .el-icon-caret-right {
    left: 5px;
  }
  .el-icon-caret-left {
    right: 5px;
  }
}
.right-ul {
  height: 150px;
  overflow-y: auto;
  font-size: 14px;
  color: #fff;
  list-style: none;
  text-align: left;
  margin: 0;
  padding: 0px 10px 16px;
  li {
    margin: 16px 0px 0px;
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .li-textContain {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 68%;
    box-sizing: border-box;
    padding-right: 3%;
  }
  .li-colorO {
    color: rgba(255, 190, 161, 1);
  }
  .li-colorY {
    color: rgba(255, 236, 146, 1);
  }
  .li-colorG {
    color: rgba(168, 255, 213, 1);
  }
  .li-colorR {
    color: rgba(255, 105, 204, 1);
  }
  .li-date {
    color: rgba(215, 215, 215, 1);
  }
}
.right-ul-line {
  height: 1px;
  width: 100%;
  background: url("../../assets/index/Img_daiban_line.png");
}
.right-seeMore {
  font-size: 14px;
  font-weight: 400;
  line-height: 36px;
  text-align: right;
  cursor: pointer;
  span {
    margin-right: 6px;
    color: #d7d7d7;
    vertical-align: middle;
  }
  img {
    vertical-align: middle;
  }
}
.zwzsBox {
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  div {
    display: inline-block;
    position: relative;
  }
  span {
    vertical-align: middle;
    margin-left: 6px;
    display: inline-block;
    width: 55%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  img {
    vertical-align: middle;
  }
  strong {
    position: absolute;
    top: 0;
    margin: auto;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 16px;
    font-family: DIN-Bold, DIN;
    font-weight: bold;
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 20px;
    line-height: 20px;
  }
}
.color-g {
  color: #96ffbd;
}
.color-h {
  color: #97a5d6;
}
.color-o {
  color: #ff7b5b;
}
</style>
