// Adapted from https://github.com/zeit/ms/blob/master/test.js
// Copyright (c) 2016 Zeit, Inc. MIT License
// Copyright (c) 2018 Kevin "Kun" Kassimo Qian. MIT License
import { test } from "https://deno.land/std/testing/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { ms } from "./ms.ts";

// ms(string)
{
  test(function preserveMs() {
    assertEquals(ms("100"), 100);
  });

  test(function mToMs() {
    assertEquals(ms("1m"), 60000);
  });

  test(function hToMs() {
    assertEquals(ms("1h"), 3600000);
  });

  test(function dToMs() {
    assertEquals(ms("2d"), 172800000);
  });

  test(function wToMs() {
    assertEquals(ms("3w"), 1814400000);
  });

  test(function sToMs() {
    assertEquals(ms("1s"), 1000);
  });

  test(function msToMs() {
    assertEquals(ms("100ms"), 100);
  });

  test(function decimals() {
    assertEquals(ms("1.5h"), 5400000);
  });

  test(function multiSpaces() {
    assertEquals(ms("1   s"), 1000);
  });

  test(function invalidRetNaN() {
    assertEquals(isNaN(ms("☃") as number), true);
  });

  test(function caseInsensitive() {
    assertEquals(ms("1.5H"), 5400000);
  });

  test(function numbersStartWithDot() {
    assertEquals(ms(".5ms"), 0.5);
  });

  test(function negativeInts() {
    assertEquals(ms("-100ms"), -100);
  });

  test(function negativeDecimals() {
    assertEquals(ms("-1.5h"), -5400000);
    assertEquals(ms("-10.5h"), -37800000);
  });

  test(function negativeDecimalsStartWithDot() {
    assertEquals(ms("-.5h"), -1800000);
  });
}

// ms(long string)

{
  test(function millisecondsToMs() {
    assertEquals(ms("53 milliseconds"), 53);
  });

  test(function msecsToMs() {
    assertEquals(ms("17 msecs"), 17);
  });

  test(function secToMs() {
    assertEquals(ms("1 sec"), 1000);
  });

  test(function minToMs() {
    assertEquals(ms("1 min"), 60000);
  });

  test(function hrToMs() {
    assertEquals(ms("1 hr"), 3600000);
  });

  test(function daysToMs() {
    assertEquals(ms("2 days"), 172800000);
  });

  test(function longDecimals() {
    assertEquals(ms("1.5 hours"), 5400000);
  });

  test(function longNegativeIntegers() {
    assertEquals(ms("-100 milliseconds"), -100);
  });

  test(function longNegativeDecimals() {
    assertEquals(ms("-1.5 hours"), -5400000);
  });

  test(function negativeDecimalsStartWithDot() {
    assertEquals(ms("-.5 hr"), -1800000);
  });
}

// ms(number, { long: true })
{
  test(function longSupportMilliseconds() {
    assertEquals(ms(500, { long: true }), "500 ms");
    assertEquals(ms(-500, { long: true }), "-500 ms");
  });

  test(function longSupportSeconds() {
    assertEquals(ms(1000, { long: true }), "1 second");
    assertEquals(ms(1200, { long: true }), "1 second");
    assertEquals(ms(10000, { long: true }), "10 seconds");

    assertEquals(ms(-1000, { long: true }), "-1 second");
    assertEquals(ms(-1200, { long: true }), "-1 second");
    assertEquals(ms(-10000, { long: true }), "-10 seconds");
  });

  test(function longSupportMinutes() {
    assertEquals(ms(60 * 1000, { long: true }), "1 minute");
    assertEquals(ms(60 * 1200, { long: true }), "1 minute");
    assertEquals(ms(60 * 10000, { long: true }), "10 minutes");

    assertEquals(ms(-1 * 60 * 1000, { long: true }), "-1 minute");
    assertEquals(ms(-1 * 60 * 1200, { long: true }), "-1 minute");
    assertEquals(ms(-1 * 60 * 10000, { long: true }), "-10 minutes");
  });

  test(function longSupportHours() {
    assertEquals(ms(60 * 60 * 1000, { long: true }), "1 hour");
    assertEquals(ms(60 * 60 * 1200, { long: true }), "1 hour");
    assertEquals(ms(60 * 60 * 10000, { long: true }), "10 hours");

    assertEquals(ms(-1 * 60 * 60 * 1000, { long: true }), "-1 hour");
    assertEquals(ms(-1 * 60 * 60 * 1200, { long: true }), "-1 hour");
    assertEquals(ms(-1 * 60 * 60 * 10000, { long: true }), "-10 hours");
  });

  test(function longSupportDays() {
    assertEquals(ms(24 * 60 * 60 * 1000, { long: true }), "1 day");
    assertEquals(ms(24 * 60 * 60 * 1200, { long: true }), "1 day");
    assertEquals(ms(24 * 60 * 60 * 10000, { long: true }), "10 days");

    assertEquals(ms(-1 * 24 * 60 * 60 * 1000, { long: true }), "-1 day");
    assertEquals(ms(-1 * 24 * 60 * 60 * 1200, { long: true }), "-1 day");
    assertEquals(ms(-1 * 24 * 60 * 60 * 10000, { long: true }), "-10 days");
  });

  test(function longShouldRound() {
    assertEquals(ms(234234234, { long: true }), "3 days");

    assertEquals(ms(-234234234, { long: true }), "-3 days");
  });
}

// ms(number)
{
  test(function supportMilliseconds() {
    assertEquals(ms(500), "500ms");

    assertEquals(ms(-500), "-500ms");
  });

  test(function supportSeconds() {
    assertEquals(ms(1000), "1s");
    assertEquals(ms(10000), "10s");

    assertEquals(ms(-1000), "-1s");
    assertEquals(ms(-10000), "-10s");
  });

  test(function supportMinutes() {
    assertEquals(ms(60 * 1000), "1m");
    assertEquals(ms(60 * 10000), "10m");

    assertEquals(ms(-1 * 60 * 1000), "-1m");
    assertEquals(ms(-1 * 60 * 10000), "-10m");
  });

  test(function supportHours() {
    assertEquals(ms(60 * 60 * 1000), "1h");
    assertEquals(ms(60 * 60 * 10000), "10h");

    assertEquals(ms(-1 * 60 * 60 * 1000), "-1h");
    assertEquals(ms(-1 * 60 * 60 * 10000), "-10h");
  });

  test(function supportDays() {
    assertEquals(ms(24 * 60 * 60 * 1000), "1d");
    assertEquals(ms(24 * 60 * 60 * 10000), "10d");

    assertEquals(ms(-1 * 24 * 60 * 60 * 1000), "-1d");
    assertEquals(ms(-1 * 24 * 60 * 60 * 10000), "-10d");
  });

  test(function shouldRound() {
    assertEquals(ms(234234234), "3d");

    assertEquals(ms(-234234234), "-3d");
  });
}

// ms(invalid inputs)
test(function invalidInputs() {
  let errCount = 0;
  try {
    // @ts-ignore
    ms(undefined);
  } catch (e) {
    errCount++;
  }
  try {
    // @ts-ignore
    ms(null);
  } catch (e) {
    errCount++;
  }
  try {
    // @ts-ignore
    ms([]);
  } catch (e) {
    errCount++;
  }
  try {
    // @ts-ignore
    ms({});
  } catch (e) {
    errCount++;
  }
  try {
    // @ts-ignore
    ms(NaN);
  } catch (e) {
    errCount++;
  }
  assertEquals(errCount, 5);
});
