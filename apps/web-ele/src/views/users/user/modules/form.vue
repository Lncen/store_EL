<script lang="ts" setup>
import type { VbenFormSchema } from '#/adapter/form';
import type { UserApi } from '#/api/users/user';

import { computed, h, ref } from 'vue';

import { confirm, useVbenDrawer, useVbenModal } from '@vben/common-ui';

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import { useVbenForm, z } from '#/adapter/form';
import { changeUserPassword, createUser, updateUser } from '#/api/users/user';
import { $t } from '#/locales';

// import { getMenuTypeOptions } from '../data';

const emit = defineEmits<{
  success: [];
}>();
const formData = ref<UserApi.User>();
const titleSuffix = ref<string>();
// const defaultRadioGroup = ref<string>();

const schema: VbenFormSchema[] = [
  {
    component: 'Divider',
    dependencies: {
      show: (values) => {
        return !['button', 'link'].includes(values.type);
      },
      triggerFields: ['type'],
    },
    fieldName: 'divider1',
    formItemClass: 'col-span-2 md:col-span-2 pb-0',
    hideLabel: true,
    renderComponentContent() {
      return {
        default: () => $t('基础信息'),
      };
    },
  },
  {
    component: 'Input',
    fieldName: 'avatar_path',
    label: $t('头像路径'),
  },
  {
    component: 'Input',
    fieldName: 'id',
    label: $t('编号'),
    componentProps: {
      disabled: true,
    },
    dependencies: {
      show: () => {
        return formData.value?.id !== undefined;
      },
      triggerFields: ['id'],
    },
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: $t('users.user.nickname'),
  },
  {
    component: 'Input',
    fieldName: 'username',
    label: $t('users.user.username'),
    rules: 'required', // 必填
    dependencies: {
      disabled: () => {
        return formData.value?.id !== undefined;
      },
      triggerFields: ['id'],
    },
  },
  {
    component: 'Input',
    fieldName: 'password',
    label: $t('users.user.password'),
    rules: 'required',
    dependencies: {
      show: () => {
        return formData.value?.id === undefined;
      },
      triggerFields: ['id'],
    },
  },
  {
    component: 'Input',
    fieldName: 'email',
    label: $t('users.user.email'),
    componentProps: {
      type: 'email',
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'gender',
    label: $t('users.user.gender'),
    componentProps: {
      isButton: true,
      options: [
        { label: $t('女'), value: 'female' },
        { label: $t('男'), value: 'male' },
        { label: $t('保密'), value: 'secret' },
      ],
    },
  },
  {
    component: 'Select',
    fieldName: 'dept',
    label: $t('users.user.dept'),
    componentProps: {
      placeholder: $t('请选择部门'),
      // 添加空数组作为默认options，避免报错
      options: [],
    },
  },
  {
    component: 'Select',
    fieldName: 'dept',
    label: $t('users.user.role'),
    componentProps: {
      placeholder: $t('请选择角色'),
      // 添加空数组作为默认options，避免报错
      options: [],
    },
  },

  {
    component: 'Input',
    fieldName: 'bio',
    label: $t('users.user.bio'),
    formItemClass: 'col-span-2 md:col-span-2 pb-0',
    componentProps: {
      type: 'textarea',
    },
  },
  {
    component: 'Divider',
    dependencies: {
      show: (values) => {
        return !['button', 'link'].includes(values.type);
      },
      triggerFields: ['type'],
    },
    fieldName: 'divider1',
    formItemClass: 'col-span-2 md:col-span-2 pb-0',
    hideLabel: true,
    renderComponentContent() {
      return {
        default: () => $t('账户信息'),
      };
    },
  },
  {
    component: 'Input',
    fieldName: 'date_joined',
    label: $t('加入日期'),
    componentProps: {
      disabled: true,
    },
  },

  {
    component: 'Input',
    fieldName: 'last_login',
    label: $t('最后登录'),
    componentProps: {
      disabled: true,
    },
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '0.00000',
      precision: 5,
      controls: false,
      disabled: true,
    },
    dependencies: {
      show: () => {
        return formData.value?.id !== undefined;
      },
      triggerFields: ['id'],
    },
    fieldName: 'number',
    label: '余额',
    suffix: () =>
      h(
        'button',
        {
          class: `
        bg-transparent 
        text-gray-400
        font-medium 
        uppercase 
        tracking-wider 
        py-1
        px-2 
        rounded 
        border 
        border-gray-500 
        hover:bg-gray-700 
        hover:border-gray-400 
        active:bg-gray-600
        transition-colors 
        duration-150 
        ease-in-out
        focus:outline-none 
        focus:ring-1 
        focus:ring-gray-400
         ${formData.value?.id === undefined ? '' : 'opacity-50 cursor-not-allowed'}
      `
            .trim()
            .replaceAll(/\s+/g, ' '), // 格式化类名，便于阅读
          onClick: (e) => {
            e.preventDefault();
            // 这里可以添加按钮点击事件的处理逻辑
            // console.warn('按钮被点击了');
          },
        },
        '编辑',
      ),
  },
  {
    component: 'RadioGroup',
    fieldName: 'is_active',
    label: $t('激活状态'),
    componentProps: {
      isButton: true,
      options: [
        { label: $t('是'), value: true },
        { label: $t('否'), value: false },
      ],
    },
  },

  {
    component: 'Divider',
    dependencies: {
      show: (values) => {
        return !['button', 'link'].includes(values.type);
      },
      triggerFields: ['type'],
    },
    fieldName: 'divider1',
    formItemClass: 'col-span-2 md:col-span-2 pb-0',
    hideLabel: true,
    renderComponentContent() {
      return {
        default: () => $t('用户权限'),
      };
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'is_superuser',
    label: $t('超级管理员'),
    componentProps: {
      isButton: true,
      options: [
        { label: $t('是'), value: true },
        { label: $t('否'), value: false },
      ],
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'auto_order',
    label: $t('自动下单'),
    componentProps: {
      isButton: true,
      options: [
        { label: $t('是'), value: true },
        { label: $t('否'), value: false },
      ],
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'is_staff',
    label: $t('管理员'),
    componentProps: {
      isButton: true,
      options: [
        { label: $t('是'), value: true },
        { label: $t('否'), value: false },
      ],
    },
  },
];

const breakpoints = useBreakpoints(breakpointsTailwind);
const isHorizontal = computed(() => breakpoints.greaterOrEqual('md').value);

const [Form, formApi] = useVbenForm({
  commonConfig: {
    colon: true,
    formItemClass: 'col-span-2 md:col-span-1',
  },
  schema,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2 gap-x-4',
});

const [Drawer, drawerApi] = useVbenDrawer({
  onConfirm: onSubmit,
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData<UserApi.User>();
      formData.value = data;
      if (data) {
        formData.value = data;
        formApi.setValues(formData.value);
      } else {
        formApi.resetForm();
        titleSuffix.value = '';
      }
    }
  },
});

async function onSubmit() {
  const { valid } = await formApi.validate();
  if (valid) {
    drawerApi.lock();
    const data = await formApi.getValues<UserApi.UserCreateParams>();
    // if (data.type === 'link') {
    //   data.meta = { ...data.meta, link: data.linkSrc };
    // } else if (data.type === 'embedded') {
    //   data.meta = { ...data.meta, iframeSrc: data.linkSrc };
    // }
    // delete data.linkSrc;
    try {
      await (formData.value?.id
        ? updateUser(formData.value.id, data)
        : createUser(data));
      drawerApi.close();
      emit('success');
    } finally {
      drawerApi.unlock();
    }
  }
}

// 修改密码确认框
function showIconConfirm(
  text: string,
  iconText: 'error' | 'info' | 'question' | 'success' | 'warning',
) {
  confirm({
    content: text,
    icon: iconText,
    containerClass: 'width: 80vw;',
  });
}
// 创建密码修改弹窗
const [PasswordModal, passwordModalApi] = useVbenModal({
  centered: true,
  fullscreenButton: false,
  onConfirm: async () => {
    try {
      // 获取表单值 - 确保正确处理 Promise
      const formValues = await passwordFormApi.getValues();
      const userID = formData.value?.id;
      // 这里调用修改密码的API
      await changeUserPassword(
        userID,
        formValues.newPassword, // 直接传递获取到的表单值
      );

      passwordModalApi.close();

      // 可以添加成功提示

      showIconConfirm(`密码更新成功:  ${formValues.newPassword}`, 'success');
    } catch (error) {
      // 处理错误
      // 可以添加成功提示
      showIconConfirm('修改密码失败', 'error');
      console.error('修改密码失败:', error);
      // message.error('密码修改失败，请重试');
    }
  },
});
// 为密码修改弹窗创建表单
const [PasswordForm, passwordFormApi] = useVbenForm({
  commonConfig: {
    colon: true,
  },
  schema: [
    {
      component: 'Input',
      fieldName: 'newPassword',
      label: $t('users.user.newPassword'),
      componentProps: {
        type: 'text',
        placeholder: $t('users.user.enterNewPassword'),
      },
      rules: z
        .string()
        .min(
          6,
          $t('ui.formRules.minLength', [
            $t('users.user.passwordMinLength8'),
            6,
          ]),
        )
        .max(
          20,
          $t('ui.formRules.maxLength', [
            $t('users.user.passwordMaxLength20'),
            20,
          ]),
        )
        // 添加密码字符限制（只允许字母、数字和符号）
        .regex(
          /^[\w!@#$%^&*()+\-=[\]{};':"\\|,.<>/?`~]*$/,
          $t('users.user.passwordOnlyAllowLettersNumbersSymbols'),
        ),
    },
  ],
  showDefaultActions: false,
});
function onSetPassword() {
  // 修改密码
  passwordModalApi.open();
}

const getDrawerTitle = computed(() =>
  formData.value?.id
    ? $t('ui.actionTitle.edit', [$t('system.menu.name')])
    : $t('ui.actionTitle.create', [$t('system.menu.name')]),
);
</script>
<template>
  <div>
    <Drawer class="w-full max-w-[800px]" :title="getDrawerTitle">
      <Form class="mx-4" :layout="isHorizontal ? 'horizontal' : 'vertical'" />
      <template #footer>
        <div class="flex w-full items-center justify-between">
          <div>
            <button
              v-if="formData?.id"
              @click="onSetPassword"
              class="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
            >
              {{ $t('users.user.setPassword') }}
            </button>
          </div>
          <div class="flex gap-2">
            <button
              @click="drawerApi.close"
              class="rounded bg-gray-300 px-4 py-2 text-gray-700"
            >
              {{ $t('users.user.cancel') }}
            </button>
            <button
              @click="onSubmit"
              class="rounded bg-blue-600 px-4 py-2 text-white"
            >
              {{ $t('users.user.confirm') }}
            </button>
          </div>
        </div>
      </template>
    </Drawer>

    <!-- 密码修改弹窗 -->
    <PasswordModal
      :title="$t('users.user.changePassword')"
      class="w-full max-w-md"
    >
      <PasswordForm class="mx-4" />
    </PasswordModal>
  </div>
</template>
