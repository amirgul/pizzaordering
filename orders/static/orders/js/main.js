document.addEventListener('DOMContentLoaded', () => {
  $('[data-toggle="tooltip"]').tooltip();
  let menu_ul = document.querySelector('#menu_container');
  // Get the <span> element that closes the modal
  var mcspan = document.querySelector("#close_modal");
  mcspan.onclick = function() {
    document.getElementById("myModal").style.display = "none";
  }
  if(message=="invalid_credentials"){
    document.getElementById("login_fail_msg").style.display = "block";
    showLoginModal();
  }
  else if (message=="from_logout") {
    localStorage.clear();
  }
  if(localStorage.length>0){
    console.log("lS length: ", localStorage.length);
    document.getElementById("checkout_button2").style.display = "block";
  }
});





function addToCart(btnCaller){
  var obj = JSON.parse(btnCaller.value);
  let price = obj.price;
  let lname = obj.longname;
  if( localStorage.getItem(lname)==null ){
    localStorage.setItem(lname, `[${price.toString()}, 1]`);
  }
  else{
    var item = JSON.parse( localStorage.getItem(lname) );
    item[1] += 1;
    localStorage.setItem(lname, `[${item[0]}, ${item[1]}]`);
  }
  updateOrderSummary();
}

function updateOrderSummary(){
  document.querySelector("#ostable").innerHTML = "";
  var total = 0.0;
  for (var i = 0; i < localStorage.length; i++){
      var item = JSON.parse( localStorage.getItem(localStorage.key(i)) );
      total += item[0]*item[1];
      addItemToSummary( localStorage.key(i), item[0], item[1] );
  }
  document.querySelector("#checkout_button2").style.display = "block";
  document.getElementById("order_total").innerHTML = total.toFixed(2);
  showOrderSummary();
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
  tr.appendChild(button_deli);
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

function showOrderSummary(){
  document.getElementById("myModal").style.display = "block";

}
function showLoginModal(){
  document.getElementById("myModal").style.display = "none";
  document.getElementById('login_modal').style.display='block';
}
function close_login_modal(){
  document.getElementById("myModal").style.display = "block";
  document.getElementById('login_modal').style.display='none';
}
