const API_KEY = "AIzaSyAJGq1CADFCPboHoNKo0fV8szdrie-_WnM"
const CHANNEL_ID = "UCKQ_q75TKeAcYXYeu0uaWlQ"

const videoContainer =
document.getElementById("videos")

const playlistContainer =
document.getElementById("playlists")

const subs =
document.getElementById("subs")

const views =
document.getElementById("views")

const search =
document.getElementById("search")

let videos=[]


// channel statistics

fetch(
`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
)

.then(res=>res.json())

.then(data=>{

let stats=data.items[0].statistics

subs.innerText="Subscribers: "+stats.subscriberCount
views.innerText="Views: "+stats.viewCount

})


// videos

fetch(
`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
)

.then(res=>res.json())

.then(data=>{

videos=data.items

displayVideos(videos)

})


function displayVideos(list){

videoContainer.innerHTML=""

list.forEach(v=>{

if(v.id.videoId){

let div=document.createElement("div")

div.className="video"

div.innerHTML=`

<iframe src="https://www.youtube.com/embed/${v.id.videoId}"></iframe>

<p>${v.snippet.title}</p>

`

videoContainer.appendChild(div)

}

})

}


// search system

search.addEventListener("input",()=>{

let text=search.value.toLowerCase()

let filtered=videos.filter(v=>
v.snippet.title.toLowerCase().includes(text)
)

displayVideos(filtered)

})


// playlists

fetch(
`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=10&key=${API_KEY}`
)

.then(res=>res.json())

.then(data=>{

data.items.forEach(p=>{

let div=document.createElement("div")

div.className="playlist"

div.innerHTML=`

<a href="https://youtube.com/playlist?list=${p.id}" target="_blank">

<img src="${p.snippet.thumbnails.medium.url}">

<p>${p.snippet.title}</p>

</a>

`

playlistContainer.appendChild(div)

})

})
