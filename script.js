//doubts return back
//doubt filter
//loading doubt


document.getElementById('button').addEventListener('click',getdata);




let usersdata=[];
let filtered_data = [];
let current=1;//so that main baad main chahun toh i can reassign a value
const perpg=4;//should remain constant no matter what

function getdata(){

    if (localStorage.getItem('usersdata')) {
        usersdata = JSON.parse(localStorage.getItem('usersdata'));//string to js object
        //console.log('Data loaded from localStorage');
        // displayuser(usersdata);
        pagination();
    } else {
        // If no data in localStorage, fetch it from API
        fetching();
    }

   // fetching();
}


function fetching(){
    document.getElementById('loading').style.display = 'block';
return new Promise( function(resolve,reject){//resolve se idhar aayega aur fir getdata ke paas jaayega{  
    fetch('https://randomuser.me/api/?results=500')

    .then(function(response){
        if(response.ok){//means if fetch has been resolved
        return response.json();}
        else{
            reject("failed to fetch data");// converted to json format jisse we can work on the data
    }})

   .then(function(data){
    // console.log(data);
    usersdata=data.results;//results main profiles hain
    // console.log(usersdata);

//newly added
    localStorage.setItem('usersdata', JSON.stringify(usersdata));//stringify converts arrays or objects into strings becoz local storage deals with string values only
    document.getElementById('loading').style.display = 'none';
    pagination();
    //  let all=data.results;
     //in the data only resluts has been mentioned
     resolve(usersdata);//resolve is called and data obtained is passed
    })

   .catch(function(error){
    document.getElementById('loading').style.display = 'none';//agar during the process of fetching error occurs
    reject(error);//rejects the promise

});
// .finally(function(){
// console.log("fetching done");
// });
});
}

function displayuser(currentdisplay){
  
    const contain=document.getElementById("list");
    contain.innerHTML = '';
    
    for(let i=0;i<currentdisplay.length;i++)
    {
        const user=currentdisplay[i];
        contain.innerHTML+=`
    

    
    <div class="profiles">
<img src="${user.picture.medium}" >
<h3> ${user.name.first} ${user.name.last}</h3> 


<button class="newbutton" onclick="storedetails(${i})">SHOW MORE DETAILS</button>
</div>
`;//semi colon for contain waali line
}//for ka bracket
}//display user ka bracket

// function displaydetails( firstname,lastname,age,phone,city,country,gender,email)
// {
//   alert(
//     'Name: ' + firstname + ' ' + lastname +'\n'+
//        'Age: ' + age + '\n' +
//         'Phone: ' + phone +'\n' +
//             'Location: '+ city +', ' + country +'\n'+
//             'Gender: '+ gender +'\n' +
//             'Email: ' + email
//   ) 
// }
function storedetails(index){
    const userd=usersdata[index];
    localStorage.setItem('selecteduser',JSON.stringify(userd));
window.location.href="details.html";//redirects to a new webpage ,adds an item in the history
                                    //window.loaction also works
}


function pagination(){
    const dataToDisplay = filtered_data.length > 0 ? filtered_data : usersdata;
    const reqpages = Math.ceil(dataToDisplay.length / perpg);
    // const reqpages=Math.ceil(usersdata.length/perpg);//means total no. of users divides by user no displayed per page,had we taken floor then there are chances of loosing some profiles
const start=(current-1)*perpg;
const end=start+perpg;//end would become 4 
//we need to display from start to end on page
const currentdisplay=dataToDisplay.slice(start,end);// 0 1 2 3 

displayuser(currentdisplay);
  update(reqpages);
}

function prevPage() {
    if (current > 1) {
        current--;
        pagination(); // Call pagination to update the display
    }
}

function nextPage() {
    if (current < Math.ceil(usersdata.length / perpg)) {
        current++;
        pagination(); // Call pagination to update the display
    }
}

 function update(reqpages)
{
    const paginationControls = document.getElementById('pagecontrols');
paginationControls.innerHTML = '';// old buttons removed

//adding a previous button
if (current > 1)//mtlb prev page available 
{
    paginationControls.innerHTML += `<button id="previous" onclick="prevPage()">Previous</button>`;
}


if (current < reqpages)//means next page available 
{
    paginationControls.innerHTML += `<button id="next" onclick="nextPage()">Next</button>`;


}
}

document.getElementById('filterbutton').addEventListener('click', filterusers);
function filterusers(){

//includesreturns true if a particular string is present in a a string and yesss it is case sensitive
    const namefilter=document.getElementById('namefilter').value.toLowerCase();
    const genderfilter = document.getElementById('genderfilter').value;
    const agefilter = document.getElementById('agefilter').value;
   
   
   
    filtered_data = usersdata.filter(user => {

        const userAge = user.dob.age;
        const userGender = user.gender.toLowerCase();

        // Name Filter (includes checks for both first and last name)
        const nameMatch = user.name.first.toLowerCase().includes(namefilter) || 
                          user.name.last.toLowerCase().includes(namefilter);

        // Gender Filter (empty genderfilter means 'all' genders are selected)
        const genderMatch = !genderfilter || userGender === genderfilter;

        // Age Filter
        let ageMatch = true;
        if (agefilter === "18-25") {
            ageMatch = userAge >= 18 && userAge <= 25;
        } else if (agefilter === "26-35") {
            ageMatch = userAge >= 26 && userAge <= 35;
        } else if (agefilter === "36-45") {
            ageMatch = userAge >= 36 && userAge <= 45;
        } else if (agefilter === "46+") {
            ageMatch = userAge >= 46;
        }

        return nameMatch && genderMatch && ageMatch;


        // const namematch= user.name.first.toLowerCase().includes(namefilter) || 
        // user.name.last.toLowerCase().includes(namefilter);

   
  
    });
    

    //after filter application new page should become therefore
    current=1;
   
    pagination();//to recalculate the no of pages for the filtered data

    }





//filter
