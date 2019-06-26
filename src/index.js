console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
//provides random color id every time it is run
function randomColor(){
    return Math.floor(Math.random()*16777215).toString(16);
}

document.addEventListener('DOMContentLoaded',function(){



    //to put pictures of the doggos
    let picture_container = document.querySelector('#dog-image-container')

    function imageCreator(dog_url){
        let dog_img = document.createElement('img')
        dog_img.src = dog_url
        picture_container.append(dog_img)
    }

    fetch(imgUrl).then(function(response){
        return response.json()
    }).then(function(info){
        info.message.forEach(imageCreator)
    })



    //finds list to put breeds in
    let breeds_list = document.querySelector('#dog-breeds')

    //function for breeds that don't have multiple types
    function breedcreator(breed){
        let item = document.createElement('li')
        item.innerText = breed

        //given color changing powers
        color_clicker(item)
        breeds_list.append(item)
    }

    //function for breeds that have multiple types
    function multibreedcreator(breed,options){

        //create li for breed
        let item = document.createElement('li')
        item.innerText = breed

        //given color changing powers
        color_clicker(item)

        //create list for the types for that breed
        let item_list = document.createElement('ul')

        //function to create a list item of each type for a breed
        //and put them into the created list
        options.forEach(function(type){
            let type_item = document.createElement('li')
            type_item.innerText = type

            //given color changing powers
            color_clicker(type_item)
            item_list.append(type_item)
        })

        //puts type list into breed list item
        item.append(item_list)
        breeds_list.append(item)
    }

    //fetches all the breeds
    function fetcher(){
        fetch(breedUrl).then(function(response){
            return response.json()
        }).then(function(info){
            for(let [key,value] of Object.entries(info.message)){
                //only puts list items for breeds that start with letter that user wants
                if( key[0] == sortValue || "all" == sortValue ){
                    if(value.length == 0){
                        breedcreator(key)
                    }else{
                        multibreedcreator(key,value)
                    }  
                }  
            }
        })
    }
    fetcher()

    //adds click option that changes the color of whatever is passed
    function color_clicker(list_item){
        list_item.addEventListener('click',function(e){
            e.preventDefault()
            list_item.style.color = `#${randomColor()}`
        })
    }


    //grab select box
    let breedSort = document.querySelector('#breed-dropdown')
    let sortValue = "all"

    //event listener for sort box
    breedSort.addEventListener('change',function(e){
        e.preventDefault()
        
        //clears current list
        breeds_list.innerText = ""
        sortValue = breedSort.value

        //repopulates with desired list
        fetcher()
    })
    

})
