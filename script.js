(function (){
    let cards = [
        {
            name: 'blue-pegasus',
            img: 'img/blue-pegasus.jpg',
            id: 1,
        },
        {
            name: 'mint-pony',
            img: "img/mint-pony.jpg",
            id: 2,
        },
        {
            name: 'pink-pegasus',
            img: "img/pink-pegasus.jpg",
            id: 3,
        },
        {
            name: 'patterned-green-pegasus',
            img: "img/patterned-green-pegasus.jpg",
            id: 4,
        },
        {
            name: 'sparkling-pony',
            img: "img/sparkling-pony.jpg",
            id: 5,
        },
        {
            name: 'patterned-red-pony',
            img: "img/patterned-red-pony.jpg",
            id: 6,
        },
        {
            name: 'polka-dot-unicorn',
            img: "img/polka-dot-unicorn.jpg",
            id: 7,
        },
        {
            name: 'purple-pony',
            img: "img/purple-pony.jpg",
            id: 8,
        },
        {
            name: 'ruby-pony',
            img: "img/ruby-pony.jpg",
            id: 9,
        },
        {
            name: 'sparkling-unicorn',
            img: "img/sparkling-unicorn.jpg",
            id: 10,
        },
        {
            name: 'blue-pegasus-mountains.jpg',
            img: "img/blue-pegasus-mountains.jpg",
            id: 11,
        },
        {
            name: 'yellow-star-unicorn',
            img: "img/yellow-star-unicorn.jpg",
            id: 12,
        },
    ];
    
    let Memory = {
        init: function (cards) {
            this.$game = $('.game');
            this.$modal = $('.modal');
            this.$overlay = $('.modal-overlay');
            this.$restartButton = $('button.restart');
            this.cardsArray = $.merge(cards, cards);
            this.shuffleCards(this.cardsArray);
            this.setup();
        },

        shuffleCards: function (cardsArray) {
            this.$cards = $(this.shuffle(this.cardsArray));
        },

        setup: function () {
            this.html = this.buildHTML();
            this.$game.html(this.html);
            this.$memoryCards = $('.card');
            this.paused = false;
            this.guess = null;
            this.blinding();
        },

        blinding: function () {
            this.$memoryCards.on('click', this.cardClicked);
            this.$restartButton.on('click', $.proxy(this.reset, this));
        },

        cardClicked: function () {
            var _ = Memory;
            var $card = $(this);
            if (!_.paused && !$card.find('.inside').hasClass('matched') && !$card.find('.inside').hasClass('picked')) {
                $card.find('.inside').addClass('picked');
                if (!_.guess) {
                    _.guess = $(this).attr('data-id');
                } else if (_.guess == $(this).attr('data-id') && !$(this).hasClass('picked')) {
                    $('.picked').addClass('matched');
                    _.guess = null;
                } else {
                    _.guess = null;
                    _.paused = true;
                    setTimeout(function () {
                        $('.picked').removeClass('picked');
                        Memory.paused = false;
                    }, 600);
                }
                if ($('.matched').length == $('.card').length) {
                    _.win();
                }
            }
        },

        win: function () {
            this.paused = true;
            setTimeout(function () {
                Memory.showModal();
                Memory.$game.fadeOut();
            }, 1000);
        },

        showModal: function () {
            this.$overlay.show();
            this.$modal.fadeIn('slow');
        },

        hideModal: function () {
            this.$overlay.hide();
            this.$modal.hide();
        },

        reset: function () {
            this.hideModal();
            this.shuffleCards(this.cardsArray);
            this.setup();
            this.$game.show('slow');
        },

        shuffle: function (array) {
            let counter = array.length, temp, index;
            while (counter > 0) {
                index = Math.floor(Math.random() * counter);
                counter--;
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },

        buildHTML: function () {
            var frag = '';
            this.$cards.each(function (k, v) {
                frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
			<div class="front"><img src="' + v.img + '"\
			alt="' + v.name + '" /></div>\
			<div class="back"><img src="img/backside.jpg"\
			alt="backside" /></div></div>\
			</div>';
            });
            return frag
        }
    };

    Memory.init(cards);
})();

