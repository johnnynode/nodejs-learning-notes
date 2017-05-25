/* 获取音乐列表 */
exports.getMusicList = function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    res.end(JSON.stringify({
        musicList: musicList
    }));
};

exports.showAdd = function (req, res) {
    res.render('add');
};

/* 添加功能 */
exports.doAdd = function (req, res) {
    let id = req.body.id;
    let name = req.body.name;
    let singer = req.body.singer;
    let isHightRate = req.body.isHightRate;

    let musicInfo = musicList.find(m => m.id === id);

    if (musicInfo) {
        return res.end('music is already exists');
    }

    isHightRate = isHightRate === '1' ? true : false;

    musicList.push({
        id,
        name,
        singer,
        isHightRate
    });

    res.writeHead(302, {
        'Location': 'http://192.168.3.12:3000/'
    });

    res.end();
};

/* 删除功能 */
exports.doRemove = function (req, res) {
    let index = musicList.findIndex(m => m.id === req.params.mid);
    try {
        musicList.splice(index, 1);
        res.end(JSON.stringify({
            code: '1',
            msg: 'ok'
        }));
    } catch (e) {
        res.end(JSON.stringify({
            code: '0',
            msg: e.message
        }));
    }
};

/* 显示编辑 */
exports.showEdit = function (req, res) {
    // 根据音乐信息id找到该项
    let musicInfo = musicList.find(m => m.id === req.params.mid);

    // 如果用户要编辑的
    if (!musicInfo) {
        return res.end('music is not exists');
    }
    res.render('edit', {
        musicInfo
    });
};

/* 编辑功能 */
exports.doEdit = function (req, res) {
    let name = req.body.name;
    let singer = req.body.singer;
    let isHightRate = req.body.isHightRate;

    // 你要编辑谁？
    // 根据id查找数组中的索引
    let index = musicList.findIndex(m => m.id === req.params.mid);

    if (index === -1) {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        return res.end('can"t find');
    }

    musicList[index].name = name;
    musicList[index].singer = singer;
    musicList[index].isHightRate = isHightRate === '1' ? true : false;

    res.writeHead(302, {
        'Location': 'http://192.168.3.12:3000/'
    });

    res.end();
};