# erizabesu

[![npm version](https://img.shields.io/npm/v/erizabesu.svg?style=flat)](https://www.npmjs.com/package/erizabesu)

Carousel component built with Preact.

## Install

**npm**
``` sh
npm install erizabesu
npm install erizabesu-indicators # optional
```
**yarn**
``` sh
yarn add erizabesu
yarn add erizabesu-indicators # optional
```

## Demos
- [**Simple Slider**](https://codepen.io/ShredderMing/pen/baRvKd)

## Usage

```js
import { h } from 'preact';
import Erizabesu from 'erizabesu';
import { Simple } from 'erizabesu-indicators';

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
    <Simple />
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
