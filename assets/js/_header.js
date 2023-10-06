const search_fun = () => {
  let filter = document.getElementById("search_text").value.toUpperCase();
  let table = document.getElementById("upload-table");
  let tr = table.getElementsByTagName("tr");
  for (var i = 0; i < tr.length; i++) {
    let cols = tr[i].getElementsByTagName("td");
    for(var j=0; j< cols.length; j++){
      let td = tr[i].getElementsByTagName("td")[j];
      if(td){
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
