'use strict';

//Using demo from class on Jan 7th as reference // 

let allHorns = [];

let dropdownArray = [];

function Horns(horns){
    this.image_url = horns.image_url;
    this.title = horns.title;
    this.description = horns.description;
    this.keyword = horns.keyword;
    this.horns = horns.horns;
    allHorns.push(this);
}

Horns.prototype.render = function () {
    let $hornsClone = $('#photo-template').clone();
    $('main').append($hornsClone);
    $hornsClone.find('h2').text(this.title);
    $hornsClone.find('img').attr('src', this.image_url);
    $hornsClone.find('p').text(this.description);
    $hornsClone.attr('class', this.keyword);
    // $hornsClone.attr('class', this.horns);
};

Horns.readJson = () => {
    // $("#photo-template").replaceWith("");
    $.ajax('data/page-1.json', 'json')
        .then(data => {
            data.forEach(item => {
                let horns = new Horns(item);
                horns.render();
            });
            generateUniqueKeywords();
            populateDropdown();
        })
};

$(() => Horns.readJson());


// Below is our function for generating unique keywords for the menu. Wed's code review was referenced.

function generateUniqueKeywords() {
    allHorns.forEach(animal => {
        if(!dropdownArray.includes(animal.keyword)){
            dropdownArray.push(animal.keyword);
        }
    })
}

// Below is our function for populating our dropdown. Wed's code review was referenced.

function populateDropdown() {
    const selectEl = $('#select-keyword');
    dropdownArray.forEach(keyword => {
        const $optionEl = $(`<option value=${keyword}>${keyword}</option>`)
        selectEl.append($optionEl);
    })
};
  
// Below is our eventhandler for changing on selection

  $('#select-keyword').on('change', keywordFilter);

// Below is our function for hiding all the objects and showing only selected keyword objects

function keywordFilter() {
    $('section').hide();
    let selectedKeyword = $(this).val();
    $(`.${selectedKeyword}`).show();
};