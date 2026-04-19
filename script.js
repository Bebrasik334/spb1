const map = L.map('map').setView([59.935, 30.335], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);


function createMarker(number){
return L.divIcon({
className:'marker',
html:number,
iconSize:[26,26],
iconAnchor:[13,13]
});
}


const points = [

{
coords:[59.9316,30.3565],
name:"Улица Джона Леннона",
search:"Улица Джона Леннона Санкт-Петербург"
},

{
coords:[59.9376,30.3483],
name:"Подписные издания",
search:"Подписные издания Санкт-Петербург"
},

{
coords:[59.9378,30.3478],
name:"Памятник потерянной книге",
search:"Памятник потерянной книге Санкт-Петербург"
},

{
coords:[59.9384,30.3468],
name:"Фонтанный дом Анны Ахматовой",
search:"Фонтанный дом Анны Ахматовой"
},

{
coords:[59.9415,30.3534],
name:"Особняк Небылица",
search:"Особняк Небылица Санкт-Петербург"
},

{
coords:[59.9441,30.3463],
name:"Мозаичный дворик",
search:"Мозаичный дворик Санкт-Петербург"
},

{
coords:[59.9358,30.3299],
name:"Sokol Coffee",
search:"Sokol Coffee Санкт-Петербург"
},

{
coords:[59.9340,30.3293],
name:"Думская башня",
search:"Думская башня Санкт-Петербург"
},

{
coords:[59.9389,30.3084],
name:"Зеркальный дворик",
search:"Зеркальный дворик Санкт-Петербург"
}

];


points.forEach((point,index)=>{

const marker = L.marker(point.coords,{
icon:createMarker(index+1)
}).addTo(map);


marker.on("click",function(){

const url = "https://yandex.ru/maps/?text=" + encodeURIComponent(point.search);

window.open(url,"_blank");

});

});


const route = points.map(p=>p.coords);

L.polyline(route,{
color:"#ef4444",
weight:4
}).addTo(map);



fix markers
