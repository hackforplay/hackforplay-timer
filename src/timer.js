import $ from 'jquery';

const config = {
  time: 300,
  red: 10,
  storageKey: 'hackforplay-timer'
};
const $time = $('<span>').text('5:00');

const $div = $('<div>')
  .addClass('timer-chrome-extension')
  .on('click', () => start(Date.now()))
  .append($time);

$.when($.ready).then(() => {
  console.log($('#app>div'));
  $('#app>div').append($div);
});

chrome.storage.local.get([config.storageKey], function(result) {
  if (result) {
    const time = parseInt(result['hackforplay-timer'], 10);
    if (time) {
      console.log('start', time);
      start(time);
    }
  }
});

let cancelId = 0;

function start(startTime = 0) {
  if (cancelId) {
    cancelAnimationFrame(cancelId);
  }
  chrome.storage.local.set(
    { [config.storageKey]: startTime.toString() },
    function() {
      console.log('set', startTime);
    }
  );

  (function update() {
    const elapsed = Date.now() - startTime;
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

    cancelId = requestAnimationFrame(update);
  })();
}
