Game_Player.prototype.update = function(sceneActive) {
    var lastScrolledX = this.scrolledX();
    var lastScrolledY = this.scrolledY();
    var wasMoving = this.isMoving();
    this.updateDashing();
    if (sceneActive) {
        this.moveByInput();
        this.processFall();
    }
    Game_Character.prototype.update.call(this);
    this.updateScroll(lastScrolledX, lastScrolledY);
    this.updateVehicle();
    if (!this.isMoving()) {
        this.updateNonmoving(wasMoving);
    }
    this._followers.update();
    
};

Game_Player.prototype.processFall = function(){
    if(!this.isMoving()){
        var fallDist = 0;
        for(var _y = $gamePlayer.y+1; _y <= $gameMap.height();_y++){
            if($gameMap.regionId($gamePlayer.x,_y)== 1)
                break;
            fallDist++;
        }
        if(fallDist > 0){
            this.performFall(fallDist);
        }
        if($gamePlayer.y == $gameMap.height()){
            SceneManager.goto(Scene_Gameover);
        }
    }
}

Game_Player.prototype.performFall = function(dist){
    this.jump(0,dist)
}

Game_Player.prototype.canPass = function(x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    if (!$gameMap.isValid(x2, y2)) {
        return false;
    }
    if (this.isThrough() || this.isDebugThrough()) {
        return true;
    }
    if (!this.isMapPassable(x, y, d)) {
        //return false;
        //return true;
    }
    if (this.isCollidedWithCharacters(x2, y2)) {
        return false;
    }
    if($gameMap.regionId($gamePlayer.x,$gamePlayer.y+1)!= 1){
        return false;
    }
    return true;
};

Game_Player.prototype.executeMove = function(direction) {
    if(direction == 2 || direction == 8){ //if trying to move up or down... (if we want to move up/down do a jump instead using the jump/dash button)
        return;
    }
    this.moveStraight(direction);
};

//this is the dash section

Game_CharacterBase.prototype.realMoveSpeed = function() {
    return this._moveSpeed;
};

Game_Player.prototype.moveByInput = function() {
    if (!this.isMoving() && this.canMove()) {
        if(this.isDashing()){
            var direction = this.getInputDirection();
            this.doJumpDash(direction);
        }
        else{
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
    }
};

//^ 8 > 6 < 4 V 2
Game_Player.prototype.doJumpDash = function(direction){
    if(direction == 6){
        this.jump(2,0);
    }
    if(direction == 4){
        this.jump(-2,0)
    }
}