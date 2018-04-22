// 剧本

define([
    'jquery',
    'utils/utils',
    'helper/helper',
    'loader',
    'music',
    'share',
    'section1',
    'section2',
    'text!../components/block.html!strip',
    'logo'],
($, utils, helper, loader, music, share, section1, section2, htmlBlock) => {
    return () => {
        // 加载jquery插件
        utils.jqueryPlugins();
        utils.fixRem();

        // 如果是手机端，加载横屏提示
        if (!utils.isPC) { $('.sys-container').append(htmlBlock); }

        // share
        share({
            title: '2018密室逃脱之猎艳行动',
            desc: '猎艳行动，正在等你启动！',
            imgUrl: 'http://www.tron-m.com/philips/248E9QHSB/assets/img/main/share.png'
        });

        // helper.$openid = utils.getUrlParam('o') || 'test' + Math.floor(Math.random() * 1000000);
        let openId = utils.getUrlParam('o');

        // 干净的地址
        if (!openId) {
            if (localStorage.openId) {
                helper.$openid = localStorage.openId;
            } else {
                location.href = 'http://philips.ad-witch.cn';
            }
        } else {
            localStorage.openId = openId;
            location.href = 'http://www.tron-m.com/philips/248E9QHSB';
        }

        // if (openId) {
        //     helper.$openid = openId;
        //     location.href = 'http://www.tron-m.com/philips/248E9QHSB';
        // } else {
        //     openId = utils.getUrlParam('o');

        //     if (!openId) {
        //         location.href = 'http://philips.ad-witch.cn';
        //     } else {
        //         localStorage.openId = openId;
        //     }
        // }

        // alert(helper.$openid);

        loader(() => {
            section1.mount();
            section2.mount();

            music(true);
        });
    };
});
