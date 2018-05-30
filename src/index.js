/**
 * Created by Chelly on 2018/5/28.
 */
import './sass/main.scss';
import jQuery from 'jquery';

(function($) {

    const G = 0.002;
    const T = 1000/60;
    const WINDOW_H = $(window).height();
    const WINDOW_W = $(window).width();

    let keyboards = $('.base-keyboard');
    let base = $('.base');

    $(document).on('keydown', function (ev) {
        console.log(ev)
        let keyboard = findKeyBoard(ev.key);
        keyboard.addClass('active');

        let keyBoard = insertKeyBoard(ev.key);
        let speed = randomSpeed();

        popKeyBoard(keyBoard[0],speed.x, speed.y);

        return false;
    });

    $(document).on('keyup', function (ev) {
        let keyboard = findKeyBoard(ev.key);
        keyboard.removeClass('active');
    });

    function findKeyBoard (key) {
        return keyboards.filter('[data-key="'+key.toLowerCase()+'"]');
    }

    // 创建一个keyBoard
    function insertKeyBoard (key) {
        let keyBoard = $('<div></div>').addClass('keyboard-ball');
        keyBoard.text(key);

        base.append(keyBoard);

        return keyBoard;
    }

    // 跳出keyBoard
    function popKeyBoard(elem, vx, vy) {
        let sx, sy, time = 0;

        let timer = setInterval(() => {
            sx = vx * time;
            sy = vy * time + (G * time * time)/2;

            $(elem).css({
                transform: 'translate3d('+sx+'px, '+sy+'px, 0)',
                WebkitTransform: 'translate3d('+sx+'px, '+sy+'px, 0)',
            });

            time += T;

            if ($(elem).offset().top > WINDOW_H) {
                clearInterval(timer)
                $(elem).remove();
                return
            }

        }, T);
    }

    // 随机的初速度
    function randomSpeed () {

        // 随机正负
        let symbol = Math.random() > 0.5 ? 1 : -1;

        // 0.3 ~ 0.8
        let x = symbol * (Math.floor(Math.random() * 5) + 3)/10;

        // -1 ~ -1.5
        let y = -(Math.floor(Math.random() * 5) + 10)/10;

        return {
            x, y
        }
    }

})(jQuery);