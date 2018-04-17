// 场景1

define([
    'jquery',
    'utils/utils',
    'iscroll',
    'text!../components/section2.html!strip'],
($, utils, IScroll, htmlSection) => {
    const section = {};

    // 初始化挂载
    section.mount = el => {
        el.append(htmlSection);
    };

    section.bind = function() {
        const myScroll = new IScroll('.section2 .container', {
            scrollX: true,
            scrollY: false,
            bounce: false
        });

        setTimeout(() => {
            myScroll.refresh();
        }, 0);

        $('.section2 .room div').autofixStyle({ baseWidth: 1136 });
    };

    // 销毁
    section.destroy = () => $('.section2').remove();

    return section;
});
