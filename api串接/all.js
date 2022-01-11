function init() {
    getTourList();
}
init();
function getTourList() {
    axios
        .get(
            "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON",
            {
                headers: getAuthorizationHeader(),
            }
        )
        .then(function (response) {
            let thisData = response.data;
            console.log(thisData);
            let str = "";
            thisData.forEach(function (item) {
                str += `<li>
                <h2>${item.ScenicSpotName}</h2>
                <p>${item.Address}</p>
                <img src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}" />
                </li>`;
            });
            document.querySelector(".list").innerHTML = str;
        })
        .catch(function (response) {
            console.log(error.response.data);
        });
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
