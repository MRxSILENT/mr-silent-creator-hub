const CHANNEL_ID="UCKQ_q75TKeAcYXYeu0uaWlQ"

const videosDiv=document.getElementById("videos")
const search=document.getElementById("search")

let videos=[]

fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`)

.then(res=>res.json())

.then(data=>{

videos=data.items

display(videos)

})


function display(list){

if(!videosDiv) return

videosDiv.innerHTML=""

list.forEach(video=>{

const videoId=video.link.split("v=")[1]

const div=document.createElement("div")

div.className="video"

div.innerHTML=`
<img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg">
<p>${video.title}</p>
`

div.onclick=()=>{
window.location=`watch.html?id=${videoId}`
}

videosDiv.appendChild(div)

})

}



if(search){

search.addEventListener("input",e=>{

const q=e.target.value.toLowerCase()

const filtered=videos.filter(v=>
v.title.toLowerCase().includes(q)
)

display(filtered)

})

}
