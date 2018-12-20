// Adapted from https://github.com/zeit/ms/blob/master/test.js
// Copyright (c) 2016 Zeit, Inc. MIT License
// Copyright (c) 2018 Kevin "Kun" Kassimo Qian. MIT License
import { test, assertEqual } from "https://deno.land/x/testing/testing.ts";
import { ms } from "./ms.ts";

// ms(string)
{
  test(function preserveMs() {
    assertEqual(ms("100"), 100);
  });

  test(function mToMs() {
    assertEqual(ms("1m"), 60000);
  });

  test(function hToMs() {
    assertEqual(ms("1h"), 3600000);
  });

  test(function dToMs() {
    assertEqual(ms("2d"), 172800000);
  });

  test(function wToMs() {
    assertEqual(ms("3w"), 1814400000);
  });

  test(function sToMs() {
    assertEqual(ms("1s"), 1000);
  });

  test(function msToMs() {
    assertEqual(ms("100ms"), 100);
  });

  test(function decimals() {
    assertEqual(ms("1.5h"), 5400000);
  });

  test(function multiSpaces() {
    assertEqual(ms("1   s"), 1000);
  });

  test(function invalidRetNaN() {
    assertEqual(isNaN(ms("☃") as number), true);
  });

  test(function caseInsensitive() {
    assertEqual(ms("1.5H"), 5400000);
  });

  test(function numbersStartWithDot() {
    assertEqual(ms(".5ms"), 0.5);
  });

  test(function negativeInts() {
    assertEqual(ms("-100ms"), -100);
  });

  test(function negativeDecimals() {
    assertEqual(ms("-1.5h"), -5400000);
    assertEqual(ms("-10.5h"), -37800000);
  });

  test(function negativeDecimalsStartWithDot() {
    assertEqual(ms("-.5h"), -1800000);
  });
}

// ms(long string)

{
  test(function millisecondsToMs() {
    assertEqual(ms("53 milliseconds"), 53);
  });

  test(function msecsToMs() {
    assertEqual(ms("17 msecs"), 17);
  });

  test(function secToMs() {
    assertEqual(ms("1 sec"), 1000);
  });

  test(function minToMs() {
    assertEqual(ms("1 min"), 60000);
  });

  test(function hrToMs() {
    assertEqual(ms("1 hr"), 3600000);
  });

  test(function daysToMs() {
    assertEqual(ms("2 days"), 172800000);
  });

  test(function longDecimals() {
    assertEqual(ms("1.5 hours"), 5400000);
  });

  test(function longNegativeIntegers() {
    assertEqual(ms("-100 milliseconds"), -100);
  });

  test(function longNegativeDecimals() {
    assertEqual(ms("-1.5 hours"), -5400000);
  });

  test(function negativeDecimalsStartWithDot() {
    assertEqual(ms("-.5 hr"), -1800000);
  });
}

// ms(number, { long: true })
{
  test(function longSupportMilliseconds() {
    assertEqual(ms(500, { long: true }), "500 ms");
    assertEqual(ms(-500, { long: true }), "-500 ms");
  });

  test(function longSupportSeconds() {
    assertEqual(ms(1000, { long: true }), "1 second");
    assertEqual(ms(1200, { long: true }), "1 second");
    assertEqual(ms(10000, { long: true }), "10 seconds");

    assertEqual(ms(-1000, { long: true }), "-1 second");
    assertEqual(ms(-1200, { long: true }), "-1 second");
    assertEqual(ms(-10000, { long: true }), "-10 seconds");
  });

  test(function longSupportMinutes() {
    assertEqual(ms(60 * 1000, { long: true }), "1 minute");
    assertEqual(ms(60 * 1200, { long: true }), "1 minute");
    assertEqual(ms(60 * 10000, { long: true }), "10 minutes");

    assertEqual(ms(-1 * 60 * 1000, { long: true }), "-1 minute");
    assertEqual(ms(-1 * 60 * 1200, { long: true }), "-1 minute");
    assertEqual(ms(-1 * 60 * 10000, { long: true }), "-10 minutes");
  });

  test(function longSupportHours() {
    assertEqual(ms(60 * 60 * 1000, { long: true }), "1 hour");
    assertEqual(ms(60 * 60 * 1200, { long: true }), "1 hour");
    assertEqual(ms(60 * 60 * 10000, { long: true }), "10 hours");

    assertEqual(ms(-1 * 60 * 60 * 1000, { long: true }), "-1 hour");
    assertEqual(ms(-1 * 60 * 60 * 1200, { long: true }), "-1 hour");
    assertEqual(ms(-1 * 60 * 60 * 10000, { long: true }), "-10 hours");
  });

  test(function longSupportDays() {
    assertEqual(ms(24 * 60 * 60 * 1000, { long: true }), "1 day");
    assertEqual(ms(24 * 60 * 60 * 1200, { long: true }), "1 day");
    assertEqual(ms(24 * 60 * 60 * 10000, { long: true }), "10 days");

    assertEqual(ms(-1 * 24 * 60 * 60 * 1000, { long: true }), "-1 day");
    assertEqual(ms(-1 * 24 * 60 * 60 * 1200, { long: true }), "-1 day");
    assertEqual(ms(-1 * 24 * 60 * 60 * 10000, { long: true }), "-10 days");
  });

  test(function longShouldRound() {
    assertEqual(ms(234234234, { long: true }), "3 days");

    assertEqual(ms(-234234234, { long: true }), "-3 days");
  });
}

// ms(number)
{
  test(function supportMilliseconds() {
    assertEqual(ms(500), "500ms");

    assertEqual(ms(-500), "-500ms");
  });

  test(function supportSeconds() {
    assertEqual(ms(1000), "1s");
    assertEqual(ms(10000), "10s");

    assertEqual(ms(-1000), "-1s");
    assertEqual(ms(-10000), "-10s");
  });

  test(function supportMinutes() {
    assertEqual(ms(60 * 1000), "1m");
    assertEqual(ms(60 * 10000), "10m");

    assertEqual(ms(-1 * 60 * 1000), "-1m");
    assertEqual(ms(-1 * 60 * 10000), "-10m");
  });

  test(function supportHours() {
    assertEqual(ms(60 * 60 * 1000), "1h");
    assertEqual(ms(60 * 60 * 10000), "10h");

    assertEqual(ms(-1 * 60 * 60 * 1000), "-1h");
    assertEqual(ms(-1 * 60 * 60 * 10000), "-10h");
  });

  test(function supportDays() {
    assertEqual(ms(24 * 60 * 60 * 1000), "1d");
    assertEqual(ms(24 * 60 * 60 * 10000), "10d");

    assertEqual(ms(-1 * 24 * 60 * 60 * 1000), "-1d");
    assertEqual(ms(-1 * 24 * 60 * 60 * 10000), "-10d");
  });

  test(function shouldRound() {
    assertEqual(ms(234234234), "3d");

    assertEqual(ms(-234234234), "-3d");
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
  assertEqual(errCount, 5);
});
