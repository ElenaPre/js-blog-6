const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list";

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll(".titles a.active");
  const articleSelector = clickedElement.getAttribute("href");
  const targetArticle = document.querySelector(articleSelector);
  const articles = document.querySelectorAll(".post");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  clickedElement.classList.add("active");

  for (let article of articles) {
    article.classList.remove("active");
  }

  targetArticle.classList.add("active");
}

function generateTitleLinks() {
  const titleList = document.querySelector(optTitleListSelector);
  const articles = document.querySelectorAll(optArticleSelector);
  titleList.innerHTML = "";

  for (let article of articles) {
    const articleID = article.getAttribute("id");
    const titleArticle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML =
      '<li><a href="#' +
      articleID +
      '"><span>' +
      titleArticle +
      "</span></a></li>";
    titleList.insertAdjacentHTML("beforeend", linkHTML);
  }

  const links = document.querySelectorAll(".titles a");
  console.log(links);
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagWrapper = document.querySelectorAll(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = "";

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute("data-tags");
    /* split tags into array */
    const tagsArray = articleTags.split(" ");

    /* START LOOP: for each tag */
    for (let tag of tagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li> <a href="#tag-' + tag + '">' + tag + "</a></li>";
      html = html + linkHTML;
    }
    tagWrapper.innerHTML = html;
    /* add generated code to html variable */
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    /* END LOOP: for every article: */
  }
}

generateTags();
