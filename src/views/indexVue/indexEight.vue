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
      <el-col :span="24" style="padding: 30px 0" class="tableBox">
        <el-table
          header-align="center"
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column align="center" label="序号" prop="xh" width="100">
            <template slot-scope="scope">
              <span class="colorc">{{ scope.row.xh }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="变压器编号" prop="alarmType">
          </el-table-column>
          <el-table-column align="center" prop="numbers" label="配电柜编号">
          </el-table-column>
          <el-table-column align="center" prop="issueTime" label="抽屉柜编号">
          </el-table-column>
          <el-table-column align="center" prop="issuer" label="设备名称">
          </el-table-column>
          <el-table-column align="center" prop="ol" label="负载柜编号">
          </el-table-column>
          <el-table-column align="center" prop="personInCharge" label="主备供">
          </el-table-column>
          <el-table-column align="center" prop="state" label="双电源对应柜号">
          </el-table-column>
          <el-table-column align="center" prop="state" label="负载柜位置">
          </el-table-column>
          <el-table-column align="center" prop="state" label="所属专业">
          </el-table-column>
          <el-table-column align="center" prop="state" label="" width="200">
            <template slot="header" slot-scope="scope">
              阈值（<img
                src="@/assets/index/Img_jiaobiao.png"
                alt=""
                srcset=""
              />
              代表已设置阈值）
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
  </div>
</template>

<script>
export default {
  name: "indexSeven",
  data() {
    return {
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
}
</style>
