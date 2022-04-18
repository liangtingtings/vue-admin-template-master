<template>
  <div class="indexSeven-container">
    <el-row>
      <el-col :span="24" class="statusBox">
        <ul class="listUlbox sevenlistUlbox">
          <label>阈值列表</label>
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
      </el-col>
      <el-col
        :span="24"
        style="padding: 30px 0"
        class="tableBox"
        v-if="showThirdActive == '电表点位个性化阈值'"
      >
        <el-table
          header-align="center"
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            key="1"
            align="center"
            label="序号"
            prop="xh"
            width="100"
          >
            <template slot-scope="scope">
              <span class="colorc">{{ scope.row.xh }}</span>
            </template>
          </el-table-column>

          <el-table-column
            key="2"
            align="center"
            label="变压器编号"
            prop="byqNumber"
          >
          </el-table-column>
          <el-table-column
            key="3"
            align="center"
            prop="pdgNumber"
            label="配电柜编号"
          >
          </el-table-column>
          <el-table-column key="4" align="center" prop="ct" label="抽屉柜编号">
          </el-table-column>
          <el-table-column
            key="5"
            align="center"
            prop="eqName"
            label="设备名称"
          >
          </el-table-column>
          <el-table-column
            key="6"
            align="center"
            prop="czgNumber"
            label="负载柜编号"
          >
          </el-table-column>
          <el-table-column key="7" align="center" prop="zbg" label="主备供">
          </el-table-column>
          <el-table-column
            key="8"
            align="center"
            prop="sdy"
            label="双电源对应柜号"
          >
          </el-table-column>
          <el-table-column
            key="9"
            align="center"
            prop="czgPosition"
            label="负载柜位置"
          >
          </el-table-column>
          <el-table-column key="10" align="center" prop="sszy" label="所属专业">
          </el-table-column>
          <el-table-column key="11" align="center" label="" width="200">
            <template slot="header">
              阈值（<img
                src="@/assets/index/Img_jiaobiao.png"
                alt=""
                srcset=""
              />
              代表已设置阈值）
            </template>
            <template slot-scope="scope">
              <span class="editBtn" @click="getDetail(scope.row.id)">
                <span class="ineditBtn">
                  <img
                    src="@/assets/index/Img_jiaobiao.png"
                    alt=""
                    class="topImg"
                    v-if="scope.row.isSet == 1"
                  />
                  <img src="@/assets/index/Icon_bianji.png" alt="" />
                  <span>编辑</span>
                </span>
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
      <el-col
        :span="24"
        style="padding: 30px 0"
        class="tableBox"
        v-if="showThirdActive == '电表点位共性化阈值'"
      >
        <el-table
          header-align="center"
          :data="tableData1"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column key="12" align="center" label="序号" prop="xh">
            <template slot-scope="scope">
              <span class="colorc">{{ scope.row.xh }}</span>
            </template>
          </el-table-column>

          <el-table-column key="13" align="center" label="参数项" prop="cs">
          </el-table-column>
          <el-table-column key="14" align="center" label="阈值设置">
            <template slot-scope="scope">
              <el-input
                style="width: 90px; background: rgba(171, 189, 255, 0.1)"
                v-model="scope.row.start"
                readonly
              ></el-input>
              {{ scope.row.dw }} <span style="margin: 0px 10px"> —— </span>
              <el-input
                style="width: 90px; background: rgba(171, 189, 255, 0.1)"
                v-model="scope.row.stop"
                readonly
              ></el-input>
              {{ scope.row.dw }}
            </template>
          </el-table-column>

          <el-table-column key="15" align="center" width="200" label="编辑">
            <!-- <template slot="header" slot-scope="scope">
              阈值（<img
                src="@/assets/index/Img_jiaobiao.png"
                alt=""
                srcset=""
              />
              代表已设置阈值）
            </template> -->
            <template slot-scope="scope">
              <span class="editBtn" @click="getDetail1(scope.row.id,1)">
                <span class="ineditBtn">
                  <!-- <img
                    src="@/assets/index/Img_jiaobiao.png"
                    alt=""
                    class="topImg"
                  /> -->
                  <img src="@/assets/index/Icon_bianji.png" alt="" />
                  <span>编辑</span>
                </span>
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
      <el-col
        :span="24"
        style="padding: 30px 0"
        class="tableBox"
        v-if="showThirdActive == '其他点位阈值'"
      >
        <el-table
          header-align="center"
          :data="tableData2"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column key="16" align="center" label="序号" prop="xh">
            <template slot-scope="scope">
              <span class="colorc">{{ scope.row.xh }}</span>
            </template>
          </el-table-column>
          <el-table-column
            key="17"
            align="center"
            label="点位类型"
            prop="dwType"
          >
          </el-table-column>
          <el-table-column key="18" align="center" label="参数项" prop="cs">
          </el-table-column>
          <el-table-column key="19" align="center" label="阈值设置">
            <template slot-scope="scope">
              <el-input
                style="width: 90px; background: rgba(171, 189, 255, 0.1)"
                v-model="scope.row.start"
                readonly
              ></el-input>
              {{ scope.row.dw }} <span style="margin: 0px 10px"> —— </span>
              <el-input
                style="width: 90px; background: rgba(171, 189, 255, 0.1)"
                v-model="scope.row.stop"
                readonly
              ></el-input>
              {{ scope.row.dw }}
            </template>
          </el-table-column>

          <el-table-column key="20" align="center" width="200" label="编辑">
            <!-- <template slot="header" slot-scope="scope">
              阈值（<img
                src="@/assets/index/Img_jiaobiao.png"
                alt=""
                srcset=""
              />
              代表已设置阈值）
            </template> -->
            <template slot-scope="scope">
              <span class="editBtn" @click="getDetail1(scope.row.id,2)">
                <span class="ineditBtn">
                  <!-- <img
                    src="@/assets/index/Img_jiaobiao.png"
                    alt=""
                    class="topImg"
                  /> -->
                  <img src="@/assets/index/Icon_bianji.png" alt="" />
                  <span>编辑</span>
                </span>
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
    <el-dialog
      width="800px"
      title="阈值编辑"
      :visible.sync="dialogFormVisible"
      class="perDialog"
    >
      <el-form :model="form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="A相电流阈值" :label-width="formLabelWidth">
              <el-input
                style="width: 90px"
                v-model="form.Ia"
                @change="change1"
              ></el-input
              >(A)
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="A相功率阈值" :label-width="formLabelWidth">
              <el-input
                style="width: 90px"
                v-model="form.aKw"
                @change="change2"
              ></el-input
              >(kW)
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="A相日负荷率" :label-width="formLabelWidth">
              <el-input
                style="width: 90px"
                v-model="form.aRfh"
                @change="change3"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="B相电流阈值" :label-width="formLabelWidth">
              <el-input
                style="width: 90px"
                v-model="form.Ib"
                @change="change4"
              ></el-input
              >(A)
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="B相功率阈值" :label-width="formLabelWidth">
              <el-input
                style="width: 90px"
                v-model="form.bKw"
                @change="change5"
              ></el-input
              >(kW)
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="B相日负荷率" :label-width="formLabelWidth">
              <el-input
                style="width: 90px"
                v-model="form.bRfh"
                @change="change6"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="C相电流阈值" :label-width="formLabelWidth">
              <el-input
                style="width: 90px"
                v-model="form.Ic"
                @change="change7"
              ></el-input
              >(A)
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="C相功率阈值" :label-width="formLabelWidth">
              <el-input
                style="width: 90px"
                v-model="form.cKw"
                @change="change8"
              ></el-input
              >(kW)
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="C相日负荷率" :label-width="formLabelWidth">
              <el-input
                style="width: 90px"
                v-model="form.cRfh"
                @change="change9"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div
              style="
                text-align: right;
                color: rgba(225, 225, 225, 1);
                cursor: pointer;
              "
            >
              <span
                @click="showSame = !showSame"
                class="checkBtnno"
                :class="showSame ? 'active' : ''"
              ></span>
              <span @click="showSame = !showSame">勾选统一同类型参数阈值</span>
            </div>
            <div class="el-dialog__footer" style="padding-bottom: 10px">
              <span class="addBtn" @click="personThresholdSavebtn">
                保 存
              </span>
              <span class="addBtn closeBtn" @click="dialogFormVisible = false">
                取 消
              </span>
            </div>
            <div class="line-perDialog"></div>
          </el-col>
          <el-col :span="24">
            <el-form-item label="抽屉柜参数" :label-width="formLabelWidth">
              空开：{{ form.kk }}A
              <span style="margin-right: 30px"></span> 负载功率：{{
                form.fzgl
              }}kW
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      width="500px"
      title="阈值编辑"
      :visible.sync="dialogForm1Visible"
      class="perDialog"
    >
      <el-form :model="form1" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="form1.downName">
              <el-input style="width: 90px" v-model="form1.down"></el-input
              >{{ form1.dw }}
            </el-form-item>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <el-form-item :label="form1.upName" label-width="100px">
              <el-input style="width: 90px" v-model="form1.up"></el-input
              >{{ form1.dw }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="el-dialog__footer" style="padding-bottom: 10px">
              <span class="addBtn" @click="commonThresholdSavebtn">
                保 存
              </span>
              <span class="addBtn closeBtn" @click="dialogForm1Visible = false">
                取 消
              </span>
            </div>
            <div class="line-perDialog"></div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    
  </div>
</template>

<script>
import {
  getpersonThresholdList,
  getpersonThresholdDetail,
  personThresholdSave,
  commonThresholdList,
  commonThresholdDetail,
  commonThresholdSave,
  otherThresholdList, 
} from "@/api/indexSeven";
export default {
  name: "indexSeven",
  data() {
    return {
      dialogForm2Visible: false,
      dialogForm1Visible: false,
      showSame: false,
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {},
      form1: {},
      form2: {},
      showThirdActive: "电表点位个性化阈值",
      tableData: [],
      tableData1: [],
      tableData2: [],
      total: 0,
      currentPage: 1,
      optionsList: ["电表点位个性化阈值", "电表点位共性化阈值", "其他点位阈值"],
    };
  },
  mounted() {
    this.personThresholdList();
  },
  methods: {
    change1() {
      this.form.Ib = this.showSame ? this.form.Ia : this.form.Ib;
      this.form.Ic = this.showSame ? this.form.Ia : this.form.Ic;
    },
    change2() {
      this.form.bKw = this.showSame ? this.form.aKw : this.form.bKw;
      this.form.cKw = this.showSame ? this.form.aKw : this.form.cKw;
    },
    change3() {
      this.form.bRfh = this.showSame ? this.form.aRfh : this.form.bRfh;
      this.form.cRfh = this.showSame ? this.form.aRfh : this.form.cRfh;
    },
    change4() {
      this.form.Ia = this.showSame ? this.form.Ib : this.form.Ia;
      this.form.Ic = this.showSame ? this.form.Ib : this.form.Ic;
    },
    change5() {
      this.form.aKw = this.showSame ? this.form.bKw : this.form.aKw;
      this.form.cKw = this.showSame ? this.form.bKw : this.form.cKw;
    },
    change6() {
      this.form.aRfh = this.showSame ? this.form.bRfh : this.form.aRfh;
      this.form.cRfh = this.showSame ? this.form.bRfh : this.form.cRfh;
    },
    change7() {
      this.form.Ib = this.showSame ? this.form.Ic : this.form.Ib;
      this.form.Ia = this.showSame ? this.form.Ic : this.form.Ia;
    },
    change8() {
      this.form.bKw = this.showSame ? this.form.cKw : this.form.bKw;
      this.form.aKw = this.showSame ? this.form.cKw : this.form.aKw;
    },
    change9() {
      this.form.bRfh = this.showSame ? this.form.cRfh : this.form.bRfh;
      this.form.aRfh = this.showSame ? this.form.cRfh : this.form.aRfh;
    },
    commonThresholdSavebtn() {
      commonThresholdSave({
        id: this.form1.id,
        up: this.form1.up,
        down: this.form1.down,
      },this.form1.type).then((res) => {
        this.$message({
          message: "保存成功！",
          type: "success",
        });
        this.dialogForm1Visible = false;
      });
    },
    personThresholdSavebtn() {
      personThresholdSave(this.form).then((res) => {
        this.$message({
          message: "保存成功！",
          type: "success",
        });
        this.dialogFormVisible = false;
      });
    },
    getDetail(id) {
      getpersonThresholdDetail({ id: id }).then((res) => {
        this.form = res;
        this.form.id = id;
        this.dialogFormVisible = true;
        this.showSame = false;
      });
    },
    getDetail1(id,type) {
      commonThresholdDetail({ id: id },type).then((res) => {
        this.dialogForm1Visible = true;
        this.form1 = res;
        this.form1.id = id; 
        this.form1.type = type;
      });
    },
    personThresholdList() {
      getpersonThresholdList({
        page: this.currentPage,
      }).then((res) => {
        console.log(res);
        this.total = res.sumPage;
        this.tableData = res.list;
      });
    },
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
      if (this.showThirdActive == "电表点位个性化阈值") {
        this.personThresholdList();
      } else if (this.showThirdActive == "电表点位共性化阈值") {
        this.getcommonThresholdList();
      } else {
        this.getotherThresholdList();
      }
    },
    getcommonThresholdList() {
      commonThresholdList({
        page: this.currentPage,
      }).then((res) => {
        this.tableData1 = res.list;
        this.total = res.sumPage;
      });
    },
    getotherThresholdList() {
      otherThresholdList({
        page: this.currentPage,
      }).then((res) => {
        this.tableData2 = res.list;
        this.total = res.sumPage;
      });
    },
    showListSecond(item) {
      this.currentPage = 1;
      this.showThirdActive = item;
      if (this.showThirdActive == "电表点位个性化阈值") {
        this.personThresholdList();
      } else if (this.showThirdActive == "电表点位共性化阈值") {
        this.getcommonThresholdList();
      } else {
        this.getotherThresholdList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.indexSeven-container {
  padding: 24px;
  .sevenlistUlbox.listUlbox {
    label {
      color: rgba(206, 206, 206, 1);
      margin-right: 26px;
    }
    width: 80%;
    border: 0px;
    li {
      display: inline-block;
      width: 190px;
      margin-right: 26px;
      cursor: pointer;
    }
  }
  .editBtn {
    .ineditBtn {
      cursor: pointer;
      width: 94px;
      height: 32px;
      //   background: linear-gradient(90deg, #5b7eff 0%, #8abfff 47%, #5b7eff 100%);
      background: linear-gradient(
        90deg,
        rgba(91, 126, 255, 0.4) 0%,
        rgba(138, 191, 255, 0.4) 47%,
        rgba(91, 126, 255, 0.4) 100%
      );
      border-radius: 4px;
      border: 1px solid rgba(91, 126, 255, 0.4);
      display: inline-block;
      line-height: 30px;
      position: relative;
      img,
      span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        margin-right: 10px;
      }
      .topImg {
        position: absolute;
        right: 0;
        top: 0;
        margin-right: 0;
      }
    }
  }
}
.checkBtnno {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(91, 126, 255, 0.3);
  margin-right: 8px;
}
.checkBtnno.active {
  background: rgba(91, 126, 255, 1);
  position: relative;
}
.checkBtnno.active::after {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(240, 243, 255, 1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
