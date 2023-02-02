const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author";

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
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks((customSelector = ""));

function generateTags() {
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  for (let article of articles) {
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    const articleTags = article.getAttribute("data-tags");
    const tagsArray = articleTags.split(" ");
    let html = "";

    for (let tag of tagsArray) {
      const linkHTML = '<li> <a href="#tag-' + tag + '">' + tag + "</a></li>";
      html = html + linkHTML + " ";
    }

    tagWrapper.innerHTML = html;
  }
}
generateTags();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("href");
  const tag = href.replace("#tag-", "");
  const activeTags = document.querySelectorAll(' a.active[href^="#tag-"]');
  for (let activeTag of activeTags) {
    activeTag.classList.remove("active");
  }
  const linksHref = document.querySelectorAll('a[href="' + href + '"]');
  for (let linkHref of linksHref) {
    linkHref.classList.add("active");
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const links = document.querySelectorAll(".post-tags .list a");
  for (let link of links) {
    link.addEventListener("click", tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const tagWrapper = article.querySelector(optArticleAuthorSelector);
    let html = "";
    const authorTag = article.getAttribute("data-author");
    const authorLink = '<a href="#' + authorTag + '">' + authorTag + "</a>";
    html = html + authorLink;
    tagWrapper.innerHTML = html;
  }
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("href");
  const author = href.replace("#", "");
  const activeArticlesAuthor = document.querySelectorAll('a.active[href^="#"]');
  for (let activeArticleAuthor of activeArticlesAuthor) {
    activeArticleAuthor.classList.remove("active");
  }
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll(".post .post-author a");
  for (let authorLink of authorLinks) {
    authorLink.addEventListener("click", authorClickHandler);
  }
}
addClickListenersToAuthors();
