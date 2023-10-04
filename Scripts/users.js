let staticAdmin = [
  { id: 1, email: "karthiga@admin.com", password: "karthiga" },
];

let staticUser = [{ id: 1, email: "karthiga@user.com", password: "karthiga" }];

let adminId = 1;
let userId = 1;

window.addEventListener("load", () => {
  if(!localStorage.getItem("admins"))
  {
    localStorage.setItem("admins", JSON.stringify(staticAdmin));
  }
  if(!localStorage.getItem("users"))
  {
    localStorage.setItem("users", JSON.stringify(staticUser));
  }
  
});





const LoginAction = () => {
  let emailRef = document.getElementById("loginemail");
  let passwordRef = document.getElementById("loginpassword");
  let errorMsgRef = document.getElementById("errormsg");
  let adminArr = JSON.parse(localStorage.getItem("admins"));
  let userArr = JSON.parse(localStorage.getItem("users"));

  let isUser = 0;

  if (emailRef.value != "" && passwordRef.value != "") {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRef.value.match(emailPattern))
    {
      for (let admin of adminArr) {
        if (
          emailRef.value === admin.email &&
          passwordRef.value === admin.password
        ) {
          sessionStorage.setItem("adminid",admin.id);
          sessionStorage.setItem("adminemail",admin.email);
          location.replace("/Admin/home.html");
          isUser = 1;
          break;
        }
      }
      for (let user of userArr) {
        if (
          emailRef.value === user.email &&
          passwordRef.value === user.password
        ) {
          sessionStorage.setItem("userid",user.id);
          sessionStorage.setItem("useremail",user.email);
          location.replace("/User/home.html");
          isUser = 1;
          break;
        }
      }
      if (isUser != 1) {
        errorMsgRef.innerText = "Email or password is incorrect!";
      }
    }
    else{
      errorMsgRef.innerText = "Please Enter valid email";
    }

  }
};

const SignUpAction = () => {
  let emailRef = document.getElementById("signupemailid");
  let nameRef = document.getElementById("signupname");
  let passwordRef = document.getElementById("signuppassword");
  let confirmpasswordRef = document.getElementById("signupconfirmpassword");
  let errorMsgRef = document.getElementById("errormsg");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(emailRef.value.match(emailPattern))
  {
    if (
      emailRef.value != "" &&
      nameRef.value != "" &&
      passwordRef.value != "" &&
      confirmpasswordRef.value != ""
    ) {
      if (passwordRef.value === confirmpasswordRef.value) {
        let subStr = emailRef.value.split("@");
        let adminArr = JSON.parse(localStorage.getItem("admins"));
        let userArr = JSON.parse(localStorage.getItem("users"));
        console.log(subStr[1]);
        if (subStr[1] === "admin.com") {
          adminArr.push({
            id: ++adminId,
            email: emailRef.value,
            password: passwordRef.value,
          });
          localStorage.setItem("admins", JSON.stringify(adminArr));
        } else{
          userArr.push({
            id: ++userId,
            email: emailRef.value,
            password: passwordRef.value,
          });
          localStorage.setItem("users", JSON.stringify(userArr));
        }
        location.replace("index.html");
      } else {
        errorMsgRef.innerText = "Oops! mismatch of password and confirm password";
      }
    } else {
      errorMsgRef.innerText = "Please fill all the fields";
    }

  }
  else
  {
    errorMsgRef.innerText = "Please enter the valid email format";
  }
  
};
