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
        for(var _y = this.y+1; _y <= $gameMap.height();_y++){
            if($gameMap.regionId(this.x,_y) == 1)
                break;
            fallDist++;
        }
        if(fallDist > 0){
            this.performFall(fallDist);
        }
       
        if(this.y == $gameMap.height()){
            SceneManager.goto(Scene_Gameover);
        }
    }
}

Game_Player.prototype.performFall = function(dist,dir = 0){
    this.jump(dir,dist)
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
    if($gameMap.regionId(x+1,y+1) == 2 && d == 6){
        return false;
    }
    if($gameMap.regionId(x-1,y+1) == 2 && d == 4){
        return false;
    }
    return true;
};

Game_Player.prototype.executeMove = function(direction) {
    if(direction == 2 || direction == 8){ //if trying to move up or down... (if we want to move up/down do a jump instead using the jump/dash button)
        if(Input.isPressed("ok")){
            if(direction == 2){ //down
                this.jump(0,1)
            }
            if(direction == 8){ //up
                if($gameMap.regionId($gamePlayer.x,$gamePlayer.y) == 1){ //if youre jumpin onto something
                    this.jump(0,-1);
                }
                else{
                    this.jump(0,-1,3)
                }
            }
        }
        return;
    }
    this.moveStraight(direction);
};
