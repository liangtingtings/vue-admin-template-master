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
          <el-table-column key="1" align="center" label="序号" prop="xh" width="100">
            <template slot-scope="scope">
              <span class="colorc">{{ scope.row.xh }}</span>
            </template>
          </el-table-column>

          <el-table-column key="2" align="center" label="变压器编号" prop="alarmType">
          </el-table-column>
          <el-table-column key="3" align="center" prop="numbers" label="配电柜编号">
          </el-table-column>
          <el-table-column key="4" align="center" prop="issueTime" label="抽屉柜编号">
          </el-table-column>
          <el-table-column key="5" align="center" prop="issuer" label="设备名称">
          </el-table-column>
          <el-table-column key="6" align="center" prop="ol" label="负载柜编号">
          </el-table-column>
          <el-table-column key="7" align="center" prop="personInCharge" label="主备供">
          </el-table-column>
          <el-table-column key="8" align="center" prop="state" label="双电源对应柜号">
          </el-table-column>
          <el-table-column key="9" align="center" prop="state" label="负载柜位置">
          </el-table-column>
          <el-table-column key="10" align="center" prop="state" label="所属专业">
          </el-table-column>
          <el-table-column key="11" align="center" label="" width="200">
            <template slot="header" slot-scope="scope">
              阈值（<img
                src="@/assets/index/Img_jiaobiao.png"
                alt=""
                srcset=""
              />
              代表已设置阈值）
            </template>
            <template slot-scope="scope">
              <span class="editBtn" @click="dialogFormVisible = true">
                <span class="ineditBtn">
                  <img
                    src="@/assets/index/Img_jiaobiao.png"
                    alt=""
                    class="topImg"
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
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column key="12" align="center" label="序号" prop="xh">
            <template slot-scope="scope">
              <span class="colorc">{{ scope.row.xh }}</span>
            </template>
          </el-table-column>

          <el-table-column key="13" align="center" label="参数项" prop="alarmType">
          </el-table-column>
          <el-table-column key="14" align="center" label="阈值设置" prop="alarmType">
            <template slot-scope="scope">
              <el-input style="width: 90px" v-model="scope.row.name" readonly></el-input>
              V <span style="margin: 0px 10px"> —— </span>
              <el-input style="width: 90px" v-model="scope.row.name" readonly></el-input>
              V
            </template>
          </el-table-column>

          <el-table-column key="15" align="center" label="" width="200">
            <template slot="header" slot-scope="scope">
              阈值（<img
                src="@/assets/index/Img_jiaobiao.png"
                alt=""
                srcset=""
              />
              代表已设置阈值）
            </template>
            <template slot-scope="scope">
              <span class="editBtn" @click="dialogForm1Visible = true">
                <span class="ineditBtn">
                  <img
                    src="@/assets/index/Img_jiaobiao.png"
                    alt=""
                    class="topImg"
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
        v-if="showThirdActive == '其他点位阈值'"
      >
        <el-table
          header-align="center"
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column key="16" align="center" label="序号" prop="xh">
            <template slot-scope="scope">
              <span class="colorc">{{ scope.row.xh }}</span>
            </template>
          </el-table-column>

          <el-table-column key="17" align="center" label="参数项" prop="alarmType">
          </el-table-column>
          <el-table-column key="18" align="center" label="阈值设置" prop="alarmType">
            <template slot-scope="scope">
              <el-input style="width: 90px" v-model="scope.row.name" readonly></el-input>
              V <span style="margin: 0px 10px"> —— </span>
              <el-input style="width: 90px" v-model="scope.row.name" readonly></el-input>
              V
            </template>
          </el-table-column>

          <el-table-column key="19" align="center" label="" width="200">
            <template slot="header" slot-scope="scope">
              阈值（<img
                src="@/assets/index/Img_jiaobiao.png"
                alt=""
                srcset=""
              />
              代表已设置阈值）
            </template>
            <template slot-scope="scope">
              <span class="editBtn" @click="dialogForm2Visible = true">
                <span class="ineditBtn">
                  <img
                    src="@/assets/index/Img_jiaobiao.png"
                    alt=""
                    class="topImg"
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
              <el-input style="width: 90px" v-model="form.name"></el-input>(A)
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="A相功率阈值" :label-width="formLabelWidth">
              <el-input style="width: 90px" v-model="form.name"></el-input>(kW)
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="A相日负荷率" :label-width="formLabelWidth">
              <el-input style="width: 90px" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="B相电流阈值" :label-width="formLabelWidth">
              <el-input style="width: 90px" v-model="form.name"></el-input>(A)
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="B相功率阈值" :label-width="formLabelWidth">
              <el-input style="width: 90px" v-model="form.name"></el-input>(kW)
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="B相日负荷率" :label-width="formLabelWidth">
              <el-input style="width: 90px" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="C相电流阈值" :label-width="formLabelWidth">
              <el-input style="width: 90px" v-model="form.name"></el-input>(A)
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="C相功率阈值" :label-width="formLabelWidth">
              <el-input style="width: 90px" v-model="form.name"></el-input>(kW)
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="C相日负荷率" :label-width="formLabelWidth">
              <el-input style="width: 90px" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div
              style="
                text-align: right;
                color: rgba(225, 225, 225, 1);
                cursor: pointer;
              "
              @click="showSame = !showSame"
            >
              <span class="checkBtnno" :class="showSame ? 'active' : ''"></span>
              <span>勾选统一同类型参数阈值</span>
            </div>
            <div class="el-dialog__footer" style="padding-bottom: 10px">
              <span class="addBtn"> 保 存 </span>
              <span class="addBtn closeBtn" @click="dialogFormVisible = false">
                取 消
              </span>
            </div>
            <div class="line-perDialog"></div>
          </el-col>
          <el-col :span="24">
            <el-form-item label="抽屉柜参数" :label-width="formLabelWidth">
              空开：800A
              <span style="margin-right: 30px"></span> 负载功率：346.9kW
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      width="420px"
      title="阈值编辑"
      :visible.sync="dialogForm1Visible"
      class="perDialog"
    >
      <el-form :model="form1" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="频率下限">
              <el-input style="width: 90px" v-model="form1.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="text-align:right">
            <el-form-item label="频率上限"  label-width="100px" >
              <el-input style="width: 90px" v-model="form1.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="el-dialog__footer" style="padding-bottom: 10px">
              <span class="addBtn"> 保 存 </span>
              <span class="addBtn closeBtn" @click="dialogForm1Visible = false">
                取 消
              </span>
            </div>
            <div class="line-perDialog"></div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      width="450px"
      title="阈值编辑"
      :visible.sync="dialogForm2Visible"
      class="perDialog"
    >
      <el-form :model="form2" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="温度下限">
              <el-input style="width: 90px" v-model="form2.name"></el-input> ℃
            </el-form-item>
          </el-col>
          <el-col :span="12" style="text-align:right">
            <el-form-item label="温度上限"  label-width="85px" >
              <el-input style="width: 90px" v-model="form2.name"></el-input> ℃
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="el-dialog__footer" style="padding-bottom: 10px">
              <span class="addBtn"> 保 存 </span>
              <span class="addBtn closeBtn" @click="dialogForm2Visible = false">
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
export default {
  name: "indexSeven",
  data() {
    return {
        dialogForm2Visible:false,
      dialogForm1Visible: false,
      showSame: false,
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {},
      form1:{}, 
      form2:{},
      showThirdActive: "电表点位个性化阈值",
      tableData: [
        {
          xh: "001",
          numbers: 121,
        },
        {
          xh: "002",
          numbers: 334,
        },
      ],
      total: 0,
      currentPage: 1,
      optionsList: ["电表点位个性化阈值", "电表点位共性化阈值", "其他点位阈值"],
    };
  },
  mounted() {},
  methods: {
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
      this.getAllList();
    },
    showListSecond(item) {
      this.showThirdActive = item;
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
