define(["appStorage"],function(e){function n(e,n,r){var t=f.filter(function(n){return n.id==e})[0];t||(t={id:e,owned:n,price:r},f.push(t)),t.price=r,t.owned=t.owned||n,t.id=e,Events.trigger(IapManager,"productupdated",[t])}function r(e){var n;n="embypremieremonthly"==e?NativeIapManager.getPremiereMonthlySku():NativeIapManager.getUnlockProductSku();var r=f.filter(function(e){return e.id==n});return r.length?r[0]:null}function t(){o()}function a(e,n){return"embypremieremonthly"==e?MainActivity.purchasePremiereMonthly(n):MainActivity.purchaseUnlock()}function i(e){e===!0?o():e&&ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Appstore/Register"),data:{Parameters:JSON.stringify(e)}}).then(function(){o()},function(){o()})}function o(){NativeIapManager.getPurchaseInfos("window.IapManager.updateProduct")}function u(){return new Promise(function(e){var n=[];n.push({feature:"embypremieremonthly",buttonText:"EmbyPremiereMonthly"}),n=n.filter(function(e){return null!=r(e.feature)}).map(function(e){var n=r(e.feature);return e.buttonText=Globalize.translate(e.buttonText,n.price),e.owned=n.owned,e}),e(n)})}function c(e){return Promise.resolve(!1)}function l(e){return"playback"==e||"livetv"==e}function d(){var e=Globalize.translate("AlreadyPaidHelp1","apps@emby.media");e+="<br/><br/>"+Globalize.translate("AlreadyPaidHelp2"),require(["confirm"],function(n){n(e,Globalize.translate("AlreadyPaid")).then(p)})}function p(){var e=ApiClient.serverInfo()||{},n=e.Id||"Unknown",r="Order number: ";r+="\n\nPlease enter order number above or attach screenshot of order information.",r+="\n\n"+n+"|"+ConnectionManager.deviceId(),MainActivity.sendEmail("apps@emby.media","Android Activation",r)}var f=[];window.IapManager={getProductInfo:r,updateProduct:n,beginPurchase:a,onPurchaseComplete:i,getSubscriptionOptions:u,onStoreReady:t,isUnlockedOverride:c,restorePurchase:d,enableRestore:l},NativeIapManager.initStore()});