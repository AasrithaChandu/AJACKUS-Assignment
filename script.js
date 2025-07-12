let employees = [
  { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', department: 'HR', role: 'Manager' },
  { id: 2, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', department: 'IT', role: 'Developer' },
  { id: 3, firstName: 'Charlie', lastName: 'Lee', email: 'charlie@example.com', department: 'Finance', role: 'Analyst' }
];

function renderEmployees(data = employees) {
  const container = document.getElementById('employeeList');
  const notFound = document.getElementById('notFoundMessage');
  container.innerHTML = '';

  const count = parseInt(document.getElementById('showCount').value || 10);
  const shownData = data.slice(0, count);

  if (shownData.length === 0) {
    notFound.style.display = 'block';
  } else {
    notFound.style.display = 'none';
    shownData.forEach(emp => {
      const div = document.createElement('div');
      div.className = 'employee-card';
      div.innerHTML = `
        <strong>${emp.firstName} ${emp.lastName}</strong><br/>
        Email: ${emp.email}<br/>
        Department: ${emp.department}<br/>
        Role: ${emp.role}<br/>
        <button onclick="editEmployee(${emp.id})">Edit</button>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      `;
      container.appendChild(div);
    });
  }
}

function openFormModal() {
  document.getElementById('formModal').style.display = 'flex';
}

function closeFormModal() {
  document.getElementById('formModal').style.display = 'none';
  document.getElementById('employeeForm').reset();
}

document.getElementById('employeeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const newEmployee = {
    id: Date.now(),
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    department: document.getElementById('department').value,
    role: document.getElementById('role').value
  };
  employees.push(newEmployee);
  renderEmployees();
  closeFormModal();
});

function deleteEmployee(id) {
  if (confirm("Are you sure to delete this employee?")) {
    employees = employees.filter(e => e.id !== id);
    renderEmployees();
  }
}

function editEmployee(id) {
  alert("Edit feature not implemented in this version.");
}

document.getElementById('search').addEventListener('input', function(e) {
  const query = e.target.value.toLowerCase().trim();
  const filtered = employees.filter(emp =>
    (emp.firstName + ' ' + emp.lastName + ' ' + emp.email).toLowerCase().includes(query)
  );
  renderEmployees(filtered);
});

document.getElementById('sortSelect').addEventListener('change', function() {
  const val = this.value;
  if (val) {
    employees.sort((a, b) => a[val].localeCompare(b[val]));
    renderEmployees();
  }
});

document.getElementById('showCount').addEventListener('change', function () {
  renderEmployees();
});

renderEmployees();
