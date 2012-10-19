'use strict';

aikaApp.directive('ncGridkey', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      var returnSelectedDepth = function(grid){
        var projectIdx = 0,
            depth = {
              yMin : null,
              yMax : null,
              xMax : null,
              xMin : null
            };
        angular.forEach(grid, function(projectsAxis){
          var dayIdx = 0;
          angular.forEach(projectsAxis, function(daysAxis){
            if (grid[projectIdx][dayIdx].isSelected == true){
              depth.yMin = projectIdx < depth.yMin || depth.yMin == null ? projectIdx : depth.yMin;
              depth.yMax = projectIdx > depth.yMax || depth.yMax == null ? projectIdx : depth.yMax;

              depth.xMin = dayIdx < depth.xMin || depth.xMin == null ? dayIdx : depth.xMin;
              depth.xMax = dayIdx > depth.xMax || depth.xMax == null ? dayIdx : depth.xMax;
            };
            dayIdx++;
          });
          projectIdx++;
        });

        return depth;
      };

      var yPos = 0,
          xPos = 0,
          isShiftPressed = false,
          isCtrlPressed = false;

      jQuery(element ).on('keyup', function(e){
        var keyCode = e.keyCode || e.which,
          keyMap = { shift: 16, ctrl: 17 };

        switch (keyCode) {
          case keyMap.shift:
            isShiftPressed = false;
            break;
          case keyMap.ctrl:
            isCtrlPressed = false;
            break;
        };
      });

      jQuery(element).on('keydown', function(e) {
        var keyCode = e.keyCode || e.which,
            keyMap = { end: 35, home: 36, left: 37, up: 38, right: 39, down: 40, shift: 16, ctrl: 17, enter: 13 },
            grid = scope.timeslotGrid,
            selectedDepth = returnSelectedDepth(grid),
            currentlySelected = grid[selectedDepth.yMax][selectedDepth.xMax];

        switch (keyCode) {
          case keyMap.shift:
            isShiftPressed = true;
            break;
          case keyMap.ctrl:
            isCtrlPressed = true;
            break;
          case keyMap.enter:
            scope.$apply(function(){
              for (var y = selectedDepth.yMin; y <= selectedDepth.yMax; y++){
                for (var x = selectedDepth.xMin; x <= selectedDepth.xMax; x++){
                  grid[y][x].isEditMode = !grid[y][x].isEditMode;
                }
              }
            });
            break;

          case keyMap.up:
            var previousOnAxis = grid[selectedDepth.yMin - 1] ? selectedDepth.yMin - 1 : selectedDepth.yMin; // find the point on the y-axis we should navigate to

            yPos = yPos - 1 > -1 ? yPos - 1 : yPos;
            console.log(yPos);

            scope.$apply(function(){
              if (!isShiftPressed){
                var nextSelection = grid[previousOnAxis][selectedDepth.xMin];
                nextSelection.toggleSelection(true);
              }else{
                if (yPos > previousOnAxis){
                  grid[selectedDepth.yMax][selectedDepth.xMin].toggleSelection(false);
                }else{
                  grid[previousOnAxis][selectedDepth.xMin].toggleSelection(false);
                }
              }
            });

            break;
          case keyMap.right:
            var nextOnAxis = grid[selectedDepth.yMax][selectedDepth.xMax + 1] ? selectedDepth.xMax + 1 : selectedDepth.xMax;

            scope.$apply(function(){
              var nextSelection = grid[selectedDepth.yMax][nextOnAxis];

              nextSelection.toggleSelection(isShiftPressed ? false : true);

              if (isShiftPressed){
                for (var y = selectedDepth.yMin; y < selectedDepth.yMax; y++){
                  grid[y][nextOnAxis].toggleSelection(false);
                }
              }
            });

            break;
          case keyMap.down:
            var nextOnAxis = grid[selectedDepth.yMax + 1] ? selectedDepth.yMax + 1 : selectedDepth.yMax;

            yPos = grid[yPos + 1] > -1 ? yPos + 1 : yPos;
            console.log(yPos);

            scope.$apply(function(){
              var nextSelection = grid[nextOnAxis][selectedDepth.xMax];

              nextSelection.toggleSelection(isShiftPressed ? false : true);

              if (isShiftPressed){
                for (var x = selectedDepth.xMin; x < selectedDepth.xMax; x++){
                  grid[nextOnAxis][x].toggleSelection(false)
                }
              };
            });

            break;
          case keyMap.left:
            var nextSelection = grid[selectedDepth.yMax][selectedDepth.xMin - 1] || currentlySelected;

            scope.$apply(function(){
              nextSelection.toggleSelection(true);
            });

            break;
        };
      });
    }
  };
});
