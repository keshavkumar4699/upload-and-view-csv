var id = localStorage.getItem("id");
var col_count = 0;
var is_total_set = false;
var col_total = 0;

load_table(col_count);

//load all csv files from database
function load_table(start) {
  $.ajax({
    url: `/csv/fetch_csv_data?id=${id}`,
    method: "GET",
    contentType: "application/json",
    data: "",
    success: function (res) {
      if(!is_total_set){
        set_total(res.csvdata.length);
      }
      render_head(res.csvdata); //render head of table
      render_body(res.csvdata, start); //render body of table from column 0
    },
  });
}

function set_total(length){
  col_total = length;
  is_total_set = true;
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

$(`#left-page`).click(function(event){
  col_count-=100;
  if(col_count<=0){
    event.preventDefault();
    col_count = 0;
    load_table(col_count);
  } else {
    load_table(col_count);
  }
});

$(`#right-page`).click(function(event){
  col_count+=100;
  if(col_count>=col_total){
    event.preventDefault();
    col_count-= 100;
    load_table(col_count);
  } else {
    load_table(col_count);
  }
});
