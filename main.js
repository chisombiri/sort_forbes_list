const dragList = document.querySelector('#drag-list');
const check = document.querySelector('#check');

const richMen = [
    'Elon Musk',
    'Jeff Bezos',
    'Bernard Arnault and Family',
    'Bill Gates',
    'Warren Buffet',
    'Larry Page',
    'Sergey Brin',
    'Larry Ellison',
    'Steve Ballmer',
    'Gautam Adani and Family'
];

const listItems = [];
let startIndex;


//This function Creates random lists
//This function also has all the event listener functions passed into it
const createList = () => {
    [...richMen]
    .map(a => ({value: a, sort: Math.random()}))
    .sort((a,  b) => {return a.sort - b.sort})
    .map(a => a.value)
    .forEach((person, index) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fa fa-bars"></i>
        </div>
        `;
        listItems.push(listItem);

        dragList.appendChild(listItem);
    })

    addEventListeners();
}

createList();

//The individual functions for all the event listeners
function dragStart(){
    startIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e){
    e.preventDefault();
}

function drop(){
    const endIndex = +this.getAttribute('data-index');
    swapItems(startIndex, endIndex)

    this.classList.remove('over');
}

function dragEnter(){
    this.classList.add('over');
}

function dragLeave(){
    this.classList.remove('over');
}

//This funtion should swap the drag and drop list items
function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

//This function checks the order of shuffled list items, relative to original list
const checkOrder = () => {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richMen[index]){
            listItem.classList.add('wrong');
        }else{
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

//This function listens for all the event listeners
//first event listener is on the draggable class only
//Second event listener is one the Li element which was created
function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.drag-list li');

    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', dragStart);
    })

    dragListItems.forEach((item) => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', drop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}

check.addEventListener('click', checkOrder);