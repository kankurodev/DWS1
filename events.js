//Confirm page has loaded before continuing
function setup() {

    //####################################################//
    //-----------------------Contact----------------------//
    //####################################################//
    
    //create variables
    var elName = document.querySelector("#name");
    var elEmail = document.querySelector("#email");
    var elPhone = document.querySelector("#phone");
    var elMessage = document.querySelector("#message");
    var elForm = document.querySelector(".contact");
    var elMsg = document.querySelector(".feedback");

    //create contact form functions
    function checkField(num) {

        //check if the last input field to lose focus meets the required number
        if (this.value.length < num.target.myParam)
            {

                //If the 
                switch(num.target.myParam) {
                    case 3:
                        elMsg.innerHTML = "Error: Your name must be 3 or more characters long!";
                        break;
                    case 8:
                        elMsg.innerHTML = "Error: Your email address must be 8 or more characters long!";
                        break;
                    case 10:
                        elMsg.innerHTML = "Error: Your phone number must be 10 digits long!";
                        break;
                    case 25:
                        elMsg.innerHTML = "Error: Your message must be 25 or more characters long!";
                        break;
                    default:
                        elMsg.innerHTML= "An unknown error has occured, please refresh and try again!";
                }
            }
        else 
        {
            elMsg.innerHTML = "";
        }
    }


    //Create function to validate all forms have been filled out
    function validateSend(event) {

        //Check to see if all fields met the required length
        if (elName.value.length < 3 || elEmail.value.length < 8 || elPhone.value.length < 10 || elMessage.value.length < 25) {

            //If any fields failed to meet the requirement then give an error message and prevent submit
            elMsg.innerHTML = "Error: You must fill out all fields before submitting!";
            event.preventDefault();
        }
    }


    //Listen for the events to be called
    if (elName !== null && elMsg !== null) {
        elName.addEventListener('blur', checkField, false);
        elName.myParam = 3;
    } 

    if (elEmail !== null && elMsg !== null) {
        elEmail.addEventListener('blur', checkField, false);
        elEmail.myParam = 8;
    }

    if (elPhone !== null && elMsg !== null) {
        elPhone.addEventListener('blur', checkField, false);
        elPhone.myParam = 10;
    }

    if (elMessage !== null && elMsg !== null) {
        elMessage.addEventListener('blur', checkField, false);
        elMessage.myParam = 25;
    }

    if (elForm !== null && elMsg !== null) {
        elForm.addEventListener('submit', validateSend, false);
    }
    
    
    //####################################################//
    //------------------------Blogs-----------------------//
    //####################################################//
    
    //Create a function to change the contents of the blogs page when the next button is clicked
    function nextPage() {
        
        //create new xhr
        var xhr = new XMLHttpRequest();
        
        //load the json data and parse it to a variable
        xhr.onload = function () {
        var resObj = JSON.parse(xhr.responseText);
        
        //create variable
        var blog = document.querySelectorAll("#blogs article");
        
        
            //Make sure the blogs section exists
            if (blog !== null) {

                //Update the image for the blog
                var blogImg1 = blog[0].querySelector(".blogImg img");
                    blogImg1.src = resObj.posts[3].imageURL;
                    blogImg1.alt = resObj.posts[3].title;

                    //Update the title for the blog
                    blog[0].getElementsByTagName('a')[0].innerHTML = resObj.posts[3].title;

                    //Update the body for the blog
                    blog[0].getElementsByTagName('p')[1].innerHTML = resObj.posts[3].text;

                    //Update the post date for the blog
                    blog[0].getElementsByTagName('dd')[0].innerHTML = resObj.posts[3].postDate;
                
                //Update the image for the blog
                var blogImg2 = blog[1].querySelector(".blogImg img");
                    blogImg2.src = resObj.posts[4].imageURL;
                    blogImg2.alt = resObj.posts[4].title;

                    //Update the title for the blog
                    blog[1].getElementsByTagName('a')[0].innerHTML = resObj.posts[4].title;

                    //Update the body for the blog
                    blog[1].getElementsByTagName('p')[1].innerHTML = resObj.posts[4].text;

                    //Update the post date for the blog
                    blog[1].getElementsByTagName('dd')[0].innerHTML = resObj.posts[4].postDate;
                
                
                //set the class to the blog to be hidden
                blog[2].className = 'hideBlog';
            }
        };
        
        //open and send the xhr
        xhr.open("GET", "data/data.json", true);
        xhr.send(null);
    }
    
    
    function prevPage() {
        
        //create new xhr
        var xhr = new XMLHttpRequest();
        
        //load the json data and parse it to a variable
        xhr.onload = function () {
        var resObj = JSON.parse(xhr.responseText);
        
        //create variable
        var blog = document.querySelectorAll("#blogs article");
        
        
            //Make sure the blogs section exists
            if (blog !== null) {

                //Update the image for the blog
                var blogImg1 = blog[0].querySelector(".blogImg img");
                    blogImg1.src = resObj.posts[0].imageURL;
                    blogImg1.alt = resObj.posts[0].title;

                    //Update the title for the blog
                    blog[0].getElementsByTagName('a')[0].innerHTML = resObj.posts[0].title;

                    //Update the body for the blog
                    blog[0].getElementsByTagName('p')[1].innerHTML = resObj.posts[0].text;

                    //Update the post date for the blog
                    blog[0].getElementsByTagName('dd')[0].innerHTML = resObj.posts[0].postDate;
                
                //Update the image for the blog
                var blogImg2 = blog[1].querySelector(".blogImg img");
                    blogImg2.src = resObj.posts[1].imageURL;
                    blogImg2.alt = resObj.posts[1].title;

                    //Update the title for the blog
                    blog[1].getElementsByTagName('a')[0].innerHTML = resObj.posts[1].title;

                    //Update the body for the blog
                    blog[1].getElementsByTagName('p')[1].innerHTML = resObj.posts[1].text;

                    //Update the post date for the blog
                    blog[1].getElementsByTagName('dd')[0].innerHTML = resObj.posts[1].postDate;
                
                //Update the image for the blog
                var blogImg3 = blog[2].querySelector(".blogImg img");
                    blogImg3.src = resObj.posts[2].imageURL;
                    blogImg3.alt = resObj.posts[2].title;

                    //Update the title for the blog
                    blog[2].getElementsByTagName('a')[0].innerHTML = resObj.posts[2].title;

                    //Update the body for the blog
                    blog[2].getElementsByTagName('p')[1].innerHTML = resObj.posts[2].text;

                    //Update the post date for the blog
                    blog[2].getElementsByTagName('dd')[0].innerHTML = resObj.posts[2].postDate;
                
                //Remove the class from the hidden blog
                if (blog[2].hasAttribute('class')) {
                    blog[2].removeAttribute('class');
                }
            }
        };
        
        //open and send the xhr
        xhr.open("GET", "data/data.json", true);
        xhr.send(null);
    }
    
    //Create variables
    var elNext = document.querySelector("#blogNext");
    var elPrev = document.querySelector("#blogPrev");
    var elBlogOne = document.querySelector("#blogOne");
    var elBlogTwo = document.querySelector("#blogTwo");
    
    //Listen for the events to be called
    if (elNext !== null) {
        elNext.addEventListener('click', nextPage, false);
    }
    
    if (elPrev !== null) {
        elPrev.addEventListener('click', prevPage, false);
    }
    
    if (elBlogOne !== null) {
        elBlogOne.addEventListener('click', prevPage, false);
    }
    
    if (elBlogTwo !== null) {
        elBlogTwo.addEventListener('click', nextPage, false);
    }
}


//call the setup event when the page loads
window.addEventListener('load', setup, false);