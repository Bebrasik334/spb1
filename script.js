const map = L.map('map').setView([59.935, 30.335], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);


// ===== ИКОНКА =====
function createMarker(number){
    return L.divIcon({
        className:'marker',
        html:number,
        iconSize:[26,26],
        iconAnchor:[13,13]
    });
}


// ===== ТОЧКИ =====
const points = [
{coords:[59.9316,30.3565],name:"Улица Джона Леннона"},
{coords:[59.9376,30.3483],name:"Подписные издания"},
{coords:[59.9378,30.3478],name:"Памятник потерянной книге"},
{coords:[59.9384,30.3468],name:"Фонтанный дом Анны Ахматовой"},
{coords:[59.9415,30.3534],name:"Особняк Небылица"},
{coords:[59.9441,30.3463],name:"Мозаичный дворик"},
{coords:[59.9358,30.3299],name:"Sokol Coffee"},
{coords:[59.9340,30.3293],name:"Думская башня"},
{coords:[59.9389,30.3084],name:"Зеркальный дворик"}
];


// ===== МАРКЕРЫ =====
points.forEach((point,index)=>{

    const marker = L.marker(point.coords,{
        icon:createMarker(index+1)
    }).addTo(map);

    marker.bindPopup(`<b>${point.name}</b>`);

    // 👉 КАК БЫЛО РАНЬШЕ — ЯНДЕКС КАРТЫ
    marker.on("click", function(){

        const lat = point.coords[0];
        const lon = point.coords[1];

        const url = `https://yandex.ru/maps/?ll=${lon},${lat}&z=17`;

        window.open(url,"_blank");
    });

});


// ===== МАРШРУТ =====
const route = points.map(p=>p.coords);

L.polyline(route,{
    color:"#ef4444",
    weight:4
}).addTo(map);
