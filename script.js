// JavaScript code for Sketchfab viewer goes here, as it remains unchanged.
        var iframe = document.getElementById('api-frame');
        var version = '1.12.1';
        var client = new Sketchfab(version, iframe);

        var uid = '2ba7199d4e204d30a7bbc6bab44ef538';

        var openButton = document.getElementById('open-popup');
        var popup = document.getElementById('popup');
        var loadingScreen = document.querySelector('.loading-screen');
        var controls = document.getElementById('controls');

        openButton.addEventListener('click', function () {
            popup.style.display = 'block';
            loadingScreen.style.display = 'flex';

            setTimeout(function () {
                client.init(uid, {
                    success: function onSuccess(api) {
                        api.start();
                        api.addEventListener('viewerready', function () {
                            api.getSceneGraph(function (err, result) {
                                if (err) {
                                    console.log('Error getting nodes');
                                    return;
                                }
                                console.log(result);
                                controls.style.display = 'block'; // Show the buttons as an overlay
                            });
                            var id = 4;
                            document.getElementById('show').addEventListener('click', function () {
                                api.show(id);
                            });
                            document.getElementById('hide').addEventListener('click', function () {
                                api.hide(id);
                            });
                            console.log('Viewer is ready');
                            loadingScreen.style.display = 'none';
                        });
                    },
                    error: function onError() {
                        console.log('Viewer error');
                        loadingScreen.style.display = 'none';
                    },
                    camera: 1,
                    blending: 1,
                    autospin: 0,
                    ui_settings: 0,
                    autostart: 1,
                    ui_fullscreen: 0,
                    ui_hint: 2,
                    ui_infos: 0,
                    ui_ar_help: 0,
                    ui_color: 'b95a00',
                    ui_theme: 'dark',
                    ui_watermark: 0,
                    ui_vr: 0,
                    ui_stop: 0,
                    ui_help: 0,
                    ui_inspector: 0
                });
            }, 5000);
        });

        document.addEventListener('click', function (event) {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        });
