<template>
  <dv-border-box-13 class="box-border pt-[6px] px-[16px]">
    <div
      class="flex items-center justify-center h-[38px] w-full text-[#31abe3] relative"
      v-if="!!title"
    >
      <div
        class="w-[58px] h-[14px] bg-[url('@/assets/images/title.png')] bg-no-repeat bg-contain"
      ></div>

      <!-- Title Text -->
      <span
        class="font-black tracking-[2px] bg-clip-text text-transparent bg-gradient-to-r from-[#0072ff] via-[#00eaff] to-[#01aaff] leading-[38px]"
      >
        &nbsp;&nbsp;{{ title }}&nbsp;&nbsp;
      </span>

      <div
        class="w-[58px] h-[14px] transform bg-[url('@/assets/images/title.png')] rotate-180 bg-no-repeat bg-contain"
      ></div>
    </div>

    <div :class="!!title ? 'h-[calc(100%-38px)]' : 'w-full h-full'">
      <slot></slot>
    </div>
  </dv-border-box-13>
</template>

<script>
export default {
  name: "ItemWrap",
  props: {
    title: {
      type: String,
      default: () => "",
    },
  },
};
</script>