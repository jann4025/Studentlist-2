"use strict";
document.addEventListener("DOMContentLoaded", start);


function start() {


    console.log("Lets go");

    // Todo: Empty array for all students
    let students = [];

    // Todo: Filter varible
    let filter = "Alle";

    // Todo: Sort varible
    let sortby;

    // Todo: Create addEventListener to "sort by"-dropdown - calling function to sort json file
    document.querySelectorAll('#sort-by').forEach(option => {
        option.addEventListener("change", sortBy);
    });


    // Todo: Create addEventListener to "filter by"-dropdown - calling function to filter json file
    document.querySelectorAll('#filter-by').forEach(option => {
        option.addEventListener("change", filterBy);
    });









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
        console.log(students);




        // Todo: Empty .student-list
        document.querySelector(".student-list").innerHTML = "";

        // Todo: Create destination varibale
        let dest = document.querySelector(".student-list");

        // Todo: Create template varibale
        let temp = document.querySelector("template");

        // Todo: Create forEach function for each student
        students.forEach(student => {


            // Todo: Find first space in fullname
            const firstSpace = student.fullname.indexOf(" ");

            // Todo: Split student fullname - Create varibel for first name
            let firstname = student.fullname.substring(0, firstSpace);

            // Todo: Split student fullname - Create varibel for last name
            let lastname = student.fullname.substring(firstSpace + 1);

            // Todo: Add firstname as object to each student
            student.firstname = firstname;

            // Todo: Add lastname as object to each student
            student.lastname = lastname;

            // Todo: Add image as object to each student
            student.imagelink = firstname + ".jpg";


            console.log(firstname + " " + lastname);


            // Todo: If statement for filtering
            if (filter == student.house || filter == "Alle") {

                // Todo: Create clone varibale
                let klon = temp.cloneNode(!0).content;

                if (sortby == "Lastname") {
                    klon.querySelector(".student h1").innerHTML = student.lastname + ", " + student.firstname;
                } else {
                    // Todo: Fill .student h1 with student fullname
                    klon.querySelector(".student h1").innerHTML = student.firstname + " " + student.lastname;
                }
                // Todo: Fill .student h2 with student house
                klon.querySelector(".student h2").innerHTML = student.house;

                // Todo: House attribute
                klon.querySelector(".student").setAttribute("house", student.house)

                // Todo: Clone element from 
                dest.appendChild(klon);


            }

        });

        document.querySelectorAll(".student").forEach(student => {
            student.addEventListener("click", showModal);

        });

    }

    function showModal() {
        console.log("Show modal");
        let house = this.getAttribute("house");
        let houseLow = house.toLowerCase();
        console.log(house);


        document.querySelector(`.${houseLow}`).classList = `modal ${houseLow}`;
        document.querySelector(".overlay").classList = "overlay";
        document.querySelector(".student-list").classList = "student-list blur";
        document.querySelector("body>h1").classList = "blur";
        document.querySelector(".dropdowns").classList = "dropdowns blur";
        document.querySelector(".top img").classList = "blur";
        document.querySelector(`.${houseLow}`).addEventListener('click', function () {
            document.querySelector(`.${houseLow}`).classList = `modal ${houseLow} hide`;
            document.querySelector(".overlay").classList = "overlay hide";
            document.querySelector(".student-list").classList = "student-list";
            document.querySelector("body>h1").classList = ""
            document.querySelector(".dropdowns").classList = "dropdowns"
            document.querySelector(".top img").classList = "";
        });


    }





    function filterBy() {
        console.log('Filter json');

        // Todo: Change filter by-varible
        filter = this.value;

        // Todo: Call function to show studentlist again
        showStudents();
    }

    function sortBy() {
        console.log('Sort json');


        // Todo: Change filter by-varible
        sortby = this.value;

        console.log(sortby);

        // Todo: If statement to sort by selection
        // Todo: If firstname sort by firstname
        if (sortby == "Firstname") {
            console.log(sortby);

            // Todo: Function to sort by firstname
            students.sort(function (a, b) {
                return a.firstname.localeCompare(b.firstname);
            });

            // Todo: If lastname sort by lastname
        } else if (sortby == "Lastname") {
            console.log(sortby);

            // Todo: Function to sort by lastname
            students.sort(function (a, b) {
                return a.lastname.localeCompare(b.lastname);
            });



            // Todo: If house sort by house
        } else if (sortby == "House") {
            console.log(sortby);

            // Todo: Function to sort by house
            students.sort(function (a, b) {
                return a.house.localeCompare(b.house);
            });

            // Todo: Reset sorting
        } else if (sortby == "none") {
            // Todo: Call start function

            start();
        }
        // Todo: Call function to show studentlist again
        showStudents();

    }





}