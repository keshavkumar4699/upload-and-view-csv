const search_fun = () => {
  //gets and convert each typed element in searchbox to uppercase
  let filter = document.getElementById("search_text").value.toUpperCase(); 
  //get table that is to be searched
  let table = document.getElementById("upload-table");
  //get every table row
  let tr = table.getElementsByTagName("tr");
  // loop throgh rows
  for (var i = 0; i < tr.length; i++) {
    // get table columns
    let cols = tr[i].getElementsByTagName("td");
    for(var j=0; j< cols.length; j++){
      let td = tr[i].getElementsByTagName("td")[j];
      //if table data cell exists
      if(td){
        //check earch table row for match to typed element if match found go to next row 
        let textvalue = td.textContent || td.innerHTML;
        if(textvalue.toUpperCase().indexOf(filter)>-1){
          tr[i].style.display = "";
          break;
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
};
