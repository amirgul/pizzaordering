document.addEventListener('DOMContentLoaded', () => {
  setTimeout(refreshPage, 3000);
});
function refreshPage(){
  location.reload();
}

function markReady(evt){
  console.log(evt.value, evt.parentElement);
  $(evt.parentElement).fadeOut("slow");
  const request = new XMLHttpRequest();
  request.open('POST', '/markOrderReady', true);
  const data = new FormData();
  data.append("order_id", evt.value);
  data.append("csrfmiddlewaretoken", token);
  request.send(data);

  request.onload = () => {
    // console.log(request.responseText);
      const data = JSON.parse(request.responseText);
      console.log(data.response);
      // data.response.forEach(displayReceived);
  };


}
