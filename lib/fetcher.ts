/* eslint-disable no-undef */
"use client";

import { reportEvent } from "@/lib/utils/analytics";

export async function apiFetcher(
  input: URL | RequestInfo,
  init?: RequestInit | undefined,
) {
  try {
    const result = await fetch(input, init);
    const res = await parsedRes(result);

    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function parsedRes(res: any) {
  try {
    if (!res.ok) {
      const error = new Error(
        "An error occurred while fetching the data.",
      ) as any;

      if (res.status === 401) {
        return null;
      }

      if (res.status === 422) {
        error.info = "params error, sign failed";
      }

      if (!error.info) {
        const resBody = await res.text();
        const errorTip =
          resBody.length > 100 ? "Failed: An error occurred" : resBody;
        error.info = errorTip;
      }

      error.status = res.status;

      throw error;
    }

    const json = await res.json();
    if (json.code === 500) {
      reportEvent("fetch_500", { value: "" });

      const err = new Error(
        `500: ${json.msg || json.message || json.data}`,
      ) as any;
      err.info = json.msg || json.message || json.data;
      err.status = 500;

      throw err;
    }

    return json?.data || json;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
