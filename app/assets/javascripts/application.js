// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var availableFishTypes = 3;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Fish(drawForm) {
    var that = this;
    this.drawForm = drawForm;
    this.top = getRandomInt(40, 70);
    this.left = getRandomInt(10, 45);
    this.distance = 0;
    this.vDistance = 0;

    this.type = getRandomInt(0, availableFishTypes - 1);

    this.direction = getRandomInt(0, 1) || -1;

    this.element = jQuery(
        '<div class="fish fish-' + this.type + '"><div class="inner"></div></div>'
    );

    this.element.css({
        top: this.top + "%",
        left: this.left + "%",
        transform: "translate3d(0, 0, 0)"
    });

    this.element.on('click', function() {
        that.drawForm.submit();
    });

    jQuery("body").append(this.element);

    this.element.css("width");
}

Fish.prototype.swim = function() {
    var that = this,
        distance = getRandomInt(-20, 20),
        vDistance = getRandomInt(-20, 20),
        duration = getRandomInt(3000, 6000);

    if (distance < 0) {
        this.direction = -1;
    } else {
        this.direction = 1;
    }

    if (this.direction === -1) {
        this.element.children(".inner").addClass("right");
    } else {
        this.element.children(".inner").removeClass("right");
    }

    this.distance += distance;
    this.vDistance += vDistance;

    this.element.css({
        "transition-duration": duration + "ms",
        "transform": "translate3d(" + this.distance + "%, " + this.vDistance + "%, 0)"
    });

    setTimeout(function() {
        that.swim();
    }, duration + 100);
};

jQuery(document).ready(function() {
    jQuery('div.init-fish-form form').each(function(i, e) {
      var fish = new Fish(e);
      fish.swim();
    });
  });
  