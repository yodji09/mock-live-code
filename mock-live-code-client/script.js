const baseUrl = "http://localhost:3000"

$(document).ready(function() {
    $('#login-form').submit((event)=>{
        event.preventDefault()
        $.ajax({
            type: "post",
            url: baseUrl + "/user/login",
            data: {
                email : $("#exampleInputEmail1").val(),
                password : $("#exampleInputPassword").val()
            }
        })
            .done(result => {
                localStorage.setItem("acces_token", result.acces_token)
                authorize()
            })
            .fail(err => {
                console.log(err)
            })
    })
})
function create(event){
    event.preventDefault()
    $.ajax({
        type: "post",
        url: baseUrl + "/food/create",
        headers : {
            token : localStorage.getItem("acces_token")
        },
        data: {
            title : $("#food-name").val(),
            price : $("#price").val(),
            ingredients : $("#ingredients").val(),
            tag : $("#tag").val()
        }
    })
        .done(result => {
            $("#list-food").empty()
            fetchFood()
        })
        .fail(err => {
            console.log(err)
        })
}
function authorize(){
    if(localStorage.getItem("acces_token")){
        $("#list-food").show()
        $("#createFood").show()
        $("#logout").show()
        fetchFood()
    } else {
        $("#list-food").hide()
        $("#createFood").hide()
        $("#logout").hide()
    }
}

function fetchFood(){
    $.ajax({
        type: "get",
        url: baseUrl + "/food",
        headers: {
            token : localStorage.getItem("acces_token")
        },
    })
        .done(result => {
            result.Foods.forEach(element => {
                $("#list-food").append(`
                    <div class="col-md-10">
                        <div class="card">
                        <div class="card-body pb-0">
                            <div class="d-flex justify-content-between mb-0">
                            <div class="col-9">
                                <h5 class="font-weight-bold" class="title-fetch">${element.title} </h5>
                                <p class = "price">Rp.${element.price}</p>
                            </div>
                            <div class="col-3 d-flex align-items-baseline">
                                <i class="fas fa-tag text-grey mr-2"></i>
                                <p class="text-grey" class="tag-fetch">${element.tag}</p>
                                <button class="fas fa-trash text-danger ml-auto cursor-pointer" onclick = "deleteFood(event, ${element.id})"></button>
                            </div>
                            </div>
                            <div class="card-body border-bottom" class="ingredients-fetch">
                            ${element.ingredients}
                            </div>
        
                        </div>
                        </div>
                    </div>
                
                    `)
                })          
            });
}

function deleteFood(event, value){
    event.preventDefault()
    const token = localStorage.getItem("acces_token")
    $.ajax({
        type: "delete",
        url: baseUrl + `/food/${value}`,
        headers: {
            token
        },
    })
        .done( result => {
            $("#list-food").empty()
            fetchFood()
        })
        .fail(err => {
            console.log(err)
        })
}

function logout(){
    localStorage.clear()
    authorize()
}