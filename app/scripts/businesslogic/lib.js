var helper = {
  dateFromString : function(dateStr) {
    var dateStrArray = dateStr.split('-');

    return new Date(dateStrArray[2], (dateStrArray[1] - 1), dateStrArray[0]);
  },
  returnDayArray : function (firstDayOfCurrentPeriodAsString, firstDayOfNextPeriodAsString) {
    var startingDate  = helper.dateFromString(firstDayOfCurrentPeriodAsString),
        endingDate    = helper.dateFromString(firstDayOfNextPeriodAsString),
        dayArray = [];

    while (startingDate < endingDate) {
      dayArray.push(startingDate);
      startingDate = new Date(startingDate.setDate(
        startingDate.getDate() + 1
      ));
    };
    return dayArray;
  },
  returnDuration : function(firstDayOfCurrentPeriodAsString, firstDayOfNextPeriodAsString){
    return helper.returnDayArray(firstDayOfCurrentPeriodAsString, firstDayOfNextPeriodAsString).length;
  }
};


