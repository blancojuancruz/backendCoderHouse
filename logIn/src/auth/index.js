export const webAuth = (request, response, next) => {
  if (!request) {
    response.json('Error')
  } else {
    next()
  }
}

// export function apiAuth(request, response, next) {}
