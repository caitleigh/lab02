'use strict';

//Using demo from class on Jan 7th as reference // 

let allHorns = [];

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
            populateDropdown();
        })
};

$(() => Horns.readJson());


// Below function based on Shopping Cart lab from 201. It populates our dropdown menu

function populateDropdown() {
    var selectElement = document.getElementById('select-keyword');
    allHorns.forEach((horn, i) => {
      var opt = document.createElement('option');
      opt.innerHTML = horn.keyword;
      selectElement.appendChild(opt);
      opt.value = (allHorns[i].keyword);
    })
  };
  
// Below is our eventhandler for clicks

  $("#select-keyword").on("click", keywordFilter);

// Below is our function for hiding all the objects and showing only selected keyword objects

function keywordFilter() {
    $("section").hide();
    let selectedKeyword = $(this).val();
    $(`.${selectedKeyword}`).show();
};