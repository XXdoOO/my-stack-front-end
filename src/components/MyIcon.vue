<script setup lang="ts">
import { useRouter } from 'vue-router'
import util from '@/util/util'

const props = withDefaults(defineProps<{
  icon: string,
  href?: string,
  type?: 'link' | 'text' | 'button',
  active?: boolean,
  num?: string | number,
  size?: string
}>(), {
  type: 'button',
  active: false,
  size: 'inherit'
})

const $emit = defineEmits(['click'])
const $router = useRouter()

let timer
const handleClick = (e) => {
  clearTimeout(timer)
  timer = setTimeout(() => {

    $emit('click', e)

    if (props.href) {
      $router.push(props.href)
    }
  }, 100)
}
</script>

<template>
  <i class="my-icon" :class="[type, { active: active }]" @click="handleClick">
    <svg aria-hidden="true">
      <use :xlink:href="`#my-${icon}`"></use>
    </svg>
    <span v-if="num">
      {{ num ? util.formatNum(num) : '' }}
      <slot></slot>
    </span>
  </i>
</template>

<style lang="less" scoped>
.my-icon {
  color: #C0C4CC;
  transition: @transition-time;
  display: flex;
  align-items: center;
  font-style: normal;
  font-size: v-model(size);

  svg {
    width: 2em;
    height: 2em;
    fill: currentColor;
  }
}

.link,
.button {
  cursor: pointer;
}

.link:hover,
.button:hover {
  color: @theme-color
}

.link:hover svg,
.button:hover svg {
  color: @theme-color
}

.active {
  color: @theme-color
}
</style>