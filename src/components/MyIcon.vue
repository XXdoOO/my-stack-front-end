<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';

const props = withDefaults(defineProps<{
  icon: string,
  isActive: boolean,
  enableHover: boolean,
  href: string
}>(), {
  icon: 'star-active',
  isActive: false,
  enableHover: true,
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
  <i class="icon" :class="{ 'enable-hover': enableHover, active: isActive }" @click="handleClick">
    <svg aria-hidden="true">
      <use :xlink:href="`#${icon}`"></use>
    </svg>
    <span>
      <slot></slot>
    </span>
  </i>
</template>

<style lang="less" scoped>
.icon {
  overflow: hidden;
  color: #C0C4CC;
  transition: 0.3s;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    width: 2em;
    height: 2em;
    vertical-align: -0.15em;
    fill: currentColor;
  }
}

.enable-hover {
  cursor: pointer;
}

.enable-hover:hover {
  color: @theme-color
}

.enable-hover:hover svg {
  color: @theme-color
}

.active {
  color: @theme-color
}
</style>