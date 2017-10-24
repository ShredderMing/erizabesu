'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

var preact = require('preact');

__$styleInject(".erizabesu{\n  width:100%;\n  height:100%;\n  overflow:hidden;\n}\n.erizabesu .boards{\n  width:100%;\n  height:100%;\n  white-space:nowrap;\n}\n.erizabesu .boards .board{\n  display:inline-block;\n  width:100%;\n  height:100%;\n  background-size:cover;\n}\n",undefined);

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Erizabesu = function (_Component) {
  inherits(Erizabesu, _Component);

  function Erizabesu() {
    var _temp, _this, _ret;

    classCallCheck(this, Erizabesu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { boardIndex: 0, transition: true }, _this.autoPlay = function () {
      if (_this.props.autoPlay && !_this.interval) {
        _this.interval = setInterval(_this.nextBoard, 2000);
      }
    }, _this.clearAutoPlay = function () {
      if (_this.interval) {
        clearInterval(_this.interval);
        _this.interval = null;
      }
    }, _this.nextBoard = function () {
      _this.setState({
        boardIndex: (_this.state.boardIndex + 1) % _this.dataLength
      });
    }, _this.onSwipeStart = function (e) {
      _this.clearAutoPlay();
      _this.setState({ transition: false });
      _this.startX = getX(e);
      _this.startIndex = _this.state.boardIndex;
    }, _this.onSwipeMove = function (e) {
      var deltaX = getX(e) - _this.startX;
      _this.setState({
        boardIndex: _this.startIndex - deltaX / _this.boards.clientWidth
      });
    }, _this.onSwipeEnd = function (e) {
      _this.autoPlay();
      _this.setState({ transition: true });
      var boardIndex = _this.state.boardIndex;
      if (boardIndex < 0) {
        boardIndex = 0;
      } else if (boardIndex > _this.dataLength - 1) {
        boardIndex = _this.dataLength - 1;
      } else {
        boardIndex = Math.round(_this.state.boardIndex);
      }
      _this.setState({ boardIndex: boardIndex });
    }, _this.onMouseDown = function (e) {
      e.preventDefault();
      if (_this.props.allowMouseSwipe) {
        _this.mouseDown = true;
        document.addEventListener('mouseup', _this.onMouseUp);
        document.addEventListener('mousemove', _this.onMouseMove);
        _this.onSwipeStart(e);
      }
    }, _this.onMouseMove = function (e) {
      if (_this.mouseDown) {
        _this.onSwipeMove(e);
      }
    }, _this.onMouseUp = function (e) {
      _this.mouseDown = false;
      document.removeEventListener('mouseup', _this.onMouseUp);
      document.removeEventListener('mousemove', _this.onMouseMove);
      _this.onSwipeEnd(e);
    }, _this.onBoardClick = function (e) {
      if (_this.startX !== getX(e)) {
        e.preventDefault();
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Erizabesu.prototype.componentDidMount = function componentDidMount() {
    this.autoPlay();
    this.dataLength = this.props.data.length;

    this.boards.addEventListener('mousedown', this.onMouseDown);
    this.boards.addEventListener('touchstart', this.onSwipeStart);
    this.boards.addEventListener('touchmove', this.onSwipeMove);
    this.boards.addEventListener('touchend', this.onSwipeEnd);
  };

  Erizabesu.prototype.componentWillUnmount = function componentWillUnmount() {
    this.clearAutoPlay();

    this.boards.removeEventListener('mousedown', this.onMouseDown);
    this.boards.removeEventListener('touchstart', this.onSwipeStart);
    this.boards.removeEventListener('touchmove', this.onSwipeMove);
    this.boards.removeEventListener('touchend', this.onSwipeEnd);
  };

  Erizabesu.prototype.render = function render(_ref, _ref2) {
    var _this2 = this;

    var boardIndex = _ref2.boardIndex,
        transition = _ref2.transition;
    var data = _ref.data,
        className = _ref.className,
        indicator = _ref.indicator,
        props = objectWithoutProperties(_ref, ['data', 'className', 'indicator']);

    return preact.h(
      'div',
      _extends({}, props, {
        'class': ['erizabesu', props.class, className].filter(Boolean).join(' ')
      }),
      preact.h(
        'div',
        {
          ref: function ref(c) {
            return _this2.boards = c;
          },
          'class': 'boards',
          style: transition ? {
            transform: 'translateX(' + -boardIndex * 100 + '%)',
            transition: 'transform 0.5s ease'
          } : {
            transform: 'translateX(' + -boardIndex * 100 + '%)'
          }
        },
        data.map(function (board) {
          return preact.h('a', {
            'class': 'board',
            href: board.href,
            target: board.target,
            onClick: _this2.onBoardClick,
            style: { backgroundImage: 'url(' + board.img + ')' }
          });
        })
      ),
      indicator ? preact.h(indicator, { num: data.length, index: boardIndex }, null) : ''
    );
  };

  return Erizabesu;
}(preact.Component);

Erizabesu.defaultProps = { autoPlay: true, allowMouseSwipe: true };
function getX(e) {
  if ('touches' in e) {
    return e.touches[0].pageX;
  }
  return e.screenX;
}

module.exports = Erizabesu;
//# sourceMappingURL=erizabesu.js.map
