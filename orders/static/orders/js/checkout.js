document.addEventListener('DOMContentLoaded', () => {
  updateOrderSummary();
});

function updateOrderSummary(){
  document.querySelector("#ostable").innerHTML = "";
  var total = 0.0;
  for (var i = 0; i < localStorage.length; i++){
      var item = JSON.parse( localStorage.getItem(localStorage.key(i)) );
      total += item[0]*item[1];
      addItemToSummary( localStorage.key(i), item[0], item[1] );
  }
  document.getElementById("order_total").innerHTML = total.toFixed(2);
}
function addItemToSummary(itemName, unitPrice, quantity){
  var span_text = document.createTextNode("-");
  var button_deli = document.createElement('button');
  button_deli.appendChild(span_text);
  button_deli.value = unitPrice;
  button_deli.name = itemName;
  button_deli.onclick = deleteOrderItem;
  button_deli.classList.add("del_from_cart");
  var iname = document.createTextNode(`${quantity}: ${itemName}`);
  var iprice = document.createTextNode("$"+unitPrice.toFixed(2)+"/ea");
  var tr = document.createElement('TR');
  var tdr = document.createElement('TD');
  var tdl = document.createElement('TD');
  tdl.style.width = "90%";
  tdr.style.width = "10%";
  tdl.appendChild(iname);
  tdr.appendChild(iprice);
  // tr.appendChild(button_deli);
  tr.appendChild(tdl);
  tr.appendChild(tdr);
  document.querySelector("#ostable").appendChild(tr);
}

function deleteOrderItem(){
  var item = JSON.parse( localStorage.getItem(this.name) );
  item[1] -= 1;
  if(item[1]==0){
    localStorage.removeItem(this.name);
    this.parentElement.innerHTML = "";
  }
  else{
    localStorage.setItem(this.name, `[${item[0]}, ${item[1]}]`);
  }
  updateOrderSummary();
}

function submitOrder(){
  const request = new XMLHttpRequest();
  request.open('POST', '/ajaxres', true);
  const data = new FormData();

  for (var i = 0; i < localStorage.length; i++){
    var item = JSON.parse( localStorage.getItem(localStorage.key(i)) );
    data.append(localStorage.key(i), item[0].toString()+"|"+item[1].toString());
  }

  data.append("csrfmiddlewaretoken", token);
  request.send(data);


  request.onload = () => {
    // console.log(request.responseText);
      const data = JSON.parse(request.responseText);
      data.response.forEach(displayReceived);
  };

  return;
}
function displayReceived(dta_received){
  document.getElementById('order_number').innerHTML = dta_received;
  document.querySelector('#submit_order_button').style.display = "none";
  console.log(dta_received);
  checkOrderStatus(dta_received);
}

function checkOrderStatus(order_id){
  const request = new XMLHttpRequest();
  request.open('POST', '/orderStatus', true);
  const data = new FormData();
  data.append("order_id", order_id);
  data.append("csrfmiddlewaretoken", token);
  request.send(data);

  request.onload = () => {
    // console.log(request.responseText);
      const data = JSON.parse(request.responseText);
      if(data.response=="false"){
        document.getElementById('order_status').innerHTML = "Order in Progress!"
      }
      else{
        document.getElementById('order_status').innerHTML = "Order is Ready!!"
        document.getElementById('order_status').style.color = 'green';
        document.getElementById('order_status').style.fontSize = '1.6em';
      }
  };
  setTimeout(checkOrderStatus, 3000, order_id);
}
