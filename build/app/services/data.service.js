var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var auth_service_1 = require('./auth.service');
var DataService = (function () {
    function DataService(_authService) {
        var _this = this;
        this._authService = _authService;
        this.focusPhases$ = new angular2_1.Observable(function (observer) { return _this._focusPhasesObserver = observer; }).share();
        this.focusPhases$.subscribe();
        this._firebaseRef = new Firebase('https://agile-pomodoro.firebaseio.com/');
        this._authService.authUser$.subscribe(function (authUser) {
            _this._authUser = authUser;
            _this.loadFocusPhases();
        });
        this._authService.loadAuthUser();
    }
    DataService.prototype.loadFocusPhases = function () {
        var _this = this;
        if (this._authService.isLoggedIn()) {
            this._firebaseRef.child("users/" + this._authUser.uid + "/focusPhases").on('value', function (snapshot) {
                _this._focusPhasesObserver.next(_this._firebaseArrayToArray(snapshot.val()));
            }, function (errorObject) {
                console.log('The read failed: ' + errorObject.code);
            });
        }
        else {
            this._focusPhasesObserver.next([]);
        }
    };
    DataService.prototype.addFocusPhase = function (focusPhase) {
        if (this._authService.isLoggedIn()) {
            this._firebaseRef.child("users/" + this._authUser.uid + "/focusPhases").push(focusPhase);
        }
    };
    DataService.prototype._firebaseArrayToArray = function (fbArray) {
        var convertedArray = [];
        for (var property in fbArray) {
            if (fbArray.hasOwnProperty(property)) {
                convertedArray.push(fbArray[property]);
            }
        }
        return convertedArray;
    };
    DataService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], DataService);
    return DataService;
})();
exports.DataService = DataService;
