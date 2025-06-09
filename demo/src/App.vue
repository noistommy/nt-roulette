<script setup>
import { ref, computed } from 'vue'
// import NtRoulette from '../../src/NtRoulette.vue';
import NtRoulette from '../../dist/nt-roulette.es';

const base_color = ['#f44336', '#e81e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#d9d9d9']
const data = [
  { id: 0, title: 'title 1'},
  { id: 1, title: 'title 2'},
  { id: 2, title: 'title 3'},
  { id: 3, title: 'title 4'},
  { id: 4, title: 'title 5'},
  { id: 5, title: 'title 6'},
  { id: 6, title: 'title 7'},
  { id: 7, title: 'title 8'},
  { id: 8, title: 'title 9'},
  { id: 9, title: 'title 10'},
  { id: 10, title: 'title 11'},
  { id: 11, title: 'title 12'},
]
const dataArray = computed(() => new Array(Number(sectorLength.value)).fill(true))
const sectorLength = ref(12)
const holeSize = ref(10)
const colors = ref([base_color[6], base_color[8], base_color[13]])
const fontInfo = {
  size: 4,
  weight: 500,
  color: '#333'
}

const stateCode = ref('pause')
const resultValue = ref(0)
const showSetting = ref(false)

const setColor = (color) => {
  let set = new Set(colors.value)
  if (set.has(color)) {
    colors.value = colors.value.filter(c => c !== color)
  } else {
    colors.value.push(color)
  }
}

const hasColor = (color) => {
  return new Set(colors.value).has(color)
}

const resultRoulette =(result) => {
  resultValue.value = result
  alert(`${resultValue.value + 1}가 선택되었습니다.`)
}

const increase = () => {
  if(sectorLength.value >= 45) return
  sectorLength.value++
}
const decrease = () => {
  if(sectorLength.value <= 2) return
  sectorLength.value--
}
</script>

<template>
  <h1>NT Roulette</h1>
  <div class="controller">
    <button @click="stateCode = 'running'">Run</button>
    <button @click="stateCode = 'pause'">Stop</button>
    <button @click="stateCode = 'reset'" :disabled="stateCode === 'running'">Reset</button>
  </div>
  <div class="set-roulette">
    <button @click="showSetting = !showSetting">Setting</button>
    <div v-if="showSetting" class="setting-contents">
      <h3>Color Setting</h3>
      <div class="color-wrapper">
        <div class="color-chip" v-for="color in base_color" :key="color"
          :class="{selected: hasColor(color)}"
          :style="{ background: color}" @click="setColor(color)"></div>
      </div>  
      <h3>Sector Length</h3>
      <div class="length-wrapper">
        <button @click="increase">+</button>
        <input type="text" v-model="sectorLength" >
        <button @click="decrease">-</button>
      </div>
      <h3>Hole Size</h3>
      <div class="length-wrapper">
        <input type="range" v-model="holeSize" max="65" >
        <button>{{ holeSize }}</button>
      </div>
    </div>
  </div>
  <div class="roulette-wrapper">
    <NtRoulette :data="dataArray" :hole-size="holeSize" :colors="colors" :text-info="fontInfo" :state="stateCode"
      @result="resultRoulette"
      @update="stateCode=$event"
    />
  </div>
</template>

<style scoped>
h1, h2, h3, h4, h5, h6 {
  &:first-child {
    margin-top: 0;
  }
}
.roulette-wrapper {
  width: 680px;
  height: 680px;
}
.set-roulette {
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px;
  .setting-contents {
    position: absolute;
    top: 100%;
    right: 10px;
    text-align: left;
    width: 250px;
    border: 1px solid #454545;
    border-radius: 10px;
    padding: 20px;
    background-color: #242424;
    > div {
      padding-bottom: 20px;
      border-bottom: 1px solid #454545;
      &:last-child {
        padding: 0;
        border: 0;
      }
    }
  }
}
.controller {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}
.color-wrapper {
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
  &:hover .color-chip:not(:hover) {
    opacity: .5;
    transform: scale(0.9);
    transition: transform 100ms;
  }
  .color-chip {
    width: 30px;
    height: 30px;
    border-radius: 2px;
    &.selected {
      border: 1px solid #fff
    }
  }
}
.length-wrapper {
  display: flex;
  gap: 2px;
  input {
    text-align: center;
  }
}

</style>
