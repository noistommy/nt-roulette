<script setup>
import { ref, reactive, computed } from 'vue'
// import NtRoulette from '../../src/NtRoulette.vue';
import NtRoulette from '../../dist/nt-roulette.es';

const base_color = ['#f44336', '#e81e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#d9d9d9']
const data = reactive([
  { title: '1'},
  { title: '2'},
])
const dataArray = computed(() => new Array(Number(sectorLength.value)).fill(true))
const sectorLength = ref(12)
const holeSize = ref(10)
const spinCount = ref(10)
const colors = ref([base_color[6], base_color[8], base_color[13]])
const fontInfo = {
  size: 4,
  weight: 500,
  color: '#333'
}

const stateCode = ref('pause')
const resultValue = ref(0)
const showSetting = ref(false)
const showData = ref(false)

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

const addData = () => {
  const newItem = {
    title: data.length + 1
  }
  data.push(newItem)
}

const removeData = (i) => {
  data.splice(i, 1)
} 

const decrease = () => {
  if(data.length <= 2) return
  removeData(data.length - 1)
}

const showLayer = (type) => {
  if (type === 'data') {
    showSetting.value = false
    showData.value = !showData.value
  }
  if (type === 'setting') {
    showData.value = false
    showSetting.value = !showSetting.value
  }
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
    <button @click="showLayer('setting')">Setting</button>
    <div v-if="showSetting" class="setting-contents">
      <h3>Color Setting</h3>
      <div class="color-wrapper">
        <div class="color-chip" v-for="color in base_color" :key="color"
          :class="{selected: hasColor(color)}"
          :style="{ background: color}" @click="setColor(color)"></div>
      </div>  
      <h3>Sector Length</h3>
      <div class="length-wrapper">
        <button @click="addData">+</button>
        <input type="text" readonly v-model="data.length" >
        <button @click="decrease">-</button>
      </div>
      <h3>Hole Size(0 - 65)</h3>
      <div class="length-wrapper">
        <input type="range" v-model="holeSize" max="65" >
        <button>{{ holeSize }}</button>
      </div>
      <h3>Speed(1 - 50)</h3>
      <div class="length-wrapper">
        <input type="range" v-model="spinCount" min="1" max="50" >
        <button>{{ spinCount }}</button>
      </div>
    </div>
  </div>
  <div class="set-roulette left">
    <button @click="showLayer('data')">Data Set</button>
    <div v-if="showData" class="setting-data">
      <h3>Set Data List ({{ data.length }})</h3>
      <button class="add-btn" @click="addData">Add</button>
      <div class="data-list">
        <div class="data-item" v-for="(item, i) in data" :key="i">
          <input type="text" v-model="item.title" />
          <button :disabled="data.length <= 2" @click="removeData(i)">X</button>
        </div>
      </div>
    </div>
  </div>
  <div class="roulette-wrapper">
    <NtRoulette :data="data" :hole-size="holeSize" :colors="colors" :text-info="fontInfo" :state="stateCode" :spin-count="spinCount"
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
  max-width: 680px;
  max-height: 680px;
  width: 100%;
  margin: 0 auto;

}
.set-roulette {
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px;
  .setting-data,
  .setting-contents {
    position: absolute;
    top: 100%;
    right: 0;
    text-align: left;
    width: 250px;
    border: 1px solid #454545;
    border-radius: 10px;
    padding: 20px;
    background-color: #242424;
    margin: 0 10px;
    > div {
      padding-bottom: 20px;
      border-bottom: 1px solid #454545;
      &:last-child {
        padding: 0;
        border: 0;
      }
    }
  }
  &.left {
    left: 0;
    right: auto;
  }
  .setting-data {
    left: 0;
    .add-btn {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .data-list {
      margin: 10px 0;
      max-height: 620px;
      overflow-y: auto;
      .data-item {
        margin-bottom: 5px;
        display: flex;
        gap:5px;
        input {
          flex-grow: 1;
        }
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
@media screen and (max-width: 768px) {
  .set-roulette {
    .setting-data,
    .setting-contents {
      width: calc(100dvw - 60px);
    }
  }
}
</style>
