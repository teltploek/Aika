function Timeslot(date, hours, locked, highestRegistrationStatus){
  this.date = date;
  this.hours = hours;
  this.locked = locked;
  this.highestRegistrationStatus = highestRegistrationStatus;

  this.isEditMode = false;
}

Timeslot.prototype.toggleMode = function(){
  this.isEditMode = !this.isEditMode;
}