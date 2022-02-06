var  cl = console.log;

const creatStudent = document.getElementById("creatStudent");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const tableBody = document.getElementById("tableBody");
const update = document.getElementById("update");
const submit = document.getElementById("submit");

update.style.display ="none"

let studInfoArry = [ ];

function OnSubmit (eve){
    cl("submit Event Trriger")
    eve.preventDefault()
    let stdObj = {
                    fname:fname.value,
                    lname:lname.value,
                    email:email.value,
                    contact:contact.value,
                    id:uuid(),
                }
    cl(stdObj)
    studInfoArry.push(stdObj);
    cl(studInfoArry)

    localStorage.setItem("setStudInfo",JSON.stringify(studInfoArry));
    studInfoArry = JSON.parse(localStorage.getItem("setStudInfo"))
    creatStudent.reset()                   // to reset form
    // this.reset();
    templating(studInfoArry)           // temp function call

}

if(localStorage.getItem("setStudInfo")){
    studInfoArry = getStdData()
        templating(studInfoArry)  
}

function getStdData(){
    if(localStorage.getItem("setStudInfo")){
       return JSON.parse(localStorage.getItem("setStudInfo"))
}
}

function onDeleteHandler(eve){
    let DeletId = eve.dataset.id;                        //getAttribute("data-id")
    cl(DeletId)
    localStorage.setItem("setId",DeletId);

    let getDeleData = getStdData()
    cl(getDeleData)
    let Deldata = getDeleData.filter(function(obj){
        return obj.id !== DeletId
    })
    localStorage.setItem("setStudInfo",JSON.stringify(Deldata))
    templating(Deldata);
    window.location.reload();
}


function onupdateClick(){
    let getId = localStorage.getItem("setId")
    cl(getId)
    let getLocalData = getStdData();
    cl(getLocalData)
    getLocalData.forEach(obj=>{
        if(obj.id === getId){
            obj.fname = fname.value
            obj.lname = lname.value
            obj.email = email.value
            obj.contact= contact.value
        }
    })
    cl(getLocalData);
    localStorage.setItem("setStudInfo",JSON.stringify(getLocalData))
    cl(getLocalData);
    creatStudent.reset();
    update.style.display ="none"
    submit.style.display = "block"
    templating(getLocalData);
}

//2
function onEditHandler(eve){
    cl(eve)
    cl(eve.getAttribute("data-id"))
    let getId = eve.getAttribute("data-id")
    cl(getId)
    localStorage.setItem("setId",getId)     //id send to local storage which stored in getId
    let getLocalData = getStdData()
    cl(getLocalData)

    let getObj = getLocalData.filter(eve=>{
        return eve.id === getId
    })
    cl(getObj)
    fname.value = getObj[0].fname;
    lname.value = getObj[0].lname;
    email.value = getObj[0].email;
    contact.value = getObj[0].contact;

    submit.style.display = "none"
    update.style.display ="inline-block"
}

function uuid() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function templating(arr){                      // Creat seprate function for templating
    result = ""
    arr.forEach((stud,i)=>{
        cl(stud)
    result+= `<tr>
                <td>${stud.fname}</td>
                <td>${stud.lname}</td>
                <td>${stud.email}</td>
                <td>${stud.contact}</td>
                <td><button class="btn btn-primary" data-id="${stud.id}" onclick="onEditHandler(this)">Edit</button></td>
                <td><button class="btn btn-danger" data-id="${stud.id}" onclick="onDeleteHandler(this)">Delete</button></td>
            </tr>`
})

     tableBody.innerHTML = result;
}

// events bind 

creatStudent.addEventListener("submit",OnSubmit);
update.addEventListener("click",onupdateClick)