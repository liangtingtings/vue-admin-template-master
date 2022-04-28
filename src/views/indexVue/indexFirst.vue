<template>
  <div class="indexContainer">
    <el-row>
      <el-col :span="4" style="z-index: 1; position: relative">
        <ul class="ulBox">
          <li
            :style="{
              height:
                eventList.length > 0
                  ? (eventList[0]['应急事件'] / eventAll) * 100 + '%'
                  : '25%',
            }"
          >
            <img src="@/assets/index/yingji_shang.png" alt="" class="topImg" />
            <div class="barBox"></div>
            <img src="@/assets/index/yingji_xia.png" alt="" class="bottomImg" />
            <div class="numBox">
              <span style="margin-right: 5px">应急事件</span
              ><span style="font-weight: bold; color: #ff2121">{{
                eventList.length > 0 ? eventList[0]["应急事件"] : 0
              }}</span>
            </div>
          </li>
          <li
            :style="{
              height:
                eventList.length > 0
                  ? (eventList[1]['应急事件'] / eventAll) * 100 + '%'
                  : '25%',
            }"
          >
            <img src="@/assets/index/gaojing_shang.png" alt="" class="topImg" />
            <div class="barBox barBox2"></div>
            <img
              src="@/assets/index/gaojing_xia.png"
              alt=""
              class="bottomImg"
            />
            <div class="numBox numBox2">
              <span style="margin-right: 5px">告警事件</span
              ><span style="font-weight: bold; color: rgba(255, 114, 70, 1)">{{
                eventList.length > 0 ? eventList[1]["应急事件"] : 0
              }}</span>
            </div>
          </li>
          <li
            :style="{
              height:
                eventList.length > 0
                  ? (eventList[2]['预警事件'] / eventAll) * 100 + '%'
                  : '25%',
            }"
          >
            <img src="@/assets/index/yujing_shang.png" alt="" class="topImg" />
            <div class="barBox barBox3"></div>
            <img src="@/assets/index/yujing_xia.png" alt="" class="bottomImg" />
            <div class="numBox numBox3">
              <span style="margin-right: 5px">预警事件</span
              ><span style="font-weight: bold; color: rgba(255, 169, 51, 1)">{{
                eventList.length > 0 ? eventList[2]["预警事件"] : 0
              }}</span>
            </div>
          </li>
          <li
            :style="{
              height:
                eventList.length > 0
                  ? (eventList[3]['故障事件'] / eventAll) * 100 + '%'
                  : '25%',
            }"
          >
            <img src="@/assets/index/guzhang_shang.png" alt="" class="topImg" />
            <div class="barBox barBox4"></div>
            <img
              src="@/assets/index/guzhang_xia.png"
              alt=""
              class="bottomImg"
            />
            <div class="numBox numBox4">
              <span style="margin-right: 5px">故障事件</span
              ><span style="font-weight: bold; color: rgba(255, 235, 101, 1)">{{
                eventList.length > 0 ? eventList[3]["故障事件"] : 0
              }}</span>
            </div>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <div class="swiper-container">
          <img
            src="@/assets/floor/zhezhao_shang.png"
            alt=""
            class="zhezhao_shang zhezhao"
          />
          <img
            src="@/assets/floor/zhezhao_xia.png"
            alt=""
            class="zhezhao_xia zhezhao"
          />
          <img
            src="@/assets/floor/zhezhao_zuo.png"
            alt=""
            class="zhezhao_zuo zhezhao"
          />
          <img
            src="@/assets/floor/zhezhao_you.png"
            alt=""
            class="zhezhao_you zhezhao"
          />
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in imglists" :key="item.key">
              <img :src="item.url" alt="" />
            </div>
          </div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button">
            <div class="swiper-button-prev"></div>
            <div class="floor-btn">
              <img
                src="@/assets/index/btn-arrow.png"
                alt=""
                class="swiper-img"
              />
              <span>{{ imglists[activeIndexs - 1].key }}F</span>
            </div>
            <div class="swiper-button-next"></div>
          </div>

          <!-- 如果需要滚动条 -->
          <!--    <div class="swiper-scrollbar"></div>-->
        </div>
      </el-col>
      <el-col :span="8">
        <div class="rightNavTop">
          楼宇健康度
          <img
            src="@/assets/index/Img_title_you.png"
            alt=""
            class="rightNavTopimgr"
          />
          <img
            src="@/assets/index/Img_title_zuo.png"
            alt=""
            class="rightNavTopimgl"
          />
          <i class="el-icon-caret-right"></i>
          <i class="el-icon-caret-left"></i>
        </div>
        <div>
          <div class="aqdjBg">
            <div class="hoverBox">
              <div class="hoverBoxbg">
                <div>
                  <span
                    style="
                      font-weight: bold;
                      margin-right: 100px;
                      font-size: 14px;
                    "
                    >楼宇健康度</span
                  >
                  <img src="@/assets/index/aq.png" alt="" />
                  <span> 安全评估 </span>
                  <span class="colorOg">35</span>
                  <span class="colorCg">分</span>
                  <img src="@/assets/index/pf.png" alt="" />
                  <span> 风险等级 </span>
                  <span class="colorOg">III</span>
                  <span class="colorCg">级</span>
                </div>
                <div class="right-ul-line" style="margin-top: 10px"></div>
                <el-row>
                  <el-col :span="10">
                    <div>
                      <span class="width100">系统状态</span>
                      <span class="colorBg">79</span>
                      <span>/ 100</span>
                    </div>
                    <div>
                      <span class="width100">配电运行监控<i>*</i></span>
                      <span class="colorOg">45</span>
                      <span>/ 100</span>
                    </div>
                    <div>
                      <span class="width100">环境量</span>
                      <span>100</span>
                      <span>/ 100</span>
                    </div>
                  </el-col>
                  <el-col :span="10">
                    <div>
                      <span class="width100">水系统</span>
                      <span class="colorBg">79</span>
                      <span>/ 100</span>
                    </div>
                    <div>
                      <span class="width100">消防系统<i>*</i></span>
                      <span class="colorOg">45</span>
                      <span>/ 100</span>
                    </div>
                    <div>
                      <span class="width100">安防系统</span>
                      <span>100</span>
                      <span>/ 100</span>
                    </div>
                  </el-col>
                  <el-col :span="4" style="padding-top: 24px">
                    <span class="colorOg">30</span><span>/ 100</span>
                    <br />
                    <span style="color: rgba(212, 212, 212, 1)">应急管理</span>
                  </el-col>
                </el-row>
              </div>
              <!-- <div class="hoverBoxbg">
                <div>
                  <span
                    style="
                      font-weight: bold;
                      margin-right: 100px;
                      font-size: 14px;
                    "
                    >楼宇健康度</span
                  >
                  <img src="@/assets/index/aq.png" alt="" />
                  <span> 安全评估 </span>
                  <span class="colorOg">35</span>
                  <span class="colorCg">分</span>
                  <img src="@/assets/index/pf.png" alt="" />
                  <span> 风险等级 </span>
                  <span class="colorOg">III</span>
                  <span class="colorCg">级</span>
                </div>
                <div class="right-ul-line" style="margin-top: 10px"></div>
                <el-row>
                  <el-col :span="9">
                    <div>
                      <span class="width100">系统状态</span>
                      <span class="colorBg">79</span>
                      <span>/ 100</span>
                    </div>
                    <div>
                      <span class="width100">报警</span>
                      <span class="colorOg">45</span>
                      <span>/ 100</span>
                    </div>
                    <div>
                      <span class="width100">电参数</span>
                      <span>100</span>
                      <span>/ 100</span>
                    </div>
                    <div>
                      <span class="width100">通信状态</span>
                      <span>100</span>
                      <span>/ 100</span>
                    </div>
                  </el-col>
                  <el-col :span="9">
                    <div>
                      <span class="width100">母排测温</span>
                      <span class="colorBg">79</span>
                      <span>/ 100</span>
                    </div>
                    <div>
                      <span class="width100">水浸</span>
                      <span class="colorOg">45</span>
                      <span>/ 100</span>
                    </div>
                    <div>
                      <span class="width100">温湿度</span>
                      <span>100</span>
                      <span>/ 100</span>
                    </div>
                    <div>
                      <span class="width100">烟感</span>
                      <span>100</span>
                      <span>/ 100</span>
                    </div>
                  </el-col>
                  <el-col :span="6" style="padding-top:10px;text-align:center">
                    <span class="colorOg">30</span><span>/ 100</span>
                    <br />
                    <span style="color: rgba(212, 212, 212, 1)">巡检及时率</span>
                    <span class="colorOg">30</span><span>/ 100</span>
                    <br />
                    <span style="color: rgba(212, 212, 212, 1)">工单</span>
                  </el-col>
                </el-row>
              </div> -->
            </div>
            <el-row>
              <el-col :span="9" style="padding: 0"
                ><div class="aqdjbox">
                  <img src="@/assets/index/Img_anquanpinggu.png" alt="" />
                  <span class="widthtext"> 安全评估 </span>
                  <span class="colorOg">35</span>
                  <span class="colorCg">分</span>
                </div></el-col
              >
              <el-col :span="9" style="padding: 0"
                ><div class="aqdjbox" style="margin-bottom: 10px">
                  <img src="@/assets/index/Img_fengxiandengji.png" alt="" />
                  <span class="widthtext"> 风险等级 </span>
                  <span class="colorOg">III</span>
                  <span class="colorCg">级</span>
                </div></el-col
              >
              <el-col :span="6" style="padding: 0; text-align: right"
                ><div class="right-seeMore">
                  <span>评分细则</span
                  ><img src="@/assets/index/Icon_gengduo.png" alt="" /></div
              ></el-col>
            </el-row>
          </div>
        </div>

        <div>
          <el-row>
            <el-col :span="16">
              <div>
                <div class="rightNavTop">
                  待办事项
                  <img
                    src="@/assets/index/Img_title_you.png"
                    alt=""
                    class="rightNavTopimgr"
                  />
                  <img
                    src="@/assets/index/Img_title_zuo.png"
                    alt=""
                    class="rightNavTopimgl"
                  />
                  <i class="el-icon-caret-right"></i>
                  <i class="el-icon-caret-left"></i>
                </div>
                <div class="rightNavLine"></div>
                <div>
                  <ul class="right-ul">
                    <li v-for="(item, i) in todoList" :key="i">
                      <span class="li-textContain">
                        <span class="li-colorO" v-if="item['配电']"
                          >【配电】</span
                        >
                        {{ item["配电"] }}
                      </span>
                      <span class="li-textContain" v-if="item['电梯']">
                        <span class="li-colorY">【电梯】</span>
                        {{ item["电梯"] }}
                      </span>
                      <span class="li-textContain" v-if="item['给排水']">
                        <span class="li-colorG">【给排水】</span>
                        {{ item["给排水"] }}
                      </span>
                      <span class="li-textContain" v-if="item['消防']">
                        <span class="li-colorR">【消防】</span>
                        {{ item["消防"] }}
                      </span>
                      <span class="li-textContain" v-if="item['空调']">
                        <span class="li-colorR">【空调】</span>
                        {{ item["空调"] }}
                      </span>
                      <span class="li-textContain" v-if="item['环境']">
                        <span class="li-colorR">【环境】</span>
                        {{ item["环境"] }}
                      </span>
                      <span class="li-date">{{ item["时间"] }}</span>
                    </li>
                  </ul>
                  <div class="right-ul-line"></div>
                  <div class="right-seeMore">
                    <span>查看更多</span
                    ><img src="@/assets/index/Icon_gengduo.png" alt="" />
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="rightNavTop">
                点位总数
                <img
                  src="@/assets/index/Img_title_you.png"
                  alt=""
                  class="rightNavTopimgr"
                />
                <img
                  src="@/assets/index/Img_title_zuo.png"
                  alt=""
                  class="rightNavTopimgl"
                />
                <i class="el-icon-caret-right"></i>
                <i class="el-icon-caret-left"></i>
              </div>
              <el-row class="zwzsBox">
                <div class="zwzsBoxi">
                  <div>
                    <img
                      src="@/assets/index/Bg_zaixiandianwei.png"
                      alt=""
                      class="anm-img"
                    />
                    <strong class="color-g">{{
                      this.pointList.length > 0
                        ? this.pointList[0]["在线点位数"]
                        : 0
                    }}</strong>
                  </div>
                  <span>在线点位数</span>
                </div>
                <div class="zwzsBoxi">
                  <div>
                    <img
                      src="@/assets/index/Bg_lixiandianwei.png"
                      alt=""
                      class="anm-img"
                    />
                    <strong class="color-h">{{
                      this.pointList.length > 0
                        ? this.pointList[1]["离线点位数"]
                        : 0
                    }}</strong>
                  </div>
                  <span>离线点位数</span>
                </div>
                <div class="zwzsBoxi">
                  <div>
                    <img
                      src="@/assets/index/Bg_guzhangdianwei.png"
                      alt=""
                      class="anm-img"
                    />
                    <strong class="color-o">{{
                      this.pointList.length > 0
                        ? this.pointList[2]["故障点位数"]
                        : 0
                    }}</strong>
                  </div>
                  <span>故障点位数</span>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div>
          <!-- <div>
            <div class="rightNavTop">
              水浸监测区域占比
              <img
                src="@/assets/index/Img_title_you.png"
                alt=""
                class="rightNavTopimgr"
              />
              <img
                src="@/assets/index/Img_title_zuo.png"
                alt=""
                class="rightNavTopimgl"
              />
              <i class="el-icon-caret-right"></i>
              <i class="el-icon-caret-left"></i>
            </div>
            <div style="padding-top: 20px; position: relative">
              <div
                id="myChart1"
                :style="{ width: '100%', height: '190px' }"
              ></div>
              <el-row
                style="
                  position: absolute;
                  bottom: -10px;
                  color: #fff;
                  text-align: center;
                  width: 100%;
                "
              >
                <el-col :span="12">
                  本月事件：
                  {{ waterList.length > 0 ? waterList[0]["本月事件"] : 0 }}
                </el-col>
                <el-col :span="12" style="">
                  环比上月：
                  <span style="color: rgba(255, 63, 63, 1); font-weight: bold"
                    >+{{
                      waterList.length > 0 ? waterList[0]["环比上月"] : 0
                    }}</span
                  >
                  <img src="@/assets/index/Icon_shangsheng.png" alt=""
                /></el-col>
              </el-row>
            </div>
          </div> -->
          <div class="rightNavTop">
            楼栋总用电量趋势及预测
            <img
              src="@/assets/index/Img_title_you.png"
              alt=""
              class="rightNavTopimgr"
            />
            <img
              src="@/assets/index/Img_title_zuo.png"
              alt=""
              class="rightNavTopimgl"
            />
            <i class="el-icon-caret-right"></i>
            <i class="el-icon-caret-left"></i>
          </div>
          <div style="position: relative">
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
              :style="{ width: '100%', height: '170px' }"
            ></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>
          <div class="rightNavTop">
            能耗用电趋势
            <img
              src="@/assets/index/Img_title_you.png"
              alt=""
              class="rightNavTopimgr"
            />
            <img
              src="@/assets/index/Img_title_zuo.png"
              alt=""
              class="rightNavTopimgl"
            />
            <i class="el-icon-caret-right"></i>
            <i class="el-icon-caret-left"></i>
          </div>
          <div style="padding-top: 20px">
            <div id="myChart" :style="{ width: '100%', height: '190px' }"></div>
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="6">
        <div>
          <div class="rightNavTop">
            水浸监测区域占比
            <img
              src="@/assets/index/Img_title_you.png"
              alt=""
              class="rightNavTopimgr"
            />
            <img
              src="@/assets/index/Img_title_zuo.png"
              alt=""
              class="rightNavTopimgl"
            />
            <i class="el-icon-caret-right"></i>
            <i class="el-icon-caret-left"></i>
          </div>
          <div style="padding-top: 20px; position: relative">
            <div
              id="myChart1"
              :style="{ width: '100%', height: '190px' }"
            ></div>
            <el-row
              style="
                position: absolute;
                bottom: -10px;
                color: #fff;
                text-align: center;
                width: 100%;
              "
            >
              <el-col :span="12">
                本月事件：
                {{ waterList.length > 0 ? waterList[0]["本月事件"] : 0 }}
              </el-col>
              <el-col :span="12" style="">
                环比上月：
                <span style="color: rgba(255, 63, 63, 1); font-weight: bold"
                  >+{{
                    waterList.length > 0 ? waterList[0]["环比上月"] : 0
                  }}</span
                >
                <img src="@/assets/index/Icon_shangsheng.png" alt=""
              /></el-col>
            </el-row>
          </div>
        </div>
      </el-col> -->
      <el-col :span="6">
        <div>
          <div class="rightNavTop">
            回路信息统计
            <img
              src="@/assets/index/Img_title_you.png"
              alt=""
              class="rightNavTopimgr"
            />
            <img
              src="@/assets/index/Img_title_zuo.png"
              alt=""
              class="rightNavTopimgl"
            />
            <i class="el-icon-caret-right"></i>
            <i class="el-icon-caret-left"></i>
          </div>
          <div style="position: relative">
            <div id="myChart2" :style="{ width: '70%', height: '190px' }"></div>
            <div class="LoopBox">
              <div>
                <span style="color: #fff; font-size: 16px">{{ loopCount }}</span
                >条
              </div>
              <div>总回路数量</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <div class="rightNavTop">
            分类用电占比
            <img
              src="@/assets/index/Img_title_you.png"
              alt=""
              class="rightNavTopimgr"
            />
            <img
              src="@/assets/index/Img_title_zuo.png"
              alt=""
              class="rightNavTopimgl"
            />
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
            事件统计
            <img
              src="@/assets/index/Img_title_you.png"
              alt=""
              class="rightNavTopimgr"
            />
            <img
              src="@/assets/index/Img_title_zuo.png"
              alt=""
              class="rightNavTopimgl"
            />
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
import {
  getselectTrendTableList, 
} from "@/api/indexSecond";
export default {
  name: "IndexFirst",
  data() {
    return {
      imglists: [
        { url: require("@/assets/floor/1F.png"), key: 1 },
        { url: require("@/assets/floor/2F.png"), key: 2 },
        { url: require("@/assets/floor/3F.png"), key: 3 },
        { url: require("@/assets/floor/4F.png"), key: 4 },
        { url: require("@/assets/floor/5F.png"), key: 5 },
        { url: require("@/assets/floor/6F.png"), key: 6 },
        { url: require("@/assets/floor/7F.png"), key: 7 },
        { url: require("@/assets/floor/8F.png"), key: 8 },
        { url: require("@/assets/floor/9F.png"), key: 9 },
        { url: require("@/assets/floor/10F.png"), key: 10 },
        { url: require("@/assets/floor/11F.png"), key: 11 },
        { url: require("@/assets/floor/12F.png"), key: 12 },
        { url: require("@/assets/floor/13F.png"), key: 13 },
        { url: require("@/assets/floor/14F.png"), key: 14 },
        { url: require("@/assets/floor/15F.png"), key: 15 },
        { url: require("@/assets/floor/16F.png"), key: 16 },
        { url: require("@/assets/floor/17F.png"), key: 17 },
        { url: require("@/assets/floor/18F.png"), key: 18 },
        { url: require("@/assets/floor/19F.png"), key: 19 },
        { url: require("@/assets/floor/20F.png"), key: 20 },
        { url: require("@/assets/floor/21F.png"), key: 21 },
        { url: require("@/assets/floor/22F.png"), key: 22 },
        { url: require("@/assets/floor/23F.png"), key: 23 },
        { url: require("@/assets/floor/B1F.png"), key: "B1" },
        { url: require("@/assets/floor/B2F.png"), key: "B2" },
        { url: require("@/assets/floor/B3F.png"), key: "B3" },
      ],
      spanActives1: "今日楼栋总用电量趋势预测",
      lists1: ["今日楼栋总用电量趋势预测", "本月楼栋总用电量趋势预测"],
      activeIndexs: 1,
      eventList: [], //事件
      todoList: [], //代办
      electricityList: [], //用电
      loopList: [], // 回路信息统计
      loopCount: 0,
      pointList: [], // 总点位数
      waterList: [], // 水浸检监测区域占比
      energyConsumptionList: [], // 能耗用电趋势
      statisticalList: [], // 预计统计
      eventAll: 0,
    };
  },
  mounted() {
    getAllList({ mid: 1999 })
      .then((response) => {
        this.eventAll =
          response["事件列表"][0]["应急事件"] +
          response["事件列表"][1]["应急事件"] +
          response["事件列表"][2]["预警事件"] +
          response["事件列表"][3]["故障事件"];
        this.eventList = response["事件列表"];
        this.todoList = response["代办事项"];
        this.electricityList = response["分类用电占比"];
        this.loopList = response["回路信息统计"];
        this.pointList = response["总点位数"];
        this.waterList = response["水浸检监测区域占比"];
        this.energyConsumptionList = response["能耗用电趋势"];
        this.statisticalList = response["预计统计"];

        // 能耗用电趋势
        this.drawLine();
        // 水浸监测区域占比
        this.drawLine1();
        // 回路信息统计
        this.drawLine2();
        // 分类用电占比
        this.drawLine4();
        // 事件统计
        this.drawLine5();
        this.$forceUpdate();
        // this.drawsLine(
        //   res.dataList.table_1.dataList_1,
        //   res.dataList.table_1.dataList_2,
        //   "myCharts1",
        //   "楼栋总用电量趋势",
        //   "rgba(91, 126, 255, 1)",
        //   "rgba(91, 126, 255, .6)"
        // );
      })
      .catch((error) => {});
    let that = this;
    new Swiper(".swiper-container", {
      direction: "vertical",
      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        slideChange: function () {
          that.activeIndexs = this.activeIndex + 1;
        },
      },
    });
  },
  methods: {
    // 楼栋总用电、
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
    getChangeList(spanActive, type, chart, string, color, color6) {
      getselectTrendTableList({
        byqNumber: this.searchKey1,
        pdgNumber: this.searchKey2,
        ct: this.searchKey3,
        tableData: spanActive,
      }).then((res) => {
        this.drawsLine(
          res.dataList.dataList_1,
          res.dataList.dataList_2,
          chart,
          string,
          color,
          color6
        );
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
          backgroundColor: "rgba(13, 14, 16, .76)",
          borderColor: "transparent",
          formatter: function (params) {
            console.log(params);
            let colors = [
              "rgba(255, 145, 91, 1)",
              "rgba(122, 255, 216, 1)",
              "rgba(108, 181, 255, 1)",
            ];
            let returnData = '<div style="padding: 5px 10px;">';

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
                (params[i].seriesName == "同比去年"
                  ? params[i].value
                  : params[i].value) +
                '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: ' +
                colors[i] +
                '">' +
                (params[i].seriesName == "同比去年" ? "%" : "kwh") +
                "</span><br/>";
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
        yAxis: [
          {
            type: "value",
            name: "(kwh)",
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
          {
            type: "value",
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
        ],
        series: [
          {
            name: "同比去年",
            yAxisIndex: 1,
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
            data: this.energyConsumptionList[2],
          },
          {
            name: "去年",
            // yAxisIndex:0,
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
            data: this.energyConsumptionList[1],
          },
          {
            name: "今年",
            // yAxisIndex:0,
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
            data: this.energyConsumptionList[0],
          },
        ],
      });
    },
    // 水浸监测区域占比
    drawLine1() {
      let color = [
        "rgba(98, 91, 255, .6)",
        "rgba(91, 126, 255, .6)",
        "rgba(255, 219, 91, .6)",
        "rgba(91, 178, 255, .6)",
        "rgba(91, 255, 250, .6)",
        "rgba(119, 246, 165, .6)",
        "rgba(203, 255, 91, .6)",
        "rgba(255, 219, 91, .6)",
        "rgba(255, 159, 91, .6)",
      ];
      let color1 = [
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
      let list = JSON.parse(JSON.stringify(this.waterList));
      delete list[0]["环比上月"];
      delete list[0]["本月事件"];
      let xlist = Object.keys(list[0]);
      let ylist = Object.values(list[0]);
      let allCount = ylist.reduce((n, m) => n + m);
      let arr = [];
      for (let i = 0; i < xlist.length; i++) {
        let obj = {
          value: ylist[i],
          name: xlist[i],
          itemStyle: {
            normal: {
              borderWidth: 2,
              shadowBlur: 2,
              borderColor: color1[i],
              shadowColor: color1[i],
            },
          },
        };
        console.log(obj);
        arr.push(obj);
      }
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart1.setOption({
        // title: {
        //   text:
        //     "本月事件: " +
        //     this.waterList[0]["本月事件"] +
        //     "     环比上月:" +
        //     (this.waterList[0]["环比上月"] > 0 ? "+" : "-") +
        //     this.waterList[0]["环比上月"],
        //   textStyle: {
        //     fontSize: 14,
        //     color: "#CECECE",
        //   },
        //   bottom: 0,
        //   left: "10%",
        // },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(13, 14, 16, .76)",
          borderColor: "transparent",
          textStyle: {
            color: "#E2E2E2",
          },
          formatter: function (params) {
            console.log(params);
            let string =
              "<span style='display:inline-block;width:10px;height:10px;margin-right:10px;border-radius:50%;background:" +
              params.borderColor +
              ";'></span><span style='margin-right:40px'>" +
              params.name +
              "</span>" +
              params.percent +
              "%";

            return string;
          },
        },
        legend: {
          width: "50%",
          height: "60%",
          orient: "vertical",
          top: "20%",
          right: 20,
          icon: "circle",
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 14,
            color: "rgba(255, 255, 255, 1)",
          },

          data: xlist,
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
            center: ["30%", "40%"],
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
            data: arr,
          },
        ],
      });
    },
    drawLine2() {
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      let imgUrl = require("@/assets/index/jiantou.png");
      // 绘制图表
      let xlist = Object.keys(this.loopList[0]);
      let ylist = Object.values(this.loopList[0]);

      ylist.forEach((item) => {
        this.loopCount = this.loopCount + item;
      });

      let dataMax = Math.max(...ylist);
      const source = {
        data: ylist,
        indicator: [],
      };
      for (let i = 0; i < xlist.length; i++) {
        let obj = {
          name: xlist[i],
          max: dataMax + 10,
        };
        source.indicator.push(obj);
      }

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
            radius: "50%", //大小
            nameGap: 20, // 图中工艺等字距离图的距离
            center: ["50%", "50%"], // 图的位置
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
              backgroundColor: "rgba(13, 14, 16, .76)",
              borderColor: "transparent",
              show: index === 0 ? false : true,
              formatter: function (params) {
                console.log(params);
                let string =
                  "<img src=" +
                  imgUrl +
                  " style='vertical-align: middle;margin-right:10px' alt='' /><span style='margin-right:40px'>" +
                  xlist[params.seriesIndex - 1] +
                  "</span>" +
                  params.data[params.seriesIndex - 1] +
                  "条";

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
          radius: "70%", //大小
          nameGap: 20, // 图中工艺等字距离图的距离
          center: ["50%", "58%"], // 图的位置
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
            symbolSize: [20, 15],
            symbol: ["none", "arrow"],
            symbolOffset: [0, 15],
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
        "rgba(98, 91, 255, .6)",
        "rgba(91, 126, 255, .6)",
        "rgba(91, 178, 255, .6)",
        "rgba(91, 255, 250, .6)",
        "rgba(119, 246, 165, .6)",
        "rgba(203, 255, 91, .6)",
        "rgba(255, 219, 91, .6)",
        "rgba(255, 159, 91, .6)",
      ];
      let color1 = [
        "rgba(98, 91, 255, 1)",
        "rgba(91, 126, 255, 1)",
        "rgba(91, 178, 255, 1)",
        "rgba(91, 255, 250, 1)",
        "rgba(119, 246, 165, 1)",
        "rgba(203, 255, 91, 1)",
        "rgba(255, 219, 91, 1)",
        "rgba(255, 159, 91, 1)",
      ];
      let list = JSON.parse(JSON.stringify(this.electricityList));
      let xlist = Object.keys(list[0]);
      let ylist = Object.values(list[0]);
      let arr = [];
      for (let i = 0; i < xlist.length; i++) {
        let obj = {
          value: ylist[i],
          name: xlist[i],
          itemStyle: {
            normal: {
              borderWidth: 2,
              shadowBlur: 2,
              borderColor: color1[i],
              shadowColor: color1[i],
            },
          },
        };
        arr.push(obj);
      }

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
          backgroundColor: "rgba(13, 14, 16, .76)",
          borderColor: "transparent",
          textStyle: {
            color: "#E2E2E2",
          },
          formatter: function (params) {
            console.log(params);
            let string =
              "<span style='display:inline-block;width:10px;height:10px;margin-right:10px;border-radius:50%;background:" +
              params.borderColor +
              ";'></span><span>" +
              params.name +
              "</span><br><br><span style='margin-right:40px'>" +
              params.value +
              "</span>" +
              params.percent +
              "%";

            return string;
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
            fontSize: 12,
            color: "rgba(255, 255, 255, 1)",
          },
          data: xlist,
        },
        // visualMap: {
        //   show: false,
        //   min: 80,
        //   max: 600,
        //   inRange: {
        //     colorLightness: [0, .6],
        //   },
        // },
        series: [
          {
            itemStyle: {
              normal: {
                color: function (params) {
                  return color[params.dataIndex];
                },
                borderWidth: 2,
                opacity: 0.6,
              },
            },
            type: "pie",
            radius: "55%",
            center: ["40%", "40%"],
            data: arr.sort(function (a, b) {
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
    // 事件统计
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
          data: ["突发事件", "装置越限", "设备通信"],
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
          backgroundColor: "rgba(13, 14, 16, .85)",
          borderColor: "transparent",
          formatter: function (params) {
            console.log(params);
            let colors = [
              "rgba(255, 78, 51, 1)",
              "rgba(255, 122, 36, 1)",
              "rgba(255, 222, 82, 1)",
            ];
            let returnData = '<div style="padding: 5px 10px;">';
            let arrAll = 0;
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
                '：</span><span style="font-family: Verdana; font-size: 14px;color:#fff;margin-left:30px;">' +
                params[i].value +
                "</span><br/>";
              arrAll += params[i].value;
            }
            returnData +=
              "<br/><span style='color:#fff'>" +
              params[0].axisValue +
              "月事件统计共  " +
              arrAll +
              "</span>";
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
          // name: "(万)",
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
            name: "突发事件",
            barWidth: 10,
            type: "bar",
            stack: "total",
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              color: "rgba(255, 78, 51, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(255, 78, 51, .6)",
              borderColor: "rgba(255, 78, 51, .6)",
              borderWidth: 2,
            },
            areaStyle: {
              normal: {
                backgroundColor: "rgba(255, 78, 51, 1)",
                shadowColor: "rgba(255, 78, 51, .6)",
                shadowBlur: 20,
              },
            },
            data: this.statisticalList[0],
          },
          {
            name: "装置越限",
            barWidth: 10,
            type: "bar",
            stack: "total",
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              color: "rgba(255, 122, 36,  1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(255, 122, 36,  .6)",
              borderColor: "rgba(255, 122, 36,  .6)",
              borderWidth: 2,
            },
            areaStyle: {
              normal: {
                backgroundColor: "rgba(255, 122, 36,  1)",
                shadowColor: "rgba(255, 122, 36,  .6)",
                shadowBlur: 20,
              },
            },
            data: this.statisticalList[1],
          },
          {
            barWidth: 10,
            name: "设备通信",
            type: "bar",
            stack: "total",
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              color: "rgba(255, 222, 82, 1)",
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "rgba(255, 222, 82, .6)",
              borderColor: "rgba(255, 222, 82, .6)",
              borderWidth: 2,
            },
            areaStyle: {
              normal: {
                backgroundColor: "rgba(255, 222, 82, 1)",
                shadowColor: "rgba(255, 222, 82, .6)",
                shadowBlur: 20,
              },
            },

            data: this.statisticalList[2],
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss">
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
img.anm-img {
  animation: turn 5s linear infinite;
}
#myChart2 {
  padding-top: 20px;
  box-sizing: border-box;
}
.LoopBox {
  position: absolute;
  width: 105px;
  right: 20px;
  top: 0;
  bottom: 0;
  margin: auto;
  background: url("../../assets/index/Img_tuli_huiluxinxi.png") no-repeat;
  background-size: cover;
  height: 72px;
  color: rgba(206, 206, 206, 1);
  box-sizing: border-box;
  padding-top: 15px;
  text-align: center;
  font-size: 14px;
  // display: flex;
  // align-items: center;
  // justify-content: center;
}
.swiper-button-prev,
.swiper-button-next {
  width: 94px;
  height: 24px;
  background-size: 94px 24px;
  background-image: url("../../assets/index/arrow1.png");
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
  .toptitle {
    padding: 15px 0px;
  }
}
.swiper-container {
  // height: 570px!important;
}
.swiper-slide {
  height: 100% !important;
}
.indexContainer .swiper-slide img {
  display: block;
  // width: 80%;
  // height: 100%;
  margin: auto;
}
.swiper-button {
  position: absolute;
  bottom: 35%;
  right: 35%;
  z-index: 2;
}
.rightNavTop {
  font-size: 14px;
}
.swiper-container {
  .zhezhao {
    position: absolute;
    z-index: 2;
  }
  .zhezhao_shang {
    top: 0;
  }
  .zhezhao_xia {
    bottom: 0;
  }
  .zhezhao_zuo {
    left: 0;
  }
  .zhezhao_you {
    right: 0;
  }
  width: 100%;
  position: fixed;
  top: 50px;
  left: 0;
  height: 100%;
  z-index: 0;
  .swiper-wrapper {
    position: relative;
    width: 84%;
    img.cover-img {
      position: absolute;
      z-index: 0;
    }
    img.cover-img1 {
      top: 0;
    }

    img.cover-img2 {
      bottom: 0;
    }

    img.cover-img3 {
      left: 0;
    }
    img.cover-img4 {
      right: 0;
    }

    .swiper-slide {
      text-align: center;
      width: 100%;
      height: 95%;
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
  height: 155px;
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
    width: 63%;
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
.aqdjBg:hover {
  .hoverBox {
    display: block;
  }
}
.aqdjBg {
  .el-col-10,
  .el-col-9 {
    margin-top: 10px;
    border-right: 1px dotted rgba(255, 255, 255, 0.3);
    padding-top: 0px;
    padding-right: 0px;
  }
  position: relative;
  span,
  img {
    display: inline-block;
    vertical-align: middle;
    color: #ffffff;
    font-size: 14px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .colorOg {
    color: rgba(255, 145, 91, 1);
    font-weight: bold;
    width: 20px;
    text-align: center;
    margin-right: 2px;
  }
  .colorBg {
    color: rgba(103, 157, 255, 1);
    margin-right: 2px;
  }
  .widthtext {
    width: 70px;
    cursor: pointer;
    position: relative;
  }
  .colorCg {
    color: rgba(225, 225, 225, 1);
  }
  .hoverBox::after {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid rgba(23, 39, 90, 0.8);
    border-bottom: 10px solid transparent;
    position: absolute;
    right: -10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .hoverBox::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid rgba(91, 126, 255, 0.3);
    border-bottom: 10px solid transparent;
    position: absolute;
    right: -10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .hoverBox {
    display: none;
    position: absolute;
    width: 482px;
    background: rgba(91, 126, 255, 0.3);
    left: -500px;
    top: -40px;

    .hoverBoxbg {
      background: rgba(23, 39, 90, 0.8);
      padding: 12px;
      span {
        margin-right: 0;
        min-width: 27px;
        text-align: center;
      }
      .width100 {
        text-align: left;
        width: 92px;
        margin-right: 0px;
        color: rgba(212, 212, 212, 1);
      }
    }
  }
}
.zwzsBox {
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  .zwzsBoxi {
    margin-top: 15px;
    width: 100%;
  }
  div {
    display: inline-block;
    position: relative;
    text-align: center;
  }
  span {
    vertical-align: middle;
    margin-left: 6px;
    // margin-top: 15px;
    display: inline-block;
    // width: 55%;
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
.ulBox {
  height: 455px;
  li {
    list-style: none;
    position: relative;
    width: 19px;
    height: 25%;
    margin-bottom: 30px;
    img {
      position: absolute;
    }
    .topImg {
      top: -13px;
    }
    .bottomImg {
      bottom: -12px;
    }
  }
}
.barBox {
  width: 17px;
  height: 100%;
  background-image: url("../../assets/index/bar1.png");
  background-size: 100% 100%;
  margin: 0 auto;
}
.barBox2 {
  background-image: url("../../assets/index/bar2.png");
}
.barBox3 {
  background-image: url("../../assets/index/bar3.png");
}
.barBox4 {
  background-image: url("../../assets/index/bar4.png");
}
.numBox {
  background: url("../../assets/index/Bg_yingji.png");
  background-size: 100% 100%;
  position: absolute;
  left: 5px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 167px;
  height: 41px;
  text-align: right;
  color: #fff;
  line-height: 34px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding-right: 15px;
  font-size: 14px;
}
.numBox2 {
  background: url("../../assets/index/Bg_gaojing.png");
}
.numBox3 {
  background: url("../../assets/index/Bg_yujing.png");
}
.numBox4 {
  background: url("../../assets/index/Bg_guzhang.png");
}
</style>
