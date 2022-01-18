//選擇器設定
const citySelect = document.querySelector(".citySelect");
const send = document.querySelector(".send");
const list = document.querySelector(".list");

send.addEventListener("click", function (e) {
    const city = citySelect.value;
    axios
        .get(
            `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?%24top=30&%24format=JSON`,
            {
                headers: getAuthorizationHeader(),
            }
        )
        .then(function (response) {
            const thisData = response.data;
            console.log(thisData);
            let str = "";
            thisData.forEach(function (item) {
                //判斷是否有圖片
                if (item.Picture.PictureUrl1 !== undefined) {
                    str += `
                    <li>
                    <h2>${item.ScenicSpotName}</h2>
                    <p>${item.DescriptionDetail}</p>
                    <img src="${item.Picture.PictureUrl1}" width="450px"></img>
                    </li>
                    `;
                } else {
                    str += `
                    <li>
                    <h2>${item.ScenicSpotName}</h2>
                    <p>${item.DescriptionDetail}</p>
                    <img src="imgs/images.png" width="450px"></img>
                    </li>
                    `;
                }
            });
            list.innerHTML = str;
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
