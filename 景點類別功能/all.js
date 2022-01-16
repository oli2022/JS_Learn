const list = document.querySelector(".list");
const tourList = document.querySelector(".tourList");
list.addEventListener("click", function (e) {
    //中止網頁連結
    e.preventDefault();
    if (e.target.nodeName !== "A") {
        return;
    }
    const categoly = e.target.getAttribute("data-categoly");
    axios
        .get(
            `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?%24filter=contains(Class1,'${categoly}')&%24format=JSON`,
            {
                headers: getAuthorizationHeader(),
            }
        )
        .then(function (response) {
            const thisData = response.data;
            console.log(thisData);
            let str = "";
            thisData.forEach(function (item){
                str += `<li><h2>${item.ScenicSpotName}</h2>
                ${item.DescriptionDetail}
                </li>`
            })
            tourList.innerHTML = str;
        });
});
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
