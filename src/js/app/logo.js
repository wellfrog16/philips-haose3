// 场景1

define([
    'jquery',
    'utils/utils',
    'helper/helper',
    'text!../components/logo.html!strip'],
($, utils, helper, htmlLogo) => {
    const logo = {};

    // 初始化挂载
    logo.mount = function() {
        if (!this.$root) {
            helper.$root.append(htmlLogo);
            this.$root = $('.sys-logo');
        }
    };

    logo.show = () => {
        logo.$root.show();
    };

    logo.hide = () => {
        logo.$root.hide();
    };

    // 销毁
    logo.destroy = function() {
        this.$root.remove();
        this.$root = null;
    };

    helper.$logo = logo;
    return logo;
});
