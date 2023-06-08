(function() {

Window_BattleStatus.prototype.gaugeAreaWidth = function() {
    return 220;
};

Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
    this.drawActorHp(actor, rect.x + 0, rect.y, 108);
    if(actor.mmp>0)
    {
        this.drawActorMp(actor, rect.x + 123, rect.y, 96);
    }
    else
    {
        this.drawActorTp(actor, rect.x + 123, rect.y, 96);
    }
}; 

var _baseMp = Window_Base.prototype.drawActorMp;
var _baseTp = Window_Base.prototype.drawActorTp;

Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
    if(actor.mmp>0)
    {
        _baseMp.call(this, actor, x, y, width);
    }
    else
    {
        _baseTp.call(this, actor, x, y, width);
    }
};

Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    Window_Base.prototype.drawActorMp.call(this, actor, x, y, width)
};

})();