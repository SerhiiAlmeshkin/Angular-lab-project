export const createCookie = (cookie: Cookie) => {
  const {value, name, maxAgeInSec} = cookie;
  document.cookie = `${name}=${value}; max-age=${maxAgeInSec}`
}

export const getCookie = (cookieName: string): string | null => {
  const cookieData = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieName}=`))

  if (cookieData) {
    return JSON.parse(cookieData.split('=')[1])
  }
  return null
}

export interface Cookie {
  name: string;
  value: string;
  maxAgeInSec: string;
}
