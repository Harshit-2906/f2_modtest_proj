document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("employeeForm");
    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");
    const employeeList = document.getElementById("employeeList");
    let employees = [];

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const profession = document.getElementById("profession").value.trim();
        const age = document.getElementById("age").value.trim();

        if (!name || !profession || !age) {
            errorMessage.textContent = "All fields are required!";
            errorMessage.style.display = "block";
            successMessage.style.display = "none";
        } else {
            const newEmployee = {
                id: generateId(),
                name: name,
                profession: profession,
                age: parseInt(age)
            };
            employees.push(newEmployee);
            renderEmployees();
            successMessage.textContent = "Employee added successfully!";
            successMessage.style.display = "block";
            errorMessage.style.display = "none";
            form.reset();
        }
    });

    function generateId() {
        return employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
    }

    function renderEmployees() {
        employeeList.innerHTML = "";
        employees.forEach(function (employee) {
            const div = document.createElement("div");
            div.classList.add("employee-item");
            div.innerHTML = `
            <div>
                <strong>Name:</strong> ${employee.name}<br>
                <strong>Profession:</strong> ${employee.profession}<br>
                <strong>Age:</strong> ${employee.age}<br>
                <button class="deleteBtn" data-id="${employee.id}">Delete</button>
            </div>
            `;
            employeeList.append(div);
        });
    }

    employeeList.addEventListener("click", function (event) {
        if (event.target.classList.contains("deleteBtn")) {
            const id = parseInt(event.target.dataset.id);
            employees = employees.filter(employee => employee.id !== id);
            renderEmployees();
        }
    });
});



