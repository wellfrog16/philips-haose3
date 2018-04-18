// 场景1

define([
    'jquery',
    'utils/utils',
    'utils/frameplayer',
    'helper/helper',
    'iscroll',
    'text!../components/section2.html!strip'],
($, utils, frameplayer, helper, IScroll, htmlSection) => {
    const section = {};

    // 初始化挂载
    section.mount = () => {
        helper.$root.append(htmlSection);
        section.$root = helper.$root.find('.section2');
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

        this.$root.find('.room div').autofixStyle({ baseWidth: 1136 });

        this.bindClue();

        var t = frameplayer({
            target: $('.sprite-game'),
            total: 20,
            row: 5,
            loop: true,
            loopDelay: 0,
            // loopTimes:3,
            fps: 6,
            scale: 1,
            autosize: false,
            onProgress(frame) {
                // console.log(frame);
            }
        });

        t.play();
    };

    let clues = ['ball', 'door', 'game', 'poster', 'calendar', 'file'];
    let clues1 = ['ball', 'door', 'game', 'poster'];

    section.bindClue = function() {
        for (const index in clues) {
            // 打开线索
            this.$root.find(`.room .${clues[index]}`).hammer().on('tap', () => {
                helper.$logo.show();
                this.$root.find(`.tips, .tips .${clues[index]}`).fadeIn();
                if (clues1.indexOf(clues[index]) !== -1) {
                    clues1.splice(clues1.indexOf(clues[index]), 1);
                }
            });

            // 关闭并销毁找过的线索
            this.$root.find(`.tips .${clues[index]}`).hammer().on('tap', () => {
                this.$root.find(`.tips, .tips .${clues[index]}`).fadeOut();
                this.$root.find(`.${clues[index]}`).remove();

                if (checkClue()) {
                    console.log('集齐线索');
                    // 延迟1秒，防止被冒泡点击
                    setTimeout(() => {
                        this.$root.find('.tips, .tips .hongbao').fadeIn();
                    }, 1000);
                } else {
                    helper.$logo.hide();
                }
            });
        }

        // 途牛
        let step = 1;
        this.$root.find('.room .tuniu').hammer().on('tap', () => {
            step = 1;
            this.$root.find('.tips, .tips .tuniu').fadeIn();
        });

        // 途牛按钮
        this.$root.find('.tips .tuniu .button').hammer().on('tap', () => {
            helper.$logo.show();
            if (step === 1) {
                this.$root.find('.tips .tuniu .step1').fadeOut();
                this.$root.find('.tips .tuniu .step2').fadeIn();
                step++;
            } else if (step === 2) {
                const mobile = this.$root.find('input').val();
                if (checkMobile(mobile)) {
                    alert('发送红包');
                    this.$root.find('.tips, .tips .tuniu').fadeOut();
                    this.$root.find('.tuniu').remove();
                    helper.$logo.hide();
                } else {
                    alert('手机号码格式错误');
                }
            }
        });

        // 拆红包
        this.$root.find('.tips .hongbao .ready').hammer().on('tap', () => {
            this.$root.find('.tips .hongbao .ready').fadeOut();

            const x = 1;
            if (x === 2) {
                this.$root.find('.tips .hongbao .success').fadeIn();
            } else {
                this.$root.find('.tips .hongbao .failed').fadeIn();
            }
        });

        // 链接跳转
        this.$root.find('.tips .hongbao .result').hammer().on('tap', () => {
            helper.$logo.hide();
            window.open('http://www.tmall.com');
        });
    };

    // 简单校验手机号码
    function checkMobile(num) {
        var reg = /^[1][0-9]{10}$/;
        if (!reg.test(num)) {
            return false;
        } else {
            return true;
        }
    }

    function checkClue() {
        return clues1.length === 0;
    }

    // 销毁
    section.destroy = () => section.$root.remove();

    helper.$section2 = section;
    return section;
});
