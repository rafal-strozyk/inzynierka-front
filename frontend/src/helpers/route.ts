import { useRouter } from "vue-router";

export function isRouteParamValidNumber(
  paramName: string,
): [undefined, string] | [number, undefined] {
  const router = useRouter();

  const routeParam = router.currentRoute.value.params[paramName];
  if (Array.isArray(routeParam) || routeParam === undefined) {
    return [undefined, "Invalid parameter."];
  }
  const parsedrouteParam = parseInt(routeParam);
  if (Number.isNaN(parsedrouteParam)) {
    return [undefined, "Invalid parameter."];
  }
  return [parsedrouteParam, undefined];
}

export function isRouteParamValidString(
  paramName: string,
): [undefined, string] | [string, undefined] {
  const router = useRouter();

  const routeParam = router.currentRoute.value.params[paramName];
  if (Array.isArray(routeParam) || routeParam === undefined) {
    return [undefined, "Invalid parameter."];
  }

  return [routeParam, undefined];
}
