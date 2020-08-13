$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var nameInput = $("input#firstname-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var zipCodeInput = $("input#zipCode-input");

  $.get("api/zip").then((data) => {
    data.map((zipcode) => {
      $("#zipSel").append(
        `<option value=${zipcode} selected="selected">${zipcode}</option>`
      );
    });
  });

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      username: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      zipcode: zipCodeInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      username: username,
      email: email,
      password: password,
      zipcode: zipcode,
    })
      .then(function (data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
