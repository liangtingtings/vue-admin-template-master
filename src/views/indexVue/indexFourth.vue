<template>
  <div class="indexFourth-container">
    <el-row>
      <el-col :span="20">
        <label>变压器编号</label>
        <el-select
          v-model="searchKey"
          placeholder="请选择"
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
      </el-col>
      <el-col :span="4">
        <span
          class="searchBtn"
          :class="showOpen ? '' : 'searchBtnClose'"
          @click="showOpen = !showOpen"
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
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              <span>00{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="等级">
            <template slot-scope="scope">
              <span class="colorr">应急</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date" label="时间">
          </el-table-column>
          <el-table-column align="center" prop="name" label="检测设备">
          </el-table-column>
          <el-table-column align="center" prop="name" label="位置">
          </el-table-column>
          <el-table-column align="center" prop="name" label="类型">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="状态"
            width="150"
          ></el-table-column>
          <el-table-column align="center" prop="name" label="详情">
          </el-table-column>
          <el-table-column
            header-align="left"
            align="left"
            prop="address"
            label="描述"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12" style="padding: 10px 0px 10px 10px" class="tableBox">
        <el-table
          header-align="center"
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column align="center" label="抽屉柜编号">
            <template slot-scope="scope">
              <span>00{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="设备名称">
            <template slot-scope="scope">
              <span class="colorr">应急</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date" label="A相电流">
          </el-table-column>
          <el-table-column align="center" prop="name" label="B相电流">
          </el-table-column>
          <el-table-column align="center" prop="name" label="C相电流">
          </el-table-column>
          <el-table-column align="center" prop="name" label="A相电压">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="B相电压"
          ></el-table-column>
          <el-table-column align="center" prop="name" label="C相电压">
          </el-table-column>
          <el-table-column
            header-align="left"
            align="left"
            prop="address"
            label="有功功率"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" style="padding: 10px 10px 10px 0px" class="tableBox">
        <el-table
          header-align="center"
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              <span>00{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="等级">
            <template slot-scope="scope">
              <span class="colorr">应急</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date" label="时间">
          </el-table-column>
          <el-table-column align="center" prop="name" label="检测设备">
          </el-table-column>
          <el-table-column align="center" prop="name" label="位置">
          </el-table-column>
          <el-table-column align="center" prop="name" label="类型">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="状态"
            width="150"
          ></el-table-column>
          <el-table-column align="center" prop="name" label="详情">
          </el-table-column>
          <el-table-column
            header-align="left"
            align="left"
            prop="address"
            label="描述"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12" style="padding: 10px 0px 10px 10px" class="tableBox">
        <el-table
          header-align="center"
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              <span>00{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="等级">
            <template slot-scope="scope">
              <span class="colorr">应急</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date" label="时间">
          </el-table-column>
          <el-table-column align="center" prop="name" label="检测设备">
          </el-table-column>
          <el-table-column align="center" prop="name" label="位置">
          </el-table-column>
          <el-table-column align="center" prop="name" label="类型">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="状态"
            width="150"
          ></el-table-column>
          <el-table-column align="center" prop="name" label="详情">
          </el-table-column>
          <el-table-column
            header-align="left"
            align="left"
            prop="address"
            label="描述"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="paginationBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexThird",
  data() {
    return {
      showOpen: true,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      currentPage: 1,
      searchKey: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
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
    },
  },
};
</script>
<style lang="scss">
.indexFourth-container {
  .el-select {
    margin-left: 10px;
    .el-input__inner {
      color: #fff;
      background: linear-gradient(
        90deg,
        rgba(91, 126, 255, 0.4) 0%,
        rgba(138, 191, 255, 0.4) 47%,
        rgba(91, 126, 255, 0.4) 100%
      );
      border-color: rgba(91, 126, 255, 0.8);
    }
    .el-input .el-select__caret {
      color: #fff;
    }
  }
}
.change-el-select-dropdown.el-select-dropdown {
  background: rgba(91, 126, 255, 0.4);
  border: 0px;
  .el-select-dropdown__item {
    color: rgba(228, 234, 255, 1);
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: rgba(91, 126, 255, 0.4);
  }
}
</style>
<style lang="scss">
.indexFourth-container {
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
