"use strict";
document.addEventListener("DOMContentLoaded", start);


function start() {

    console.log("Lets go");

    // Todo: Empty array for all students
    let students = [];

    let Allstudents = [];

    let house;

    const Student = {
        firstname: "",
        middelname: "",
        lastname: "",
        gender: "",
        house: "",
        imagelink: ""
    }

    let Newlist;

    // Todo: Filter varible


    // Todo: Sort varible
    let sortby;

    // Todo: Create addEventListener to "sort by"-dropdown - calling function to sort json file
    document.querySelectorAll('#sort-by').forEach(option => {
        option.addEventListener("change", sortBy);
    });


    // Todo: Create addEventListener to "filter by"-dropdown - calling function to filter json file
    document.querySelectorAll('#filter-by').forEach(option => {
        option.addEventListener("change", setFilter);
    });


    async function getJson() {
        // Todo: Fetch json data
        let jsonData = await fetch("http://petlatkea.dk/2019/hogwartsdata/students.json");

        // Todo: Convert to json file
        students = await jsonData.json();


        // Todo: Call Function to show student list

        fixArray(students);

    }

    // Todo: Call getJson function to fetch json data
    getJson();

    function fixArray(students) {
        students.forEach(jsonObject => {
            const student = Object.create(Student);
            jsonObject.fullname = jsonObject.fullname.trim();
            jsonObject.house = jsonObject.house.trim();
            jsonObject.fullname = jsonObject.fullname.split(" ");
            student.house = jsonObject.house.charAt(0).toUpperCase() + jsonObject.house.slice(1).toLowerCase();
            if (jsonObject.fullname.length == 3) {
                student.firstname = jsonObject.fullname[0];
                student.firstname = student.firstname.charAt(0).toUpperCase() + student.firstname.slice(1).toLowerCase();
                student.middelname = jsonObject.fullname[1];
                student.middelname = student.middelname.charAt(0).toUpperCase() + student.middelname.slice(1).toLowerCase();
                student.lastname = jsonObject.fullname[2];
                student.lastname = student.lastname.charAt(0).toUpperCase() + student.lastname.slice(1).toLowerCase();
                student.gender = jsonObject.gender.charAt(0).toUpperCase() + jsonObject.gender.slice(1).toLowerCase();
                student.imagelink = `${student.lastname.toLowerCase()}_${student.firstname.substring(0,1).toLowerCase()}.png`;
            } else if (jsonObject.fullname.length == 2) {
                student.firstname = jsonObject.fullname[0];
                student.firstname = student.firstname.charAt(0).toUpperCase() + student.firstname.slice(1).toLowerCase();
                student.lastname = jsonObject.fullname[1];
                student.lastname = student.lastname.charAt(0).toUpperCase() + student.lastname.slice(1).toLowerCase();
                student.gender = jsonObject.gender.charAt(0).toUpperCase() + jsonObject.gender.slice(1).toLowerCase();
                student.imagelink = `${student.lastname.toLowerCase()}_${student.firstname.substring(0,1).toLowerCase()}.png`;
            } else if (jsonObject.fullname.length == 1) {
                student.firstname = jsonObject.fullname[0];
                student.firstname = student.firstname.charAt(0).toUpperCase() + student.firstname.slice(1).toLowerCase();
                student.lastname = "-Unknown-";
                student.lastname = student.lastname.charAt(0).toUpperCase() + student.lastname.slice(1).toLowerCase();
                student.gender = jsonObject.gender.charAt(0).toUpperCase() + jsonObject.gender.slice(1).toLowerCase();
                student.imagelink = `${student.lastname.toLowerCase()}_${student.firstname.substring(0,1).toLowerCase()}.png`;
            }
            Allstudents.push(student);

        });

        Newlist = filterBy("All");
        showStudents();

    }

    function setFilter() {
        house = this.value;
        Newlist = filterBy(house);
        showStudents();
    }

    function filterBy(house) {
        console.log(house);
        let filterlist = Allstudents.filter(filterByHouse);

        function filterByHouse(student) {
            if (student.house == house || house == "All") {
                return true;
            } else {
                return false;
            }
        }
        console.log(Allstudents);
        return filterlist;
    }



    function showStudents() {
        // Todo: Empty .student-list
        document.querySelector(".student-list").innerHTML = "";
        // Todo: Create destination varibale
        let dest = document.querySelector(".student-list");
        // Todo: Create template varibale
        let temp = document.querySelector("template");

        // Todo: Create forEach function for each student
        Newlist.forEach(student => {
            // // Todo: Create clone varibale
            let klon = temp.cloneNode(!0).content;

            if (student[5] == "lastname") {
                if (sortby == "Lastname") {
                    klon.querySelector(".student h1").innerHTML = student.lastname + ", " + student.firstname;
                } else {
                    // // Todo: Fill .student h1 with student fullname
                    klon.querySelector(".student h1").innerHTML = student.firstname + " " + student.lastname;
                }
            } else {
                if (sortby == "Lastname") {
                    klon.querySelector(".student h1").innerHTML = student.lastname + ", " + student.firstname + student.middelname;
                } else {
                    // // Todo: Fill .student h1 with student fullname
                    klon.querySelector(".student h1").innerHTML = student.firstname + " " + student.middelname + " " + student.lastname;
                }
            }
            // // Todo: Fill .student h2 with student house
            klon.querySelector(".student h2").innerHTML = student.house;

            // // Todo: House attribute
            klon.querySelector(".student").setAttribute("house", student.house.toLowerCase());

            // // Todo: Clone element from 
            dest.appendChild(klon);

        });

        // Todo: Eventlistener for each student
        document.querySelectorAll(".student").forEach(student => {
            student.addEventListener("click", showModal);

        });

    }


    function showModal() {
        console.log("Show modal");

        //Todo: Create varible for identifying house 
        let house = this.getAttribute("house");

        console.log(house);

        //Todo: Show modal and blur everything else
        document.querySelector(`.${house}`).classList = `modal ${house}`;
        document.querySelector(".overlay").classList = "overlay";
        document.querySelector(".student-list").classList = "student-list blur";
        document.querySelector("body>h1").classList = "blur";
        document.querySelector("body").classList = "back-drop-blur";
        document.querySelector(".dropdowns").classList = "dropdowns blur";
        document.querySelector(".top img").classList = "blur";
        document.querySelector(`.${house}`).addEventListener('click', function () {
            document.querySelector(`.${house}`).classList = `modal ${house} hide`;
            document.querySelector(".overlay").classList = "overlay hide";
            document.querySelector(".student-list").classList = "student-list";
            document.querySelector("body>h1").classList = "";
            document.querySelector("body").classList = "";
            document.querySelector(".dropdowns").classList = "dropdowns"
            document.querySelector(".top img").classList = "";
        });


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
            Newlist.sort(function (a, b) {
                return a.firstname.localeCompare(b.firstname);
            });
            // Todo: If lastname sort by lastname
        } else if (sortby == "Lastname") {
            console.log(sortby);
            // Todo: Function to sort by lastname
            Newlist.sort(function (a, b) {
                return a.lastname.localeCompare(b.lastname);
            });
            // Todo: If house sort by house
        } else if (sortby == "House") {
            console.log(sortby);
            // Todo: Function to sort by house
            Newlist.sort(function (a, b) {
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