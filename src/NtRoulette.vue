<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: null
  },
  holeSize: {
    type: Number,
    default: 0
  },
  colors: {
    type: Array,
    default: ['#f44336', '#e81e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722']
  },
  textInfo: {
    type: Object,
    default: {
      size: 8,
      weight: 600,
      color: '#333'
    }
  },
  state: {
    type: String,
    default: 'pause'
  },
  spinCount: {
    type: Number,
    default: 10
  }
})

const emits = defineEmits(['result', 'update'])

const viewSize = 100
const rouletteSize = ref(90)

const selectedItem = ref(0)

const roulette_color = ref('#d9d9d9')
const roulette_text_color = ref('#333')

const offsetAngle = ref(-90)



const viewBox = computed(() => `${viewSize / -2} ${viewSize / -2} ${viewSize} ${viewSize}`)
const radius = computed(() =>( rouletteSize.value / 2))
const hRadius = computed(() => (props.holeSize / 2))
const sectorLength = computed(() => props.data.length)
const itemAngle = computed(() => (360 / sectorLength.value))

const getPoint = (ang, radius) => {
    const radian = ang * (Math.PI / 180)
    return convertToQuadrent(ang, radius * Math.cos(radian),  (radius * Math.sin(radian)))
}

const convertToQuadrent = (ang, x, y) => {
  const qNum = Math.floor(ang / 90) + 1

  switch(qNum) {
    case 1:
      return { x, y: -1 * y }
    case 2:
      return { x: -1 * x, y: -y }
    case 3:
      return { x: -1 * x, y }
    default:
      return { x, y }   
  }
}

const getRoulettePath = () => {
  return `${circlePath(radius.value)} ${circlePath(hRadius.value)}`
}

const circlePath = (R) => {
  return `
  M ${R} 0 
  a ${R} ${R} 0 1 1 ${2 * R * -1} 0 
  a ${R} ${R} 0 1 1 ${2 * R} 0 
  Z
  `
}

const getSectorPath = () => {
    const {x: ax, y: ay} = getPoint(itemAngle.value / 2, radius.value)
    const {x: fx, y: fy} = getPoint(itemAngle.value / 2, hRadius.value)
    const path = `
    M ${ax} ${ay} A ${radius.value} ${radius.value} 0 0 1 ${ax} ${-ay} L ${fx} ${-fy} A ${hRadius.value} ${hRadius.value} 0 0 0  ${fx} ${fy} Z
    `
    const line = `M ${ax} ${ay} L ${fx} ${fy} Z`
    return { path, line }
}

const calcAngle = (index) => {
    return `rotate(${itemAngle.value * index + offsetAngle.value}, 0, 0)`
}

const calcTextPos = (index) => {
    const angle = (itemAngle.value * index)
    return getPoint(angle, radius.value-5)
}

const setSectorColor = (i) => {
  const colorIndex = i % props.colors.length
  return props.colors ? props.colors[colorIndex] : 'transparent'
}

// Run Roulette
let degree = 0
let distance = 0
let spinCount = 0
let accelVal = 0.01
let cc = -1

const spinning = ref(false)
const rouletteRef = ref(null)

const rouletteSpin = () => {
  // spinning.value = trues
  if (reloadState.value !== 'running') {
    emits('result', selectedItem.value)
    return
  }
  accelVal = spinCount > 0 ? 0.01 : 0.05
  let result = itemAngle.value * selectedItem.value + (spinCount * 360)
  if (distance >= sectorLength.value / 2) {
      result = result + (360 * cc)
  } 
  if (Math.abs(result - degree) < 0.1) {
      rouletteRef.value.style.transform = `rotate(${(result) * - 1 }deg)`
      // spinning.value = false
      reloadState.value = 'pause'
      spinCount = 0
      emits('update', reloadState.value)
      emits('result', selectedItem.value)
      return 
  } else {
      let offset = (result - degree) * accelVal > 360 ? (result - degree) * accelVal * 5  : (result - degree) * accelVal 
      degree = degree + offset
      rouletteRef.value.style.transform = `rotate(${degree * -1}deg)`
      requestAnimationFrame(rouletteSpin)
  }

}

const currentSpin = () => {
    degree = itemAngle.value * selectedItem.value
    rouletteRef.value.style.transform = `rotate(${degree * -1})`
}

const resetSpin = () => {
    degree = 0
    distance = 0
    rouletteRef.value.style.transform = `rotate(0)`
    selectedItem.value = 0
}

const reverse = ref(false)
const reloadState = ref(props.state)

const stopRoulette = () => {
  rouletteRef.value.style.animationPlayState = 'paused'
  reloadState.value = 'pause'
  selectedItem.value = Math.round((degree % 360) / itemAngle.value)
}

// const reloadRoulette = ({ movementY }) => {
//   if(reloadState.value !== 'pause') return
//   if (movementY > 10) reloadState.value = 'reload'
// }


const setRoulette = (num) => {
  reverse.value = !reverse.value
  if (num < 0) num = sectorLength.value - 1
  if (num === sectorLength.value) num = 0
  cc = num - selectedItem.value > 0 ? -1 : 1
  distance = Math.abs(num - selectedItem.value)
  
  currentSpin()
  selectedItem.value = num
  reloadState.value = 'running'
  rouletteSpin()
  rouletteRef.value.style.animationPlayState = 'running'
}

const runRoulette = () => {
  spinCount = props.spinCount
  const num = parseInt(Math.random()*100%sectorLength.value)
  setRoulette(num)
}

// onMounted(() => runRoulette())
watch(() => props.state, (value) => {
  if(value === 'running') runRoulette()
  else if(value === 'pause') stopRoulette()
  else if(value === 'reset') resetSpin()
})

</script>

<template>
  <svg width="100%" height="100%" :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <path :d="getSectorPath().path" id="sector" />
    </defs>
    <!-- roulette circle -->
    <path :d="getRoulettePath()" fill-rule="evenodd" clip-rule="evenodd" :fill="roulette_color" stroke="#fff" stroke-width="1" />
    <g ref="rouletteRef" id="roulette" :class="{rev: reverse}">
      <g v-for="(item, i) in data" :key="`section-${item}`" :transform="calcAngle(i) " class="sector-item"
        :class="{select: selectedItem === i}"
        @mousedown="stopRoulette"
        @mouseup="setRoulette(i)"
      >
        <use xlink:href="#sector" :fill="setSectorColor(i)" opacity="0.8" />
        <path :d="getSectorPath().line" stroke="#fff" stroke-opacity="0.2" stroke-width="0.5" />
        <text :x="calcTextPos(0).x" :y="calcTextPos(0).y" opacity="1" dx="0" dy="0" dominant-baseline="middle" text-anchor="middle"
          :font-size="textInfo.size" :font-weight="textInfo.weight"   :fill="textInfo.color"
          :transform="`rotate(${-90}, ${calcTextPos(0).x}, ${calcTextPos(0).y} )`"
        >
          {{ item.title }}
        </text>
      </g>
    </g>
    <!-- selected sector -->
    <g  :transform="calcAngle(0)">
      <path :d="`M 45 0 l 0 -2 l -3 2 l 3 2 Z`"  fill="#fff"></path>
      <use xlink:href="#sector" fill="#fff" fill-opacity="0.4" stroke="#454545" stroke-width="0.5" stroke-dashoffset="0" stroke-dasharray=".5" />
    </g>
  </svg>
</template>

<style lang="scss" scoped>
</style>