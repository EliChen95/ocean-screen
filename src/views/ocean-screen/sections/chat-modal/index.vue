<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
  >
    <div
      class="bg-white w-[1200px] h-[800px] rounded-lg shadow-lg p-4 relative border border-gray-300 flex"
    >
      <button
        @click="closeChat"
        class="absolute top-4 right-4 text-black px-4 py-2 hover:bg-transparent hover:text-red-500 rounded-full transition-colors"
      >
        关闭
      </button>

      <div class="w-1/3 flex flex-col items-center justify-between p-4">
        <img
          src="@/assets/images/guanhai-logo.png"
          class="w-[150px] mb-4"
          alt="观海 Logo"
        />

        <div
          class="w-[150px] h-[150px] bg-gray-200 rounded-lg flex items-center justify-center"
        >
          <p class="text-gray-500">GIF 占位</p>
        </div>
      </div>

      <div
        class="w-2/3 flex flex-col justify-between p-4 bg-gray-100 rounded-lg"
      >
        <div class="flex gap-2 mb-4">
          <button
            class="bg-blue-500 text-white px-3 py-2 rounded-lg border border-blue-500 hover:bg-blue-600 transition-colors"
            @click="sendQuickMessage('旅游线路推荐')"
          >
            旅游线路推荐
          </button>
          <button
            class="bg-blue-500 text-white px-3 py-2 rounded-lg border border-blue-500 hover:bg-blue-600 transition-colors"
            @click="sendQuickMessage('逃生路线')"
          >
            逃生路线
          </button>
          <button
            class="bg-blue-500 text-white px-3 py-2 rounded-lg border border-blue-500 hover:bg-blue-600 transition-colors"
            @click="sendQuickMessage('VR奇观')"
          >
            VR奇观
          </button>
        </div>

        <div
          class="chat-history flex-grow bg-white p-2 overflow-y-auto mb-4 border border-gray-300"
        >
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="mb-4 flex"
            :class="{
              'justify-end': message.sender === 'user',
              'justify-start': message.sender === 'system',
            }"
          >
            <div v-if="message.sender === 'system'" class="mr-3">
              <div class="w-10 h-10 bg-gray-500 rounded-full"></div>
            </div>

            <div
              :class="{
                'bg-blue-500 text-white': message.sender === 'user',
                'bg-gray-200 text-gray-800': message.sender === 'system',
              }"
              class="p-3 rounded-lg max-w-[75%]"
            >
              {{ message.text }}
            </div>

            <div v-if="message.sender === 'user'" class="ml-3">
              <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  t="1729423905709"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4245"
                  width="20"
                  height="20"
                >
                  <path
                    d="M772.016477 696.022177c-39.228443-39.229466-85.763292-68.49807-136.530536-86.546122 26.774807-13.283538 51.500954-30.976502 73.254398-52.729945 52.55189-52.550867 81.494059-122.422214 81.494059-196.74085s-28.941146-144.189983-81.494059-196.741873c-52.550867-52.550867-122.422214-81.493036-196.74085-81.493036s-144.189983 28.942169-196.741873 81.493036c-52.55189 52.550867-81.494059 122.422214-81.494059 196.741873s28.941146 144.189983 81.494059 196.74085c21.753443 21.753443 46.480614 39.446407 73.256444 52.729945-50.76929 18.049075-97.303116 47.316655-136.532583 86.546122-66.188468 66.187445-104.009865 153.166425-107.422591 246.208495l48.730864 0c3.387144-80.028685 36.140105-154.783249 93.129051-211.770148 55.771211-55.771211 128.557958-88.326675 206.650547-92.867084 6.27389 0.418532 12.582573 0.645706 18.929118 0.645706 6.345522 0 12.656251-0.227174 18.929118-0.645706 78.091566 4.54041 150.880359 37.095873 206.650547 92.867084 56.987922 56.986899 89.741907 131.741463 93.129051 211.770148l48.730864 0C876.027365 849.188602 838.204945 762.209622 772.016477 696.022177zM282.466792 360.004237c0-126.564557 102.96814-229.53372 229.53372-229.53372 126.564557 0 229.53372 102.969163 229.53372 229.53372 0 120.304993-93.040023 219.280192-210.942293 228.77545-6.170536-0.304945-12.369725-0.460488-18.591427-0.460488-6.222725 0-12.420891 0.155543-18.59245 0.460488C375.505791 579.284429 282.466792 480.30923 282.466792 360.004237z"
                    fill="#fff"
                    p-id="4246"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            class="border border-gray-300 rounded-lg w-full p-2 mr-2 bg-gray-100 text-gray-800 placeholder-gray-500"
            placeholder="输入消息..."
          />
          <button
            @click="sendMessage"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatModal",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newMessage: "",
      messages: [
        {
          sender: "system",
          text: "你好，我是海鸥数字人，有什么问题可以问我。",
        },
      ],
    };
  },
  methods: {
    closeChat() {
      this.$emit("close");
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({ sender: "user", text: this.newMessage });
        this.newMessage = "";

        setTimeout(() => {
          if (this.messages[this.messages.length - 1].text === "旅游线路推荐") {
            this.messages.push({
              sender: "system",
              text: this.getTourismRoute(),
            });
          } else {
            this.messages.push({ sender: "system", text: "海鸥正在思考中..." });
          }
        }, 1000);
      }
    },
    sendQuickMessage(message) {
      this.newMessage = message;
      this.sendMessage();
    },
    getTourismRoute() {
      return `
        青岛三日游推荐路线：
        第一天：栈桥 -> 小青岛 -> 八大关 -> 第一海水浴场
        第二天：青岛海底世界 -> 五四广场 -> 奥帆中心
        第三天：崂山 -> 太清宫 -> 石老人海水浴场
        欢迎来到青岛，享受美丽的海滨风光和丰富的文化体验！
      `;
    },
  },
};
</script>

<style scoped>
.chat-history {
  flex-direction: column;
}
</style>