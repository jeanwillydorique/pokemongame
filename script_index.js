
// // récuperation des données 

// function getNumber(){
//     let parameter = document.querySelector('.parameter');   
//     return parameter.value;
// }


// // requete classique en native
// function getPokemon($number) {
//     fetch('https://pokeapi.co/api/v2/pokemon/' + $number + '/')
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         // let moves = data.moves;

//         // moves.forEach(element => {
//         //     let moves = document.querySelector('.moves');
//         //     let li = document.createElement("li"); 
//         //     let ul = document.createElement("ul"); 

//         //     li.innerHTML = element.move.name;
//         //     ul.appendChild(li);
//         //     moves.appendChild(ul);          
//         // });
//         document.querySelector('.pokeName').innerHTML = data.name;
//     })
// }

// // ou bien en 
// //     function getPokemon(number) {
// //     fetch(`https://pokeapi.co/api/v2/pokemon/${number}/`)
// //     .then(function(response){
// //         return response.json();
// //     })
// //     .then(function(data){
// //         debugger;
// //     })
// // }

// document.querySelector('.ok1').addEventListener('click', function(){
//     let $number = getNumber();
//     getPokemon($number);  
// });



// // Jquery 
// // $() = équivalent querySelector

// // function 
// function getPokemonJQuery($number){
//     $.get('https://pokeapi.co/api/v2/pokemon/' + $number + '/' , function(data){
//         $('.pokeName2').html(data.name);
//     })
// };

// function getPokemonDraftJQuery($number){
//     $.get('https://pokeapi.co/api/v2/pokemon/' + $number + '/' , function(pokemon){
//         debugger;
//     })
// }

// function getNumberJQuery(){
//     return parameter2 = $('.parameter2').val(); 
// }



// $(document).ready(function(){
//     $('.ok2').click(function(){
//         let number = getNumberJQuery();
//         getPokemonJQuery(number)
//     })
// })





// draft 

let min = 1
let max = 150
let playerPokemons = []
let IAPokemons = []
let i = 1


IApokemon()
 



$(document).ready(function(){

    $('.buttonDraft').click(function(el){
        let playerPokemon = []
        let parent = el.target.parentElement;
        let number = getRandomNumber(min, max);

        // disparition button 

        $(this).addClass('hidden');
        //$(parent).addClass('flipped');


        $.get('https://pokeapi.co/api/v2/pokemon/' + number + '/' , function(pokemon){

        //debugger

            // nom  

            playerPokemon.push(pokemon.name)

            let titre = $('<h1 class="pokemonName"></h1>');
            titre.append(pokemon.name);
            titre.appendTo(parent);

            // image 
            

            let probaShiny = Math.round(Math.random() * (5 - 1) + 1);
            if ( probaShiny === 5 ) {
                let url = pokemon.sprites.front_shiny;
                let img = $('<img class="pokemonIMG">'); //Equivalent: $(document.createElement('img'))
                img.attr('src', url);
                img.appendTo(parent);
                playerPokemon.push(pokemon.sprites.front_shiny)
            } else {
                let url = pokemon.sprites.front_default;
                let img = $('<img class="pokemonIMG">'); //Equivalent: $(document.createElement('img'))
                img.attr('src', url);
                img.appendTo(parent);
                playerPokemon.push(pokemon.sprites.front_default)
            }

            // move

            let moveNumber = pokemon.moves.length;
            let movesDIV = $('<div class="moves"></div>');
            let movesName = $('<div class="movesName"></div>');
            let movesDIVTitle = $('<h3> Moves </h3>');

            let n1 = Math.round(Math.random() * (moveNumber - 1) + 1);
            let n2 = Math.round(Math.random() * (moveNumber - 1) + 1);
            let n3 = Math.round(Math.random() * (moveNumber - 1) + 1);
            let n4 = Math.round(Math.random() * (moveNumber - 1) + 1);

            let move1 = $('<p class="pokemonMove"></p>');
            let move2 = $('<p class="pokemonMove"></p>');
            let move3 = $('<p class="pokemonMove"></p>');
            let move4 = $('<p class="pokemonMove"></p>');

            playerPokemon.push(pokemon.moves[n1].move.name, pokemon.moves[n2].move.name, pokemon.moves[n3].move.name, pokemon.moves[n4].move.name)

            move1.append(pokemon.moves[n1].move.name);
            move2.append(pokemon.moves[n2].move.name);
            move3.append(pokemon.moves[n3].move.name);
            move4.append(pokemon.moves[n4].move.name);


            move1.appendTo(movesName);
            move2.appendTo(movesName);
            move3.appendTo(movesName);
            move4.appendTo(movesName);

            movesDIV.append(movesDIVTitle);
            movesDIV.append(movesName);
            movesDIV.appendTo(parent);


            //stats

            let stats = pokemon.stats
            let pokemonStats = []

            let statDIVValue = $('<div class="stat"></div>')
            let statDIV = $('<div class="stat"></div>')


            statDIV.append('<h3> Stats </h3>')
            statDIV.append(statDIVValue)
            statDIV.appendTo(parent);

            stats.forEach(element => {

                if (element.stat.name === "defense" || element.stat.name === "attack" || element.stat.name === 'hp') {
                    
                    let pokemonStat = []

                    let statName = element.stat.name
                    let statValue = element.base_stat
    
                    let stat =  $('<p class="pokemon' + statName + '"></p>')
                    
                    stat.append(statName)
                    stat.append(' =' + statValue)
    
                    stat.appendTo(statDIVValue)

                    pokemonStat.push(statName, statValue)
                    pokemonStats.push(pokemonStat)
                }
            })
            playerPokemon.push(pokemonStats)
        // enregistrement des infos 
        playerPokemons.push(playerPokemon);

        })

    })

    $('.next').click(function(){
        let IAData = JSON.stringify(IAPokemons)
        let playerData = JSON.stringify(playerPokemons)
        localStorage.setItem("playerPokemons",playerData)
        localStorage.setItem("IAPokemons",IAData)
        window.location.href = "./play.html";
    })

})


function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min);
}


function IApokemon(){
    for (var i = 0; i < 6; i++) {
        let number = getRandomNumber(min, max) 
        requestPokemon(IAPokemons, number)
    }   
};


function requestPokemon(IAPokemons, number){

    $.get('https://pokeapi.co/api/v2/pokemon/' + number + '/', function(pokemon) {

        let IAPokemon = []
    

            // nom  
            IAPokemon.push(pokemon.name)
            // image 
            

            let probaShiny = Math.round(Math.random() * (5 - 1) + 1);
            if ( probaShiny === 5 ) {
                let url = pokemon.sprites.front_shiny;
                IAPokemon.push(pokemon.sprites.front_shiny)
            } else {
                let url = pokemon.sprites.front_default;
                IAPokemon.push(pokemon.sprites.front_default)
            }

            // move

            let moveNumber = pokemon.moves.length;

            let n1 = Math.round(Math.random() * (moveNumber - 1) + 1);
            let n2 = Math.round(Math.random() * (moveNumber - 1) + 1);
            let n3 = Math.round(Math.random() * (moveNumber - 1) + 1);
            let n4 = Math.round(Math.random() * (moveNumber - 1) + 1);

            IAPokemon.push(pokemon.moves[n1].move.name, pokemon.moves[n2].move.name, pokemon.moves[n3].move.name, pokemon.moves[n4].move.name)


            //stats

            let stats = pokemon.stats
            let pokemonStats = []

            stats.forEach(element => {

                if (element.stat.name === "defense" || element.stat.name === "attack" || element.stat.name === 'hp') {
                    
                    let pokemonStat = []

                    let statName = element.stat.name
                    let statValue = element.base_stat

                    pokemonStat.push(statName, statValue)
                    pokemonStats.push(pokemonStat)
                }
            })
            IAPokemon.push(pokemonStats)
        // enregistrement des infos
            IAPokemons.push(IAPokemon)
    })
}