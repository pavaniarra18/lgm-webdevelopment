const submitBtn = document.getElementById("submit");
const cardContainer = document.getElementById("cardContainer");

function initializeData() {
    if (localStorage.getItem("infoSection") === null) {
        localStorage.setItem("infoSection", "[]");
    }
}

function getData() {
    const infoItem = {
        student_name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        url: document.getElementById('url').value,
        website: document.getElementById('website').value,
        gender: document.querySelector('input[name="male-female"]:checked').value,
        skillArr: [...document.querySelectorAll('.checkbox:checked')].map(item => item.value)
    };

    const infoSection = JSON.parse(localStorage.getItem("infoSection"));
    infoSection.push(infoItem);
    localStorage.setItem("infoSection", JSON.stringify(infoSection));
}

function deleteData(index) {
    const infoSection = JSON.parse(localStorage.getItem("infoSection"));
    infoSection.splice(index, 1);
    localStorage.setItem("infoSection", JSON.stringify(infoSection));

    // Remove the deleted card from the DOM
    const cardToRemove = cardContainer.querySelector(`.card:nth-child(${index + 1})`);
    if (cardToRemove) {
        cardToRemove.remove();
    }
}

function showData() {
    cardContainer.innerHTML = ''; // Clear the container
    const infoSection = JSON.parse(localStorage.getItem("infoSection"));

    if (!infoSection || infoSection.length === 0) {
        console.log("No data to display");
        return;
    }

    infoSection.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src=${item.url} alt="Profile Picture">
            <div class="info">
                <p><strong>Name</strong> : ${item.student_name}</p>
                <p><strong>Email</strong> : ${item.email}</p>
                <p><strong>Website</strong> : <a href="${item.website}">Click here</a></p>
                <p><strong>Gender</strong> : ${item.gender}</p>
                <p><strong>Skills</strong> : ${item.skillArr.join(", ")}</p>
                <button onclick="deleteData(${index})">Delete</button>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

// Initialize data and display it on page load
initializeData();
showData();

submitBtn.addEventListener('click', () => {
    getData();
    showData();
});
