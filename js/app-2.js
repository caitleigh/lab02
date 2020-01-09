'use strict';
// Using code from Lab 02 as a starting point //
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

// Below is our render function using Handlebars

Horns.prototype.render = function () {
    var source = $('#entry-template-2').html();
    var template = Handlebars.compile(source);
    return template(this);
};

Horns.readJson = () => {
    // $("#photo-template").replaceWith("");
    $.ajax('data/page-2.json', 'json')
        .then(data => {
            data.forEach(item => {
                let horns = new Horns(item);
                let hornsRendered = horns.render();
                $('#renderedHorns-2').append(hornsRendered);
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
    const selectEl = $('#select-keyword-2');
    dropdownArray.forEach(keyword => {
        const $optionEl = $(`<option value=${keyword}>${keyword}</option>`)
        selectEl.append($optionEl);
    })
};
  
// Below is our eventhandler for changing on selection

  $('#select-keyword-2').on('change', keywordFilter);

// Below is our function for hiding all the objects and showing only selected keyword objects

function keywordFilter() {
    $('h2').hide();
    $('img').hide();
    $('p').hide();
    let selectedKeyword = $(this).val();
    $(`.${selectedKeyword}`).show();
};