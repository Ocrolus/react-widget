const toCamel = (s: string): string =>
  s.replace(/([-_][a-z])/gi, (match: string) =>
    match.toUpperCase().replace("-", "").replace("_", "")
  );

const isArray = (a: any): boolean => Array.isArray(a);

const isObject = (o: any): boolean =>
  o === Object(o) && !isArray(o) && typeof o !== "function";

export const snakeToCamel = (o: any): any => {
  if (isObject(o)) {
    const n: { [key: string]: any } = {};

    Object.keys(o).forEach((k: string) => {
      n[toCamel(k)] = snakeToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => snakeToCamel(i));
  }

  return o;
};

export const isPreviewModeEnabled = () =>
  new URLSearchParams(window.location.search).get("preview") === "true";
