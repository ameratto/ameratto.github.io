window.onload = function () {
    fetch('https://api.jsonbin.io/v3/b/6576e9b71f5677401f0c4ba2')
        .then(response => response.json())
        .then(data => processData(data))
        .catch(error => console.error('Помилка завантаження JSON:', error));

    class Student {
        constructor(name, group, scholarship, grades) {
            this.name = name;
            this.group = group;
            this.scholarship = scholarship;
            this.grades = grades;
        }

        getAverageGrade() {
            const sum = this.grades.reduce((total, grade) => total + grade, 0);
            return sum / this.grades.length;
        }
    }

    function processData(data) {
        const students = data.record.students.map(studentData => new Student(
            studentData.name,
            studentData.group,
            studentData.scholarship,
            studentData.grades
        ));

        const scholarshipStudents = students.filter(student => student.scholarship);
        const nonScholarshipStudents = students.filter(student => !student.scholarship);

        displayResults(scholarshipStudents, nonScholarshipStudents);
    }

    function displayResults(scholarshipStudents, nonScholarshipStudents) {
        const outputDiv = document.getElementById('output');

        outputDiv.innerHTML = `<h2>Студенти із стипендією:</h2>`;
        outputDiv.innerHTML += generateStudentList(scholarshipStudents);

        outputDiv.innerHTML += `<h2>Студенти без стипендії:</h2>`;
        outputDiv.innerHTML += generateStudentList(nonScholarshipStudents);
    }

    function generateStudentList(students) {
        let listHTML = '<ul>';
        students.forEach(student => {
            listHTML += `<li>${student.name} (Група: ${student.group}, Середній бал: ${student.getAverageGrade().toFixed(2)})</li>`;
        });
        listHTML += '</ul>';
        return listHTML;
    }
};