/**
 * counter
 * =======
 * Creates counter that will generate number, starting from `start` (default to 0) 
 * incrementing (or decrementing) by `step` (default to 1). Based on 
 * [Python's itertools.count](http://docs.python.org/library/itertools.html#itertools.count).
 * 
 * cycle
 * =====
 * Returns a function that will generate items in `iterable` for each call, 
 * starting with the first one. Once the entire `iterable` has been returned, 
 * the cycle will return to the first item in `iterable` and repeat the cycle.
 * Based on [Python's itertools.cycle](http://docs.python.org/library/itertools.html#itertools.cycle).
 */

_.mixin({
  counter: function(start, step) {
    start = start || 0;
    step =  step  || 1;

    var countNumber = start - step;

    return function() {
      return (countNumber += step);
    };
  },

  cycle: function(iterable) {
    iterable = _.isString(iterable) ? iterable.split('') : _.toArray(iterable);

    var size = iterable.length;
    if (!size)
      throw new TypeError('object should be iterable and should not be empty');

    var idx = 0;
    return function() {
      if(idx >= size) idx = 0;
      return iterable[idx++];
    };
  }
});  
