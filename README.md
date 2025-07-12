# AJACKUS Company Assignment: Technical Reference Document

---

This document provides a structured approach and helpful tips for completing the "Employee Directory Web Interface" assignment. Remember, the goal is to showcase your understanding of front-end development principles using HTML, CSS, JavaScript, and Freemarker templates.

### Step 1: Dashboard Functionality (JavaScript)

1. **Displaying Employees:**
    - Your Freemarker template will initially render the list. Your JavaScript (`app.js`) will be responsible for *dynamically updating* this list when adding, editing, deleting, filtering, sorting, or searching.
    - Load your `mockEmployees` array into `app.js`.
2. **Delete Functionality:**
    - Add event listeners to the "Delete" buttons.
    - When a delete button is clicked:
        - Get the `employeeId` from the button's `data-id` attribute.
        - Remove the corresponding employee from your `mockEmployees` array.
        - Re-render the employee list in the DOM.
        - Implement graceful error handling (e.g., if no employee is selected, although in this case, the button is per employee).
3. **Basic "Edit" Navigation:**
    - Add event listeners to the "Edit" buttons.
    - When an edit button is clicked, you'll need to navigate to (or display) the Add/Edit Form page, pre-filling the form with the selected employee's data. You can achieve this by:
        - Hiding the dashboard and showing the form, passing the employee ID.
        - Using URL parameters (e.g., `?editId=123`) if you're simulating multiple "pages" with a single HTML file and JavaScript routing.

### Step 2: Add/Edit Form Page

1. **Create `add-edit-form.ftlh` (or integrate into `dashboard.ftlh`):**
    - Design an HTML form with fields: First Name, Last Name, Email, Department, Role.
    - Include a "Save" button and a "Cancel" button.
    - **Styling:** Apply CSS for a clean and user-friendly form.
2. **JavaScript for Form Handling (`app.js` or `form.js`):**
    - **Form Display:** Implement logic to show/hide the form.
    - **Pre-filling for Edit:** If an `employeeId` is passed (from the "Edit" button click), retrieve the employee data from `mockEmployees` and populate the form fields.
    - **Form Submission:** Add an event listener to the "Save" button (or form `submit` event).
        - Prevent default form submission (`event.preventDefault()`).
        - Read values from the form fields.
        - **Validation:**
            - Implement client-side JavaScript validation for:
                - Required fields (all fields).
                - Email format (regex for basic email validation).
            - Display clear error messages next to invalid fields.
        - **Data Update/Add:**
            - If validation passes:
                - **Edit:** If an `employeeId` was present, find the existing employee in `mockEmployees` and update its properties.
                - **Add:** If no `employeeId` was present, create a new employee object, assign a unique ID (e.g., `Date.now()`, or a simple incrementing counter), and add it to `mockEmployees`.
            - After updating/adding, re-render the employee list on the dashboard and clear/hide the form.
        - **Cancel Button:** Implement logic to clear the form and return to the dashboard.

### Step 3: Filter/Sort/Search Functionality

1. **HTML Elements:**
    - **Search Bar:** Add an `<input type="text" id="search-input">` at the top of your dashboard.
    - **Filter Popup/Sidebar:** Create a hidden `div` that will act as your filter panel. Include:
        - Input fields/dropdowns for First Name, Department, Role.
        - A "Apply Filter" button.
    - **Sort Controls:** Add dropdowns or buttons for sorting by First Name and Department.
2. **JavaScript Logic (`app.js` or `filters.js`):**
    - **Search:**
        - Add an `input` event listener to the search bar.
        - Filter `mockEmployees` based on name (first or last) or email.
        - Re-render the displayed employees based on the search results.
    - **Filter:**
        - Show/hide the filter popup/sidebar when a "Filter" button is clicked.
        - On "Apply Filter" click:
            - Read filter criteria from the form.
            - Apply multiple filters (e.g., if department and role are selected, filter by both).
            - Re-render the displayed employees.
    - **Sort:**
        - Add event listeners to sort controls.
        - Implement comparison functions for sorting by First Name and Department.
        - Sort `mockEmployees` accordingly.
        - Re-render the displayed employees.
    - **Combine:** Ensure that search, filter, and sort can work in conjunction. The order of operations might be: filter -\> search -\> sort, or whichever makes most sense for your UX.

### Step 4: Pagination or Infinite Scroll

Choose one and implement it. Pagination is generally simpler for this type of assignment.

1. **Pagination (Recommended for simplicity):**
    - **HTML Elements:**
        - Add a `div` for pagination controls (e.g., page numbers, "Previous", "Next" buttons, dropdown for items per page).
        - Dropdown for options: 10, 25, 50, 100 employees per page.
    - **JavaScript Logic:**
        - Maintain `currentPage` and `itemsPerPage` variables.
        - When `currentPage` or `itemsPerPage` changes:
            - Calculate the subset of `mockEmployees` to display for the current page.
            - Re-render only that subset.
            - Update pagination controls (active page, total pages).
        - Ensure pagination works correctly with filter, sort, and search. You'll apply filters/sorts first, then paginate the *filtered/sorted* results.
2. **Infinite Scroll (More complex, optional challenge):**
    - **JavaScript Logic:**
        - Monitor scroll events on the main content container or window.
        - When the user scrolls near the bottom:
            - Load the next "batch" of employees from `mockEmployees`.
            - Append them to the existing list in the DOM.
            - Implement a loading indicator to show new data is being fetched.
            - Handle cases where all data has been loaded.

### Step 5: Responsive Design (CSS)

1. **Media Queries:** Use CSS media queries to adjust layouts for different screen sizes (desktop, tablet, mobile).
    - `@media (max-width: 768px)` for tablets.
    - `@media (max-width: 480px)` for mobile.
2. **Flexible Layouts:**
    - Use Flexbox or CSS Grid for responsive layouts of employee cards.
    - Adjust font sizes, padding, and margins.
    - Consider stacking elements vertically on smaller screens.
    - Ensure navigation (if any) is mobile-friendly (e.g., hamburger menu).

### Step 6: Code Quality and Modularity

1. **CSS:**
    - Use BEM (Block Element Modifier) or a similar methodology for class naming to prevent conflicts and improve readability.
    - Organize your CSS into logical sections (e.g., `base.css`, `layout.css`, `components.css`).
2. **JavaScript:**
    - Organize your JavaScript into modules or objects (e.g., `EmployeeManager.js`, `UIController.js`).
    - Use functions for specific tasks.
    - Avoid global variables where possible.
    - Add comments to explain complex logic.
3. **HTML:**
    - Keep your HTML semantic and well-structured.
    - Use appropriate HTML5 tags.

### Step 7: Error Handling & Validations

- **Form Validation:** Ensure clear visual feedback for validation errors (e.g., red borders, error messages next to fields).
- **User Interactions:**
    - For deletion, a simple confirmation dialog (`confirm()`) is usually sufficient for a local application.
    - For editing, the assignment mentions "editing without saving." This implies if a user starts editing and then navigates away without saving, the changes are lost. Your form's "Cancel" button should facilitate this by just closing the form and not saving.
