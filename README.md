<p align="center">
  <img src="http://oyb6x67aa.bkt.clouddn.com/erizabesu.png" width="428" alt="erizabesu">
</p>
<h1 align="center">
	Erizabesu(エリザベス)
	<a href="https://www.npmjs.org/package/erizabesu"><img src="https://img.shields.io/npm/v/erizabesu.svg?style=flat" alt="npm"></a> <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" alt="prettier"></a>
</h1>
<p align="center">Carousel component built with Preact.</p>

---

## Install

**npm**
``` sh
npm install erizabesu
npm install erizabesu-indicators # optional
npm install erizabesu-arrows # optional
```
**yarn**
``` sh
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
    img: 'http://oyb6x67aa.bkt.clouddn.com/slide1.png',
    href: 'http://gintama.wikia.com/wiki/Elizabeth',
    target: '_blank'
  },
  {
    img: 'http://oyb6x67aa.bkt.clouddn.com/slide2.png',
    href: 'http://gintama.wikia.com/wiki/Elizabeth',
    target: '_blank'
  },
  {
    img: 'http://oyb6x67aa.bkt.clouddn.com/slide3.png',
    href: 'http://gintama.wikia.com/wiki/Elizabeth',
    target: '_blank'
  },
  {
    img: 'http://oyb6x67aa.bkt.clouddn.com/slide4.png',
    href: 'http://gintama.wikia.com/wiki/Elizabeth',
    target: '_blank'
  },
  {
    img: 'http://oyb6x67aa.bkt.clouddn.com/slide5.png',
    href: 'http://gintama.wikia.com/wiki/Elizabeth',
    target: '_blank'
  }
];

const SimpleSlider = () => (
  <Erizabesu data={data} style={{width: '600px', height: '300px'}}>
    <Indicator />
    <Arrow.Prev />
    <Arrow.Next />
  </Erizabesu>
);

```

## Props

| Props             | Type        | Default Value | Description                                         |
| ----------------- | ----------- | ------------- | --------------------------------------------------- |
| `autoplay`        | `bool`      | `true`        |                                                     |
| `autoplaySpeed`   | `int`       | `3000`        | Delay between each auto scroll (in milliseconds)    |
| `allowMouseSwipe` | `bool`      | `true`        |                                                     |
| `data`            | `array`     | `null`        | [{img:'url',href:'url',target:'_blank'},{},{},...]  |
| `infinite`        | `bool`      | `true`        | swipe infinitely                                    |
