webpackJsonp([0,3],{

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__states_enum__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__watch_state_service__ = __webpack_require__(68);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WatchComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WatchComponent = (function () {
    function WatchComponent(watchState) {
        this.watchState = watchState;
        this.READY = __WEBPACK_IMPORTED_MODULE_1__states_enum__["a" /* States */].ready;
        this.RUNNING = __WEBPACK_IMPORTED_MODULE_1__states_enum__["a" /* States */].running;
        this.WAITING = __WEBPACK_IMPORTED_MODULE_1__states_enum__["a" /* States */].waiting;
    }
    WatchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stateSubscription = this.watchState.state.asObservable()
            .subscribe(function (newState) {
            _this.currentState = newState;
        });
    };
    WatchComponent.prototype.ngOnDestroy = function () {
        this.stateSubscription.unsubscribe();
    };
    WatchComponent.prototype.onStart = function () {
        this.watchState.triggerStart();
    };
    WatchComponent.prototype.onReset = function () {
        this.watchState.triggerReset();
    };
    WatchComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-watch',
            templateUrl: './watch.component.html',
            styleUrls: ['./watch.component.css']
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__watch_state_service__["a" /* WatchStateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__watch_state_service__["a" /* WatchStateService */]) === 'function' && _a) || Object])
    ], WatchComponent);
    return WatchComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/watch.component.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return States; });
var States;
(function (States) {
    States[States["ready"] = 1] = "ready";
    States[States["running"] = 2] = "running";
    States[States["partial"] = 3] = "partial";
    States[States["waiting"] = 4] = "waiting";
})(States || (States = {}));
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/states.enum.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__states_enum__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__watch_state_service__ = __webpack_require__(68);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MINUTES = 60000;
var SECONDS = 1000;
var HUNDREDTHS = 10;
var TimerComponent = (function () {
    function TimerComponent(watchState) {
        this.watchState = watchState;
        this.READY = __WEBPACK_IMPORTED_MODULE_1__states_enum__["a" /* States */].ready;
        this.RUNNING = __WEBPACK_IMPORTED_MODULE_1__states_enum__["a" /* States */].running;
        this.WAITING = __WEBPACK_IMPORTED_MODULE_1__states_enum__["a" /* States */].waiting;
        this.currentTime = '00:00.00';
    }
    TimerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stateSubscription = this.watchState.state.asObservable()
            .subscribe(function (newState) {
            _this.currentState = newState;
            if (_this.currentState === __WEBPACK_IMPORTED_MODULE_1__states_enum__["a" /* States */].running) {
                requestAnimationFrame(_this.updateTime.bind(_this));
            }
            if (_this.currentState === __WEBPACK_IMPORTED_MODULE_1__states_enum__["a" /* States */].ready) {
                _this.currentTime = '';
                _this.finalData = undefined;
            }
        });
        this.dataSubscription = this.watchState.results[this.timerTitle].asObservable()
            .subscribe(function (result) {
            _this.finalData = result;
            console.log('new final data', _this.finalData);
        });
    };
    TimerComponent.prototype.ngOnDestroy = function () {
        this.stateSubscription.unsubscribe();
    };
    TimerComponent.prototype.onStop = function () {
        var delta = Date.now() - this.watchState.startTime;
        this.watchState.triggerUpdate(this.timerTitle, delta);
    };
    TimerComponent.prototype.onSubmit = function () {
        this.watchState.triggerUpdate(this.timerTitle, this.finalData.time, this.name, this.grade);
        this.name = undefined;
        this.grade = undefined;
    };
    TimerComponent.prototype.onCancel = function () {
        this.watchState.triggerUpdate(this.timerTitle, null);
    };
    TimerComponent.prototype.updateTime = function () {
        if (!this.finalData) {
            var delta = Date.now() - this.watchState.startTime;
            this.currentTime = this.timeToString(delta);
            requestAnimationFrame(this.updateTime.bind(this));
        }
    };
    TimerComponent.prototype.timeToString = function (delta) {
        if (delta === null) {
            return 'Cancelled';
        }
        var minutes = ('00' + Math.floor(delta / MINUTES)).substr(-2);
        delta = delta % MINUTES;
        var seconds = ('00' + Math.floor(delta / SECONDS)).substr(-2);
        delta = delta % SECONDS;
        var hundredths = ('00' + Math.floor(delta / HUNDREDTHS)).substr(-2);
        return minutes + ':' + seconds + '.' + hundredths;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(), 
        __metadata('design:type', String)
    ], TimerComponent.prototype, "timerTitle", void 0);
    TimerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-timer',
            templateUrl: './timer.component.html',
            styleUrls: ['./timer.component.css']
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__watch_state_service__["a" /* WatchStateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__watch_state_service__["a" /* WatchStateService */]) === 'function' && _a) || Object])
    ], TimerComponent);
    return TimerComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/timer.component.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_src_directives_ng_if__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Wrapper_NgIf; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */



var Wrapper_NgIf = (function () {
    function Wrapper_NgIf(p0, p1) {
        this._changed = false;
        this.context = new __WEBPACK_IMPORTED_MODULE_0__angular_common_src_directives_ng_if__["a" /* NgIf */](p0, p1);
        this._expr_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    Wrapper_NgIf.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_NgIf.prototype.ngOnDestroy = function () {
    };
    Wrapper_NgIf.prototype.check_ngIf = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_0, currValue))) {
            this._changed = true;
            this.context.ngIf = currValue;
            this._expr_0 = currValue;
        }
    };
    Wrapper_NgIf.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        return changed;
    };
    Wrapper_NgIf.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_NgIf.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_NgIf.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_NgIf;
}());
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/ng_if.ngfactory.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/app.component.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__watch_watch_component__ = __webpack_require__(134);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var routes = [
    { path: '**', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__watch_watch_component__["a" /* WatchComponent */] },
];
var RoutesModule = (function () {
    function RoutesModule() {
    }
    RoutesModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
        }), 
        __metadata('design:paramtypes', [])
    ], RoutesModule);
    return RoutesModule;
}());
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/routes.module.js.map

/***/ }),

/***/ 334:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 334;


/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gendir_app_app_module_ngfactory__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(126);





if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["a" /* platformBrowser */])().bootstrapModuleFactory(__WEBPACK_IMPORTED_MODULE_3__gendir_app_app_module_ngfactory__["a" /* AppModuleNgFactory */]);
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/main.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var styles = [''];
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/app.component.css.shim.ngstyle.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_app_component__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component_css_shim_ngstyle__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__gendir_node_modules_angular_router_src_directives_router_link_ngfactory__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_core_src_linker_view_container__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__gendir_node_modules_angular_router_src_directives_router_outlet_ngfactory__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_router_src_router__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_router_src_router_state__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_common_src_location_location_strategy__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_router_src_router_outlet_map__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_core_src_linker_component_factory_resolver__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_router_src_directives_router_link__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_router_src_directives_router_outlet__ = __webpack_require__(132);
/* unused harmony export Wrapper_AppComponent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponentNgFactory; });
/* unused harmony export View_AppComponent0 */
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


















var Wrapper_AppComponent = (function () {
    function Wrapper_AppComponent() {
        this._changed = false;
        this.context = new __WEBPACK_IMPORTED_MODULE_0__app_app_component__["a" /* AppComponent */]();
    }
    Wrapper_AppComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_AppComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_AppComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        return changed;
    };
    Wrapper_AppComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_AppComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_AppComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_AppComponent;
}());
var renderType_AppComponent_Host = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].None, [], {});
var View_AppComponent_Host0 = (function (_super) {
    __extends(View_AppComponent_Host0, _super);
    function View_AppComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_AppComponent_Host0, renderType_AppComponent_Host, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].HOST, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_AppComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["selectOrCreateRenderHostElement"](this.renderer, 'app-root', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], rootSelector, null);
        this.compView_0 = new View_AppComponent0(this.viewUtils, this, 0, this._el_0);
        this._AppComponent_0_3 = new Wrapper_AppComponent();
        this.compView_0.create(this._AppComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["a" /* ComponentRef_ */](0, this, this._el_0, this._AppComponent_0_3.context);
    };
    View_AppComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_0__app_app_component__["a" /* AppComponent */]) && (0 === requestNodeIndex))) {
            return this._AppComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_AppComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._AppComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_AppComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_AppComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_AppComponent_Host0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var AppComponentNgFactory = new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["b" /* ComponentFactory */]('app-root', View_AppComponent_Host0, __WEBPACK_IMPORTED_MODULE_0__app_app_component__["a" /* AppComponent */]);
var styles_AppComponent = [__WEBPACK_IMPORTED_MODULE_7__app_component_css_shim_ngstyle__["a" /* styles */]];
var renderType_AppComponent = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].Emulated, styles_AppComponent, {});
var View_AppComponent0 = (function (_super) {
    __extends(View_AppComponent0, _super);
    function View_AppComponent0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_AppComponent0, renderType_AppComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].COMPONENT, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
        this._arr_18 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["pureProxy1"](function (p0) {
            return [p0];
        });
    }
    View_AppComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, parentRenderNode, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-height'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'nav', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'navbar navbar-toggleable-md navbar-light bg-faded'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_4 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_2, 'a', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'navbar-brand'), null);
        this._RouterLinkWithHref_4_3 = new __WEBPACK_IMPORTED_MODULE_8__gendir_node_modules_angular_router_src_directives_router_link_ngfactory__["a" /* Wrapper_RouterLinkWithHref */](this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_11__angular_router_src_router__["a" /* Router */], this.parentIndex), this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_12__angular_router_src_router_state__["a" /* ActivatedRoute */], this.parentIndex), this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_13__angular_common_src_location_location_strategy__["b" /* LocationStrategy */], this.parentIndex));
        this._text_5 = this.renderer.createText(this._el_4, '\n      ', null);
        this._el_6 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_4, 'i', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'fa fa-rocket'), null);
        this._text_7 = this.renderer.createText(this._el_4, ' Rocket Blast\n    ', null);
        this._text_8 = this.renderer.createText(this._el_2, '\n\n  ', null);
        this._text_9 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_10 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-remaining'), null);
        this._text_11 = this.renderer.createText(this._el_10, '\n    ', null);
        this._el_12 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_10, 'router-outlet', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._vc_12 = new __WEBPACK_IMPORTED_MODULE_9__angular_core_src_linker_view_container__["a" /* ViewContainer */](12, 10, this, this._el_12);
        this._RouterOutlet_12_5 = new __WEBPACK_IMPORTED_MODULE_10__gendir_node_modules_angular_router_src_directives_router_outlet_ngfactory__["a" /* Wrapper_RouterOutlet */](this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_14__angular_router_src_router_outlet_map__["a" /* RouterOutletMap */], this.parentIndex), this._vc_12.vcRef, this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_15__angular_core_src_linker_component_factory_resolver__["a" /* ComponentFactoryResolver */], this.parentIndex), null);
        this._text_13 = this.renderer.createText(this._el_10, '\n  ', null);
        this._text_14 = this.renderer.createText(this._el_0, '\n', null);
        var disposable_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_4, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_4));
        this.init(null, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._el_6,
            this._text_7,
            this._text_8,
            this._text_9,
            this._el_10,
            this._text_11,
            this._el_12,
            this._text_13,
            this._text_14
        ]), [disposable_0]);
        return null;
    };
    View_AppComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_16__angular_router_src_directives_router_link__["b" /* RouterLinkWithHref */]) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 7)))) {
            return this._RouterLinkWithHref_4_3.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_17__angular_router_src_directives_router_outlet__["a" /* RouterOutlet */]) && (12 === requestNodeIndex))) {
            return this._RouterOutlet_12_5.context;
        }
        return notFoundResult;
    };
    View_AppComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_4_0_0 = this._arr_18('');
        this._RouterLinkWithHref_4_3.check_routerLink(currVal_4_0_0, throwOnChange, false);
        this._RouterLinkWithHref_4_3.ngDoCheck(this, this._el_4, throwOnChange);
        this._RouterOutlet_12_5.ngDoCheck(this, this._el_12, throwOnChange);
        this._vc_12.detectChangesInNestedViews(throwOnChange);
        this._RouterLinkWithHref_4_3.checkHost(this, this, this._el_4, throwOnChange);
    };
    View_AppComponent0.prototype.destroyInternal = function () {
        this._vc_12.destroyNestedViews();
        this._RouterLinkWithHref_4_3.ngOnDestroy();
        this._RouterOutlet_12_5.ngOnDestroy();
    };
    View_AppComponent0.prototype.handleEvent_4 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._RouterLinkWithHref_4_3.handleEvent(eventName, $event) && result);
        return result;
    };
    return View_AppComponent0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/app.component.ngfactory.js.map

/***/ }),

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core_src_linker_ng_module_factory__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_module__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_src_common_module__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core_src_application_module__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms_src_directives__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms_src_form_providers__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http_src_http_module__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_routes_routes_module__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common_src_localization__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_core_src_application_init__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_core_src_testability_testability__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_core_src_application_ref__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_compiler__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_platform_browser_src_dom_events_hammer_gestures__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_src_dom_events_event_manager__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_platform_browser_src_dom_shared_styles_host__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser_src_dom_dom_renderer__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_platform_browser_src_security_dom_sanitization_service__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_core_src_animation_animation_queue__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_core_src_linker_view_utils__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_src_browser_title__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_forms_src_directives_radio_control_value_accessor__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__angular_http_src_backends_browser_xhr__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_http_src_base_response_options__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_http_src_backends_xhr_backend__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__angular_http_src_base_request_options__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__angular_common_src_location_location__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_router_src_url_tree__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__angular_router_src_router_outlet_map__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__angular_core_src_linker_system_js_ng_module_factory_loader__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__angular_router_src_router_preloader__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__app_watch_state_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__watch_watch_component_ngfactory__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__app_component_ngfactory__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__angular_core_src_i18n_tokens__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__angular_core_src_application_tokens__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__angular_platform_browser_src_dom_events_dom_events__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__angular_platform_browser_src_dom_events_key_events__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__angular_core_src_zone_ng_zone__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__angular_platform_browser_src_dom_debug_ng_probe__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__angular_common_src_location_platform_location__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__angular_common_src_location_location_strategy__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__app_watch_watch_component__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__angular_router_src_url_handling_strategy__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__angular_router_src_route_reuse_strategy__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__angular_router_src_router__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__angular_core_src_console__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__angular_core_src_error_handler__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__angular_platform_browser_src_dom_dom_tokens__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__angular_platform_browser_src_dom_animation_driver__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__angular_core_src_render_api__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__angular_core_src_security__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__angular_core_src_change_detection_differs_iterable_differs__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__angular_core_src_change_detection_differs_keyvalue_differs__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__angular_http_src_interfaces__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__angular_http_src_http__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__angular_core_src_linker_ng_module_factory_loader__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__angular_router_src_router_config_loader__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__angular_router_src_router_state__ = __webpack_require__(43);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModuleNgFactory; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





























































var AppModuleInjector = (function (_super) {
    __extends(AppModuleInjector, _super);
    function AppModuleInjector(parent) {
        _super.call(this, parent, [
            __WEBPACK_IMPORTED_MODULE_34__watch_watch_component_ngfactory__["a" /* WatchComponentNgFactory */],
            __WEBPACK_IMPORTED_MODULE_35__app_component_ngfactory__["a" /* AppComponentNgFactory */]
        ], [__WEBPACK_IMPORTED_MODULE_35__app_component_ngfactory__["a" /* AppComponentNgFactory */]]);
    }
    Object.defineProperty(AppModuleInjector.prototype, "_LOCALE_ID_10", {
        get: function () {
            if ((this.__LOCALE_ID_10 == null)) {
                (this.__LOCALE_ID_10 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_application_module__["a" /* _localeFactory */](this.parent.get(__WEBPACK_IMPORTED_MODULE_36__angular_core_src_i18n_tokens__["a" /* LOCALE_ID */], null)));
            }
            return this.__LOCALE_ID_10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgLocalization_11", {
        get: function () {
            if ((this.__NgLocalization_11 == null)) {
                (this.__NgLocalization_11 = new __WEBPACK_IMPORTED_MODULE_10__angular_common_src_localization__["a" /* NgLocaleLocalization */](this._LOCALE_ID_10));
            }
            return this.__NgLocalization_11;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ApplicationRef_16", {
        get: function () {
            if ((this.__ApplicationRef_16 == null)) {
                (this.__ApplicationRef_16 = this._ApplicationRef__15);
            }
            return this.__ApplicationRef_16;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Compiler_17", {
        get: function () {
            if ((this.__Compiler_17 == null)) {
                (this.__Compiler_17 = new __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_compiler__["a" /* Compiler */]());
            }
            return this.__Compiler_17;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_APP_ID_18", {
        get: function () {
            if ((this.__APP_ID_18 == null)) {
                (this.__APP_ID_18 = __WEBPACK_IMPORTED_MODULE_37__angular_core_src_application_tokens__["a" /* _appIdRandomProviderFactory */]());
            }
            return this.__APP_ID_18;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DOCUMENT_19", {
        get: function () {
            if ((this.__DOCUMENT_19 == null)) {
                (this.__DOCUMENT_19 = __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__["a" /* _document */]());
            }
            return this.__DOCUMENT_19;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_HAMMER_GESTURE_CONFIG_20", {
        get: function () {
            if ((this.__HAMMER_GESTURE_CONFIG_20 == null)) {
                (this.__HAMMER_GESTURE_CONFIG_20 = new __WEBPACK_IMPORTED_MODULE_15__angular_platform_browser_src_dom_events_hammer_gestures__["a" /* HammerGestureConfig */]());
            }
            return this.__HAMMER_GESTURE_CONFIG_20;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EVENT_MANAGER_PLUGINS_21", {
        get: function () {
            if ((this.__EVENT_MANAGER_PLUGINS_21 == null)) {
                (this.__EVENT_MANAGER_PLUGINS_21 = [
                    new __WEBPACK_IMPORTED_MODULE_38__angular_platform_browser_src_dom_events_dom_events__["a" /* DomEventsPlugin */](),
                    new __WEBPACK_IMPORTED_MODULE_39__angular_platform_browser_src_dom_events_key_events__["a" /* KeyEventsPlugin */](),
                    new __WEBPACK_IMPORTED_MODULE_15__angular_platform_browser_src_dom_events_hammer_gestures__["b" /* HammerGesturesPlugin */](this._HAMMER_GESTURE_CONFIG_20)
                ]);
            }
            return this.__EVENT_MANAGER_PLUGINS_21;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EventManager_22", {
        get: function () {
            if ((this.__EventManager_22 == null)) {
                (this.__EventManager_22 = new __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_src_dom_events_event_manager__["a" /* EventManager */](this._EVENT_MANAGER_PLUGINS_21, this.parent.get(__WEBPACK_IMPORTED_MODULE_40__angular_core_src_zone_ng_zone__["a" /* NgZone */])));
            }
            return this.__EventManager_22;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomSharedStylesHost_23", {
        get: function () {
            if ((this.__DomSharedStylesHost_23 == null)) {
                (this.__DomSharedStylesHost_23 = new __WEBPACK_IMPORTED_MODULE_17__angular_platform_browser_src_dom_shared_styles_host__["a" /* DomSharedStylesHost */](this._DOCUMENT_19));
            }
            return this.__DomSharedStylesHost_23;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AnimationDriver_24", {
        get: function () {
            if ((this.__AnimationDriver_24 == null)) {
                (this.__AnimationDriver_24 = __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__["b" /* _resolveDefaultAnimationDriver */]());
            }
            return this.__AnimationDriver_24;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomRootRenderer_25", {
        get: function () {
            if ((this.__DomRootRenderer_25 == null)) {
                (this.__DomRootRenderer_25 = new __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser_src_dom_dom_renderer__["a" /* DomRootRenderer_ */](this._DOCUMENT_19, this._EventManager_22, this._DomSharedStylesHost_23, this._AnimationDriver_24, this._APP_ID_18));
            }
            return this.__DomRootRenderer_25;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgProbeToken_26", {
        get: function () {
            if ((this.__NgProbeToken_26 == null)) {
                (this.__NgProbeToken_26 = [__WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["a" /* routerNgProbeToken */]()]);
            }
            return this.__NgProbeToken_26;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RootRenderer_27", {
        get: function () {
            if ((this.__RootRenderer_27 == null)) {
                (this.__RootRenderer_27 = __WEBPACK_IMPORTED_MODULE_41__angular_platform_browser_src_dom_debug_ng_probe__["a" /* _createConditionalRootRenderer */](this._DomRootRenderer_25, this.parent.get(__WEBPACK_IMPORTED_MODULE_41__angular_platform_browser_src_dom_debug_ng_probe__["b" /* NgProbeToken */], null), this._NgProbeToken_26));
            }
            return this.__RootRenderer_27;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomSanitizer_28", {
        get: function () {
            if ((this.__DomSanitizer_28 == null)) {
                (this.__DomSanitizer_28 = new __WEBPACK_IMPORTED_MODULE_19__angular_platform_browser_src_security_dom_sanitization_service__["a" /* DomSanitizerImpl */]());
            }
            return this.__DomSanitizer_28;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Sanitizer_29", {
        get: function () {
            if ((this.__Sanitizer_29 == null)) {
                (this.__Sanitizer_29 = this._DomSanitizer_28);
            }
            return this.__Sanitizer_29;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AnimationQueue_30", {
        get: function () {
            if ((this.__AnimationQueue_30 == null)) {
                (this.__AnimationQueue_30 = new __WEBPACK_IMPORTED_MODULE_20__angular_core_src_animation_animation_queue__["a" /* AnimationQueue */](this.parent.get(__WEBPACK_IMPORTED_MODULE_40__angular_core_src_zone_ng_zone__["a" /* NgZone */])));
            }
            return this.__AnimationQueue_30;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ViewUtils_31", {
        get: function () {
            if ((this.__ViewUtils_31 == null)) {
                (this.__ViewUtils_31 = new __WEBPACK_IMPORTED_MODULE_21__angular_core_src_linker_view_utils__["ViewUtils"](this._RootRenderer_27, this._Sanitizer_29, this._AnimationQueue_30));
            }
            return this.__ViewUtils_31;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_IterableDiffers_32", {
        get: function () {
            if ((this.__IterableDiffers_32 == null)) {
                (this.__IterableDiffers_32 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_application_module__["b" /* _iterableDiffersFactory */]());
            }
            return this.__IterableDiffers_32;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_KeyValueDiffers_33", {
        get: function () {
            if ((this.__KeyValueDiffers_33 == null)) {
                (this.__KeyValueDiffers_33 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_application_module__["c" /* _keyValueDiffersFactory */]());
            }
            return this.__KeyValueDiffers_33;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_SharedStylesHost_34", {
        get: function () {
            if ((this.__SharedStylesHost_34 == null)) {
                (this.__SharedStylesHost_34 = this._DomSharedStylesHost_23);
            }
            return this.__SharedStylesHost_34;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Title_35", {
        get: function () {
            if ((this.__Title_35 == null)) {
                (this.__Title_35 = new __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_src_browser_title__["a" /* Title */]());
            }
            return this.__Title_35;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RadioControlRegistry_36", {
        get: function () {
            if ((this.__RadioControlRegistry_36 == null)) {
                (this.__RadioControlRegistry_36 = new __WEBPACK_IMPORTED_MODULE_23__angular_forms_src_directives_radio_control_value_accessor__["a" /* RadioControlRegistry */]());
            }
            return this.__RadioControlRegistry_36;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_BrowserXhr_37", {
        get: function () {
            if ((this.__BrowserXhr_37 == null)) {
                (this.__BrowserXhr_37 = new __WEBPACK_IMPORTED_MODULE_24__angular_http_src_backends_browser_xhr__["a" /* BrowserXhr */]());
            }
            return this.__BrowserXhr_37;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ResponseOptions_38", {
        get: function () {
            if ((this.__ResponseOptions_38 == null)) {
                (this.__ResponseOptions_38 = new __WEBPACK_IMPORTED_MODULE_25__angular_http_src_base_response_options__["a" /* BaseResponseOptions */]());
            }
            return this.__ResponseOptions_38;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XSRFStrategy_39", {
        get: function () {
            if ((this.__XSRFStrategy_39 == null)) {
                (this.__XSRFStrategy_39 = __WEBPACK_IMPORTED_MODULE_7__angular_http_src_http_module__["a" /* _createDefaultCookieXSRFStrategy */]());
            }
            return this.__XSRFStrategy_39;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XHRBackend_40", {
        get: function () {
            if ((this.__XHRBackend_40 == null)) {
                (this.__XHRBackend_40 = new __WEBPACK_IMPORTED_MODULE_26__angular_http_src_backends_xhr_backend__["a" /* XHRBackend */](this._BrowserXhr_37, this._ResponseOptions_38, this._XSRFStrategy_39));
            }
            return this.__XHRBackend_40;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RequestOptions_41", {
        get: function () {
            if ((this.__RequestOptions_41 == null)) {
                (this.__RequestOptions_41 = new __WEBPACK_IMPORTED_MODULE_27__angular_http_src_base_request_options__["a" /* BaseRequestOptions */]());
            }
            return this.__RequestOptions_41;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Http_42", {
        get: function () {
            if ((this.__Http_42 == null)) {
                (this.__Http_42 = __WEBPACK_IMPORTED_MODULE_7__angular_http_src_http_module__["b" /* httpFactory */](this._XHRBackend_40, this._RequestOptions_41));
            }
            return this.__Http_42;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTER_CONFIGURATION_43", {
        get: function () {
            if ((this.__ROUTER_CONFIGURATION_43 == null)) {
                (this.__ROUTER_CONFIGURATION_43 = {});
            }
            return this.__ROUTER_CONFIGURATION_43;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_LocationStrategy_44", {
        get: function () {
            if ((this.__LocationStrategy_44 == null)) {
                (this.__LocationStrategy_44 = __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["b" /* provideLocationStrategy */](this.parent.get(__WEBPACK_IMPORTED_MODULE_42__angular_common_src_location_platform_location__["a" /* PlatformLocation */]), this.parent.get(__WEBPACK_IMPORTED_MODULE_43__angular_common_src_location_location_strategy__["a" /* APP_BASE_HREF */], null), this._ROUTER_CONFIGURATION_43));
            }
            return this.__LocationStrategy_44;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Location_45", {
        get: function () {
            if ((this.__Location_45 == null)) {
                (this.__Location_45 = new __WEBPACK_IMPORTED_MODULE_28__angular_common_src_location_location__["a" /* Location */](this._LocationStrategy_44));
            }
            return this.__Location_45;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_UrlSerializer_46", {
        get: function () {
            if ((this.__UrlSerializer_46 == null)) {
                (this.__UrlSerializer_46 = new __WEBPACK_IMPORTED_MODULE_29__angular_router_src_url_tree__["a" /* DefaultUrlSerializer */]());
            }
            return this.__UrlSerializer_46;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RouterOutletMap_47", {
        get: function () {
            if ((this.__RouterOutletMap_47 == null)) {
                (this.__RouterOutletMap_47 = new __WEBPACK_IMPORTED_MODULE_30__angular_router_src_router_outlet_map__["a" /* RouterOutletMap */]());
            }
            return this.__RouterOutletMap_47;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgModuleFactoryLoader_48", {
        get: function () {
            if ((this.__NgModuleFactoryLoader_48 == null)) {
                (this.__NgModuleFactoryLoader_48 = new __WEBPACK_IMPORTED_MODULE_31__angular_core_src_linker_system_js_ng_module_factory_loader__["a" /* SystemJsNgModuleLoader */](this._Compiler_17, this.parent.get(__WEBPACK_IMPORTED_MODULE_31__angular_core_src_linker_system_js_ng_module_factory_loader__["b" /* SystemJsNgModuleLoaderConfig */], null)));
            }
            return this.__NgModuleFactoryLoader_48;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTES_49", {
        get: function () {
            if ((this.__ROUTES_49 == null)) {
                (this.__ROUTES_49 = [[
                        {
                            path: '**',
                            redirectTo: '/',
                            pathMatch: 'full'
                        },
                        {
                            path: '',
                            component: __WEBPACK_IMPORTED_MODULE_44__app_watch_watch_component__["a" /* WatchComponent */]
                        }
                    ]
                ]);
            }
            return this.__ROUTES_49;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Router_50", {
        get: function () {
            if ((this.__Router_50 == null)) {
                (this.__Router_50 = __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["c" /* setupRouter */](this._ApplicationRef_16, this._UrlSerializer_46, this._RouterOutletMap_47, this._Location_45, this, this._NgModuleFactoryLoader_48, this._Compiler_17, this._ROUTES_49, this._ROUTER_CONFIGURATION_43, this.parent.get(__WEBPACK_IMPORTED_MODULE_45__angular_router_src_url_handling_strategy__["a" /* UrlHandlingStrategy */], null), this.parent.get(__WEBPACK_IMPORTED_MODULE_46__angular_router_src_route_reuse_strategy__["a" /* RouteReuseStrategy */], null)));
            }
            return this.__Router_50;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ActivatedRoute_51", {
        get: function () {
            if ((this.__ActivatedRoute_51 == null)) {
                (this.__ActivatedRoute_51 = __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["d" /* rootRoute */](this._Router_50));
            }
            return this.__ActivatedRoute_51;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_PreloadAllModules_55", {
        get: function () {
            if ((this.__PreloadAllModules_55 == null)) {
                (this.__PreloadAllModules_55 = new __WEBPACK_IMPORTED_MODULE_32__angular_router_src_router_preloader__["a" /* PreloadAllModules */]());
            }
            return this.__PreloadAllModules_55;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTER_INITIALIZER_56", {
        get: function () {
            if ((this.__ROUTER_INITIALIZER_56 == null)) {
                (this.__ROUTER_INITIALIZER_56 = __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["e" /* initialRouterNavigation */](this._Router_50, this._ApplicationRef_16, this._RouterPreloader_54, this._ROUTER_CONFIGURATION_43));
            }
            return this.__ROUTER_INITIALIZER_56;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_APP_BOOTSTRAP_LISTENER_57", {
        get: function () {
            if ((this.__APP_BOOTSTRAP_LISTENER_57 == null)) {
                (this.__APP_BOOTSTRAP_LISTENER_57 = [this._ROUTER_INITIALIZER_56]);
            }
            return this.__APP_BOOTSTRAP_LISTENER_57;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_WatchStateService_58", {
        get: function () {
            if ((this.__WatchStateService_58 == null)) {
                (this.__WatchStateService_58 = new __WEBPACK_IMPORTED_MODULE_33__app_watch_state_service__["a" /* WatchStateService */]());
            }
            return this.__WatchStateService_58;
        },
        enumerable: true,
        configurable: true
    });
    AppModuleInjector.prototype.createInternal = function () {
        this._CommonModule_0 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_src_common_module__["a" /* CommonModule */]();
        this._ApplicationModule_1 = new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_application_module__["d" /* ApplicationModule */]();
        this._BrowserModule_2 = new __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__["c" /* BrowserModule */](this.parent.get(__WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__["c" /* BrowserModule */], null));
        this._InternalFormsSharedModule_3 = new __WEBPACK_IMPORTED_MODULE_5__angular_forms_src_directives__["a" /* InternalFormsSharedModule */]();
        this._FormsModule_4 = new __WEBPACK_IMPORTED_MODULE_6__angular_forms_src_form_providers__["a" /* FormsModule */]();
        this._HttpModule_5 = new __WEBPACK_IMPORTED_MODULE_7__angular_http_src_http_module__["c" /* HttpModule */]();
        this._ROUTER_FORROOT_GUARD_6 = __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["f" /* provideForRootGuard */](this.parent.get(__WEBPACK_IMPORTED_MODULE_47__angular_router_src_router__["a" /* Router */], null));
        this._RouterModule_7 = new __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["g" /* RouterModule */](this._ROUTER_FORROOT_GUARD_6);
        this._RoutesModule_8 = new __WEBPACK_IMPORTED_MODULE_9__app_routes_routes_module__["a" /* RoutesModule */]();
        this._AppModule_9 = new __WEBPACK_IMPORTED_MODULE_1__app_app_module__["a" /* AppModule */]();
        this._ErrorHandler_12 = __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__["d" /* errorHandler */]();
        this._ApplicationInitStatus_13 = new __WEBPACK_IMPORTED_MODULE_11__angular_core_src_application_init__["a" /* ApplicationInitStatus */](this.parent.get(__WEBPACK_IMPORTED_MODULE_11__angular_core_src_application_init__["b" /* APP_INITIALIZER */], null));
        this._Testability_14 = new __WEBPACK_IMPORTED_MODULE_12__angular_core_src_testability_testability__["a" /* Testability */](this.parent.get(__WEBPACK_IMPORTED_MODULE_40__angular_core_src_zone_ng_zone__["a" /* NgZone */]));
        this._ApplicationRef__15 = new __WEBPACK_IMPORTED_MODULE_13__angular_core_src_application_ref__["a" /* ApplicationRef_ */](this.parent.get(__WEBPACK_IMPORTED_MODULE_40__angular_core_src_zone_ng_zone__["a" /* NgZone */]), this.parent.get(__WEBPACK_IMPORTED_MODULE_48__angular_core_src_console__["a" /* Console */]), this, this._ErrorHandler_12, this, this._ApplicationInitStatus_13, this.parent.get(__WEBPACK_IMPORTED_MODULE_12__angular_core_src_testability_testability__["b" /* TestabilityRegistry */], null), this._Testability_14);
        this._NoPreloading_52 = new __WEBPACK_IMPORTED_MODULE_32__angular_router_src_router_preloader__["b" /* NoPreloading */]();
        this._PreloadingStrategy_53 = this._NoPreloading_52;
        this._RouterPreloader_54 = new __WEBPACK_IMPORTED_MODULE_32__angular_router_src_router_preloader__["c" /* RouterPreloader */](this._Router_50, this._NgModuleFactoryLoader_48, this._Compiler_17, this, this._PreloadingStrategy_53);
        return this._AppModule_9;
    };
    AppModuleInjector.prototype.getInternal = function (token, notFoundResult) {
        if ((token === __WEBPACK_IMPORTED_MODULE_2__angular_common_src_common_module__["a" /* CommonModule */])) {
            return this._CommonModule_0;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_3__angular_core_src_application_module__["d" /* ApplicationModule */])) {
            return this._ApplicationModule_1;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__["c" /* BrowserModule */])) {
            return this._BrowserModule_2;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_5__angular_forms_src_directives__["a" /* InternalFormsSharedModule */])) {
            return this._InternalFormsSharedModule_3;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_6__angular_forms_src_form_providers__["a" /* FormsModule */])) {
            return this._FormsModule_4;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_7__angular_http_src_http_module__["c" /* HttpModule */])) {
            return this._HttpModule_5;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["h" /* ROUTER_FORROOT_GUARD */])) {
            return this._ROUTER_FORROOT_GUARD_6;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["g" /* RouterModule */])) {
            return this._RouterModule_7;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_9__app_routes_routes_module__["a" /* RoutesModule */])) {
            return this._RoutesModule_8;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_1__app_app_module__["a" /* AppModule */])) {
            return this._AppModule_9;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_36__angular_core_src_i18n_tokens__["a" /* LOCALE_ID */])) {
            return this._LOCALE_ID_10;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_10__angular_common_src_localization__["b" /* NgLocalization */])) {
            return this._NgLocalization_11;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_49__angular_core_src_error_handler__["a" /* ErrorHandler */])) {
            return this._ErrorHandler_12;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_11__angular_core_src_application_init__["a" /* ApplicationInitStatus */])) {
            return this._ApplicationInitStatus_13;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_12__angular_core_src_testability_testability__["a" /* Testability */])) {
            return this._Testability_14;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_13__angular_core_src_application_ref__["a" /* ApplicationRef_ */])) {
            return this._ApplicationRef__15;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_13__angular_core_src_application_ref__["b" /* ApplicationRef */])) {
            return this._ApplicationRef_16;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_compiler__["a" /* Compiler */])) {
            return this._Compiler_17;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_37__angular_core_src_application_tokens__["b" /* APP_ID */])) {
            return this._APP_ID_18;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_50__angular_platform_browser_src_dom_dom_tokens__["a" /* DOCUMENT */])) {
            return this._DOCUMENT_19;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_15__angular_platform_browser_src_dom_events_hammer_gestures__["c" /* HAMMER_GESTURE_CONFIG */])) {
            return this._HAMMER_GESTURE_CONFIG_20;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_src_dom_events_event_manager__["b" /* EVENT_MANAGER_PLUGINS */])) {
            return this._EVENT_MANAGER_PLUGINS_21;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_src_dom_events_event_manager__["a" /* EventManager */])) {
            return this._EventManager_22;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_17__angular_platform_browser_src_dom_shared_styles_host__["a" /* DomSharedStylesHost */])) {
            return this._DomSharedStylesHost_23;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_51__angular_platform_browser_src_dom_animation_driver__["a" /* AnimationDriver */])) {
            return this._AnimationDriver_24;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser_src_dom_dom_renderer__["b" /* DomRootRenderer */])) {
            return this._DomRootRenderer_25;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_13__angular_core_src_application_ref__["c" /* NgProbeToken */])) {
            return this._NgProbeToken_26;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_52__angular_core_src_render_api__["a" /* RootRenderer */])) {
            return this._RootRenderer_27;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_19__angular_platform_browser_src_security_dom_sanitization_service__["b" /* DomSanitizer */])) {
            return this._DomSanitizer_28;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_53__angular_core_src_security__["a" /* Sanitizer */])) {
            return this._Sanitizer_29;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_20__angular_core_src_animation_animation_queue__["a" /* AnimationQueue */])) {
            return this._AnimationQueue_30;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_21__angular_core_src_linker_view_utils__["ViewUtils"])) {
            return this._ViewUtils_31;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_54__angular_core_src_change_detection_differs_iterable_differs__["a" /* IterableDiffers */])) {
            return this._IterableDiffers_32;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_55__angular_core_src_change_detection_differs_keyvalue_differs__["a" /* KeyValueDiffers */])) {
            return this._KeyValueDiffers_33;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_17__angular_platform_browser_src_dom_shared_styles_host__["b" /* SharedStylesHost */])) {
            return this._SharedStylesHost_34;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_src_browser_title__["a" /* Title */])) {
            return this._Title_35;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_23__angular_forms_src_directives_radio_control_value_accessor__["a" /* RadioControlRegistry */])) {
            return this._RadioControlRegistry_36;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_24__angular_http_src_backends_browser_xhr__["a" /* BrowserXhr */])) {
            return this._BrowserXhr_37;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_25__angular_http_src_base_response_options__["b" /* ResponseOptions */])) {
            return this._ResponseOptions_38;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_56__angular_http_src_interfaces__["a" /* XSRFStrategy */])) {
            return this._XSRFStrategy_39;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_26__angular_http_src_backends_xhr_backend__["a" /* XHRBackend */])) {
            return this._XHRBackend_40;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_27__angular_http_src_base_request_options__["b" /* RequestOptions */])) {
            return this._RequestOptions_41;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_57__angular_http_src_http__["a" /* Http */])) {
            return this._Http_42;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["i" /* ROUTER_CONFIGURATION */])) {
            return this._ROUTER_CONFIGURATION_43;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_43__angular_common_src_location_location_strategy__["b" /* LocationStrategy */])) {
            return this._LocationStrategy_44;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_28__angular_common_src_location_location__["a" /* Location */])) {
            return this._Location_45;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_29__angular_router_src_url_tree__["b" /* UrlSerializer */])) {
            return this._UrlSerializer_46;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_30__angular_router_src_router_outlet_map__["a" /* RouterOutletMap */])) {
            return this._RouterOutletMap_47;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_58__angular_core_src_linker_ng_module_factory_loader__["a" /* NgModuleFactoryLoader */])) {
            return this._NgModuleFactoryLoader_48;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_59__angular_router_src_router_config_loader__["a" /* ROUTES */])) {
            return this._ROUTES_49;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_47__angular_router_src_router__["a" /* Router */])) {
            return this._Router_50;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_60__angular_router_src_router_state__["a" /* ActivatedRoute */])) {
            return this._ActivatedRoute_51;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_32__angular_router_src_router_preloader__["b" /* NoPreloading */])) {
            return this._NoPreloading_52;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_32__angular_router_src_router_preloader__["d" /* PreloadingStrategy */])) {
            return this._PreloadingStrategy_53;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_32__angular_router_src_router_preloader__["c" /* RouterPreloader */])) {
            return this._RouterPreloader_54;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_32__angular_router_src_router_preloader__["a" /* PreloadAllModules */])) {
            return this._PreloadAllModules_55;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["j" /* ROUTER_INITIALIZER */])) {
            return this._ROUTER_INITIALIZER_56;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_37__angular_core_src_application_tokens__["c" /* APP_BOOTSTRAP_LISTENER */])) {
            return this._APP_BOOTSTRAP_LISTENER_57;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_33__app_watch_state_service__["a" /* WatchStateService */])) {
            return this._WatchStateService_58;
        }
        return notFoundResult;
    };
    AppModuleInjector.prototype.destroyInternal = function () {
        this._ApplicationRef__15.ngOnDestroy();
        this._RouterPreloader_54.ngOnDestroy();
    };
    return AppModuleInjector;
}(__WEBPACK_IMPORTED_MODULE_0__angular_core_src_linker_ng_module_factory__["a" /* NgModuleInjector */]));
var AppModuleNgFactory = new __WEBPACK_IMPORTED_MODULE_0__angular_core_src_linker_ng_module_factory__["b" /* NgModuleFactory */](AppModuleInjector, __WEBPACK_IMPORTED_MODULE_1__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/app.module.ngfactory.js.map

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var styles = ['.card[_ngcontent-%COMP%] {\r\n    min-width: 12rem;\r\n}'];
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/timer.component.css.shim.ngstyle.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_timer_timer_component__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core_src_metadata_view__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core_src_linker_view_type__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core_src_change_detection_constants__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core_src_linker_component_factory__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_watch_state_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__timer_component_css_shim_ngstyle__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_core_src_linker_view_container__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_core_src_linker_template_ref__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_common_src_directives_ng_if__ = __webpack_require__(100);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Wrapper_TimerComponent; });
/* unused harmony export TimerComponentNgFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return View_TimerComponent0; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};














var Wrapper_TimerComponent = (function () {
    function Wrapper_TimerComponent(p0) {
        this._changed = false;
        this.context = new __WEBPACK_IMPORTED_MODULE_0__app_timer_timer_component__["a" /* TimerComponent */](p0);
        this._expr_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    Wrapper_TimerComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_TimerComponent.prototype.ngOnDestroy = function () {
        this.context.ngOnDestroy();
    };
    Wrapper_TimerComponent.prototype.check_timerTitle = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_0, currValue))) {
            this._changed = true;
            this.context.timerTitle = currValue;
            this._expr_0 = currValue;
        }
    };
    Wrapper_TimerComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        if (!throwOnChange) {
            if ((view.numberOfChecks === 0)) {
                this.context.ngOnInit();
            }
        }
        return changed;
    };
    Wrapper_TimerComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_TimerComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_TimerComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_TimerComponent;
}());
var renderType_TimerComponent_Host = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].None, [], {});
var View_TimerComponent_Host0 = (function (_super) {
    __extends(View_TimerComponent_Host0, _super);
    function View_TimerComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_TimerComponent_Host0, renderType_TimerComponent_Host, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_linker_view_type__["a" /* ViewType */].HOST, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_6__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_TimerComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["selectOrCreateRenderHostElement"](this.renderer, 'app-timer', __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], rootSelector, null);
        this.compView_0 = new View_TimerComponent0(this.viewUtils, this, 0, this._el_0);
        this._TimerComponent_0_3 = new Wrapper_TimerComponent(this.injectorGet(__WEBPACK_IMPORTED_MODULE_8__app_watch_state_service__["a" /* WatchStateService */], this.parentIndex));
        this.compView_0.create(this._TimerComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new __WEBPACK_IMPORTED_MODULE_7__angular_core_src_linker_component_factory__["a" /* ComponentRef_ */](0, this, this._el_0, this._TimerComponent_0_3.context);
    };
    View_TimerComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_0__app_timer_timer_component__["a" /* TimerComponent */]) && (0 === requestNodeIndex))) {
            return this._TimerComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_TimerComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._TimerComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_TimerComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
        this._TimerComponent_0_3.ngOnDestroy();
    };
    View_TimerComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_TimerComponent_Host0;
}(__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view__["a" /* AppView */]));
var TimerComponentNgFactory = new __WEBPACK_IMPORTED_MODULE_7__angular_core_src_linker_component_factory__["b" /* ComponentFactory */]('app-timer', View_TimerComponent_Host0, __WEBPACK_IMPORTED_MODULE_0__app_timer_timer_component__["a" /* TimerComponent */]);
var styles_TimerComponent = [__WEBPACK_IMPORTED_MODULE_9__timer_component_css_shim_ngstyle__["a" /* styles */]];
var View_TimerComponent1 = (function (_super) {
    __extends(View_TimerComponent1, _super);
    function View_TimerComponent1(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        _super.call(this, View_TimerComponent1, renderType_TimerComponent, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_linker_view_type__["a" /* ViewType */].EMBEDDED, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_6__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways, declaredViewContainer);
    }
    View_TimerComponent1.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, null, 'div', __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_1 = this.renderer.createText(this._el_0, '\n      ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'h1', new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'text-center'), null);
        this._text_3 = this.renderer.createText(this._el_2, '--:--.--', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n    ', null);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4
        ]), null);
        return null;
    };
    View_TimerComponent1.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_TimerComponent1;
}(__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view__["a" /* AppView */]));
var View_TimerComponent3 = (function (_super) {
    __extends(View_TimerComponent3, _super);
    function View_TimerComponent3(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        _super.call(this, View_TimerComponent3, renderType_TimerComponent, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_linker_view_type__["a" /* ViewType */].EMBEDDED, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_6__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways, declaredViewContainer);
        this._expr_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    View_TimerComponent3.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, null, 'div', __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_1 = this.renderer.createText(this._el_0, '\n        ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'h1', new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'text-center'), null);
        this._text_3 = this.renderer.createText(this._el_2, '', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n      ', null);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4
        ]), null);
        return null;
    };
    View_TimerComponent3.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_5 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["inlineInterpolate"](1, '', this.parentView.parentView.context.timeToString(this.parentView.parentView.context.finalData.time), '');
        if (__WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_5, currVal_5)) {
            this.renderer.setText(this._text_3, currVal_5);
            this._expr_5 = currVal_5;
        }
    };
    View_TimerComponent3.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_TimerComponent3;
}(__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view__["a" /* AppView */]));
var View_TimerComponent4 = (function (_super) {
    __extends(View_TimerComponent4, _super);
    function View_TimerComponent4(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        _super.call(this, View_TimerComponent4, renderType_TimerComponent, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_linker_view_type__["a" /* ViewType */].EMBEDDED, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_6__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways, declaredViewContainer);
        this._expr_15 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    View_TimerComponent4.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, null, 'div', new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'buffer'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n        ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'h1', new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["InlineArray2"](2, 'style', 'padding-left: 1rem'), null);
        this._text_3 = this.renderer.createText(this._el_2, '', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n        ', null);
        this._el_5 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'button', new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'btn btn-info btn-lg btn-block'), null);
        this._text_6 = this.renderer.createText(this._el_5, '\n          ', null);
        this._el_7 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_5, 'i', new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["InlineArray4"](4, 'aria-hidden', 'true', 'class', 'fa fa-stop'), null);
        this._text_8 = this.renderer.createText(this._el_5, ' Stop\n        ', null);
        this._text_9 = this.renderer.createText(this._el_0, '\n        ', null);
        this._el_10 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'button', new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'buffer-top btn btn-warning btn-sm btn-block'), null);
        this._text_11 = this.renderer.createText(this._el_10, '\n          ', null);
        this._el_12 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_10, 'i', new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["InlineArray4"](4, 'aria-hidden', 'true', 'class', 'fa fa-ban'), null);
        this._text_13 = this.renderer.createText(this._el_10, ' Cancel\n        ', null);
        this._text_14 = this.renderer.createText(this._el_0, '        \n      ', null);
        var disposable_0 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_5, new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_5));
        var disposable_1 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_10, new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_10));
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4,
            this._el_5,
            this._text_6,
            this._el_7,
            this._text_8,
            this._text_9,
            this._el_10,
            this._text_11,
            this._el_12,
            this._text_13,
            this._text_14
        ]), [
            disposable_0,
            disposable_1
        ]);
        return null;
    };
    View_TimerComponent4.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_15 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["inlineInterpolate"](1, '', this.parentView.parentView.context.currentTime, '');
        if (__WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_15, currVal_15)) {
            this.renderer.setText(this._text_3, currVal_15);
            this._expr_15 = currVal_15;
        }
    };
    View_TimerComponent4.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    View_TimerComponent4.prototype.handleEvent_5 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.parentView.parentView.context.onStop() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    View_TimerComponent4.prototype.handleEvent_10 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.parentView.parentView.context.onCancel() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    return View_TimerComponent4;
}(__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view__["a" /* AppView */]));
var View_TimerComponent2 = (function (_super) {
    __extends(View_TimerComponent2, _super);
    function View_TimerComponent2(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        _super.call(this, View_TimerComponent2, renderType_TimerComponent, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_linker_view_type__["a" /* ViewType */].EMBEDDED, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_6__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways, declaredViewContainer);
    }
    View_TimerComponent2.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, null, 'div', __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_1 = this.renderer.createText(this._el_0, '\n      ', null);
        this._anchor_2 = this.renderer.createTemplateAnchor(this._el_0, null);
        this._vc_2 = new __WEBPACK_IMPORTED_MODULE_10__angular_core_src_linker_view_container__["a" /* ViewContainer */](2, 0, this, this._anchor_2);
        this._TemplateRef_2_5 = new __WEBPACK_IMPORTED_MODULE_12__angular_core_src_linker_template_ref__["a" /* TemplateRef_ */](this, 2, this._anchor_2);
        this._NgIf_2_6 = new __WEBPACK_IMPORTED_MODULE_11__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__["a" /* Wrapper_NgIf */](this._vc_2.vcRef, this._TemplateRef_2_5);
        this._text_3 = this.renderer.createText(this._el_0, '\n      ', null);
        this._anchor_4 = this.renderer.createTemplateAnchor(this._el_0, null);
        this._vc_4 = new __WEBPACK_IMPORTED_MODULE_10__angular_core_src_linker_view_container__["a" /* ViewContainer */](4, 0, this, this._anchor_4);
        this._TemplateRef_4_5 = new __WEBPACK_IMPORTED_MODULE_12__angular_core_src_linker_template_ref__["a" /* TemplateRef_ */](this, 4, this._anchor_4);
        this._NgIf_4_6 = new __WEBPACK_IMPORTED_MODULE_11__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__["a" /* Wrapper_NgIf */](this._vc_4.vcRef, this._TemplateRef_4_5);
        this._text_5 = this.renderer.createText(this._el_0, '\n    ', null);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._anchor_2,
            this._text_3,
            this._anchor_4,
            this._text_5
        ]), null);
        return null;
    };
    View_TimerComponent2.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_12__angular_core_src_linker_template_ref__["b" /* TemplateRef */]) && (2 === requestNodeIndex))) {
            return this._TemplateRef_2_5;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_13__angular_common_src_directives_ng_if__["a" /* NgIf */]) && (2 === requestNodeIndex))) {
            return this._NgIf_2_6.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_12__angular_core_src_linker_template_ref__["b" /* TemplateRef */]) && (4 === requestNodeIndex))) {
            return this._TemplateRef_4_5;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_13__angular_common_src_directives_ng_if__["a" /* NgIf */]) && (4 === requestNodeIndex))) {
            return this._NgIf_4_6.context;
        }
        return notFoundResult;
    };
    View_TimerComponent2.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_2_0_0 = this.parentView.context.finalData;
        this._NgIf_2_6.check_ngIf(currVal_2_0_0, throwOnChange, false);
        this._NgIf_2_6.ngDoCheck(this, this._anchor_2, throwOnChange);
        var currVal_4_0_0 = !this.parentView.context.finalData;
        this._NgIf_4_6.check_ngIf(currVal_4_0_0, throwOnChange, false);
        this._NgIf_4_6.ngDoCheck(this, this._anchor_4, throwOnChange);
        this._vc_2.detectChangesInNestedViews(throwOnChange);
        this._vc_4.detectChangesInNestedViews(throwOnChange);
    };
    View_TimerComponent2.prototype.destroyInternal = function () {
        this._vc_2.destroyNestedViews();
        this._vc_4.destroyNestedViews();
    };
    View_TimerComponent2.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    View_TimerComponent2.prototype.createEmbeddedViewInternal = function (nodeIndex) {
        if ((nodeIndex == 2)) {
            return new View_TimerComponent3(this.viewUtils, this, 2, this._anchor_2, this._vc_2);
        }
        if ((nodeIndex == 4)) {
            return new View_TimerComponent4(this.viewUtils, this, 4, this._anchor_4, this._vc_4);
        }
        return null;
    };
    return View_TimerComponent2;
}(__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view__["a" /* AppView */]));
var renderType_TimerComponent = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].Emulated, styles_TimerComponent, {});
var View_TimerComponent0 = (function (_super) {
    __extends(View_TimerComponent0, _super);
    function View_TimerComponent0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_TimerComponent0, renderType_TimerComponent, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_linker_view_type__["a" /* ViewType */].COMPONENT, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_6__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
        this._expr_19 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    View_TimerComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._el_0 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, parentRenderNode, 'div', new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'card'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'h3', new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'card-header'), null);
        this._text_3 = this.renderer.createText(this._el_2, '', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_5 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'div', new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'card-content'), null);
        this._text_6 = this.renderer.createText(this._el_5, '\n    ', null);
        this._anchor_7 = this.renderer.createTemplateAnchor(this._el_5, null);
        this._vc_7 = new __WEBPACK_IMPORTED_MODULE_10__angular_core_src_linker_view_container__["a" /* ViewContainer */](7, 5, this, this._anchor_7);
        this._TemplateRef_7_5 = new __WEBPACK_IMPORTED_MODULE_12__angular_core_src_linker_template_ref__["a" /* TemplateRef_ */](this, 7, this._anchor_7);
        this._NgIf_7_6 = new __WEBPACK_IMPORTED_MODULE_11__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__["a" /* Wrapper_NgIf */](this._vc_7.vcRef, this._TemplateRef_7_5);
        this._text_8 = this.renderer.createText(this._el_5, '\n    ', null);
        this._anchor_9 = this.renderer.createTemplateAnchor(this._el_5, null);
        this._vc_9 = new __WEBPACK_IMPORTED_MODULE_10__angular_core_src_linker_view_container__["a" /* ViewContainer */](9, 5, this, this._anchor_9);
        this._TemplateRef_9_5 = new __WEBPACK_IMPORTED_MODULE_12__angular_core_src_linker_template_ref__["a" /* TemplateRef_ */](this, 9, this._anchor_9);
        this._NgIf_9_6 = new __WEBPACK_IMPORTED_MODULE_11__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__["a" /* Wrapper_NgIf */](this._vc_9.vcRef, this._TemplateRef_9_5);
        this._text_10 = this.renderer.createText(this._el_5, '\n  ', null);
        this._text_11 = this.renderer.createText(this._el_0, '\n', null);
        this._text_12 = this.renderer.createText(parentRenderNode, '\n', null);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4,
            this._el_5,
            this._text_6,
            this._anchor_7,
            this._text_8,
            this._anchor_9,
            this._text_10,
            this._text_11,
            this._text_12
        ]), null);
        return null;
    };
    View_TimerComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_12__angular_core_src_linker_template_ref__["b" /* TemplateRef */]) && (7 === requestNodeIndex))) {
            return this._TemplateRef_7_5;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_13__angular_common_src_directives_ng_if__["a" /* NgIf */]) && (7 === requestNodeIndex))) {
            return this._NgIf_7_6.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_12__angular_core_src_linker_template_ref__["b" /* TemplateRef */]) && (9 === requestNodeIndex))) {
            return this._TemplateRef_9_5;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_13__angular_common_src_directives_ng_if__["a" /* NgIf */]) && (9 === requestNodeIndex))) {
            return this._NgIf_9_6.context;
        }
        return notFoundResult;
    };
    View_TimerComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_7_0_0 = (this.context.currentState === this.context.READY);
        this._NgIf_7_6.check_ngIf(currVal_7_0_0, throwOnChange, false);
        this._NgIf_7_6.ngDoCheck(this, this._anchor_7, throwOnChange);
        var currVal_9_0_0 = (this.context.currentState !== this.context.READY);
        this._NgIf_9_6.check_ngIf(currVal_9_0_0, throwOnChange, false);
        this._NgIf_9_6.ngDoCheck(this, this._anchor_9, throwOnChange);
        this._vc_7.detectChangesInNestedViews(throwOnChange);
        this._vc_9.detectChangesInNestedViews(throwOnChange);
        var currVal_19 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["inlineInterpolate"](1, '', this.context.timerTitle, '');
        if (__WEBPACK_IMPORTED_MODULE_3__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_19, currVal_19)) {
            this.renderer.setText(this._text_3, currVal_19);
            this._expr_19 = currVal_19;
        }
    };
    View_TimerComponent0.prototype.destroyInternal = function () {
        this._vc_7.destroyNestedViews();
        this._vc_9.destroyNestedViews();
    };
    View_TimerComponent0.prototype.createEmbeddedViewInternal = function (nodeIndex) {
        if ((nodeIndex == 7)) {
            return new View_TimerComponent1(this.viewUtils, this, 7, this._anchor_7, this._vc_7);
        }
        if ((nodeIndex == 9)) {
            return new View_TimerComponent2(this.viewUtils, this, 9, this._anchor_9, this._vc_9);
        }
        return null;
    };
    return View_TimerComponent0;
}(__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view__["a" /* AppView */]));
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/timer.component.ngfactory.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var styles = ['.flex-width[_ngcontent-%COMP%] {\r\n    -ms-flex-pack: distribute;\r\n        justify-content: space-around;\r\n}'];
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/watch.component.css.shim.ngstyle.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_watch_watch_component__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_watch_state_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__watch_component_css_shim_ngstyle__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_core_src_linker_view_container__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_core_src_change_detection_change_detection_util__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_timer_timer_component__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__timer_timer_component_ngfactory__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common_src_directives_ng_if__ = __webpack_require__(100);
/* unused harmony export Wrapper_WatchComponent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WatchComponentNgFactory; });
/* unused harmony export View_WatchComponent0 */
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
















var Wrapper_WatchComponent = (function () {
    function Wrapper_WatchComponent(p0) {
        this._changed = false;
        this.context = new __WEBPACK_IMPORTED_MODULE_0__app_watch_watch_component__["a" /* WatchComponent */](p0);
    }
    Wrapper_WatchComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_WatchComponent.prototype.ngOnDestroy = function () {
        this.context.ngOnDestroy();
    };
    Wrapper_WatchComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        if (!throwOnChange) {
            if ((view.numberOfChecks === 0)) {
                this.context.ngOnInit();
            }
        }
        return changed;
    };
    Wrapper_WatchComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_WatchComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_WatchComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_WatchComponent;
}());
var renderType_WatchComponent_Host = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].None, [], {});
var View_WatchComponent_Host0 = (function (_super) {
    __extends(View_WatchComponent_Host0, _super);
    function View_WatchComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_WatchComponent_Host0, renderType_WatchComponent_Host, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].HOST, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_WatchComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["selectOrCreateRenderHostElement"](this.renderer, 'app-watch', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], rootSelector, null);
        this.compView_0 = new View_WatchComponent0(this.viewUtils, this, 0, this._el_0);
        this._WatchComponent_0_3 = new Wrapper_WatchComponent(this.injectorGet(__WEBPACK_IMPORTED_MODULE_7__app_watch_state_service__["a" /* WatchStateService */], this.parentIndex));
        this.compView_0.create(this._WatchComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["a" /* ComponentRef_ */](0, this, this._el_0, this._WatchComponent_0_3.context);
    };
    View_WatchComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_0__app_watch_watch_component__["a" /* WatchComponent */]) && (0 === requestNodeIndex))) {
            return this._WatchComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_WatchComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._WatchComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_WatchComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
        this._WatchComponent_0_3.ngOnDestroy();
    };
    View_WatchComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_WatchComponent_Host0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var WatchComponentNgFactory = new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["b" /* ComponentFactory */]('app-watch', View_WatchComponent_Host0, __WEBPACK_IMPORTED_MODULE_0__app_watch_watch_component__["a" /* WatchComponent */]);
var styles_WatchComponent = [__WEBPACK_IMPORTED_MODULE_8__watch_component_css_shim_ngstyle__["a" /* styles */]];
var View_WatchComponent1 = (function (_super) {
    __extends(View_WatchComponent1, _super);
    function View_WatchComponent1(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        _super.call(this, View_WatchComponent1, renderType_WatchComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].EMBEDDED, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways, declaredViewContainer);
        this._expr_4 = __WEBPACK_IMPORTED_MODULE_10__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    View_WatchComponent1.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, null, 'button', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'btn btn-primary btn-lg btn-block'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n      ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'i', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'fa fa-play'), null);
        this._text_3 = this.renderer.createText(this._el_0, '\n       Start\n    ', null);
        var disposable_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_0, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_0));
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3
        ]), [disposable_0]);
        return null;
    };
    View_WatchComponent1.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_4 = (this.parentView.context.currentState !== this.parentView.context.READY);
        if (__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_4, currVal_4)) {
            this.renderer.setElementProperty(this._el_0, 'disabled', currVal_4);
            this._expr_4 = currVal_4;
        }
    };
    View_WatchComponent1.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    View_WatchComponent1.prototype.handleEvent_0 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.parentView.context.onStart() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    return View_WatchComponent1;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var View_WatchComponent2 = (function (_super) {
    __extends(View_WatchComponent2, _super);
    function View_WatchComponent2(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        _super.call(this, View_WatchComponent2, renderType_WatchComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].EMBEDDED, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways, declaredViewContainer);
    }
    View_WatchComponent2.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, null, 'button', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'btn btn-success btn-lg btn-block'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n      ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'i', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'fa fa-refresh'), null);
        this._text_3 = this.renderer.createText(this._el_0, '\n      Reset\n    ', null);
        var disposable_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_0, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_0));
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3
        ]), [disposable_0]);
        return null;
    };
    View_WatchComponent2.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    View_WatchComponent2.prototype.handleEvent_0 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.parentView.context.onReset() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    return View_WatchComponent2;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var renderType_WatchComponent = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].Emulated, styles_WatchComponent, {});
var View_WatchComponent0 = (function (_super) {
    __extends(View_WatchComponent0, _super);
    function View_WatchComponent0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_WatchComponent0, renderType_WatchComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].COMPONENT, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_WatchComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, parentRenderNode, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-height'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-remaining'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_4 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_2, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-width buffer-top'), null);
        this._text_5 = this.renderer.createText(this._el_4, '\n      ', null);
        this._el_6 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_4, 'app-timer', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'timerTitle', 'Runner A'), null);
        this.compView_6 = new __WEBPACK_IMPORTED_MODULE_12__timer_timer_component_ngfactory__["a" /* View_TimerComponent0 */](this.viewUtils, this, 6, this._el_6);
        this._TimerComponent_6_3 = new __WEBPACK_IMPORTED_MODULE_12__timer_timer_component_ngfactory__["b" /* Wrapper_TimerComponent */](this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_7__app_watch_state_service__["a" /* WatchStateService */], this.parentIndex));
        this.compView_6.create(this._TimerComponent_6_3.context);
        this._text_7 = this.renderer.createText(this._el_4, '\n      ', null);
        this._el_8 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_4, 'app-timer', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'timerTitle', 'Runner B'), null);
        this.compView_8 = new __WEBPACK_IMPORTED_MODULE_12__timer_timer_component_ngfactory__["a" /* View_TimerComponent0 */](this.viewUtils, this, 8, this._el_8);
        this._TimerComponent_8_3 = new __WEBPACK_IMPORTED_MODULE_12__timer_timer_component_ngfactory__["b" /* Wrapper_TimerComponent */](this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_7__app_watch_state_service__["a" /* WatchStateService */], this.parentIndex));
        this.compView_8.create(this._TimerComponent_8_3.context);
        this._text_9 = this.renderer.createText(this._el_4, '\n    ', null);
        this._text_10 = this.renderer.createText(this._el_2, '\n  ', null);
        this._text_11 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_12 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'buffer'), null);
        this._text_13 = this.renderer.createText(this._el_12, '\n    ', null);
        this._anchor_14 = this.renderer.createTemplateAnchor(this._el_12, null);
        this._vc_14 = new __WEBPACK_IMPORTED_MODULE_9__angular_core_src_linker_view_container__["a" /* ViewContainer */](14, 12, this, this._anchor_14);
        this._TemplateRef_14_5 = new __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["a" /* TemplateRef_ */](this, 14, this._anchor_14);
        this._NgIf_14_6 = new __WEBPACK_IMPORTED_MODULE_13__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__["a" /* Wrapper_NgIf */](this._vc_14.vcRef, this._TemplateRef_14_5);
        this._text_15 = this.renderer.createText(this._el_12, '\n    ', null);
        this._anchor_16 = this.renderer.createTemplateAnchor(this._el_12, null);
        this._vc_16 = new __WEBPACK_IMPORTED_MODULE_9__angular_core_src_linker_view_container__["a" /* ViewContainer */](16, 12, this, this._anchor_16);
        this._TemplateRef_16_5 = new __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["a" /* TemplateRef_ */](this, 16, this._anchor_16);
        this._NgIf_16_6 = new __WEBPACK_IMPORTED_MODULE_13__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__["a" /* Wrapper_NgIf */](this._vc_16.vcRef, this._TemplateRef_16_5);
        this._text_17 = this.renderer.createText(this._el_12, '\n  ', null);
        this._text_18 = this.renderer.createText(this._el_0, '\n', null);
        this._text_19 = this.renderer.createText(parentRenderNode, '\n', null);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._el_6,
            this._text_7,
            this._el_8,
            this._text_9,
            this._text_10,
            this._text_11,
            this._el_12,
            this._text_13,
            this._anchor_14,
            this._text_15,
            this._anchor_16,
            this._text_17,
            this._text_18,
            this._text_19
        ]), null);
        return null;
    };
    View_WatchComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_11__app_timer_timer_component__["a" /* TimerComponent */]) && (6 === requestNodeIndex))) {
            return this._TimerComponent_6_3.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_11__app_timer_timer_component__["a" /* TimerComponent */]) && (8 === requestNodeIndex))) {
            return this._TimerComponent_8_3.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["b" /* TemplateRef */]) && (14 === requestNodeIndex))) {
            return this._TemplateRef_14_5;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_15__angular_common_src_directives_ng_if__["a" /* NgIf */]) && (14 === requestNodeIndex))) {
            return this._NgIf_14_6.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["b" /* TemplateRef */]) && (16 === requestNodeIndex))) {
            return this._TemplateRef_16_5;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_15__angular_common_src_directives_ng_if__["a" /* NgIf */]) && (16 === requestNodeIndex))) {
            return this._NgIf_16_6.context;
        }
        return notFoundResult;
    };
    View_WatchComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_6_0_0 = 'Runner A';
        this._TimerComponent_6_3.check_timerTitle(currVal_6_0_0, throwOnChange, false);
        this._TimerComponent_6_3.ngDoCheck(this, this._el_6, throwOnChange);
        var currVal_8_0_0 = 'Runner B';
        this._TimerComponent_8_3.check_timerTitle(currVal_8_0_0, throwOnChange, false);
        this._TimerComponent_8_3.ngDoCheck(this, this._el_8, throwOnChange);
        var currVal_14_0_0 = (this.context.currentState !== this.context.WAITING);
        this._NgIf_14_6.check_ngIf(currVal_14_0_0, throwOnChange, false);
        this._NgIf_14_6.ngDoCheck(this, this._anchor_14, throwOnChange);
        var currVal_16_0_0 = (this.context.currentState === this.context.WAITING);
        this._NgIf_16_6.check_ngIf(currVal_16_0_0, throwOnChange, false);
        this._NgIf_16_6.ngDoCheck(this, this._anchor_16, throwOnChange);
        this._vc_14.detectChangesInNestedViews(throwOnChange);
        this._vc_16.detectChangesInNestedViews(throwOnChange);
        this.compView_6.internalDetectChanges(throwOnChange);
        this.compView_8.internalDetectChanges(throwOnChange);
    };
    View_WatchComponent0.prototype.destroyInternal = function () {
        this._vc_14.destroyNestedViews();
        this._vc_16.destroyNestedViews();
        this.compView_6.destroy();
        this.compView_8.destroy();
        this._TimerComponent_6_3.ngOnDestroy();
        this._TimerComponent_8_3.ngOnDestroy();
    };
    View_WatchComponent0.prototype.createEmbeddedViewInternal = function (nodeIndex) {
        if ((nodeIndex == 14)) {
            return new View_WatchComponent1(this.viewUtils, this, 14, this._anchor_14, this._vc_14);
        }
        if ((nodeIndex == 16)) {
            return new View_WatchComponent2(this.viewUtils, this, 16, this._anchor_16, this._vc_16);
        }
        return null;
    };
    return View_WatchComponent0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/watch.component.ngfactory.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router_src_directives_router_link__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core_src_security__ = __webpack_require__(113);
/* unused harmony export Wrapper_RouterLink */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Wrapper_RouterLinkWithHref; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */




var Wrapper_RouterLink = (function () {
    function Wrapper_RouterLink(p0, p1) {
        this._changed = false;
        this.context = new __WEBPACK_IMPORTED_MODULE_0__angular_router_src_directives_router_link__["a" /* RouterLink */](p0, p1);
        this._expr_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    Wrapper_RouterLink.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_RouterLink.prototype.ngOnDestroy = function () {
    };
    Wrapper_RouterLink.prototype.check_queryParams = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_0, currValue))) {
            this._changed = true;
            this.context.queryParams = currValue;
            this._expr_0 = currValue;
        }
    };
    Wrapper_RouterLink.prototype.check_fragment = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_1, currValue))) {
            this._changed = true;
            this.context.fragment = currValue;
            this._expr_1 = currValue;
        }
    };
    Wrapper_RouterLink.prototype.check_preserveQueryParams = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_2, currValue))) {
            this._changed = true;
            this.context.preserveQueryParams = currValue;
            this._expr_2 = currValue;
        }
    };
    Wrapper_RouterLink.prototype.check_preserveFragment = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_3, currValue))) {
            this._changed = true;
            this.context.preserveFragment = currValue;
            this._expr_3 = currValue;
        }
    };
    Wrapper_RouterLink.prototype.check_skipLocationChange = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_4, currValue))) {
            this._changed = true;
            this.context.skipLocationChange = currValue;
            this._expr_4 = currValue;
        }
    };
    Wrapper_RouterLink.prototype.check_replaceUrl = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_5, currValue))) {
            this._changed = true;
            this.context.replaceUrl = currValue;
            this._expr_5 = currValue;
        }
    };
    Wrapper_RouterLink.prototype.check_routerLink = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_6, currValue))) {
            this._changed = true;
            this.context.routerLink = currValue;
            this._expr_6 = currValue;
        }
    };
    Wrapper_RouterLink.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        return changed;
    };
    Wrapper_RouterLink.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_RouterLink.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.context.onClick() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    Wrapper_RouterLink.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_RouterLink;
}());
var Wrapper_RouterLinkWithHref = (function () {
    function Wrapper_RouterLinkWithHref(p0, p1, p2) {
        this._changed = false;
        this._changes = {};
        this.context = new __WEBPACK_IMPORTED_MODULE_0__angular_router_src_directives_router_link__["b" /* RouterLinkWithHref */](p0, p1, p2);
        this._expr_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_7 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_8 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_9 = __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    Wrapper_RouterLinkWithHref.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_RouterLinkWithHref.prototype.ngOnDestroy = function () {
        this.context.ngOnDestroy();
    };
    Wrapper_RouterLinkWithHref.prototype.check_target = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_0, currValue))) {
            this._changed = true;
            this.context.target = currValue;
            this._changes['target'] = new __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["e" /* SimpleChange */](this._expr_0, currValue);
            this._expr_0 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.check_queryParams = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_1, currValue))) {
            this._changed = true;
            this.context.queryParams = currValue;
            this._changes['queryParams'] = new __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["e" /* SimpleChange */](this._expr_1, currValue);
            this._expr_1 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.check_fragment = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_2, currValue))) {
            this._changed = true;
            this.context.fragment = currValue;
            this._changes['fragment'] = new __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["e" /* SimpleChange */](this._expr_2, currValue);
            this._expr_2 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.check_preserveQueryParams = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_3, currValue))) {
            this._changed = true;
            this.context.preserveQueryParams = currValue;
            this._changes['preserveQueryParams'] = new __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["e" /* SimpleChange */](this._expr_3, currValue);
            this._expr_3 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.check_preserveFragment = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_4, currValue))) {
            this._changed = true;
            this.context.preserveFragment = currValue;
            this._changes['preserveFragment'] = new __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["e" /* SimpleChange */](this._expr_4, currValue);
            this._expr_4 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.check_skipLocationChange = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_5, currValue))) {
            this._changed = true;
            this.context.skipLocationChange = currValue;
            this._changes['skipLocationChange'] = new __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["e" /* SimpleChange */](this._expr_5, currValue);
            this._expr_5 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.check_replaceUrl = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_6, currValue))) {
            this._changed = true;
            this.context.replaceUrl = currValue;
            this._changes['replaceUrl'] = new __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["e" /* SimpleChange */](this._expr_6, currValue);
            this._expr_6 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.check_routerLink = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_7, currValue))) {
            this._changed = true;
            this.context.routerLink = currValue;
            this._changes['routerLink'] = new __WEBPACK_IMPORTED_MODULE_1__angular_core_src_change_detection_change_detection_util__["e" /* SimpleChange */](this._expr_7, currValue);
            this._expr_7 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        if (!throwOnChange) {
            if (changed) {
                this.context.ngOnChanges(this._changes);
                this._changes = {};
            }
        }
        return changed;
    };
    Wrapper_RouterLinkWithHref.prototype.checkHost = function (view, componentView, el, throwOnChange) {
        var currVal_8 = this.context.target;
        if (__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_8, currVal_8)) {
            view.renderer.setElementAttribute(el, 'target', ((currVal_8 == null) ? null : currVal_8.toString()));
            this._expr_8 = currVal_8;
        }
        var currVal_9 = this.context.href;
        if (__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_9, currVal_9)) {
            view.renderer.setElementProperty(el, 'href', view.viewUtils.sanitizer.sanitize(__WEBPACK_IMPORTED_MODULE_3__angular_core_src_security__["b" /* SecurityContext */].URL, currVal_9));
            this._expr_9 = currVal_9;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.context.onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    Wrapper_RouterLinkWithHref.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_RouterLinkWithHref;
}());
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/router_link.ngfactory.js.map

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router_src_directives_router_outlet__ = __webpack_require__(132);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Wrapper_RouterOutlet; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */

var Wrapper_RouterOutlet = (function () {
    function Wrapper_RouterOutlet(p0, p1, p2, p3) {
        this._changed = false;
        this.context = new __WEBPACK_IMPORTED_MODULE_0__angular_router_src_directives_router_outlet__["a" /* RouterOutlet */](p0, p1, p2, p3);
    }
    Wrapper_RouterOutlet.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_RouterOutlet.prototype.ngOnDestroy = function () {
        this.context.ngOnDestroy();
        (this.subscription0 && this.subscription0.unsubscribe());
        (this.subscription1 && this.subscription1.unsubscribe());
    };
    Wrapper_RouterOutlet.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        return changed;
    };
    Wrapper_RouterOutlet.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_RouterOutlet.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_RouterOutlet.prototype.subscribe = function (view, _eventHandler, emit0, emit1) {
        this._eventHandler = _eventHandler;
        if (emit0) {
            (this.subscription0 = this.context.activateEvents.subscribe(_eventHandler.bind(view, 'activate')));
        }
        if (emit1) {
            (this.subscription1 = this.context.deactivateEvents.subscribe(_eventHandler.bind(view, 'deactivate')));
        }
    };
    return Wrapper_RouterOutlet;
}());
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/router_outlet.ngfactory.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes_routes_module__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__watch_state_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__watch_watch_component__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__timer_timer_component__ = __webpack_require__(187);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["l" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__watch_watch_component__["a" /* WatchComponent */],
                __WEBPACK_IMPORTED_MODULE_8__timer_timer_component__["a" /* TimerComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["c" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__routes_routes_module__["a" /* RoutesModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_5__watch_state_service__["a" /* WatchStateService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/app.module.js.map

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeData; });
var TimeData = (function () {
    function TimeData(time, name, grade) {
        if (name === void 0) { name = ''; }
        if (grade === void 0) { grade = 'N/A'; }
        this.time = time;
        this.name = name;
        this.grade = grade;
    }
    return TimeData;
}());
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/time-data.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/environment.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/polyfills.js.map

/***/ }),

/***/ 621:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(335);


/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__time_data__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__states_enum__ = __webpack_require__(186);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WatchStateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WatchStateService = (function () {
    function WatchStateService() {
        this.grades = [
            '2nd',
            '3rd',
            '4th',
            '5th',
            '6th',
            'Younger',
            'Older'
        ];
        this.state = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](__WEBPACK_IMPORTED_MODULE_4__states_enum__["a" /* States */].ready);
        this.socket = __WEBPACK_IMPORTED_MODULE_2_socket_io_client__();
        this.socket.on('update', this.handleMessage.bind(this));
        this.results = {
            'Runner A': new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](null),
            'Runner B': new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](null)
        };
    }
    WatchStateService.prototype.handleMessage = function (message) {
        if (!message || !message.state) {
            console.log('??: ', message);
        }
        switch (message.state) {
            case __WEBPACK_IMPORTED_MODULE_4__states_enum__["a" /* States */].running:
                this.start(message.time);
                break;
            case __WEBPACK_IMPORTED_MODULE_4__states_enum__["a" /* States */].partial:
                this.partial(message.target, message.result);
                break;
            case __WEBPACK_IMPORTED_MODULE_4__states_enum__["a" /* States */].ready:
                this.reset();
                break;
        }
    };
    WatchStateService.prototype.triggerUpdate = function (title, time, name, grade) {
        var data = new __WEBPACK_IMPORTED_MODULE_3__time_data__["a" /* TimeData */](time, name, grade);
        console.log('time date', data);
        var mssg = {
            state: __WEBPACK_IMPORTED_MODULE_4__states_enum__["a" /* States */].partial,
            target: title,
            result: data
        };
        this.socket.emit('update', mssg);
        this.partial(title, data);
    };
    WatchStateService.prototype.partial = function (target, result) {
        this.results[target].next(result);
        if ((this.results['Runner A'].getValue() !== null)
            && (this.results['Runner B'].getValue() !== null)) {
            this.state.next(__WEBPACK_IMPORTED_MODULE_4__states_enum__["a" /* States */].waiting);
        }
        else {
            this.state.next(__WEBPACK_IMPORTED_MODULE_4__states_enum__["a" /* States */].partial);
        }
    };
    WatchStateService.prototype.triggerReset = function () {
        var data = {
            state: __WEBPACK_IMPORTED_MODULE_4__states_enum__["a" /* States */].ready
        };
        this.socket.emit('update', data);
        this.reset();
    };
    WatchStateService.prototype.reset = function () {
        this.results['Runner A'].next(null);
        this.results['Runner B'].next(null);
        this.state.next(__WEBPACK_IMPORTED_MODULE_4__states_enum__["a" /* States */].ready);
    };
    WatchStateService.prototype.triggerStart = function () {
        if (this.state.getValue() === __WEBPACK_IMPORTED_MODULE_4__states_enum__["a" /* States */].ready) {
            var data = { state: __WEBPACK_IMPORTED_MODULE_4__states_enum__["a" /* States */].running, time: 0 };
            this.socket.emit('update', data);
            this.start(data.time);
        }
    };
    WatchStateService.prototype.start = function (time) {
        if (this.state.getValue() === __WEBPACK_IMPORTED_MODULE_4__states_enum__["a" /* States */].ready) {
            console.log('elapsed time', time);
            this.startTime = Date.now() - time;
            this.state.next(__WEBPACK_IMPORTED_MODULE_4__states_enum__["a" /* States */].running);
        }
    };
    WatchStateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], WatchStateService);
    return WatchStateService;
}());
//# sourceMappingURL=C:/Users/ctf/Documents/GitHub/stop-watch/src/watch-state.service.js.map

/***/ })

},[622]);
//# sourceMappingURL=main.bundle.map