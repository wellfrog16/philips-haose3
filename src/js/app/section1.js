// 场景1

define([
    'jquery',
    'utils/utils',
    'utils/frameplayer',
    'helper/helper',
    'text!../components/section1.html!strip',
    'section2',
    'hammer',
    'jquery.hammer'],
($, utils, frameplayer, helper, htmlSection1, section2) => {
    const section = {
        root: null
    };

    // 初始化挂载
    section.mount = function() {
        this.$root = $(htmlSection1);
        helper.$root.append(this.$root);
        this.bind();

        this.target = frameplayer({
            target: this.$root.find('.monitor'),
            total: 25,
            row: 5,
            loop: true,
            loopDelay: 0,
            // loopTimes:3,
            fps: 5,
            scale: 1,
            autosize: false
        });

        this.target.play();
    };

    section.bind = function() {
        this.$root.find('.button span').hammer().on('tap', () => {
            this.$root.find('.bg, .button').fadeOut();
            this.$root.find('.next').fadeIn();
            setTimeout(() => {
                this.$root.find('.monitor-text, .hand').hammer().on('tap', () => {
                    this.target.stop();

                    // 注销场景
                    section.destroy();

                    // 隐藏logo
                    helper.$logo.hide();

                    // 场景2事件绑定
                    section2.bind();
                });

                this.$root.find('.tips, .hand').fadeIn();
            }, 2500);

            this.$root.find('.monitor-text').fadeIn();
            this.$root.find('.text').addClass('text-animate');
            this.$root.find('.monitor').remove();
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
