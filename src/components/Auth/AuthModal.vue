<template>
  <div class="auth-modal-container">
    <div v-if="!isLoggedIn">
      <div class="default-triggers">
        <a-button type="primary" @click="showLogin">登录</a-button>
        <!-- <a-button type="primary" @click="showRegister">注册</a-button> -->
      </div>
    </div>
    <div v-else>
      <div style="height: 80px">
        <a-dropdown placement="bottom">
          <img
            class="avatar"
            :src="userStore.userInfo.avatar"
            alt=""
          />
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <RouterLink rel="noopener noreferrer" :to="`/user`">
                  个人中心
                </RouterLink>
              </a-menu-item>
              <a-menu-item>
                <a rel="noopener noreferrer" @click="userLogout"> 退出登录 </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <a-modal
      :open="visible"
      title="用户认证"
      @cancel="handleCancel"
      :footer="null"
      :width="400"
      class="custom-modal"
    >
      <a-tabs v-model="activeTab" @change="tabChanged">
        <a-tab-pane key="login" tab="登录">
          <a-form
            ref="loginFormRef"
            :model="loginFormState"
            name="login"
            class="auth-form"
            :scrollToFirstError="true"
            @finish="handleLogin"
          >
            <a-form-item
              name="username"
              :rules="[{ required: true, message: '请输入用户名!' }]"
            >
              <a-input
                placeholder="用户名"
                v-model:value="loginFormState.username"
              >
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item
              name="password"
              :rules="[{ required: true, message: '请输入密码!' }]"
            >
              <a-input-password
                placeholder="密码"
                v-model:value="loginFormState.password"
              >
                <template #prefix>
                  <EyeOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                class="auth-form-button"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <!-- 注册 -->
        <a-tab-pane key="register" tab="注册">
          <a-form
            ref="registerFormRef"
            :model="registerFormState"
            name="register"
            class="auth-form"
            :scrollToFirstError="true"
            @finish="handleRegister"
          >
            <a-form-item
              name="username"
              :rules="[{ required: true, message: '请输入用户名!' }]"
            >
              <a-input
                placeholder="用户名"
                v-model:value="registerFormState.username"
              >
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item
              name="email"
              :rules="[
                { required: true, message: '请输入邮箱!' },
                { type: 'email', message: '请输入有效的邮箱地址!' },
              ]"
            >
              <a-input
                v-model:value="registerFormState.email"
                placeholder="邮箱"
              >
                <!-- <template #prefix>
                <MailOutlined  class="site-form-item-icon" /> 
                </template-->

                <template #prefix>
                  <MailOutlined class="site-form-item-icon" />
                </template>
                <template #addonAfter>
                  <a-button
                    :loading="sendingCode"
                    :disabled="countdown > 0 || !isEmailValid"
                    @click.stop="sendCode"
                  >
                    {{ countdown > 0 ? `${countdown}s后重试` : "获取验证码" }}
                  </a-button>
                </template>
              </a-input>
            </a-form-item>
            <a-form-item
              name="verificationCode"
              :rules="[{ required: true, message: '请输入验证码!' }]"
            >
              <a-input
                placeholder="验证码"
                v-model:value="registerFormState.verificationCode"
              >
                <template #prefix>
                  <FormOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item
              name="password"
              :rules="[
                { required: true, message: '请输入密码!' },
                { min: 6, message: '密码长度至少为6位!' },
              ]"
            >
              <a-input-password
                placeholder="确认密码"
                v-model:value="registerFormState.password"
              >
                <template #prefix>
                  <EyeOutlined class="site-form-item-icon" /> </template
                >class="site-form-item-icon" />
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                class="auth-form-button"
              >
                注册
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script setup>
import {
  UserOutlined,
  EyeOutlined,
  MailOutlined,
  FormOutlined,
} from "@ant-design/icons-vue";
import { ref, reactive, onMounted, onUnmounted, watch, nextTick } from "vue";
//   import { FormInstance } from 'ant-design-vue';
import { UserLogin, logout, register, sendVerificationCode } from "@/api/auth";
import { message } from "ant-design-vue";
import { useUserStore } from "@/stores/modules/user";
import router from "@/router";

// 组件props
const props = defineProps({
  defaultTab: {
    type: String,
    default: "login",
    validator: (value) => ["login", "register"].includes(value),
  },
  // 登录成功回调
  onLoginSuccess: {
    type: Function,
    default: () => {},
  },
  // 注册成功回调
  onRegisterSuccess: {
    type: Function,
    default: () => {},
  },
});

// 组件emits
const emit = defineEmits(["login-success", "register-success", "cancel"]);


const visible = ref(false);
const activeTab = ref(props.defaultTab);
const loginFormRef = ref();
const registerFormRef = ref();
const countdown = ref(0);
const sendingCode = ref(false);
let countdownTimer = null;
const isEmailValid = ref(false);

const userStore = useUserStore();
const isLoggedIn = ref(userStore.isLoggedIn); // 检查用户是否已登录;
// 登录表单数据
const loginFormState = reactive({
  email: "",
  password: "",
});

// 注册表单数据
const registerFormState = reactive({
  username: "",
  email: "",
  verificationCode: "",
  password: "",
});

// 打开登录框
const showLogin = () => {
  activeTab.value = "login";
  visible.value = true;
};

// 打开注册框
const showRegister = () => {
  activeTab.value = "register";
  visible.value = true;
};

const handleCancel = () => {
  visible.value = false;
  resetForms();
  stopCountdown();
  emit("cancel");
};

const tabChanged = (key) => {
  resetForms();
  stopCountdown();
};

const resetForms = () => {
  loginFormRef.value?.resetFields();
  registerFormRef.value?.resetFields();

  // 重置表单数据
  loginFormState.email = "";
  loginFormState.password = "";

  registerFormState.username = "";
  registerFormState.email = "";
  registerFormState.verificationCode = "";
  registerFormState.password = "";
  registerFormState.confirm = "";
};

// 发送验证码
const sendCode = async () => {
  try {
    // 验证邮箱格式
    await registerFormRef.value.validateFields(["email"]);
    sendingCode.value = true;
    // 发送验证码
    console.log(`向${registerFormState.email}发送验证码`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await sendVerificationCode(registerFormState.email);
    // 发送成功后开始倒计时
    startCountdown(60);
    message.success("验证码已发送，请注意查收");
  } catch (error) {
    console.error("发送验证码失败:", error);
    // 显示错误信息
    const errorFields = error?.errorFields || [];
    if (errorFields.length > 0) {
      const firstError = errorFields[0];
      message.error(firstError.errors[0]?.message || "验证失败");
    }
  } finally {
    sendingCode.value = false;
  }
};

// 开始倒计时
const startCountdown = (seconds) => {
  countdown.value = seconds;
  countdownTimer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      stopCountdown();
    }
  }, 1000);
};

// 停止倒计时
const stopCountdown = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
  countdown.value = 0;
};

// 登录
const handleLogin = async (values) => {
  const res = await UserLogin(values);
  if (res.code === 200) {
    message.success("登录成功");
    console.log("登录成功:", res.data);

    props.onLoginSuccess(values);
    // 获取用户信息
    await userStore.fetchUserInfo();
    // 更新登录状态
    isLoggedIn.value = userStore.isLoggedIn;
    console.log("用户信息已存储到 Pinia");
    emit("login-success", values);
    handleCancel();
  } else {
    message.error(res.msg || "登录失败，请稍后再试");
  }
};

// 注册
const handleRegister = async (values) => {
  try {
    console.log("注册表单数据:", values);
    // 模拟注册API调用
    await register({
      username: values.username,
      email: values.email,
      password: values.password,
      code: values.verificationCode,
    });
    message.success("注册成功");
    // 获取用户信息
     await userStore.fetchUserInfo();
    // 更新登录状态
    isLoggedIn.value = userStore.isLoggedIn;
    message.success("已自动登录");
    props.onRegisterSuccess(values);
    emit("register-success", values);
    handleCancel();
  } catch (error) {
    console.error("注册失败:", error);
  }
};
//退出登录
const userLogout = async () => {
  const res = await logout();
  if (res.code === 200) {
    message.success("退出登录成功");
    userStore.logout(); // 调用 Pinia 中的 logout 方法
    isLoggedIn.value = userStore.isLoggedIn; // 更新 isLoggedIn 状态
    router.push("/"); // 跳转到首页
  } else {
    message.error(res.msg || "退出登录失败，请稍后再试");
  }
};
// 监听 registerFormState.email 的变化，并验证邮箱格式
watch(
  () => registerFormState.email,
  async (newEmail) => {
    if (!newEmail) {
      isEmailValid.value = false;
      return;
    }

    try {
      // 触发对 email 字段的校验
      await registerFormRef.value.validate(["email"]);
      isEmailValid.value = true; // 校验通过
    } catch (error) {
      isEmailValid.value = false; // 校验失败
    }
  }
);
onMounted(() => {
  // 初始化操作
});

onUnmounted(() => {
  // 清理定时器
  stopCountdown();
});
</script>

<style scoped>
.auth-modal-container {
  /* padding: 20px; */
  max-width: 600px;
  margin: 0 auto;
  margin-left: 10px;
}

.default-triggers {
  display: flex;
  gap: 16px;
  justify-content: center;
  height: 50px;
}

.auth-form {
  max-width: 300px;
  margin: 0 auto;
}

.auth-form-button {
  width: 100%;
}

.custom-modal .ant-modal-content {
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.custom-modal .ant-tabs-nav {
  margin-bottom: 24px;
}

.custom-modal .ant-form-item {
  margin-bottom: 20px;
}
/* 登录后 */
.avatar {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
}
</style>
