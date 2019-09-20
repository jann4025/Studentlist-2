"use strict";
document.addEventListener("DOMContentLoaded", start);

let expelledStudents = [];
let students = [];
let families = [];
let Allstudents = [];
let filteredList = [];
let hufflepuff;
let gryffindor;
let ravenclaw;
let slytherin;
let house = "All";
const Student = {
    firstname: "",
    middelname: "",
    lastname: "",
    bloodStatus: "",
    gender: "",
    house: "",
    imagelink: "",
    prefect: ""
}

document.querySelector(".expell-count").addEventListener("mouseover", function () {
    let div = document.querySelector('.dis-mes');
    let body = document.querySelector('body');
    let y = 0;
    let x = 0;
    body.addEventListener('mouseover', function (event) {
        x = div.style.left = event.clientX + "px";
        y = div.style.top = event.clientY + "px";

        console.log(event.clientX + "px");
    });
});




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

function start() {
    console.log("Lets go");
    getJson();
    getJsonFamilies();

}



// Todo: Eventlistener for each student

async function getJson() {
    // Todo: Fetch json data
    let jsonData = await fetch("http://petlatkea.dk/2019/hogwartsdata/students.json");
    // Todo: Convert to json file
    students = await jsonData.json();
    // Todo: Call Function to show student list
    fixArray(students);
}

async function getJsonFamilies() {
    // Todo: Fetch json data
    let jsonData = await fetch("http://petlatkea.dk/2019/hogwartsdata/families.json");
    // Todo: Convert to json file
    families = await jsonData.json();
    // Todo: Call Function to show student list
    console.log(families.half);
    let halfBlood = families.half;
    let pureBlood = families.pure;
    findPureBlood(pureBlood);
    findHalfBlood(halfBlood);

}

function fixArray(students) {
    // Source: https://www.w3hufflepuffource.com/javascript-exercises/javascript-math-exercise-23.php
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

            if (student.lastname == "Finch-fletchley") {
                console.log("Finch-fletchley");
                student.lastname = student.lastname.split("-");
                student.lastname = `${student.lastname[0].charAt(0).toUpperCase() + student.lastname[0].slice(1).toLowerCase()}-${student.lastname[1].charAt(0).toUpperCase() + student.lastname[1].slice(1).toLowerCase()}`;
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

        if (student.bloodStatus == "") {
            student.bloodStatus = "Muggle born"
        }
        student.prefect = "";
        Allstudents.push(student);


    });
    document.querySelector(".students-count").innerHTML = `Students: ${Allstudents.length}`;
    document.querySelector(".expell-count").innerHTML = `Expelled students: ${expelledStudents.length}`;
    filteredList = filterBy("All");
    countStudentsInHouse();
    showStudents();

}


function findHalfBlood(halfBlood) {
    console.log(halfBlood);
    let half;
    halfBlood.forEach(student => {
        half = student;
        Allstudents.forEach(student => {
            if (student.lastname == half) {
                student.bloodStatus = "Half-blood";
            }
        });
    });
}

function findPureBlood(pureBlood) {
    console.log(pureBlood);
    let pure;
    let index;
    pureBlood.forEach(student => {
        pure = student;
        console.log(index);
        Allstudents.forEach(student => {
            if (student.lastname == pure) {
                student.bloodStatus = "Pure-blood";
            }
        });
    });
}

function countStudentsInHouse() {
    hufflepuff = Allstudents.filter(x => x.house.includes('Hufflepuff'));
    gryffindor = Allstudents.filter(x => x.house.includes('Gryffindor'));
    ravenclaw = Allstudents.filter(x => x.house.includes('Ravenclaw'));
    slytherin = Allstudents.filter(x => x.house.includes('Slytherin'));
    document.querySelector(".hufflepuff-count").innerHTML = `Students in Hufflepuff: ${hufflepuff.length}`;
    document.querySelector(".gryffindor-count").innerHTML = `Students in Gryffindor: ${gryffindor.length}`;
    document.querySelector(".ravenclaw-count").innerHTML = `Students in Ravenclaw: ${ravenclaw.length}`;
    document.querySelector(".slytherin-count").innerHTML = `Students in Slytherin: ${slytherin.length}`;
}



function setFilter() {
    house = this.value;
    filteredList = filterBy(house);
    countStudentsInHouse();
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
    return listOfStudents;
}

function expelStudent(event) {
    countStudentsInHouse();
    document.querySelector(".expell-count").classList.remove("disable");
    const element = event.target;
    console.log("Remove button click");
    const id = element.dataset.id;
    const index = filteredList.findIndex(findFunction);

    function findFunction(student) {
        if (student.id == id) {
            return true;
        } else {
            return false;
        }
    }

    let RemovedStudent = filteredList.slice(index, index + 1);
    console.log(RemovedStudent);
    RemovedStudent.forEach(CreateExpelledList);
    element.parentElement.remove();
    filteredList.splice(index, 1);
    Allstudents.splice(index, 1);
    document.querySelector(".students-count").innerHTML = `Students: ${Allstudents.length}`;
    document.querySelector(".expell-count").innerHTML = `Expelled students: ${expelledStudents.length}`;
    countStudentsInHouse();
    console.log(Allstudents);

    function CreateExpelledList(student) {
        console.log(RemovedStudent);
        const studentExpell = {
            firstname: "",
            middelname: "",
            lastname: "",
            gender: "",
            house: "",
            imagelink: "",
            id: ""
        }
        const studentExpelled = Object.create(studentExpell);
        console.log(studentExpelled);
        studentExpelled.firstname = student.firstname;
        studentExpelled.middelname = student.middelname;
        studentExpelled.lastname = student.lastname;
        studentExpelled.gender = student.gender;
        studentExpelled.house = student.house;
        studentExpelled.imagelink = student.imagelink;
        studentExpelled.id = student.id;
        studentExpelled.bloodStatus = student.bloodStatus;
        console.log(studentExpelled);
        expelledStudents.push(studentExpelled);

    }
    document.querySelector('.expell-count').addEventListener('click', showExpelledList);

}

function showExpelledList() {
    document.querySelector(".expelled-list").innerHTML = `<h1 class="">Expelled students (${expelledStudents.length})</h1>`;
    console.table(expelledStudents);
    // Todo: Empty .student-list
    document.querySelector(".expelled-list").classList.remove("hide");
    document.querySelector('.expelled-list').addEventListener('click', function () {
        document.querySelector(".expelled-list").classList.add("hide");
        document.querySelector(".overlay").classList = "overlay hide";
        document.querySelector(".student-list").classList = "student-list";
        document.querySelector(".top h1").classList = "";
        document.querySelector("body").classList = "";
        document.querySelector(".students-count").classList.remove("blur");
        document.querySelector(".expell-count").classList.remove("blur");
        document.querySelector(".house-count").classList.remove("blur");
        document.querySelector(".dropdowns").classList = "dropdowns"
        document.querySelector(".top img").classList = "";
    });

    document.querySelector(".overlay").classList = "overlay";
    document.querySelector(".student-list").classList = "student-list blur";
    document.querySelector(".top h1").classList = "blur";
    document.querySelector(".students-count").classList.add("blur");
    document.querySelector(".expell-count").classList.add("blur");
    document.querySelector(".house-count").classList.add("blur");
    document.querySelector("body").classList = "back-drop-blur";
    document.querySelector(".dropdowns").classList = "dropdowns blur";
    document.querySelector(".top img").classList = "blur";

    expelledStudents.forEach(expelledStudent => {
        document.querySelector(".expelled-list").innerHTML +=
            `<div class="expelled-student">
                <img src="img/${expelledStudent.imagelink}" alt="">
                <div>
                    <h1>${expelledStudent.firstname + " " + expelledStudent.middelname + " " + expelledStudent.lastname}</h1>
                    <h2>${expelledStudent.house}</h2>
                    <p>${expelledStudent.gender} ${expelledStudent.bloodStatus} 
                    </p>
                </div>

            </div>
        
        `;

    });

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
        klon.querySelector(".btn-danger").dataset.id = student.id;
        klon.querySelector("button").dataset.id = student.id;

        // // Todo: Clone element from 
        dest.appendChild(klon);

    });
    document.querySelectorAll(".student .btn-read-more").forEach(studentBtn => {
        studentBtn.addEventListener("click", showModal);
    });
    document.querySelectorAll(".student .btn-danger").forEach(expellBtn => {
        expellBtn.addEventListener('click', expelStudent);
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
            document.querySelector(".prefect button").dataset.id = student.id;




            if (student.prefect == "Prefect") {
                document.querySelector(".prefect button").classList = "btn-danger";
                document.querySelector(".prefect button").textContent = "Remove student as prefect";
                document.querySelector(".prefect button").addEventListener("click", prefectFunc);
            } else {
                document.querySelector(".prefect button").addEventListener("click", prefectFunc);
                document.querySelector(".prefect button").classList = "btn-read-more";
                document.querySelector(".prefect button").textContent = "Make student prefect";
            }
            document.querySelector(".modal .bottom div p").innerHTML = `Gender: ${student.gender} <br> Blood status: ${student.bloodStatus} <br> ${student.prefect}`;

            document.querySelector(".modal .bottom img").src = `img/${student.imagelink}`;

            if (houses == "hufflepuff") {
                document.querySelector(".modal .image img").src = "http://jannickholm.dk/kea/3-semester/studentlist-2/houses/hufflepuff.png";
            } else if (houses == "ravenclaw") {
                document.querySelector(".modal .image img").src = "http://jannickholm.dk/kea/3-semester/studentlist-2/houses/ravenclaw.png";
            } else if (houses == "gryffindor") {
                document.querySelector(".modal .image img").src = "http://jannickholm.dk/kea/3-semester/studentlist-2/houses/gryffindor.png";
            } else if (houses == "slytherin") {
                document.querySelector(".modal .image img").src = "http://jannickholm.dk/kea/3-semester/studentlist-2/houses/slytherin.png ";
            }
            document.querySelector(".overlay").classList = "overlay";
            document.querySelector(".student-list").classList = "student-list blur";
            document.querySelector(".top h1").classList = "blur";
            document.querySelector("body").classList = "back-drop-blur";
            document.querySelector(".dropdowns").classList = "dropdowns blur";
            document.querySelector(".top img").classList = "blur";
            document.querySelector(".students-count").classList.add("blur");
            document.querySelector(".expell-count").classList.add("blur");
            document.querySelector(".house-count").classList.add("blur");

            document.querySelector(`.close-btn i`).addEventListener('click', function () {
                document.querySelector(`.modal`).classList = `modal hide`;
                document.querySelector(".overlay").classList = "overlay hide";
                document.querySelector(".student-list").classList = "student-list";
                document.querySelector(".top h1").classList = "";
                document.querySelector("body").classList = "";
                document.querySelector(".dropdowns").classList = "dropdowns"
                document.querySelector(".top img").classList = "";
                document.querySelector(".students-count").classList.remove("blur");
                document.querySelector(".expell-count").classList.remove("blur");
                document.querySelector(".house-count").classList.remove("blur");
            });
            if (student.house == "Hufflepuff") {
                checkPrefectsHufflepuff(student);
            } else if (student.house == "Gryffindor") {
                checkPrefectsGryffindor(student);
            } else if (student.house == "Ravenclaw") {
                checkPrefectsRavenclaw(student);
            } else if (student.house == "Slytherin") {
                checkPrefectsSlytherin(student);
            }

        }
    });
}




function prefectFunc() {
    const id = this.dataset.id;
    console.log(id);
    Allstudents.forEach(student => {
        if (student.id == id && student.prefect == "") {
            student.prefect = "Prefect";
            document.querySelector(".prefect button").classList = "btn-danger";
            document.querySelector(".prefect button").textContent = "Remove student as prefect";
            document.querySelector(".modal .bottom div p").innerHTML = `Gender: ${student.gender} <br> Blood status: ${student.bloodStatus} <br> ${student.prefect}`;
        } else if (student.id == id && student.prefect == "Prefect") {
            student.prefect = "";
            document.querySelector(".prefect button").classList = "btn-read-more";
            document.querySelector(".prefect button").textContent = "Make student prefect";
            document.querySelector(".modal .bottom div p").innerHTML = `Gender: ${student.gender} <br> Blood status: ${student.bloodStatus} <br> ${student.prefect}`;
        }
    });
}


function checkPrefectsHufflepuff(student) {
    console.log("hallo");
    let prefect = hufflepuff.filter(x => x.prefect.includes('Prefect'));
    console.log(prefect.length == 2);
    if (student.prefect == "" && prefect.length == 2) {
        console.log("stop");
        document.querySelector(".prefect button").removeEventListener("click", prefectFunc);
        document.querySelector(".prefect button").classList = "disable-2";
        document.querySelector(".prefect button").textContent = "Make student prefect";
        document.querySelector(".modal .bottom div p").innerHTML = `Gender: ${student.gender} <br> Blood status: ${student.bloodStatus} <br> ${student.prefect}`;
    }
}

function checkPrefectsGryffindor(student) {
    console.log("hallo");
    let prefect = gryffindor.filter(x => x.prefect.includes('Prefect'));
    console.log(prefect.length == 2);
    if (student.prefect == "" && prefect.length == 2) {
        console.log("stop");
        document.querySelector(".prefect button").removeEventListener("click", prefectFunc);
        document.querySelector(".prefect button").classList = "disable-2";
        document.querySelector(".prefect button").textContent = "Make student prefect";
        document.querySelector(".modal .bottom div p").innerHTML = `Gender: ${student.gender} <br> Blood status: ${student.bloodStatus} <br> ${student.prefect}`;
    }
}

function checkPrefectsRavenclaw(student) {
    console.log("hallo");
    let prefect = ravenclaw.filter(x => x.prefect.includes('Prefect'));
    console.log(prefect.length == 2);
    if (student.prefect == "" && prefect.length == 2) {
        console.log("stop");
        document.querySelector(".prefect button").removeEventListener("click", prefectFunc);
        document.querySelector(".prefect button").classList = "disable-2";
        document.querySelector(".prefect button").textContent = "Make student prefect";
        document.querySelector(".modal .bottom div p").innerHTML = `Gender: ${student.gender} <br> Blood status: ${student.bloodStatus} <br> ${student.prefect}`;
    }
}

function checkPrefectsSlytherin(student) {
    console.log("hallo");
    let prefect = slytherin.filter(x => x.prefect.includes('Prefect'));
    console.log(prefect.length == 2);
    if (student.prefect == "" && prefect.length == 2) {
        console.log("stop");
        document.querySelector(".prefect button").removeEventListener("click", prefectFunc);
        document.querySelector(".prefect button").classList = "disable-2";
        document.querySelector(".prefect button").textContent = "Dont even think about it";
        document.querySelector(".modal .bottom div p").innerHTML = `Gender: ${student.gender} <br> Blood status: ${student.bloodStatus} <br> ${student.prefect}`;
    }
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
        // Todo: hufflepuffet sorting
    } else if (sortby == "none") {
        // Todo: Call start function
        filteredList = filterBy(house);
    }
    // Todo: Call function to show studentlist again
    showStudents();

}