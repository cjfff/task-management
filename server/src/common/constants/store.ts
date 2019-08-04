
export class Store {
  private cache = {}
  prefix: string; // 前缀
  expires: number; // 过期时间，秒

  constructor(prefix = 'store', expires = 300) {
    this.prefix = prefix;
    this.expires = expires;
  }

  private getKey(key): string {
    return `${this.prefix}_${key}`
  }

  get(key): any {
    const _key = this.getKey(key)
    const data = this.cache[_key]
    if (!data) return null

    const { expiresTime, value } = data;
    if (expiresTime < Date.now()) {
      delete this.cache[_key]
      return null
    }

    return value
  }

  set(key, value): boolean {
    this.cache[this.getKey(key)] = {
      value,
      expiresTime: Date.now() + this.expires * 1000 // 5 分钟 过期
    }
    console.info(this.cache)
    return true
  }
}


let store = null;

export function getStore() {
  if (!store) {
    store = new Store('$email', 500)
  }

  return store
}