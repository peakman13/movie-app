const container  = document.querySelector(".container");
const seats = document.querySelectorAll(".seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");


getLocal();
calculateTotal();



container.addEventListener("click", (e)=> {
    if (e.target.classList.contains("seat") &&!e.target.classList.contains("sold")) {
        e.target.classList.toggle("selected");
        calculateTotal();
    }
});

movieSelect.addEventListener("change", (e)=> calculateTotal());

function calculateTotal(){
    const selectedSeats= document.querySelectorAll(".seat.selected");
    let selectedcount = selectedSeats.length;
    count.innerText = selectedcount;
    total.innerText = selectedcount* movieSelect.value;

    const selectedSeatArr =[];
    const seatsArr= [];

    selectedSeats.forEach(function(seat){
        selectedSeatArr.push(seat);
    })
    
    seats.forEach((seat)=>seatsArr.push(seat));
    
    let selectedSeatIndexs = selectedSeatArr.map(function(seat){
        return seatsArr.indexOf(seat);
    })
    saveLocal (selectedSeatIndexs);

}


function getLocal(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selecMovieIn = localStorage.getItem('selecMovieIn');
    
    if(selectedSeats !=null && selectedSeats.length >0){
        seats.forEach(function(seat, index)
        {
            if (selectedSeats.indexOf(index)> -1) {
                seat.classList.add('selected');
            }
        })
    }

    if(selecMovieIn !=null){
        movieSelect.selectedIndex = selecMovieIn;
    }

}

function saveLocal (i){
    localStorage.setItem("selectedSeats", JSON.stringify(i));
    localStorage.setItem("selecMovieIn", movieSelect.selectedIndex);
}

