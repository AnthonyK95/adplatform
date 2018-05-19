
function takeaction(device){

    // Show in console that the file is running
    console.log(device);
    createtheContract(device);
   
}

function createtheContract(DeviceID){
     // Component Box
     var componentbox = document.createElement("div");
     componentbox.id = "addcomponentbox";
     componentbox.className = "modal";
     componentbox.style.display = "block";
 
     // Creating the Inside Content of the Add Component Page
     var componentbox_content = document.createElement("div");
     componentbox_content.className = "componentbox_content";
 
 
     //Creating the Form with the fields
     var form = document.createElement('form');
     form.setAttribute("method", "post");
     form.setAttribute("action", "/company");

     // Creating the text field for the Component Serial Number
    var deviceContract = document.createElement("INPUT");
    deviceContract.setAttribute("type","file"); 
    deviceContract.className = "text";
    deviceContract.style.marginTop = "90px";
    deviceContract.name = "deviceContract";

    // Creating the br elements
    var Space1 = document.createElement("br");

    // Create the Send Contract in Button
    var SignComponent = document.createElement("INPUT");
    SignComponent.className = "create";
    SignComponent.setAttribute("type","submit");
    SignComponent.setAttribute("formmethod","post");
    SignComponent.setAttribute("value","Send Contract");

    // Appending the Device Form 
    componentbox_content.appendChild(form);
    // Appending->form to the DeviceID
    form.appendChild(deviceContract);
    // Appending->form a space
    form.appendChild(Space1);

     // Appending the Sign Component Button
     componentbox_content.appendChild(SignComponent);
     // Appending the components inside the Component Box
     componentbox.appendChild(componentbox_content);
     // Final appending of the box
     document.body.appendChild(componentbox);


    // Adding event listener to the button
     SignComponent.addEventListener('click',()=>{
         form.submit();
         componentbox.remove();
     })

     window.onclick = (event) =>{
        if(event.target == componentbox) {
            componentbox.style.display = "none";
            componentbox.remove();
        }
     } 
}