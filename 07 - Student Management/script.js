// 1. Initial student data

let students = [
    {
        id: 1,
        name: "John",
        age: 22,
        scores: [80, 75, 90]
    },
    {
        id: 2,
        name: "Mary",
        age: 21,
        scores: [60, 55, 65]
    },
    {
        id: 3,
        name: "Peter",
        age: 23,
        scores: [35, 40, 30]
    }
];


// 2. Calculate student average

function calculateAverage(scores) {
    let total = scores.reduce((sum, score) => {
        return sum + score;
    }, 0);

    return total / scores.length;
}


// 3. Display students

function displayStudents(studentList = students) {

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    studentList.forEach(student => {

        let average = calculateAverage(student.scores);

        let status = average >= 50 ? "Passed" : "Failed";

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${average.toFixed(2)}</td>
            <td class="${status === "Passed" ? "pass" : "fail"}">
                ${status}
            </td>
            <td>
                <button class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });

    updateStatistics();
}


// 4. Update statistics

function updateStatistics() {

    const passed = students.filter(student => {
        return calculateAverage(student.scores) >= 50;
    });

    const failed = students.filter(student => {
        return calculateAverage(student.scores) < 50;
    });

    document.getElementById("totalStudents").textContent =
        students.length;

    document.getElementById("passedStudents").textContent =
        passed.length;

    document.getElementById("failedStudents").textContent =
        failed.length;
}


// 5. Add a new student

document.getElementById("studentForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();

    const age = Number(document.getElementById("studentAge").value);

    const score1 = Number(document.getElementById("score1").value);

    const score2 = Number(document.getElementById("score2").value);

    const score3 = Number(document.getElementById("score3").value);

    const scores = [score1, score2, score3];

    if (
        !name ||
        age <= 0 ||
        scores.some(score => score < 0 || score > 100)
    ) {
        alert("Please enter valid student information.");
        return;
    }

    const newStudent = {
        id: students.length > 0
            ? Math.max(...students.map(student => student.id)) + 1
            : 1,

        name: name,
        age: age,
        scores: scores
    };

    students.push(newStudent);

    displayStudents();

    document.getElementById("studentForm").reset();

});


// 6. Search for a student

document.getElementById("searchInput").addEventListener("input", function() {

    const searchValue = this.value.toLowerCase();

    const filteredStudents = students.filter(student => {
        return student.name.toLowerCase().includes(searchValue);
    });

    displayStudents(filteredStudents);

});


// 7. Delete a student

function deleteStudent(id) {

    students = students.filter(student => {
        return student.id !== id;
    });

    displayStudents();
}


// 8. Edit a student

function editStudent(id) {

    const student = students.find(student => {
        return student.id === id;
    });

    if (!student) return;

    const newName = prompt("Enter new student name:", student.name);

    if (newName === null) return;

    const newAge = prompt("Enter new age:", student.age);

    if (newAge === null) return;

    const updatedName = newName.trim();
    const updatedAge = Number(newAge);

    if (!updatedName || !Number.isInteger(updatedAge) || updatedAge <= 0) {
        alert("Please enter a valid name and age.");
        return;
    }

    student.name = updatedName;
    student.age = updatedAge;

    displayStudents();
}


// 9. Display students when page loads

displayStudents();