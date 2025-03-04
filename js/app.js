/* Script for video skip with cookie */
	function getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
		}
		/*Getting a cookie end*/
	
	function setCookie(cname, cvalue, exdays) {	
		/*Setting a cookie if it's not set up*/
		const d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		let expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
var skipvideo = false;

/* Script for video skip with cookie end*/

/*Script for Background Spheres Animation*/
document.addEventListener('DOMContentLoaded', function(){
	/* Cookie for video skip */
	var visited = getCookie('firstVisit');
	/*Getting a cookie*/
	/* Cookie for video skip end*/
	if (visited == "") {
		setCookie('firstVisit', 'yes', 30);
	}
	else { skipvideo = true; }
	/*Beautiful Hover**/
	
	$.attractHover('.js-attract-hover',{
		proximity: 30,
		magnetism: 5
	});


	/*Beautiful Hover End**/
	
	var spherewidth = document.getElementById('bg__scena-1-source-sphere').offsetWidth;
	var tempwidth = spherewidth / 10;
	tempwidth = tempwidth + 'px';
	spherewidth = spherewidth + 'px';
	var allSpheres = document.querySelectorAll('.bg__scena-1-sphere');
	var zindexvalue = 10000;
	var ztranslate = 100;
	var styleTransformString = ""
	document.querySelector('.menu__icon.icon-menu').style.zIndex = zindexvalue + 1;
	allSpheres.forEach(function(currentValue) {
		currentValue.style.height = spherewidth;
		currentValue.style.zIndex = zindexvalue;
		zindexvalue = zindexvalue - 5;
		styleTransformString = 'translate-z(' + ztranslate + 'px)'
		currentValue.style.transform = styleTransformString;
		ztranslate = ztranslate - 2;
		});
	var allSpheresText = document.querySelectorAll('.bg__scena-1-sphere-text');
	allSpheresText.forEach(function(currentValue) {
		currentValue.style.lineHeight = spherewidth;
		currentValue.style.fontSize = tempwidth;
	});
});

var animationlock = false;


/**/

/**Animation Restart Function*/

function reset_animation(el) {
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null; 
}

/***/

	function ChangeSceneCustomFunction(scene1, scene2) {
	var allSpheres = document.querySelectorAll('.bg__scena-1-sphere');
	var allSpheresText = document.querySelectorAll('.bg__scena-1-sphere-text');
		let goForward = true;
		let changedDir = false;
		let icount = 1;
		let classtempstring = 'class name';
		if (scene1 == 6 && scene2 == 1) {
			allSpheres.forEach(function(currentValue) {
				classtempstring = 'scene-animation-scene5ToScene6byAxisSphere' + icount;
				currentValue.classList.remove(classtempstring);
				classtempstring = 'scene-animation-scene6ToScene1byAxisSphere' + icount;
				currentValue.classList.add(classtempstring);
				icount = icount + 1;
			});
			goForward = true;
			allSpheresText.forEach(function(currentValue) {
				if (icount != 1) {
					classtempstring = 'scene-animation-textOpacity0';
					currentValue.classList.remove(classtempstring); /*Удалили обратную анимацию*/
					reset_animation(currentValue);
					classtempstring = 'scene-animation-textOpacity0_rev';
					currentValue.classList.add(classtempstring); /*Добавили анимацию*/
					reset_animation(currentValue);
				}
				icount = icount + 1;
			});
		}
		else if (scene1 <= scene2) {
			if (goForward == false) {
				goForward = true;
				changedDir = true;
				}
			allSpheres.forEach(function(currentValue) {
				classtempstring = 'scene-animation-scene6ToScene1byAxisSphere' + icount; 
				currentValue.classList.remove(classtempstring); /* Спец. удаление для перехода с 6 на 1*/
				classtempstring = 'scene-animation-scene' + scene1 + 'ToScene' + scene2 + 'byAxisSphere' + icount;
				currentValue.classList.add(classtempstring); /*Добавили анимацию*/
				reset_animation(currentValue);
				classtempstring = 'scene-animation-scene' + (scene1 - 1) + 'ToScene' + (scene2 - 1) + 'byAxisSphere' + icount;
				currentValue.classList.remove(classtempstring); /*Удалили класс прошедшей анимации*/
				reset_animation(currentValue);
				classtempstring = 'scene-animation-scene' + scene1 + 'ToScene' + scene2 + 'byAxisSphere' + icount + '_rev';
				currentValue.classList.remove(classtempstring); /*Удалили класс анимации, которая мешает */
				icount = icount + 1;
			});
			changedDir = false;
		} else {
			if (goForward == true) {
				goForward = false;
				changedDir = true;
				}
			allSpheres.forEach(function(currentValue) {
				let classtempstringunique = "";
				classtempstring = 'scene-animation-scene6ToScene1byAxisSphere' + icount;
				currentValue.classList.remove(classtempstring); /* Спец. удаление для перехода с 6 на 1*/
				classtempstring = 'scene-animation-scene' + scene2 + 'ToScene' + scene1 + 'byAxisSphere' + icount + '_rev';
				currentValue.classList.add(classtempstring); /*Добавили анимацию*/
				reset_animation(currentValue);
				classtempstring = 'scene-animation-scene' + (scene2 + 1) + 'ToScene' + (scene1 + 1) + 'byAxisSphere' + icount + '_rev';
				currentValue.classList.remove(classtempstring); /*Удалили класс прошедшей анимации*/
				reset_animation(currentValue);
				classtempstring = 'scene-animation-scene' + scene2 + 'ToScene' + scene1 + 'byAxisSphere' + icount;
				currentValue.classList.remove(classtempstring); /*Удалили класс анимации, которая мешает */
				icount = icount + 1;
			});
			changedDir = false;
		}
		icount = 1;
		if (scene1 == 2 && scene2 == 3) {
			allSpheresText.forEach(function(currentValue) {
				if (icount != 1) {
					classtempstring = 'scene-animation-textOpacity0_rev';
					currentValue.classList.remove(classtempstring); /*Удалили обратную анимацию*/
					reset_animation(currentValue);
					classtempstring = 'scene-animation-textOpacity0';
					currentValue.classList.add(classtempstring); /*Добавили анимацию*/
					reset_animation(currentValue);
					
					
				}
				icount = icount + 1;
			});
		}
		else if (scene1 == 3 && scene2 == 2) {
			allSpheresText.forEach(function(currentValue) {
				if (icount != 1) {
					classtempstring = 'scene-animation-textOpacity0';
					currentValue.classList.remove(classtempstring); /*Удалили обратную анимацию*/
					reset_animation(currentValue);
					classtempstring = 'scene-animation-textOpacity0_rev';
					currentValue.classList.add(classtempstring); /*Добавили анимацию*/
					reset_animation(currentValue);
				}
				icount = icount + 1;
			});
		}

	}
/**/


/*Script for Backgroudn Spheres Animation END*/

;(() => {
  var e = {
      732: function (e) {
        e.exports = (function () {
          'use strict'
          function e() {
            return (
              (e =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t]
                    for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i])
                  }
                  return e
                }),
              e.apply(this, arguments)
            )
          }
          var t = 'undefined' != typeof window,
            s =
              (t && !('onscroll' in window)) ||
              ('undefined' != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            i = t && 'IntersectionObserver' in window,
            n = t && 'classList' in document.createElement('p'),
            r = t && window.devicePixelRatio > 1,
            a = {
              elements_selector: '.lazy',
              container: s || t ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: 'src',
              data_srcset: 'srcset',
              data_sizes: 'sizes',
              data_bg: 'bg',
              data_bg_hidpi: 'bg-hidpi',
              data_bg_multi: 'bg-multi',
              data_bg_multi_hidpi: 'bg-multi-hidpi',
              data_poster: 'poster',
              class_applied: 'applied',
              class_loading: 'loading',
              class_loaded: 'loaded',
              class_error: 'error',
              class_entered: 'entered',
              class_exited: 'exited',
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
            },
            o = function (t) {
              return e({}, a, t)
            },
            l = function (e, t) {
              var s,
                i = 'LazyLoad::Initialized',
                n = new e(t)
              try {
                s = new CustomEvent(i, { detail: { instance: n } })
              } catch (e) {
                ;(s = document.createEvent('CustomEvent')).initCustomEvent(i, !1, !1, { instance: n })
              }
              window.dispatchEvent(s)
            },
            d = 'src',
            c = 'srcset',
            u = 'sizes',
            p = 'poster',
            f = 'llOriginalAttrs',
            h = 'loading',
            m = 'loaded',
            g = 'applied',
            v = 'error',
            w = 'native',
            b = 'data-',
            y = 'll-status',
            S = function (e, t) {
              return e.getAttribute(b + t)
            },
            E = function (e) {
              return S(e, y)
            },
            T = function (e, t) {
              return (function (e, t, s) {
                var i = 'data-ll-status'
                null !== s ? e.setAttribute(i, s) : e.removeAttribute(i)
              })(e, 0, t)
            },
            x = function (e) {
              return T(e, null)
            },
            C = function (e) {
              return null === E(e)
            },
            L = function (e) {
              return E(e) === w
            },
            _ = [h, m, g, v],
            k = function (e, t, s, i) {
              e && (void 0 === i ? (void 0 === s ? e(t) : e(t, s)) : e(t, s, i))
            },
            M = function (e, t) {
              n ? e.classList.add(t) : (e.className += (e.className ? ' ' : '') + t)
            },
            P = function (e, t) {
              n
                ? e.classList.remove(t)
                : (e.className = e.className
                    .replace(new RegExp('(^|\\s+)' + t + '(\\s+|$)'), ' ')
                    .replace(/^\s+/, '')
                    .replace(/\s+$/, ''))
            },
            I = function (e) {
              return e.llTempImage
            },
            A = function (e, t) {
              if (t) {
                var s = t._observer
                s && s.unobserve(e)
              }
            },
            O = function (e, t) {
              e && (e.loadingCount += t)
            },
            $ = function (e, t) {
              e && (e.toLoadCount = t)
            },
            z = function (e) {
              for (var t, s = [], i = 0; (t = e.children[i]); i += 1) 'SOURCE' === t.tagName && s.push(t)
              return s
            },
            D = function (e, t) {
              var s = e.parentNode
              s && 'PICTURE' === s.tagName && z(s).forEach(t)
            },
            N = function (e, t) {
              z(e).forEach(t)
            },
            G = [d],
            B = [d, p],
            q = [d, c, u],
            j = function (e) {
              return !!e[f]
            },
            H = function (e) {
              return e[f]
            },
            F = function (e) {
              return delete e[f]
            },
            V = function (e, t) {
              if (!j(e)) {
                var s = {}
                t.forEach(function (t) {
                  s[t] = e.getAttribute(t)
                }),
                  (e[f] = s)
              }
            },
            R = function (e, t) {
              if (j(e)) {
                var s = H(e)
                t.forEach(function (t) {
                  !(function (e, t, s) {
                    s ? e.setAttribute(t, s) : e.removeAttribute(t)
                  })(e, t, s[t])
                })
              }
            },
            W = function (e, t, s) {
              M(e, t.class_loading), T(e, h), s && (O(s, 1), k(t.callback_loading, e, s))
            },
            X = function (e, t, s) {
              s && e.setAttribute(t, s)
            },
            Y = function (e, t) {
              X(e, u, S(e, t.data_sizes)), X(e, c, S(e, t.data_srcset)), X(e, d, S(e, t.data_src))
            },
            U = {
              IMG: function (e, t) {
                D(e, function (e) {
                  V(e, q), Y(e, t)
                }),
                  V(e, q),
                  Y(e, t)
              },
              IFRAME: function (e, t) {
                V(e, G), X(e, d, S(e, t.data_src))
              },
              VIDEO: function (e, t) {
                N(e, function (e) {
                  V(e, G), X(e, d, S(e, t.data_src))
                }),
                  V(e, B),
                  X(e, p, S(e, t.data_poster)),
                  X(e, d, S(e, t.data_src)),
                  e.load()
              },
            },
            Q = ['IMG', 'IFRAME', 'VIDEO'],
            K = function (e, t) {
              !t ||
                (function (e) {
                  return e.loadingCount > 0
                })(t) ||
                (function (e) {
                  return e.toLoadCount > 0
                })(t) ||
                k(e.callback_finish, t)
            },
            J = function (e, t, s) {
              e.addEventListener(t, s), (e.llEvLisnrs[t] = s)
            },
            Z = function (e, t, s) {
              e.removeEventListener(t, s)
            },
            ee = function (e) {
              return !!e.llEvLisnrs
            },
            te = function (e) {
              if (ee(e)) {
                var t = e.llEvLisnrs
                for (var s in t) {
                  var i = t[s]
                  Z(e, s, i)
                }
                delete e.llEvLisnrs
              }
            },
            se = function (e, t, s) {
              !(function (e) {
                delete e.llTempImage
              })(e),
                O(s, -1),
                (function (e) {
                  e && (e.toLoadCount -= 1)
                })(s),
                P(e, t.class_loading),
                t.unobserve_completed && A(e, s)
            },
            ie = function (e, t, s) {
              var i = I(e) || e
              ee(i) ||
                (function (e, t, s) {
                  ee(e) || (e.llEvLisnrs = {})
                  var i = 'VIDEO' === e.tagName ? 'loadeddata' : 'load'
                  J(e, i, t), J(e, 'error', s)
                })(
                  i,
                  function (n) {
                    !(function (e, t, s, i) {
                      var n = L(t)
                      se(t, s, i), M(t, s.class_loaded), T(t, m), k(s.callback_loaded, t, i), n || K(s, i)
                    })(0, e, t, s),
                      te(i)
                  },
                  function (n) {
                    !(function (e, t, s, i) {
                      var n = L(t)
                      se(t, s, i), M(t, s.class_error), T(t, v), k(s.callback_error, t, i), n || K(s, i)
                    })(0, e, t, s),
                      te(i)
                  }
                )
            },
            ne = function (e, t, s) {
              !(function (e) {
                e.llTempImage = document.createElement('IMG')
              })(e),
                ie(e, t, s),
                (function (e) {
                  j(e) || (e[f] = { backgroundImage: e.style.backgroundImage })
                })(e),
                (function (e, t, s) {
                  var i = S(e, t.data_bg),
                    n = S(e, t.data_bg_hidpi),
                    a = r && n ? n : i
                  a && ((e.style.backgroundImage = 'url("'.concat(a, '")')), I(e).setAttribute(d, a), W(e, t, s))
                })(e, t, s),
                (function (e, t, s) {
                  var i = S(e, t.data_bg_multi),
                    n = S(e, t.data_bg_multi_hidpi),
                    a = r && n ? n : i
                  a &&
                    ((e.style.backgroundImage = a),
                    (function (e, t, s) {
                      M(e, t.class_applied),
                        T(e, g),
                        s && (t.unobserve_completed && A(e, t), k(t.callback_applied, e, s))
                    })(e, t, s))
                })(e, t, s)
            },
            re = function (e, t, s) {
              !(function (e) {
                return Q.indexOf(e.tagName) > -1
              })(e)
                ? ne(e, t, s)
                : (function (e, t, s) {
                    ie(e, t, s),
                      (function (e, t, s) {
                        var i = U[e.tagName]
                        i && (i(e, t), W(e, t, s))
                      })(e, t, s)
                  })(e, t, s)
            },
            ae = function (e) {
              e.removeAttribute(d), e.removeAttribute(c), e.removeAttribute(u)
            },
            oe = function (e) {
              D(e, function (e) {
                R(e, q)
              }),
                R(e, q)
            },
            le = {
              IMG: oe,
              IFRAME: function (e) {
                R(e, G)
              },
              VIDEO: function (e) {
                N(e, function (e) {
                  R(e, G)
                }),
                  R(e, B),
                  e.load()
              },
            },
            de = function (e, t) {
              ;(function (e) {
                var t = le[e.tagName]
                t
                  ? t(e)
                  : (function (e) {
                      if (j(e)) {
                        var t = H(e)
                        e.style.backgroundImage = t.backgroundImage
                      }
                    })(e)
              })(e),
                (function (e, t) {
                  C(e) ||
                    L(e) ||
                    (P(e, t.class_entered),
                    P(e, t.class_exited),
                    P(e, t.class_applied),
                    P(e, t.class_loading),
                    P(e, t.class_loaded),
                    P(e, t.class_error))
                })(e, t),
                x(e),
                F(e)
            },
            ce = ['IMG', 'IFRAME', 'VIDEO'],
            ue = function (e) {
              return e.use_native && 'loading' in HTMLImageElement.prototype
            },
            pe = function (e, t, s) {
              e.forEach(function (e) {
                return (function (e) {
                  return e.isIntersecting || e.intersectionRatio > 0
                })(e)
                  ? (function (e, t, s, i) {
                      var n = (function (e) {
                        return _.indexOf(E(e)) >= 0
                      })(e)
                      T(e, 'entered'),
                        M(e, s.class_entered),
                        P(e, s.class_exited),
                        (function (e, t, s) {
                          t.unobserve_entered && A(e, s)
                        })(e, s, i),
                        k(s.callback_enter, e, t, i),
                        n || re(e, s, i)
                    })(e.target, e, t, s)
                  : (function (e, t, s, i) {
                      C(e) ||
                        (M(e, s.class_exited),
                        (function (e, t, s, i) {
                          s.cancel_on_exit &&
                            (function (e) {
                              return E(e) === h
                            })(e) &&
                            'IMG' === e.tagName &&
                            (te(e),
                            (function (e) {
                              D(e, function (e) {
                                ae(e)
                              }),
                                ae(e)
                            })(e),
                            oe(e),
                            P(e, s.class_loading),
                            O(i, -1),
                            x(e),
                            k(s.callback_cancel, e, t, i))
                        })(e, t, s, i),
                        k(s.callback_exit, e, t, i))
                    })(e.target, e, t, s)
              })
            },
            fe = function (e) {
              return Array.prototype.slice.call(e)
            },
            he = function (e) {
              return e.container.querySelectorAll(e.elements_selector)
            },
            me = function (e) {
              return (function (e) {
                return E(e) === v
              })(e)
            },
            ge = function (e, t) {
              return (function (e) {
                return fe(e).filter(C)
              })(e || he(t))
            },
            ve = function (e, s) {
              var n = o(e)
              ;(this._settings = n),
                (this.loadingCount = 0),
                (function (e, t) {
                  i &&
                    !ue(e) &&
                    (t._observer = new IntersectionObserver(
                      function (s) {
                        pe(s, e, t)
                      },
                      (function (e) {
                        return {
                          root: e.container === document ? null : e.container,
                          rootMargin: e.thresholds || e.threshold + 'px',
                        }
                      })(e)
                    ))
                })(n, this),
                (function (e, s) {
                  t &&
                    window.addEventListener('online', function () {
                      !(function (e, t) {
                        var s
                        ;((s = he(e)), fe(s).filter(me)).forEach(function (t) {
                          P(t, e.class_error), x(t)
                        }),
                          t.update()
                      })(e, s)
                    })
                })(n, this),
                this.update(s)
            }
          return (
            (ve.prototype = {
              update: function (e) {
                var t,
                  n,
                  r = this._settings,
                  a = ge(e, r)
                $(this, a.length),
                  !s && i
                    ? ue(r)
                      ? (function (e, t, s) {
                          e.forEach(function (e) {
                            ;-1 !== ce.indexOf(e.tagName) &&
                              (function (e, t, s) {
                                e.setAttribute('loading', 'lazy'),
                                  ie(e, t, s),
                                  (function (e, t) {
                                    var s = U[e.tagName]
                                    s && s(e, t)
                                  })(e, t),
                                  T(e, w)
                              })(e, t, s)
                          }),
                            $(s, 0)
                        })(a, r, this)
                      : ((n = a),
                        (function (e) {
                          e.disconnect()
                        })((t = this._observer)),
                        (function (e, t) {
                          t.forEach(function (t) {
                            e.observe(t)
                          })
                        })(t, n))
                    : this.loadAll(a)
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  he(this._settings).forEach(function (e) {
                    F(e)
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this.loadingCount,
                  delete this.toLoadCount
              },
              loadAll: function (e) {
                var t = this,
                  s = this._settings
                ge(e, s).forEach(function (e) {
                  A(e, t), re(e, s, t)
                })
              },
              restoreAll: function () {
                var e = this._settings
                he(e).forEach(function (t) {
                  de(t, e)
                })
              },
            }),
            (ve.load = function (e, t) {
              var s = o(t)
              re(e, s)
            }),
            (ve.resetStatus = function (e) {
              x(e)
            }),
            t &&
              (function (e, t) {
                if (t)
                  if (t.length) for (var s, i = 0; (s = t[i]); i += 1) l(e, s)
                  else l(e, t)
              })(ve, window.lazyLoadOptions),
            ve
          )
        })()
      },
    },
    t = {}
  function s(i) {
    var n = t[i]
    if (void 0 !== n) return n.exports
    var r = (t[i] = { exports: {} })
    return e[i].call(r.exports, r, r.exports, s), r.exports
  }
  ;(() => {
    'use strict'
    function e(e) {
      this.type = e
    }
    ;(e.prototype.init = function () {
      const e = this
      ;(this.оbjects = []),
        (this.daClassname = '_dynamic_adapt_'),
        (this.nodes = document.querySelectorAll('[data-da]'))
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          s = t.dataset.da.trim().split(','),
          i = {}
        ;(i.element = t),
          (i.parent = t.parentNode),
          (i.destination = document.querySelector(s[0].trim())),
          (i.breakpoint = s[1] ? s[1].trim() : '767'),
          (i.place = s[2] ? s[2].trim() : 'last'),
          (i.index = this.indexInParent(i.parent, i.element)),
          this.оbjects.push(i)
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return '(' + this.type + '-width: ' + e.breakpoint + 'px),' + e.breakpoint
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (e, t, s) {
          return Array.prototype.indexOf.call(s, e) === t
        }))
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const s = this.mediaQueries[t],
          i = String.prototype.split.call(s, ','),
          n = window.matchMedia(i[0]),
          r = i[1],
          a = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === r
          })
        n.addListener(function () {
          e.mediaHandler(n, a)
        }),
          this.mediaHandler(n, a)
      }
    }),
      (e.prototype.mediaHandler = function (e, t) {
        if (e.matches)
          for (let e = 0; e < t.length; e++) {
            const s = t[e]
            ;(s.index = this.indexInParent(s.parent, s.element)), this.moveTo(s.place, s.element, s.destination)
          }
        else
          for (let e = t.length - 1; e >= 0; e--) {
            const s = t[e]
            s.element.classList.contains(this.daClassname) && this.moveBack(s.parent, s.element, s.index)
          }
      }),
      (e.prototype.moveTo = function (e, t, s) {
        t.classList.add(this.daClassname),
          'last' === e || e >= s.children.length
            ? s.insertAdjacentElement('beforeend', t)
            : 'first' !== e
            ? s.children[e].insertAdjacentElement('beforebegin', t)
            : s.insertAdjacentElement('afterbegin', t)
      }),
      (e.prototype.moveBack = function (e, t, s) {
        t.classList.remove(this.daClassname),
          void 0 !== e.children[s]
            ? e.children[s].insertAdjacentElement('beforebegin', t)
            : e.insertAdjacentElement('beforeend', t)
      }),
      (e.prototype.indexInParent = function (e, t) {
        const s = Array.prototype.slice.call(e.children)
        return Array.prototype.indexOf.call(s, t)
      }),
      (e.prototype.arraySort = function (e) {
        'min' === this.type
          ? Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : 'first' === e.place || 'last' === t.place
                  ? -1
                  : 'last' === e.place || 'first' === t.place
                  ? 1
                  : e.place - t.place
                : e.breakpoint - t.breakpoint
            })
          : Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : 'first' === e.place || 'last' === t.place
                  ? 1
                  : 'last' === e.place || 'first' === t.place
                  ? -1
                  : t.place - e.place
                : t.breakpoint - e.breakpoint
            })
      })
    new e('max').init()
    let t = !0,
      i = (e = 500) => {
        let s = document.querySelector('body')
        if (t) {
          let i = document.querySelectorAll('[data-lp]')
          setTimeout(() => {
            for (let e = 0; e < i.length; e++) {
              i[e].style.paddingRight = '0px'
            }
            ;(s.style.paddingRight = '0px'), document.documentElement.classList.remove('lock')
          }, e),
            (t = !1),
            setTimeout(function () {
              t = !0
            }, e)
        }
      },
      n = (e = 500) => {
        let s = document.querySelector('body')
        if (t) {
          let i = document.querySelectorAll('[data-lp]')
          for (let e = 0; e < i.length; e++) {
            i[e].style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
          }
          ;(s.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'),
            document.documentElement.classList.add('lock'),
            (t = !1),
            setTimeout(function () {
              t = !0
            }, e)
        }
      }
    function r(e) {
      return null !== e && 'object' == typeof e && 'constructor' in e && e.constructor === Object
    }
    function a(e = {}, t = {}) {
      Object.keys(t).forEach(s => {
        void 0 === e[s] ? (e[s] = t[s]) : r(t[s]) && r(e[s]) && Object.keys(t[s]).length > 0 && a(e[s], t[s])
      })
    }
    const o = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: { blur() {}, nodeName: '' },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({ initEvent() {} }),
      createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => [],
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: '',
      },
    }
    function l() {
      const e = 'undefined' != typeof document ? document : {}
      return a(e, o), e
    }
    const d = {
      document: o,
      navigator: { userAgent: '' },
      location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: '',
      },
      history: { replaceState() {}, pushState() {}, go() {}, back() {} },
      CustomEvent: function () {
        return this
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({ getPropertyValue: () => '' }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: e => ('undefined' == typeof setTimeout ? (e(), null) : setTimeout(e, 0)),
      cancelAnimationFrame(e) {
        'undefined' != typeof setTimeout && clearTimeout(e)
      },
    }
    function c() {
      const e = 'undefined' != typeof window ? window : {}
      return a(e, d), e
    }
    class u extends Array {
      constructor(e) {
        'number' == typeof e
          ? super(e)
          : (super(...(e || [])),
            (function (e) {
              const t = e.__proto__
              Object.defineProperty(e, '__proto__', {
                get: () => t,
                set(e) {
                  t.__proto__ = e
                },
              })
            })(this))
      }
    }
    function p(e = []) {
      const t = []
      return (
        e.forEach(e => {
          Array.isArray(e) ? t.push(...p(e)) : t.push(e)
        }),
        t
      )
    }
    function f(e, t) {
      return Array.prototype.filter.call(e, t)
    }
    function h(e, t) {
      const s = c(),
        i = l()
      let n = []
      if (!t && e instanceof u) return e
      if (!e) return new u(n)
      if ('string' == typeof e) {
        const s = e.trim()
        if (s.indexOf('<') >= 0 && s.indexOf('>') >= 0) {
          let e = 'div'
          0 === s.indexOf('<li') && (e = 'ul'),
            0 === s.indexOf('<tr') && (e = 'tbody'),
            (0 !== s.indexOf('<td') && 0 !== s.indexOf('<th')) || (e = 'tr'),
            0 === s.indexOf('<tbody') && (e = 'table'),
            0 === s.indexOf('<option') && (e = 'select')
          const t = i.createElement(e)
          t.innerHTML = s
          for (let e = 0; e < t.childNodes.length; e += 1) n.push(t.childNodes[e])
        } else
          n = (function (e, t) {
            if ('string' != typeof e) return [e]
            const s = [],
              i = t.querySelectorAll(e)
            for (let e = 0; e < i.length; e += 1) s.push(i[e])
            return s
          })(e.trim(), t || i)
      } else if (e.nodeType || e === s || e === i) n.push(e)
      else if (Array.isArray(e)) {
        if (e instanceof u) return e
        n = e
      }
      return new u(
        (function (e) {
          const t = []
          for (let s = 0; s < e.length; s += 1) -1 === t.indexOf(e[s]) && t.push(e[s])
          return t
        })(n)
      )
    }
    h.fn = u.prototype
    const m = 'resize scroll'.split(' ')
    function g(e) {
      return function (...t) {
        if (void 0 === t[0]) {
          for (let t = 0; t < this.length; t += 1)
            m.indexOf(e) < 0 && (e in this[t] ? this[t][e]() : h(this[t]).trigger(e))
          return this
        }
        return this.on(e, ...t)
      }
    }
    g('click'),
      g('blur'),
      g('focus'),
      g('focusin'),
      g('focusout'),
      g('keyup'),
      g('keydown'),
      g('keypress'),
      g('submit'),
      g('change'),
      g('mousedown'),
      g('mousemove'),
      g('mouseup'),
      g('mouseenter'),
      g('mouseleave'),
      g('mouseout'),
      g('mouseover'),
      g('touchstart'),
      g('touchend'),
      g('touchmove'),
      g('resize'),
      g('scroll')
    const v = {
      addClass: function (...e) {
        const t = p(e.map(e => e.split(' ')))
        return (
          this.forEach(e => {
            e.classList.add(...t)
          }),
          this
        )
      },
      removeClass: function (...e) {
        const t = p(e.map(e => e.split(' ')))
        return (
          this.forEach(e => {
            e.classList.remove(...t)
          }),
          this
        )
      },
      hasClass: function (...e) {
        const t = p(e.map(e => e.split(' ')))
        return f(this, e => t.filter(t => e.classList.contains(t)).length > 0).length > 0
      },
      toggleClass: function (...e) {
        const t = p(e.map(e => e.split(' ')))
        this.forEach(e => {
          t.forEach(t => {
            e.classList.toggle(t)
          })
        })
      },
      attr: function (e, t) {
        if (1 === arguments.length && 'string' == typeof e) return this[0] ? this[0].getAttribute(e) : void 0
        for (let s = 0; s < this.length; s += 1)
          if (2 === arguments.length) this[s].setAttribute(e, t)
          else for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t])
        return this
      },
      removeAttr: function (e) {
        for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e)
        return this
      },
      transform: function (e) {
        for (let t = 0; t < this.length; t += 1) this[t].style.transform = e
        return this
      },
      transition: function (e) {
        for (let t = 0; t < this.length; t += 1) this[t].style.transitionDuration = 'string' != typeof e ? `${e}ms` : e
        return this
      },
      on: function (...e) {
        let [t, s, i, n] = e
        function r(e) {
          const t = e.target
          if (!t) return
          const n = e.target.dom7EventData || []
          if ((n.indexOf(e) < 0 && n.unshift(e), h(t).is(s))) i.apply(t, n)
          else {
            const e = h(t).parents()
            for (let t = 0; t < e.length; t += 1) h(e[t]).is(s) && i.apply(e[t], n)
          }
        }
        function a(e) {
          const t = (e && e.target && e.target.dom7EventData) || []
          t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t)
        }
        'function' == typeof e[1] && (([t, i, n] = e), (s = void 0)), n || (n = !1)
        const o = t.split(' ')
        let l
        for (let e = 0; e < this.length; e += 1) {
          const t = this[e]
          if (s)
            for (l = 0; l < o.length; l += 1) {
              const e = o[l]
              t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                t.dom7LiveListeners[e].push({ listener: i, proxyListener: r }),
                t.addEventListener(e, r, n)
            }
          else
            for (l = 0; l < o.length; l += 1) {
              const e = o[l]
              t.dom7Listeners || (t.dom7Listeners = {}),
                t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                t.dom7Listeners[e].push({ listener: i, proxyListener: a }),
                t.addEventListener(e, a, n)
            }
        }
        return this
      },
      off: function (...e) {
        let [t, s, i, n] = e
        'function' == typeof e[1] && (([t, i, n] = e), (s = void 0)), n || (n = !1)
        const r = t.split(' ')
        for (let e = 0; e < r.length; e += 1) {
          const t = r[e]
          for (let e = 0; e < this.length; e += 1) {
            const r = this[e]
            let a
            if (
              (!s && r.dom7Listeners
                ? (a = r.dom7Listeners[t])
                : s && r.dom7LiveListeners && (a = r.dom7LiveListeners[t]),
              a && a.length)
            )
              for (let e = a.length - 1; e >= 0; e -= 1) {
                const s = a[e]
                ;(i && s.listener === i) || (i && s.listener && s.listener.dom7proxy && s.listener.dom7proxy === i)
                  ? (r.removeEventListener(t, s.proxyListener, n), a.splice(e, 1))
                  : i || (r.removeEventListener(t, s.proxyListener, n), a.splice(e, 1))
              }
          }
        }
        return this
      },
      trigger: function (...e) {
        const t = c(),
          s = e[0].split(' '),
          i = e[1]
        for (let n = 0; n < s.length; n += 1) {
          const r = s[n]
          for (let s = 0; s < this.length; s += 1) {
            const n = this[s]
            if (t.CustomEvent) {
              const s = new t.CustomEvent(r, {
                detail: i,
                bubbles: !0,
                cancelable: !0,
              })
              ;(n.dom7EventData = e.filter((e, t) => t > 0)),
                n.dispatchEvent(s),
                (n.dom7EventData = []),
                delete n.dom7EventData
            }
          }
        }
        return this
      },
      transitionEnd: function (e) {
        const t = this
        return (
          e &&
            t.on('transitionend', function s(i) {
              i.target === this && (e.call(this, i), t.off('transitionend', s))
            }),
          this
        )
      },
      outerWidth: function (e) {
        if (this.length > 0) {
          if (e) {
            const e = this.styles()
            return (
              this[0].offsetWidth +
              parseFloat(e.getPropertyValue('margin-right')) +
              parseFloat(e.getPropertyValue('margin-left'))
            )
          }
          return this[0].offsetWidth
        }
        return null
      },
      outerHeight: function (e) {
        if (this.length > 0) {
          if (e) {
            const e = this.styles()
            return (
              this[0].offsetHeight +
              parseFloat(e.getPropertyValue('margin-top')) +
              parseFloat(e.getPropertyValue('margin-bottom'))
            )
          }
          return this[0].offsetHeight
        }
        return null
      },
      styles: function () {
        const e = c()
        return this[0] ? e.getComputedStyle(this[0], null) : {}
      },
      offset: function () {
        if (this.length > 0) {
          const e = c(),
            t = l(),
            s = this[0],
            i = s.getBoundingClientRect(),
            n = t.body,
            r = s.clientTop || n.clientTop || 0,
            a = s.clientLeft || n.clientLeft || 0,
            o = s === e ? e.scrollY : s.scrollTop,
            d = s === e ? e.scrollX : s.scrollLeft
          return { top: i.top + o - r, left: i.left + d - a }
        }
        return null
      },
      css: function (e, t) {
        const s = c()
        let i
        if (1 === arguments.length) {
          if ('string' != typeof e) {
            for (i = 0; i < this.length; i += 1) for (const t in e) this[i].style[t] = e[t]
            return this
          }
          if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(e)
        }
        if (2 === arguments.length && 'string' == typeof e) {
          for (i = 0; i < this.length; i += 1) this[i].style[e] = t
          return this
        }
        return this
      },
      each: function (e) {
        return e
          ? (this.forEach((t, s) => {
              e.apply(t, [t, s])
            }),
            this)
          : this
      },
      html: function (e) {
        if (void 0 === e) return this[0] ? this[0].innerHTML : null
        for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e
        return this
      },
      text: function (e) {
        if (void 0 === e) return this[0] ? this[0].textContent.trim() : null
        for (let t = 0; t < this.length; t += 1) this[t].textContent = e
        return this
      },
      is: function (e) {
        const t = c(),
          s = l(),
          i = this[0]
        let n, r
        if (!i || void 0 === e) return !1
        if ('string' == typeof e) {
          if (i.matches) return i.matches(e)
          if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e)
          if (i.msMatchesSelector) return i.msMatchesSelector(e)
          for (n = h(e), r = 0; r < n.length; r += 1) if (n[r] === i) return !0
          return !1
        }
        if (e === s) return i === s
        if (e === t) return i === t
        if (e.nodeType || e instanceof u) {
          for (n = e.nodeType ? [e] : e, r = 0; r < n.length; r += 1) if (n[r] === i) return !0
          return !1
        }
        return !1
      },
      index: function () {
        let e,
          t = this[0]
        if (t) {
          for (e = 0; null !== (t = t.previousSibling); ) 1 === t.nodeType && (e += 1)
          return e
        }
      },
      eq: function (e) {
        if (void 0 === e) return this
        const t = this.length
        if (e > t - 1) return h([])
        if (e < 0) {
          const s = t + e
          return h(s < 0 ? [] : [this[s]])
        }
        return h([this[e]])
      },
      append: function (...e) {
        let t
        const s = l()
        for (let i = 0; i < e.length; i += 1) {
          t = e[i]
          for (let e = 0; e < this.length; e += 1)
            if ('string' == typeof t) {
              const i = s.createElement('div')
              for (i.innerHTML = t; i.firstChild; ) this[e].appendChild(i.firstChild)
            } else if (t instanceof u) for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s])
            else this[e].appendChild(t)
        }
        return this
      },
      prepend: function (e) {
        const t = l()
        let s, i
        for (s = 0; s < this.length; s += 1)
          if ('string' == typeof e) {
            const n = t.createElement('div')
            for (n.innerHTML = e, i = n.childNodes.length - 1; i >= 0; i -= 1)
              this[s].insertBefore(n.childNodes[i], this[s].childNodes[0])
          } else if (e instanceof u) for (i = 0; i < e.length; i += 1) this[s].insertBefore(e[i], this[s].childNodes[0])
          else this[s].insertBefore(e, this[s].childNodes[0])
        return this
      },
      next: function (e) {
        return this.length > 0
          ? e
            ? this[0].nextElementSibling && h(this[0].nextElementSibling).is(e)
              ? h([this[0].nextElementSibling])
              : h([])
            : this[0].nextElementSibling
            ? h([this[0].nextElementSibling])
            : h([])
          : h([])
      },
      nextAll: function (e) {
        const t = []
        let s = this[0]
        if (!s) return h([])
        for (; s.nextElementSibling; ) {
          const i = s.nextElementSibling
          e ? h(i).is(e) && t.push(i) : t.push(i), (s = i)
        }
        return h(t)
      },
      prev: function (e) {
        if (this.length > 0) {
          const t = this[0]
          return e
            ? t.previousElementSibling && h(t.previousElementSibling).is(e)
              ? h([t.previousElementSibling])
              : h([])
            : t.previousElementSibling
            ? h([t.previousElementSibling])
            : h([])
        }
        return h([])
      },
      prevAll: function (e) {
        const t = []
        let s = this[0]
        if (!s) return h([])
        for (; s.previousElementSibling; ) {
          const i = s.previousElementSibling
          e ? h(i).is(e) && t.push(i) : t.push(i), (s = i)
        }
        return h(t)
      },
      parent: function (e) {
        const t = []
        for (let s = 0; s < this.length; s += 1)
          null !== this[s].parentNode &&
            (e ? h(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode))
        return h(t)
      },
      parents: function (e) {
        const t = []
        for (let s = 0; s < this.length; s += 1) {
          let i = this[s].parentNode
          for (; i; ) e ? h(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode)
        }
        return h(t)
      },
      closest: function (e) {
        let t = this
        return void 0 === e ? h([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
      },
      find: function (e) {
        const t = []
        for (let s = 0; s < this.length; s += 1) {
          const i = this[s].querySelectorAll(e)
          for (let e = 0; e < i.length; e += 1) t.push(i[e])
        }
        return h(t)
      },
      children: function (e) {
        const t = []
        for (let s = 0; s < this.length; s += 1) {
          const i = this[s].children
          for (let s = 0; s < i.length; s += 1) (e && !h(i[s]).is(e)) || t.push(i[s])
        }
        return h(t)
      },
      filter: function (e) {
        return h(f(this, e))
      },
      remove: function () {
        for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e])
        return this
      },
    }
    Object.keys(v).forEach(e => {
      Object.defineProperty(h.fn, e, { value: v[e], writable: !0 })
    })
    const w = h
    function b(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t)
    }
    function y() {
      return Date.now()
    }
    function S(e, t) {
      void 0 === t && (t = 'x')
      const s = c()
      let i, n, r
      const a = (function (e) {
        const t = c()
        let s
        return (
          t.getComputedStyle && (s = t.getComputedStyle(e, null)),
          !s && e.currentStyle && (s = e.currentStyle),
          s || (s = e.style),
          s
        )
      })(e)
      return (
        s.WebKitCSSMatrix
          ? ((n = a.transform || a.webkitTransform),
            n.split(',').length > 6 &&
              (n = n
                .split(', ')
                .map(e => e.replace(',', '.'))
                .join(', ')),
            (r = new s.WebKitCSSMatrix('none' === n ? '' : n)))
          : ((r =
              a.MozTransform ||
              a.OTransform ||
              a.MsTransform ||
              a.msTransform ||
              a.transform ||
              a.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,')),
            (i = r.toString().split(','))),
        'x' === t && (n = s.WebKitCSSMatrix ? r.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
        'y' === t && (n = s.WebKitCSSMatrix ? r.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
        n || 0
      )
    }
    function E(e) {
      return (
        'object' == typeof e &&
        null !== e &&
        e.constructor &&
        'Object' === Object.prototype.toString.call(e).slice(8, -1)
      )
    }
    function T(e) {
      return 'undefined' != typeof window && void 0 !== window.HTMLElement
        ? e instanceof HTMLElement
        : e && (1 === e.nodeType || 11 === e.nodeType)
    }
    function x() {
      const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
        t = ['__proto__', 'constructor', 'prototype']
      for (let s = 1; s < arguments.length; s += 1) {
        const i = s < 0 || arguments.length <= s ? void 0 : arguments[s]
        if (null != i && !T(i)) {
          const s = Object.keys(Object(i)).filter(e => t.indexOf(e) < 0)
          for (let t = 0, n = s.length; t < n; t += 1) {
            const n = s[t],
              r = Object.getOwnPropertyDescriptor(i, n)
            void 0 !== r &&
              r.enumerable &&
              (E(e[n]) && E(i[n])
                ? i[n].__swiper__
                  ? (e[n] = i[n])
                  : x(e[n], i[n])
                : !E(e[n]) && E(i[n])
                ? ((e[n] = {}), i[n].__swiper__ ? (e[n] = i[n]) : x(e[n], i[n]))
                : (e[n] = i[n]))
          }
        }
      }
      return e
    }
    function C(e, t, s) {
      e.style.setProperty(t, s)
    }
    function L(e) {
      let { swiper: t, targetPosition: s, side: i } = e
      const n = c(),
        r = -t.translate
      let a,
        o = null
      const l = t.params.speed
      ;(t.wrapperEl.style.scrollSnapType = 'none'), n.cancelAnimationFrame(t.cssModeFrameID)
      const d = s > r ? 'next' : 'prev',
        u = (e, t) => ('next' === d && e >= t) || ('prev' === d && e <= t),
        p = () => {
          ;(a = new Date().getTime()), null === o && (o = a)
          const e = Math.max(Math.min((a - o) / l, 1), 0),
            d = 0.5 - Math.cos(e * Math.PI) / 2
          let c = r + d * (s - r)
          if ((u(c, s) && (c = s), t.wrapperEl.scrollTo({ [i]: c }), u(c, s)))
            return (
              (t.wrapperEl.style.overflow = 'hidden'),
              (t.wrapperEl.style.scrollSnapType = ''),
              setTimeout(() => {
                ;(t.wrapperEl.style.overflow = ''), t.wrapperEl.scrollTo({ [i]: c })
              }),
              void n.cancelAnimationFrame(t.cssModeFrameID)
            )
          t.cssModeFrameID = n.requestAnimationFrame(p)
        }
      p()
    }
    let _, k, M
    function P() {
      return (
        _ ||
          (_ = (function () {
            const e = c(),
              t = l()
            return {
              smoothScroll: t.documentElement && 'scrollBehavior' in t.documentElement.style,
              touch: !!('ontouchstart' in e || (e.DocumentTouch && t instanceof e.DocumentTouch)),
              passiveListener: (function () {
                let t = !1
                try {
                  const s = Object.defineProperty({}, 'passive', {
                    get() {
                      t = !0
                    },
                  })
                  e.addEventListener('testPassiveListener', null, s)
                } catch (e) {}
                return t
              })(),
              gestures: 'ongesturestart' in e,
            }
          })()),
        _
      )
    }
    function I(e) {
      return (
        void 0 === e && (e = {}),
        k ||
          (k = (function (e) {
            let { userAgent: t } = void 0 === e ? {} : e
            const s = P(),
              i = c(),
              n = i.navigator.platform,
              r = t || i.navigator.userAgent,
              a = { ios: !1, android: !1 },
              o = i.screen.width,
              l = i.screen.height,
              d = r.match(/(Android);?[\s\/]+([\d.]+)?/)
            let u = r.match(/(iPad).*OS\s([\d_]+)/)
            const p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
              f = !u && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
              h = 'Win32' === n
            let m = 'MacIntel' === n
            return (
              !u &&
                m &&
                s.touch &&
                [
                  '1024x1366',
                  '1366x1024',
                  '834x1194',
                  '1194x834',
                  '834x1112',
                  '1112x834',
                  '768x1024',
                  '1024x768',
                  '820x1180',
                  '1180x820',
                  '810x1080',
                  '1080x810',
                ].indexOf(`${o}x${l}`) >= 0 &&
                ((u = r.match(/(Version)\/([\d.]+)/)), u || (u = [0, 1, '13_0_0']), (m = !1)),
              d && !h && ((a.os = 'android'), (a.android = !0)),
              (u || f || p) && ((a.os = 'ios'), (a.ios = !0)),
              a
            )
          })(e)),
        k
      )
    }
    function A() {
      return (
        M ||
          (M = (function () {
            const e = c()
            return {
              isSafari: (function () {
                const t = e.navigator.userAgent.toLowerCase()
                return t.indexOf('safari') >= 0 && t.indexOf('chrome') < 0 && t.indexOf('android') < 0
              })(),
              isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent),
            }
          })()),
        M
      )
    }
    const O = {
      on(e, t, s) {
        const i = this
        if ('function' != typeof t) return i
        const n = s ? 'unshift' : 'push'
        return (
          e.split(' ').forEach(e => {
            i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][n](t)
          }),
          i
        )
      },
      once(e, t, s) {
        const i = this
        if ('function' != typeof t) return i
        function n() {
          i.off(e, n), n.__emitterProxy && delete n.__emitterProxy
          for (var s = arguments.length, r = new Array(s), a = 0; a < s; a++) r[a] = arguments[a]
          t.apply(i, r)
        }
        return (n.__emitterProxy = t), i.on(e, n, s)
      },
      onAny(e, t) {
        const s = this
        if ('function' != typeof e) return s
        const i = t ? 'unshift' : 'push'
        return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      },
      offAny(e) {
        const t = this
        if (!t.eventsAnyListeners) return t
        const s = t.eventsAnyListeners.indexOf(e)
        return s >= 0 && t.eventsAnyListeners.splice(s, 1), t
      },
      off(e, t) {
        const s = this
        return s.eventsListeners
          ? (e.split(' ').forEach(e => {
              void 0 === t
                ? (s.eventsListeners[e] = [])
                : s.eventsListeners[e] &&
                  s.eventsListeners[e].forEach((i, n) => {
                    ;(i === t || (i.__emitterProxy && i.__emitterProxy === t)) && s.eventsListeners[e].splice(n, 1)
                  })
            }),
            s)
          : s
      },
      emit() {
        const e = this
        if (!e.eventsListeners) return e
        let t, s, i
        for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a]
        'string' == typeof r[0] || Array.isArray(r[0])
          ? ((t = r[0]), (s = r.slice(1, r.length)), (i = e))
          : ((t = r[0].events), (s = r[0].data), (i = r[0].context || e)),
          s.unshift(i)
        return (
          (Array.isArray(t) ? t : t.split(' ')).forEach(t => {
            e.eventsAnyListeners &&
              e.eventsAnyListeners.length &&
              e.eventsAnyListeners.forEach(e => {
                e.apply(i, [t, ...s])
              }),
              e.eventsListeners &&
                e.eventsListeners[t] &&
                e.eventsListeners[t].forEach(e => {
                  e.apply(i, s)
                })
          }),
          e
        )
      },
    }
    const $ = {
      updateSize: function () {
        const e = this
        let t, s
        const i = e.$el
        ;(t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i[0].clientWidth),
          (s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i[0].clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === s && e.isVertical()) ||
            ((t = t - parseInt(i.css('padding-left') || 0, 10) - parseInt(i.css('padding-right') || 0, 10)),
            (s = s - parseInt(i.css('padding-top') || 0, 10) - parseInt(i.css('padding-bottom') || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, {
              width: t,
              height: s,
              size: e.isHorizontal() ? t : s,
            }))
      },
      updateSlides: function () {
        const e = this
        function t(t) {
          return e.isHorizontal()
            ? t
            : {
                width: 'height',
                'margin-top': 'margin-left',
                'margin-bottom ': 'margin-right',
                'margin-left': 'margin-top',
                'margin-right': 'margin-bottom',
                'padding-left': 'padding-top',
                'padding-right': 'padding-bottom',
                marginRight: 'marginBottom',
              }[t]
        }
        function s(e, s) {
          return parseFloat(e.getPropertyValue(t(s)) || 0)
        }
        const i = e.params,
          { $wrapperEl: n, size: r, rtlTranslate: a, wrongRTL: o } = e,
          l = e.virtual && i.virtual.enabled,
          d = l ? e.virtual.slides.length : e.slides.length,
          c = n.children(`.${e.params.slideClass}`),
          u = l ? e.virtual.slides.length : c.length
        let p = []
        const f = [],
          h = []
        let m = i.slidesOffsetBefore
        'function' == typeof m && (m = i.slidesOffsetBefore.call(e))
        let g = i.slidesOffsetAfter
        'function' == typeof g && (g = i.slidesOffsetAfter.call(e))
        const v = e.snapGrid.length,
          w = e.slidesGrid.length
        let b = i.spaceBetween,
          y = -m,
          S = 0,
          E = 0
        if (void 0 === r) return
        'string' == typeof b && b.indexOf('%') >= 0 && (b = (parseFloat(b.replace('%', '')) / 100) * r),
          (e.virtualSize = -b),
          a
            ? c.css({ marginLeft: '', marginBottom: '', marginTop: '' })
            : c.css({ marginRight: '', marginBottom: '', marginTop: '' }),
          i.centeredSlides &&
            i.cssMode &&
            (C(e.wrapperEl, '--swiper-centered-offset-before', ''),
            C(e.wrapperEl, '--swiper-centered-offset-after', ''))
        const T = i.grid && i.grid.rows > 1 && e.grid
        let x
        T && e.grid.initSlides(u)
        const L =
          'auto' === i.slidesPerView &&
          i.breakpoints &&
          Object.keys(i.breakpoints).filter(e => void 0 !== i.breakpoints[e].slidesPerView).length > 0
        for (let n = 0; n < u; n += 1) {
          x = 0
          const a = c.eq(n)
          if ((T && e.grid.updateSlide(n, a, u, t), 'none' !== a.css('display'))) {
            if ('auto' === i.slidesPerView) {
              L && (c[n].style[t('width')] = '')
              const r = getComputedStyle(a[0]),
                o = a[0].style.transform,
                l = a[0].style.webkitTransform
              if ((o && (a[0].style.transform = 'none'), l && (a[0].style.webkitTransform = 'none'), i.roundLengths))
                x = e.isHorizontal() ? a.outerWidth(!0) : a.outerHeight(!0)
              else {
                const e = s(r, 'width'),
                  t = s(r, 'padding-left'),
                  i = s(r, 'padding-right'),
                  n = s(r, 'margin-left'),
                  o = s(r, 'margin-right'),
                  l = r.getPropertyValue('box-sizing')
                if (l && 'border-box' === l) x = e + n + o
                else {
                  const { clientWidth: s, offsetWidth: r } = a[0]
                  x = e + t + i + n + o + (r - s)
                }
              }
              o && (a[0].style.transform = o),
                l && (a[0].style.webkitTransform = l),
                i.roundLengths && (x = Math.floor(x))
            } else
              (x = (r - (i.slidesPerView - 1) * b) / i.slidesPerView),
                i.roundLengths && (x = Math.floor(x)),
                c[n] && (c[n].style[t('width')] = `${x}px`)
            c[n] && (c[n].swiperSlideSize = x),
              h.push(x),
              i.centeredSlides
                ? ((y = y + x / 2 + S / 2 + b),
                  0 === S && 0 !== n && (y = y - r / 2 - b),
                  0 === n && (y = y - r / 2 - b),
                  Math.abs(y) < 0.001 && (y = 0),
                  i.roundLengths && (y = Math.floor(y)),
                  E % i.slidesPerGroup == 0 && p.push(y),
                  f.push(y))
                : (i.roundLengths && (y = Math.floor(y)),
                  (E - Math.min(e.params.slidesPerGroupSkip, E)) % e.params.slidesPerGroup == 0 && p.push(y),
                  f.push(y),
                  (y = y + x + b)),
              (e.virtualSize += x + b),
              (S = x),
              (E += 1)
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, r) + g),
          a &&
            o &&
            ('slide' === i.effect || 'coverflow' === i.effect) &&
            n.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
          i.setWrapperSize && n.css({ [t('width')]: `${e.virtualSize + i.spaceBetween}px` }),
          T && e.grid.updateWrapperSize(x, p, t),
          !i.centeredSlides)
        ) {
          const t = []
          for (let s = 0; s < p.length; s += 1) {
            let n = p[s]
            i.roundLengths && (n = Math.floor(n)), p[s] <= e.virtualSize - r && t.push(n)
          }
          ;(p = t), Math.floor(e.virtualSize - r) - Math.floor(p[p.length - 1]) > 1 && p.push(e.virtualSize - r)
        }
        if ((0 === p.length && (p = [0]), 0 !== i.spaceBetween)) {
          const s = e.isHorizontal() && a ? 'marginLeft' : t('marginRight')
          c.filter((e, t) => !i.cssMode || t !== c.length - 1).css({
            [s]: `${b}px`,
          })
        }
        if (i.centeredSlides && i.centeredSlidesBounds) {
          let e = 0
          h.forEach(t => {
            e += t + (i.spaceBetween ? i.spaceBetween : 0)
          }),
            (e -= i.spaceBetween)
          const t = e - r
          p = p.map(e => (e < 0 ? -m : e > t ? t + g : e))
        }
        if (i.centerInsufficientSlides) {
          let e = 0
          if (
            (h.forEach(t => {
              e += t + (i.spaceBetween ? i.spaceBetween : 0)
            }),
            (e -= i.spaceBetween),
            e < r)
          ) {
            const t = (r - e) / 2
            p.forEach((e, s) => {
              p[s] = e - t
            }),
              f.forEach((e, s) => {
                f[s] = e + t
              })
          }
        }
        if (
          (Object.assign(e, {
            slides: c,
            snapGrid: p,
            slidesGrid: f,
            slidesSizesGrid: h,
          }),
          i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
        ) {
          C(e.wrapperEl, '--swiper-centered-offset-before', -p[0] + 'px'),
            C(e.wrapperEl, '--swiper-centered-offset-after', e.size / 2 - h[h.length - 1] / 2 + 'px')
          const t = -e.snapGrid[0],
            s = -e.slidesGrid[0]
          ;(e.snapGrid = e.snapGrid.map(e => e + t)), (e.slidesGrid = e.slidesGrid.map(e => e + s))
        }
        if (
          (u !== d && e.emit('slidesLengthChange'),
          p.length !== v && (e.params.watchOverflow && e.checkOverflow(), e.emit('snapGridLengthChange')),
          f.length !== w && e.emit('slidesGridLengthChange'),
          i.watchSlidesProgress && e.updateSlidesOffset(),
          !(l || i.cssMode || ('slide' !== i.effect && 'fade' !== i.effect)))
        ) {
          const t = `${i.containerModifierClass}backface-hidden`,
            s = e.$el.hasClass(t)
          u <= i.maxBackfaceHiddenSlides ? s || e.$el.addClass(t) : s && e.$el.removeClass(t)
        }
      },
      updateAutoHeight: function (e) {
        const t = this,
          s = [],
          i = t.virtual && t.params.virtual.enabled
        let n,
          r = 0
        'number' == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed)
        const a = e =>
          i ? t.slides.filter(t => parseInt(t.getAttribute('data-swiper-slide-index'), 10) === e)[0] : t.slides.eq(e)[0]
        if ('auto' !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            t.visibleSlides.each(e => {
              s.push(e)
            })
          else
            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
              const e = t.activeIndex + n
              if (e > t.slides.length && !i) break
              s.push(a(e))
            }
        else s.push(a(t.activeIndex))
        for (n = 0; n < s.length; n += 1)
          if (void 0 !== s[n]) {
            const e = s[n].offsetHeight
            r = e > r ? e : r
          }
        ;(r || 0 === r) && t.$wrapperEl.css('height', `${r}px`)
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides
        for (let s = 0; s < t.length; s += 1)
          t[s].swiperSlideOffset = e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop
      },
      updateSlidesProgress: function (e) {
        void 0 === e && (e = (this && this.translate) || 0)
        const t = this,
          s = t.params,
          { slides: i, rtlTranslate: n, snapGrid: r } = t
        if (0 === i.length) return
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset()
        let a = -e
        n && (a = e), i.removeClass(s.slideVisibleClass), (t.visibleSlidesIndexes = []), (t.visibleSlides = [])
        for (let e = 0; e < i.length; e += 1) {
          const o = i[e]
          let l = o.swiperSlideOffset
          s.cssMode && s.centeredSlides && (l -= i[0].swiperSlideOffset)
          const d = (a + (s.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + s.spaceBetween),
            c = (a - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + s.spaceBetween),
            u = -(a - l),
            p = u + t.slidesSizesGrid[e]
          ;((u >= 0 && u < t.size - 1) || (p > 1 && p <= t.size) || (u <= 0 && p >= t.size)) &&
            (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e), i.eq(e).addClass(s.slideVisibleClass)),
            (o.progress = n ? -d : d),
            (o.originalProgress = n ? -c : c)
        }
        t.visibleSlides = w(t.visibleSlides)
      },
      updateProgress: function (e) {
        const t = this
        if (void 0 === e) {
          const s = t.rtlTranslate ? -1 : 1
          e = (t && t.translate && t.translate * s) || 0
        }
        const s = t.params,
          i = t.maxTranslate() - t.minTranslate()
        let { progress: n, isBeginning: r, isEnd: a } = t
        const o = r,
          l = a
        0 === i ? ((n = 0), (r = !0), (a = !0)) : ((n = (e - t.minTranslate()) / i), (r = n <= 0), (a = n >= 1)),
          Object.assign(t, { progress: n, isBeginning: r, isEnd: a }),
          (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) && t.updateSlidesProgress(e),
          r && !o && t.emit('reachBeginning toEdge'),
          a && !l && t.emit('reachEnd toEdge'),
          ((o && !r) || (l && !a)) && t.emit('fromEdge'),
          t.emit('progress', n)
      },
      updateSlidesClasses: function () {
        const e = this,
          { slides: t, params: s, $wrapperEl: i, activeIndex: n, realIndex: r } = e,
          a = e.virtual && s.virtual.enabled
        let o
        t.removeClass(
          `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
        ),
          (o = a ? e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${n}"]`) : t.eq(n)),
          o.addClass(s.slideActiveClass),
          s.loop &&
            (o.hasClass(s.slideDuplicateClass)
              ? i
                  .children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`)
                  .addClass(s.slideDuplicateActiveClass)
              : i
                  .children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`)
                  .addClass(s.slideDuplicateActiveClass))
        let l = o.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass)
        s.loop && 0 === l.length && ((l = t.eq(0)), l.addClass(s.slideNextClass))
        let d = o.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass)
        s.loop && 0 === d.length && ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
          s.loop &&
            (l.hasClass(s.slideDuplicateClass)
              ? i
                  .children(
                    `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${l.attr(
                      'data-swiper-slide-index'
                    )}"]`
                  )
                  .addClass(s.slideDuplicateNextClass)
              : i
                  .children(
                    `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${l.attr(
                      'data-swiper-slide-index'
                    )}"]`
                  )
                  .addClass(s.slideDuplicateNextClass),
            d.hasClass(s.slideDuplicateClass)
              ? i
                  .children(
                    `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${d.attr(
                      'data-swiper-slide-index'
                    )}"]`
                  )
                  .addClass(s.slideDuplicatePrevClass)
              : i
                  .children(
                    `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${d.attr(
                      'data-swiper-slide-index'
                    )}"]`
                  )
                  .addClass(s.slideDuplicatePrevClass)),
          e.emitSlidesClasses()
      },
      updateActiveIndex: function (e) {
        const t = this,
          s = t.rtlTranslate ? t.translate : -t.translate,
          { slidesGrid: i, snapGrid: n, params: r, activeIndex: a, realIndex: o, snapIndex: l } = t
        let d,
          c = e
        if (void 0 === c) {
          for (let e = 0; e < i.length; e += 1)
            void 0 !== i[e + 1]
              ? s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2
                ? (c = e)
                : s >= i[e] && s < i[e + 1] && (c = e + 1)
              : s >= i[e] && (c = e)
          r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0)
        }
        if (n.indexOf(s) >= 0) d = n.indexOf(s)
        else {
          const e = Math.min(r.slidesPerGroupSkip, c)
          d = e + Math.floor((c - e) / r.slidesPerGroup)
        }
        if ((d >= n.length && (d = n.length - 1), c === a))
          return void (d !== l && ((t.snapIndex = d), t.emit('snapIndexChange')))
        const u = parseInt(t.slides.eq(c).attr('data-swiper-slide-index') || c, 10)
        Object.assign(t, {
          snapIndex: d,
          realIndex: u,
          previousIndex: a,
          activeIndex: c,
        }),
          t.emit('activeIndexChange'),
          t.emit('snapIndexChange'),
          o !== u && t.emit('realIndexChange'),
          (t.initialized || t.params.runCallbacksOnInit) && t.emit('slideChange')
      },
      updateClickedSlide: function (e) {
        const t = this,
          s = t.params,
          i = w(e).closest(`.${s.slideClass}`)[0]
        let n,
          r = !1
        if (i)
          for (let e = 0; e < t.slides.length; e += 1)
            if (t.slides[e] === i) {
              ;(r = !0), (n = e)
              break
            }
        if (!i || !r) return (t.clickedSlide = void 0), void (t.clickedIndex = void 0)
        ;(t.clickedSlide = i),
          t.virtual && t.params.virtual.enabled
            ? (t.clickedIndex = parseInt(w(i).attr('data-swiper-slide-index'), 10))
            : (t.clickedIndex = n),
          s.slideToClickedSlide &&
            void 0 !== t.clickedIndex &&
            t.clickedIndex !== t.activeIndex &&
            t.slideToClickedSlide()
      },
    }
    const z = {
      getTranslate: function (e) {
        void 0 === e && (e = this.isHorizontal() ? 'x' : 'y')
        const { params: t, rtlTranslate: s, translate: i, $wrapperEl: n } = this
        if (t.virtualTranslate) return s ? -i : i
        if (t.cssMode) return i
        let r = S(n[0], e)
        return s && (r = -r), r || 0
      },
      setTranslate: function (e, t) {
        const s = this,
          { rtlTranslate: i, params: n, $wrapperEl: r, wrapperEl: a, progress: o } = s
        let l,
          d = 0,
          c = 0
        s.isHorizontal() ? (d = i ? -e : e) : (c = e),
          n.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
          n.cssMode
            ? (a[s.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = s.isHorizontal() ? -d : -c)
            : n.virtualTranslate || r.transform(`translate3d(${d}px, ${c}px, 0px)`),
          (s.previousTranslate = s.translate),
          (s.translate = s.isHorizontal() ? d : c)
        const u = s.maxTranslate() - s.minTranslate()
        ;(l = 0 === u ? 0 : (e - s.minTranslate()) / u),
          l !== o && s.updateProgress(e),
          s.emit('setTranslate', s.translate, t)
      },
      minTranslate: function () {
        return -this.snapGrid[0]
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1]
      },
      translateTo: function (e, t, s, i, n) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          void 0 === i && (i = !0)
        const r = this,
          { params: a, wrapperEl: o } = r
        if (r.animating && a.preventInteractionOnTransition) return !1
        const l = r.minTranslate(),
          d = r.maxTranslate()
        let c
        if (((c = i && e > l ? l : i && e < d ? d : e), r.updateProgress(c), a.cssMode)) {
          const e = r.isHorizontal()
          if (0 === t) o[e ? 'scrollLeft' : 'scrollTop'] = -c
          else {
            if (!r.support.smoothScroll) return L({ swiper: r, targetPosition: -c, side: e ? 'left' : 'top' }), !0
            o.scrollTo({ [e ? 'left' : 'top']: -c, behavior: 'smooth' })
          }
          return !0
        }
        return (
          0 === t
            ? (r.setTransition(0),
              r.setTranslate(c),
              s && (r.emit('beforeTransitionStart', t, n), r.emit('transitionEnd')))
            : (r.setTransition(t),
              r.setTranslate(c),
              s && (r.emit('beforeTransitionStart', t, n), r.emit('transitionStart')),
              r.animating ||
                ((r.animating = !0),
                r.onTranslateToWrapperTransitionEnd ||
                  (r.onTranslateToWrapperTransitionEnd = function (e) {
                    r &&
                      !r.destroyed &&
                      e.target === this &&
                      (r.$wrapperEl[0].removeEventListener('transitionend', r.onTranslateToWrapperTransitionEnd),
                      r.$wrapperEl[0].removeEventListener('webkitTransitionEnd', r.onTranslateToWrapperTransitionEnd),
                      (r.onTranslateToWrapperTransitionEnd = null),
                      delete r.onTranslateToWrapperTransitionEnd,
                      s && r.emit('transitionEnd'))
                  }),
                r.$wrapperEl[0].addEventListener('transitionend', r.onTranslateToWrapperTransitionEnd),
                r.$wrapperEl[0].addEventListener('webkitTransitionEnd', r.onTranslateToWrapperTransitionEnd))),
          !0
        )
      },
    }
    function D(e) {
      let { swiper: t, runCallbacks: s, direction: i, step: n } = e
      const { activeIndex: r, previousIndex: a } = t
      let o = i
      if ((o || (o = r > a ? 'next' : r < a ? 'prev' : 'reset'), t.emit(`transition${n}`), s && r !== a)) {
        if ('reset' === o) return void t.emit(`slideResetTransition${n}`)
        t.emit(`slideChangeTransition${n}`),
          'next' === o ? t.emit(`slideNextTransition${n}`) : t.emit(`slidePrevTransition${n}`)
      }
    }
    const N = {
      slideTo: function (e, t, s, i, n) {
        if (
          (void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          'number' != typeof e && 'string' != typeof e)
        )
          throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`)
        if ('string' == typeof e) {
          const t = parseInt(e, 10)
          if (!isFinite(t))
            throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`)
          e = t
        }
        const r = this
        let a = e
        a < 0 && (a = 0)
        const {
          params: o,
          snapGrid: l,
          slidesGrid: d,
          previousIndex: c,
          activeIndex: u,
          rtlTranslate: p,
          wrapperEl: f,
          enabled: h,
        } = r
        if ((r.animating && o.preventInteractionOnTransition) || (!h && !i && !n)) return !1
        const m = Math.min(r.params.slidesPerGroupSkip, a)
        let g = m + Math.floor((a - m) / r.params.slidesPerGroup)
        g >= l.length && (g = l.length - 1),
          (u || o.initialSlide || 0) === (c || 0) && s && r.emit('beforeSlideChangeStart')
        const v = -l[g]
        if ((r.updateProgress(v), o.normalizeSlideIndex))
          for (let e = 0; e < d.length; e += 1) {
            const t = -Math.floor(100 * v),
              s = Math.floor(100 * d[e]),
              i = Math.floor(100 * d[e + 1])
            void 0 !== d[e + 1]
              ? t >= s && t < i - (i - s) / 2
                ? (a = e)
                : t >= s && t < i && (a = e + 1)
              : t >= s && (a = e)
          }
        if (r.initialized && a !== u) {
          if (!r.allowSlideNext && v < r.translate && v < r.minTranslate()) return !1
          if (!r.allowSlidePrev && v > r.translate && v > r.maxTranslate() && (u || 0) !== a) return !1
        }
        let w
        if (((w = a > u ? 'next' : a < u ? 'prev' : 'reset'), (p && -v === r.translate) || (!p && v === r.translate)))
          return (
            r.updateActiveIndex(a),
            o.autoHeight && r.updateAutoHeight(),
            r.updateSlidesClasses(),
            'slide' !== o.effect && r.setTranslate(v),
            'reset' !== w && (r.transitionStart(s, w), r.transitionEnd(s, w)),
            !1
          )
        if (o.cssMode) {
          const e = r.isHorizontal(),
            s = p ? v : -v
          if (0 === t) {
            const t = r.virtual && r.params.virtual.enabled
            t && ((r.wrapperEl.style.scrollSnapType = 'none'), (r._immediateVirtual = !0)),
              (f[e ? 'scrollLeft' : 'scrollTop'] = s),
              t &&
                requestAnimationFrame(() => {
                  ;(r.wrapperEl.style.scrollSnapType = ''), (r._swiperImmediateVirtual = !1)
                })
          } else {
            if (!r.support.smoothScroll) return L({ swiper: r, targetPosition: s, side: e ? 'left' : 'top' }), !0
            f.scrollTo({ [e ? 'left' : 'top']: s, behavior: 'smooth' })
          }
          return !0
        }
        return (
          r.setTransition(t),
          r.setTranslate(v),
          r.updateActiveIndex(a),
          r.updateSlidesClasses(),
          r.emit('beforeTransitionStart', t, i),
          r.transitionStart(s, w),
          0 === t
            ? r.transitionEnd(s, w)
            : r.animating ||
              ((r.animating = !0),
              r.onSlideToWrapperTransitionEnd ||
                (r.onSlideToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.$wrapperEl[0].removeEventListener('transitionend', r.onSlideToWrapperTransitionEnd),
                    r.$wrapperEl[0].removeEventListener('webkitTransitionEnd', r.onSlideToWrapperTransitionEnd),
                    (r.onSlideToWrapperTransitionEnd = null),
                    delete r.onSlideToWrapperTransitionEnd,
                    r.transitionEnd(s, w))
                }),
              r.$wrapperEl[0].addEventListener('transitionend', r.onSlideToWrapperTransitionEnd),
              r.$wrapperEl[0].addEventListener('webkitTransitionEnd', r.onSlideToWrapperTransitionEnd)),
          !0
        )
      },
      slideToLoop: function (e, t, s, i) {
        void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0)
        const n = this
        let r = e
        return n.params.loop && (r += n.loopedSlides), n.slideTo(r, t, s, i)
      },
      slideNext: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0)
        const i = this,
          { animating: n, enabled: r, params: a } = i
        if (!r) return i
        let o = a.slidesPerGroup
        'auto' === a.slidesPerView &&
          1 === a.slidesPerGroup &&
          a.slidesPerGroupAuto &&
          (o = Math.max(i.slidesPerViewDynamic('current', !0), 1))
        const l = i.activeIndex < a.slidesPerGroupSkip ? 1 : o
        if (a.loop) {
          if (n && a.loopPreventsSlide) return !1
          i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft)
        }
        return a.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + l, e, t, s)
      },
      slidePrev: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0)
        const i = this,
          { params: n, animating: r, snapGrid: a, slidesGrid: o, rtlTranslate: l, enabled: d } = i
        if (!d) return i
        if (n.loop) {
          if (r && n.loopPreventsSlide) return !1
          i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft)
        }
        function c(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
        }
        const u = c(l ? i.translate : -i.translate),
          p = a.map(e => c(e))
        let f = a[p.indexOf(u) - 1]
        if (void 0 === f && n.cssMode) {
          let e
          a.forEach((t, s) => {
            u >= t && (e = s)
          }),
            void 0 !== e && (f = a[e > 0 ? e - 1 : e])
        }
        let h = 0
        if (
          (void 0 !== f &&
            ((h = o.indexOf(f)),
            h < 0 && (h = i.activeIndex - 1),
            'auto' === n.slidesPerView &&
              1 === n.slidesPerGroup &&
              n.slidesPerGroupAuto &&
              ((h = h - i.slidesPerViewDynamic('previous', !0) + 1), (h = Math.max(h, 0)))),
          n.rewind && i.isBeginning)
        ) {
          const n =
            i.params.virtual && i.params.virtual.enabled && i.virtual
              ? i.virtual.slides.length - 1
              : i.slides.length - 1
          return i.slideTo(n, e, t, s)
        }
        return i.slideTo(h, e, t, s)
      },
      slideReset: function (e, t, s) {
        return (
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, s)
        )
      },
      slideToClosest: function (e, t, s, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === i && (i = 0.5)
        const n = this
        let r = n.activeIndex
        const a = Math.min(n.params.slidesPerGroupSkip, r),
          o = a + Math.floor((r - a) / n.params.slidesPerGroup),
          l = n.rtlTranslate ? n.translate : -n.translate
        if (l >= n.snapGrid[o]) {
          const e = n.snapGrid[o]
          l - e > (n.snapGrid[o + 1] - e) * i && (r += n.params.slidesPerGroup)
        } else {
          const e = n.snapGrid[o - 1]
          l - e <= (n.snapGrid[o] - e) * i && (r -= n.params.slidesPerGroup)
        }
        return (r = Math.max(r, 0)), (r = Math.min(r, n.slidesGrid.length - 1)), n.slideTo(r, e, t, s)
      },
      slideToClickedSlide: function () {
        const e = this,
          { params: t, $wrapperEl: s } = e,
          i = 'auto' === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView
        let n,
          r = e.clickedIndex
        if (t.loop) {
          if (e.animating) return
          ;(n = parseInt(w(e.clickedSlide).attr('data-swiper-slide-index'), 10)),
            t.centeredSlides
              ? r < e.loopedSlides - i / 2 || r > e.slides.length - e.loopedSlides + i / 2
                ? (e.loopFix(),
                  (r = s
                    .children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`)
                    .eq(0)
                    .index()),
                  b(() => {
                    e.slideTo(r)
                  }))
                : e.slideTo(r)
              : r > e.slides.length - i
              ? (e.loopFix(),
                (r = s
                  .children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`)
                  .eq(0)
                  .index()),
                b(() => {
                  e.slideTo(r)
                }))
              : e.slideTo(r)
        } else e.slideTo(r)
      },
    }
    const G = {
      loopCreate: function () {
        const e = this,
          t = l(),
          { params: s, $wrapperEl: i } = e,
          n = i.children().length > 0 ? w(i.children()[0].parentNode) : i
        n.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove()
        let r = n.children(`.${s.slideClass}`)
        if (s.loopFillGroupWithBlank) {
          const e = s.slidesPerGroup - (r.length % s.slidesPerGroup)
          if (e !== s.slidesPerGroup) {
            for (let i = 0; i < e; i += 1) {
              const e = w(t.createElement('div')).addClass(`${s.slideClass} ${s.slideBlankClass}`)
              n.append(e)
            }
            r = n.children(`.${s.slideClass}`)
          }
        }
        'auto' !== s.slidesPerView || s.loopedSlides || (s.loopedSlides = r.length),
          (e.loopedSlides = Math.ceil(parseFloat(s.loopedSlides || s.slidesPerView, 10))),
          (e.loopedSlides += s.loopAdditionalSlides),
          e.loopedSlides > r.length && (e.loopedSlides = r.length)
        const a = [],
          o = []
        r.each((t, s) => {
          const i = w(t)
          s < e.loopedSlides && o.push(t),
            s < r.length && s >= r.length - e.loopedSlides && a.push(t),
            i.attr('data-swiper-slide-index', s)
        })
        for (let e = 0; e < o.length; e += 1) n.append(w(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass))
        for (let e = a.length - 1; e >= 0; e -= 1) n.prepend(w(a[e].cloneNode(!0)).addClass(s.slideDuplicateClass))
      },
      loopFix: function () {
        const e = this
        e.emit('beforeLoopFix')
        const {
          activeIndex: t,
          slides: s,
          loopedSlides: i,
          allowSlidePrev: n,
          allowSlideNext: r,
          snapGrid: a,
          rtlTranslate: o,
        } = e
        let l
        ;(e.allowSlidePrev = !0), (e.allowSlideNext = !0)
        const d = -a[t] - e.getTranslate()
        if (t < i) {
          ;(l = s.length - 3 * i + t), (l += i)
          e.slideTo(l, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d)
        } else if (t >= s.length - i) {
          ;(l = -s.length + t + i), (l += i)
          e.slideTo(l, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d)
        }
        ;(e.allowSlidePrev = n), (e.allowSlideNext = r), e.emit('loopFix')
      },
      loopDestroy: function () {
        const { $wrapperEl: e, params: t, slides: s } = this
        e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(),
          s.removeAttr('data-swiper-slide-index')
      },
    }
    function B(e) {
      const t = this,
        s = l(),
        i = c(),
        n = t.touchEventsData,
        { params: r, touches: a, enabled: o } = t
      if (!o) return
      if (t.animating && r.preventInteractionOnTransition) return
      !t.animating && r.cssMode && r.loop && t.loopFix()
      let d = e
      d.originalEvent && (d = d.originalEvent)
      let u = w(d.target)
      if ('wrapper' === r.touchEventsTarget && !u.closest(t.wrapperEl).length) return
      if (((n.isTouchEvent = 'touchstart' === d.type), !n.isTouchEvent && 'which' in d && 3 === d.which)) return
      if (!n.isTouchEvent && 'button' in d && d.button > 0) return
      if (n.isTouched && n.isMoved) return
      !!r.noSwipingClass &&
        '' !== r.noSwipingClass &&
        d.target &&
        d.target.shadowRoot &&
        e.path &&
        e.path[0] &&
        (u = w(e.path[0]))
      const p = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
        f = !(!d.target || !d.target.shadowRoot)
      if (
        r.noSwiping &&
        (f
          ? (function (e, t) {
              return (
                void 0 === t && (t = this),
                (function t(s) {
                  return s && s !== l() && s !== c()
                    ? (s.assignedSlot && (s = s.assignedSlot), s.closest(e) || t(s.getRootNode().host))
                    : null
                })(t)
              )
            })(p, d.target)
          : u.closest(p)[0])
      )
        return void (t.allowClick = !0)
      if (r.swipeHandler && !u.closest(r.swipeHandler)[0]) return
      ;(a.currentX = 'touchstart' === d.type ? d.targetTouches[0].pageX : d.pageX),
        (a.currentY = 'touchstart' === d.type ? d.targetTouches[0].pageY : d.pageY)
      const h = a.currentX,
        m = a.currentY,
        g = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
        v = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold
      if (g && (h <= v || h >= i.innerWidth - v)) {
        if ('prevent' !== g) return
        e.preventDefault()
      }
      if (
        (Object.assign(n, {
          isTouched: !0,
          isMoved: !1,
          allowTouchCallbacks: !0,
          isScrolling: void 0,
          startMoving: void 0,
        }),
        (a.startX = h),
        (a.startY = m),
        (n.touchStartTime = y()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        r.threshold > 0 && (n.allowThresholdMove = !1),
        'touchstart' !== d.type)
      ) {
        let e = !0
        u.is(n.focusableElements) && ((e = !1), 'SELECT' === u[0].nodeName && (n.isTouched = !1)),
          s.activeElement &&
            w(s.activeElement).is(n.focusableElements) &&
            s.activeElement !== u[0] &&
            s.activeElement.blur()
        const i = e && t.allowTouchMove && r.touchStartPreventDefault
        ;(!r.touchStartForcePreventDefault && !i) || u[0].isContentEditable || d.preventDefault()
      }
      t.params.freeMode &&
        t.params.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !r.cssMode &&
        t.freeMode.onTouchStart(),
        t.emit('touchStart', d)
    }
    function q(e) {
      const t = l(),
        s = this,
        i = s.touchEventsData,
        { params: n, touches: r, rtlTranslate: a, enabled: o } = s
      if (!o) return
      let d = e
      if ((d.originalEvent && (d = d.originalEvent), !i.isTouched))
        return void (i.startMoving && i.isScrolling && s.emit('touchMoveOpposite', d))
      if (i.isTouchEvent && 'touchmove' !== d.type) return
      const c = 'touchmove' === d.type && d.targetTouches && (d.targetTouches[0] || d.changedTouches[0]),
        u = 'touchmove' === d.type ? c.pageX : d.pageX,
        p = 'touchmove' === d.type ? c.pageY : d.pageY
      if (d.preventedByNestedSwiper) return (r.startX = u), void (r.startY = p)
      if (!s.allowTouchMove)
        return (
          w(d.target).is(i.focusableElements) || (s.allowClick = !1),
          void (
            i.isTouched &&
            (Object.assign(r, {
              startX: u,
              startY: p,
              currentX: u,
              currentY: p,
            }),
            (i.touchStartTime = y()))
          )
        )
      if (i.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
        if (s.isVertical()) {
          if ((p < r.startY && s.translate <= s.maxTranslate()) || (p > r.startY && s.translate >= s.minTranslate()))
            return (i.isTouched = !1), void (i.isMoved = !1)
        } else if (
          (u < r.startX && s.translate <= s.maxTranslate()) ||
          (u > r.startX && s.translate >= s.minTranslate())
        )
          return
      if (i.isTouchEvent && t.activeElement && d.target === t.activeElement && w(d.target).is(i.focusableElements))
        return (i.isMoved = !0), void (s.allowClick = !1)
      if ((i.allowTouchCallbacks && s.emit('touchMove', d), d.targetTouches && d.targetTouches.length > 1)) return
      ;(r.currentX = u), (r.currentY = p)
      const f = r.currentX - r.startX,
        h = r.currentY - r.startY
      if (s.params.threshold && Math.sqrt(f ** 2 + h ** 2) < s.params.threshold) return
      if (void 0 === i.isScrolling) {
        let e
        ;(s.isHorizontal() && r.currentY === r.startY) || (s.isVertical() && r.currentX === r.startX)
          ? (i.isScrolling = !1)
          : f * f + h * h >= 25 &&
            ((e = (180 * Math.atan2(Math.abs(h), Math.abs(f))) / Math.PI),
            (i.isScrolling = s.isHorizontal() ? e > n.touchAngle : 90 - e > n.touchAngle))
      }
      if (
        (i.isScrolling && s.emit('touchMoveOpposite', d),
        void 0 === i.startMoving && ((r.currentX === r.startX && r.currentY === r.startY) || (i.startMoving = !0)),
        i.isScrolling)
      )
        return void (i.isTouched = !1)
      if (!i.startMoving) return
      ;(s.allowClick = !1),
        !n.cssMode && d.cancelable && d.preventDefault(),
        n.touchMoveStopPropagation && !n.nested && d.stopPropagation(),
        i.isMoved ||
          (n.loop && !n.cssMode && s.loopFix(),
          (i.startTranslate = s.getTranslate()),
          s.setTransition(0),
          s.animating && s.$wrapperEl.trigger('webkitTransitionEnd transitionend'),
          (i.allowMomentumBounce = !1),
          !n.grabCursor || (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) || s.setGrabCursor(!0),
          s.emit('sliderFirstMove', d)),
        s.emit('sliderMove', d),
        (i.isMoved = !0)
      let m = s.isHorizontal() ? f : h
      ;(r.diff = m),
        (m *= n.touchRatio),
        a && (m = -m),
        (s.swipeDirection = m > 0 ? 'prev' : 'next'),
        (i.currentTranslate = m + i.startTranslate)
      let g = !0,
        v = n.resistanceRatio
      if (
        (n.touchReleaseOnEdges && (v = 0),
        m > 0 && i.currentTranslate > s.minTranslate()
          ? ((g = !1),
            n.resistance &&
              (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + m) ** v))
          : m < 0 &&
            i.currentTranslate < s.maxTranslate() &&
            ((g = !1),
            n.resistance &&
              (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - m) ** v)),
        g && (d.preventedByNestedSwiper = !0),
        !s.allowSlideNext &&
          'next' === s.swipeDirection &&
          i.currentTranslate < i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        !s.allowSlidePrev &&
          'prev' === s.swipeDirection &&
          i.currentTranslate > i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate),
        n.threshold > 0)
      ) {
        if (!(Math.abs(m) > n.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate)
        if (!i.allowThresholdMove)
          return (
            (i.allowThresholdMove = !0),
            (r.startX = r.currentX),
            (r.startY = r.currentY),
            (i.currentTranslate = i.startTranslate),
            void (r.diff = s.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY)
          )
      }
      n.followFinger &&
        !n.cssMode &&
        (((n.freeMode && n.freeMode.enabled && s.freeMode) || n.watchSlidesProgress) &&
          (s.updateActiveIndex(), s.updateSlidesClasses()),
        s.params.freeMode && n.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
        s.updateProgress(i.currentTranslate),
        s.setTranslate(i.currentTranslate))
    }
    function j(e) {
      const t = this,
        s = t.touchEventsData,
        { params: i, touches: n, rtlTranslate: r, slidesGrid: a, enabled: o } = t
      if (!o) return
      let l = e
      if (
        (l.originalEvent && (l = l.originalEvent),
        s.allowTouchCallbacks && t.emit('touchEnd', l),
        (s.allowTouchCallbacks = !1),
        !s.isTouched)
      )
        return s.isMoved && i.grabCursor && t.setGrabCursor(!1), (s.isMoved = !1), void (s.startMoving = !1)
      i.grabCursor &&
        s.isMoved &&
        s.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1)
      const d = y(),
        c = d - s.touchStartTime
      if (t.allowClick) {
        const e = l.path || (l.composedPath && l.composedPath())
        t.updateClickedSlide((e && e[0]) || l.target),
          t.emit('tap click', l),
          c < 300 && d - s.lastClickTime < 300 && t.emit('doubleTap doubleClick', l)
      }
      if (
        ((s.lastClickTime = y()),
        b(() => {
          t.destroyed || (t.allowClick = !0)
        }),
        !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === n.diff || s.currentTranslate === s.startTranslate)
      )
        return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1)
      let u
      if (
        ((s.isTouched = !1),
        (s.isMoved = !1),
        (s.startMoving = !1),
        (u = i.followFinger ? (r ? t.translate : -t.translate) : -s.currentTranslate),
        i.cssMode)
      )
        return
      if (t.params.freeMode && i.freeMode.enabled) return void t.freeMode.onTouchEnd({ currentPos: u })
      let p = 0,
        f = t.slidesSizesGrid[0]
      for (let e = 0; e < a.length; e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
        const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup
        void 0 !== a[e + t]
          ? u >= a[e] && u < a[e + t] && ((p = e), (f = a[e + t] - a[e]))
          : u >= a[e] && ((p = e), (f = a[a.length - 1] - a[a.length - 2]))
      }
      let h = null,
        m = null
      i.rewind &&
        (t.isBeginning
          ? (m =
              t.params.virtual && t.params.virtual.enabled && t.virtual
                ? t.virtual.slides.length - 1
                : t.slides.length - 1)
          : t.isEnd && (h = 0))
      const g = (u - a[p]) / f,
        v = p < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup
      if (c > i.longSwipesMs) {
        if (!i.longSwipes) return void t.slideTo(t.activeIndex)
        'next' === t.swipeDirection &&
          (g >= i.longSwipesRatio ? t.slideTo(i.rewind && t.isEnd ? h : p + v) : t.slideTo(p)),
          'prev' === t.swipeDirection &&
            (g > 1 - i.longSwipesRatio
              ? t.slideTo(p + v)
              : null !== m && g < 0 && Math.abs(g) > i.longSwipesRatio
              ? t.slideTo(m)
              : t.slideTo(p))
      } else {
        if (!i.shortSwipes) return void t.slideTo(t.activeIndex)
        t.navigation && (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
          ? l.target === t.navigation.nextEl
            ? t.slideTo(p + v)
            : t.slideTo(p)
          : ('next' === t.swipeDirection && t.slideTo(null !== h ? h : p + v),
            'prev' === t.swipeDirection && t.slideTo(null !== m ? m : p))
      }
    }
    function H() {
      const e = this,
        { params: t, el: s } = e
      if (s && 0 === s.offsetWidth) return
      t.breakpoints && e.setBreakpoint()
      const { allowSlideNext: i, allowSlidePrev: n, snapGrid: r } = e
      ;(e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses(),
        ('auto' === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides
          ? e.slideTo(e.slides.length - 1, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0),
        e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
        (e.allowSlidePrev = n),
        (e.allowSlideNext = i),
        e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
    }
    function F(e) {
      const t = this
      t.enabled &&
        (t.allowClick ||
          (t.params.preventClicks && e.preventDefault(),
          t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())))
    }
    function V() {
      const e = this,
        { wrapperEl: t, rtlTranslate: s, enabled: i } = e
      if (!i) return
      let n
      ;(e.previousTranslate = e.translate),
        e.isHorizontal() ? (e.translate = -t.scrollLeft) : (e.translate = -t.scrollTop),
        -0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses()
      const r = e.maxTranslate() - e.minTranslate()
      ;(n = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
        n !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit('setTranslate', e.translate, !1)
    }
    let R = !1
    function W() {}
    const X = (e, t) => {
      const s = l(),
        { params: i, touchEvents: n, el: r, wrapperEl: a, device: o, support: d } = e,
        c = !!i.nested,
        u = 'on' === t ? 'addEventListener' : 'removeEventListener',
        p = t
      if (d.touch) {
        const t = !('touchstart' !== n.start || !d.passiveListener || !i.passiveListeners) && {
          passive: !0,
          capture: !1,
        }
        r[u](n.start, e.onTouchStart, t),
          r[u](n.move, e.onTouchMove, d.passiveListener ? { passive: !1, capture: c } : c),
          r[u](n.end, e.onTouchEnd, t),
          n.cancel && r[u](n.cancel, e.onTouchEnd, t)
      } else r[u](n.start, e.onTouchStart, !1), s[u](n.move, e.onTouchMove, c), s[u](n.end, e.onTouchEnd, !1)
      ;(i.preventClicks || i.preventClicksPropagation) && r[u]('click', e.onClick, !0),
        i.cssMode && a[u]('scroll', e.onScroll),
        i.updateOnWindowResize
          ? e[p](o.ios || o.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', H, !0)
          : e[p]('observerUpdate', H, !0)
    }
    const Y = {
        attachEvents: function () {
          const e = this,
            t = l(),
            { params: s, support: i } = e
          ;(e.onTouchStart = B.bind(e)),
            (e.onTouchMove = q.bind(e)),
            (e.onTouchEnd = j.bind(e)),
            s.cssMode && (e.onScroll = V.bind(e)),
            (e.onClick = F.bind(e)),
            i.touch && !R && (t.addEventListener('touchstart', W), (R = !0)),
            X(e, 'on')
        },
        detachEvents: function () {
          X(this, 'off')
        },
      },
      U = (e, t) => e.grid && t.grid && t.grid.rows > 1
    const Q = {
      setBreakpoint: function () {
        const e = this,
          { activeIndex: t, initialized: s, loopedSlides: i = 0, params: n, $el: r } = e,
          a = n.breakpoints
        if (!a || (a && 0 === Object.keys(a).length)) return
        const o = e.getBreakpoint(a, e.params.breakpointsBase, e.el)
        if (!o || e.currentBreakpoint === o) return
        const l = (o in a ? a[o] : void 0) || e.originalParams,
          d = U(e, n),
          c = U(e, l),
          u = n.enabled
        d && !c
          ? (r.removeClass(`${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`),
            e.emitContainerClasses())
          : !d &&
            c &&
            (r.addClass(`${n.containerModifierClass}grid`),
            ((l.grid.fill && 'column' === l.grid.fill) || (!l.grid.fill && 'column' === n.grid.fill)) &&
              r.addClass(`${n.containerModifierClass}grid-column`),
            e.emitContainerClasses())
        const p = l.direction && l.direction !== n.direction,
          f = n.loop && (l.slidesPerView !== n.slidesPerView || p)
        p && s && e.changeDirection(), x(e.params, l)
        const h = e.params.enabled
        Object.assign(e, {
          allowTouchMove: e.params.allowTouchMove,
          allowSlideNext: e.params.allowSlideNext,
          allowSlidePrev: e.params.allowSlidePrev,
        }),
          u && !h ? e.disable() : !u && h && e.enable(),
          (e.currentBreakpoint = o),
          e.emit('_beforeBreakpoint', l),
          f && s && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - i + e.loopedSlides, 0, !1)),
          e.emit('breakpoint', l)
      },
      getBreakpoint: function (e, t, s) {
        if ((void 0 === t && (t = 'window'), !e || ('container' === t && !s))) return
        let i = !1
        const n = c(),
          r = 'window' === t ? n.innerHeight : s.clientHeight,
          a = Object.keys(e).map(e => {
            if ('string' == typeof e && 0 === e.indexOf('@')) {
              const t = parseFloat(e.substr(1))
              return { value: r * t, point: e }
            }
            return { value: e, point: e }
          })
        a.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10))
        for (let e = 0; e < a.length; e += 1) {
          const { point: r, value: o } = a[e]
          'window' === t ? n.matchMedia(`(min-width: ${o}px)`).matches && (i = r) : o <= s.clientWidth && (i = r)
        }
        return i || 'max'
      },
    }
    const K = {
      addClasses: function () {
        const e = this,
          { classNames: t, params: s, rtl: i, $el: n, device: r, support: a } = e,
          o = (function (e, t) {
            const s = []
            return (
              e.forEach(e => {
                'object' == typeof e
                  ? Object.keys(e).forEach(i => {
                      e[i] && s.push(t + i)
                    })
                  : 'string' == typeof e && s.push(t + e)
              }),
              s
            )
          })(
            [
              'initialized',
              s.direction,
              { 'pointer-events': !a.touch },
              { 'free-mode': e.params.freeMode && s.freeMode.enabled },
              { autoheight: s.autoHeight },
              { rtl: i },
              { grid: s.grid && s.grid.rows > 1 },
              {
                'grid-column': s.grid && s.grid.rows > 1 && 'column' === s.grid.fill,
              },
              { android: r.android },
              { ios: r.ios },
              { 'css-mode': s.cssMode },
              { centered: s.cssMode && s.centeredSlides },
            ],
            s.containerModifierClass
          )
        t.push(...o), n.addClass([...t].join(' ')), e.emitContainerClasses()
      },
      removeClasses: function () {
        const { $el: e, classNames: t } = this
        e.removeClass(t.join(' ')), this.emitContainerClasses()
      },
    }
    const J = {
      init: !0,
      direction: 'horizontal',
      touchEventsTarget: 'wrapper',
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      enabled: !0,
      focusableElements: 'input, select, option, textarea, button, video, label',
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: 'slide',
      breakpoints: void 0,
      breakpointsBase: 'window',
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      loopPreventsSlide: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: 'swiper-no-swiping',
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: 'swiper-',
      slideClass: 'swiper-slide',
      slideBlankClass: 'swiper-slide-invisible-blank',
      slideActiveClass: 'swiper-slide-active',
      slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
      slideVisibleClass: 'swiper-slide-visible',
      slideDuplicateClass: 'swiper-slide-duplicate',
      slideNextClass: 'swiper-slide-next',
      slideDuplicateNextClass: 'swiper-slide-duplicate-next',
      slidePrevClass: 'swiper-slide-prev',
      slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
      wrapperClass: 'swiper-wrapper',
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    }
    function Z(e, t) {
      return function (s) {
        void 0 === s && (s = {})
        const i = Object.keys(s)[0],
          n = s[i]
        'object' == typeof n && null !== n
          ? (['navigation', 'pagination', 'scrollbar'].indexOf(i) >= 0 && !0 === e[i] && (e[i] = { auto: !0 }),
            i in e && 'enabled' in n
              ? (!0 === e[i] && (e[i] = { enabled: !0 }),
                'object' != typeof e[i] || 'enabled' in e[i] || (e[i].enabled = !0),
                e[i] || (e[i] = { enabled: !1 }),
                x(t, s))
              : x(t, s))
          : x(t, s)
      }
    }
    const ee = {
        eventsEmitter: O,
        update: $,
        translate: z,
        transition: {
          setTransition: function (e, t) {
            const s = this
            s.params.cssMode || s.$wrapperEl.transition(e), s.emit('setTransition', e, t)
          },
          transitionStart: function (e, t) {
            void 0 === e && (e = !0)
            const s = this,
              { params: i } = s
            i.cssMode ||
              (i.autoHeight && s.updateAutoHeight(), D({ swiper: s, runCallbacks: e, direction: t, step: 'Start' }))
          },
          transitionEnd: function (e, t) {
            void 0 === e && (e = !0)
            const s = this,
              { params: i } = s
            ;(s.animating = !1),
              i.cssMode || (s.setTransition(0), D({ swiper: s, runCallbacks: e, direction: t, step: 'End' }))
          },
        },
        slide: N,
        loop: G,
        grabCursor: {
          setGrabCursor: function (e) {
            const t = this
            if (
              t.support.touch ||
              !t.params.simulateTouch ||
              (t.params.watchOverflow && t.isLocked) ||
              t.params.cssMode
            )
              return
            const s = 'container' === t.params.touchEventsTarget ? t.el : t.wrapperEl
            ;(s.style.cursor = 'move'),
              (s.style.cursor = e ? '-webkit-grabbing' : '-webkit-grab'),
              (s.style.cursor = e ? '-moz-grabbin' : '-moz-grab'),
              (s.style.cursor = e ? 'grabbing' : 'grab')
          },
          unsetGrabCursor: function () {
            const e = this
            e.support.touch ||
              (e.params.watchOverflow && e.isLocked) ||
              e.params.cssMode ||
              (e['container' === e.params.touchEventsTarget ? 'el' : 'wrapperEl'].style.cursor = '')
          },
        },
        events: Y,
        breakpoints: Q,
        checkOverflow: {
          checkOverflow: function () {
            const e = this,
              { isLocked: t, params: s } = e,
              { slidesOffsetBefore: i } = s
            if (i) {
              const t = e.slides.length - 1,
                s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i
              e.isLocked = e.size > s
            } else e.isLocked = 1 === e.snapGrid.length
            !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
              !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
              t && t !== e.isLocked && (e.isEnd = !1),
              t !== e.isLocked && e.emit(e.isLocked ? 'lock' : 'unlock')
          },
        },
        classes: K,
        images: {
          loadImage: function (e, t, s, i, n, r) {
            const a = c()
            let o
            function l() {
              r && r()
            }
            w(e).parent('picture')[0] || (e.complete && n)
              ? l()
              : t
              ? ((o = new a.Image()),
                (o.onload = l),
                (o.onerror = l),
                i && (o.sizes = i),
                s && (o.srcset = s),
                t && (o.src = t))
              : l()
          },
          preloadImages: function () {
            const e = this
            function t() {
              null != e &&
                e &&
                !e.destroyed &&
                (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                e.imagesLoaded === e.imagesToLoad.length &&
                  (e.params.updateOnImagesReady && e.update(), e.emit('imagesReady')))
            }
            e.imagesToLoad = e.$el.find('img')
            for (let s = 0; s < e.imagesToLoad.length; s += 1) {
              const i = e.imagesToLoad[s]
              e.loadImage(
                i,
                i.currentSrc || i.getAttribute('src'),
                i.srcset || i.getAttribute('srcset'),
                i.sizes || i.getAttribute('sizes'),
                !0,
                t
              )
            }
          },
        },
      },
      te = {}
    class se {
      constructor() {
        let e, t
        for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++) i[n] = arguments[n]
        if (
          (1 === i.length && i[0].constructor && 'Object' === Object.prototype.toString.call(i[0]).slice(8, -1)
            ? (t = i[0])
            : ([e, t] = i),
          t || (t = {}),
          (t = x({}, t)),
          e && !t.el && (t.el = e),
          t.el && w(t.el).length > 1)
        ) {
          const e = []
          return (
            w(t.el).each(s => {
              const i = x({}, t, { el: s })
              e.push(new se(i))
            }),
            e
          )
        }
        const r = this
        ;(r.__swiper__ = !0),
          (r.support = P()),
          (r.device = I({ userAgent: t.userAgent })),
          (r.browser = A()),
          (r.eventsListeners = {}),
          (r.eventsAnyListeners = []),
          (r.modules = [...r.__modules__]),
          t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules)
        const a = {}
        r.modules.forEach(e => {
          e({
            swiper: r,
            extendParams: Z(t, a),
            on: r.on.bind(r),
            once: r.once.bind(r),
            off: r.off.bind(r),
            emit: r.emit.bind(r),
          })
        })
        const o = x({}, J, a)
        return (
          (r.params = x({}, o, te, t)),
          (r.originalParams = x({}, r.params)),
          (r.passedParams = x({}, t)),
          r.params &&
            r.params.on &&
            Object.keys(r.params.on).forEach(e => {
              r.on(e, r.params.on[e])
            }),
          r.params && r.params.onAny && r.onAny(r.params.onAny),
          (r.$ = w),
          Object.assign(r, {
            enabled: r.params.enabled,
            el: e,
            classNames: [],
            slides: w(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: () => 'horizontal' === r.params.direction,
            isVertical: () => 'vertical' === r.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: r.params.allowSlideNext,
            allowSlidePrev: r.params.allowSlidePrev,
            touchEvents: (function () {
              const e = ['touchstart', 'touchmove', 'touchend', 'touchcancel'],
                t = ['pointerdown', 'pointermove', 'pointerup']
              return (
                (r.touchEventsTouch = {
                  start: e[0],
                  move: e[1],
                  end: e[2],
                  cancel: e[3],
                }),
                (r.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
                r.support.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop
              )
            })(),
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              focusableElements: r.params.focusableElements,
              lastClickTime: y(),
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              isTouchEvent: void 0,
              startMoving: void 0,
            },
            allowClick: !0,
            allowTouchMove: r.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0,
            },
            imagesToLoad: [],
            imagesLoaded: 0,
          }),
          r.emit('_swiper'),
          r.params.init && r.init(),
          r
        )
      }
      enable() {
        const e = this
        e.enabled || ((e.enabled = !0), e.params.grabCursor && e.setGrabCursor(), e.emit('enable'))
      }
      disable() {
        const e = this
        e.enabled && ((e.enabled = !1), e.params.grabCursor && e.unsetGrabCursor(), e.emit('disable'))
      }
      setProgress(e, t) {
        const s = this
        e = Math.min(Math.max(e, 0), 1)
        const i = s.minTranslate(),
          n = (s.maxTranslate() - i) * e + i
        s.translateTo(n, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses()
      }
      emitContainerClasses() {
        const e = this
        if (!e.params._emitClasses || !e.el) return
        const t = e.el.className
          .split(' ')
          .filter(t => 0 === t.indexOf('swiper') || 0 === t.indexOf(e.params.containerModifierClass))
        e.emit('_containerClasses', t.join(' '))
      }
      getSlideClasses(e) {
        const t = this
        return e.className
          .split(' ')
          .filter(e => 0 === e.indexOf('swiper-slide') || 0 === e.indexOf(t.params.slideClass))
          .join(' ')
      }
      emitSlidesClasses() {
        const e = this
        if (!e.params._emitClasses || !e.el) return
        const t = []
        e.slides.each(s => {
          const i = e.getSlideClasses(s)
          t.push({ slideEl: s, classNames: i }), e.emit('_slideClass', s, i)
        }),
          e.emit('_slideClasses', t)
      }
      slidesPerViewDynamic(e, t) {
        void 0 === e && (e = 'current'), void 0 === t && (t = !1)
        const { params: s, slides: i, slidesGrid: n, slidesSizesGrid: r, size: a, activeIndex: o } = this
        let l = 1
        if (s.centeredSlides) {
          let e,
            t = i[o].swiperSlideSize
          for (let s = o + 1; s < i.length; s += 1)
            i[s] && !e && ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0))
          for (let s = o - 1; s >= 0; s -= 1) i[s] && !e && ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0))
        } else if ('current' === e)
          for (let e = o + 1; e < i.length; e += 1) {
            ;(t ? n[e] + r[e] - n[o] < a : n[e] - n[o] < a) && (l += 1)
          }
        else
          for (let e = o - 1; e >= 0; e -= 1) {
            n[o] - n[e] < a && (l += 1)
          }
        return l
      }
      update() {
        const e = this
        if (!e || e.destroyed) return
        const { snapGrid: t, params: s } = e
        function i() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate,
            s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate())
          e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses()
        }
        let n
        s.breakpoints && e.setBreakpoint(),
          e.updateSize(),
          e.updateSlides(),
          e.updateProgress(),
          e.updateSlidesClasses(),
          e.params.freeMode && e.params.freeMode.enabled
            ? (i(), e.params.autoHeight && e.updateAutoHeight())
            : ((n =
                ('auto' === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides
                  ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                  : e.slideTo(e.activeIndex, 0, !1, !0)),
              n || i()),
          s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
          e.emit('update')
      }
      changeDirection(e, t) {
        void 0 === t && (t = !0)
        const s = this,
          i = s.params.direction
        return (
          e || (e = 'horizontal' === i ? 'vertical' : 'horizontal'),
          e === i ||
            ('horizontal' !== e && 'vertical' !== e) ||
            (s.$el
              .removeClass(`${s.params.containerModifierClass}${i}`)
              .addClass(`${s.params.containerModifierClass}${e}`),
            s.emitContainerClasses(),
            (s.params.direction = e),
            s.slides.each(t => {
              'vertical' === e ? (t.style.width = '') : (t.style.height = '')
            }),
            s.emit('changeDirection'),
            t && s.update()),
          s
        )
      }
      mount(e) {
        const t = this
        if (t.mounted) return !0
        const s = w(e || t.params.el)
        if (!(e = s[0])) return !1
        e.swiper = t
        const i = () => `.${(t.params.wrapperClass || '').trim().split(' ').join('.')}`
        let n = (() => {
          if (e && e.shadowRoot && e.shadowRoot.querySelector) {
            const t = w(e.shadowRoot.querySelector(i()))
            return (t.children = e => s.children(e)), t
          }
          return s.children(i())
        })()
        if (0 === n.length && t.params.createElements) {
          const e = l().createElement('div')
          ;(n = w(e)),
            (e.className = t.params.wrapperClass),
            s.append(e),
            s.children(`.${t.params.slideClass}`).each(e => {
              n.append(e)
            })
        }
        return (
          Object.assign(t, {
            $el: s,
            el: e,
            $wrapperEl: n,
            wrapperEl: n[0],
            mounted: !0,
            rtl: 'rtl' === e.dir.toLowerCase() || 'rtl' === s.css('direction'),
            rtlTranslate:
              'horizontal' === t.params.direction && ('rtl' === e.dir.toLowerCase() || 'rtl' === s.css('direction')),
            wrongRTL: '-webkit-box' === n.css('display'),
          }),
          !0
        )
      }
      init(e) {
        const t = this
        if (t.initialized) return t
        return (
          !1 === t.mount(e) ||
            (t.emit('beforeInit'),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.params.loop && t.loopCreate(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.preloadImages && t.preloadImages(),
            t.params.loop
              ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0)
              : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
            t.attachEvents(),
            (t.initialized = !0),
            t.emit('init'),
            t.emit('afterInit')),
          t
        )
      }
      destroy(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0)
        const s = this,
          { params: i, $el: n, $wrapperEl: r, slides: a } = s
        return (
          void 0 === s.params ||
            s.destroyed ||
            (s.emit('beforeDestroy'),
            (s.initialized = !1),
            s.detachEvents(),
            i.loop && s.loopDestroy(),
            t &&
              (s.removeClasses(),
              n.removeAttr('style'),
              r.removeAttr('style'),
              a &&
                a.length &&
                a
                  .removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(' '))
                  .removeAttr('style')
                  .removeAttr('data-swiper-slide-index')),
            s.emit('destroy'),
            Object.keys(s.eventsListeners).forEach(e => {
              s.off(e)
            }),
            !1 !== e &&
              ((s.$el[0].swiper = null),
              (function (e) {
                const t = e
                Object.keys(t).forEach(e => {
                  try {
                    t[e] = null
                  } catch (e) {}
                  try {
                    delete t[e]
                  } catch (e) {}
                })
              })(s)),
            (s.destroyed = !0)),
          null
        )
      }
      static extendDefaults(e) {
        x(te, e)
      }
      static get extendedDefaults() {
        return te
      }
      static get defaults() {
        return J
      }
      static installModule(e) {
        se.prototype.__modules__ || (se.prototype.__modules__ = [])
        const t = se.prototype.__modules__
        'function' == typeof e && t.indexOf(e) < 0 && t.push(e)
      }
      static use(e) {
        return Array.isArray(e) ? (e.forEach(e => se.installModule(e)), se) : (se.installModule(e), se)
      }
    }
    Object.keys(ee).forEach(e => {
      Object.keys(ee[e]).forEach(t => {
        se.prototype[t] = ee[e][t]
      })
    }),
      se.use([
        function (e) {
          let { swiper: t, on: s, emit: i } = e
          const n = c()
          let r = null,
            a = null
          const o = () => {
              t && !t.destroyed && t.initialized && (i('beforeResize'), i('resize'))
            },
            l = () => {
              t && !t.destroyed && t.initialized && i('orientationchange')
            }
          s('init', () => {
            t.params.resizeObserver && void 0 !== n.ResizeObserver
              ? t &&
                !t.destroyed &&
                t.initialized &&
                ((r = new ResizeObserver(e => {
                  a = n.requestAnimationFrame(() => {
                    const { width: s, height: i } = t
                    let n = s,
                      r = i
                    e.forEach(e => {
                      let { contentBoxSize: s, contentRect: i, target: a } = e
                      ;(a && a !== t.el) ||
                        ((n = i ? i.width : (s[0] || s).inlineSize), (r = i ? i.height : (s[0] || s).blockSize))
                    }),
                      (n === s && r === i) || o()
                  })
                })),
                r.observe(t.el))
              : (n.addEventListener('resize', o), n.addEventListener('orientationchange', l))
          }),
            s('destroy', () => {
              a && n.cancelAnimationFrame(a),
                r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
                n.removeEventListener('resize', o),
                n.removeEventListener('orientationchange', l)
            })
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i, emit: n } = e
          const r = [],
            a = c(),
            o = function (e, t) {
              void 0 === t && (t = {})
              const s = new (a.MutationObserver || a.WebkitMutationObserver)(e => {
                if (1 === e.length) return void n('observerUpdate', e[0])
                const t = function () {
                  n('observerUpdate', e[0])
                }
                a.requestAnimationFrame ? a.requestAnimationFrame(t) : a.setTimeout(t, 0)
              })
              s.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData,
              }),
                r.push(s)
            }
          s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
            i('init', () => {
              if (t.params.observer) {
                if (t.params.observeParents) {
                  const e = t.$el.parents()
                  for (let t = 0; t < e.length; t += 1) o(e[t])
                }
                o(t.$el[0], { childList: t.params.observeSlideChildren }), o(t.$wrapperEl[0], { attributes: !1 })
              }
            }),
            i('destroy', () => {
              r.forEach(e => {
                e.disconnect()
              }),
                r.splice(0, r.length)
            })
        },
      ])
    const ie = se
    function ne(e) {
      let { swiper: t, extendParams: s, on: i, emit: n } = e
      function r(e) {
        let s
        return (
          e &&
            ((s = w(e)),
            t.params.uniqueNavElements &&
              'string' == typeof e &&
              s.length > 1 &&
              1 === t.$el.find(e).length &&
              (s = t.$el.find(e))),
          s
        )
      }
      function a(e, s) {
        const i = t.params.navigation
        e &&
          e.length > 0 &&
          (e[s ? 'addClass' : 'removeClass'](i.disabledClass),
          e[0] && 'BUTTON' === e[0].tagName && (e[0].disabled = s),
          t.params.watchOverflow && t.enabled && e[t.isLocked ? 'addClass' : 'removeClass'](i.lockClass))
      }
      function o() {
        if (t.params.loop) return
        const { $nextEl: e, $prevEl: s } = t.navigation
        a(s, t.isBeginning && !t.params.rewind), a(e, t.isEnd && !t.params.rewind)
      }
      function d(e) {
        e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && t.slidePrev()
      }
      function c(e) {
        e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && t.slideNext()
      }
      function u() {
        const e = t.params.navigation
        if (
          ((t.params.navigation = (function (e, t, s, i) {
            const n = l()
            return (
              e.params.createElements &&
                Object.keys(i).forEach(r => {
                  if (!s[r] && !0 === s.auto) {
                    let a = e.$el.children(`.${i[r]}`)[0]
                    a || ((a = n.createElement('div')), (a.className = i[r]), e.$el.append(a)), (s[r] = a), (t[r] = a)
                  }
                }),
              s
            )
          })(t, t.originalParams.navigation, t.params.navigation, {
            nextEl: 'swiper-button-next',
            prevEl: 'swiper-button-prev',
          })),
          !e.nextEl && !e.prevEl)
        )
          return
        const s = r(e.nextEl),
          i = r(e.prevEl)
        s && s.length > 0 && s.on('click', c),
          i && i.length > 0 && i.on('click', d),
          Object.assign(t.navigation, {
            $nextEl: s,
            nextEl: s && s[0],
            $prevEl: i,
            prevEl: i && i[0],
          }),
          t.enabled || (s && s.addClass(e.lockClass), i && i.addClass(e.lockClass))
      }
      function p() {
        const { $nextEl: e, $prevEl: s } = t.navigation
        e && e.length && (e.off('click', c), e.removeClass(t.params.navigation.disabledClass)),
          s && s.length && (s.off('click', d), s.removeClass(t.params.navigation.disabledClass))
      }
      s({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: 'swiper-button-disabled',
          hiddenClass: 'swiper-button-hidden',
          lockClass: 'swiper-button-lock',
        },
      }),
        (t.navigation = {
          nextEl: null,
          $nextEl: null,
          prevEl: null,
          $prevEl: null,
        }),
        i('init', () => {
          u(), o()
        }),
        i('toEdge fromEdge lock unlock', () => {
          o()
        }),
        i('destroy', () => {
          p()
        }),
        i('enable disable', () => {
          const { $nextEl: e, $prevEl: s } = t.navigation
          e && e[t.enabled ? 'removeClass' : 'addClass'](t.params.navigation.lockClass),
            s && s[t.enabled ? 'removeClass' : 'addClass'](t.params.navigation.lockClass)
        }),
        i('click', (e, s) => {
          const { $nextEl: i, $prevEl: r } = t.navigation,
            a = s.target
          if (t.params.navigation.hideOnClick && !w(a).is(r) && !w(a).is(i)) {
            if (
              t.pagination &&
              t.params.pagination &&
              t.params.pagination.clickable &&
              (t.pagination.el === a || t.pagination.el.contains(a))
            )
              return
            let e
            i
              ? (e = i.hasClass(t.params.navigation.hiddenClass))
              : r && (e = r.hasClass(t.params.navigation.hiddenClass)),
              n(!0 === e ? 'navigationShow' : 'navigationHide'),
              i && i.toggleClass(t.params.navigation.hiddenClass),
              r && r.toggleClass(t.params.navigation.hiddenClass)
          }
        }),
        Object.assign(t.navigation, { update: o, init: u, destroy: p })
    }
    function re(e) {
      let t,
        { swiper: s, extendParams: i, on: n, emit: r } = e
      function a() {
        const e = s.slides.eq(s.activeIndex)
        let i = s.params.autoplay.delay
        e.attr('data-swiper-autoplay') && (i = e.attr('data-swiper-autoplay') || s.params.autoplay.delay),
          clearTimeout(t),
          (t = b(() => {
            let e
            s.params.autoplay.reverseDirection
              ? s.params.loop
                ? (s.loopFix(), (e = s.slidePrev(s.params.speed, !0, !0)), r('autoplay'))
                : s.isBeginning
                ? s.params.autoplay.stopOnLastSlide
                  ? d()
                  : ((e = s.slideTo(s.slides.length - 1, s.params.speed, !0, !0)), r('autoplay'))
                : ((e = s.slidePrev(s.params.speed, !0, !0)), r('autoplay'))
              : s.params.loop
              ? (s.loopFix(), (e = s.slideNext(s.params.speed, !0, !0)), r('autoplay'))
              : s.isEnd
              ? s.params.autoplay.stopOnLastSlide
                ? d()
                : ((e = s.slideTo(0, s.params.speed, !0, !0)), r('autoplay'))
              : ((e = s.slideNext(s.params.speed, !0, !0)), r('autoplay')),
              ((s.params.cssMode && s.autoplay.running) || !1 === e) && a()
          }, i))
      }
      function o() {
        return void 0 === t && !s.autoplay.running && ((s.autoplay.running = !0), r('autoplayStart'), a(), !0)
      }
      function d() {
        return (
          !!s.autoplay.running &&
          void 0 !== t &&
          (t && (clearTimeout(t), (t = void 0)), (s.autoplay.running = !1), r('autoplayStop'), !0)
        )
      }
      function c(e) {
        s.autoplay.running &&
          (s.autoplay.paused ||
            (t && clearTimeout(t),
            (s.autoplay.paused = !0),
            0 !== e && s.params.autoplay.waitForTransition
              ? ['transitionend', 'webkitTransitionEnd'].forEach(e => {
                  s.$wrapperEl[0].addEventListener(e, p)
                })
              : ((s.autoplay.paused = !1), a())))
      }
      function u() {
        const e = l()
        'hidden' === e.visibilityState && s.autoplay.running && c(),
          'visible' === e.visibilityState && s.autoplay.paused && (a(), (s.autoplay.paused = !1))
      }
      function p(e) {
        s &&
          !s.destroyed &&
          s.$wrapperEl &&
          e.target === s.$wrapperEl[0] &&
          (['transitionend', 'webkitTransitionEnd'].forEach(e => {
            s.$wrapperEl[0].removeEventListener(e, p)
          }),
          (s.autoplay.paused = !1),
          s.autoplay.running ? a() : d())
      }
      function f() {
        s.params.autoplay.disableOnInteraction ? d() : (r('autoplayPause'), c()),
          ['transitionend', 'webkitTransitionEnd'].forEach(e => {
            s.$wrapperEl[0].removeEventListener(e, p)
          })
      }
      function h() {
        s.params.autoplay.disableOnInteraction || ((s.autoplay.paused = !1), r('autoplayResume'), a())
      }
      ;(s.autoplay = { running: !1, paused: !1 }),
        i({
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1,
          },
        }),
        n('init', () => {
          if (s.params.autoplay.enabled) {
            o()
            l().addEventListener('visibilitychange', u),
              s.params.autoplay.pauseOnMouseEnter && (s.$el.on('mouseenter', f), s.$el.on('mouseleave', h))
          }
        }),
        n('beforeTransitionStart', (e, t, i) => {
          s.autoplay.running && (i || !s.params.autoplay.disableOnInteraction ? s.autoplay.pause(t) : d())
        }),
        n('sliderFirstMove', () => {
          s.autoplay.running && (s.params.autoplay.disableOnInteraction ? d() : c())
        }),
        n('touchEnd', () => {
          s.params.cssMode && s.autoplay.paused && !s.params.autoplay.disableOnInteraction && a()
        }),
        n('destroy', () => {
          s.$el.off('mouseenter', f), s.$el.off('mouseleave', h), s.autoplay.running && d()
          l().removeEventListener('visibilitychange', u)
        }),
        Object.assign(s.autoplay, { pause: c, run: a, start: o, stop: d })
    }
    function ae(e, t) {
      return e.transformEl
        ? t.find(e.transformEl).css({
            'backface-visibility': 'hidden',
            '-webkit-backface-visibility': 'hidden',
          })
        : t
    }
    function oe(e) {
      let { swiper: t, extendParams: s, on: i } = e
      s({ fadeEffect: { crossFade: !1, transformEl: null } })
      !(function (e) {
        const { effect: t, swiper: s, on: i, setTranslate: n, setTransition: r, overwriteParams: a, perspective: o } = e
        i('beforeInit', () => {
          if (s.params.effect !== t) return
          s.classNames.push(`${s.params.containerModifierClass}${t}`),
            o && o() && s.classNames.push(`${s.params.containerModifierClass}3d`)
          const e = a ? a() : {}
          Object.assign(s.params, e), Object.assign(s.originalParams, e)
        }),
          i('setTranslate', () => {
            s.params.effect === t && n()
          }),
          i('setTransition', (e, i) => {
            s.params.effect === t && r(i)
          })
      })({
        effect: 'fade',
        swiper: t,
        on: i,
        setTranslate: () => {
          const { slides: e } = t,
            s = t.params.fadeEffect
          for (let i = 0; i < e.length; i += 1) {
            const e = t.slides.eq(i)
            let n = -e[0].swiperSlideOffset
            t.params.virtualTranslate || (n -= t.translate)
            let r = 0
            t.isHorizontal() || ((r = n), (n = 0))
            const a = t.params.fadeEffect.crossFade
              ? Math.max(1 - Math.abs(e[0].progress), 0)
              : 1 + Math.min(Math.max(e[0].progress, -1), 0)
            ae(s, e).css({ opacity: a }).transform(`translate3d(${n}px, ${r}px, 0px)`)
          }
        },
        setTransition: e => {
          const { transformEl: s } = t.params.fadeEffect
          ;(s ? t.slides.find(s) : t.slides).transition(e),
            (function (e) {
              let { swiper: t, duration: s, transformEl: i, allSlides: n } = e
              const { slides: r, activeIndex: a, $wrapperEl: o } = t
              if (t.params.virtualTranslate && 0 !== s) {
                let e,
                  s = !1
                ;(e = n ? (i ? r.find(i) : r) : i ? r.eq(a).find(i) : r.eq(a)),
                  e.transitionEnd(() => {
                    if (s) return
                    if (!t || t.destroyed) return
                    ;(s = !0), (t.animating = !1)
                    const e = ['webkitTransitionEnd', 'transitionend']
                    for (let t = 0; t < e.length; t += 1) o.trigger(e[t])
                  })
              }
            })({ swiper: t, duration: e, transformEl: s, allSlides: !0 })
        },
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          spaceBetween: 0,
          virtualTranslate: !t.params.cssMode,
        }),
      })
    }
    function le() {
      let e = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)')
      e &&
        e.forEach(e => {
          e.parentElement.classList.add('swiper'), e.classList.add('swiper-wrapper')
          for (const t of e.children) t.classList.add('swiper-slide')
        })
    }
    window.addEventListener('load', function (e) {
      le(),
        document.querySelector('.home__slider') &&
          new ie('.home__slider', {
            modules: [ne, re, oe],
            effect: 'fade',
            fadeEffect: { crossFade: !0 },
            autoplay: { delay: 5e3, disableOnInteraction: !1 },
            slidesPerView: 1,
            speed: 1e3,
            navigation: {
              nextEl: '.control-arrow__item.control-arrow__next',
              prevEl: '.control-arrow__item.control-arrow__prev',
            },
            on: {
              init: function (e) {
                ;(document.querySelector('.controls__fraction_all').innerHTML =
                  e.slides.length < 10 ? `0${e.slides.length}` : e.slides.length),
                  document.getElementById('whiteBar').classList.add('activeBar'),
                  e.autoplay.stop(),
                  document.querySelector('.bg__home') &&
                    document.querySelector('.video-media').addEventListener('click', () => {
                      e.autoplay.start()
                    })
              },
              slideChange: function (e) {
				/* Current index variable */
				var currentslidenum = e.previousIndex;
				/* Current index variable end */
                const t = document.querySelector('.controls__fraction_current'),
                  s = document.querySelector('.item-slide__news_fraction')
                if (
                  ((t.innerHTML = e.activeIndex + 1 < 10 ? `0${e.activeIndex + 1}` : e.activeIndex + 1),
                  (s.innerHTML = e.activeIndex + 1 < 10 ? `0${e.activeIndex + 1}` : e.activeIndex + 1),
                  document.getElementById('whiteBar').classList.remove('activeBar'),
                  setTimeout(function () {
                    document.getElementById('whiteBar').classList.add('activeBar')
                  }, 20),
                  document.querySelector('.bg__home'))
                ) {
                  let t = document.querySelectorAll('.scene')
                  for (let e = 0; e < t.length; e++) t[e].classList.remove('scene__active');
                  /*t[e.activeIndex].classList.add('scene__active')*/
				  /*Added animation change*/
					ChangeSceneCustomFunction(currentslidenum + 1, e.activeIndex + 1);
					var controlArrows = document.querySelectorAll('.controls__arrow .control-arrow__item');
					controlArrows.forEach(element => {
						element.style.pointerEvents='none';
						setTimeout(() => element.style.pointerEvents='auto', 1000	);
						});

					/*Added Animation change end*/
                }
              },
            },
          })
    })
    new (s(732))({
      elements_selector: '.lazy',
      class_loaded: '_lazy-loaded',
      use_native: !0,
    })
    let de = !1
    setTimeout(() => {
      if (de) {
        let e = new Event('windowScroll')
        window.addEventListener('scroll', function (t) {
          document.dispatchEvent(e)
        })
      }
    }, 0)
    let ce = new Audio()
    function ue() {
      ce.play(), sessionStorage.setItem('music', 'play')
    }
    function pe() {
      ce.pause(), sessionStorage.setItem('music', 'pause')
    }
    ce.src = '/files/Space_Ambient.mp3'
    const fe = document.querySelector('.btn-preloader'),
      he = document.querySelector('.video-media'),
      me = document.querySelector('.video-media__video'),
      ge = document.querySelector('.mute-header'),
      ve = document.querySelector('.video-header'),
      we = document.querySelector('.video-menu')
    'pause' == sessionStorage.music
      ? (ge.classList.add('_icon-audio-mute'), ge.classList.remove('_icon-audio'), pe())
      : (ge.classList.remove('_icon-audio-mute'), ge.classList.add('_icon-audio'), ue()),
      window.addEventListener('load', function () {
        function e() {
          he.classList.add('video-remove'),
            he.classList.remove('video-add'),
            setTimeout(t, 500),
            me.pause(),
            (me.currentTime = 0),
            (document.querySelector('.header').style.zIndex = '999'),
            ue(),
            ge.classList.remove('_icon-audio-mute'),
            ge.classList.add('_icon-audio')
        }
        function t() {
          ;(he.style.display = 'none'), (he.style.zIndex = '-9999')
        }
        function s() {
          he.classList.remove('video-remove'),
            (he.style.opacity = '1'),
            (he.style.zIndex = '998'),
            (document.querySelector('.header').style.zIndex = '-1'),
            setTimeout((he.style.display = 'block'), 500),
            me.play(),
            document.addEventListener('mousemove', e => {
              ;(document.querySelector('.video-media__close').style.left = e.pageX + 'px'),
                (document.querySelector('.video-media__close').style.top = e.pageY + 'px')
            }),
            he.addEventListener('click', () => {
              e(),
                null === sessionStorage.getItem('music') && sessionStorage.setItem('music', 'play'),
                'play' == sessionStorage.music
                  ? (ue(), ge.classList.remove('_icon-audio-mute'), ge.classList.add('_icon-audio'))
                  : (pe(), ge.classList.add('_icon-audio-mute'), ge.classList.remove('_icon-audio')),
                i()
            }),
            me.addEventListener('ended', () => {
              e(),
                null === sessionStorage.getItem('music') && sessionStorage.setItem('music', 'play'),
                'play' == sessionStorage.music
                  ? (ue(), ge.classList.remove('_icon-audio-mute'), ge.classList.add('_icon-audio'))
                  : (pe(), ge.classList.add('_icon-audio-mute'), ge.classList.remove('_icon-audio')),
                i()
            }),
            'play' === sessionStorage.music &&
              (ge.classList.add('_icon-audio-mute'), ge.classList.remove('_icon-audio'), pe()),
            window.scrollTo(0, 0),
            n()
        }
        if (
          (ve &&
            ve.addEventListener('click', () => {
              he.classList.add('video-add'), s()
            }),
          we &&
            we.addEventListener('click', () => {
              he.classList.add('video-add'), s()
            }),
          document.querySelector('.preloader'))
        ) {
          function e() {
            document.querySelector('.preloader').style.display = 'none'
          }
          ce.pause(),
            fe.addEventListener('click', () => {
              /*document.querySelector('.preloader').classList.add('preloader-remove'), setTimeout(e, 1500), s()*/
			  /* Skip video or not */
				document.querySelector(".preloader").classList.add("preloader-remove"), setTimeout(e, 1500);
				if (skipvideo != true || fe.classList.contains('btn-preloader') != true) { s()};
				/* Skip video or not end */
            })
        }
        ge.addEventListener('click', () => {
          'pause' == sessionStorage.music
            ? (ge.classList.remove('_icon-audio-mute'), ge.classList.add('_icon-audio'), ue())
            : (ge.classList.add('_icon-audio-mute'), ge.classList.remove('_icon-audio'), pe())
        }),
          'pause' == sessionStorage.music && (ge.classList.add('_icon-audio-mute'), ge.classList.remove('_icon-audio'))
      }),
      (he.style.display = 'none'),
      (he.style.zIndex = '-9999'),
      he.classList.remove('video-add'),
      me.pause(),
      (me.currentTime = 0),
      (document.querySelector('.header').style.zIndex = '999')
    const be = document.querySelector('.lang-icon'),
      ye = document.querySelector('.lang-menu'),
      Se = function () {
        ye.classList.toggle('active-lang')
      }
    be.addEventListener('click', function (e) {
      e.stopPropagation(), Se()
    }),
      document.addEventListener('click', function (e) {
        const t = e.target,
          s = t == ye || ye.contains(t),
          i = t == be,
          n = ye.classList.contains('active-lang')
        s || i || !n || Se()
      }),
      (window.FLS = !0),
      (function (e) {
        let t = new Image()
        ;(t.onload = t.onerror =
          function () {
            e(2 == t.height)
          }),
          (t.src =
            'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA')
      })(function (e) {
        let t = !0 === e ? 'webp' : 'no-webp'
        document.documentElement.classList.add(t)
      }),
      (function () {
        let e = document.querySelector('.icon-menu')
        e &&
          e.addEventListener('click', function (e) {
            t &&
              (((e = 500) => {
                document.documentElement.classList.contains('lock') ? i(e) : n(e)
              })(),
              document.documentElement.classList.toggle('menu-open'))
          })
      })()
  })()
})()
var copyEmailBtn = document.getElementById("email_button");
copyEmailBtn.addEventListener('click', function(event) {
  // Выборка ссылки с электронной почтой
  console.log('Copy email command was ');
  var emailLink = document.getElementById('copyEmail');
  copyToClipboard(emailLink.textContent)
  
});

var copyTextBtn = document.getElementById("text_button");
copyTextBtn.addEventListener('click', function(event) {
  // Выборка ссылки с электронной почтой
  var textLink = document.getElementById("copyCard");
  copyToClipboard(textLink.textContent)
});

function copyToClipboard(text){
    const ele = document.createElement('textarea'); 
    ele.value = text; 
    ele.setAttribute('readonly', true)
  // Following styling is to avoid flashing textarea on screen 
    ele.style.position = 'absolute';
    ele.style.padding = 0;
    ele.style.background = 'transparent';
    ele.style.outline = 'none'; 
    ele.style.left = '-100%';
  document.body.appendChild(ele); 
  ele.select(); 
    document.execCommand('copy');
    document.body.removeChild(ele); 
  }
 
  var clickElem = document.getElementById('email_button');
  clickElem.addEventListener('click',function(e){
      document.getElementById('email_button').classList.add('_icon-copy_after'); 
      setTimeout(function() {
        document.getElementById('email_button').classList.remove('_icon-copy_after');
    }, 1000);
  })

  var clickElem = document.getElementById('text_button');
  clickElem.addEventListener('click',function(e){
      document.getElementById('text_button').classList.add('_icon-copy_after'); 
      setTimeout(function() {
        document.getElementById('text_button').classList.remove('_icon-copy_after');
    }, 1000);
  })
  
