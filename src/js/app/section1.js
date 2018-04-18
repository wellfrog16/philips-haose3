// 场景1

define([
    'jquery',
    'utils/utils',
    'helper/helper',
    'text!../components/section1.html!strip',
    'section2',
    'hammer',
    'jquery.hammer'],
($, utils, helper, htmlSection1, section2) => {
    const section = {
        root: null
    };

    // 初始化挂载
    section.mount = function() {
        this.$root = $(htmlSection1);
        helper.$root.append(this.$root);
        this.bind();
    };

    section.bind = function() {
        this.$root.find('.button span').hammer().on('tap', () => {
            this.$root.find('.bg, .button').fadeOut();
            this.$root.find('.next').fadeIn();
        });

        this.$root.find('.next').hammer().on('tap', () => {
            // 注销场景
            section.destroy();

            // 隐藏logo
            helper.$logo.hide();

            // 场景2事件绑定
            section2.bind();
        });
    };

    // 销毁
    section.destroy = function() {
        this.$root.fadeOut(() => {
            this.$root.remove();
        });
    };

    helper.$section1 = section;
    return section;
});
