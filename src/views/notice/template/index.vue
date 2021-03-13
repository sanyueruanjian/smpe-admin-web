<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="id" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['admin','noticeTemplate:edit','noticeTemplate:del']"
        label="操作"
        width="130px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
          />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
  </div>
</template>

<script>
import crudNotice from '@/api/notice/template'
import eHeader from './module/header'
import eForm from './module/form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: 'Template',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '通知模板',
      url: 'api/noticeTemplate',
      sort: [{ 'column': 'id', 'asc': 'true' }],
      crudMethod: { ...crudNotice }
    })
  },
  mixins: [presenter()],
  data() {
    return {
      permission: {
        add: ['admin', 'noticeTemplate:add'],
        edit: ['admin', 'noticeTemplate:edit'],
        del: ['admin', 'noticeTemplate:del']
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
