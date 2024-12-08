var productName = document.getElementById("productName");
var productWebsite = document.getElementById("productWebsite");
var row = document.getElementById("row");
var btn = document.getElementById("btn");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var searchName = document.getElementById("searchName");
var nameError = document.getElementById("nameError");
var webError = document.getElementById("webError");

var emptyError = document.getElementById("emptyError");
var lightbox = document.getElementById("light-box");

var close = document.querySelector(".close");

var globalIndex ;
var list ;

if(localStorage.getItem("list")){
    list = JSON.parse(localStorage.getItem("list"));
    display(list);
}else{
    list=[];
}

function add() {

    if(emptyName() === true){
        if(nameValidation() === true & webValidation() === true){
            var product = {
                name: productName.value,
                website: productWebsite.value,
            }
        
            list.push(product);
            display(list);
            saveToLocalStorage();
            // clear();
        }else{
            console.log("error");
            
        }
    }


}

function display(pList, term=0) {
    console.log(pList);

    if(pList.length > 0){
        var cartoona = "";
        for(var i =0 ; i <pList.length ; i++){
            cartoona += `<div class="btn w-75 d-flex  mx-auto">
            <div class="col-md-2 mt-1 text-center bg-white">
                <h5>${i+1}</h5>
            </div>
            <div class="col-md-2 mt-1 text-center bg-white">
                <h5>${term?pList[i].name.toLowerCase().replace(term, `<span class="text-danger fs-5 fw-bolder">${term}</span>`):pList[i].name}</h5>
            </div>
            <div class="col-md-2 mt-1 text-center bg-white">
                <button onclick="visit()" type="url" class="btn btn-success"> <i class="fa-solid fa-eye pe-2"></i> Visit</button>
            </div>
            <div class="col-md-2 mt-1 text-center bg-white">
                <button type="button" onclick=" Delete(${i})"  class="btn btn-danger"> <i class="fa-solid fa-trash-can"></i>  Delete</button>
            </div>
            <div class="col-md-2  mt-1 text-center bg-white">
                <button onclick="setFormToUpdate(${i})"  type="button" class="btn btn-warning">  Update</button>
            </div>
             </div>`
        }
    
        row.innerHTML = cartoona ;
    }else{
        row.innerHTML = `<div class ="alert alert-danger text-center mt-2"> Not Found</div>`
    }
    }
    
   

function Delete(index){
   list.splice(index , 1);
   display(list);
   saveToLocalStorage();

}

function clear(){
    productName.value = null;
    productWebsite.value = null;
}

function saveToLocalStorage(){
    localStorage.setItem("list" , JSON.stringify(list))
}


function setFormToUpdate(index){
    globalIndex = index ;
    productName.value = list[index].name ;
    productWebsite.value = list[index].website ;

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none")
}

function Update(){
    list[globalIndex].name = productName.value;
    list[globalIndex].website = productWebsite.value;

    display(list);
    saveToLocalStorage();

    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none")
}

function search(){

    var searchList =[];
    var term = searchName.value

    for(var i =0 ; i < list.length ;i++){
        if(list[i].name.toLowerCase().includes(term.toLowerCase())){
            searchList.push(list[i])
           
        }else{
            console.log("no match");
            
        }
        display(searchList, term)
    }
}

function nameValidation(){
    var regex = /^([A-Z]|[a-z]){3,}$/;
    if(regex.test(productName.value)){
        console.log("tmamm");
        productName.classList.add("is-valid")
        productName.classList.remove("is-invalid")
        lightbox.classList.replace("d-block" , "d-none");


        nameError.classList.replace("d-block","d-none");
        return true
    }else{
        console.log("mosh tamam");
      
        nameError.classList.replace("d-none","d-block");
        productName.classList.add("is-invalid")
        productName.classList.remove("is-valid")
        
        lightbox.classList.replace("d-block" , "d-none");

        return false
    }
}

function emptyName(){
    if(productName.value === ""){
        lightbox.classList.replace("d-none" , "d-block");
        nameError.classList.replace("d-block","d-none");

        return false ;
    }else{
        lightbox.classList.replace("d-block" , "d-none");
        nameError.classList.replace("d-none","d-block");

        return true ;

    }
}


close.addEventListener("click" , function(){
    closeSlide()
})

function closeSlide(){
    lightbox.classList.add( "d-none")
}


function webValidation(){
    var regx2 = /^[http]|[https]$/ ;
    if(regx2.test(productWebsite.value)){
        
        productWebsite.classList.add("is-valid")
        productWebsite.classList.remove("is-invalid")
        lightbox.classList.replace("d-block" , "d-none");


        webError.classList.replace("d-block","d-none");
        return true
    }else{
        
      
        webError.classList.replace("d-none","d-block");
        productWebsite.classList.add("is-invalid")
        productWebsite.classList.remove("is-valid")
        
        lightbox.classList.replace("d-block" , "d-none");

        return false
    }
}


function visit(){

}




