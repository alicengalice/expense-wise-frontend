// Small utility to convert react-admin JSON:API query params
// into a simple REST format expected by the backend.
export function transformReactAdminParams(url: string, base?: string): string {
  const resolvedBase = base ?? (typeof window !== "undefined" ? window.location.origin : "");
  const urlObj = new URL(url, resolvedBase);
  const params = urlObj.searchParams;

  const range = params.get("range");
  if (range) {
    try {
      const parsed = JSON.parse(range);
      const start = Number(parsed[0]);
      const end = Number(parsed[1]);
      params.delete("range");
      params.set("_start", String(Number.isNaN(start) ? 0 : start));
      params.set("_end", String(Number.isNaN(end) ? start + 10 : end + 1));
    } catch (e) {
      // ignore parse errors
    }
  }

  const sort = params.get("sort");
  if (sort) {
    try {
      const [field, order] = JSON.parse(sort);
      params.delete("sort");
      if (field) params.set("_sort", String(field));
      if (order) params.set("_order", String(order));
    } catch (e) {
      // ignore parse errors
    }
  }

  const filter = params.get("filter");
  if (filter === "{}") {
    params.delete("filter");
  }

  urlObj.search = params.toString();
  return urlObj.toString();
}

export function createTransformedFetch(fetchJson: (input: RequestInfo, init?: RequestInit) => Promise<any>, base?: string) {
  return (url: string, options: any = {}) => {
    const newUrl = transformReactAdminParams(url, base);
    // Keep simple logs to help debug parameter transformation in the browser console
    // (react-admin runs in the browser so console output is visible to the developer)
    // eslint-disable-next-line no-console
    console.log("🔵 Original URL:", url);
    // eslint-disable-next-line no-console
    console.log("🟢 Transformed URL:", newUrl);
    return fetchJson(newUrl, options);
  };
}
