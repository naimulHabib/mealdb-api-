const searchFood = async () =>{
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    if(inputText == ""){

    }else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`
        inputField.value = ''
        const res = await fetch(url)
        const data = await res.json()
        displaySearchResult(data.meals)
        // fetch(url)
        // .then(res => res.json())
        // .then(data => displaySearchResult(data.meals))
    }

}
 const displaySearchResult = meals =>{
    //  console.log(meals);
     const searchResult = document.getElementById('search-result');
     if(meals.length == 0){
        const div = document.createElement('div');
        const p = document.createElement('p')
        p.innerText = " Please Write something on Search Bar"
        searchResult.appendChild(p);
    }else{
        searchResult.innerHTML = ""
        meals.forEach(meal =>{
       
               const div = document.createElement('div')
               div.classList.add('col')
               div.innerHTML = `
               <div onclick="loadMealDetail(${meal.idMeal})" class="card">
                  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                      <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
                      </div>
             </div>
               
               `
               searchResult.appendChild(div)
            
           
        })
       }  
    }
     
 const loadMealDetail = (mealId) =>{
     const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    //  console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data =>displayMealDetail(data.meals[0]))
 }
 const displayMealDetail = meal =>{
     const mealDetail = document.getElementById('meal-details');
     mealDetail.textContent = ''
     const div = document.createElement('div');
     div.classList.add('card');
     div.innerHTML = ''
     div.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
                     <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
                </div>
     `
      mealDetail.appendChild(div)
 }