const url = "https://light-elk-neckerchief.cyclic.app/posts";
let postCount = 0;

async function getPost() {
    try {
        let res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('id_token')
            }
        })
        
        if (res.ok) {
            let results = await res.json();
            console.log(results.data);
            postCount = results.data.length;
            document.getElementById('count').innerHTML = `Your Posts: ${postCount}`;
            appendPosts(results.data);
        }
        else {
            // alert(await res.json().msg);
            console.log((await res.json()).msg);
        }
    } catch (error) {
        console.log('Error:',error);
        alert(error)
    }
}

getPost();

document.getElementById('cr_new').addEventListener('click', () => {
    //call form creation
    formCreation()
    //call create post function
})

function appendPosts(data) {
    document.getElementById('left').innerHTML = data.map(el => `<div id="post1">
                <p><span> <b>Title:</b> </span> ${el.title} </p>
                <p><span><b>Body:</b> </span> ${el.body}  </p>
                <p><span><b>Device:</b></span> by ${el.device}</p>
                <p data-id=${el._id}> <button class="up_btn">update</button> <button class="del_btn">delete</button></p>
            </div>`).join('')
    let update_buttons = document.querySelectorAll('.up_btn');

    update_buttons.forEach((el) => {
        el.addEventListener('click', (e) => {
            let postid = e.target.parentNode.dataset.id;
            console.log(postid);
            formCreation(postid);
            // create form on the right and add event listeners;
        })
    })

    let delete_buttons = document.querySelectorAll('.del_btn');
    delete_buttons.forEach((el) => {
        el.addEventListener('click', (e) => {
            let postid = e.target.parentNode.dataset.id;
            console.log(postid);
            //now call fetch function to delete giving url and id and token;
            deletePost(postid, e.target.parentNode);
        })
    })
}

//form creation of particular post id and events 
function formCreation(postid) {
    document.getElementById('right').innerHTML = `
        <form id="form" data-id=${postid}>
        <input type="text" id="title" placeholder="enter title" required> 
        <input type="text" id="body" placeholder="write body" required> 
        <input type="text" id="device" placeholder="enter device" required> 
        <input type="submit" value="submit">
        </form>`;

    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        // let postid = e.target.dataset.id;
        console.log(postid);
        let obj = {
            title: e.target.title.value,
            body: e.target.body.value,
            device: e.target.device.value
        }
        console.log(obj);
        if (postid) {
            updatePost(obj, postid)
        }
        else {
            createPost(obj);
        }
    })
}

async function updatePost(payload, postid) {
    let res = await fetch(url + `/update/${postid}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        },
        body: JSON.stringify(payload)
    })
    console.log(res);

}

async function createPost(payload) {
    let res = await fetch(url + `/create`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        },
        body: JSON.stringify(payload)
    })
    // console.log(res);
    if (res.ok) location.reload()
    else alert('something went wrong');
}

async function deletePost(postid, ele) {
    let res = await fetch(url + `/delete/${postid}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        }
    })
    // console.log(res);
    if (res.ok) {
        ele.parentNode.remove();
        document.getElementById('count').innerHTML = `Your Posts: ${--postCount}`;
    }
    else {
        alert('something went wrong');
    }
}
