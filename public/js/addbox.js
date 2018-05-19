
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


    //Creating the Form with the fields
    var form = document.createElement('form');
    form.setAttribute("method", "post");
    form.setAttribute("action", "/dashboard");

    // Creating the text field for the Component Serial Number
    var deviceID = document.createElement("INPUT");
    deviceID.setAttribute("type","text"); 
    deviceID.setAttribute("placeholder","Serial Number");
    deviceID.className = "text";
    deviceID.name = "deviceID";

    // Creating the company choice field
    var companyID = document.createElement("INPUT");
    companyID.setAttribute("type","text");
    companyID.setAttribute("placeholder","Company");
    companyID.className = "text";
    companyID.name = "companyID";

    // Creating the Device Type Choice field
    var deviceType = document.createElement("INPUT");
    deviceType.setAttribute("type","text");
    deviceType.setAttribute("placeholder","Device Type");
    deviceType.className = "text";
    deviceType.name = "deviceType";

    // Creating the br elements
    var Space1 = document.createElement("br");
    var Space2 = document.createElement("br");
    var Space3 = document.createElement("br");

    // Create Register Component Button
    var SignComponent = document.createElement("INPUT");
    SignComponent.className = "create";
    SignComponent.setAttribute("type","submit");
    SignComponent.setAttribute("formmethod","post");
    SignComponent.setAttribute("value","Register Component");

     
 
     
    // Appending the Device Form 
    componentbox_content.appendChild(form);
    // Appending->form to the DeviceID
    form.appendChild(deviceID);
    // Appending->form a space
    form.appendChild(Space1) 
    // Appending->form to the companyID
    form.appendChild(companyID);
    // Appending the Br Space between the fields
    form.appendChild(Space2);
    // Append->form the Device Type
    form.appendChild(deviceType);
    form.appendChild(Space3);

    // Appending the Sign Component Button
    componentbox_content.appendChild(SignComponent);
    // Appending the components inside the Component Box
    componentbox.appendChild(componentbox_content);
    // Final appending of the box
    document.body.appendChild(componentbox);


    // Active Listener of the Form->Button
    SignComponent.addEventListener('click',()=>{
        // Append and submit to the page
        form.submit();
        componentbox.remove();
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
 
