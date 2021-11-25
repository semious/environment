import { EnvType, H5Token } from "./typing";

export function getEnviroment() {
  const UA = typeof navigator !== 'undefined' ? navigator.userAgent : '';

  // 微信环境判断
  if (typeof wx !== 'undefined') {
    return EnvType.isWechatMini;
  }

  // 支付宝环境判断
  if (UA.search(H5Token.ALIPAY) !== -1) {
    return EnvType.isAlipayH5;
  }

  if ('object' === typeof worker && 'function' === typeof worker.onMessage && 'function' === typeof worker.postMessage) { 
    return EnvType.isAipayJSWorker;
  }

  if(typeof my !== 'undefined') {
    return EnvType.isAlipayMini;
  }

  // 钉钉环境判断
  if (UA.search(H5Token.DINGDING) !== -1) {
    return EnvType.isDingdingH5;
  }

  // 浏览器环境判断
  if (typeof window === 'object' && typeof document === 'object' && typeof Worker === 'function') {
    return EnvType.isBrowser;
  }

  // if (typeof globalThis === 'object' && globalThis?.constructor?.name === 'DedicatedWorkerGlobalScope') {
  //   return EnvType.isBrowserWorker;
  // }

}

/**
 * 手机类型判断
 * @returns 
 */
export function getMobileType(): EnvType {
  const env = getEnviroment();
  switch (env) {
    case EnvType.isAlipayH5:
    case EnvType.isDingdingH5:
      const UA = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      if (UA.search(/iPhone/) !== -1) {
        return EnvType.isIPhone;
      } else if (UA.search(/Android/) !== -1) {
        return EnvType.isAndroid;
      } else {
        return EnvType.UNKNOWN;
      }
    case EnvType.isAlipayMini:
      const myUA = my.getSystemInfoSync();
      if (myUA.platform.search(/ios|iphone/ig) !== -1) {
        return EnvType.isIPhone;
      } else if (myUA.platform.search(/android/ig) !== -1) {
        return EnvType.isAndroid;
      }
      break;
    default:
      return EnvType.UNKNOWN;
  }
  return EnvType.UNKNOWN;
}

