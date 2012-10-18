function Timeslot(date, hours, locked, highestRegistrationStatus){
  this.date = date;
  this.hours = hours;
  this.locked = locked;
  this.highestRegistrationStatus = highestRegistrationStatus;

  this.isSelected = false;
  this.isEditMode = false;
}

Timeslot.prototype.toggleMode = function(){
  this.isEditMode = !this.isEditMode;
}

Timeslot.prototype.toggleSelection = function(){
  this.isSelected = !this.isSelected;
}