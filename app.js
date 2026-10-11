// ========== Firebase Config ==========
const firebaseConfig = {
  apiKey: "AIzaSyAZcabPgyDB5ffRdXU3QeuS1gYZFdVxNWI",
  authDomain: "hanhchinhtenlua.firebaseapp.com",
  databaseURL: "https://hanhchinhtenlua-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hanhchinhtenlua",
  storageBucket: "hanhchinhtenlua.firebasestorage.app",
  messagingSenderId: "237584773141",
  appId: "1:237584773141:web:4c0587abea4b2d20035e1c"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// ========== State ==========
let currentUser = null;
let tasks = [];
let currentFilter = "all";
let tasksRef = null;

// ========== DOM ==========
const loginScreen = document.getElementById("login-screen");
const appScreen = document.getElementById("app-screen");
const emailLoginForm = document.getElementById("email-login-form");
const btnGoogleLogin = document.getElementById("btn-google-login");
const btnLogout = document.getElementById("btn-logout");
const userEmailEl = document.getElementById("user-email");
const createTaskForm = document.getElementById("create-task-form");
const taskTitleInput = document.getElementById("task-title");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const tabs = document.querySelectorAll(".tab");
const countAll = document.getElementById("count-all");
const countActive = document.getElementById("count-active");
const countCompleted = document.getElementById("count-completed");
const toastEl = document.getElementById("toast");

// ========== Auth ==========
auth.onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    showApp();
    listenTasks();
  } else {
    currentUser = null;
    tasks = [];
    if (tasksRef) {
      tasksRef.off();
      tasksRef = null;
    }
    showLogin();
  }
});

emailLoginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const btn = document.getElementById("btn-email-login");

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang đăng nhập...';

  try {
    await auth.signInWithEmailAndPassword(email, password);
    showToast("Đăng nhập thành công!", "success");
  } catch (err) {
    console.error(err);
    let msg = "Đăng nhập thất bại.";
    if (err.code === "auth/user-not-found") msg = "Tài khoản không tồn tại.";
    else if (err.code === "auth/wrong-password") msg = "Sai mật khẩu.";
    else if (err.code === "auth/invalid-email") msg = "Email không hợp lệ.";
    else if (err.code === "auth/invalid-credential") msg = "Email hoặc mật khẩu không đúng.";
    else if (err.code === "auth/too-many-requests") msg = "Quá nhiều lần thử. Vui lòng đợi.";
    showToast(msg, "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Đăng nhập bằng Email';
  }
});

btnGoogleLogin.addEventListener("click", async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
    showToast("Đăng nhập Google thành công!", "success");
  } catch (err) {
    console.error(err);
    if (err.code !== "auth/popup-closed-by-user") {
      showToast("Đăng nhập Google thất bại.", "error");
    }
  }
});

btnLogout.addEventListener("click", async () => {
  try {
    await auth.signOut();
    showToast("Đã đăng xuất.", "success");
  } catch (err) {
    showToast("Lỗi đăng xuất.", "error");
  }
});

function showLogin() {
  loginScreen.classList.remove("hidden");
  appScreen.classList.add("hidden");
}

function showApp() {
  loginScreen.classList.add("hidden");
  appScreen.classList.remove("hidden");
  userEmailEl.textContent = currentUser.email || currentUser.displayName || "User";
}

// ========== Tasks (Realtime Database) ==========
function listenTasks() {
  if (tasksRef) tasksRef.off();
  tasksRef = db.ref(`todos/${currentUser.uid}`);
  tasksRef.on("value", (snapshot) => {
    const data = snapshot.val() || {};
    tasks = Object.keys(data).map((id) => ({
      id,
      ...data[id],
    }));
    // sort newest first
    tasks.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    renderTasks();
  });
}

createTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskTitleInput.value.trim();
  if (!title) return;

  try {
    await db.ref(`todos/${currentUser.uid}`).push({
      title,
      completed: false,
      createdAt: Date.now(),
    });
    taskTitleInput.value = "";
    showToast("Đã thêm công việc!", "success");
  } catch (err) {
    console.error(err);
    showToast("Không thể thêm công việc.", "error");
  }
});

async function toggleTask(id, completed) {
  try {
    await db.ref(`todos/${currentUser.uid}/${id}`).update({ completed: !completed });
  } catch (err) {
    showToast("Lỗi cập nhật.", "error");
  }
}

async function deleteTask(id) {
  if (!confirm("Xóa công việc này?")) return;
  try {
    await db.ref(`todos/${currentUser.uid}/${id}`).remove();
    showToast("Đã xóa.", "success");
  } catch (err) {
    showToast("Lỗi xóa.", "error");
  }
}

async function updateTaskTitle(id, newTitle) {
  const title = newTitle.trim();
  if (!title) return;
  try {
    await db.ref(`todos/${currentUser.uid}/${id}`).update({ title });
    showToast("Đã cập nhật!", "success");
  } catch (err) {
    showToast("Lỗi cập nhật.", "error");
  }
}

// ========== Filter ==========
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentFilter = tab.dataset.filter;
    renderTasks();
  });
});

// ========== Render ==========
function renderTasks() {
  let filtered = tasks;
  if (currentFilter === "active") filtered = tasks.filter((t) => !t.completed);
  else if (currentFilter === "completed") filtered = tasks.filter((t) => t.completed);

  countAll.textContent = tasks.length;
  countActive.textContent = tasks.filter((t) => !t.completed).length;
  countCompleted.textContent = tasks.filter((t) => t.completed).length;

  taskList.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.dataset.id = task.id;

    li.innerHTML = `
      <button class="task-check" title="Hoàn thành">
        <i class="fa-solid fa-check"></i>
      </button>
      <span class="task-text">${escapeHtml(task.title)}</span>
      <input class="edit-input" type="text" value="${escapeHtml(task.title)}" />
      <div class="task-actions">
        <button class="btn-edit" title="Sửa"><i class="fa-solid fa-pen"></i></button>
        <button class="btn-delete" title="Xóa"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    // Toggle complete
    li.querySelector(".task-check").addEventListener("click", () => {
      toggleTask(task.id, task.completed);
    });

    // Delete
    li.querySelector(".btn-delete").addEventListener("click", () => {
      deleteTask(task.id);
    });

    // Edit
    const editBtn = li.querySelector(".btn-edit");
    const editInput = li.querySelector(".edit-input");
    const textEl = li.querySelector(".task-text");

    editBtn.addEventListener("click", () => {
      if (li.classList.contains("editing")) {
        // save
        updateTaskTitle(task.id, editInput.value);
        li.classList.remove("editing");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
      } else {
        li.classList.add("editing");
        editInput.focus();
        editInput.select();
        editBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      }
    });

    editInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        updateTaskTitle(task.id, editInput.value);
        li.classList.remove("editing");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
      } else if (e.key === "Escape") {
        li.classList.remove("editing");
        editInput.value = task.title;
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
      }
    });

    taskList.appendChild(li);
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ========== Toast ==========
function showToast(message, type = "") {
  toastEl.textContent = message;
  toastEl.className = "toast show" + (type ? ` ${type}` : "");
  setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2800);
}
