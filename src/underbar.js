/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    n > array.length && (n = array.length);
    return n === undefined ? array[array.length-1] : array.slice(array.length-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;
    _.each(array, function(item, index) {
      if (result === -1 && item === target) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    return _.reduce(collection, function(passed, item) {
      if (test(item)) {
        passed.push(item);
      }
      return passed;
    }, []);
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(element) {
      return !test(element);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    return _.reduce(array, function(uniq, item) {
      if (_.indexOf(uniq, item) === -1) {
        uniq.push(item);
      }
      return uniq;
    }, []);
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    _.each(collection, function(element, index) {
      results[index] = iterator(element);
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(element) {
      if (typeof functionOrKey !== 'function') {
        return element[functionOrKey].apply(element, args);
      } else {
        return functionOrKey.apply(element, args);
      }
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    // Corner case: empty array/ object
    if (collection === undefined || collection.length === 0 || Object.keys(collection).length === 0) {
      return accumulator;
    }
    if (accumulator === undefined) {
      if (Array.isArray(collection)) {
        accumulator = collection[0];
      } else {
        var firstKey = Object.keys(collection)[0];
        accumulator = collection[firstKey];
      }
    }
    _.each(collection, function(element) {
      accumulator = iterator(accumulator, element, collection);
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      // if the item has already been found, don't compare item to target
      return wasFound ? true : item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    iterator = iterator ? iterator : _.identity;
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(state, element) {
      return !(!state || !iterator(element));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // if every item fails the truth test, then _.some should return false, otherwise true
    iterator = iterator ? iterator : _.identity;
    return !_.every(collection, function(item) { 
      return !(iterator(item)); 
    });  
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    return _.reduce(Array.prototype.slice.call(arguments, 1), function(obj, arg) {
      _.each(arg, function(value, key) {
        obj[key] = value;
      });
      return obj;
    }, obj);
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    // Is there a more elegant way to reuse extend here?
    for (var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(value, key) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = value;
        }
      });
    }
    return obj;    
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var remember = {};
    return function(arg) {
      if (!remember.hasOwnProperty(arg)) {
        remember[arg] = func(arg);
      }
      return remember[arg];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [];
    for (var i = 2; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    setTimeout(function() {
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var copy = array.slice(0);
    // Idea: Fisher–Yates shuffle ( http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle )
    // To shuffle an array a of n elements (indices 0..n-1):
    //   for i from n − 1 downto 1 do
    //     j ← random integer with 0 ≤ j ≤ i
    //     exchange a[j] and a[i]
    for (var i = copy.length - 1; i >= 1; i--) {
      var j = Math.round(i*Math.random());
      var memo = copy[i];
      copy[i] = copy[j];
      copy[j] = copy[memo];
    }
    return copy;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    // TODO Refactor!
    if (typeof iterator === 'string') {
      var prop = iterator;
      iterator = function(item) {
        return item[prop];
      }
    }
    var criterions = {};
    _.each(collection, function(obj) {
      var criterion = iterator(obj);
      if (!Array.isArray(criterions[criterion])) {
        criterions[criterion] = [];
      }
      criterions[criterion].push(obj);        
    });
    var sortedCriterions = Object.keys(criterions).sort();
    var sortedObjects = _.map(sortedCriterions, function(criterion) {
      return criterions[criterion];
    });
    sortedObjects = _.flatten(sortedObjects);
    return sortedObjects;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var results = [];
    _.each(arguments, function(value, j, arguments) {        
      var arr = [ arguments[0][j] ];
      for (var i = 1; i < arguments.length; i++) {
        arr.push(arguments[i][j]);
      }
      results.push(arr);
    });
    return results;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = result || [];
    if (Array.isArray(nestedArray)) {
      _.each(nestedArray, function(val) {
        _.flatten(val, result);
      });
    } else {
      result.push(nestedArray);
    }
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    // We need to store the current arguments somehow, since we can't access
    // them inside an anonymous function.
    var args = arguments;
    return _.filter(args[0], function(item) {
      // Returns true, if every args array contains item.
      return _.every(args, function(array) {
        return array.indexOf(item) !== -1;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    // TODO Is there are more elegant way to use intersection here?
    // We need to store the current arguments somehow, since we can't access
    // them inside an anonymous function.
    // arguments is not an array. Therefore, we need to convert it into one,
    // since we need the slice(...) method.
    // http://www.sitepoint.com/arguments-a-javascript-oddity/
    var args = Array.prototype.slice.call(arguments);
    return _.filter(args[0], function(item) {
      // Returns true, if no args array (except the first one) contains item.
      return _.every(args.slice(1), function(array) {
        return array.indexOf(item) === -1;
      });
    });
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    // TODO Finish (fails 1st test)
    var first = true;
    var lastReturned, called;
    
    return function() {
      var now = new Date().getTime();
      if (first || (now-called) >= wait) {
        first = false;
        called = now;
        lastReturned = func.apply(this, arguments);
      }
      return lastReturned;
    }
  };

}).call(this);
