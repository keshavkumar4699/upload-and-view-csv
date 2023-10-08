var id = localStorage.getItem("id");
var row_count = 0;
var is_total_set = false;
var row_total = 0;
var csv_data;

//ajax call that renders data for the first time by fetching data from databse
$.ajax({
  url: `/csv/fetch_csv_data?id=${id}`,
  method: "GET",
  contentType: "application/json",
  data: "",
  success: function (data) {
    getResponse(data);
    if(!is_total_set){
      set_total(data.length); //set how many columns in table
    }
    render_head(data); //render head of table
    render_body(data, 0); //render body of table from column 0
  },
});

//this function will be called for everytime data is to be displayed so that we don't have to fetch data from database each time
function display_csv_data(data, row_start){
  render_head(data); //render head of table
  render_body(data, row_start); //render body of table from row_count
}

//function to access csv file returned from ajax request
function getResponse(response){
  const csvdata = response;
  csv_data = csvdata;
}

//function to count total number of rows in table 
function set_total(length){
  row_total = length;
  is_total_set = true;
}

//function to render header of table
function render_head(data){
  var html = ``;
  for(let key in data[0]){
    html+=
    `<th scope="col">${key}
    <a id="asc" href="" data-column="${key}"><i class="fa-solid fa-chevron-up"></i></a>
    <a id="desc" href="" data-column="${key}"><i class="fa-solid fa-chevron-down"></i></a>
    </th>`;
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
    `<tr scope="row">`
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
    display_csv_data(csv_data, row_count);
  } else {
    display_csv_data(csv_data, row_count);
  }
});

//funtion to show right page of current page
$(`#right-page`).click(function(event){
  row_count+=100;
  if(row_count>=row_total){
    event.preventDefault();
    row_count-= 100;
    display_csv_data(csv_data, row_count);
  } else {
    display_csv_data(csv_data, row_count);
  }
});

//function to sort in ascending order when ascending anchor tag is clicked
$(document).on('click', 'a#asc', function(event){
  event.preventDefault();
  var column = $(this).data('column');
  csv_data = csv_data.sort((a,b)=>a[column]>b[column]?1:-1);
  display_csv_data(csv_data, row_count);
});

//function to sort in descending order when descending anchor tag is clicked
$(document).on('click', 'a#desc', function(event){
  event.preventDefault();
  var column = $(this).data('column');
  csv_data = csv_data.sort((a,b)=>a[column]<b[column]?1:-1);
  display_csv_data(csv_data, row_count);
});