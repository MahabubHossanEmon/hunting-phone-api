const loadPhone = async (searchText='13',isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json();
    const phones = data.data;

    // console.log(phones);

    displayPhones(phones,isShowAll);
}

const displayPhones = (phones,isShowAll) =>{

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent='';

    const showAllContainer = document.getElementById('show-all-container');
  if(phones.length>12 && !isShowAll){
    showAllContainer.classList.remove('hidden');
  }
  else{
    showAllContainer.classList.add('hidden');
  }

  // console.log('is show all',isShowAll);
      //display only first 12 show
     if(!isShowAll){
      phones = phones.slice(0,12);
     }

    phones.forEach( phone => {
        // console.log(phone);

        //1 .creat a div
        const phoneCard = document.createElement('div');
        phoneCard.classList =`card w-80 bg-base-100 shadow-xl mt-8 pt-12`;
        phoneCard.innerHTML=`
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary ">show Details</button>
          </div>
        </div>
      </div>
        `

        phoneContainer.appendChild(phoneCard);
    })

    toggleLoadingSpinner(false);
}

const handleShowDetail =async (id) =>{
// console.log('clickd',id);
//load single phone data
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
const data = await res.json();
const phone = data.data;

showPhoneDetails(phone)

}


const showPhoneDetails =(phone) =>{
  console.log(phone);
  const phoneName = document.getElementById('show-details-phone-name');
  phoneName.innerText = phone.name;
  // show the modal
  show_details_modal.showModal()
}

//handle search button
const handleSearch = (isShowAll) =>{
  toggleLoadingSpinner (true);
  const searchField = document.getElementById('search-feild');
  const searchText = searchField.value;
  
  loadPhone(searchText,isShowAll);
// searchField.value='';
}


// const handleSearch2 = () =>{
//   toggleLoadingSpinner (true);
//   const searchField = document.getElementById('search-feild2');
//   const searchText = searchField.value;
//   loadPhone(searchText);
//   searchField.value='';
// }


const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
}

//handle show all
const handleShowAll = () =>{
   handleSearch(true);
}

loadPhone();