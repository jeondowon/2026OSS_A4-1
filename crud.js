let members = [
  {
    id: 1,
    name: "홍길동",
    studentId: 20250001,
    gender: "남자",
    major: "AI컴퓨터전자",
    email: "gildong@example.com",
  },
  {
    id: 2,
    name: "김영희",
    studentId: 20250002,
    gender: "여자",
    major: "경영경제학부",
    email: "younghee@example.com",
  },
  {
    id: 3,
    name: "이철수",
    studentId: 20250003,
    gender: "남자",
    major: "생명과학부",
    email: "chulsoo@example.com",
  },
];

const tableBody = document.getElementById("memberList");

function render() {
  tableBody.innerHTML = "";
  members.forEach(function (m) {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.innerText = m.id;
    tr.appendChild(tdId);

    const tdName = document.createElement("td");
    tdName.innerText = m.name;
    tr.appendChild(tdName);

    const tdStudentId = document.createElement("td");
    tdStudentId.innerText = m.studentId;
    tr.appendChild(tdStudentId);

    const tdGender = document.createElement("td");
    tdGender.innerText = m.gender;
    tr.appendChild(tdGender);

    const tdMajor = document.createElement("td");
    tdMajor.innerText = m.major;
    tr.appendChild(tdMajor);

    const tdEmail = document.createElement("td");
    tdEmail.innerText = m.email;
    tr.appendChild(tdEmail);

    tableBody.appendChild(tr);

    const tdManage = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.innerText = "수정";
    editBtn.className = "editBtn";
    editBtn.addEventListener("click", function () {
      name.value = m.name;
      studentId.value = m.studentId;
      gender.value = m.gender;
      major.value = m.major;
      email.value = m.email;
      editingId = m.id;
      //console.log(editingId);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "삭제";
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener("click", function () {
      if (confirm("삭제하시겠어요?")) {
        members = members.filter(function (member) {
          if (member.id !== m.id) {
            return true;
          } else {
            return false;
          }
        });
        if (editingId === m.id) {
          editingId = null;
          document.getElementById("memberForm").reset();
        }
        render();
      }
    });

    const btnBox = document.createElement("div");
    btnBox.className = "manageBtns";
    btnBox.appendChild(editBtn);
    btnBox.appendChild(deleteBtn);
    tdManage.appendChild(btnBox);

    tr.appendChild(tdManage);
  });
}
render();

let nextId = 4;
let editingId = null;

const name = document.getElementById("name");
const studentId = document.getElementById("studentId");
const gender = document.getElementById("gender");
const major = document.getElementById("major");
const email = document.getElementById("email");

function validate() {
  if (name.value.trim() === "") {
    alert("이름을 입력하세요.");
    name.focus();
    return false;
  }
  if (!/^\d{8}$/.test(studentId.value)) {
    alert("학번이 8자리 숫자인지 확인하세요");
    studentId.focus();
    return false;
  }
  if (gender.value === "성별") {
    alert("성별을 선택하세요");
    gender.focus();
    return false;
  }
  if (major.value === "학부") {
    alert("학부를 선택하세요");
    major.focus();
    return false;
  }
  if (email.value.trim() === "" || !email.checkValidity()) {
    alert("이메일 형식을 확인해주세요.");
    email.focus();
    return false;
  }
  return true;
}

const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  if (!validate()) {
    return;
  }
  if (editingId === null) {
    const newMember = {
      id: nextId,
      name: name.value,
      studentId: Number(studentId.value),
      gender: gender.value,
      major: major.value,
      email: email.value,
    };
    members.push(newMember);
    nextId++;
  } else {
    const target = members.find(function (member) {
      return member.id === editingId;
    });
    target.name = name.value;
    target.studentId = Number(studentId.value);
    target.gender = gender.value;
    target.major = major.value;
    target.email = email.value;

    editingId = null;
  }

  render();
  document.getElementById("memberForm").reset();
});
