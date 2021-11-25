declare const my: any; // 支付宝小程序 global namespace
declare const Ali: any; // 阿里系H5环境的 global namespace
declare const wx: any; // 微信小程序里 global namespace
declare const worker: { // 支付宝小程序worker的 global namespace
  onMessage: Function,
  postMessage: Function,
};
declare const dd :any; // 钉钉小程序的 global namespace
