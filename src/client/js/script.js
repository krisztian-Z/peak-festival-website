let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

let themeToggler = document.querySelector(".theme-toggler");
let toggleBtn = document.querySelector(".toggle-btn");

toggleBtn.onclick = () => {
  themeToggler.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
  themeToggler.classList.remove("active");
};

document.querySelectorAll(".theme-toggler .theme-btn").forEach((btn) => {
  btn.onclick = () => {
    let color = btn.style.background;
    document.querySelector(":root").style.setProperty("--main-color", color);
  };
});

var swiper = new Swiper(".home-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

var swiper = new Swiper(".review-slider", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  spaceBetween: 10,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 2,
    },
    1050: {
      slidesPerView: 3,
    },
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

//slide
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
//ajax
document.getElementById("btnfaq").addEventListener("click", (e) => {
  const xhttp = new XMLHttpRequest();

  xhttp.addEventListener("load", (e) => {
    document.getElementById("result").innerHTML = e.target.responseText;
  });

  xhttp.open("GET", "faq.html");
  xhttp.send();
});

//json +fetch

fetch("content.html")
  .then((response) => response.text())
  .then((text) => {
    document.getElementById("result").innerHTML = text;
  });
fetch("modules.json")
  .then((response) => response.json())
  .then((modules) => {
    let output = "";
    modules.forEach((module) => {
      output +=
        "<p>Name: " +
        module.name +
        ", date: " +
        module.date +
        " , stage: " +
        module.stage +
        "</p>";
    });

    document.getElementById("result").innerHTML = output;
  });

// // send email
// function sendEmail() {
//   Email.send({
//       Host: "smtp.gmail.com",
//       Username: "z_cristian@ymail.com",
//       Password: "Geologie27?",
//       To: 'czgone@yahoo.co.uk',
//       From: document.getElementById("email").value,
//       Subject: "contact form",
//       Body: "First Name: " + document.getElementById("firstname").value
//       + "<br> Last Name:" + document.getElementById("lastname").value
//       + "<br> Email:" + document.getElementById("email").value
//       + "<br> Phone:" + document.getElementById("phone").value
//       + "<br> Message:" + document.getElementById("message").value
//   }).then(
//       message => alert("Message Sent!")
//   );
// }

async function sendForm() {
  // // document.getElementById("firstname").value
  // console.log(document.getElementById("firstname").value, "aaaa")
  const data = {
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    email: document.getElementById("email").value
  };

  await fetch("http://localhost:3000/api/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
