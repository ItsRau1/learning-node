export function BuildRoutePath (path) {
    const RouteParametersRegex = /:([a-zA-Z]+)/g
    const PathWithParams = path.replaceAll(RouteParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    const PathRegEx = new RegExp(`^${PathWithParams}(?<query>\\?(.*))?$`)

    return PathRegEx
}
