String.prototype.format = function () {
    var result = this;
    for (let ind in arguments) {
      result = result.replace("{}", arguments[ind]);
    }
    return result;
  };

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

    let record = $(".record");
    let recordRotation = 0;
    setInterval(() => {
        recordRotation += 0.15;
        if (recordRotation > 360) {
            recordRotation -= 360;
        }

        record.css({transform: "rotate({}deg)".format(recordRotation)});
    }, 1);
});