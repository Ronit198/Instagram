import { navbar } from "./components/navbar.js";

let navbar_div = document.getElementById("navbar")
navbar_div.innerHTML = navbar()


let btn = document.getElementById("create")
btn.onclick = () => {
// submiting the post to the server
    createPost()
};

let inp_image = document.getElementById("image")


inp_image.onchange = ()=>{
// use to change image url and take the image from our local system
    changeImg()
}


let image_url;
const changeImg =async () =>{
    let image = document.getElementById("image")

    //accessing the image data;
    let actual_image = image.files[0]
    
    // sending the data to imgbb in formdata object
    let form = new FormData()
    form.append("image",actual_image)
    
    let res = await fetch(`https://api.imgbb.com/1/upload?key=fcb828133c353ee964c6f4d029c48f45`,{
    method:'POST',
    body:form,
    })
    let data = await res.json()
    image_url = data.data.display_url
    console.log(image_url)
}


// function to get the img_url from local images
const createPost =async () =>{
    let id  = document.getElementById("id").value
    let caption = document.getElementById("caption").value


// pack all data to be sent in object
    let sendthisData ={
        id,
        caption,
        image_url
    };

    let res = await fetch(`http://localhost:3000/posts`,{
        method:'POST',
        body:JSON.stringify(sendthisData),
        headers:{
            'Content-Type':'application/json'
        }
    }) 
    let data = await res.json()
    console.log(data)
}

const delete_btn = document.getElementById("delete")


// delete post
delete_btn.onclick = function(){
    deletePost()
}

const deletePost = async () => {
    let delete_id = document.getElementById("delete_id").value;

    let res = await fetch(`http://localhost:3000/posts/${delete_id}`,{
    method:'DELETE',
    headers:{
        'Content-Type':'application/json'
    }
    })

    let data = await res.json()
}

// Caption Update Function
let update_caption = document.getElementById("change_caption")

update_caption.onclick = function(){
    updatePost()
}

const updatePost =async () =>{
    let update_id = document.getElementById("update_id").value;
    let newCaption = document.getElementById("Update_caption").value;

    let sending_data = {
        caption:newCaption
    };
    let res = await fetch(`http://localhost:3000/posts/${update_id}`,{
        method:'PUT',
        body:JSON.stringify(sending_data),
        headers:{
            'Content-Type':'application/json'
        }
    });
    let data = await res.json()
    console.log(data)
}

