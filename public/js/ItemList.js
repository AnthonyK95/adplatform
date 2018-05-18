
// connecting to the database and call the arguments
function takeaction(device){
   
    console.log(device);
    createmodal();
   
}
function createmodal(){
    // Create Component Box
    var componentbox = document.createElement("div");
    componentbox.id = "pop_contract";
    componentbox.style.display = "block";

    // Create the Inside Content of the Add Component Page
    var componentbox_content = document.createElement("div");
    componentbox_content.className = "pop_contract_content";
   

    // Creating the form handle
    var form = document.createElement("form");
    form.setAttribute("method","post");
    form.setAttribute("action","/company");

    // Creating the multi file Import Section
    var JsonUlpload = document.createElement("INPUT");
    JsonUlpload.setAttribute("type","file");
    JsonUlpload.className = "JsonUpload";

    // Posting the contract to the client
    var SignComponent = document.createElement("INPUT");
    SignComponent.className = "create";
    SignComponent.setAttribute("type","submit");
    SignComponent.setAttribute("formmethod","post");
    SignComponent.setAttribute("value","Send Contract");


    // Appending all the above files
    componentbox_content.appendChild(form);
    form.appendChild(JsonUlpload);
    componentbox_content.appendChild(SignComponent);
    componentbox.appendChild(componentbox_content);
    document.body.appendChild(componentbox);


    SignComponent.addEventListener("click",(err)=>{
        if(err){
            return next(err);
        }
        else{
            //Posting the data to the backbone
           form.submit(); 
           componentbox.remove();
        }
    })

    // Catching Outside The Box Click
    window.onclick = function(e){
        componentbox.style.display = "none";
        componentbox.remove();
    }
}
