/****************** 전역설정 *******************/
var map;
var cities;
var cityCnt = 0; // onCreateMarker에서 갯수를 센다.
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
var forcallUrl = "https://api.openweathermap.org/data/2.5/forecast";
var params = {
  appid: "4eedfeb184dc7cb08af6c0bd529c48b9",
  units: "metric",
  lang: "kr",
  exclude: "minutely,current",
};

moment.locale("ko");

const status = document.querySelector(".status");

if (!navigator.geolocation) {
  status.textContent = "브라우저가 지원안함.";
} else {
  status.textContent = "위치파악중1";
  navigator.geolocation.getCurrentPosition(onGetPosition, onGetPositionError);
}

//   navigator.geolocation.getCurrentPosition(
//     onGetPosition,
//     onGetPositionError
//   );
// mapInit();

function onGetPosition(r) {
  // alert("위침검색");
  getWeather(r.coords.latitude, r.coords.longitude);
}
function onGetPositionError(e) {
  getWeather(37.566679, 126.978413);
}

async function getWeather(param, param2) {
  params.id = "";
  params.lat = param;
  params.lon = param2;

  console.log(params);

  // $.get(weatherUrl, params, onGetWeather);
  // $.get(onecallUrl, params, onGetWeekly);

  await axios.get(weatherUrl, {params}).then(onGetWeather);
  await axios.get(forcallUrl, {params}).then(onGetWeekly);
}

function onGetWeather(r) {
  console.log(r);
  // updateDaily(r);
  // updateBg(r.weather[0].icon);
}
function onGetWeekly(r) {
  console.log(r);
  // updateDaily(r);
  // updateBg(r.weather[0].icon);
}

function mapInit() {
  var mapOption = {
    center: new kakao.maps.LatLng(35.8, 127.7),
    level: 13,
    // draggable: false,
    // zoomable: false,
    disableDoubleClick: true,
  };
  map = new kakao.maps.Map($("#map")[0], mapOption);
  //   map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);
  // map.setDraggable(false);
  // map.setZoomable(false);

  // $(window).resize(onResize);

  axios.get("./json/city.json").then(onGetCity);
}
mapInit();

function onGetCity(r) {
  console.log(r);
  //createMarker(r.cities);
  // 변경할 사항은 위의 createMarker를 실행하지 않고, openweathermap 통신으로 날씨정보를 받아오는게 완료되면 그때 그 정보로 marker를 만든다.
  cities = r.data.cities;
  for (var i in cities) {
    console.log(cities[i].id);
    params.lat = "";
    params.lon = "";
    params.id = cities[i].id;
    $.get(weatherUrl, params, onCreateMarker);
  }
}

function onCreateMarker(r) {
  /* for(var i in cities) {
          if(cities[i].id === r.id) {
              r.cityName = cities[i].name;
              break;
          }
      } */
  cityCnt++;
  var city = cities.filter(function (v) {
    return v.id === r.id;
  });
  console.log("도시" + city);
  var content = "";
  content +=
    '<div class="popper ' +
    city[0].class +
    '" onclick="getWeather(' +
    city[0].lat +
    ", " +
    city[0].lon +
    ');">';
  content += '<div class="img-wrap">';
  content +=
    '<img src="http://openweathermap.org/img/wn/' +
    r.weather[0].icon +
    '.png" class="mw-100">';
  content += "</div>";
  content += '<div class="cont-wrap">';
  content += '<div class="name">' + city[0].name + "</div>";
  content += '<div class="temp">' + r.main.temp + "˚</div>";
  content += "</div>";
  content += '<i class="fa fa-caret-down"></i>';
  content += "</div>";
  var position = new kakao.maps.LatLng(r.coord.lat, r.coord.lon);
  var customOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
  });
  customOverlay.setMap(map);
}
