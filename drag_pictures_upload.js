(function drag_upload() {
    if (window.FileReader) {

        var list = document.getElementById('list'),
            cnt = document.getElementById('container');

        // 判断是否图片
        function isImage(type) {
            switch (type) {
                case 'image/jpeg':
                case 'image/png':
                case 'image/gif':
                case 'image/bmp':
                case 'image/jpg':
                    return true;
                default:
                    return false;
            }
        }

        // 处理拖放文件列表
        function handleFileSelect(evt) {
            evt.stopPropagation();
            evt.preventDefault();

            var files = evt.dataTransfer.files;

            for (var i = 0, f; f = files[i]; i++) {

                var t = f.type ? f.type : 'n/a',
                    reader = new FileReader(),
                    looks = function (f, img) {
                        list.innerHTML += '<li><strong>' + f.name + '</strong> (' + t +
                            ') - ' + f.size + ' bytes<p>' + img + '</p></li>';
                        cnt.innerHTML = img;
                    },
                    isImg = isImage(t),
                    img;

                // 处理得到的图片
                if (isImg) {
                    reader.onload = (function (theFile) {
                        return function (e) {
                            img = '<img class="preview" src="' + e.target.result + '" title="' + theFile.name + '"/>';
                            looks(theFile, img);
                        };
                    })(f)
                    reader.readAsDataURL(f);
                } else {
                    img = '你传进来的不是图片';
                    looks(f, img);
                }

            }

        }

        // 处理插入拖出效果
        function handleDragEnter(evt){ this.setAttribute('style', 'border-style:dashed;'); }
        function handleDragLeave(evt){ this.setAttribute('style', ''); }

        // 处理文件拖入事件，防止浏览器默认事件带来的重定向
        function handleDragOver(evt) {
            evt.stopPropagation();
            evt.preventDefault();
        }

        cnt.addEventListener('dragenter', handleDragEnter, false);
        cnt.addEventListener('dragover', handleDragOver, false);
        cnt.addEventListener('drop', handleFileSelect, false);
        cnt.addEventListener('dragleave', handleDragLeave, false);

    } else {
        document.getElementById('section').innerHTML = '换个浏览器吧';
    }
})();

