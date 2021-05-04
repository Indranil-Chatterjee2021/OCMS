function ConfirmEdit(){
  var Val = confirm("Do you want to UPDATE this record ?"); 
      if( Val == true ){ 
          var popupModal = document.getElementById("modalTwo");
              popupModal.style.display="block";
            // rendering table data to edit form....
              var table = document.getElementById("table"),rIndex;
                for(var i = 1; i < table.rows.length; i++)
                    {
                      table.rows[i].onclick = function()
                      {
                         rIndex = this.rowIndex;
                          document.getElementById("docID").value = this.cells[0].innerHTML;
                          document.getElementById("txtname").value = this.cells[1].innerHTML;
                          document.getElementById("txtphno").value = this.cells[2].innerHTML;
                          document.getElementById("txttmngs").value = this.cells[6].innerHTML;
                          document.getElementById("txtfee").value = this.cells[7].innerHTML;
                          document.getElementById("txtprsnt").value = this.cells[8].innerHTML;
                          document.getElementById("txtIsactive").value = this.cells[9].innerHTML;
                      };
                    }
            // End of statement...
          var closeBtns = [...document.querySelectorAll(".close")];
              closeBtns.forEach(function(btn){
                 btn.onclick = function() {
                 var modal = btn.closest('.modal');
                 modal.style.display = "none";
                }
              });
                
                window.onclick = function(event) {
                  if (event.target.className === "modal") {
                    event.target.style.display = "none";
                  }
                }
        return true; 
      } 
        else{ 
              return false; 
            } 
};

function ConfirmBook(){
  var Val = confirm("Do you want to book your appointment ?"); 
        if( Val == true ){ 
            var popupModal = document.getElementById("modalTwo");
                popupModal.style.display="block";
              // rendering table data to edit form....
                var table = document.getElementById("table"),rIndex;
                  for(var i = 1; i < table.rows.length; i++)
                      {
                        table.rows[i].onclick = function()
                        {
                           rIndex = this.rowIndex;
                           var avl=this.cells[7].innerHTML;
                           if(avl=="No")
                           { alert("Selected Doctor UnAvailable..!");
                             popupModal.style.display="none";
                           }else{
                            document.getElementById("DocId").value = this.cells[0].innerHTML;
                            document.getElementById("doctor").value = this.cells[1].innerHTML;
                           }
                        };
                      }
              // End of statement...
            var closeBtns = [...document.querySelectorAll(".close")];
                closeBtns.forEach(function(btn){
                   btn.onclick = function() {
                   var modal = btn.closest('.modal');
                   modal.style.display = "none";
                  }
                });
                  
                  window.onclick = function(event) {
                    if (event.target.className === "modal") {
                      event.target.style.display = "none";
                    }
                  }
          return true; 
        } 
          else{ 
                return false; 
              }
};

function ConfirmDel(DocID){ 
  var Val = confirm("Do you want to DELETE this record ?"); 
     if( Val == true ){ 
      window.location.href="deletedoctor/"+DocID; 
      return true; 
     } 
     else{ 
        return false; 
     } 
}; 

function onSubmit(){
  if( confirm("Do you want to Update your Profile ?") == false){
    document.getElementById('opwd').value = "";
    document.getElementById('npwd').value = "";
    return false;
  }else{
    return true;
  }
};
function oonSubmit(){
  if( confirm('Do you want to create new Admin ?') == false ){
    document.getElementById('add-admin').reset();
    return false;
  }else{
    return true;
  }
};
function PSubmit(){
  if( confirm("Do you want to Confirm Payment ?") == false){
    document.getElementById('txtamt').value = "";
    document.getElementById("modalTwo").style.display="none";
    return false;
  }else{
    return true;
  }
};

function ConfirmReceipt(){
  var Val = confirm("Do you want to Receive Payment ?"); 
      if( Val == true ){ 
          var popupModal = document.getElementById("modalTwo");
              popupModal.style.display="block";
            // rendering table data to edit form....
              var table = document.getElementById("table"),rrIndex;
                for(var i = 1; i < table.rows.length; i++)
                    {
                      table.rows[i].onclick = function()
                      {
                         rrIndex = this.rowIndex;
                         document.getElementById("APID").value = this.cells[0].innerHTML;
                         document.getElementById("txtname").value = this.cells[1].innerHTML;
                         document.getElementById("txtDocID").value = this.cells[3].innerHTML;
                         document.getElementById("txtdname").value = this.cells[5].innerHTML;
                         document.getElementById("txtdfee").value = this.cells[6].innerHTML;
                      };
                    }
            // End of statement...
          var closeBtns = [...document.querySelectorAll(".close")];
              closeBtns.forEach(function(btn){
                 btn.onclick = function() {
                 var modal = btn.closest('.modal');
                 modal.style.display = "none";
                }
              });
                
                window.onclick = function(event) {
                  if (event.target.className === "modal") {
                    event.target.style.display = "none";
                  }
                }
        return true; 
      } 
        else{ 
              return false; 
            } 
};

function ConfirmPayment(){
  var Val = confirm("Do you want to Procceed ?"); 
      if( Val == true ){ 
          var popupModal = document.getElementById("modalTwo");
              popupModal.style.display="block";
            // rendering table data to edit form....
              var table = document.getElementById("table"),rrIndex;
                for(var i = 1; i < table.rows.length; i++)
                    {
                      table.rows[i].onclick = function()
                      {
                         rrIndex = this.rowIndex;
                         document.getElementById("txtDocID").value = this.cells[0].innerHTML;
                         document.getElementById("txtname").value = this.cells[1].innerHTML;
                         document.getElementById("txtnptns").value = this.cells[3].innerHTML;
                      };
                    }
            // End of statement...
          var closeBtns = [...document.querySelectorAll(".close")];
              closeBtns.forEach(function(btn){
                 btn.onclick = function() {
                 var modal = btn.closest('.modal');
                 modal.style.display = "none";
                }
              });
                
                window.onclick = function(event) {
                  if (event.target.className === "modal") {
                    event.target.style.display = "none";
                  }
                }
        return true; 
      } 
        else{ 
              return false; 
            } 
};

function ConfirmReply(){
  var Val = confirm("Do you want to Proceed ?"); 
      if( Val == true ){ 
          var popupModal = document.getElementById("modalTwo");
              popupModal.style.display="block";
            // rendering table data to edit form....
              var table = document.getElementById("table"),rrIndex;
                for(var i = 1; i < table.rows.length; i++)
                    {
                      table.rows[i].onclick = function()
                      {
                         rrIndex = this.rowIndex;
                         document.getElementById("FID").value = this.cells[0].innerHTML;
                         document.getElementById("fname").value = this.cells[3].innerHTML;
                         document.getElementById("msg").value = this.cells[4].innerHTML;
                      };
                    }
            // End of statement...
          var closeBtns = [...document.querySelectorAll(".close")];
              closeBtns.forEach(function(btn){
                 btn.onclick = function() {
                 var modal = btn.closest('.modal');
                 modal.style.display = "none";
                }
              });
                
                window.onclick = function(event) {
                  if (event.target.className === "modal") {
                    event.target.style.display = "none";
                  }
                }
        return true; 
      } 
        else{ 
              return false; 
            } 
};

function RPreview(){
  var Val = confirm("Do you want to continue ?"); 
      if( Val == true ){ 
          var popupModal = document.getElementById("modalOne");
              popupModal.style.display="block";
            // rendering table data to edit form....
              var table = document.getElementById("Rtable"),rrIndex;
                for(var i = 1; i < table.rows.length; i++)
                    {
                      table.rows[i].onclick = function()
                      {
                         rrIndex = this.rowIndex;
                         document.getElementById("rno").innerHTML = this.cells[0].innerHTML;
                         document.getElementById("rdt").innerHTML = this.cells[1].innerHTML;
                         document.getElementById("fnm").innerHTML = this.cells[2].innerHTML;
                         document.getElementById("apid").innerHTML = this.cells[3].innerHTML;
                         document.getElementById("ramt").innerHTML = this.cells[4].innerHTML;
                      };
                    }
                    
            // End of statement...
          var closeBtns = [...document.querySelectorAll(".close")];
              closeBtns.forEach(function(btn){
                 btn.onclick = function() {
                 var modal = btn.closest('.modal');
                 modal.style.display = "none";
                }
              });
                
                window.onclick = function(event) {
                  if (event.target.className === "modal") {
                    event.target.style.display = "none";
                  }
                }
                       return true; 
             } 
        else{ 
              return false; 
            } 
};

function PrintDiv() {
  var divContents = document.getElementById("dvContents").innerHTML;
  var printWindow = window.open('', '', 'height=400,width=800');
  var printWindow;
  printWindow.document.write('<html><head><title>Receipt Print</title>');
  printWindow.document.write('</head><body >');
  printWindow.document.write(divContents);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  //printWindow.print();
  printWindow.onload = function () {
    printWindow.focus();
    setTimeout( function () {
        printWindow.print();
        printWindow.close();
    }, 100);  
}
}

