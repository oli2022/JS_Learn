function init() {
    getTourItem();
}
init();

function getTourItem() {
    const id = window.location.href.split("=")[1];
    axios
        .get(
            `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?%24format=JSON&$filter=contains(ScenicSpotID,'${id}')`,
            {
                headers: getAuthorizationHeader(),
            }
        )
        .then(function (response) {
            const thisData = response.data[0];
            console.log(thisData);
            document.querySelector(".js-title").textContent =
                thisData.ScenicSpotName;
            document
                .querySelector(".js-img")
                .setAttribute("src", thisData.Picture.PictureUrl1);
            document.querySelector(".js-descriptionDetail").textContent =
                thisData.DescriptionDetail;
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
