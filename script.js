document.getElementById('button').addEventListener('click',getdata);




let usersdata=[];
let current=1;//so that main baad main chahun toh i can reassign a value
const perpg=4;//should remain constant no matter what

function getdata(){
    fetching();
}


function fetching(){
return new Promise( function(resolve,reject){//resolve se idhar aayega aur fir getdata ke paas jaayega{  
    fetch('https://randomuser.me/api/?results=500')

    .then(function(response){//means if fetch has been resolved
        return response.json();// converted to json format jisse we can work on the data
    })

   .then(function(data){
    // console.log(data);
    usersdata=data.results;//results main profiles hain
    console.log(usersdata);



    //  let all=data.results;
     //in the data only resluts has been mentioned
     displayuser();
    //  resolve(usersdata);//resolve is called and data obtained is passed
    })

   .catch(function(error){//agar during the process of fetching error occurs
    reject("error found:",error);//rejects the promise

})
// .finally(function(){
// console.log("fetching done");
// });
})
}

function displayuser(){
  
    const contain=document.getElementById("list");
   
    for(let i=0;i<usersdata.length;i++)
    {
        const user=usersdata[i];
        contain.innerHTML+=`
     

    
    <div class="profiles">
<img src="${user.picture.medium}" >
<h3> ${user.name.first} ${user.name.last}</h3> 

<button class="newbutton" onclick="displaydetails(  '${user.name.first}', '${user.name.last}', ${user.dob.age}, '${user.phone}', '${user.location.city}', '${user.location.country}', '${user.gender}', '${user.email}' )"> SHOW MORE DETAILS</button>
</div>
`;//semi colon for contain waali line
}//for ka bracket
}//display user ka bracket

function displaydetails( firstname,lastname,age,phone,city,country,gender,email)
{
  alert(
    'Name: ' + firstname + ' ' + lastname + '\n' +
       'Age: ' + age + '\n' +
        'Phone: ' + phone + '\n' +
            'Location: ' + city + ', ' + country + '\n' +
            'Gender: ' + gender + '\n' +
            'Email: ' + email
  ) 
}

function pagination(){
    const reqpages=Math.ceil(usersdata.length/perpg);
}

//   <div class="">

    //  <img src=" "alt="">
    //  <h3> </h3>
    //  button oncl
    // </div>
// <body>
// <header>
//         <div class="heading"></div>
//      </header>






