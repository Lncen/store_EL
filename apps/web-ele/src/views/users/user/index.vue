<script lang="ts" setup>
import type { UserApi } from '#/api/users/user';

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

import { deleteUser, getUserDetail, getUserList } from '#/api/users/user';
import { $t } from '#/locales';

import Form from './modules/form.vue';

const tableData = ref<UserApi.User[]>([]);

// #region  API访问
function onEdit(row: UserApi.UserUpdateParams) {
  const userId = row.id;
  if (!userId) {
    console.warn('用户ID不存在，无法编辑');
    return;
  }
  getUserDetail(userId)
    .then((res) => {
      formDrawerApi.setData(res).open();
    })
    .catch((error) => {
      console.error('Error fetching user detail:', error); // 错误处理
    });
}
function onCreate() {
  formDrawerApi.open();
}
const onDelete = (row: string) => {
  const loadingInstance = ElLoading.service({
    lock: true, // 是否锁定屏幕（禁止用户交互）
    text: '正在删除...', // 加载提示文本
    background: 'rgba(0, 0, 0, 0.2)', // 背景遮罩颜色
  });
  deleteUser(row)
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
    const res = await getUserList();
    tableData.value = res.results || [];
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

      <ElTable
        :data="tableData"
        style="width: 100%"
        row-key="id"
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <!-- 标题列 -->
        <ElTableColumn label="编号" prop="id" width="60" />
        <ElTableColumn label="用户名" prop="username" width="120" />
        <ElTableColumn label="昵称" prop="nickname" width="150" />
        <ElTableColumn label="部门" prop="dept_name">
          <template #default="{ row }">
            <ElTag type="info">{{ row.dept_name }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="余额" prop="balance" width="100" />

        <!-- 状态列 -->
        <ElTableColumn prop="is_active" label="状态" width="70px">
          <template #default="{ row }">
            <ElTag :type="row.is_active === true ? 'success' : 'danger'">
              {{ row.is_active === true ? '启用' : '禁用' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="最近登录" prop="last_login" width="300" />
        <!-- 操作列 -->
        <ElTableColumn
          fixed="right"
          label="操作"
          header-align="left"
          align="right"
          width="88px"
        >
          <template #default="{ row }">
            <ElSpace>
              <ElButton link @click="onEdit(row)" type="primary">修改</ElButton>
              <ElPopconfirm
                placement="bottom-end"
                width="200"
                :title="`确定删除 ${$t(row.username)} 吗？`"
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
