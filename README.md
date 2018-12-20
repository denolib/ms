# `ms`
[![Build Status](https://travis-ci.org/denolib/ms.svg?branch=master)](https://travis-ci.org/denolib/ms)

Use this package to easily convert various time formats to milliseconds.
It is ported from [https://github.com/zeit/ms](https://github.com/zeit/ms) to work with [Deno](https://deno.land). Ported mainly for use in porting `debug`.

## Examples

```js
import ms from "https://raw.githubusercontent.com/denolib/ms/master/ms.ts";

ms('2 days')  // 172800000
ms('1d')      // 86400000
ms('10h')     // 36000000
ms('2.5 hrs') // 9000000
ms('2h')      // 7200000
ms('1m')      // 60000
ms('5s')      // 5000
ms('1y')      // 31557600000
ms('100')     // 100
ms('-3 days') // -259200000
ms('-1h')     // -3600000
ms('-200')    // -200
```

### Convert from Milliseconds

```js
ms(60000)             // "1m"
ms(2 * 60000)         // "2m"
ms(-3 * 60000)        // "-3m"
ms(ms('10 hours'))    // "10h"
```

### Time Format Written-Out

```js
ms(60000, { long: true })             // "1 minute"
ms(2 * 60000, { long: true })         // "2 minutes"
ms(-3 * 60000, { long: true })        // "-3 minutes"
ms(ms('10 hours'), { long: true })    // "10 hours"
```

