var id = localStorage.getItem("id");
var row_count = 0;
var is_total_set = false;
var row_total = 0;

//load table with 0th row
load_table(row_count);

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

//function to count total number of rows in table 
function set_total(length){
  row_total = length;
  is_total_set = true;
}

//function to render header of table
function render_head(data){
  var html = `<th scope="col">#</th>`;
  for(let key in data[0]){
    html+=`<th scope="col">${key}</th>`;
  }
  $("#upload-table thead tr").html(html);
}

//funtion to render body of table
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

//function to show left page of current page 
$(`#left-page`).click(function(event){
  row_count-=100;
  if(row_count<=0){
    event.preventDefault();
    row_count = 0;
    load_table(row_count);
  } else {
    load_table(row_count);
  }
});

//funtion to show right page of current page
$(`#right-page`).click(function(event){
  row_count+=100;
  if(row_count>=row_total){
    event.preventDefault();
    row_count-= 100;
    load_table(row_count);
  } else {
    load_table(row_count);
  }
});

//TODO: display data when sorting is implemented
function display_csv_data(data){
  $.ajax({
    url:`/csv/display_csv_data`,
    type: `POST`,
    data: {data: data},
    success: function(res){
      console.log(res);
    }
  })
}
