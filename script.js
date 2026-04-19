// создание карты
const map = L.map('map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);


// кастомный маркер с номером
function createMarker(number){
    return L.divIcon({
        className:'marker',
        html:number,
        iconSize:[26,26],
        iconAnchor:[13,13]
    });
}


// точки маршрута
const points = [

{coords:[59.9316,30.3565],name:"Улица Джона Леннона"},
{coords:[59.9376,30.3483],name:"Подписные издания"},
{coords:[59.9378,30.3478],name:"Памятник потерянной книге"},
{coords:[59.9384,30.3468],name:"Фонтанный дом Анны Ахматовой"},
{coords:[59.9415,30.3534],name:"Особняк Небылица"},
{coords:[59.9441,30.3463],name:"Мозаичный дворик"},
{coords:[59.9358,30.3299],name:"Sokol Coffee"},

// исправленная Думская башня
{coords:[59.9340,30.3293],name:"Думская башня"},

{coords:[59.9389,30.3084],name:"Зеркальный дворик"}

];


// добавление маркеров
points.forEach((point,index)=>{

    const marker = L.marker(point.coords,{
        icon:createMarker(index+1)
    }).addTo(map);

    // всплывающее название
    marker.bindPopup(`<b>${point.name}</b>`);

    // переход в Яндекс.Карты
    marker.on("click", function(){

        const lat = point.coords[0];
        const lon = point.coords[1];

        // ссылка с меткой
        const url = `https://yandex.ru/maps/?pt=${lon},${lat},pm2rdm&z=17`;

        window.open(url,"_blank");
    });

});


// линия маршрута
const route = points.map(p=>p.coords);

const polyline = L.polyline(route,{
    color:"#ef4444",
    weight:4
}).addTo(map);


// авто-подгон карты под маршрут
map.flyToBounds(polyline.getBounds(),{
    padding:[50,50],
    duration:1.5
});
