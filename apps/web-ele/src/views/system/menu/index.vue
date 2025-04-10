<script lang="ts" setup>
import { Page, useVbenDrawer } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

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

import { deleteMenu, SystemMenuApi } from '#/api/system/menu';
import { $t } from '#/locales';

// import { useColumns } from './data';
import Form from './modules/form.vue';

const tableData = [
  {
    id: 1,
    meta: {
      id: 212,
      affixTabOrder: 0,
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: 'page.dashboard.title',
    },
    children: [
      {
        id: 14,
        meta: {
          id: 213,
          affixTab: true,
          affixTabOrder: 0,
          icon: 'lucide:area-chart',
          title: 'page.dashboard.analytics',
        },
        name: 'Analytics',
        path: '/analytics',
        component: '/views/dashboard/analytics/index.vue',
        type: 'menu',
        status: 1,
        pid: 1,
      },
      {
        id: 15,
        meta: {
          id: 214,
          affixTabOrder: 0,
          icon: 'carbon:workspace',
          title: 'page.dashboard.workspace',
        },
        name: 'Workspace',
        path: '/workspace',
        component: '/views/dashboard/workspace/index.vue',
        type: 'menu',
        status: 1,
        pid: 1,
      },
    ],
    name: 'Dashboard',
    path: '/dashboard',
    type: 'menu',
    status: 1,
  },
  {
    id: 2,
    meta: {
      id: 215,
      affixTabOrder: 0,
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: 'demos.title',
    },
    children: [
      {
        id: 20,
        meta: {
          id: 216,
          affixTabOrder: 0,
          title: 'demos.elementPlus',
        },
        name: 'NaiveDemos',
        path: '/demos/element',
        component: '/views/demos/element/index.vue',
        type: 'menu',
        status: 1,
        pid: 2,
      },
      {
        id: 21,
        meta: {
          id: 217,
          affixTabOrder: 0,
          title: 'demos.form',
        },
        name: 'BasicForm',
        path: '/demos/form',
        component: '/views/demos/form/basic.vue',
        type: 'menu',
        status: 1,
        pid: 2,
      },
    ],
    name: 'Demos',
    path: '/demos',
    type: 'menu',
    status: 1,
  },
  {
    id: 3,
    meta: {
      id: 218,
      affixTabOrder: 0,
      icon: 'ion:settings-outline',
      order: 9997,
      title: 'system.title',
    },
    children: [
      {
        id: 31,
        meta: {
          id: 219,
          affixTabOrder: 0,
          icon: 'mdi:account-group',
          title: 'system.role.title',
        },
        name: 'SystemRole',
        path: '/system/role',
        component: '/views/system/role/index',
        type: 'menu',
        status: 1,
        pid: 3,
      },
      {
        id: 33,
        meta: {
          id: 220,
          affixTabOrder: 0,
          icon: 'mdi:menu',
          title: 'system.menu.title',
        },
        name: 'SystemMenu',
        path: '/system/menu',
        component: '/views/system/menu/index',
        type: 'menu',
        status: 1,
        pid: 3,
      },
      {
        id: 34,
        meta: {
          id: 221,
          affixTabOrder: 0,
          icon: 'charm:organisation',
          title: 'system.dept.title',
        },
        name: 'SystemDept',
        path: '/system/dept',
        component: '/views/system/dept/index',
        type: 'menu',
        status: 1,
        pid: 3,
      },
    ],
    name: 'System',
    path: '/system',
    type: 'menu',
    status: 1,
  },
  {
    id: 5,
    meta: {
      id: 222,
      affixTabOrder: 0,
      badgeType: 'dot',
      icon: 'mdi:menu',
      order: 9998,
      title: 'demos.vben.title',
    },
    children: [
      {
        id: 40,
        meta: {
          id: 223,
          affixTabOrder: 0,
          icon: 'lucide:book-open-text',
          link: 'VBEN_DOC_URL',
          title: 'demos.vben.document',
        },
        name: 'VbenDocument',
        path: '/vben-admin/document',
        component: 'IFrameView',
        type: 'menu',
        status: 1,
        pid: 5,
      },
      {
        id: 42,
        meta: {
          id: 225,
          affixTabOrder: 0,
          badgeType: 'dot',
          icon: 'logos:naiveui',
          link: 'VBEN_NAIVE_PREVIEW_URL',
          title: 'demos.vben.naive-ui',
        },
        name: 'VbenNaive',
        path: '/vben-admin/naive',
        component: 'IFrameView',
        type: 'menu',
        status: 1,
        pid: 5,
      },
      {
        id: 43,
        meta: {
          id: 226,
          affixTabOrder: 0,
          badgeType: 'dot',
          icon: 'SvgAntdvLogoIcon',
          link: 'VBEN_ANT_PREVIEW_URL',
          title: 'demos.vben.antdv',
        },
        name: 'VbenAntd',
        path: '/vben-admin/antd',
        component: 'IFrameView',
        type: 'menu',
        status: 1,
        pid: 5,
      },
      {
        id: 48,
        meta: {
          id: 224,
          affixTabOrder: 0,
          icon: 'mdi:github',
          link: 'VBEN_GITHUB_URL',
          title: 'Github',
        },
        name: 'VbenGithub',
        path: '/vben-admin/github',
        component: 'IFrameView',
        type: 'menu',
        status: 1,
        pid: 5,
      },
    ],
    name: 'VbenProject',
    path: '/vben-admin',
    type: 'menu',
    status: 1,
  },
  {
    id: 6,
    meta: {
      id: 227,
      affixTabOrder: 0,
      icon: 'lucide:copyright',
      order: 9999,
      title: 'demos.vben.about',
    },
    name: 'VbenAbout',
    path: '/vben-admin/about',
    component: '#/views/_core/about/index.vue',
    type: 'menu',
    status: 1,
  },
];

// #region 类型字段设置标签
type RouteType = 'danger' | 'info' | 'primary' | 'success' | 'warning';
// 类型映射
const ROUTE_TYPE_CHOICES: {
  key: string;
  label: string;
  tagType: RouteType;
}[] = [
  { key: 'menu', label: '菜单', tagType: 'primary' },
  { key: 'catalog', label: '目录', tagType: 'success' },
  { key: 'button', label: '按钮', tagType: 'info' },
  { key: 'embedded', label: '页面', tagType: 'warning' },
  { key: 'link', label: '链接', tagType: 'danger' },
];
// 辅助函数
function getTypeTagType(type: string): RouteType {
  const choice = ROUTE_TYPE_CHOICES.find((item) => item.key === type);
  return choice ? choice.tagType : 'info'; // 默认返回 'info'
}

function getTypeTagName(type: RouteType) {
  const choice = ROUTE_TYPE_CHOICES.find((item) => item.key === type);
  return choice ? choice.label : '未知';
}
// #endregion

// #region  API访问
function onEdit(row: SystemMenuApi.SystemMenu) {
  formDrawerApi.setData(row).open();
}
function onCreate() {
  formDrawerApi.setData({}).open();
}
function onAppend(row: SystemMenuApi.SystemMenu) {
  formDrawerApi.setData({ pid: row.id }).open();
}

const onDelete = (row: string) => {
  const loadingInstance = ElLoading.service({
    lock: true, // 是否锁定屏幕（禁止用户交互）
    text: '正在删除...', // 加载提示文本
    background: 'rgba(0, 0, 0, 0.2)', // 背景遮罩颜色
  });
  deleteMenu(row)
    .then(() => {})
    .catch(() => {})
    .finally(() => {
      setTimeout(() => {
        loadingInstance.close(); // 手动关闭 Loading
      }, 2000);
    });
};
// #endregion

// #region  抽屉组件
const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: Form,
  destroyOnClose: true,
});

const open = () => {
  formDrawerApi.open();
};

const onRefresh = (row: any) => {
  console.log('表单', row);
};
// #endregion
</script>

<template>
  <Page>
    <FormDrawer @success="onRefresh" />
    <ElCard>
      <div align="right">
        <ElButton type="primary" @click="onCreate">新增菜单</ElButton>
        <ElButton type="primary">刷新</ElButton>
      </div>

      <ElTable
        :data="tableData"
        style="width: 100%"
        row-key="id"
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <!-- 标题列 -->
        <ElTableColumn label="标题" width="230">
          <template #default="{ row }">
            <ElSpace>
              <div class="size-5">
                <IconifyIcon
                  v-if="row.type === 'button'"
                  icon="carbon:security"
                  class="size-full"
                />
                <IconifyIcon
                  v-else-if="row.meta?.icon"
                  :icon="row.meta?.icon || 'carbon:circle-dash'"
                  class="size-full"
                />
              </div>
              {{ $t(row.meta?.title) }}
            </ElSpace>
          </template>
        </ElTableColumn>

        <!-- 类型列 -->
        <ElTableColumn prop="type" label="类型" width="70px" align="left">
          <template #default="{ row }">
            <ElTag :type="getTypeTagType(row.type)">
              {{ getTypeTagName(row.type) }}
            </ElTag>
          </template>
        </ElTableColumn>

        <!-- 其他列 -->
        <ElTableColumn
          prop="authCode"
          label="权限标识"
          width="180px"
          min-width="180px"
        />

        <ElTableColumn prop="path" label="路由地址" width="180px" />
        <ElTableColumn prop="component" label="页面组件" min-width="240px" />

        <!-- 状态列 -->
        <ElTableColumn prop="status" label="状态" width="70px">
          <template #default="{ row }">
            <ElTag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </ElTag>
          </template>
        </ElTableColumn>

        <!-- 操作列 -->
        <ElTableColumn
          fixed="right"
          label="操作"
          header-align="left"
          align="right"
          width="170px"
        >
          <template #default="{ row }">
            <ElSpace>
              <ElButton link @click="onAppend(row)" type="primary">
                新增下级
              </ElButton>
              <ElButton link @click="onEdit(row)" type="primary">修改</ElButton>
              <ElPopconfirm
                placement="bottom-end"
                width="200"
                :title="`确定删除 ${$t(row.meta?.title)} 吗？`"
                @confirm="onDelete(row.id)"
              >
                <template #reference>
                  <ElButton type="text">删除</ElButton>
                </template>
              </ElPopconfirm>
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </Page>
</template>
