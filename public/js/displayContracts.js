

function openContract(contract){
    var openingContract = contract;
        console.log(openingContract);
        contractModal(contract)
}
        function Contracts() {
           var x =  document.getElementById("contract-button").classList.toggle("show");
        }
        // Click outside
        window.onclick = function(event) {
          if (!event.target.matches('.dropbtn')) {
        
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
              }
            }
          }
        }

// Redirect with get method to /content route
function contractModal(contract){
    window.location = '/content/'+ contract ;
}

