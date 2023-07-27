const images = [
  {"id":1,"title":"Miss Vegas","name":"Yunus Fulton","image":"assets/image20.jpg"},
  {"id":2,"title":"Miss Alabama","name":"Audrey Chavez","image":"assets/image21.jpg"},
  {"id":3,"title":"Miss New York","name":"Maria Luna","image":"assets/image22.jpg"},
  {"id":4,"title":"Miss Australia","name":"Janet Wu","image":"assets/image23.jpg"},
  {"id":5,"title":"Miss London","name":"Felicity Russo","image":"assets/image24.jpg"},
  {"id":6,"title":"Miss Israel","name":"Valerie Campbell","image":"assets/image25.jpg"},
  {"id":7,"title":"Miss Florida","name":"Archie Arias","image":"assets/image26.jpg"},
  {"id":8,"title":"Miss Washington","name":"Aliza Johns","image":"assets/image27.jpg"},
  {"id":9,"title":"Miss Atlanta","name":"Rafe Haynes","image":"assets/image28.jpg"},
  {"id":10,"title":"Miss France","name":"Liyana Vargas","image":"assets/image29.jpg"},
  {"id":11,"title":"Miss Ireland","name":"Joao Graves","image":"assets/image30.jpg"},
  {"id":12,"title":"Miss Whales","name":"Casey Mckee","image":"assets/image31.jpg"}
]



const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const buttonContainer = document.querySelector(".Buttons");
let cardItems;

const paginationLimit = 4;
let pageCount;
let currentPage = 1;

const disableButton = (button) => {
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  cardItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("current-page");
    if (parseInt(button.textContent) === currentPage) {
      button.classList.add("current-page");
    }
  });
};

// fetch("images.json")
//   .then((response) => response.json())
//   .then((images) => {
    let cardContainer = document.querySelector(".Images");

    for (let i = 0; i < images.length; i++) {
      const cardHTML = `
<div class="card hidden">
  <img src="${images[i].image}" alt="glasses" class="avatar" loading="lazy"/>
  <div class="text">
    <h3>${images[i].title}</h3>
    <p>${images[i].name}</p>
  </div>
</div>
`;

      cardContainer.innerHTML += cardHTML;
    }

    cardItems = document.querySelectorAll(".card");
    pageCount = Math.ceil(cardItems.length / paginationLimit);

    for (let i = 1; i <= pageCount; i++) {
      const button = document.createElement("button");
      button.classList.add("pagination-number");
      button.textContent = i;
      buttonContainer.insertBefore(button, nextButton);
    }

    setCurrentPage(1);

    prevButton.addEventListener("click", () => {
      setCurrentPage(currentPage - 1);
    });


    nextButton.addEventListener("click", () => {
      setCurrentPage(currentPage + 1);
    });

   
    document.querySelectorAll(".pagination-number").forEach((button) => {
      button.addEventListener("click", () => {
        setCurrentPage(parseInt(button.textContent));
      });
    });

    let avatars = document.querySelectorAll(".avatar");

    avatars.forEach((avatar, index) => {
      avatar.addEventListener("mouseover", () => {
        avatar.src = "assets/glasses.jpg";
      });
      avatar.addEventListener("mouseout", () => {
        avatar.src = images[index].image;
      });
    });
  // })
  // .catch((error) => console.log("Error:", error));
