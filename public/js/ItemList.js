function give(productid,productType){
    console.log(productid,productType);
    createtheContract(productid,productType);
}

function createtheContract(productid,productType){
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

      // Creating the br elements
      var Space1 = document.createElement("br");

      var h3 = document.createElement("h3");
      var inside_h1 = document.createTextNode("Device ID: "+productid);
      h3.name = "productid"
      h3.style.marginTop = "50px";
      h3.appendChild(inside_h1);

      var h4 = document.createElement("h3");
      var inside_h1 = document.createTextNode("Device Type: "+productType);
      h4.name = "productType";
      h4.appendChild(inside_h1);

      // Create the Send Contract in Button
      var SignComponent = document.createElement("INPUT");
      SignComponent.className = "create";
      SignComponent.setAttribute("type","submit");
      SignComponent.setAttribute("formmethod","post");
      SignComponent.setAttribute("value","Create & Send");



      // DeviceID->setting the value to post
      var deviceID = document.createElement("INPUT");
      deviceID.setAttribute("type","text");
      deviceID.className = "text";
      deviceID.name = "deviceID";
      deviceID.value = productid;
      deviceID.style.display = "none";



      // Device Type->setting the value to post
      var deviceType = document.createElement("INPUT");
      deviceType.setAttribute("type","text");
      deviceType.className = "text";
      deviceType.name = "deviceType";
      deviceType.value = productType;
      deviceType.style.display = "none";


      // Appending the Device Form
      componentbox_content.appendChild(form);
      form.appendChild(h3);
      form.appendChild(h4);
      form.appendChild(deviceID);
      form.appendChild(deviceType);
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
