const API_URL = "https://6adea7974e88f1bba4a53f94.mockapi.io/students";

let members = [];

const tableBody = document.getElementById("memberList");
const message = document.getElementById("message");

function showMessage(text, isError) {
  message.innerText = text;
  if (isError) {
    message.className = "error";
  } else {
    message.className = "success";
  }
}

const search = document.getElementById("search");

function render() {
  tableBody.innerHTML = "";

  // 검색어가 이름이나 학부에 포함된 회원만 보여주기
  const keyword = search.value.trim();
  const filtered = members.filter(function (m) {
    return m.name.includes(keyword) || m.major.includes(keyword);
  });

  if (filtered.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 7;
    td.innerText = "표시할 회원이 없습니다.";
    tr.appendChild(td);
    tableBody.appendChild(tr);
    return;
  }

  filtered.forEach(function (m) {
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
      addBtn.innerText = "수정 완료";
      cancelBtn.hidden = false;
      showMessage(m.name + " 회원 정보를 수정하는 중입니다.", false);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "삭제";
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener("click", function () {
      if (confirm(m.name + " 회원을 삭제하시겠어요?")) {
        if (editingId === m.id) {
          resetForm();
        }
        deleteMember(m.id);
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

search.addEventListener("input", function () {
  render();
});

async function getMembers() {
  showMessage("목록을 불러오는 중...", false);
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    members = await response.json();
    render();
    showMessage("", false);
  } catch (error) {
    console.log(error);
    showMessage("목록을 불러오지 못했습니다. (" + error.message + ")", true);
  }
}
getMembers();

async function deleteMember(id) {
  try {
    const response = await fetch(API_URL + "/" + id, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    await getMembers();
    showMessage("회원이 삭제되었습니다.", false);
  } catch (error) {
    console.log(error);
    showMessage("회원을 삭제하지 못했습니다. (" + error.message + ")", true);
  }
}

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
const cancelBtn = document.getElementById("cancelBtn");

function resetForm() {
  document.getElementById("memberForm").reset();
  editingId = null;
  addBtn.innerText = "저장";
  cancelBtn.hidden = true;
}

cancelBtn.addEventListener("click", function () {
  resetForm();
  showMessage("", false);
});

async function addMember(newMember) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMember),
    });
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    await getMembers();
    showMessage("회원이 추가되었습니다.", false);
    return true;
  } catch (error) {
    console.log(error);
    showMessage("회원을 추가하지 못했습니다. (" + error.message + ")", true);
    return false;
  }
}

async function editMember(id, memberData) {
  try {
    const response = await fetch(API_URL + "/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberData),
    });
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    await getMembers();
    showMessage("회원 정보가 수정되었습니다.", false);
    return true;
  } catch (error) {
    console.log(error);
    showMessage("회원 정보를 수정하지 못했습니다. (" + error.message + ")", true);
    return false;
  }
}

addBtn.addEventListener("click", async function () {
  if (!validate()) {
    return;
  }
  const memberData = {
    name: name.value.trim(),
    studentId: Number(studentId.value),
    gender: gender.value,
    major: major.value,
    email: email.value.trim(),
  };

  // 요청이 끝날 때까지 중복 클릭 방지
  addBtn.disabled = true;
  let success = false;
  if (editingId === null) {
    success = await addMember(memberData);
  } else {
    success = await editMember(editingId, memberData);
  }
  addBtn.disabled = false;

  if (success) {
    resetForm();
  }
});
