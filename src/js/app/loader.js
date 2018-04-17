// 加载

define([
    'jquery',
    'createjs',
    'utils/utils',
    'text!../components/loading.html!strip',
    'jquery.browser'],
($, createjs, utils, htmlLoading) => {
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
            { 'src': 'common/loading/1.png' },
            { 'src': 'common/loading/2.png' }
        ];

        loader.on('complete', onComplete);
        loader.loadManifest(source, true, 'assets/img/');

        function onComplete() {
            $('body').append(htmlLoading);
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
                { 'src': 'common/icon/icon-music.png' },

                { 'src': 'main/section2/room.jpg' }
            ];

            loader.on('progress', onProgress);
            loader.on('complete', onComplete);
            loader.loadManifest(source, true, 'assets/img/');

            function onComplete() {
                setTimeout(() => {
                    elLoading.fadeOut();
                    utils.tryFun(callback);
                }, 10);

                console.log('资源加载完成');
            }

            function onProgress() {
                // console.log(loader.progress);
                elLoading.find('span').text((loader.progress * 100 | 0) + ' %');
                elLoading.find('.progress div').css('width', (loader.progress * 100 | 0) + '%');
            }
        }
    };
});
