document.addEventListener("DOMContentLoaded", e => {
    document.documentElement.setAttribute("data-theme", "dark")
})

interface Service {
    id: number;
    name: string;
    price: number;
}

const themeSwitch = document.getElementById("theme-switch")

themeSwitch.onclick = () => {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    let switchToTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", switchToTheme);
}

const services = [{id: 1, name: "Wash Car", price: 10},
                {id: 2, name: "Mow Lawn", price: 20},
                {id: 3, name: "Pull Weeds", price: 30}]
const selectedServices = []
const selectedList = document.getElementById("selected-list")
const servicebtns = document.getElementById("services")
const price = document.getElementById("price")
const submit = document.getElementById("submit-invoice")

const removeOne = (id : string) => {
    const service = services.find(s => s.id === +id)
    selectedServices.splice(selectedServices.indexOf(+id),1)
    document.getElementById(id).remove()
    console.log(document.getElementById(id))
    price.textContent = (+price.textContent - service.price).toString()
}

//add event listener for selected items list, only for remove buttons (dynamically)
selectedList.addEventListener('click', function (e) {
    if ((e.target as HTMLElement).classList.contains('remove')) {
      removeOne((<HTMLElement>e.target).id)
    }
  });

const addService = (service : Service) => {
    let isPresent = selectedServices.includes(service.id);

    if(!isPresent){
        selectedServices.push(service.id)
        const li = document.createElement("li")
        li.classList.add("selected-service")
        li.id = service.id.toString()
        li.innerHTML = `<span class="item" id="${service.id}"><span>${service.name}</span>
        <span class="remove" id="${service.id}">remove</span></span>
        <span class="price"><span class="dollar">$</span>${service.price}</span>`

        selectedList.appendChild(li)
        price.textContent = (+price.textContent + service.price).toString()
    }
}

services.map((service : Service) => {
    const btn = document.createElement("button")
    btn.classList.add("service-btn")
    btn.textContent = service.name
    btn.addEventListener("click", () => addService(service))
    servicebtns.appendChild(btn)
})

const sendInvoice = () => {
    selectedServices.length = 0;
    selectedList.innerHTML = '';
    price.textContent = '0';
}

submit.addEventListener("click", sendInvoice)