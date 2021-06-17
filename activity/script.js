let filterCodes = {
    "pink":"#fd79a8",
    "blue":"#3498db",
    "green":"#32ff7e",
    "black":"#34495e"
};
//default filter selected
let selectedFilter="black";
let allFilters = document.querySelectorAll(".ticket-filter div");
let ticketContainer = document.querySelector(".ticket-container");
// [ <div></div> ,<div></div> ,<div></div> ,<div></div>  ];
let openModalBtn=document.querySelector('.open-modal');
let closeModalBtn=document.querySelector('.close-modal');
// let ticketDeleteBtn=document.querySelector('')
function loadTickets(e){
  if(localStorage.getItem('allTickets')){
    ticketContainer.innerHTML="";
  let allTickets=JSON.parse(localStorage.getItem("allTickets"));
  for (let i = 0; i < allTickets.length; i++) {
    //object destructuring
  let {ticketId,ticketFilter,ticketContent}=allTickets[i];
  let ticketDiv=document.createElement('div');
  ticketDiv.classList.add("ticket");
  ticketDiv.innerHTML=`<div class="ticket-filter-inner ${ticketFilter}"></div>
  <div class="ticket-info">
  <div class="ticket-id">#${ticketId}</div>
  <div class="ticket-delete"><i class="fas fa-ban" id=${ticketId}></i></div></div>
  <div class="ticket-content">${ticketContent}</div>
 `;
 ticketDiv.querySelector(".ticket-filter-inner").addEventListener("click" , toggleTicketFilter);
 ticketDiv.querySelector(".ticket-delete i").addEventListener("click" , handleTicketDelete);
 //append tickets on ui
ticketContainer.append(ticketDiv);
}
  } }
  loadTickets();
openModalBtn.addEventListener('click',handleOpenModal);
closeModalBtn.addEventListener('click',handleCloseModal);
function handleCloseModal(e){
  if(document.querySelector('.modal')){
    document.querySelector('.modal').remove();
  }
}
function handleOpenModal(e){
  loadTickets();
  let modal=document.querySelector(".modal");
  //if modal already exists return
  if(modal){
    return;
  }
  //else create modaldiv
let modalDiv=createModal();
//to remove preexisting text
modalDiv.
querySelector('.modal-text').
addEventListener("click",clearModal);
//to add a ticket with enter with modal text
modalDiv.querySelector(".modal-text").addEventListener("keypress",addTicket);
//choosing modal filter
//get all filters
let allModalFilters=modalDiv.querySelectorAll(".modal-filter");
//add click event to all filters
for(let i=0;i<allModalFilters.length;i++){
  allModalFilters[i].addEventListener("click",chooseModalFilter);
}
//add modal div to ticket container 
ticketContainer.append(modalDiv);
}
function createModal(e){
  let modalDiv=document.createElement('div');
  modalDiv.classList.add("modal");
  modalDiv.innerHTML=`<div class="modal-text" data-typed="false" contenteditable="True">
  Enter your task here

</div>
<div class="modal-filter-options">
  <div class="modal-filter pink "></div>
  <div class="modal-filter blue "></div>
  <div class="modal-filter green"></div>
  <div class="modal-filter black active-filter"></div>

</div>`;
return modalDiv;
}
function chooseModalFilter(e){
 // get the filter name which is clicked
 let selectedModalFilter = e.target.classList[1];
 console.log(selectedModalFilter);

 // check if the clicked filter name is equals to the default filter(already selected filter) if true then go back 
 if (selectedModalFilter == selectedFilter) {
   return;
 }
 // set selected filter as the now choose filter 
 selectedFilter = selectedModalFilter;
 // remove active filter class
 document.querySelector(".modal-filter.active-filter").classList.remove("active-filter");
 // add active filter class on now selected filter 
 e.target.classList.add("active-filter");  
}
function addTicket(e){
  if(e.key=="Enter"){
  let modalText=e.target.textContent;
  let ticketId=uid();
  let ticketDiv=document.createElement('div');
  ticketDiv.classList.add("ticket");
  ticketDiv.innerHTML=`<div class="ticket-filter-inner ${selectedFilter}"></div>
  <div class="ticket-info">
  <div class="ticket-id">#${ticketId}</div>
  <div class="ticket-delete"><i class="fas fa-ban" id=${ticketId}></i></div></div>
  <div class="ticket-content">${modalText}</div>
 `;
 ticketDiv.querySelector(".ticket-filter-inner").addEventListener("click" , toggleTicketFilter);
 ticketDiv.querySelector(".ticket-delete i").addEventListener("click" , handleTicketDelete);
ticketContainer.append(ticketDiv);
e.target.parentNode.remove();

  // ticket has been appended on the document
    // false , null , undefined , 0 , "" , NaN
    if(!localStorage.getItem('allTickets')){
      // first time ticket aayegi
      let allTickets = [];

      let ticketObject = {};
      ticketObject.ticketId = ticketId;
      ticketObject.ticketFilter = selectedFilter;
      ticketObject.ticketContent = modalText;
      allTickets.push(ticketObject);

      localStorage.setItem("allTickets" , JSON.stringify(allTickets));
    }
    else{
      // already tickets hain
      let allTickets = JSON.parse(localStorage.getItem("allTickets"));
      let ticketObject = {};
      ticketObject.ticketId = ticketId;
      ticketObject.ticketFilter = selectedFilter;
      ticketObject.ticketContent = modalText;
      allTickets.push(ticketObject);

      localStorage.setItem("allTickets" , JSON.stringify(allTickets));
    }


//reset to default after adding a ticket
selectedFilter="black";}}

function loadSelectedTickets(ticketFilter){
if(localStorage.getItem('allTickets')){
  let allTickets=JSON.parse(localStorage.getItem('allTickets'));
  let filteredTickets=allTickets.filter(function(filterObject){
return filterObject.ticketFilter==ticketFilter;
  })
  ticketContainer.innerHTML = "";
  for(let i=0 ; i<filteredTickets.length ; i++){
    let {ticketId , ticketFilter , ticketContent} = filteredTickets[i];
    
    let ticketDiv=document.createElement('div');
    ticketDiv.classList.add("ticket");
    ticketDiv.innerHTML=`<div class="ticket-filter-inner ${ticketFilter}"></div>
    <div class="ticket-info">
    <div class="ticket-id">#${ticketId}</div>
    <div class="ticket-delete"><i class="fas fa-ban" id=${ticketId}></i></div></div>
    <div class="ticket-content">${ticketContent}</div>
   `;
   ticketDiv.querySelector(".ticket-delete i").addEventListener("click" , handleTicketDelete);
   ticketDiv.querySelector(".ticket-filter-inner").addEventListener("click" , toggleTicketFilter);
   //append tickets on ui
  ticketContainer.append(ticketDiv);
}

}
}


function clearModal(e){
  //if something has been typed return.
  if(e.target.getAttribute("data-typed")=="true"){
    return;

  }
  //change pretext to ""
  e.target.innerHTML="";
  //set typed attribute to true
  e.target.setAttribute("data-typed","true");
}
for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", chooseFilter);
}

function chooseFilter(e) {
  if(e.target.classList.contains("active-filter")){
    // if active filter already present !!
    e.target.classList.remove("active-filter");
    loadTickets();
    return;
  }
  //remove active filter from  already sleected filter 
  if(document.querySelector('.filter.active-filter')){
    document.querySelector('.filter.active-filter').classList.remove('active-filter');
  }

  e.target.classList.add('active-filter');
    
  let filter = e.target.classList[0];
loadSelectedTickets(filter);  
  // let filterCode = filterCodes[filter];
  // ticketContainer.style.background = filterCode;
 
}

function handleTicketDelete(e){
  let ticketToBeDeleted = e.target.id;
  let allTickets = JSON.parse(localStorage.getItem("allTickets"));
  let filteredTickets = allTickets.filter(function(ticketObject){
    return ticketObject.ticketId != ticketToBeDeleted;
  })
  localStorage.setItem("allTickets" , JSON.stringify(filteredTickets));
  loadTickets();

}

function toggleTicketFilter(e){
let filters=["pink","blue","green","black"];
let currentFilter=e.target.classList[1];
let idx = filters.indexOf(currentFilter);
  idx++;
  idx = idx%filters.length;

  let currentTicket = e.target;
  currentTicket.classList.remove(currentFilter);
  currentTicket.classList.add(filters[idx]);

  let allTickets = JSON.parse(localStorage.getItem("allTickets"));
  let id = currentTicket.nextElementSibling.children[0].textContent.split("#")[1];
  console.log(id);

  for(let i=0 ; i<allTickets.length ; i++){
    if(allTickets[i].ticketId == id){
      allTickets[i].ticketFilter = filters[idx];
      break;
    }
  }

  localStorage.setItem("allTickets" , JSON.stringify(allTickets));
}