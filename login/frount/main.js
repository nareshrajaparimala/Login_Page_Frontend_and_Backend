
let register=document.getElementById("register");
let sentence=document.getElementById("sentence");
let create=document.getElementById("create");
let login=document.getElementById("login");
let useridlab=document.getElementById("useridlab");
let userid=document.getElementById("userid");
let passlab=document.getElementById(("passlab"));
let pass=document.getElementById(("pass"));
let cpasslab=document.getElementById(("cpasslab"));
let cpass=document.getElementById(("cpass"));
let user_space=document.getElementById("user_space");
let pass_space=document.getElementById("pass_space");
let hashed_space=document.getElementById("hashed_space");

// ------------------ change to login page-------------------------
login.addEventListener("click",async ()=>{
    let main_user=userid.value;
    let main_pass=pass.value;
    const back_sender=await fetch('/main_login',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({main_user1:main_user, main_pass1:main_pass})
    })
    .then(response=>response.text())
    .then(data=> console.log(data));
    goToLogin();
});
function goToLogin() {
    // Redirect the browser to the backend endpoint
    window.location.href = '/get-data';
}

// -------------------end of change to login page--------------------



// ------------------------register button--------------------------
register.addEventListener("click",()=>{
    // console.log("hi i am naresh");
    sentence.style.display="none";
    create.style.display="block";
    register.style.display="none";
    login.style.display="none";
    useridlab.innerText="User name";
    passlab.innerText="Password";
    pass.style.marginLeft="5px";
    
    cpasslab.style.display="inline";
    cpass.style.display="inline";
    cpass.style.marginLeft="13px";

    create.addEventListener("click",()=>{
        let user_name= userid.value;
        let Apass=pass.value;
        let Acpass=cpass.value;
        if(user_name!=""&Apass!=""&Acpass!="")
        {
           if(Apass===Acpass)
            {
                //test
                try 
                {
                    // Send username and password to backend
                    const response =  fetch('/register', 
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        // body: JSON.stringify({ user_name, Apass }),
                        body: JSON.stringify({ user_name: user_name, pass: Apass })
                    })
                    .then(response => response.text())
                    .then(data => console.log(data));

                } catch (error) 
                {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                }
            }
        }

    });
});
// ------------------------end for ----register button--------------------------