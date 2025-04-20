import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemMenuApi } from '#/api/system/menu';

import { $t } from '#/locales';

export function getMenuTypeOptions() {
  return [
    {
      color: 'processing',
      label: $t('system.menu.typeCatalog'),
      value: 'catalog',
    },
    { color: 'default', label: $t('system.menu.typeMenu'), value: 'menu' },
    { color: 'error', label: $t('system.menu.typeButton'), value: 'button' },
    {
      color: 'success',
      label: $t('system.menu.typeEmbedded'),
      value: 'embedded',
    },
    { color: 'warning', label: $t('system.menu.typeLink'), value: 'link' },
  ];
}

export function useColumns(
  onActionClick: OnActionClickFn<SystemMenuApi.SystemMenu>,
): VxeTableGridOptions<SystemMenuApi.SystemMenu>['columns'] {
  return [
    {
      align: 'left',
      field: 'meta.title',
      fixed: 'left',
      slots: { default: 'title' },
      title: $t('system.menu.menuTitle'),
      treeNode: true,
      width: 250,
    },
    {
      align: 'center',
      cellRender: { name: 'CellTag', options: getMenuTypeOptions() },
      field: 'type',
      title: $t('system.menu.type'),
      width: 100,
    },
    {
      field: 'authCode',
      title: $t('system.menu.authCode'),
      width: 200,
    },
    {
      align: 'left',
      field: 'path',
      title: $t('system.menu.path'),
      width: 200,
    },

    {
      align: 'left',
      field: 'component',
      formatter: ({ row }) => {
        switch (row.type) {
          case 'catalog':
          case 'menu': {
            return row.component ?? '';
          }
          case 'embedded': {
            return row.meta?.iframeSrc ?? '';
          }
          case 'link': {
            return row.meta?.link ?? '';
          }
        }
        return '';
      },
      minWidth: 200,
      title: $t('system.menu.component'),
    },
    {
      cellRender: { name: 'CellTag' },
      field: 'status',
      title: $t('system.menu.status'),
      width: 100,
    },

    {
      align: 'right',
      cellRender: {
        attrs: {
          nameField: 'name',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          {
            code: 'append',
            text: '新增下级',
          },
          'edit', // 默认的编辑按钮
          'delete', // 默认的删除按钮
        ],
      },
      field: 'operation',
      fixed: 'right',
      headerAlign: 'center',
      showOverflow: false,
      title: $t('system.menu.operation'),
      width: 200,
    },
  ];
}

const data = [
  {
    name: 'Dashboard',
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: 'page.dashboard.title',
    },
    children: [
      {
        name: 'Analytics',
        meta: { icon: 'lucide:area-chart', title: 'page.dashboard.analytics' },
        path: '/analytics',
        component: '/views/dashboard/analytics/index.vue',
        type: 'menu',
      },
      {
        name: 'Workspace',
        meta: { icon: 'carbon:workspace', title: 'page.dashboard.workspace' },
        path: '/workspace',
        component: '/views/dashboard/workspace/index.vue',
        type: 'menu',
      },
    ],
    path: '/dashboard',
    type: 'catalog',
  },
  {
    name: 'Demos',
    meta: { icon: 'ic:baseline-view-in-ar', order: 1000, title: 'demos.title' },
    children: [
      {
        name: 'NaiveDemos',
        meta: { title: 'demos.elementPlus' },
        path: '/demos/element',
        component: '/views/demos/element/index.vue',
        type: 'menu',
      },
      {
        name: 'BasicForm',
        meta: { title: 'demos.form' },
        path: '/demos/form',
        component: '/views/demos/form/basic.vue',
        type: 'menu',
      },
    ],
    path: '/demos',
    type: 'catalog',
  },
  {
    name: 'System',
    meta: { icon: 'ion:settings-outline', order: 9997, title: 'system.title' },
    children: [
      {
        name: 'SystemRole',
        meta: { icon: 'mdi:account-group', title: 'system.role.title' },
        path: '/system/role',
        component: '/views/system/role/index',
        type: 'menu',
      },
      {
        name: 'SystemMenu',
        meta: { icon: 'mdi:menu', title: 'system.menu.title' },
        path: '/system/menu',
        component: '/views/system/menu/index',
        type: 'menu',
      },
      {
        name: 'SystemDept',
        meta: { icon: 'charm:organisation', title: 'system.dept.title' },
        path: '/system/dept',
        component: '/views/system/dept/index',
        type: 'menu',
      },
    ],
    path: '/system',
    type: 'catalog',
  },
  {
    name: 'VbenProject',
    meta: { icon: 'carbon:attachment', order: 9998, title: 'demos.vben.title' },
    children: [
      {
        name: 'VbenDocument',
        meta: { icon: 'lucide:book-open-text', title: 'demos.vben.document' },
        path: '/vben-admin/document',
        component: 'IFrameView',
        type: 'menu',
      },
      {
        name: 'VbenNaive',
        meta: { icon: 'logos:naiveui', title: 'demos.vben.naive-ui' },
        path: '/vben-admin/naive',
        component: 'IFrameView',
        type: 'menu',
      },
      {
        name: 'VbenAntd',
        meta: { icon: 'SvgAntdvLogoIcon', title: 'demos.vben.antdv' },
        path: '/vben-admin/antd',
        component: 'IFrameView',
        type: 'menu',
      },
      {
        name: 'VbenGithub',
        meta: { icon: 'mdi:github', title: 'Github' },
        path: '/vben-admin/github',
        component: 'IFrameView',
        type: 'menu',
      },
    ],
    path: '/vben-admin',
    type: 'catalog',
  },
  {
    name: 'VbenAbout',
    meta: { icon: 'lucide:copyright', order: 9999, title: 'demos.vben.about' },
    path: '/vben-admin/about',
    component: '/views/_core/about/index.vue',
    type: 'catalog',
  },
];
