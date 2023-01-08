<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import util from '@/util/util'

const props = withDefaults(defineProps<{
  icon: string,
  href?: string,
  type?: 'link' | 'text' | 'button',
  active?: boolean,
  num?: string | number
}>(), {
  type: 'button',
  active: false
})

const $emit = defineEmits(['click', 'update:num', 'update:active'])
const $router = useRouter()

let timer
const handleClick = (e) => {
  clearTimeout(timer)
  timer = setTimeout(() => {

    $emit('update:num', props.active ? Number(props.num) - 1 : Number(props.num) + 1)
    $emit('update:active', !props.active)
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
      <use :xlink:href="`#${icon}`"></use>
    </svg>
    <span>
      {{ num != undefined ? util.formatNum(num) : '' }}
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
  font-size: 12px;

  svg {
    margin-right: 0.1em;
    width: 2em;
    height: 2em;
    vertical-align: -0.15em;
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