let students = [
  {
    name: "nine",
    age: 18,
    grade: "A",
  },
  {
    name: "ok",
    age: 65,
    grade: "not ok",
  },
  {
    name: "ahkey",
    age: 40,
    grade: "not ok actually",
  },
];

students.push({
  name: "test",
  age: 3,
  grade: "NULL",
});

students.pop();

console.log(students);

for (let index = 0; index < students.length; index++) {
  console.log("Students no:", index + 1);
  console.log("name:", students[index].name);
  console.log("age:", students[index].age);
  console.log("grade:", students[index].grade);
  console.log("");
}

let nine = students.find((s) => {
  if (s.name == "nine") {
    return true;
  }
});

console.log("student:", nine);

let highestAge_student = students.filter((s) => {
  if (s.age >= 60) {
    return true;
  }
});

console.log("highestAge_student:", highestAge_student);
