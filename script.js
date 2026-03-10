const API_KEY="AIzaSyAJGq1CADFCPboHoNKo0fV8szdrie-_WnM"
const CHANNEL_ID="UCKQ_q75TKeAcYXYeu0uaWlQ"

const videosDiv=document.getElementById("videos")
const trendingDiv=document.getElementById("trending")

const modal=document.getElementById("playerModal")
const player=document.getElementById("player")
const close=document.getElementById("close")

const subs=document.getElementById("subs")

let videos=[]


fetch(
`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
)

.then(res=>res.json())

.then(data=>{

subs.innerText=data.items[0].statistics.subscriberCount

})


fetch(
`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
)

.then(res=>res.json())

.then(data=>{

videos=data.items

display(videosDiv,videos)

display(trendingDiv,videos.slice(0,6))

})


function display(container,list){

container.innerHTML=""

list.forEach(v=>{

if(v.id.videoId){

let div=document.createElement("div")

div.className="video"

div.innerHTML=`

<img src="https://img.youtube.com/vi/${v.id.videoId}/maxresdefault.jpg">

<p>${v.snippet.title}</p>

`

div.onclick=()=>{

modal.style.display="flex"

player.src=
`https://www.youtube.com/embed/${v.id.videoId}?autoplay=1`

}

container.appendChild(div)

}

})

}


close.onclick=()=>{

modal.style.display="none"

player.src=""

}


document.getElementById("search")
.addEventListener("input",e=>{

let q=e.target.value.toLowerCase()

let filtered=videos.filter(v=>
v.snippet.title.toLowerCase().includes(q)
)

display(videosDiv,filtered)

})
