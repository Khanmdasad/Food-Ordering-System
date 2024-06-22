document.addEventListener('DOMContentLoaded', () => {
    getMenu();
});

function getMenu() {
    fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
        .then(response => response.json())
        .then(data => {
            displayMenu(data);
        })
        .catch(error => console.error('Error fetching menu:', error));
}

function displayMenu(menuItems) {
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = '';
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
        `;
        menuContainer.appendChild(menuItem);
    });
}

document.getElementById('orderButton').addEventListener('click', () => {
    takeOrder()
        .then(order => orderPrep(order))
        .then(orderStatus => payOrder(orderStatus))
        .then(paymentStatus => thankyouFnc(paymentStatus))
        .catch(error => console.error('Error processing order:', error));
});

function takeOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const burgers = ["Cheeseburger", "Veggie Burger", "Chicken Burger", "Bacon Burger", "Fish Burger"];
            const order = {
                items: []
            };
            for (let i = 0; i < 3; i++) {
                const randomBurger = burgers[Math.floor(Math.random() * burgers.length)];
                order.items.push(randomBurger);
            }
            resolve(order);
        }, 2500);
    });
}

function orderPrep(order) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const orderStatus = {
                order_status: true,
                paid: false
            };
            resolve(orderStatus);
        }, 1500);
    });
}

function payOrder(orderStatus) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            orderStatus.paid = true;
            resolve(orderStatus);
        }, 1000);
    });
}

function thankyouFnc(paymentStatus) {
    if (paymentStatus.paid) {
        alert('Thank you for eating with us today!');
    }
}
