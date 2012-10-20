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
            gridPos = scope.gridPos,
            selectedDepth = returnSelectedDepth(grid);

        e.preventDefault();

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

            scope.$apply(function(){
              if (!isShiftPressed){
                var nextSelection = grid[previousOnAxis][selectedDepth.xMin];

                scope.gridPos.y = previousOnAxis;

                nextSelection.toggleSelection(true);
              }else{
                if (gridPos.y == selectedDepth.yMax && selectedDepth.yMax > selectedDepth.yMin){
                  for (var x = selectedDepth.xMin; x < selectedDepth.xMax + 1; x++){
                    grid[selectedDepth.yMax][x].toggleSelection(false);
                  }

                  scope.gridPos.y = scope.gridPos.y - 1;
                }else{
                  if (previousOnAxis != selectedDepth.yMin){
                    for (var x = selectedDepth.xMin; x < selectedDepth.xMax + 1; x++){
                      grid[previousOnAxis][x].toggleSelection(false);
                    }

                    scope.gridPos.y = scope.gridPos.y - 1;
                  }
                }
              }
            });

            break;
          case keyMap.right:
            var nextOnAxis = grid[selectedDepth.yMax][selectedDepth.xMax + 1] ? selectedDepth.xMax + 1 : selectedDepth.xMax;

            scope.$apply(function(){
              if (!isShiftPressed){
                var nextSelection = grid[selectedDepth.yMax][nextOnAxis];

                scope.gridPos.x = nextOnAxis;

                nextSelection.toggleSelection(isShiftPressed ? false : true);
              }else{
                if (gridPos.x == selectedDepth.xMin && selectedDepth.xMin < selectedDepth.xMax){
                  for (var y = selectedDepth.yMin; y < selectedDepth.yMax + 1; y++){
                    grid[y][selectedDepth.xMin].toggleSelection(false);
                  }

                  scope.gridPos.x = scope.gridPos.x + 1;
                }else{
                  if (nextOnAxis != selectedDepth.xMax){
                    for (var y = selectedDepth.yMin; y < selectedDepth.yMax + 1; y++){
                      grid[y][nextOnAxis].toggleSelection(false);
                    }

                    scope.gridPos.x = scope.gridPos.x + 1;
                  }
                }
              }
            });

            break;
          case keyMap.down:
            var nextOnAxis = grid[selectedDepth.yMax + 1] ? selectedDepth.yMax + 1 : selectedDepth.yMax;

            scope.$apply(function(){
              if (!isShiftPressed){
                var nextSelection = grid[nextOnAxis][selectedDepth.xMax];

                scope.gridPos.y = nextOnAxis;

                nextSelection.toggleSelection(isShiftPressed ? false : true);
              }else{
                if (gridPos.y == selectedDepth.yMin && selectedDepth.yMin < selectedDepth.yMax){

                  for (var x = selectedDepth.xMin; x < selectedDepth.xMax + 1; x++){
                    grid[selectedDepth.yMin][x].toggleSelection(false);
                  }

                  scope.gridPos.y = scope.gridPos.y + 1;
                }else{
                  if (nextOnAxis != selectedDepth.yMax){
                    for (var x = selectedDepth.xMin; x < selectedDepth.xMax + 1; x++){
                      grid[nextOnAxis][x].toggleSelection(false);
                    }

                    scope.gridPos.y = scope.gridPos.y + 1;
                  }
                }
              };
            });

            break;
          case keyMap.left:
            var previousOnAxis = grid[selectedDepth.xMin - 1] ? selectedDepth.xMin - 1 : selectedDepth.xMin; // find the point on the y-axis we should navigate to

            scope.$apply(function(){
              if (!isShiftPressed){
                var nextSelection = grid[selectedDepth.yMax][previousOnAxis];

                scope.gridPos.x = previousOnAxis;

                nextSelection.toggleSelection(true);
              }else{
                if (gridPos.x == selectedDepth.xMax && selectedDepth.xMax > selectedDepth.xMin){
                  for (var y = selectedDepth.yMin; y < selectedDepth.yMax + 1; y++){
                    grid[y][selectedDepth.xMax].toggleSelection(false);
                  }

                  scope.gridPos.x = scope.gridPos.x - 1;
                }else{
                  if (previousOnAxis != selectedDepth.xMin){
                    for (var y = selectedDepth.yMin; y < selectedDepth.yMax + 1; y++){
                      grid[y][previousOnAxis].toggleSelection(false);
                    }

                    scope.gridPos.x = scope.gridPos.x - 1;
                  }
                }
              }
            });

            break;
        };
      });
    }
  };
});
