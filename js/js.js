function updateClock() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November', 'December']; 

        time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), // again, you get the idea

        // a cleaner way than string concatenation
        date = [now.getDate(), 
                months[now.getMonth()],
                now.getFullYear()].join(' ');

    // set the content of the element with the ID time to the formatted string
    $('#currentTime').html([date, time].join('  '));

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}
updateClock(); 

$('#insta').click(function(){
   loadInstagram(); 
});
$('#yelp').click(function(){
   loadYelp(); 
});
$('#groupon').click(function(){
   loadGroupon(); 
});

$('#contact').click(function(){
   loadForm(); 
});

function loadForm(){
     $.get("contact.html", function(data){
        $("#mainContainer").html(data);
     });
}

function loadInstagram(){

    $.get("instagram.html", function(data){
        $("#mainContainer").html(data);
        
        $("#searchInstagram").click(function(){
            var searchTerm = $("#instagramSearch").val();
            var searchURL = "https://api.instagram.com/v1/tags/"+searchTerm+"/media/recent/?client_id=5f9365e9f1054aa991726d731c65aa02";
            drawItems(searchURL); 
        });
    });
    
}

function loadYelp(){

    $.get("yelp.html", function(data){
        $("#mainContainer").html(data);
        $("#searchYql").click(function(){
            var searchTerm = $("#searchTerm").val();
            var zipcode = $("#zipcode").val();
            var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D'"+zipcode+"'%20and%20query%3D'"+searchTerm+"'&format=json&callback=";
            $.get(url, function(data){
                console.log(data);
                var arrayOfItems = data.query.results.Result;
                var html = "<div>";
                for(var i=0;i< arrayOfItems.length; i++){
                    html += "<a class='noStyle' target='_blank' href='"+arrayOfItems[i].ClickUrl+"'><div class='yqlelement'><h1>"+arrayOfItems[i].Title+"</h1><h3>"+arrayOfItems[i].Address+", "+arrayOfItems[i].City+", "+arrayOfItems[i].State+"</h3><h4>Phone: "+arrayOfItems[i].Phone+"</h4></div></a>";
                }
                html+="</div>";
                $("#dataFromYelp").html(html);
                
            });
        });
    });

}


function loadGroupon(){

    $.get("groupon.html", function(data){
        $("#mainContainer").html(data);
        $.get("http://api.bestbuy.com/beta/products/trendingViewed?apiKey=t8k7uptcxtdk9j9szvn5xhsa", function(grouponData){
            var arrayOfDeals = grouponData.results;
            var html = '<div class="row">';
            for(var i=0; i<arrayOfDeals.length;i++){
            
                html += '<div class="imagesDiv"><img width="100" src="'+arrayOfDeals[i].images.standard+'" alt=""><h4>'+arrayOfDeals[i].names.title+'</h4><p><span style="color:red">'+arrayOfDeals[i].prices.current+'</span> - '+arrayOfDeals[i].prices.regular+' = <span style="color:green">'+arrayOfDeals[i].customerReviews.averageScore+'</span></p></div>';
            
            }
            html += '</div>';
            $("#grouponDeals").html(html);
        });
    });
    
   

}


loadGroupon();



function drawItems(searchURL){
    window.scrollTo(0,0);
    $.get(searchURL, function(data){
        var arrayOfItems = data.data;
        console.log(arrayOfItems);
        
        var html = '<div class="row" id="resultInstagram">';
        for(var i=0; i<arrayOfItems.length;i++){
            
            html += '<div class="imagesDiv"><a href="#"><img src="'+arrayOfItems[i].images.low_resolution.url+'" alt=""></a><h3><a href="#">'+arrayOfItems[i].user.username+'</a></h3><p>'+arrayOfItems[i].user.full_name+'</p></div>';
            
        }
        
        html += '<div class="imagesDiv"><button id="nextPage">Next Page</button></div></div>';
        $("#imagesFromInsta").html(html);
        
        $("#nextPage").click(function(){
            var nextPageURL = data.pagination.next_url;
            drawItems(nextPageURL);
            
        });
        
    });
    
}



