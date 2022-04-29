<template>
  <div class="indexFourth-container">
    <el-row class="statusBox">
      <el-col :span="20">
        <label>变压器编号</label>
        <el-select
          v-model="searchKey"
          @change="changeNum"
          placeholder="请选择"
          popper-class="change-el-select-dropdown"
        >
          <el-option key="all" label="全部" value=""> </el-option>
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <span
          class="searchBtn"
          :class="showOpen ? '' : 'searchBtnClose'"
          @click="showOpen = !showOpen;changeMiao()"
        >
          <img src="@/assets/index/Icon_chaobiao.png" alt="" />
          <span>{{ showOpen ? "开启自动秒表模式" : "关闭自动抄表模式" }}</span>
        </span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" style="padding: 10px 10px 10px 0px" class="tableBox">
        <el-table
          header-align="center"
          :data="tableData1"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column align="center" label="抽屉柜编号" prop="ctgNumber">
            <template slot-scope="scope">
              <span>{{ scope.row.ctgNumber }}</span
              >
              <!-- <img src="@/assets/index/yichang.png" alt="" /> -->
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="设备名称"
            prop="equipmentName"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column align="center" prop="Ia" label="A相电流">
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('Ia') != -1 ? 'colorr' : ''"
                >{{ scope.row.Ia }}</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Ib" label="B相电流">
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('Ib') != -1 ? 'colorr' : ''"
                >{{ scope.row.Ib }}</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Ic" label="C相电流">
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('Ic') != -1 ? 'colorr' : ''"
                >{{ scope.row.Ic }}</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Va" label="A相电压">
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('Va') != -1 ? 'colorr' : ''"
                >{{ scope.row.Va }}</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Vb" label="B相电压">
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('Vb') != -1 ? 'colorr' : ''"
                >{{ scope.row.Vb }}</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Vc" label="C相电压">
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('Vc') != -1 ? 'colorr' : ''"
                >{{ scope.row.Vc }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            header-align="left"
            align="left"
            prop="power"
            label="有功功率"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('power') != -1 ? 'colorr' : ''"
                >{{ scope.row.power }}</span
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12" style="padding: 10px 0px 10px 10px" class="tableBox">
        <el-table
          header-align="center"
          :data="tableData2"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column align="center" label="抽屉柜编号" prop="ctgNumber">
            <template slot-scope="scope">
              <span>{{ scope.row.ctgNumber }}</span
              >
              <!-- <img src="@/assets/index/yichang.png" alt="" /> -->
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="设备名称"
            prop="equipmentName"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column align="center" prop="Ia" label="A相电流">
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('Ia') != -1 ? 'colorr' : ''"
                >{{ scope.row.Ia }}</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Ib" label="B相电流">
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('Ib') != -1 ? 'colorr' : ''"
                >{{ scope.row.Ib }}</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Ic" label="C相电流">
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('Ic') != -1 ? 'colorr' : ''"
                >{{ scope.row.Ic }}</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Va" label="A相电压">
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('Va') != -1 ? 'colorr' : ''"
                >{{ scope.row.Va }}</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Vb" label="B相电压">
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('Vb') != -1 ? 'colorr' : ''"
                >{{ scope.row.Vb }}</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Vc" label="C相电压">
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('Vc') != -1 ? 'colorr' : ''"
                >{{ scope.row.Vc }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            header-align="left"
            align="left"
            prop="power"
            label="有功功率"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                :class="scope.row.error.indexOf('power') != -1 ? 'colorr' : ''"
                >{{ scope.row.power }}</span
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <div class="paginationBox">
      <el-pagination
        v-if="showOpen"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="14"
        layout="prev, pager, next, jumper"
        :total="total * 14"
      >
      </el-pagination>
      <el-pagination
        :page-size="14"
        disabled
        v-if="!showOpen"
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :total="total * 14"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList, getByqNumber } from "@/api/indexFourth";
export default {
  name: "indexThird",
  data() {
    return {
      total: 0,
      showOpen: true,
      options: [],
      currentPage: 1,
      searchKey: "",
      tableData1: [],
      tableData2: [],
      timer: "",
      timer1: "",
    };
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      clearInterval(this.timer1); // 在Vue实例销毁前，清除我们的定时器
    }
  },

  mounted() {
    getByqNumber({ mid: 198 }).then((res) => {
      this.options = res.byqData;
    });
    this.getAllList();
    let _this = this;
    this.timer1 = setInterval(function () {
      _this.getAllList();
    }, 60000);
  },
  methods: {
    changeNum() {
      this.currentPage = 1;
      if (!this.showOpen) {
        this.changeMiao()
      } else {
        this.getAllList();
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return "success-row";
      } else {
        return "";
      }
    },
    getAllList() {
      getList({
        byqNumber: this.searchKey,
        page: this.currentPage,
        isButton: this.showOpen ? 2 : 1,
      }).then((res) => {
        this.total = res.sumLimit;
        this.tableData1 = res.table_1;
        this.tableData2 = res.table_2;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getAllList();
    },
    changeMiao() {
      let num = this.currentPage == 1 ? 2 : 1; 
      let _this = this;
      if (!_this.showOpen) {
        clearInterval(_this.timer1);
        _this.timer = setInterval(function () {
          _this.currentPage = num;
          if (_this.currentPage > _this.total) {
            clearInterval(_this.timer);
            _this.showOpen = true;
            _this.timer1 = setInterval(function () {
              _this.getAllList();
            }, 60000);
            return false;
          }
          _this.getAllList();
          num++;
        }, 20000);
      } else {
        clearInterval(_this.timer);
        _this.timer1 = setInterval(function () {
          _this.getAllList();
        }, 60000);
      }
    },
  },
};
</script> 
<style lang="scss">
.indexFourth-container {
  .statusBox{
    margin-bottom: 20px;
  }
  label {
    margin-right: 5px;
    color: rgba(206, 206, 206, 1);
    font-size: 16px;
  }
  box-sizing: border-box;
  color: #fff;
  padding: 24px;
  .colorr {
    color: rgba(255, 63, 63, 1);
  }
  .el-input__inner {
    background: none;
  }
  .searchBtn {
    width: 100%;
    text-align: center;
    height: 40px;
    border-radius: 4px;
    font-size: 14px;
    background: linear-gradient(
      90deg,
      rgba(91, 126, 255, 0.4) 0%,
      rgba(138, 191, 255, 0.4) 47%,
      rgba(91, 126, 255, 0.4) 100%
    );
    border-radius: 4px;
    border: 1px solid #5b7eff;
    display: inline-block;
    cursor: pointer;
    img,
    span {
      vertical-align: middle;
      line-height: 40px;
      margin: 0 10px;
    }
  }
  .searchBtnClose {
    background: linear-gradient(
      90deg,
      rgba(91, 126, 255, 0.6) 0%,
      rgba(138, 191, 255, 0.6) 47%,
      rgba(91, 126, 255, 0.6) 100%
    );
  }
  .el-table::before {
    height: 1px;
    background: rgba(91, 126, 255, 0.4);
  }
}
</style>
