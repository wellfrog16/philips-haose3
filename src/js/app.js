require(['jquery', 'script'], ($, script) => {
    script(1);
    // 禁止拉动
    $('body').on('touchmove', e => {
        e.preventDefault();
    });
});
