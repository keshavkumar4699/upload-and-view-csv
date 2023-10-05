var id = localStorage.getItem("id");

load_table();

//load all csv files from database
function load_table() {
  $.ajax({
    url: `/csv/fetch_csv_data?id=${id}`,
    method: "GET",
    contentType: "application/json",
    data: "",
    success: function (res) {
      render_head(res.csvdata); //render head of table
      render_body(res.csvdata, 100); //render body of table from column 0
    },
  });
}

function render_head(data){
  var html = `<th scope="col">#</th>`;
  for(let key in data[0]){
    html+=`<th scope="col">${key}</th>`;
  }
  $("#upload-table thead tr").html(html);
}

function render_body(data, start){
  let end;
  if(data.length-start<100){
    end = data.length;
  } else {
    end = start + 100;
  }
  
  var html = "";
  for (var i = start; i < end; i++) {
    html+=
    `<tr scope="row">
    <td>${Number(i+1)}</td>`
    let obj = data[i];
    for(let key in obj){
      html+=`<td>${obj[key]}</td>`
    }
    html+=`</tr>`;
    $("#upload-table tbody").html(html);
  }
}
