"use strict";
document.addEventListener("DOMContentLoaded", start);


function start() {

    console.log("Lets go");

    // Todo: Empty array for all students
    let students = [];

    let Allstudents = [];

    let filteredList;

    let house;

    let expell = 0;

    const Student = {
        firstname: "",
        middelname: "",
        lastname: "",
        gender: "",
        house: "",
        imagelink: ""
    }



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

    document.querySelector('.student-list').addEventListener('click', expelStudent);
    // Todo: Eventlistener for each student

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
        // Source: https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
        function create_UUID() {
            var dt = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (dt + Math.random() * 16) % 16 | 0;
                dt = Math.floor(dt / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }
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
                student.id = create_UUID();
            } else if (jsonObject.fullname.length == 2) {
                student.firstname = jsonObject.fullname[0];
                student.firstname = student.firstname.charAt(0).toUpperCase() + student.firstname.slice(1).toLowerCase();
                student.lastname = jsonObject.fullname[1];
                student.lastname = student.lastname.charAt(0).toUpperCase() + student.lastname.slice(1).toLowerCase();
                student.gender = jsonObject.gender.charAt(0).toUpperCase() + jsonObject.gender.slice(1).toLowerCase();
                if (student.lastname == "Patil") {
                    student.imagelink = `${student.lastname.toLowerCase()}_${student.firstname.toLowerCase()}.png`;
                } else {
                    student.imagelink = `${student.lastname.toLowerCase()}_${student.firstname.substring(0,1).toLowerCase()}.png`;
                }
                student.id = create_UUID();
            } else if (jsonObject.fullname.length == 1) {
                student.firstname = jsonObject.fullname[0];
                student.firstname = student.firstname.charAt(0).toUpperCase() + student.firstname.slice(1).toLowerCase();
                student.lastname = "Unknown";
                student.lastname = student.lastname.charAt(0).toUpperCase() + student.lastname.slice(1).toLowerCase();
                student.gender = jsonObject.gender.charAt(0).toUpperCase() + jsonObject.gender.slice(1).toLowerCase();
                student.imagelink = `unknown.png`;
                student.id = create_UUID();
            }
            Allstudents.push(student);
        });
        document.querySelector(".students-count").innerHTML = `Students: ${Allstudents.length}`;
        document.querySelector(".expell-count").innerHTML = `Expelled students: ${expell}`;
        filteredList = filterBy("All");
        showStudents();

    }



    function setFilter() {
        house = this.value;
        filteredList = filterBy(house);
        showStudents();
    }

    function filterBy(house) {
        console.log(house);
        let listOfStudents = Allstudents.filter(filterByHouse);

        function filterByHouse(student) {
            if (student.house == house || house == "All") {
                return true;
            } else {
                return false;
            }
        }
        console.log(Allstudents);
        return listOfStudents;
    }

    function expelStudent(evnet) {
        const element = event.target;
        if (element.dataset.action == "remove") {
            console.log("Remove button click");
            element.parentElement.remove();
            const id = element.dataset.id;
            const index = filteredList.findIndex(findFunction);
            console.log(id);

            function findFunction(student) {
                if (student.id == id) {
                    return true;
                } else {
                    return false;
                }
            }
            filteredList.splice(index, 1);
            Allstudents.splice(index, 1);
            expell++;
            document.querySelector(".students-count").innerHTML = `Students: ${Allstudents.length}`;
            document.querySelector(".expell-count").innerHTML = `Expelled students: ${expell}`;
            console.table(filteredList);
            console.table(Allstudents);
        }
    }



    function showStudents() {
        // Todo: Empty .student-list
        document.querySelector(".student-list").innerHTML = "";
        // Todo: Create destination varibale
        let dest = document.querySelector(".student-list");
        // Todo: Create template varibale
        let temp = document.querySelector("template");

        // Todo: Create forEach function for each student
        filteredList.forEach(student => {
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


            klon.querySelector(".student img").src = `img/${student.imagelink}`;

            // // Todo: House attribute
            klon.querySelector(".btn-read-more").dataset.house = student.house.toLowerCase();
            klon.querySelector(".btn-read-more").dataset.id = student.id;
            klon.querySelector("button").dataset.id = student.id;

            // // Todo: Clone element from 
            dest.appendChild(klon);

        });
        document.querySelectorAll(".student .btn-read-more").forEach(studentBtn => {
            studentBtn.addEventListener("click", showModal);

        });
    }


    function showModal(event) {
        console.log("Show modal");
        let houses = event.target.dataset.house;
        let id = event.target.dataset.id;
        console.log(id);
        //Todo: Create varible for identifying house 
        //Todo: Show modal and blur everything else
        filteredList.forEach(student => {
            if (student.id == id) {
                document.querySelector(".modal").classList.remove("hide");
                document.querySelector(".modal").classList.add(houses);
                document.querySelector(".modal .bottom div h1").innerHTML = student.firstname + " " + student.lastname;
                document.querySelector(".modal .bottom div h2").innerHTML = student.house;
                document.querySelector(".modal .bottom img").src = `img/${student.imagelink}`;
                if (houses == "hufflepuff") {
                    document.querySelector(".modal .image img").src = "https://vignette.wikia.nocookie.net/harrypotter/images/0/06/Hufflepuff_ClearBG.png/revision/latest?cb=20161020182518";
                } else if (houses == "ravenclaw") {
                    document.querySelector(".modal .image img").src = "https://vignette.wikia.nocookie.net/harrypotter/images/4/4e/RavenclawCrest.png/revision/latest/scale-to-width-down/700?cb=20161020182442";
                } else if (houses == "gryffindor") {
                    document.querySelector(".modal .image img").src = "https://vignette.wikia.nocookie.net/harrypotter/images/b/b1/Gryffindor_ClearBG.png/revision/latest/scale-to-width-down/700?cb=20190222162949";
                } else if (houses == "slytherin") {
                    document.querySelector(".modal .image img").src = "https://vignette.wikia.nocookie.net/harrypotter/images/0/00/Slytherin_ClearBG.png/revision/latest/scale-to-width-down/700?cb=20161020182557";
                }
                document.querySelector(".overlay").classList = "overlay";
                document.querySelector(".student-list").classList = "student-list blur";
                document.querySelector(".top h1").classList = "blur";
                document.querySelector("body").classList = "back-drop-blur";
                document.querySelector(".dropdowns").classList = "dropdowns blur";
                document.querySelector(".top img").classList = "blur";

                document.querySelector(`.modal`).addEventListener('click', function () {
                    document.querySelector(`.modal`).classList = `modal hide`;
                    document.querySelector(".overlay").classList = "overlay hide";
                    document.querySelector(".student-list").classList = "student-list";
                    document.querySelector(".top h1").classList = "";
                    document.querySelector("body").classList = "";
                    document.querySelector(".dropdowns").classList = "dropdowns"
                    document.querySelector(".top img").classList = "";
                });
            }
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
            filteredList.sort(function (a, b) {
                return a.firstname.localeCompare(b.firstname);
            });
            // Todo: If lastname sort by lastname
        } else if (sortby == "Lastname") {
            console.log(sortby);
            // Todo: Function to sort by lastname
            filteredList.sort(function (a, b) {
                return a.lastname.localeCompare(b.lastname);
            });
            // Todo: If house sort by house
        } else if (sortby == "House") {
            console.log(sortby);
            // Todo: Function to sort by house
            filteredList.sort(function (a, b) {
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