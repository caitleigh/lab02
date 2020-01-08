'use strict';

//Using demo from class on Jan 7th as reference // 

function Horns(horns){
    this.image_url = horns.image_url;
    this.title = horns.title;
    this.description = horns.description;
    this.keyword = horns.keyword;
    this.horns = horns.horns;
}

Horns.prototype.render = function () {
    let $hornsClone = $('#photo-template').clone();
    $('main').append($hornsClone);
    $hornsClone.find('h2').text(this.title);
    $hornsClone.find('img').attr('src', this.image_url);
    $hornsClone.find('p').text(this.description);
    $hornsClone.attr('class', this.keyword);
    $hornsClone.attr('class', this.horns);
};

Horns.readJson = () => {
    $.ajax('data/page-1.json', 'json')
        .then(data => {
            data.forEach(item => {
                let horns = new Horns(item);
                console.log(horns);
                horns.render();
            });
        });
};

$(() => Horns.readJson());