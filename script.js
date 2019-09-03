document.addEventListener("DOMContentLoaded", start);


function start() {
    console.log("Start er kaldet");

    // Todo: Empty array for all students
    let students = [];

    // Todo: Split student fullname - Create varibel for first name

    // Todo: Split student fullname - Create varibel for last name

    // Todo: Filter varible


    // Todo: Create addEventListener to "sort by"-dropdown - calling function to sort json file

    // Todo: Create addEventListener to "filter by"-dropdown - calling function to filter json file

    // Todo: Create addEventListener for.Each student - calling function to show pop with clicked student


    async function getJson() {
        // Todo: Fetch json data
        let jsonData = await fetch("http://petlatkea.dk/2019/students1991.json");

        // Todo: Convert to json file
        students = await jsonData.json();

        // Todo: Call Function to show student list
        showStudents();
    }

    // Todo: Call getJson function to fetch json data
    getJson();

    function showStudents() {
        // Todo: Console.log to check that json file is loaded right
        console.log(students);

        // Todo: Empty .student-list
        document.querySelector(".student-list").innerHTML = "";

        // Todo: Create destination varibale
        let dest = document.querySelector(".student-list");

        // Todo: Create template varibale
        let temp = document.querySelector("template");

        // Todo: If statement for filtering

        // Todo: Create forEach function for each student
        students.forEach(student => {

            // Todo: Create clone varibale
            let klon = temp.cloneNode(!0).content;

            // Todo: Fill .student h1 with student fullname
            klon.querySelector(".student h1").innerHTML = student.fullname;

            // Todo: Fill .student h2 with student house
            klon.querySelector(".student h2").innerHTML = student.house;

            // Todo: Clone element from 
            dest.appendChild(klon);
        });
    }

    function sortJson() {
        console.log('Sort json');

        // Todo: Get attribute from selection in sort by-dropdown

        // Todo: If statement to sort by selection

        // Todo: If firstname sort by firstname

        // Todo: If lastname sort by lastname

        // Todo: Call function to show studentlist again

    }

    function sortJson() {
        console.log('Sort json');

        // Todo: Get attribute from selection in sort by-dropdown

        // Todo: Change filter by-varible

        // Todo: Call function to show studentlist again

    }




}