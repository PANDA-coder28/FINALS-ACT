/* =====================================================
   HOW THIS FILE WORKS (read this first!)

   The "DOM" is just the web page as JavaScript sees it.
   JavaScript can do two things with it:

     1. SELECT an element   ->  "find that box on the page"
     2. MANIPULATE it       ->  "change it (text, color, etc.)"

   Selection methods used here:
     - getElementById         (find by id="...")
     - querySelector          (find ONE thing using a CSS-style selector)
     - querySelectorAll       (find MANY things using a CSS-style selector)
     - getElementsByTagName   (find all elements of one tag, like <h2>)

   Manipulation techniques used here:
     - textContent            (change the text of an element)
     - createElement          (make a brand new element)
     - style                  (change the CSS of an element)
     - classList              (add/remove a CSS class, like "hidden")
     - setAttribute           (change an attribute, like href)
   ===================================================== */

/* ---------- STEP 1: Find the elements we need ---------- */

// getElementById finds the element that has that id in the HTML.
// We save it in a variable so we can use it later.
const showBtn = document.getElementById("showBtn"); // the button
const card = document.getElementById("card"); // the output box
const error = document.getElementById("error"); // the red error message
const outList = document.getElementById("outList"); // the <ul> where info goes

/* ---------- STEP 2: A small helper to add one row to the card ---------- */

// This function makes one line like:  "Age: 20"
// We call it once for each piece of info, so we don't repeat code.
function addRow(label, value) {
  // createElement makes a new element (it doesn't show yet).
  const li = document.createElement("li"); // a list item
  const bold = document.createElement("strong"); // bold label text

  // textContent sets the text inside an element.
  bold.textContent = label;

  // appendChild puts one element inside another.
  li.appendChild(bold);

  // If the user left it blank, show a dash instead.
  if (value === "") {
    value = "—";
  }

  // Special case: make the email a clickable link.
  if (label === "Email" && value !== "—") {
    const link = document.createElement("a");
    link.setAttribute("href", "mailto:" + value); // setAttribute sets href="..."
    link.textContent = value;
    li.appendChild(link);
  } else {
    // createTextNode makes plain text we can put inside li.
    li.appendChild(document.createTextNode(value));
  }

  // Finally, put the finished row inside the list on the page.
  outList.appendChild(li);
}

/* ---------- STEP 3: Do this when the button is clicked ---------- */

// addEventListener means: "when this happens, run this function".
showBtn.addEventListener("click", function () {
  // ----- Read what the user typed -----
  // Every input has a .value that holds what's inside it.
  // .trim() removes extra spaces at the start and end.
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value;
  const birth = document.getElementById("birthdate").value;
  const phone = document.getElementById("phone").value.trim();
  const food = document.getElementById("food").value.trim();
  const course = document.getElementById("course").value;
  const color = document.getElementById("color").value;

  // querySelector finds ONE element. Here: the radio button that is checked.
  // For radio buttons we can't use one id, because there are 4 of them.
  const checkedYear = document.querySelector('input[name="year"]:checked');
  let year = ""; // start empty
  if (checkedYear !== null) {
    // null means "nothing is selected"
    year = checkedYear.value;
  }

  // querySelector again, this time using "#bio" (the # means id).
  const bio = document.querySelector("#bio").value.trim();

  // querySelectorAll finds ALL matching elements (a list of them).
  // Here: every hobby checkbox that is ticked.
  const checkedHobbies = document.querySelectorAll(
    'input[name="hobby"]:checked',
  );
  let hobbies = "";
  for (let i = 0; i < checkedHobbies.length; i++) {
    if (i > 0) {
      hobbies = hobbies + ", "; // add a comma between hobbies
    }
    hobbies = hobbies + checkedHobbies[i].value;
  }

  // ----- Check that the name is filled in -----
  if (name === "") {
    error.textContent = "Please enter your full name.";
    error.classList.remove("hidden"); // classList.remove -> show the message
    card.classList.add("hidden"); // classList.add    -> hide the card
    return; // stop here, don't continue
  }
  error.classList.add("hidden"); // name is fine, so hide the error

  // ----- Build the card -----
  document.getElementById("outName").textContent = name;

  outList.textContent = ""; // clear old results first

  addRow("Email", email);
  addRow("Age", age);
  addRow("Birthdate", birth);
  addRow("Phone", phone);
  addRow("Favorite Food", food);
  addRow("Course", course);
  addRow("Year Level", year);
  addRow("Favorite Color", color);
  addRow("Hobbies", hobbies);
  addRow("Bio", bio);

  // ----- Use the favorite color -----
  // .style changes CSS directly from JavaScript.
  card.style.borderTopColor = color;

  // getElementsByTagName returns a list of all <h2> tags inside the card.
  // [0] means "the first one".
  const headings = card.getElementsByTagName("h2");
  headings[0].style.color = color;

  // ----- Finally, show the card -----
  card.classList.remove("hidden");
});
