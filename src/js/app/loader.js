// 加载

define([
    'jquery',
    'createjs',
    'utils/utils',
    'helper/helper',
    'text!../components/loading.html!strip',
    'jquery.browser',
    'logo'],
($, createjs, utils, helper, htmlLoading) => {
    return (callback) => {
        // 如果小于ie9，则取消loading（createjs不支持）;
        if ($.browser.msie && $.browser.version < 9) {
            return callback();
        }

        // img标签方式加载图片
        var loader = new createjs.LoadQueue(false);

        // 关键！----设置并发数
        loader.setMaxConnections(5);
        // 关键！---一定要将其设置为 true, 否则不起作用。
        loader.maintainScriptOrder = true;

        let elLoading = null;
        var source = [
            { 'src': 'common/block/landscape.png' },

            { 'src': 'common/icon/icon-logo.png' },

            { 'src': 'common/loading/1.png' },
            { 'src': 'common/loading/2.png' }
        ];

        loader.on('complete', onComplete);
        loader.loadManifest(source, true, 'assets/img/');

        function onComplete() {
            // 加载logo
            helper.$logo.mount();
            helper.$root.append(htmlLoading);
            elLoading = $('.sys-loading');
            mainload();
        }

        function mainload() {
            var loader = new createjs.LoadQueue(false);

            // 关键！----设置并发数
            loader.setMaxConnections(5);
            // 关键！---一定要将其设置为 true, 否则不起作用。
            loader.maintainScriptOrder = true;

            var source = [
                { 'src': 'common/icon/icon-aim.png' },
                { 'src': 'common/icon/icon-close.png' },
                { 'src': 'common/icon/icon-music.png' },

                { 'src': 'main/section1/bg.jpg' },
                { 'src': 'main/section1/btn.png' },
                { 'src': 'main/section1/hand.png' },
                { 'src': 'main/section1/monitor.png' },
                { 'src': 'main/section1/sprite-text.png' },
                { 'src': 'main/section1/sprite.png' },
                { 'src': 'main/section1/text.png' },
                { 'src': 'main/section1/tips.png' },

                { 'src': 'main/section2/clue1-ball.png' },
                { 'src': 'main/section2/clue1-door.png' },
                { 'src': 'main/section2/clue1-game.png' },
                { 'src': 'main/section2/clue1-poster.png' },
                { 'src': 'main/section2/clue2-calendar.png' },
                { 'src': 'main/section2/clue2-file.png' },
                { 'src': 'main/section2/help.png' },
                { 'src': 'main/section2/hongbao-end.png' },
                { 'src': 'main/section2/hongbao-failed.png' },
                { 'src': 'main/section2/hongbao-success.png' },
                { 'src': 'main/section2/hongbao.png' },
                { 'src': 'main/section2/room.jpg' },
                { 'src': 'main/section2/sprite-ball.png' },
                { 'src': 'main/section2/sprite-monitor-ball.png' },
                { 'src': 'main/section2/sprite-monitor-door.png' },
                { 'src': 'main/section2/sprite-monitor-end.png' },
                { 'src': 'main/section2/sprite-monitor-game.png' },
                { 'src': 'main/section2/sprite-monitor-poster.png' },
                { 'src': 'main/section2/sprite-paper.png' },
                { 'src': 'main/section2/tuniu-btn.png' },
                { 'src': 'main/section2/tuniu-click.png' },
                { 'src': 'main/section2/tuniu-step-1.png' },
                { 'src': 'main/section2/tuniu-step-2.png' },
                { 'src': 'main/section2/tuniu-success.png' }
            ];

            loader.on('progress', onProgress);
            loader.on('complete', onComplete);
            loader.loadManifest(source, true, 'assets/img/');

            function onComplete() {
                setTimeout(() => {
                    elLoading.fadeOut();
                    utils.tryFun(callback);
                }, 10);
            }

            function onProgress() {
                // console.log(loader.progress);
                elLoading.find('span').text((loader.progress * 100 | 0) + ' %');
                elLoading.find('.progress div').css('width', (loader.progress * 100 | 0) + '%');
            }
        }
    };
});
