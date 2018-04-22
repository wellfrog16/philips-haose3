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

    let myScroll = null;
    let offsetX = 0;
    let tuniuResult = null;

    section.bind = function() {
        offsetX = parseInt($('.room').width() * -0.4);

        myScroll = new IScroll('.section2 .container', {
            scrollX: true,
            scrollY: false,
            startX: offsetX,
            bounce: false
        });

        setTimeout(() => {
            myScroll.refresh();
        }, 100);

        setTimeout(() => {
            this.$root.find('.room div').autofixStyle({ baseWidth: 1136 });
        }, 300);

        this.bindClue();

        // 随机播放
        randomName = randomPlay();

        // 场景动画
        const t1 = frameplayer({
            target: $('.sprite-ball'),
            total: 18,
            row: 5,
            loop: true,
            loopDelay: 0,
            // loopTimes:3,
            fps: 6,
            scale: 1,
            autosize: false
        });

        t1.play();

        const t2 = frameplayer({
            target: $('.sprite-paper'),
            total: 10,
            row: 5,
            loop: true,
            loopDelay: 0,
            // loopTimes:3,
            fps: 6,
            scale: 1,
            autosize: false
        });

        t2.play();

        // 隐藏提示
        myScroll.on('scrollStart', () => {
            this.$root.find('.help').fadeOut();
        });

        this.$root.find('.help').on('touchstart', () => {
            this.$root.find('.help').fadeOut();
        });

        $.get('http://www.tron-m.com/tron-api/api/getRecord.do?activityId=20180413&openId=' + helper.$openid, res => {
            tuniuResult = res.result;
            // console.log(tuniuResult);
        });
    };

    let randomName = '';
    let clues = ['ball', 'door', 'game', 'poster', 'calendar', 'file'];
    let clues1 = ['ball', 'door', 'game', 'poster'];

    section.bindClue = function() {
        for (const index in clues) {
            // 打开线索
            this.$root.find(`.room .${clues[index]}, .room .focus-${clues[index]}`).hammer().on('tap', () => {
                helper.$logo.show();
                this.$root.find(`.tips, .tips .${clues[index]}`).show();
                if (clues1.indexOf(clues[index]) !== -1) {
                    clues1.splice(clues1.indexOf(clues[index]), 1);

                    // 关闭销毁逐帧
                    player[clues[index]].destroy();

                    if (randomName === clues[index]) {
                        randomName = randomPlay();
                    }
                }
            });

            // 关闭并销毁找过的线索
            this.$root.find(`.tips .${clues[index]}`).hammer().on('tap', () => {
                this.$root.find(`.tips, .tips .${clues[index]}`).fadeOut();
                this.$root.find(`.${clues[index]}`).remove();

                if (checkClue()) {
                    // console.log('集齐线索');
                    // 延迟1秒，防止被冒泡点击
                    myScroll.scrollTo(offsetX, 0, 1000);
                    setTimeout(() => {
                        this.$root.find('.tips').fadeIn();
                        this.$root.find('.tips .hongbao').show().addClass('hongbao-show');
                    }, 2000);
                } else {
                    helper.$logo.hide();
                }
            });
        }

        // 途牛
        let step = 1;
        this.$root.find('.room .tuniu, .animate-tuniu-click').hammer().on('tap', () => {
            $('.sys-block').css('z-index', '-1');
            // 如果openid已经存在
            if (tuniuResult) {
                this.$root.find('.tips, .tips .tuniu').fadeIn();
                this.$root.find('.tuniu .step1, .tuniu .step2, .button').hide();
                this.$root.find('.tuniu .step3').fadeIn();
            } else {
                step = 1;
                this.$root.find('.tips, .tips .tuniu').fadeIn();
                this.$root.find('.tips .tuniu .step1').fadeIn();
                this.$root.find('.tips .tuniu .button').fadeIn();
            }
            helper.$logo.show();
        });

        // 途牛按钮
        this.$root.find('.tips .tuniu .button').hammer().on('tap', () => {
            // helper.$logo.show();
            if (step === 1) {
                this.$root.find('.tips .tuniu .step1').fadeOut();
                this.$root.find('.tips .tuniu .step2').fadeIn();
                step++;
            } else if (step === 2) {
                const mobile = this.$root.find('input').val();
                if (checkMobile(mobile)) {
                    step++;
                    // 留资
                    $.ajax({
                        url: 'http://www.tron-m.com/tron-api/api/addRecord.do',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            'openId': helper.$openid,
                            // 'openId': 'test2018',
                            'activityId': 20180413,
                            'telNo': mobile
                        }),
                        datType: 'JSON',
                        success: function(data) {
                            console.log(data.result);
                        }
                    });
                    // 暂时不写入回调
                    this.$root.find('.tips .tuniu .step2, .tips .tuniu .button, .tips .tuniu .close').hide();
                    this.$root.find('.tips .tuniu .step3').fadeIn();
                } else {
                    this.$root.find('.error').text('手机号码格式错误');
                }
            }
        });

        this.$root.find('.tips .tuniu .step3').hammer().on('tap', () => {
            this.$root.find('.tips, .tips .tuniu').fadeOut();
            this.$root.find('.tuniu').remove();
            this.$root.find('.animate-tuniu-click').unbind();
            helper.$logo.hide();
            $('.sys-block').removeAttr('style');
        });

        this.$root.find('.close').hammer().on('tap', () => {
            this.$root.find('.tips, .tips .tuniu, .step').fadeOut();
            helper.$logo.hide();
            $('.sys-block').removeAttr('style');
        });

        // 红包
        this.$root.find('.tips .hongbao .end').hammer().on('tap', () => {
            this.$root.find('.tips .hongbao .end').fadeOut();
            this.$root.find('.tips .hongbao .ready').fadeIn();
        });

        // 拆红包
        this.$root.find('.tips .hongbao .ready').hammer().on('tap', () => {
            this.$root.find('.tips .hongbao .ready').fadeOut();

            $.ajax({
                type: 'POST',
                // 接口中心取决于项目部署地点,不要随意修改
                url: 'https://api.sames.cc/lottery',
                data: {
                    aId: '762E1UG0',
                    // uId: 'oQlFDwpx_m5qvFmBWlVcI0-y0Svk'
                    uId: helper.$openid
                },
                success: (res) => {
                    if (parseInt(res.code) === 200) {
                        this.$root.find('.tips .hongbao .success').fadeIn();
                    } else if (parseInt(res.code) === 304) {
                        this.$root.find('.tips .hongbao .finished').fadeIn();
                    } else {
                        this.$root.find('.tips .hongbao .failed').fadeIn();
                    }
                    // alert(`openid: ${helper.$openid}, code: ${res.code}`);
                }
            });
        });

        // 链接跳转
        this.$root.find('.tips .hongbao .result').hammer().on('tap', () => {
            helper.$logo.hide();
            window.open('https://sale.jd.com/m/act/Xx1afUwqFQn.html');
        });
    };

    const player = {
        game: {
            target: null,
            play() {
                this.target = frameplayer({
                    target: $('.sprite-monitor-game'),
                    total: 20,
                    row: 5,
                    loop: true,
                    loopDelay: 0,
                    // loopTimes:3,
                    fps: 6,
                    scale: 1,
                    autosize: false
                });

                this.target.play();
            },
            destroy() {
                this.target && this.target.stop();
                $('.sprite-monitor-game, .focus-game').remove();
            }
        },
        ball: {
            target: null,
            play() {
                this.target = frameplayer({
                    target: $('.sprite-monitor-ball'),
                    total: 20,
                    row: 5,
                    loop: true,
                    loopDelay: 0,
                    // loopTimes:3,
                    fps: 6,
                    scale: 1,
                    autosize: false
                });

                this.target.play();
            },
            destroy() {
                this.target && this.target.stop();
                $('.sprite-monitor-ball, .focus-ball').remove();
            }
        },
        poster: {
            target: null,
            play() {
                this.target = frameplayer({
                    target: $('.sprite-monitor-poster'),
                    total: 20,
                    row: 5,
                    loop: true,
                    loopDelay: 0,
                    // loopTimes:3,
                    fps: 6,
                    scale: 1,
                    autosize: false
                });

                this.target.play();
            },
            destroy() {
                this.target && this.target.stop();
                $('.sprite-monitor-poster, .focus-poster').remove();
            }
        },
        door: {
            target: null,
            play() {
                this.target = frameplayer({
                    target: $('.sprite-monitor-door'),
                    total: 20,
                    row: 5,
                    loop: true,
                    loopDelay: 0,
                    // loopTimes:3,
                    fps: 6,
                    scale: 1,
                    autosize: false
                });

                this.target.play();
            },
            destroy() {
                this.target && this.target.stop();
                $('.sprite-monitor-door, .focus-door').remove();
            }
        },
        end: {
            target: null,
            play() {
                this.target = frameplayer({
                    target: $('.sprite-monitor-end'),
                    total: 20,
                    row: 5,
                    loop: false,
                    loopDelay: 0,
                    loopTimes: 2,
                    fps: 6,
                    scale: 1,
                    autosize: false
                });

                this.target.play();
            },
            destroy() {
                this.target && this.target.stop();
                $('.sprite-monitor-end').remove();
            }
        }
    };

    function randomPlay() {
        const num = Math.floor(Math.random() * clues1.length + 1);
        if (checkClue()) {
            player['end'].play();
            return;
        }
        player[clues1[num - 1]].play();
        section.$root.find(`.focus-${clues1[num - 1]}`).show();

        return clues1[num - 1];
    }

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
