String.prototype.format = function () {
    var result = this;
    for (let ind in arguments) {
      result = result.replace("{}", arguments[ind]);
    }
    return result;
  };

const loadSong = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET"
        }).then(res => res.json())
        .then((res) => {
            if (res["content"] != null) {
                let data = decodeURIComponent(res["content"])
                resolve(data);
            }
        }).finally(() => {
            resolve(null);
        })
    });
};

const loadResources = () => {
    return new Promise((resolve, reject) => {
        let fileCount = 0;
        let beatmaps = [];

        let packUrl = "https://api.github.com/repos/eattato/web-rhythm/git/trees/main?recursive=1"
        fetch(packUrl, {
            method: "GET"
        }).then(res => res.json())
        .then((res) => {
            if (res["message"] == null) {
                let files = res["tree"];
                let urls = [];

                for (let ind in files) {
                    fileCount += 1;
                    let file = files[ind];
                    let path = file["path"];
                    let url = file["url"];

                    if (path.indexOf(".osz") != -1) {
                        urls.push(url)
                    }
                }

                for (let ind in urls) {
                    let url = urls[ind];
                    loadSong(url)
                    .then((data) => {
                        if (data != null) {
                            beatmaps.push(data);
                            if (beatmaps.length == fileCount) {
                                resolve(beatmaps);
                            }
                        }
                    });
                }
            } else {
                console.log("로딩 실패");
                reject();
            }
        })
    })
}

// 메인
$().ready(() => {
    let loading = $(".loading");
    let loadingTick = 0
    setInterval(() => {
        loadingTick += 1
        if (loadingTick > 3) {
            loadingTick = 0
        }

        let ls = "로딩 중";
        for (let ind = 1; ind <= loadingTick; ind++) {
            ls += ".";
        }
        loading.find("div").text(ls);
    }, 100);

    // 리포지터리에서 osz 로드
    loadResources()
    .then((beatmaps) => { // 로드 이후 게임 실행
        loading.css({display: "none"});

        let record = $(".record");
        let recordRotation = 0;
        setInterval(() => {
            recordRotation += 0.15;
            if (recordRotation > 360) {
                recordRotation -= 360;
            }
            record.css({transform: "rotate({}deg)".format(recordRotation)});
        }, 1);
    }).catch(() => { // 로드 실패
        loading.find("div").text("데이터를 불러오지 못했어요..");
    });
});