<template>
  <main class="box">
    <div class="content">
      个人中心
      <div>
        <a-tabs v-model:activeKey="activeKey" centered @change="handleChange">
          <a-tab-pane key="0" tab="个人信息">
            <div class="user_content">
              <div class="avatar-uploader">
                <div class="user-profile">
                  <!-- 头像区域 -->
                  <div class="avatar-container" @click="handleAvatarClick">
                    <a-avatar
                      :size="80"
                      :src="userinfo.avatar"
                      shape="circle"
                    />
                    <!-- 隐藏的文件输入框 -->
                    <input
                      ref="uploadInput"
                      type="file"
                      accept="image/*"
                      style="display: none"
                      @change="handleChangeUpdate"
                    />
                  </div>

                  <!-- 用户信息 -->
                  <div class="user-info">
                    <p>
                      <strong>{{ userinfo.username }}</strong>
                    </p>
                    <p>注册时间：{{ userinfo.createTime }}</p>
                  </div>
                </div>
              </div>
              <div>
                <h1>账号信息设置</h1>
                <div class="user_info">
                  <span>昵称</span>
                  <a-input v-model:value="userinfo.nickname" />
                </div>
                <div class="user_info">
                  <span>个人简介</span>
                  <a-input v-model:value="userinfo.intro" />
                </div>
                <div style="margin-left: 50px">
                  <a-button type="primary" @click="updateUserInfo()"
                    >更改信息</a-button
                  >
                </div>
              </div>

              <div style="margin-top: 50px">
                <h1>邮箱设置</h1>

                <div class="user_info">
                  <span>邮箱</span>
                  <a-input v-model:value="userinfo.email" />
                </div>

                <div
                  class="user_info"
                  style="display: flex; align-items: center"
                >
                  <span>验证码</span>
                  <a-input
                    v-model:value="userinfo.code"
                    style="flex: 1; margin-right: 10px"
                  />

                  <!-- 获取验证码按钮 -->
                  <a-button
                    :disabled="isCounting"
                    @click="getCode"
                    style="width: 120px"
                  >
                    {{ buttonText }}
                  </a-button>
                </div>

                <div style="margin-left: 100px">
                  <a-button type="primary" @click="updateUserEmail"
                    >更改邮箱</a-button
                  >
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane
            v-for="tab in tabs"
            :key="tab.key"
            :tab="tab.title"
            force-render
          >
            <div>{{ tab.content }}</div>
            <div class="article">
              <ul v-for="item in acticList" :key="item.id">
                <router-link :to="`/article/${item.id}`">
                  <li>
                    <img class="img" :src="item.articleCover" alt="" />
                    <div class="title">{{ item.title }}</div>
                  </li>
                </router-link>
              </ul>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getArticleListByUserId } from "@/api/Article";
import { sendVerificationCode } from "@/api/auth";
import { getCurrentUser,updateCurrentUser,updateEmail } from "@/api/User";
import { message } from "ant-design-vue";
// 当前激活的Tab键值
const activeKey = ref("0");
//个人信息
const userinfo = ref({
  username: "",
  nickname: "",
  email: "",
  intro: "",
  code:undefined,
});

// 引用文件输入框元素
const uploadInput = ref(null);

// 触发文件选择器
const handleAvatarClick = () => {
  uploadInput.value.click();
};

// 处理文件选择事件
const handleChangeUpdate = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // 创建一个 FileReader 对象用于读取文件内容
  const reader = new FileReader();
  reader.onload = (e) => {
    user.value.avatar = e.target.result;
    message.success("头像更新成功！");
  };
  reader.readAsDataURL(file);

  // 清空文件输入框，以便下次点击时可以重新选择文件
  event.target.value = null;
};
// 文章列表
const acticList = ref([]);

//标签
const tabs = [
  { key: "1", title: "收藏", content: "文章收藏" },
  { key: "2", title: "点赞", content: "文章点赞" },
  { key: "3", title: "留言", content: "文章留言" },
];

/**
 * 处理Tab切换事件
 * @param key 当前选中的Tab的key值
 */
const handleChange = (key) => {
  // 如果不是个人信息Tab，则获取对应的文章列表
  if (key !== "0") {
    getArticleListByUserId(key).then((res) => {
      if (res.code === 200) {
        acticList.value = res.data; // 更新文章列表
      }
    });
  }
};

/**
 * 更改当前用户信息
 */
const updateUserInfo = async () => {
    const res = await updateCurrentUser(userinfo.value);
    if (res.code === 200) {
      message.success("用户信息更新成功");
      getUserInfo();
    } else {
      message.error("用户信息更新失败");
    }
};
// 倒计时相关变量
const isCounting = ref(false);
const countdown = ref(60);
const buttonText = ref('获取验证码');
let timer = null;

// 获取验证码方法
const getCode = async () => {
  if (isCounting.value) return;
const res = await sendVerificationCode(userinfo.value.email);
message.success('验证码已发送，请注意查收')
getUserInfo();
isCounting.value = true;
  countdown.value = 60;
  buttonText.value = `${countdown.value}s`;

  // 启动定时器
  timer = setInterval(() => {
    countdown.value--;
    buttonText.value = `${countdown.value}s`;

    if (countdown.value <= 0) {
      clearInterval(timer);
      isCounting.value = false;
      buttonText.value = '获取验证码';
    }
  }, 1000);
};

// 更改邮箱的方法
const updateUserEmail = async () => {
  if (!userinfo.value.email || !userinfo.value.code) {
    message.warning('请输入邮箱和验证码');
    return;
  }
  const res = await updateEmail(userinfo.value.email, userinfo.value.code);
  if (res.code == 200) {
    message.success('邮箱修改成功');
    getUserInfo();
  }
 
};
/**
 * 获取当前用户信息
 */
const getUserInfo = async () => {
  const res = await getCurrentUser();
  if (res.code === 200) {
    userinfo.value = res.data;
  }
};
onMounted(() => {
  getUserInfo();
});
</script>

<style lang="scss" scoped>
/* 主体样式 */
.box {
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10rem 20px;

  .content {
    width: 100%;
    height: fit-content;
    animation: slide-in 0.6s 0.1s backwards;
    box-shadow: 0 8px 16px -4px #2c2d300c;
    padding: 1rem 2rem;
    border-radius: 12px;
    background: var(--card-bg-color);
    border: 1px solid #e3e8f7;
    // 个人信息
    .user_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .avatar-uploader {
        display: flex;
        align-items: center;
        margin: 20px 0;
        .user-profile {
          display: flex;
          align-items: center;
          color: var(--text-color);
          padding: 20px;
          margin-left: 100px;
          .avatar-container {
            margin-right: 20px;
            text-align: center;
          }
        }
      }

      .user_info {
        display: flex;
        align-items: center;
        margin: 20px 0;
        line-height: 30px;
        span {
          width: 100px;
          font-size: 13px;
          color: var(--userinfo-span-color);
          text-align: right;
          margin-right: 10px;
        }
        .ant-input {
          width: 500px;
          border: 1px solid #e3e8f7;
          background: var(--useinfo-input-bg);
        }
      }
    }

    /* 文章列表样式 */
    .article {
      margin-top: 2rem;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        li {
          width: 100%;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;

          .img {
            width: 300px;
            border-radius: 12px;
            margin-right: 1rem;
          }

          .title {
            font-size: 1.5rem;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
