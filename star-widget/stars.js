(function() {
    "use strict";

    function makeClickable(stars, $star) {

        $star.on('mouseover', function() {
            console.log('here');
            stars.setCssRating($star.attr('data-title'));
        });

        $star.on('mouseout', function() {
            console.log('mouse out');
            stars.setCssRating();
        });

        $star.on('click', function() {
            $(this).mouseenter();
            stars.currentRating = $star.attr('data-title');
            stars.clicked = true;
        });

    }

    function Stars(selector, params) {
        this.$element = $(selector)
        this.$base = $('<div id="stars-base">');
        console.log(params);
        this.maxRating = params.maxRating || 10;
        this.$stars = [];
        this.currentRating = 0;
        console.log(this.maxRating);
        for (var i = 1; i <= this.maxRating; ++i) {
            var $star = ($('<i class="stars-star" data-title="' + i.toString() + '"></i>'));
            this.$stars.push($star);
            this.$base.append($star);
            makeClickable(this, $star);
        }
        this.$element.append(this.$base);
    }

    Stars.prototype.setCssRating = function(rating) {
        console.log(rating);
        if (rating === undefined)
            rating = this.currentRating;
        for (var i = 0; i < rating; ++i) {
            this.$stars[i].css("background", "url('resources/star.gif') 0px 0px");
        }
        for (var i = rating; i < this.maxRating; ++i) {
            this.$stars[i].css("background", "url('resources/star.gif') 22px 0px");
        }
    }

    Stars.prototype.setRating = function(rating) {
        if (rating == 0) {
            this.setCssRating(0);
            this.currentRating = 0;
        }
        else
        {
            this.$stars[rating - 1].click();
        }
    }

    window.Stars = Stars;
})();