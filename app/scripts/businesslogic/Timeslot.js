var globalTimeslotArray = [];

function Timeslot(date, hours, locked, highestRegistrationStatus){
  this.date = date;
  this.hours = hours;
  this.locked = locked;
  this.highestRegistrationStatus = highestRegistrationStatus;

  this.isSelected = false;
  this.isEditMode = false;

  globalTimeslotArray.push(this);
};

Timeslot.prototype.toggleMode = function(){
  this.isEditMode = !this.isEditMode;
};

Timeslot.prototype.toggleSelection = function(deselectOthers){
  if (deselectOthers){
    angular.forEach(globalTimeslotArray, function(timeslot){
      timeslot.isSelected = false;
    })
  };

  this.isSelected = !this.isSelected;
};