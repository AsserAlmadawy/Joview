import { jobs } from "./jobs.js";
import { send } from "@emailjs/browser";

const jobsBody = document.getElementById("jobs-body");
const arrow = document.querySelector(".arrow");

const header = document.querySelector(".header");
header.innerHTML = `
<a href="index.html"><img src="assets/images/wide-logo.jpg" alt="Logo" /></a>
<a href="index.html" class="link">HOME</a>
<a href="jobs.html" class="link">JOBS</a>
<a href="about-us.html" class="link">ABOUT US</a>
<a href="contact-us.html" class="link">CONTACT US</a>
`;

const sideMenu = document.querySelector(".side-menu");
sideMenu.innerHTML = `
<a href="index.html" class="link">HOME</a>
<a href="jobs.html" class="link">JOBS</a>
<a href="about-us.html" class="link">ABOUT US</a>
<a href="contact-us.html" class="link">CONTACT US</a>
`;

const handleMenu = () => {
  const one = document.querySelector(".one");
  const two = document.querySelector(".two");
  const three = document.querySelector(".three");

  menu.style.display = "block";
  menu.style.opacity = 1;

  one.style.rotate = "-45deg";
  two.style.opacity = 0;
  three.style.rotate = "45deg";

  two.style.translate = 0;
  one.style.translate = "0 10px";
  three.style.translate = "0 -10px";

  menu.style.zIndex = 300;
  sideMenu.style.right = 0;
  lines.forEach((line) => (line.style.backgroundColor = "rgb(0, 116, 217)"));

  menu.classList.add("x");
  
  sideMenu.innerHTML = `
<a href="index.html" class="link">HOME</a>
<a href="jobs.html" class="link">JOBS</a>
<a href="about-us.html" class="link">ABOUT US</a>
<a href="contact-us.html" class="link">CONTACT US</a>
`;

  const xMenu = document.querySelector(".x");

  const handleSideMenu = () => {
    sideMenu.style.right = "-250px";
    sideMenu.innerHTML = `
    <a href="index.html" class="link">HOME</a>
    <a href="jobs.html" class="link">JOBS</a>
    <a href="about-us.html" class="link">ABOUT US</a>
    <a href="contact-us.html" class="link">CONTACT US</a>
`;

    one.style.cssText = `
    background-color: #000;
    rotate: 180deg;
  `;

    two.style.cssText = `
    display: block;
  `;

    three.style.cssText = `
    background-color: #000;
    rotate: 0;
  `;

    menu.addEventListener("click", handleMenu);
  };

  xMenu.addEventListener("click", handleSideMenu);

  const main = document.querySelector(".main");

  main.addEventListener("click", handleSideMenu);

  window.addEventListener("scroll", handleSideMenu);
};

const menu = document.querySelector(".menu");
const lines = document.querySelectorAll(".menu .line");
menu.addEventListener("click", handleMenu);

const jobsContainer = document.querySelector(".jobs");
jobsContainer.innerHTML += jobs.map((job) => {
    return `
    <div class="job-wrapper">
    <div class="job image">
      <img src="${job.image}" />
    </div>
    <div class="job text">
      <h1 class="job-name">${job.name}</h1>
      <button class="take-quiz" id="${job.name}">Take quiz</button>
    </div>
    </div>
`;
  })
  .join("");

const jobsMain = document.querySelector(".jobs-main");
const buttons = document.querySelectorAll("button.take-quiz");

let i = 0;
let x = 1;
let ids = [];
let answers = [];
let score = 0;

const shuffle = array => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

buttons.forEach(button => {
  jobsBody.style.height = "4960px";

  button.addEventListener("click", e => {
    const chosenJob = jobs.find(job => job.name === e.target.id);
    jobsMain.style.textAlign = "unset";

    scrollTo({
      top: 0,
    });

    jobsMain.innerHTML = `
      <div class="job-title">${e.target.id}</div>
      <div class="questions">
      ${shuffle(chosenJob.questions)
        .map(question => {
          i++;

          return `
          <div class="question">
            <h2 class="question-body"><span>${i}</span> ${
            question.question
          }</h2>
              <div class="options">
                ${shuffle(question.options)
                  .map(option => {
                    const uniqueId = "abcdefgh"
                      .split("")
                      .sort(() => 0.5 - Math.random())
                      .join("");

                    x++;

                    return `
                    <div class="option">
                      <input type="radio" name="answer${i}" id="${uniqueId}" value="${uniqueId}" required />
                      <label for="${uniqueId}" class="option-body ${uniqueId}">${option}</label>
                    </div>
                  `;
                  })
                  .join("")}
              </div>
          </div>
        `;
        })
        .join("")}
      </div>
      <button type="submit" id="submit">SUBMIT</button>
    `;

    const submit = document.getElementById("submit");
    const inputs = document.getElementsByTagName("input");

    submit.addEventListener("click", e => {
      e.preventDefault();

      ids = [];
      answers = [];
      score = 0;

      for (const input of inputs) {
        if (input.checked) {
          ids.push(input.id);
        }
      }

      if (ids.length < 15) {
        alert("Please answer all questions.");
      } else {
        for (const id of ids) {
          answers.push(
            document.querySelector(`label[for="${id}"]`).textContent
          );
        }

        for (const answer of answers) {
          if (chosenJob.questions[answers.indexOf(answer)].answer === answer) {
            score++;
          }
        }

        const modal = document.querySelector(".modal");
        const backdrop = document.querySelector(".backdrop");
        const x = document.querySelector(".x-button");
        const scoreText = document.querySelector(".score");
        const c1 = document.querySelector(".c1");

        modal.style.display = "block";
        backdrop.style.display = "block";

        scoreText.textContent = score;

        x.addEventListener("click", () => {
          modal.style.display = "none";
          backdrop.style.display = "none";
        });

        backdrop.addEventListener("click", () => {
          modal.style.display = "none";
          backdrop.style.display = "none";
        });

        scoreText.textContent.length === 1 &&
          (scoreText.style.cssText = `width: 40px; left: calc(50% - 20px);`);

        const dynamicStyles = document.createElement("style");
        document.head.appendChild(dynamicStyles);

        const keyframes = `
        @keyframes score {
          from {
            stroke-dashoffset: 630;
          }

          to {
            stroke-dashoffset: ${630 - score * 40.53};
          }
        }
      `;

        dynamicStyles.sheet.insertRule(
          keyframes,
          dynamicStyles.sheet.cssRules.length
        );
        c1.style.animation = "score 1s forwards linear";
      }
    });
  });
});

const searchBar = document.querySelector('input[type="text"]');
const xButton = document.getElementById("x");

const search = () => {
  jobsContainer.innerHTML = jobs
    .filter(job =>
      job.name.toLowerCase().includes(searchBar.value.toLowerCase().trim())
    )
    .map(job => {
      return `
    <div class="job-wrapper">
    <div class="job image">
      <img src="${job.image}" />
    </div>
    <div class="job text">
      <h1 class="job-name">${job.name}</h1>
      <button class="take-quiz" id="${job.name}">Take quiz</button>
    </div>
    </div>
  `;
    })
    .join("");

  if (document.querySelectorAll(".job-wrapper").length === 0) {
    jobsBody.style.overflow = "hidden";
    jobsContainer.innerHTML = '<div class="not-found">No jobs match your search.</div>';
  } else {
    jobsBody.style.overflow = "auto";
  }

  const allButtons = document.querySelectorAll("button.take-quiz");
  allButtons.forEach(button => {
    button.addEventListener("click", e => {
      const chosenJob = jobs.find(job => job.name === e.target.id);
      jobsMain.style.textAlign = "unset";

      scrollTo({
        top: 0
      });

      jobsMain.innerHTML = `
        <div class="job-title">${e.target.id}</div>
        <div class="questions">
        ${shuffle(chosenJob.questions)
          .map(question => {
            i++;

            return `
            <div class="question">
              <h2 class="question-body"><span>${i}</span> ${
              question.question
            }</h2>
                <div class="options">
                  ${shuffle(question.options)
                    .map(option => {
                      const uniqueId = "abcdefgh"
                        .split("")
                        .sort(() => 0.5 - Math.random())
                        .join("");

                      x++;

                      return `
                      <div class="option">
                        <input type="radio" name="answer${i}" id="${uniqueId}" value="${uniqueId}" required />
                        <label for="${uniqueId}" class="option-body ${uniqueId}">${option}</label>
                      </div>
                    `;
                    })
                    .join("")}
                </div>
            </div>
          `;
          })
          .join("")}
        </div>
        <button type="submit" id="submit">SUBMIT</button>
      `;

      const submit = document.getElementById("submit");
      const inputs = document.getElementsByTagName("input");

      submit.addEventListener("click", () => {
        ids = [];
        answers = [];
        score = 0;

        for (const input of inputs) {
          if (input.checked) {
            ids.push(input.id);
          }
        }

        if (ids.length < 15) {
          alert("Please answer all questions.");
        } else {
          for (const id of ids) {
            answers.push(
              document.querySelector(`label[for="${id}"]`).textContent
            );
          }

          for (const answer of answers) {
            if (chosenJob.questions[answers.indexOf(answer)].answer === answer) {
              score++;
            }
          }

          const modal = document.querySelector(".modal");
          const backdrop = document.querySelector(".backdrop");
          const x = document.querySelector(".x-button");
          const scoreText = document.querySelector(".score");
          const c1 = document.querySelector(".c1");

          modal.style.display = "block";
          backdrop.style.display = "block";

          scoreText.textContent = score;

          x.addEventListener("click", () => {
            modal.style.display = "none";
            backdrop.style.display = "none";
          });

          backdrop.addEventListener("click", () => {
            modal.style.display = "none";
            backdrop.style.display = "none";
          });

          scoreText.textContent.length === 1 &&
            (scoreText.style.cssText = `width: 40px; left: calc(50% - 20px);`);

          const dynamicStyles = document.createElement("style");
          document.head.appendChild(dynamicStyles);

          const keyframes = `
          @keyframes score {
            from {
              stroke-dashoffset: 630;
            }

            to {
              stroke-dashoffset: ${630 - score * 40.53};
            }
          }
        `;

          dynamicStyles.sheet.insertRule(
            keyframes,
            dynamicStyles.sheet.cssRules.length
          );
          c1.style.animation = "score 1s forwards linear";
        }
      });
    });
  });

  if (document.querySelectorAll(".job-wrapper").length !== 37) {
    arrow.style.display = "none";
  } else {
    arrow.style.display = "block";
  }
};

xButton.addEventListener("click", () => {
  searchBar.value = "";

  search();
});

searchBar.addEventListener("input", () => {
  search();

  document.querySelectorAll(".job-wrapper").length !== 0

  const allButtons = document.querySelectorAll("button");
  allButtons.forEach(button => {
    button.addEventListener("click", e => {
      const chosenJob = jobs.find((job) => job.name === e.target.id);
      jobsMain.style.textAlign = "unset";

      scrollTo({
        top: 0
      });

      jobsMain.innerHTML = `
        <div class="job-title">${e.target.id}</div>
        <div class="questions">
        ${shuffle(chosenJob.questions)
          .map(question => {
            i++;

            return `
            <div class="question">
              <h2 class="question-body"><span>${i}</span> ${
              question.question
            }</h2>
                <div class="options">
                  ${shuffle(question.options)
                    .map((option) => {
                      const uniqueId = "abcdefgh"
                        .split("")
                        .sort(() => 0.5 - Math.random())
                        .join("");

                      x++;

                      return `
                      <div class="option">
                        <input type="radio" name="answer${i}" id="${uniqueId}" value="${uniqueId}" required />
                        <label for="${uniqueId}" class="option-body ${uniqueId}">${option}</label>
                      </div>
                    `;
                    })
                    .join("")}
                </div>
            </div>
          `;
          })
          .join("")}
        </div>
        <button type="submit" id="submit">SUBMIT</button>
      `;

    const submit = document.getElementById("submit");
    const inputs = document.getElementsByTagName("input");

    submit.addEventListener("click", () => {
      ids = [];
      answers = [];
      score = 0;

      for (const input of inputs) {
        if (input.checked) {
          ids.push(input.id);
        }
      }

      if (ids.length < 15) {
        alert("Please answer all questions.");
      } else {
        for (const id of ids) {
          answers.push(
            document.querySelector(`label[for="${id}"]`).textContent
          );
        }

        for (const answer of answers) {
          if (chosenJob.questions[answers.indexOf(answer)].answer === answer) {
            score++;
          }
        }

        const modal = document.querySelector(".modal");
        const backdrop = document.querySelector(".backdrop");
        const x = document.querySelector(".x-button");
        const scoreText = document.querySelector(".score");
        const c1 = document.querySelector(".c1");

        modal.style.display = "block";
        backdrop.style.display = "block";

        scoreText.textContent = score;

        x.addEventListener("click", () => {
          modal.style.display = "none";
          backdrop.style.display = "none";
        });

        backdrop.addEventListener("click", () => {
          modal.style.display = "none";
          backdrop.style.display = "none";
        });

        scoreText.textContent.length === 1 &&
          (scoreText.style.cssText = `width: 40px; left: calc(50% - 20px);`);

        const dynamicStyles = document.createElement("style");
        document.head.appendChild(dynamicStyles);

        const keyframes = `
        @keyframes score {
          from {
            stroke-dashoffset: 630;
          }

          to {
            stroke-dashoffset: ${630 - score * 40.53};
          }
        }
      `;

        dynamicStyles.sheet.insertRule(
          keyframes,
          dynamicStyles.sheet.cssRules.length
        );
        c1.style.animation = "score 1s forwards linear";
      }
    });
  });
});
});

window.addEventListener("resize", () => {
  if (document.documentElement.clientWidth > 600) {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
});

const loading = document.getElementById("loading");

document.addEventListener("readystatechange", () => {
  if (document.readyState !== "complete") {
    loading.classList.add("loading");
    loading.classList.remove("ready");
  } else {
    loading.classList.add("ready");
    loading.classList.remove("loading");
  }
});

arrow.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

const circle = document.querySelector(".arrow circle");

scrollY === 0 && (arrow.style.opacity = 0);

window.addEventListener("scroll", () => {
  if (scrollY === 0) {
    arrow.style.opacity = 0;
  } else {
    arrow.style.opacity = 1;
    circle.style.strokeDashoffset = 82 - (scrollY / (jobsBody.scrollHeight - innerHeight)) * 82;
  }
});

document.addEventListener("DOMContentLoaded", () => scrollTo({ top: 0, behavior: "smooth" }));

jobsBody.style.height = "unset";

// Contact Us

const Name = document.getElementById("name");
const email = document.getElementById("email");
const nameHolder = document.getElementById("name-holder");
const emailHolder = document.getElementById("email-holder");
const message = document.querySelector("textarea");
const messageHolder = document.getElementById("message-holder");
const submit = document.getElementById("submit-btn");

const sendEmail = e => {
  e.preventDefault();
  
  if (Name.value === "" || email.value === "" || message.value === "") {
    alert("Please enter your name, email, and message.");
  } else {
    if (!email.value.includes("@")) {
      alert("Email must contain @ symbol.");
    } else {
     submit.textContent = "SENDING...";

    send("joview-mail", "template_scnkg34", {
    name: Name.value.trim(),
    email: email.value.trim(),
    message: message.value.trim()
}, "XymwmkfziJI-JtCUJ")

    .then(() => {
      Name.value = "";
      email.value = "";
      message.value = "";

      submit.textContent = "SENT!";

      alert("Email successfully sent!");
      setTimeout(() => submit.textContent = "SEND EMAIL", 2000);
    })
    .catch(error => {
      console.log(error);
    }); 
    }
  }
};

nameHolder.addEventListener("click", () => Name.focus());
Name.addEventListener("focus", () => nameHolder.style.translate = "0 30px");
Name.addEventListener("focusout", () => {
  if (Name.value) {
    return;
  } else {
    nameHolder.style.translate = "0 49px";
  }
});

emailHolder.addEventListener("click", () => email.focus());
email.addEventListener("focus", () => emailHolder.style.translate = "0 30px");
email.addEventListener("focusout", () => {
  if (email.value) {
    return;
  } else {
    emailHolder.style.translate = "0 49px";
  }
});

messageHolder.addEventListener("click", () => Name.focus());
message.addEventListener("focus", () => messageHolder.style.translate = "0 33px");
message.addEventListener("focusout", () => {
  if (message.value) {
    return;
  } else {
    messageHolder.style.translate = "0 134px";
  }
});

submit.addEventListener("click", sendEmail);