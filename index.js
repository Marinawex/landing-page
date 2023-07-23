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

fetch("images.json")
  .then((response) => response.json())
  .then((images) => {
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
  })
  .catch((error) => console.log("Error:", error));
