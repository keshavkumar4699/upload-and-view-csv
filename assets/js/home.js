load_table();

//load all csv files from database
function load_table() {
  $.ajax({
    url: "/getcsvfiles",
    method: "GET",
    contentType: "application/json",
    data: '',
    success: function (res) {
      var html = "";
      if(res.csvfile.length > 0)
      {
        for(var count = 0; count < res.csvfile.length; count++)
        {
          html += `
          <tr scope="row">
            <td>`+res.csvfile[count].name+`</td>
            <td><button class="btn btn-success" onclick="view_csv(this)" data-id="`+res.csvfile[count]._id+`">View</button></td>
            <td><button class="btn btn-danger" onclick="delete_csv(this)" data-id="`+res.csvfile[count]._id+`">Delete</button></td>
          </tr>
          `;
        }
      }
      $('#upload-table tbody').html(html);
    },
  });
}

//add new csv file
$(`#getcsv`).on("submit", function (event) {
  event.preventDefault();
  var formdata = new FormData(this);
  $.ajax({
    type: "POST",
    url: "/upload-csv",
    data: formdata,
    processData: false,
    contentType: false,
    success: function (res) {
      html = `
        <tr scope="row">
          <td>`+res.response.name+`</td>
          <td><button class="btn btn-success" onclick="view_csv(this)" data-id="`+res.response.id+`">View</button></td>
          <td><button class="btn btn-danger" onclick="delete_csv(this)" data-id="`+res.response.id+`">Delete</button></td>
        </tr>
        `;
      $("#upload-table tbody").prepend(html);
      $("#csvfile").val("");
    },
    error: function(error){
      console.log("some error", error);
    }
  });
});

//for deleting csv files
function delete_csv(e) {
  let url = `/destroy?id=${e.getAttribute("data-id")}`;
  window.get(url);
  load_table();
}

//for viewing csv files
function view_csv(e){
  let url = `/csv/fetch_csv_data?id=${e.getAttribute("data-id")}`;
  window.get(url);
}

//redirect url function
window.get = function (url, data) {
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};