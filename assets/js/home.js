load_table();

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
            <td><button class="btn btn-success">View</button></td>
            <td><button class="btn btn-danger" onclick="deleteCSV(this)" data-id="`+res.csvfile[count]._id+`">Delete</button></td>
          </tr>
          `;
        }
      }
      $('#upload-table tbody').html(html);
    },
  });
}

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
      console.log("result", res);
      html = `
        <tr scope="row">
          <td>`+res.response.name+`</td>
          <td><button class="btn btn-success">View</button></td>
          <td><button class="btn btn-danger" onclick="deleteCSV(this)" data-id="`+res.response.id+`">Delete</button></td>
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

function deleteCSV(e) {
  let url = `/destroy?id=${e.getAttribute("data-id")}`;
  window.get(url);
}

window.get = function (url, data) {
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
