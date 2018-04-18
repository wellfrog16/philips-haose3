// 剧本

define([
    'jquery',
    'utils/utils',
    'helper/helper',
    'loader',
    'music',
    'section1',
    'section2',
    'text!../components/block.html!strip',
    'logo'],
($, utils, helper, loader, music, section1, section2, htmlBlock) => {
    return () => {
        // 加载jquery插件
        utils.jqueryPlugins();
        utils.fixRem();

        // 如果是手机端，加载横屏提示
        if (!utils.isPC) { $('.sys-container').append(htmlBlock); }

        loader(() => {
            section1.mount();
            section2.mount();

            music(true);
        });
    };
});
