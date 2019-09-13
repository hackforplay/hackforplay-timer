import $ from 'jquery';

const config = {
  time: 300,
  red: 10
};
const $time = $('<span>').text('5:00');

const $div = $('<div>')
  .addClass('timer-chrome-extension')
  .on('click', start)
  .append($time);

$.when($.ready).then(() => {
  console.log($('#app>div'));
  $('#app>div').append($div);
});

function start() {
  const started = Date.now();

  (function update() {
    const elapsed = Date.now() - started;
    const last = Math.max(config.time - ((elapsed / 1000) >> 0), 0);
    const sec = last % 60;
    const min = (last / 60) >> 0;
    $time.text(`${min}:${sec.toString().padStart(2, '0')}`);

    if (last <= 0) {
      $div.removeClass('red');
      return;
    } else if (last <= config.red) {
      $div.addClass('red');
    }

    requestAnimationFrame(update);
  })();
}
