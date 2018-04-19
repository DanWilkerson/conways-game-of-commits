(function() {

  if (!document.querySelector('.js-calendar-graph-svg')) { return; }

  const initialState = [].slice.call(document.querySelectorAll('.js-calendar-graph-svg g g'))
    .map(e => [].slice.call(e.querySelectorAll('.day')).map(r => r.getAttribute('fill') !== '#ebedf0'));

  Paint(State(initialState));
  function State(initialState) {

    let state = initialState;

    return {
      step: function() {

        state = state.map((col, colIdx, cols) => {

          return col.map((cell, cellIdx, col) => {
        
            const livingNeighbors = [
              [-1, -1], [-1, 0], [-1, 1],
              [0, -1], [0, 1],
              [1, -1], [1, 0], [1, 1]
            ]
              .map(coords => {

                try { return cols[colIdx + coords[0]][cellIdx + coords[1]] } catch(squelch) {} 

              })
              .filter(c => c); 

            if (!cell && livingNeighbors.length === 3) { return 1; } 
            if (cell && livingNeighbors.length > 3) { return 0; }

            return cell;

          }); 

        });

      },
      get: function() {

        return state;

      }
    };

  }

  function Paint(State) {

    const thisState = State;
    setInterval(update, 500);

    function update() {

      thisState.step();
      draw();

    }

    function draw() {

      const state = thisState.get();
      const board = [].slice.call(document.querySelectorAll('.js-calendar-graph-svg g g'))
        .map(e => [].slice.call(e.querySelectorAll('.day')));

      state.forEach((col, colIdx) => {

        col.forEach((cell, cellIdx) => {

          board[colIdx][cellIdx].setAttribute('fill', (state[colIdx][cellIdx] ? '#c6e48b' : '#ebedf0'));

        });

      });

    };
  }


})();
