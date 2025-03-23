import "vue";
function getCurrentSubNVue() {
  return uni.getSubNVueById(plus.webview.currentWebview().id);
}
function formatAppLog(type, filename, ...args) {
  if (uni.__log__) {
    uni.__log__(type, filename, ...args);
  } else {
    console[type].apply(console, [...args, filename]);
  }
}
export {
  formatAppLog as f,
  getCurrentSubNVue as g
};
