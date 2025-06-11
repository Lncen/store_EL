<script lang="ts" setup>
import type { SystemRoleApi } from '#/api/system/role';

import { onMounted, ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';

import {
  ElButton,
  ElCard,
  ElLoading,
  ElPopconfirm,
  ElSpace,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

import { deleteRole, getRoleList } from '#/api/system/role';
import { $t } from '#/locales';

import Form from './modules/form.vue';

const tableData = ref<SystemRoleApi.SystemRole[]>([]);

// #region  API访问
function onEdit(row: SystemRoleApi.SystemRole) {
  formDrawerApi.setData(row).open();
}
function onCreate() {
  formDrawerApi
    .setData({
      // 新建默认选中目录选项
      type: 'catalog',
    })
    .open();
}
const onDelete = (row: string) => {
  const loadingInstance = ElLoading.service({
    lock: true, // 是否锁定屏幕（禁止用户交互）
    text: '正在删除...', // 加载提示文本
    background: 'rgba(0, 0, 0, 0.2)', // 背景遮罩颜色
  });
  deleteRole(row)
    .then(() => {
      fetchMenuList();
    })
    .catch(() => {})
    .finally(() => {
      loadingInstance.close(); // 手动关闭 Loading
    });
};
// #endregion

// #region 数据加载
async function fetchMenuList() {
  // loading.value = true;
  try {
    const res = await getRoleList({});
    tableData.value = res || [];
  } catch (error) {
    console.error('获取菜单列表失败:', error);
  } finally {
    // loading.value = false;
  }
}

const handleRefresh = () => {
  // 刷新数据
  fetchMenuList();
};

// #endregion

// #region  抽屉组件
const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: Form,
  destroyOnClose: true,
});

const onRefresh = () => {
  fetchMenuList();
};
// #endregion

onMounted(() => {
  fetchMenuList();
});
</script>

<template>
  <Page>
    <FormDrawer @success="onRefresh" @onclose="onRefresh" />
    <ElCard>
      <div align="right">
        <ElButton type="primary" @click="onCreate">新增</ElButton>
        <ElButton type="primary" @click="handleRefresh">刷新</ElButton>
      </div>

      <ElTable :data="tableData" style="width: 100%" row-key="id" lazy>
        <ElTableColumn prop="id" label="编号" width="70px" />
        <ElTableColumn prop="name" label="名称" width="120px" />
        <ElTableColumn prop="remark" label="备注" />
        <ElTableColumn prop="create_time" label="创建时间" width="100px" />
        <!-- 状态列 -->
        <ElTableColumn prop="status" label="状态" width="70px">
          <template #default="{ row }">
            <ElTag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </ElTag>
          </template>
        </ElTableColumn>

        <!-- 操作列 -->
        <ElTableColumn fixed="right" label="操作" width="130px">
          <template #default="{ row }">
            <ElSpace>
              <ElButton link @click="onEdit(row)" type="primary">修改</ElButton>
              <ElPopconfirm
                placement="bottom-end"
                width="200"
                :title="`确定删除 ${$t(row.name)} 吗？`"
                @confirm="onDelete(row.id)"
              >
                <template #reference>
                  <ElButton type="danger" link>删除</ElButton>
                </template>
              </ElPopconfirm>
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </Page>
</template>
