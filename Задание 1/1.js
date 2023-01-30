// XML-объект
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

// Парсинг XML
const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const studentList = [];

const list = xmlDOM.querySelector("list");
const students = list.querySelectorAll("student");

students.forEach((node) => {
  student = {};

  const first = node.querySelector("name").querySelector("first").textContent;
  const second = node.querySelector("name").querySelector("second").textContent;
  student.name = `${first} ${second}`;
  student.age = Number(node.querySelector("age").textContent);
  student.prof = node.querySelector("prof").textContent;
  student.lang = node.querySelector("name").getAttribute("lang");

  studentList.push(student);
});

const result = {};
result.list = studentList;
console.log(result);
