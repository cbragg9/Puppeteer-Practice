$(function () {

  $(".btn").on("click", function() {
    console.log("Button submit");
    getRoute();
  })


  function getRoute() {
    $.get("/scrape").then(function(data) {
      console.log(data);
      renderHTML(data);
    })
  }

  function renderHTML(data) {
    for (let i = 0; i < data.length; i++) {
      let newListItem = `
      <li class="media">
        <img src="https://via.placeholder.com/64" class="mr-3" alt="...">
        <div class="media-body">
          <h5 class="mt-0 mb-1">${data[i].title}</h5>
          <p>${data[i].url}<p>
          <p>${data[i].date}<p>
        </div>
      </li>`

      $("#append").append(newListItem);
    }
  }

});


