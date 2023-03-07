String.prototype.format = function () {
    var result = this;
    for (let ind in arguments) {
      result = result.replace("{}", arguments[ind]);
    }
    return result;
  };

$().ready(() => {
    let record = $(".record");
    let recordRotation = 0;
    setInterval(() => {
        recordRotation += 0.15;
        if (recordRotation > 360) {
            recordRotation -= 360;
        }

        record.css({transform: "rotate({}deg)".format(recordRotation)});
    }, 1)
});