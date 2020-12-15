const tagsEl = document.getElementById("tags");
const textarea = document.getElementById("textarea");

// Puts the users onto to the textarea straight away
textarea.focus();

//  triggers the even whenever the user lifts their finger off the key
textarea.addEventListener("keyup", (e) => {
  // event target returns the textarea or part before the event listener
  // .value returns the value
  createTags(e.target.value);

  //   We look for the enter key to start the random selection function
  if (e.key === "Enter") {
    //   setTimeout runs a function for a set time period
    setTimeout(() => {
      // make our text area blank first
      e.target.value = "";
    }, 10);

    // call random select
    randomSelect();
  }
});

// input is an arbitary argument name, it references whatever is put in the fucntion above
function createTags(input) {
  // Spilt at commas, remove white space and double commas
  const tags = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());

  //creates an empty string
  tagsEl.innerHTML = "";

  //creates the element for each tag, adds the class and adds it to the tags div
  tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.classList.add("tag");
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
}

// random selection and animation function
function randomSelect() {
  // pass through it 30 times
  const times = 30;

  //create the interval so it can be cleared at a later point
  const interval = setInterval(() => {
    // calls a function which randomly choses a tag
    const randomTag = pickRandomTag();

    highlightTag(randomTag);

    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();

      highlightTag(randomTag);
    }, 100);
  }, times * 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add("highlight");
}

function unHighlightTag(tag) {
  tag.classList.remove("highlight");
}