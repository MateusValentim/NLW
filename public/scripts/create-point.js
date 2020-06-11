
function populatesUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res =>  res.json() )
    .then (states => {
        
        for ( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
        
     })
}

 populatesUFs();

 function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    //const stateInput = document.querySelector("select[name=state]")

    const ufValue = event.target.value
    
    //const indexOfSelectedState = event.target.selectedIndex
    //stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"//ao alterar o estado o conteudo é limpo e é retornado as cidades do estado escolhido sem ter que dar um f5 
    citySelect.disabled = true

    fetch(url)
        .then (res => res.json())
        .then(cities => {
            for (const city of cities) {
                

                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
                citySelect.disabled = false

        })

    }
 

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem) //adicionando uma callbackFunction para ser executada apenas quando o click for executado

}

const collectedItems = document.querySelector("input [name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target 
    // adicionar ou remover uma classe com js
    //itemLi.classList.add("selected")
    //itemLi.classList.remove("selected")
    
    itemLi.classList.toggle("selected") // Toggle adiciona ou remove a classe 
    
    const itemId = event.target.dataset.id

    console.log("ITEM ID:", itemId)

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // retorna true ou false 
        return itemFound
    })
        //console.log(alreadySelected)
    // se já estiver selecionado, 
    if(alreadySelected >= 0 ){
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }
    else {
        // se não estiver selecionado, 
        //adicionar a seleção
        selectedItems.push(itemId)
    }
    console.log(selectedItems)
    
    // atualizar o campo escondido, com os itens selecionados
    collectedItems.value = selectedItems
}
