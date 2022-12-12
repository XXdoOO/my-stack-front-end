<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';

const props = withDefaults(defineProps<{
  icon: string,
  href?: string,
  type?: 'link' | 'text' | 'button'
}>(), {
  type: 'button'
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
  <i class="icon" :class="type" @click="handleClick">
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
  color: #C0C4CC;
  transition: @transition-time;
  display: flex;
  align-items: center;
  font-style: normal;

  svg {
    margin-right: 0.2em;
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
</style>