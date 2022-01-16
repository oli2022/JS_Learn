const list = document.querySelector(".list");
const tourCategoly = {};
function init() {
    getAllTour();
}
init();
function getAllTour() {
    axios
        .get(
            "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?%24format=JSON",
            {
                headers: getAuthorizationHeader(),
            }
        )
        .then(function (response) {
            const thisData = response.data;
            thisData.forEach(function (item) {
                if (item.Class1 == undefined) {
                    return;
                } else if (tourCategoly[item.Class1] == undefined) {
                    tourCategoly[item.Class1] = 1;
                } else {
                    tourCategoly[item.Class1] += 1;
                }
            });
            renderCategoly();       
        });
}
function renderCategoly(){
    const tourCategolyAry = Object.keys(tourCategoly);
    console.log(tourCategolyAry);
    let str = "";
    tourCategolyAry.forEach(function(item){
        str +=`<li>${item}：${tourCategoly[item]}</li>`
    })
    list.innerHTML = str;
}
function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
    let AppID = "28be96d18851420bb6b4b4aa24cad688";
    let AppKey = "iWJAHpLr1GPxGtPLvPWRxCuIDnI";
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA("SHA-1", "TEXT");
    ShaObj.setHMACKey(AppKey, "TEXT");
    ShaObj.update("x-date: " + GMTString);
    let HMAC = ShaObj.getHMAC("B64");
    let Authorization =
        'hmac username="' +
        AppID +
        '", algorithm="hmac-sha1", headers="x-date", signature="' +
        HMAC +
        '"';
    return { Authorization: Authorization, "X-Date": GMTString };
}
