nt-number-puzzle
==================

![Static Badge](https://img.shields.io/badge/vue_3-only-%234FC08D?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/javascript-%23F7DF1E?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/html-%23E34F26?style=for-the-badge&logo=html)
![Static Badge](https://img.shields.io/badge/sass-%23CC6699?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/vite-bundler-%23646CFF?style=for-the-badge)

![nt-number-puzzle-preview](https://github.com/noistommy/nt-number-puzzle/assets/6008185/850e8fef-71ed-4be3-a2aa-72f2271e5635)
![nt-number-puzzle-preview2](https://github.com/noistommy/nt-number-puzzle/assets/6008185/f3e5fb67-0125-451a-8662-e7b7fc97c930)


`nt-number-puzzle` is a module that implements the retro game **numeric puzzle** as `vue` (vue components). Why don't you try to provide simple entertainment for users when developing a personal project or use it for users who are bored while loading long and long data?

`nt-number-puzzle`은 레트로 게임인 **숫자 퍼즐**을 `vue`(vue components)로 구현한 모듈입니다. 개인프로젝트 개발 시 사용자를 위한 간단한 즐길거리를 제공하려 하거나 길고 긴 데이터 로딩 중 심심한 사용자들을 위해 사용해 보는것은 어떨까요??

---
## Demo

[nt-number-puzzle](https://noistommy.github.io/nt-number-puzzle) demo page.

---
## Installation

```sh
 $ npm install nt-number-puzzle —-save
```
---
## Usage

```javascript
import NtNumberPuzzle from 'nt-number-puzzle';
import 'nt-number-puzzle/number-puzzle.css';

//template
//user`s source
...
<NtNumberPuzzle
  :grid-size="4" // default: 4
  :cell-size="4" // default: 4(rem)
  label-text = "..."
/>

```
---

## Props

* **gridSize**: _number_ ▶︎ `4`    
Set the vertical/horizontal size of tile grid.

* **cellSize**: _number_ ▶︎ `4`   
Setting the size of tiles(unit rem).

* **labelText**: _string_ ▶︎ `''`   
Setting letters to display tiles.

---

## How to play

* Click the `START` button to start game.
* Click to move up, down, left, and right tiles of empty tiles.
* Place the tiles in order.
* When all the tiles are placed in order, the game ends.
* You can specify the tiles to move by pressing the `top`, `bottom`, `left`, and `right` keys on the keyboard.
* You can move an active tile by pressing the `space` key.
* Press the `ctrl` key to display the order of the tiles.
* If you click the `RETRY` button during the game, the tiles will mix and restart the game.
---