Game_Player.prototype.updateNonmoving_orig = Game_Player.prototype.updateNonmoving;
Game_Player.prototype.updateNonmoving = function(){}
/*Game_Player.prototype.updateNonmoving = function(wasMoving) {
    this.updateNonmoving_orig(wasMoving);
    this.idleTimer+=0.1;
    this.setImage("!Actor1", 0);
    var timer = Math.floor(this.idleTimer);
    var dir = Math.floor(timer%4)*2;
    var pat = Math.floor((timer%12)/3)
    this.setDirection(dir) //why are directions enums
    this.setPattern(pat)
};*/
Game_Player.prototype.idleTimer = 0;

Game_CharacterBase.prototype.updatePattern = function() {
    if (!this.hasStepAnime() && this._stopCount > 0) {
        this.resetPattern();
    } else {
        //this._pattern = (this._pattern + 1) % this.maxPattern();
    }
};