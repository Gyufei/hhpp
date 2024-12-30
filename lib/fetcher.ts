/* eslint-disable no-undef */
"use client";

import { withSecure } from "acclism-manifest-v2";

const access_key = "aK15X6c9";
const seedApiUrl = "https://preview-apis.tadle.com/seed/apply";
const ga_code = "129203";

const encryptFetch = withSecure(fetch, access_key, seedApiUrl, ga_code);

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

export async function dataApiFetcher(
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
      return null;
    }

    return json?.data || json;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
