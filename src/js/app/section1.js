// 场景1

define([
    'jquery',
    'utils/utils',
    'text!../components/section1.html!strip',
    'section2',
    'hammer',
    'jquery.hammer'],
($, utils, htmlSection1, section2) => {
    const section = {
        root: null
    };

    // 初始化挂载
    section.mount = function(el) {
        this.root = $(htmlSection1);
        el.append(this.root);
        this.bind();
    };

    section.bind = function() {
        this.root.find('.btn').hammer().on('tap', () => {
            this.destroy();
            section2.bind();
        });
    };

    // 销毁
    section.destroy = function() {
        this.root.remove();
    };

    return section;
});
