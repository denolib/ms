// Adapted from https://github.com/zeit/ms/blob/master/test.js
// Copyright (c) 2016 Zeit, Inc. MIT License
// Copyright (c) 2018 Kevin "Kun" Kassimo Qian. MIT License
import { assertEquals } from "https://deno.land/std@v0.50.0/testing/asserts.ts";
import { ms } from "./ms.ts";

// ms(string)
Deno.test("preserveMs", function () {
  assertEquals(ms("100"), 100);
});

Deno.test("mToMs", function () {
  assertEquals(ms("1m"), 60000);
});

Deno.test("hToMs", function () {
  assertEquals(ms("1h"), 3600000);
});

Deno.test("dToMs", function () {
  assertEquals(ms("2d"), 172800000);
});

Deno.test("wToMs", function () {
  assertEquals(ms("3w"), 1814400000);
});

Deno.test("sToMs", function () {
  assertEquals(ms("1s"), 1000);
});

Deno.test("msToMs", function () {
  assertEquals(ms("100ms"), 100);
});

Deno.test("decimals", function () {
  assertEquals(ms("1.5h"), 5400000);
});

Deno.test("multiSpaces", function () {
  assertEquals(ms("1   s"), 1000);
});

Deno.test("invalidRetNaN", function () {
  assertEquals(isNaN(ms("☃") as number), true);
});

Deno.test("caseInsensitive", function () {
  assertEquals(ms("1.5H"), 5400000);
});

Deno.test("numbersStartWithDot", function () {
  assertEquals(ms(".5ms"), 0.5);
});

Deno.test("negativeInts", function () {
  assertEquals(ms("-100ms"), -100);
});

Deno.test("negativeDecimals", function () {
  assertEquals(ms("-1.5h"), -5400000);
  assertEquals(ms("-10.5h"), -37800000);
});

Deno.test("negativeDecimalsStartWithDot", function () {
  assertEquals(ms("-.5h"), -1800000);
});

// ms(long string)

Deno.test("millisecondsToMs", function () {
  assertEquals(ms("53 milliseconds"), 53);
});

Deno.test("msecsToMs", function () {
  assertEquals(ms("17 msecs"), 17);
});

Deno.test("secToMs", function () {
  assertEquals(ms("1 sec"), 1000);
});

Deno.test("minToMs", function () {
  assertEquals(ms("1 min"), 60000);
});

Deno.test("hrToMs", function () {
  assertEquals(ms("1 hr"), 3600000);
});

Deno.test("daysToMs", function () {
  assertEquals(ms("2 days"), 172800000);
});

Deno.test("longDecimals", function () {
  assertEquals(ms("1.5 hours"), 5400000);
});

Deno.test("longNegativeIntegers", function () {
  assertEquals(ms("-100 milliseconds"), -100);
});

Deno.test("longNegativeDecimals", function () {
  assertEquals(ms("-1.5 hours"), -5400000);
});

Deno.test("negativeDecimalsStartWithDot", function () {
  assertEquals(ms("-.5 hr"), -1800000);
});

// ms(number, { long: true })
Deno.test("longSupportMilliseconds", function () {
  assertEquals(ms(500, { long: true }), "500 ms");
  assertEquals(ms(-500, { long: true }), "-500 ms");
});

Deno.test("longSupportSeconds", function () {
  assertEquals(ms(1000, { long: true }), "1 second");
  assertEquals(ms(1200, { long: true }), "1 second");
  assertEquals(ms(10000, { long: true }), "10 seconds");

  assertEquals(ms(-1000, { long: true }), "-1 second");
  assertEquals(ms(-1200, { long: true }), "-1 second");
  assertEquals(ms(-10000, { long: true }), "-10 seconds");
});

Deno.test("longSupportMinutes", function () {
  assertEquals(ms(60 * 1000, { long: true }), "1 minute");
  assertEquals(ms(60 * 1200, { long: true }), "1 minute");
  assertEquals(ms(60 * 10000, { long: true }), "10 minutes");

  assertEquals(ms(-1 * 60 * 1000, { long: true }), "-1 minute");
  assertEquals(ms(-1 * 60 * 1200, { long: true }), "-1 minute");
  assertEquals(ms(-1 * 60 * 10000, { long: true }), "-10 minutes");
});

Deno.test("longSupportHours", function () {
  assertEquals(ms(60 * 60 * 1000, { long: true }), "1 hour");
  assertEquals(ms(60 * 60 * 1200, { long: true }), "1 hour");
  assertEquals(ms(60 * 60 * 10000, { long: true }), "10 hours");

  assertEquals(ms(-1 * 60 * 60 * 1000, { long: true }), "-1 hour");
  assertEquals(ms(-1 * 60 * 60 * 1200, { long: true }), "-1 hour");
  assertEquals(ms(-1 * 60 * 60 * 10000, { long: true }), "-10 hours");
});

Deno.test("longSupportDays", function () {
  assertEquals(ms(24 * 60 * 60 * 1000, { long: true }), "1 day");
  assertEquals(ms(24 * 60 * 60 * 1200, { long: true }), "1 day");
  assertEquals(ms(24 * 60 * 60 * 10000, { long: true }), "10 days");

  assertEquals(ms(-1 * 24 * 60 * 60 * 1000, { long: true }), "-1 day");
  assertEquals(ms(-1 * 24 * 60 * 60 * 1200, { long: true }), "-1 day");
  assertEquals(ms(-1 * 24 * 60 * 60 * 10000, { long: true }), "-10 days");
});

Deno.test("longShouldRound", function () {
  assertEquals(ms(234234234, { long: true }), "3 days");

  assertEquals(ms(-234234234, { long: true }), "-3 days");
});

// ms(number)
Deno.test("supportMilliseconds", function () {
  assertEquals(ms(500), "500ms");

  assertEquals(ms(-500), "-500ms");
});

Deno.test("supportSeconds", function () {
  assertEquals(ms(1000), "1s");
  assertEquals(ms(10000), "10s");

  assertEquals(ms(-1000), "-1s");
  assertEquals(ms(-10000), "-10s");
});

Deno.test("supportMinutes", function () {
  assertEquals(ms(60 * 1000), "1m");
  assertEquals(ms(60 * 10000), "10m");

  assertEquals(ms(-1 * 60 * 1000), "-1m");
  assertEquals(ms(-1 * 60 * 10000), "-10m");
});

Deno.test("supportHours", function () {
  assertEquals(ms(60 * 60 * 1000), "1h");
  assertEquals(ms(60 * 60 * 10000), "10h");

  assertEquals(ms(-1 * 60 * 60 * 1000), "-1h");
  assertEquals(ms(-1 * 60 * 60 * 10000), "-10h");
});

Deno.test("supportDays", function () {
  assertEquals(ms(24 * 60 * 60 * 1000), "1d");
  assertEquals(ms(24 * 60 * 60 * 10000), "10d");

  assertEquals(ms(-1 * 24 * 60 * 60 * 1000), "-1d");
  assertEquals(ms(-1 * 24 * 60 * 60 * 10000), "-10d");
});

Deno.test("shouldRound", function () {
  assertEquals(ms(234234234), "3d");

  assertEquals(ms(-234234234), "-3d");
});

// ms(invalid inputs)
Deno.test("invalidInputs", function () {
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
