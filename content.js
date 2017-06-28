//Create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();

//Run an anonymous function on load
xhr.onload = function () {
    
    //Parse the json data into a new variable
    var resObj = JSON.parse(xhr.responseText);
    
    //Create variables to use to verify which page the user is on
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    
    //Create main counter variable
    var i;
    
    //####################################################//
    //------------------------Index-----------------------//
    //####################################################//
    
    //Declare variables to be used with specific elements
    var product = document.querySelectorAll("#products article");
    var indexBenefits = document.querySelectorAll("#benefits li");


    //------------------Featured Products-----------------//


    //Make sure the indexFeaturedArticle section exists
    if (product !== null) {

        //Loop through each item in the data and add it to the proper elements
        for (i = 0; i < product.length; i++) {

            //Update Images
            var indexProductImg = product[i].querySelector(".thumbnail img");
            indexProductImg.src = resObj.products[i].imageURL;
            indexProductImg.alt = resObj.products[i].title;

            //Update ratings
            var productRating = product[i].querySelector("meter");
            var dataRating = product[i].querySelector("[data-rating]");
            productRating.value = resObj.products[i].rating;
            dataRating.setAttribute("data-rating", resObj.products[i].rating);

            //Update the title for the product
            product[i].getElementsByTagName('h3')[0].innerHTML = resObj.products[i].title;

            //Update the description for the product
            product[i].getElementsByTagName('p')[2].innerHTML = resObj.products[i].description;

            //Update the price
            //If product is on sale add an em tag to surround the original price 
            if (resObj.products[i].salePrice === "") {

                product[i].getElementsByTagName('p')[3].innerHTML = "&#36;" +  parseFloat(Math.round(resObj.products[i].price * 100) / 100).toFixed(2);

            } else {

                product[i].getElementsByTagName('p')[3].innerHTML = "&#36;" + parseFloat(Math.round(resObj.products[i].salePrice * 100) / 100).toFixed(2) + " <del> &#36;" + parseFloat(Math.round(resObj.products[i].price * 100) / 100).toFixed(2) + "</del>";

            }
        }
    }


    //-------------------Member Benefits------------------//

    //Make sure the indexBenefits section exists
    if (indexBenefits !== null) {

        //Loop through each item and update it's values
        for (i = 0; i < indexBenefits.length; i++) {

            indexBenefits[i].getElementsByTagName('h2')[0].innerHTML = resObj.benefits[i].title;
            indexBenefits[i].getElementsByTagName('p')[0].innerHTML = resObj.benefits[i].description;

        }
    }
    
    
    //####################################################//
    //------------------------Blogs-----------------------//
    //####################################################//
    
    //Verify that the user is on the blogs page
    if (sPage === "blogs.html") {
        
        //Declare variables to be used with specific elements
        var blog = document.querySelectorAll("#blogs article");
        var featuredBlog = document.querySelectorAll("aside article");
        
        
        //-------------------Main Blogs-------------------//
        
        //Make sure the blogs section exists
        if (blog !== null) {
         
            //Loop through each item and update it's values
            for (i = 0; i < blog.length; i++) {
                
                var blogImg = blog[i].querySelector(".blogImg img");
                blogImg.src = resObj.posts[i].imageURL;
                blogImg.alt = resObj.posts[i].title;

                //Update the title for the blogs
                blog[i].getElementsByTagName('a')[0].innerHTML = resObj.posts[i].title;

                //Update the body for the blogs
                blog[i].getElementsByTagName('p')[1].innerHTML = resObj.posts[i].text;

                //Update the post date for the blogs
                blog[i].getElementsByTagName('dd')[0].innerHTML = resObj.posts[i].postDate;

            }
        }
        
        
        //-------------------Newest Blog-----------------//
        
        //Make sure the featuredBlog section exists
        if (featuredBlog !== null) {
            
            //Update the title for the newest blog
            featuredBlog[0].getElementsByTagName('a')[0].innerHTML = resObj.posts[resObj.posts.length -1].title;

            //Update the body for the newest blog
            featuredBlog[0].getElementsByTagName('p')[0].innerHTML = resObj.posts[resObj.posts.length -1].text;
        }     
    }
    
    
    //####################################################//
    //-----------------------Events-----------------------//
    //####################################################//
    
    //Make sure the user is on the events page
    if (sPage === "events.html") {
        
        //Create variables to select the proper sections to be updates
        var event = document.querySelectorAll("#events article");
        
        //Make sure the event section exists
        if (event !== null) {
            
            //create variables to be used
            var eventCounter = 0;
            var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        
            //Loop through each item and update it's values
            for (i = resObj.events.length -1; i >= 0; i--) {

                //Split the date from the JSON file by it's delimiter
                var dateStr = resObj.events[i].date.split("-");
                var timeStr = resObj.events[i].date.split(" ");

                //Create a new date using the newly split date string
                var eventDate = new Date(dateStr);
                var eventTime = new Date(timeStr);

                //Check to see if the minutes are less than 10 and if so change it to a 0 and then append the same value
                //Using this method makes it so we can always have 2 digets instead of just one
                var eventMinutes = (eventTime.getMinutes() < 10 ? '0' : '') + eventTime.getMinutes();

                //Update the dates for each event
                //Get the date from the eventDate variable
                //Parse the month into a name rather than a number
                event[eventCounter].getElementsByTagName('p')[0].innerHTML = "<em>" + eventDate.getDate() + "</em> " + months[parseInt(dateStr[1], 10) -1] + " <strong>" + eventTime.getHours() + ":" + eventMinutes + "</strong>";

                //Update the titles for each event
                event[eventCounter].getElementsByTagName('h2')[0].innerHTML = resObj.events[i].title;

                //Update the description for each event
                event[eventCounter].getElementsByTagName('p')[1].innerHTML = resObj.events[i].text;

                //Add one to the counter
                eventCounter++;

            }
        }
    }
    
    
    //####################################################//
    //------------------------Shop------------------------//
    //####################################################//
    
    //Make sure the user is on the shop page
    
        
    var featuredProduct = document.querySelectorAll("#shopSale article");
    var results = document.querySelector("#shop");
    
    
    if (results !== null) {
    results.getElementsByClassName('resultAmount')[0].innerHTML = "Showing 1-" + product.length + " of " + resObj.products.length + " results";
    }

    //-----------------Featured Products----------------//

    //Make sure the feature section exists
    if (featuredProduct !== null) {

        //create counter variable
        var featuredCounter = 0;

        //Loop through each item in the data and add it to the proper elements
        for (i = 0; i <= resObj.products.length; i++) {
            if(featuredCounter != featuredProduct.length) {

                //If the product isn't on sale then skip that iteration of the loop
                if (resObj.products[i].salePrice === "") {
                    continue;
                }

                //Update Images
                var featuredProductImg = featuredProduct[featuredCounter].querySelector(".thumbnail img");
                featuredProductImg.src = resObj.products[i].imageURL;
                featuredProductImg.alt = resObj.products[i].title;

                //Update ratings
                var featuredRating = featuredProduct[featuredCounter].querySelector("meter");
                var featuredDataRating = featuredProduct[featuredCounter].querySelector("[data-rating]");
                featuredRating.value = resObj.products[featuredCounter].rating;
                featuredDataRating.setAttribute("data-rating", resObj.products[i].rating);

                //Update the title for the product
                featuredProduct[featuredCounter].getElementsByTagName('h3')[0].innerHTML = resObj.products[i].title;

                //Update the description for the product
                featuredProduct[featuredCounter].getElementsByTagName('p')[2].innerHTML = resObj.products[i].description;

                //Update the price
                featuredProduct[featuredCounter].getElementsByTagName('p')[3].innerHTML = "&#36;" + parseFloat(Math.round(resObj.products[i].salePrice * 100) / 100).toFixed(2) + " <del> &#36;" + parseFloat(Math.round(resObj.products[i].price * 100) / 100).toFixed(2) + "</del>";

                //Add one to the counter
                featuredCounter++;
            }
        }
    }
};

//open the xhr object with the json data file
xhr.open("GET", "data/data.json", true);

//send the data
xhr.send(null); //Set to null due to local hosting