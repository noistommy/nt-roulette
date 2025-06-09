nt-roulette
==================

![Static Badge](https://img.shields.io/badge/vue_3-only-%234FC08D?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/javascript-%23F7DF1E?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/html-%23E34F26?style=for-the-badge&logo=html)
![Static Badge](https://img.shields.io/badge/sass-%23CC6699?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/vite-bundler-%23646CFF?style=for-the-badge)

![nt-roulette-preview](https://github.com/user-attachments/assets/8723db32-002c-44f4-b385-4636f326c481)

![nt-roulette-preview-setting](https://github.com/user-attachments/assets/f2009354-92e8-4549-aab8-a796950814a2)


`nt-roulette`은 SVG를 이용하여 구현된 룰렛판입니다. 디테일한 애니메이션을 적용하여 실제 룰렛 움직임과 흡사하게 동작하도록 제작 되었습니다. 사용자가 2~45개의 룰렛 조각을 설정 할 수 있으며 1. 실행 시 (running state) 마다 랜덤한 결과를 만들어냅니다. 2. 실행 이후 사용자가 멈출 수 있으며 (stop state) 멈추었을떄 화살표가 위치한 조작을 결과로 보여줍니다. 3. 또한 각 조각을 선택해서 결과를 보여 줄 수도 있습니다. 추가 설정으로 각 조각의 배경 컬러 패턴을 지정 할 수있습니다. 
선택이 필요한 UI에 사용하면 보다 역동적인 사이트가 되지 않을까요??    

---
## Demo

[nt-roulette](https://noistommy.github.io/nt-roulette) demo page.

---
## Installation

```sh
 $ npm install nt-roulette —-save
```
---
## Usage

```javascript
import NtRoulette from 'nt-roulette';

//template
//user`s source
...
<NtRoulette
  :data="[]" // default: 4
  :hole-size="0" // default: 4(rem)
  :text-info = "{
    size: 5,
    weight: 600,w
    color: #444
  }"
  :colors="['#ffffff', ...]"
  state="running"
/>

```
---

## Props

* **data**: _array_ ▶︎ `null`    
data array의 크기에 따라 룰렛 조각의 수가 결정된다.

* **holeSize**: _number_ ▶︎ `0`   
룰렛을 도넷 형태로 만들기 위한 중앙 원의 크기

* **textInfo**: _object_ ▶︎ `{}`   
룰렛에 표시 되는 텍스트 스타일 (font-size, font-weight, color)

* **colors**: _array_ ▶︎ `[]`   
룰렛 조각의 배경 색상 목록 목록의 색상을 순서대로 표시하며 목록을 반복하며 색상 패턴을 만든다.

* **state**: _string_ ▶︎ `pause`   
룰렛 실행을 위한 상태. running: 실행, pause: 정지, reset: 초기화

---
