//전역변수
let map;
let cities;
let cityCnt = 0;
const weatherApi = "https://api.openweathermap.org/data/2.5/weather";
const params = {
  appid: "4eedfeb184dc7cb08af6c0bd529c48b9",
  units: "metric",
  lang: "kr",
};

//함수
function mapInit() {
  var options = {
    center: new kakao.maps.LatLng(37.55587, 126.97302),
    level: 13,
    // draggable:false,
    // zoomable:false,
    disableDoubleClick: true,
  };

  map = new kakao.maps.Map($("#map")[0], options);
  axios.get("./json/city.json").then(onGetCity);
}

function onGetCity(r) {
  console.log(r.data);
  cities = r.data.cities; // []
  cities.forEach(function (item) {
    params.lat = item.lat; // cities[i].lat
    params.log = item.lon;
    params.id = item.id;

    console.log(params);
    axios.get(weatherApi, {params}).then(onCreateMaker);
  });
}

function onCreateMaker(r) {
  console.log(r.data);
  cityCnt++;
  console.log(cityCnt);

  let city = cities.filter(function (v) {
    return v.id === r.data.id;
  });
  console.log(city);

  let content = `<div class="layer">
                <div><img src="http://openweathermap.org/img/wn/${r.data.weather[0].icon}.png"></div>
                ${city[0].name}
                <div>${r.data.main.temp}</div>
                </div>`;
  let position = new kakao.maps.LatLng(r.data.coord.lat, r.data.coord.lon);

  // 커스텀 오버레이를 생성합니다
  var customOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
  });
  // 커스텀 오버레이를 지도에 표시합니다
  customOverlay.setMap(map);
}

//실행
mapInit();
