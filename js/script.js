const API_KEY="AIzaSyAJGq1CADFCPboHoNKo0fV8szdrie-_WnM"
const CHANNEL_ID="UCKQ_q75TKeAcYXYeu0uaWlQ"

const videosDiv=document.getElementById("videos")
const subs=document.getElementById("subs")

let videos=[]


// subscriber animation

if(subs){

fetch(
`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
)

.then(res=>res.json())

.then(data=>{

let count=parseInt(data.items[0].statistics.subscriberCount)

let i=0

let interval=setInterval(()=>{

subs.innerText=i

i+=Math.ceil(count/100)

if(i>=count){

subs.innerText=count
clearInterval(interval)

}

},20)

})

}


// load videos

if(videosDiv){

fetch(
`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
)

.then(res=>res.json())

.then(data=>{

videos=data.items

display(videos)

})

}



function display(list){

videosDiv.innerHTML=""

list.forEach(v=>{

if(v.id.videoId){

let div=document.createElement("div")

div.className="video"

div.innerHTML=`

<img src="https://img.youtube.com/vi/${v.id.videoId}/maxresdefault.jpg">

<p>${v.snippet.title}</p>

`

div.onclick=()=>{

window.location=`watch.html?id=${v.id.videoId}`

}

videosDiv.appendChild(div)

}

})

}



// search

const search=document.getElementById("search")

if(search){

search.addEventListener("input",e=>{

let q=e.target.value.toLowerCase()

let filtered=videos.filter(v=>
v.snippet.title.toLowerCase().includes(q)
)

display(filtered)

})

}
