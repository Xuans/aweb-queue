var Queue=function(){
    this._list=[];
    this._error=[];
    this._finally=[];


    this.status={};
    this._step=0;
}

Queue.prototype={
    Constructor:Queue,

    done:function(){
        return this.then.apply(this,arguments);
    },
    prepend:function(cb){
        this._list.unshift(cb);

        return this;
    },
    append:function(cb){
        return this.then.apply(this,arguments);
    },
    then:function(cb){
        this._list.push(cb);

        return this;
    },
    next:function(){
        var callback=this._list.shift(),
            i,cb,cbs;

        if(callback){
            ++this._step;

            try{
                callback.apply(this,[this,this._step]);
            }catch(e){
                cbs=this._error;

                if(cbs && cbs.length){
                    for(i=-1;cb=cbs[++i];){
                        cb.apply(this,[this,e,this._step]);
                    }
                }else{
                    this.next();
                }
            }finally{
                cbs=this._finally;

                if(cbs && cbs.length){
                    for(i=-1;cb=cbs[++i];){
                        cb.apply(this,[this,this._step]);
                    }
                }
            }
        }

        return this;
    },
    stop:function(){
        this._list=[];

        return this;
    },
    error:function(cb){
        this._error.push(cb);

        return this;
    },
    finally:function(cb){
        this._finally.push(cb);

        return this;
    },
    start:function(){
        this.next();

        return this;
    },
    status:function(key,value){
        if(arguments.length>1){
            this._status[key]=value;

            return this;
        }else{
            return this._status[key];
        }
    }
};


module.exports=Queue;
