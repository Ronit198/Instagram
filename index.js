import { navbar } from "./components/navbar.js";

let navbar_div = document.getElementById("navbar")
navbar_div.innerHTML = navbar()
// console.log(navbar_div)


async function getdata(){
    let res = await fetch(`http://localhost:3000/posts`)
    let data = await res.json()
    appand(data)
}
getdata()


const appand= (data) =>{
    let div = document.getElementById("pic")
    data.forEach(function(el){
        let img_div = document.createElement("div")

        let img = document.createElement("img")
        let h4 = document.createElement("h2")
        img_div.id = "container"
        img.src = el.image_url
        img.id = "img"
        h4.innerText=el.caption

        img_div.append(img,h4)
        div.append(img_div)
    })

}

