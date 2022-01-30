const txt = document.querySelector(".txt");
const send = document.querySelector(".send");
const list = document.querySelector(".list");
const citySelect = document.querySelector(".citySelect");
send.addEventListener("click", function (e) {
    const keyWord = txt.value;
    const city = citySelect.value;
    txt.value = "";
    axios
        .get(
            `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?%24filter=contains(ScenicSpotName,'${keyWord}')&%24format=JSON`,
            {
                headers: getAuthorizationHeader(),
            }
        )
        .then(function (response) {
            const thisData = response.data;
            let str = "";
            thisData.forEach(function (item) {
                str += `<li>
                <a href="page.html?id=${item.ScenicSpotID}>
                <h2>${item.ScenicSpotName}</h2>
                </a>
                ${item.City}
                </li>`;
            });
            list.innerHTML = str;
        });
});
function init() {
    getAllTour();
}
init();
function getAllTour() {
    axios
        .get(
            "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24filter=contains(ScenicSpotName%2C'%E8%8A%B1')&%24top=30&%24format=JSON",
            {
                headers: getAuthorizationHeader(),
            }
        )
        .then(function (response) {
            const thisData = response.data;
            let str = "";
            thisData.forEach(function (item) {
                str += `<li><a href="page.html?id=${item.ScenicSpotID}>${item.ScenicSpotName}</a></li>`;
            });
            list.innerHTML = str;
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
