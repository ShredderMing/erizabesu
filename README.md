<p align="center">
  <img src="https://i.loli.net/2020/11/24/Iiv1Y4nylemLdCq.png" width="428" alt="erizabesu">
</p>
<h1 align="center">
	Erizabesu(エリザベス)
	<a href="https://www.npmjs.com/package/erizabesu"><img src="https://img.shields.io/npm/v/erizabesu.svg?style=flat" alt="npm"></a> <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" alt="prettier"></a>
</h1>
<p align="center">Carousel component built with Preact.</p>

---

## Install

**npm**

```sh
npm install erizabesu
npm install erizabesu-indicators # optional
npm install erizabesu-arrows # optional
```

**yarn**

```sh
yarn add erizabesu
yarn add erizabesu-indicators # optional
yarn add erizabesu-arrows # optional
```

## Demos

- [**Simple Slider**](https://codepen.io/ShredderMing/pen/baRvKd)

## Usage

```js
import { h } from 'preact';
import Erizabesu from 'erizabesu';
import { Simple as Indicator } from 'erizabesu-indicators';
import { Simple as Arrow } from 'erizabesu-arrows';

const data = [
  {
    img: 'https://res.cloudinary.com/demo/image/upload/w_600,h_300/sample.jpg',
    href: 'http://gintama.wikia.com/wiki/Elizabeth',
    target: '_blank',
  },
  {
    img: 'https://res.cloudinary.com/demo/image/upload/w_600,h_300/dog.jpg',
    href: 'http://gintama.wikia.com/wiki/Elizabeth',
    target: '_blank',
  },
  {
    img: 'https://res.cloudinary.com/demo/image/upload/w_600,h_300/group.jpg',
    href: 'http://gintama.wikia.com/wiki/Elizabeth',
    target: '_blank',
  },
  {
    img: 'https://res.cloudinary.com/demo/image/upload/w_600,h_300/bike.jpg',
    href: 'http://gintama.wikia.com/wiki/Elizabeth',
    target: '_blank',
  },
  {
    img: 'https://res.cloudinary.com/demo/image/upload/w_600,h_300/woman.jpg',
    href: 'http://gintama.wikia.com/wiki/Elizabeth',
    target: '_blank',
  },
];

const SimpleSlider = () => (
  <Erizabesu data={data} style={{ width: '600px', height: '300px' }}>
    <Indicator />
    <Arrow.Prev />
    <Arrow.Next />
  </Erizabesu>
);
```

## Props

| Props             | Type    | Default Value | Description                                        |
| ----------------- | ------- | ------------- | -------------------------------------------------- |
| `autoplay`        | `bool`  | `true`        |                                                    |
| `autoplaySpeed`   | `int`   | `3000`        | Delay between each auto scroll (in milliseconds)   |
| `allowMouseSwipe` | `bool`  | `true`        |                                                    |
| `data`            | `array` | `null`        | [{img:'url',href:'url',target:'_blank'},{},{},...] |
| `infinite`        | `bool`  | `true`        | swipe infinitely                                   |
