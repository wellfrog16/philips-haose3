// 剧本

define([
    'jquery',
    'utils/utils',
    'loader',
    'music',
    'section1',
    'section2',
    'text!../components/block.html!strip'],
($, utils, loader, music, section1, section2, htmlBlock) => {
    return () => {
        // 加载jquery插件
        utils.jqueryPlugins();
        utils.fixRem();

        // 如果是手机端，加载横屏提示
        if (!utils.isPC) { $('body').append(htmlBlock); }

        loader(() => {
            console.log('123');

            section1.mount($('body'));
            section2.mount($('body'));

            // const a = music(false);

            // setInterval(() => {
            //     console.log(a.playing);
            // }, 1000);
        });
    };
});
