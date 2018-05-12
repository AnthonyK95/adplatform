
// Creation of the Component Box Modal
function addcomponentmodal(){

    // Component Box
    var componentbox = document.createElement("div");
    componentbox.id = "addcomponentbox";
    componentbox.className = "modal";
    componentbox.style.display = "block";

    // Creating the Inside Content of the Add Component Page
    var componentbox_content = document.createElement("div");
    componentbox_content.className = "componentbox_content";

    // Creating the text field for the Component Serial Number
    var deviceID = document.createElement("INPUT");
    deviceID.setAttribute("type","text");
    deviceID.setAttribute("placeholder","Serial Number");
    deviceID.className = "text";

    // Creating the company choice field
    var companyID = document.createElement("INPUT");
    companyID.setAttribute("type","text");
    companyID.setAttribute("placeholder","Company");
    companyID.className = "text";

    // Creatign the br elements
    var Space1 = document.createElement("br");
    var Space2 = document.createElement("br");

    // Create Register Component Button
    var SignComponent = document.createElement("INPUT");
    SignComponent.className = "create";
    SignComponent.setAttribute("type","submit");
    SignComponent.setAttribute("value","Register Component");

     
 
     
    // Appending the Device Field 
    componentbox_content.appendChild(deviceID);
    componentbox_content.appendChild(Space1)
    
    // Appending the Company Id field
    componentbox_content.appendChild(companyID);
    // Appending the Br Space between the fields
    componentbox_content.appendChild(Space2);
    // Appending the Sign Component Button
    componentbox_content.appendChild(SignComponent);

    // Appending the components inside the Component Box
    componentbox.appendChild(componentbox_content);
    // Final appending of the box
    document.body.appendChild(componentbox);


    // Deleting the Component Box after Creation
    SignComponent.addEventListener('click',()=>{
        var IDDevice = deviceID.value;
        var IDCompany = companyID.value;
        console.log("Device"  + IDDevice);
        console.log("Company"  + IDCompany);
    });


    // Handling the Outside Click
    window.onclick = function(event) {
        if (event.target == componentbox) {
            componentbox.style.display = "none";
            componentbox.remove();
        }
    } 

    
}


// Opening the Add Device Section
var add_component = document.getElementById('add_component');
add_component.addEventListener('click',()=>{
    addcomponentmodal();
});

// Taking the value of the fields and run 
