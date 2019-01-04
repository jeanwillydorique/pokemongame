


$(document).ready(function(){

    let playerPokemon = localStorage.getItem("playerPokemons")
    let decodePlayerPokemon = JSON.parse(playerPokemon)
    let parent = $('.playerPokemonList')

    let IAPokemon = localStorage.getItem("IAPokemons")
    let decodeIAPokemon = JSON.parse(IAPokemon)
    let IAparent = $('.IAPokemonList')

    let damage = 0;



    displayPokemon(decodePlayerPokemon, parent) 
    displayPokemonIA(decodeIAPokemon, IAparent)    


    $('.movesPokemon').click(function(el){

        let screenPlay = $('.screen')  

        let attacker = el.target.parentElement.parentElement
    
        screenPlay.html("Quel est votre cible ?")
        
            $('.IAPokemonList').click(function(el){

                    // vider screen 

                    let target = el.target.parentElement
                    let searchPokemon = attacker
                    let searchText = searchPokemon.firstElementChild.innerText

                    let attValue
                    let defValue 

                    // puissance attaque 

                    let playerPokemon = localStorage.getItem("playerPokemons")
                    let decodePlayerPokemon = JSON.parse(playerPokemon)

                    decodePlayerPokemon.forEach(element => {
                        if (element[0] === searchText ) {
                            attValue = element[6][1][1]
                        }
                    });

                    // puissance defense 

                    let IAPokemon = localStorage.getItem("IAPokemons")
                    let decodeIAPokemon = JSON.parse(IAPokemon)
                    let searchTextIA = target.firstElementChild.innerText

                    decodeIAPokemon.forEach(element => {
                        if (element[0] === searchTextIA ) {
                            defValue = element[6][1][1]
                        }
                    });

                    // récupération des PV

                    let PVTarget = target.childNodes[2].innerText

                    // calcul des dégats 

                    damage = attValue - defValue  

                    if (damage > 0) {
                            //console.log(damage)
                            newPV = PVTarget - damage
                            //console.log(newPV)
                            hp = target.childNodes[2]
                            if (newPV > 0) {
                                hp.innerHTML = " ";
                                hp.append(newPV)
                            } else {
                                hp.innerHTML = " ";
                                hp.append("KO !!!!!!")
                            }
                    } else {
                        newDamage = Math.round(damage * -1 / 2)
                        //console.log(newDamage)
                        newPV = PVTarget - newDamage
                        //console.log(newPV)
                        hp = target.childNodes[2]
                        if (newPV > 0) {
                            hp.innerHTML = " ";
                            hp.append(newPV)
                        } else {
                            hp.innerHTML = " ";
                            hp.append("KO !!!!!!")
                        }
                    } 
  
                })

    })








})


function displayPokemon(decode, parent){

    decode.forEach(element => {

        let pokemonDIV = $('<div></div>')
        pokemonDIV.addClass('stylecenter')
        let pokemonPlayerDIV = parent

        let namePokemon = $('<div class="namePokemon"></div>')
        namePokemon.addClass('stylecenter')
        let imgPokemon = $('<div class="imgPokemon"></div>')
        imgPokemon.addClass('stylecenter')
        let hpPokemon = $('<div class="hpPokemon"></div>')
        hpPokemon.addClass('stylecenter')
        let movesPokemon = $('<div class="movesPokemon"></div>')
        movesPokemon.addClass('stylecenter')

        namePokemon.append(element[0])

        let url = element[1]
        let img = $('<img class="pokemonIMG">') //Equivalent: $(document.createElement('img'))
        img.attr('src', url)
        img.appendTo(imgPokemon)

        let stats = element[6]
        let hp = stats[2]

        hpPokemon.append(hp[1])

        let attack = $('<div></div>')
        attack.append("Attaque")
        attack.appendTo(movesPokemon)

        // let attack1 = $('<div></div>')
        // attack1.addClass('borderattack')
        // attack1.append(element[2])
        // attack1.appendTo(movesPokemon)

        // let attack2 = $('<div></div>')
        // attack2.addClass('borderattack')
        // attack2.append(element[3])
        // attack2.appendTo(movesPokemon)

        // let attack3 = $('<div></div>')
        // attack3.addClass('borderattack')
        // attack3.append(element[4])
        // attack3.appendTo(movesPokemon)

        // let attack4 = $('<div></div>')
        // attack4.addClass('borderattack')
        // attack4.append(element[5])
        // attack4.appendTo(movesPokemon)

        pokemonDIV.append(namePokemon)
        pokemonDIV.append(imgPokemon)
        pokemonDIV.append(hpPokemon)
        pokemonDIV.append(movesPokemon)

        pokemonPlayerDIV.append(pokemonDIV)

    });

}

function displayPokemonIA(decode, parent){

    decode.forEach(element => {

        let pokemonDIV = $('<div></div>')
        pokemonDIV.addClass('stylecenter')
        let pokemonPlayerDIV = parent

        let namePokemon = $('<div class="namePokemon"></div>') 
        namePokemon.addClass('stylecenter')
        let imgPokemon = $('<div class="imgPokemon"></div>')
        imgPokemon.addClass('stylecenter')
        let hpPokemon = $('<div class="hpPokemon"></div>')
        hpPokemon.addClass('stylecenter')
        let movesPokemon = $('<div class="movesPokemon"></div>')
        movesPokemon.addClass('stylecenter')

        namePokemon.append(element[0])

        let url = element[1]
        let img = $('<img class="pokemonIMG">') //Equivalent: $(document.createElement('img'))
        img.attr('src', url)
        img.appendTo(imgPokemon)

        let stats = element[6]
        let hp = stats[2]

        hpPokemon.append(hp[1])


        // let attack1 = $('<div></div>')
        // attack1.addClass('borderattack')
        // attack1.append(element[2])
        // attack1.appendTo(movesPokemon)

        // let attack2 = $('<div></div>')
        // attack2.addClass('borderattack')
        // attack2.append(element[3])
        // attack2.appendTo(movesPokemon)

        // let attack3 = $('<div></div>')
        // attack3.addClass('borderattack')
        // attack3.append(element[4])
        // attack3.appendTo(movesPokemon)

        // let attack4 = $('<div></div>')
        // attack4.addClass('borderattack')
        // attack4.append(element[5])
        // attack4.appendTo(movesPokemon)

        pokemonDIV.append(namePokemon)
        pokemonDIV.append(imgPokemon)
        pokemonDIV.append(hpPokemon)
        pokemonDIV.append(movesPokemon)

        pokemonPlayerDIV.append(pokemonDIV)

    });

}


    
//function choiseTarget(attacker){
    // $('.IAPokemonList').click(function(el){

    //     let target = el.target.parentElement
    //     let searchPokemon = attacker
    //     let searchText = searchPokemon.firstElementChild.innerText

    //     let attValue
    //     let defValue 
    //     let PVTarget

    //     // puissance attaque 

    //     let playerPokemon = localStorage.getItem("playerPokemons")
    //     let decodePlayerPokemon = JSON.parse(playerPokemon)

    //     decodePlayerPokemon.forEach(element => {
    //         if (element[0] === searchText ) {
    //             attValue = element[6][1][1]
    //         }
    //     });

    //     // puissance defense 

    //     let IAPokemon = localStorage.getItem("IAPokemons")
    //     let decodeIAPokemon = JSON.parse(IAPokemon)
    //     let searchTextIA = target.firstElementChild.innerText

    //     decodeIAPokemon.forEach(element => {
    //         if (element[0] === searchTextIA ) {
    //             defValue = element[6][1][1]
    //             PVTarget = element[6][2][1]
    //         }
    //     });

    //     // calcul des dégats 

    //     damage = attValue - defValue

    //     if ( damage > 0) {                
    //         newPV = PVTarget - damage
    //     } else {
    //         newPV = PVTarget - 1
    //     }
    // })
//}