
//this is the dash section



Game_Player.prototype.moveByInput = function() {
    if (!this.isMoving() && this.canMove()) {
        if(this.isDashing()){
            var direction = this.getInputDirection();
            //this.doJumpDash(direction);
        }
        var direction = this.getInputDirection();
        if (direction > 0) {
            $gameTemp.clearDestination();
        } else if ($gameTemp.isDestinationValid()){
            var x = $gameTemp.destinationX();
            var y = $gameTemp.destinationY();
            direction = this.findDirectionTo(x, y);
        }
        if (direction > 0) {
            this.executeMove(direction);
        }
    }
};


//^ 8 > 6 < 4 V 2
Game_Player.prototype.doJumpDash = function(direction){
    /*if(direction == 6){
        this.jump(2,0,5);
    }
    if(direction == 4){
        this.jump(-2,0,5)
    }*/
    if(direction == 8){
        if($gameMap.regionId($gamePlayer.x,$gamePlayer.y) == 1){ //if youre jumpin onto something
            this.jump(0,-1);
        }
        else{
            this.jump(0,-1,3)
        }
    }
}

Game_CharacterBase.prototype.jump = function(xPlus, yPlus,jumpPeak) {
    /*if (Math.abs(xPlus) > Math.abs(yPlus)) {
        if (xPlus !== 0) {
            this.setDirection(xPlus < 0 ? 4 : 6);
        }
    } else {
        if (yPlus !== 0) {
            this.setDirection(yPlus < 0 ? 8 : 2);
        }
    }*/
    this._x += xPlus;
    this._y += yPlus;
    var distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
    if(jumpPeak == undefined){
        this._jumpPeak = 10 + distance - this._moveSpeed;
    }
    else{
        this._jumpPeak = jumpPeak;
    }
    this._jumpCount = this._jumpPeak * 2;
    this.resetStopCount();
    this.straighten();
};

Game_Player.prototype.jump = function(xPlus, yPlus, jumpPeak) {
    Game_Character.prototype.jump.call(this, xPlus, yPlus, jumpPeak);
    this._followers.jumpAll();
};
