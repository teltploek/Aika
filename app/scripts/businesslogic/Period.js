function PeriodController(){
  this._title = '';
  this._days = [];
  this._duration = this.val('days').length;
  this._projects = [];
  this._activities = [];
};

// Period initializer
//----------------------------
PeriodController.prototype.init = function(data){
  // set period days
  this.val({
    title     : data.Title,
    days      : helper.returnDayArray( data.FirstDayOfCurrentPeriod, data.FirstDayOfNextPeriod ),
    projects  : data.Projects
  });

  this.mapActivities();
  return {
    title       : this.val('title'),
    days        : this.val('days'),
    duration    : this.val('duration'),
    activities  : this.val('activities')
  };
};

PeriodController.prototype.mapActivities = function(){
  var self = this,
      projects = this.val('projects');

  angular.forEach(projects, function(project){
    var accounts = project.Accounts;

    angular.forEach(accounts, function(account){
      var accountNumber = account.AccountNumber,
          activities = account.Activities;

      angular.forEach(activities, function(activity){
        var dates = activity.Dates;

        activity.accountNumber = accountNumber;
        activity.timeslots = [];

        angular.forEach(dates, function(date){
          activity.timeslots.push(new Timeslot(
            date.Date, date.Hours, date.Locked, date.HighestRegistrationStatus
          ));
        });

        self._activities.push(activity);

      })
    })
  })
};

// Day array getter/setter
//----------------------------
PeriodController.prototype.val = function(prop, val){
  if (typeof prop === 'object'){
    var self = this;
    angular.forEach(prop, function(item, key){
      self.val( key , item );
    });

    return true;
  } else if (typeof val === 'undefined') {
    return this['_' + prop] || null;
  } else {
    this['_' + prop] = val;
    return this['_' + prop];
  };
};