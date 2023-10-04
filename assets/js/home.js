function deleteCSV(e){
  let url =  `/destroy?id=${e.getAttribute('data-id')}`;
  window.get(url);
}

window.get = function(url, data) {
  return fetch(url, {method: "GET", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
}

